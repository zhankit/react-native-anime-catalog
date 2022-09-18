import {
	animeOnPageLoadAction,
	animeLoadSearchAction,
	animeLoadLatestAction,
	animeLoadPopularAction,
	animeStartLoadTopTenAction,
	animeLoadTopTenAction,
	clearAnimeListAction,
	animeFetchDetailsAction,
	animeLoadDetailsAction,
	animeStartLoadPopularAction,
	animeStartLoadLatestAction,
} from './animeAction';
import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { AnimeState } from '../typings';

// State
const ANIME_INITIAL_STATE: AnimeState = {
	list: {
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
		.addCase(animeLoadSearchAction, (state, action) => {
			return Object.assign({}, state, {
				search: [...state.search, ...action.payload],
			});
		})
		.addCase(animeStartLoadLatestAction, () => {
			ANIME_INITIAL_STATE.list;
		})
		.addCase(animeLoadLatestAction, (state, action) => {
			return Object.assign({}, state, {
				latest: [...state.latest, ...action.payload],
			});
		})
		.addCase(animeStartLoadPopularAction, () => {
			ANIME_INITIAL_STATE.list;
		})
		.addCase(animeLoadPopularAction, (state, action) => {
			return Object.assign({}, state, {
				popular: [...state.popular, ...action.payload],
			});
		})
		.addCase(animeStartLoadTopTenAction, () => {
			ANIME_INITIAL_STATE.list;
		})
		.addCase(animeLoadTopTenAction, (state, action) => {
			return Object.assign({}, state, {
				topTen: [...action.payload],
			});
		})
		.addDefaultCase(() => {
			ANIME_INITIAL_STATE.list;
		});
});

const details = createReducer(ANIME_INITIAL_STATE.details, builder => {
	builder
		.addCase(animeFetchDetailsAction, (state, action) => ANIME_INITIAL_STATE.details)
		.addCase(animeLoadDetailsAction, (_, action) => action.payload)
		.addDefaultCase(() => {
			ANIME_INITIAL_STATE.details;
		});
});

const animeReducers = combineReducers({
	list,
	details,
});

export default animeReducers;
