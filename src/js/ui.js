class UI {

    constructor(update_times){
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

    updateWeather(result){
        // update title
        document.title = Utilities.capitalize(result.city) + " " + result.temp + "°" + result.tempUnit;

        this.header_div.innerHTML = `
            <h1 class="display-4" id="header">${Utilities.capitalize(result.city)} ${result.temp}°${result.tempUnit}</h1>
            <h1 class="display-4" id="header"></h1>
            <h2>
                ${Utilities.capitalize(result.description)}
                <img src="${result.imageLink}">
            </h2>
        `;

        this.temp_div.innerHTML = `
            Min: ${result.tempMin}°${result.tempUnit}
            <br>
            Max: ${result.tempMax}°${result.tempUnit}
            <br>
            Feels like: ${result.feelsLike}°${result.tempUnit}
        `;

        this.other_weather_info_div.innerHTML = `
            Humidity: ${result.humidity}%
            <br>
            Wind: ${result.speed} m/s
            <br>            
            Pressure: ${result.pressure} hPa 
        `;
    }

    addUpdateTimes(){
        for (var update_time in this.update_times) {
            this.updateTimeSelectBox.innerHTML += `
                <option value="${this.update_times[update_time]}">${this.update_times[update_time]}</option>
            `;
        }
    }

    setFormInfo(formInfo){
        this.cityTextArea.value = formInfo.city;
        if(formInfo.tempUnit === "F"){
            this.tempUnitF.checked = true;
        }
        else{
            this.tempUnitC.checked = true;
        }
        this.updateCheckBox.checked = formInfo.autoUpdate;
        this.updateTimeSelectBox.value = formInfo.updateTime;
    }

    getFormInfo(){
        let formInfo = {
            city : this.cityTextArea.value,
            tempUnit : "C",
            autoUpdate : this.updateCheckBox.checked,
            updateTime : this.updateTimeSelectBox.value
        };

        if(tempUnitF.checked){
            formInfo.tempUnit = "F";
        }

        return formInfo
    }

    displayToastMessages(type, delay, message){
        
        const alert = document.createElement("div");

        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        const message_div = document.getElementById("message_div");
        message_div.appendChild(alert);

        // delay
        window.setTimeout(function(){
            alert.remove();
        },delay*1000);

    }

}