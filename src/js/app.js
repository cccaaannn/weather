// html elements
const tempUnitDiv = document.getElementById('temp_unit');
const tempUnitC = document.getElementById('tempUnitC');
const tempUnitF = document.getElementById('tempUnitF');

const cityTextArea = document.getElementById('city');
const updateCheckBox = document.getElementById('update');
const updateTimeSelectBox = document.getElementById("update_time");

// eventListeners
document.addEventListener("DOMContentLoaded", initUi);
tempUnitDiv.addEventListener("change", getWeather);
cityTextArea.addEventListener("change", getWeather);
updateCheckBox.addEventListener("change", changeAutoUpdate);
updateTimeSelectBox.addEventListener("change", changeAutoUpdate);

// variables
let updateInterval;

// init classes
weather = new Weather("8f8b404261804f45ab9d948fa7409f0d");  // openweathermap api key, please don't steal it it is free -__-
storage = new Storage("weatherData");
ui = new UI(["1","2","3","4","5","10","15","20","30","60"]);




function initUi(){
    // get saved info from storage and set the ui
    ui.setFormInfo(storage.getFromStorage());

    if(updateCheckBox.checked){
        updateInterval = setInterval(getWeather, updateTimeSelectBox.value * 1000 * 60);
    }

    getWeather();
}


function changeAutoUpdate(){
    if(updateCheckBox.checked){
        clearInterval(updateInterval);
        updateInterval = setInterval(getWeather, updateTimeSelectBox.value * 1000 * 60);
    }
    else{
        clearInterval(updateInterval);
    }

    // set ui
    storage.setToStorage(ui.getFormInfo());

    // show success message
    ui.displayToastMessages("success", 1, "Saved");
}


function getWeather(){

    let tempUnit = "C";
    if(tempUnitF.checked){
        tempUnit = "F";
    }

    const city = cityTextArea.value;

    weather.getWeatherData(city, tempUnit)
    .then((result) => {
        console.log(result);
        
        // update storage
        storage.setToStorage(ui.getFormInfo());

        // set ui
        ui.updateWeather(result);

        // show success message
        ui.displayToastMessages("success", 1, "Updated");
    }).catch((err) => {
        // console.log(err);
        ui.displayToastMessages("error", 2, "Can not find the city");
    });

}

