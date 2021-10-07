import Utilities from './utilities';
import { ITempData, IStorage } from './types';

class UI {
    tempUnitC: HTMLElement | null;
    tempUnitF: HTMLElement | null;
    cityTextArea: HTMLElement | null;
    updateCheckBox: HTMLElement | null;
    updateTimeSelectBox: HTMLElement | null;
    header_div: HTMLElement | null;
    temp_div: HTMLElement | null;
    other_weather_info_div: HTMLElement | null;
    update_times: string[];

    constructor(update_times: string[]) {
        this.tempUnitC = document.getElementById('tempUnitC');
        this.tempUnitF = document.getElementById('tempUnitF');

        this.cityTextArea = document.getElementById('city');
        this.updateCheckBox = document.getElementById('update');
        this.updateTimeSelectBox = document.getElementById("update_time");

        this.header_div = document.getElementById("header_div");
        this.temp_div = document.getElementById("temp_div");
        this.other_weather_info_div = document.getElementById("other_weather_info_div");

        this.update_times = update_times;

        this.addUpdateTimes();
    }

    updateWeather(result: ITempData): void {
        // update title
        document.title = Utilities.capitalize(result.city) + " " + result.temp + "°" + result.tempUnit;

        this.header_div!.innerHTML = `
            <h1 class="display-4" id="header">${Utilities.capitalize(result.city)} ${result.temp}°${result.tempUnit}</h1>
            <h1 class="display-4" id="header"></h1>
            <h2>
                ${Utilities.capitalize(result.description)}
                <img src="${result.imageLink}">
            </h2>
        `;

        this.temp_div!.innerHTML = `
            Min: ${result.tempMin}°${result.tempUnit}
            <br>
            Max: ${result.tempMax}°${result.tempUnit}
            <br>
            Feels like: ${result.feelsLike}°${result.tempUnit}
        `;

        this.other_weather_info_div!.innerHTML = `
            Humidity: ${result.humidity}%
            <br>
            Wind: ${result.speed} m/s
            <br>            
            Pressure: ${result.pressure} hPa 
        `;
    }

    addUpdateTimes(): void {
        for (var update_time in this.update_times) {
            this.updateTimeSelectBox!.innerHTML += `
                <option value="${this.update_times[update_time]}">${this.update_times[update_time]}</option>
            `;
        }
    }

    setFormInfo(formInfo: IStorage): void {
        (<HTMLInputElement>this.cityTextArea).value = formInfo.city;
        if (formInfo.tempUnit === "F") {
            (<HTMLInputElement>this.tempUnitF).checked = true;
        }
        else {
            (<HTMLInputElement>this.tempUnitC).checked = true;
        }
        (<HTMLInputElement>this.updateCheckBox).checked = formInfo.autoUpdate;
        (<HTMLInputElement>this.updateTimeSelectBox).value = formInfo.updateTime.toString();
    }

    getFormInfo(): IStorage {
        let formInfo: IStorage = {
            city: (<HTMLInputElement>this.cityTextArea).value,
            tempUnit: "C",
            autoUpdate: (<HTMLInputElement>this.updateCheckBox).checked,
            updateTime: parseInt((<HTMLInputElement>this.updateTimeSelectBox).value)
        };

        if ((<HTMLInputElement>this.tempUnitF).checked) {
            formInfo.tempUnit = "F";
        }

        return formInfo
    }

    displayToastMessages(type: string, delay: number, message: string): void {

        const alert = document.createElement("div");

        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        const message_div = document.getElementById("message_div");
        message_div!.appendChild(alert);

        // delay
        window.setTimeout(function () {
            alert.remove();
        }, delay * 1000);

    }

}


export default UI;