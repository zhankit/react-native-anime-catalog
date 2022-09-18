export interface AnimeSearch {
	results: AnimeSearch[];
	last_page: number;
}

export type AnimeStatus = 'airing' | 'complete' | 'upcoming' | 'favourite';

export interface AnimeCachePayload {
	refreshCache: boolean;
	type: string;
	searchString?: string;
	orderBy?: AnimeOrderBy;
}

type AnimeOrderBy =
	| 'mal_id'
	| 'title'
	| 'type'
	| 'rating'
	| 'start_date'
	| 'end_date'
	| 'episodes'
	| 'score'
	| 'scored_by'
	| 'rank'
	| 'popularity'
	| 'members'
	| 'favorites';

export interface AnimeState {
	list: AnimeList;
	details: Anime | null;
	loading: boolean;
}

export interface AnimeList {
	airing: Anime[];
	complete: Anime[];
	upcoming: Anime[];

	search: Anime[];
	topTen: Anime[];
	latest: Anime[];
	popular: Anime[];
}

export interface Anime {
	mal_id: number;
	url: string;
	images: {
		[key: string]: images;
	};
	image_url: string;
	title: string;
	airing: boolean;
	background: string;
	synopsis: string;
	synopsis: string;
	type: Type;
	episodes: number;
	score: number;
	start_date: Date | null;
	end_date: Date | null;
	members: number;
	rated: Rated | null;
	favorite: boolean;
}

export enum Rated {
	G = 'G',
	PG = 'PG',
	PG13 = 'PG-13',
	R = 'R',
	RatedR = 'R+',
	Rx = 'Rx',
}

export enum Type {
	Movie = 'Movie',
	Music = 'Music',
	Ona = 'ONA',
	Ova = 'OVA',
	Special = 'Special',
	Tv = 'TV',
}

export interface images {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}
