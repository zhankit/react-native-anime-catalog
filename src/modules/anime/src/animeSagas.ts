import {all, call, take, put, select} from 'redux-saga/effects';
import axios from 'axios';
import {
	clearAnimeListAction,
	animeOnPageLoadAction,
	animeLoadTopTenAction,
	animeStartTopTenAction,
	animeLoadSearchAction,
	animeFetchDetailsAction,
	animeLoadDetailsAction,
} from './animeAction';
import {animeListSelector} from './animeSelectors';
import {AnimeCachePayload, AnimeList, AnimeStatus} from '../typings';

export default function* animeRuntime() {
	yield all([retrieveAnimeList(), retrieveAnimeDetailList()]);
}

function* retrieveAnimeList() {
	while (true) {
		try {
			// Refresh Action
			const action = yield take(animeOnPageLoadAction.toString);
			const cachedConfig: AnimeCachePayload = action.payload;

			const isRefreshed: boolean = cachedConfig.refreshCache;

			// console.log('retrieveAnimeList', isRefreshed);
			if (isRefreshed) {
				// console.log('retrieveAnimeList', isRefreshed);
				yield put(clearAnimeListAction());
			}

			// let offsetValue = 0;

			const animeList: AnimeList = yield select(animeListSelector);
			const offsetValue = animeList.search.length;

			// console.log('retrieveAnimeList', offsetValue);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const url = `https://api.jikan.moe/v4/anime?limit=10&page=${offsetValue}&status=${cachedConfig.type}&letter=${cachedConfig.searchString}`;
			const response = yield call(axios.get, url);
			// console.log('response', url, response.data.data)
			// console.log('retrieveAnimeList', url);

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
			const action = yield take(animeFetchDetailsAction.toString);
			const id: number = action.payload;

			console.log('retrieveAnimeDetailList id', id, action.payload);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const url = `https://api.jikan.moe/v4/anime/${id}/full`;
			const response = yield call(axios.get, url);
			// console.log('response', url, response.data.data)
			console.log('retrieveAnimeDetailList', url, response.data.data);

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
			const action = yield take(animeStartTopTenAction.toString);
			const actionStatus: AnimeStatus = action.payload;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const response = yield call(
				axios.get,
				`https://api.jikan.moe/v4/anime?limit=10&page=0&status=${actionStatus}`,
			);
			yield put(animeLoadTopTenAction(response.data.data));
		} catch (err) {
			console.log('err', err);
		}
	}
}

// https://api.jikan.moe/v4/anime?page=1&status=airing
