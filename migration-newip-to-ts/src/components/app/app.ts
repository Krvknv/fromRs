import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { TDrawNewsData } from '../view/appView';
import { TDrawSources } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: Required<TDrawNewsData>) => this.view.drawNews(data))
        );
        this.controller.getSources((data: Required<TDrawSources>) => this.view.drawSources(data));
    }
}

export default App;
