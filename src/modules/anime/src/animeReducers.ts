import {
	animeOnPageLoadAction,
	animeLoadSearchAction,
	clearAnimeListAction,
	animeFetchDetailsAction,
	animeLoadDetailsAction,
	animeFavouriteAction,
	animeunFavouriteAction,
} from './animeAction';
import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { Anime, AnimeState } from '../typings';

// State
const ANIME_INITIAL_STATE: AnimeState = {
	list: {
		search: [],
		favourite: [],
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
		.addCase(animeFavouriteAction, (state, action) => {
			return Object.assign({}, state, {
				favourite: state.favourite.findIndex( (list: Anime) => {return list.mal_id === action.payload.mal_id}) < 0 ? [...state.favourite, action.payload] : [...state.favourite],
			});
		})
		.addCase(animeunFavouriteAction, (state, action) => {
			return Object.assign({}, state, {
				favourite: state.favourite.filter(anime => anime.mal_id !== action.payload),
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
