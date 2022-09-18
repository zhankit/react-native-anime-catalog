import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {Anime, AnimeCachePayload} from '../typings';

export const animeOnPageLoadAction: ActionCreatorWithPayload<AnimeCachePayload> =
	createAction<AnimeCachePayload>('ANIME/ON_PAGE_LOAD');

export const animeFetchDetailsAction: ActionCreatorWithPayload<number> =
	createAction<number>('ANIME/FETCH_DETAILS');

export const animeLoadDetailsAction: ActionCreatorWithPayload<Anime> =
	createAction<Anime>('ANIME/LOAD_DETAILS');

export const animeLoadSearchAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_SEARCH');

export const animeStartFavouriteAction: ActionCreatorWithPayload<number> =
	createAction<number>('ANIME/FAVOURITE_START');

export const animeFavouriteAction: ActionCreatorWithPayload<Anime> =
	createAction<Anime>('ANIME/FAVOURITE');

export const animeunFavouriteAction: ActionCreatorWithPayload<number> =
	createAction<number>('ANIME/UNFAVOURITE');

export const clearAnimeListAction = createAction('ANIME/CLEAR_LIST');
