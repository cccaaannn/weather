import Utilities from './utilities';
import { ITempData } from './types';

class Weather {
    apiBase: string;
    imageLinkBase: string;

    constructor(apiKey: string) {
        this.apiBase = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey;
        this.imageLinkBase = "https://openweathermap.org/img/wn/";
    }

    async getWeatherData(city: string, tempUnit: string): Promise<ITempData> {

        const url: string = this.apiBase + "&q=" + city;

        const response: Response = await fetch(url);
        const data: any = await response.json();

        // temp data
        let temp: string = data.main.temp;
        temp = await Utilities.convertTemp(parseInt(temp), tempUnit);

        let tempMin: string = data.main.temp_min;
        tempMin = await Utilities.convertTemp(parseInt(tempMin), tempUnit);

        let tempMax: string = data.main.temp_max;
        tempMax = await Utilities.convertTemp(parseInt(tempMax), tempUnit);

        let feelsLike: string = data.main.feels_like;
        feelsLike = await Utilities.convertTemp(parseInt(feelsLike), tempUnit);

        // other weather info
        let pressure: string = data.main.pressure;  // hPa
        let humidity: string = data.main.humidity;  // %
        let speed: string = data.wind.speed;        // meter/sec
        let description: string = data.weather[0].description;

        // icon
        let imageLink: string = this.imageLinkBase + data.weather[0].icon + ".png";

        return { city, temp, tempMin, tempMax, feelsLike, tempUnit, pressure, humidity, speed, description, imageLink };
    }

}


export default Weather;
