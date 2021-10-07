interface ITempData {
    city: string,

    temp: string,
    tempMin: string,
    tempMax: string,
    feelsLike: string,
    tempUnit: string,

    pressure: string,
    humidity: string,
    speed: string,

    description: string,
    imageLink: string
}

interface IStorage {
    city: string,
    tempUnit: string,
    autoUpdate: boolean,
    updateTime: number
}

export { ITempData, IStorage };