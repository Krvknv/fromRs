export interface ISources {
    status: string;
    sources: ISoruce[];
}

type ISoruce = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type TArticle = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
};

export type TSources = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};
