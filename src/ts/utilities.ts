class Utilities {

    static capitalize(str: string): string {
        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static async convertTemp(temp: number, tempUnit: string): Promise<string> {
        // convert to Fahrenheit
        if (tempUnit === "F") {
            temp = temp * 9 / 5 - 459.67;
        }
        // default is Celsius
        else {
            temp = temp - 272.15;
        }
        const tempStr: string = temp.toLocaleString('en-US', { maximumFractionDigits: 1 });
        return tempStr
    }

}

export default Utilities;