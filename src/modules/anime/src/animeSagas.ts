import {all, call, take, put, select} from 'redux-saga/effects';
import axios from 'axios';
import {
	clearAnimeListAction,
	animeOnPageLoadAction,
	animeLoadSearchAction,
	animeFetchDetailsAction,
	animeLoadDetailsAction,
} from './animeAction';
import { animeListSelector} from './animeSelectors';
import {AnimeCachePayload, AnimeList} from '../typings';
import { animeBaseURL } from './animeConstants';

export default function* animeRuntime() {
	yield all([retrieveAnimeList(), retrieveAnimeDetailList()]);
}

function* retrieveAnimeList() {
	while (true) {
		try {

			// Refresh Action
			const action = yield take(animeOnPageLoadAction.toString());

			const cachedConfig: AnimeCachePayload = action.payload;
			const isInitial: boolean = cachedConfig.initialLoad;
			if (isInitial) {
				yield put(clearAnimeListAction());
				return;
			}

			const isRefreshed: boolean = cachedConfig.refreshCache;

			const animeList: AnimeList = yield select(animeListSelector);
			const offsetValue = animeList.search.length / 20 + 1;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method
			const url = `${animeBaseURL}/anime?limit=20&page=${offsetValue}&status=${cachedConfig.type}&letter=${cachedConfig.searchString}&order_by=score&sort=desc&sfw=true`;
			const response = yield call(axios.get, url);
			if (isRefreshed) {
				yield put(clearAnimeListAction());
			}
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

