import {all, call, take, put, select} from 'redux-saga/effects';
import axios from 'axios';
import {
	clearAnimeListAction,
	animeOnPageLoadAction,
	animeLoadTopTenAction,
	animeStartLoadTopTenAction,
	animeLoadSearchAction,
	animeFetchDetailsAction,
	animeLoadDetailsAction,
	animeStartLoadPopularAction,
	animeStartLoadLatestAction,
	animeLoadLatestAction,
	animeLoadPopularAction,
} from './animeAction';
import {animeListSelector} from './animeSelectors';
import {AnimeCachePayload, AnimeList, AnimeStatus} from '../typings';
import { animeBaseURL } from './animeConstants';

export default function* animeRuntime() {
	yield all([retrieveAnimeList(), retrieveAnimeDetailList(), retrieveAnimeTopTenList(), retrieveAnimeLatestList(), retrieveAnimePopularList()]);
}

function* retrieveAnimeList() {
	while (true) {
		try {

			// Refresh Action
			const action = yield take(animeOnPageLoadAction.toString());
			// const action = yield take([animeOnPageLoadAction.toString() , animeLoadTopTenAction.toString(), animeStartLoadLatestAction.toString()]);

			const cachedConfig: AnimeCachePayload = action.payload;
			const isInitial: boolean = cachedConfig.initialLoad;
			if (isInitial) {
				yield put(clearAnimeListAction());
				return;
			}

			const isRefreshed: boolean = cachedConfig.refreshCache;

			if (isRefreshed) {
				yield put(clearAnimeListAction());
			}

			const animeList: AnimeList = yield select(animeListSelector);
			const offsetValue = animeList.search.length;


			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const url = `${animeBaseURL}/anime?limit=20&page=${offsetValue}&status=${cachedConfig.type}&letter=${cachedConfig.searchString}&order_by=score&sort=desc&sfw=true`;
			const response = yield call(axios.get, url);
			console.log('api call retrieveAnimeList', url)

			yield put(animeLoadSearchAction(response.data.data));
		} catch (err) {
			console.log('err', err);
		}
	}
}

function* retrieveAnimeDetailList() {
	while (true) {
		try {
			// Refresh Action
			const action = yield take(animeFetchDetailsAction.toString());
			const id: number = action.payload;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const url = `${animeBaseURL}/anime/${id}/full`;
			const response = yield call(axios.get, url);

			yield put(animeLoadDetailsAction(response.data.data));
		} catch (err) {
			console.log('err', err);
		}
	}
}

function* retrieveAnimeTopTenList() {
	while (true) {
		try {
			// Refresh Action
			const action = yield take(animeStartLoadTopTenAction.toString());
			const actionStatus: AnimeStatus = action.payload;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const response = yield call(
				axios.get,
				`${animeBaseURL}/anime?limit=10&page=0&status=${actionStatus}&sfw=true&order_by=score&sort=desc&min_score=0`,
			);
			yield put(animeLoadTopTenAction(response.data.data));
		} catch (err) {
			console.log('err', err);
		}
	}
}

function* retrieveAnimeLatestList() {
	while (true) {
		try {
			// Refresh Action
			const action = yield take(animeStartLoadLatestAction.toString());
			const actionStatus: AnimeStatus = action.payload;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const response = yield call(
				axios.get,
				`${animeBaseURL}/anime?limit=20&page=0&status=${actionStatus}&sfw=true&order_by=start_date&sort=desc&min_score=0`,
			);
			yield put(animeLoadLatestAction(response.data.data));
		} catch (err) {
			console.log('err', err);
		}
	}
}

function* retrieveAnimePopularList() {
	while (true) {
		try {
			// Refresh Action
			const action = yield take(animeStartLoadPopularAction.toString());
			const actionStatus: AnimeStatus = action.payload;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const response = yield call(
				axios.get,
				`${animeBaseURL}/anime?limit=20&page=0&status=${actionStatus}&sfw=true&order_by=popularity&sort=desc`,
			);
			yield put(animeLoadPopularAction(response.data.data));
		} catch (err) {
			console.log('err', err);
		}
	}
}

// ${animeBaseURL}/anime?page=1&status=airing
