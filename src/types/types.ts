import OPTIONS from "../services/options"

export type T_ID = string;

export type T_MAX_RESULTS = '6' | '12' | '18' | '24' | '30';

export type T_ORDER_TYPE = "date" | "rating" | "relevance" | "title" | "viewCount";

export type T_PAGINTAION_BTNS = 'prevPageToken' | 'nextPageToken'

export type T_RESOURCE = keyof typeof OPTIONS;

export type T_ORDER_TYPE_KEYS = "Выберите сортировку" | "По дате" | "По рейтингу" | "По релевантности" | "По названию" | "По просмотрам";

export type T_MAX_RESULTS_KEYS = "Кол-во клипов на странице" | "6 клипов" | "12 клипов" | "18 клипов" | "24 клипа" | "30 клипов";

//  YOU_TUBE_API RESPONSES
export type T_SINGLE_VIDEO_RESPONSE = Record<string, unknown> & {items: any[]}

export type T_SEARCH_VIDEOS_RESPONSE = I_SEARCH_BASE & {items: any[], pageInfo: Record<string, number>}

// DATAPROCESSES YOU_TUBE_API RESPONSES
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

// STORE

export interface I_STORE  {
    root: HTMLHtmlElement;
    theme: string;
    items: (Partial<I_SINGLE_VIDEO>)[],
    subscribers: any[],
    query: {
        maxResults: T_MAX_RESULTS,
        order: T_ORDER_TYPE,
        q: string;
    },
    resource: T_RESOURCE,
    id: string,
    totalResults : number;
    nextPageToken: string;
    prevPageToken: string;
    currentPageToken: string;
    error: string;
    page: number;
    orderType: Record<T_ORDER_TYPE_KEYS, (T_ORDER_TYPE | "")>;
    maxResultType: Record<T_MAX_RESULTS_KEYS, (T_MAX_RESULTS | "")>;
    updateQueryParam: (key: string, v: string) => void,
    updateCurrentVideosPage: (param: T_PAGINTAION_BTNS) => void,
    observer: <T extends Function>(cb: T) => void,
    toggleAppTheme: () => void;
    VisualizeAppTheme: (theme: string) => void;
    changeRootTheme: (theme: string) => void;
}

