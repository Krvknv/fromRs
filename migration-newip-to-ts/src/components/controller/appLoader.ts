import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '2da02d42a0bf46708e6e5bdd24d846ed', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
