import { homedir } from "os"
import { join } from "path"

export const FILE_PATH = join(homedir(), "weather-data.json")
export const BASE_API = "https://api.openweathermap.org/data/2.5"

export const DICTIONARY = {
  token: "token",
  city: "city",
}
