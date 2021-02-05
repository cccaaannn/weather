class Utilities {

    static capitalize(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static async convertTemp(temp, tempUnit){
        // convert to Fahrenheit
        if(tempUnit === "F"){
            temp = temp * 9/5 - 459.67;
        }
        // default is Celsius
        else{
            temp = temp - 272.15;
        }
        temp = temp.toLocaleString('en-US', {maximumFractionDigits:1});
        return temp
    }

}