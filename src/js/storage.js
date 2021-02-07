class Storage{

    constructor(saveName, defaultItems){
        this.saveName = saveName;
        this.defaultItems = defaultItems;
    }

    setToStorage(items){
        localStorage.setItem(this.saveName, JSON.stringify(items));
    }

    getFromStorage(){
        let items = JSON.parse(localStorage.getItem(this.saveName));

        // default values
        if(items === null){
            // items = {
            //     city : "istanbul",
            //     tempUnit : "C",
            //     autoUpdate : true,
            //     updateTime : 5
            // };
            items = this.defaultItems;
        }

        return items
    }

}
