import {
	animeOnPageLoadAction,
	animeLoadAiringAction,
	animeLoadUpcomingAction,
	animeLoadCompleteAction,
	animeLoadSearchAction,
	animeLoadLatestAction,
	animeLoadPopularAction,
	animeStartTopTenAction,
	animeLoadTopTenAction,
	clearAnimeListAction,
	animeFetchDetailsAction,
} from './animeAction';
import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { AnimeState } from '../typings';

// State
const ANIME_INITIAL_STATE: AnimeState = {
	list: {
		airing: [],
		complete: [],
		upcoming: [],
		search: [],
		topTen: [],
		latest: [],
		popular: [],
	},
	details: null,
	loading: false,
};

const list = createReducer(ANIME_INITIAL_STATE.list, builder => {
	builder
		.addCase(clearAnimeListAction, () => ANIME_INITIAL_STATE.list)
		.addCase(animeOnPageLoadAction, () => {
			ANIME_INITIAL_STATE.list;
		})
		.addCase(animeLoadAiringAction, (state, action) => {
			return Object.assign({}, state, {
				airing: [...state.airing, ...action.payload],
			});
		})
		.addCase(animeLoadCompleteAction, (state, action) => {
			return Object.assign({}, state, {
				complete: [...state.complete, ...action.payload],
			});
		})
		.addCase(animeLoadUpcomingAction, (state, action) => {
			return Object.assign({}, state, {
				upcoming: [...state.upcoming, ...action.payload],
			});
		})
		.addCase(animeLoadSearchAction, (state, action) => {
			return Object.assign({}, state, {
				search: [...state.search, ...action.payload],
			});
		})
		.addCase(animeLoadLatestAction, (state, action) => {
			return Object.assign({}, state, {
				latest: [...state.latest, ...action.payload],
			});
		})
		.addCase(animeLoadPopularAction, (state, action) => {
			return Object.assign({}, state, {
				popular: [...state.popular, ...action.payload],
			});
		})
		.addCase(animeStartTopTenAction, () => {
			ANIME_INITIAL_STATE.list;
		})
		.addCase(animeLoadTopTenAction, (state, action) => {
			return Object.assign({}, state, {
				topten: [...state.topTen, ...action.payload],
			});
		})
		.addDefaultCase(() => {
			ANIME_INITIAL_STATE.list;
		});
});

const details = createReducer(ANIME_INITIAL_STATE.details, builder => {
	builder
		.addCase(animeFetchDetailsAction, (state, action) => state)
		.addDefaultCase(() => {
			ANIME_INITIAL_STATE.details;
		});
});

const animeReducers = combineReducers({
	list,
	details,
});

export default animeReducers;
