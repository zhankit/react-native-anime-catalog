export interface AnimeSearch {
	results: AnimeSearch[];
	last_page: number;
}

export type AnimeStatus = 'airing' | 'complete' | 'upcoming' | 'favourite';

export interface AnimeCachePayload {
	initialLoad: boolean;
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
	about: string;
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
	rank: number;
	rating: Rated | null;
	favorite: boolean;
	year: number;
	producers: Resources;
	licensors: Resources;
	demographics: Resources;
	trailer: Trailer;
}

export interface Trailer {
	youtube_id: string;
	url: string;
	embed_url: string;
}

export enum Rated {
	G = 'G - All Ages',
	PG = 'PG - Children',
	PG13 = 'PG-13 - Teens 13 or older',
	R = 'R - 17+ (violence & profanity)',
	RatedR = 'R+ - Mild Nudity',
	Rx = 'Rx - Hentai',
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

export interface Resources {
	mal_id: integer;
	type: string;
	name: string;
	url: string;
}
