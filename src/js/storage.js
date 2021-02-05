class Storage{

    constructor(saveName){
        this.saveName = saveName;
    }

    setToStorage(items){
        localStorage.setItem(this.saveName, JSON.stringify(items));
    }

    getFromStorage(){
        let items = JSON.parse(localStorage.getItem(this.saveName));

        // default values
        if(items === null){
            items = {
                city : "istanbul",
                tempUnit : "C",
                autoUpdate : true,
                updateTime : 5
            };

            if(tempUnitF.checked){
                items.tempUnit = "F";
            }
        }

        return items
    }

}
