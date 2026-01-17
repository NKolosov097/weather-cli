import axios from "axios"

import { getValueByKey } from "./storage.service.js"
import { printError } from "./log.service.js"

import { BASE_API } from "../constants.js"

export const getWeather = async (city) => {
  let token = ""

  try {
    token = await getValueByKey("token")
  } catch (error) {
    printError(`[api.service.js] with getting token: ${error?.message}`)
  }

  if (!token) {
    return printError("[api.service.js] API token is missing")
  }
  if (!city) {
    return printError("[api.service.js] City value is missing")
  }

  try {
    const { data } = await axios.get(`${BASE_API}/weather`, {
      params: {
        q: city,
        appid: token,
        lang: "en",
        units: "metric",
      },
    })

    return data
  } catch (error) {
    if (error.response?.status === 404) {
      printError(`[api.service.js] City not found: ${city}`)
    } else if (error.response?.status === 401) {
      printError(`[api.service.js] Invalid API token`)
    } else {
      printError(
        `[api.service.js] with fetching weather data: ${error?.message}`,
      )
    }
  }
}
