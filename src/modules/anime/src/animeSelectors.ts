import {createSelector} from 'reselect';
import {GlobalState} from '../../store/typings';

export const animeMainSelector = (state: GlobalState) => state.anime;
export const animeListSelector = createSelector(
	animeMainSelector,
	anime => anime.list,
);

export const animeDetailselector = createSelector(
	animeMainSelector,
	anime => anime.details,
);

export const animeFavouriteselector = createSelector(
	animeListSelector,
	list => list.favourite,
);

export const animeSearchSelector = createSelector(
	animeListSelector,
	list => list.search,
);
