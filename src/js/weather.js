class Weather{

    constructor(apiKey){
        this.apiBase = "http://api.openweathermap.org/data/2.5/weather?appid=" + apiKey;
        this.imageLinkBase = "http://openweathermap.org/img/wn/";
    }

    async getWeatherData(city, tempUnit){

        const url = this.apiBase + "&q=" + city;

        const response = await fetch(url);
        const data = await response.json();

        // temp data
        let temp = data.main.temp;
        temp = await Utilities.convertTemp(temp, tempUnit);

        let tempMin = data.main.temp_min;
        tempMin = await Utilities.convertTemp(tempMin, tempUnit);

        let tempMax = data.main.temp_max;
        tempMax = await Utilities.convertTemp(tempMax, tempUnit);

        let feelsLike = data.main.feels_like;
        feelsLike = await Utilities.convertTemp(feelsLike, tempUnit);

        // other weather info
        let pressure = data.main.pressure; //hPa
        let humidity = data.main.humidity; //%
        let speed = data.wind.speed; //meter/sec
        let description = data.weather[0].description;

        // icon
        let imageLink = this.imageLinkBase + data.weather[0].icon + ".png";

        return {city, temp, tempMin, tempMax, feelsLike, tempUnit, pressure, humidity, speed, description, imageLink};
    }

}

