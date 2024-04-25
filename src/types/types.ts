import OPTIONS from "../services/options"
import { store } from "../services/store";

export type T_ID = string;

export type T_MAX_RESULTS = 6 | 12 | 18 | 24 | 30;

export type T_ORDER_TYPE = "date" | "rating" | "relevance" | "title" | "viewCount";

export type T_PAGINTAION_BTNS = 'prevPageToken' | 'nextPageToken'

export type T_RESOURCE = keyof typeof OPTIONS;

// STORE

export type T_STORE = typeof store;

//  YOUTUBE RESPONSES
export type T_SINGLE_VIDEO_RESPONSE = Record<string, unknown> & {items: any[]}

export type T_SEARCH_VIDEOS_RESPONSE = I_SEARCH_BASE & {items: any[], pageInfo: Record<string, number>}

export interface I_SINGLE_VIDEO {
    id: string,
    publishedAt: string,
    title: string,
    thumbnails: string,
    description: string,
    categoryId: string,
    channelId: string,
    channelTitle: string,
    tags: string[],
    viewCount: number,
    likeCount: number,
    commentCount: number,
    favoriteCount: number,
    dislikeCount: number,
    madeForKids: boolean,
    license: string,    
}

interface I_SEARCH_BASE {
    kind: string,
    nextPageToken: string,
    prevPageToken: string,
    totalResults: number,
    resultsPerPage: number,
}

export interface I_SEARCH_VIDEOS extends I_SEARCH_BASE {  
    items: Partial<I_SINGLE_VIDEO>[]  
}





