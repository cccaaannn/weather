import Weather from './weather';
import Storage from './storage';
import UI from './ui';

// html elements
const tempUnitDiv: HTMLElement | null = document.getElementById('temp_unit');
const tempUnitC: HTMLElement | null = document.getElementById('tempUnitC');
const tempUnitF: HTMLElement | null = document.getElementById('tempUnitF');

const cityTextArea: HTMLElement | null = document.getElementById('city');
const updateCheckBox: HTMLElement | null = document.getElementById('update');
const updateTimeSelectBox: HTMLElement | null = document.getElementById("update_time");

// eventListeners
document.addEventListener("DOMContentLoaded", init);
tempUnitDiv!.addEventListener("change", getWeather);
cityTextArea!.addEventListener("change", getWeather);
updateCheckBox!.addEventListener("change", changeAutoUpdate);
updateTimeSelectBox!.addEventListener("change", changeAutoUpdate);

// variables
let updateInterval: NodeJS.Timer;

// init classes
const weather = new Weather("8f8b404261804f45ab9d948fa7409f0d");  // openweathermap api key, please don't steal it it is free -__-
const storage = new Storage("weatherData", { city: "istanbul", tempUnit: "C", autoUpdate: true, updateTime: 5 });
const ui = new UI(["1", "2", "3", "4", "5", "10", "15", "20", "30", "60"]);




function init(): void {

    // service worker for pwa
    registerServiceWorker();

    // get saved info from storage and set the ui
    ui.setFormInfo(storage.getFromStorage());

    if ((<HTMLInputElement>updateCheckBox).checked) {
        updateInterval = setInterval(getWeather, parseInt((<HTMLInputElement>updateTimeSelectBox).value) * 1000 * 60);
    }

    getWeather();
}


function changeAutoUpdate(): void {
    if ((<HTMLInputElement>updateCheckBox).checked) {
        clearInterval(updateInterval);
        updateInterval = setInterval(getWeather, parseInt((<HTMLInputElement>updateTimeSelectBox).value) * 1000 * 60);
    }
    else {
        clearInterval(updateInterval);
    }

    // set ui
    storage.setToStorage(ui.getFormInfo());

    // show success message
    ui.displayToastMessages("success", 1, "Saved");
}


function getWeather(): void {

    let tempUnit = "C";
    if ((<HTMLInputElement>tempUnitF).checked) {
        tempUnit = "F";
    }

    const city = (<HTMLInputElement>cityTextArea).value;

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


function registerServiceWorker(): void {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(registration => {

        }).catch(error => {
            console.log("service worker can not registered");
            console.log(error);
        })
    }
}

