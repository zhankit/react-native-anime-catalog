import {createSelector} from 'reselect';
import {GlobalState} from '../../store/typings';

export const animeMainSelector = (state: GlobalState) => state.anime;
export const animeListSelector = createSelector(
	animeMainSelector,
	anime => anime.list,
);

export const animeAiringSelector = createSelector(
	animeListSelector,
	list => list.airing,
);
export const animeCompleteSelector = createSelector(
	animeListSelector,
	list => list.complete,
);
export const animeUpcomingSelector = createSelector(
	animeListSelector,
	list => list.upcoming,
);

export const animeSearchSelector = createSelector(
	animeListSelector,
	list => list.search,
);
export const animePopularSelector = createSelector(
	animeListSelector,
	list => list.popular,
);
export const animeTopTenSelector = createSelector(
	animeListSelector,
	list => list.topTen,
);
export const animeLatestSelector = createSelector(
	animeListSelector,
	list => list.latest,
);
