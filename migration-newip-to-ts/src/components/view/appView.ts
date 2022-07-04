import News from './news/news';
import Sources from './sources/sources';
import { TArticle } from '../../types/index';
import { TSources } from '../../types/index';

interface IAppView {
    news: News;
    sources: Sources;
    drawNews(data: TDrawNewsData): void;
    drawSources(data: TDrawSources): void;
}
export type TDrawNewsData = {
    articles: TArticle[];
    status: string;
    totalResults: number;
};

export type TDrawSources = {
    status: string;
    sources: TSources[];
};

export class AppView implements IAppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: TDrawNewsData): void {
        console.log(data, 'bbbbbbbbbbbbbbb');
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: TDrawSources): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
