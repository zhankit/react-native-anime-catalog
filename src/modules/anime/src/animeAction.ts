import {ActionCreators} from '@react-navigation/native';
import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {Anime, AnimeCachePayload, AnimeStatus} from '../typings';

export const animeOnPageLoadAction: ActionCreatorWithPayload<AnimeCachePayload> =
	createAction<AnimeCachePayload>('ANIME/ON_PAGE_LOAD');

export const animeFetchDetailsAction: ActionCreatorWithPayload<number> =
	createAction<number>('ANIME/FETCH_DETAILS');

export const animeLoadDetailsAction: ActionCreatorWithPayload<Anime> =
	createAction<Anime>('ANIME/LOAD_DETAILS');

/**
 * AnimeLoadAiring
 */
export const animeLoadAiringAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_AIRING');
export const animeLoadCompleteAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_COMPLETE');
export const animeLoadUpcomingAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_UPCOMING');

export const animeStartLoadSearchAction = createAction<AnimeStatus>(
	'ANIME/START_LOAD_ANIME_SEARCH',
);

export const animeLoadSearchAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_SEARCH');

export const animeStartTopTenAction: ActionCreatorWithPayload<AnimeStatus> =
	createAction<AnimeStatus>('ANIME/START_ANIME_TOPTEN');
export const animeLoadTopTenAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_TOPTEN');

export const animeStartLoadLatestAction: ActionCreatorWithPayload<AnimeStatus> =
	createAction<AnimeStatus>('ANIME/START_LOAD_ANIME_LATEST');
export const animeLoadLatestAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_LATEST');

export const animeStartLoadPopularAction: ActionCreatorWithPayload<AnimeStatus> =
	createAction<AnimeStatus>('ANIME/START_LOAD_ANIME_POPULAR');
export const animeLoadPopularAction: ActionCreatorWithPayload<Anime[]> =
	createAction<Anime[]>('ANIME/LOAD_ANIME_POPULAR');

export const animeQueryAction: ActionCreatorWithPayload<AnimeCachePayload> =
	createAction<AnimeCachePayload>('ANIME/QUERY_ANIME');

// export const animeLoadUpcomingAction = createAction<Anime[]>('ANIME/LOAD_ANIME_UPCOMING');
// export const animeLoadUpcomingAction = createAction<Anime[]>('ANIME/LOAD_ANIME_UPCOMING');

export const clearAnimeListAction = createAction('ANIME/CLEAR_LIST');
