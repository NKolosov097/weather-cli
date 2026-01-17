import chalk from "chalk"

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️"
    case "02":
      return "🌤️"
    case "03":
      return "☁️"
    case "04":
      return "☁️"
    case "09":
      return "🌧️"
    case "10":
      return "🌦️"
    case "11":
      return "🌩️"
    case "13":
      return "❄️"
    case "50":
      return "🌫️"
  }
}

export const printError = (error) => {
  console.log(chalk.bgRed(" ERROR "), error)
}

export const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS "), message)
}

export const printHelp = () => {
  console.log(chalk.bgCyan(" HELP "), "Available commands:")
  console.log("\t -h for getting help")
  console.log("\t -c [CITY] for setting city")
  console.log("\t -t [TOKEN] for token")
  console.log("\t  without params for getting the weather")
}

export const printWeather = (weather) => {
  console.log(
    chalk.bgBlue(" WEATHER "),
    `\n\tCity: ${weather.name}`,
    `\n\t${getIcon(weather.weather[0].icon)}  ${weather.weather[0].description}`,
    `\n\tTemperature: ${weather.main.temp}°C (feels like ${weather.main.feels_like}°C)`,
    `\n\tWind: ${weather.wind.speed} m/s`,
    `\n\tHumidity: ${weather.main.humidity}%`,
  )
}
