import { IStorage } from './types';

class Storage {
    saveName: string;
    defaultItems: IStorage;

    constructor(saveName: string, defaultItems: IStorage) {
        this.saveName = saveName;
        this.defaultItems = defaultItems;
    }

    setToStorage(items: IStorage): void {
        localStorage.setItem(this.saveName, JSON.stringify(items));
    }

    getFromStorage(): IStorage {

        let items: IStorage;
        let rawItems: string | null = localStorage.getItem(this.saveName);

        // default values
        if (rawItems === null) {
            // items = {
            //     city : "istanbul",
            //     tempUnit : "C",
            //     autoUpdate : true,
            //     updateTime : 5
            // };
            items = this.defaultItems;
        }
        else {
            items = JSON.parse(rawItems);
        }

        return items
    }

}

export default Storage;
