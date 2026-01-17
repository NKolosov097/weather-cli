#!/usr/bin/env node

import {
  printError,
  printSuccess,
  printHelp,
  printWeather,
} from "./services/log.service.js"
import { getValueByKey, saveKeyValue } from "./services/storage.service.js"
import { getWeather } from "./services/api.service.js"

import { getArgs } from "./utils/args.js"
import { DICTIONARY } from "./constants.js"

const saveToken = async (token) => {
  if (!token.length) {
    return printError("[weather.js] Token value is missing")
  }

  try {
    await saveKeyValue(DICTIONARY.token, token)
    printSuccess(`with saving token: ${token}`)
  } catch (error) {
    printError(`[weather.js] with saving token: ${error?.message}`)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    return printError("[weather.js] City value is missing")
  }

  try {
    await saveKeyValue(DICTIONARY.city, city)
    printSuccess(`with saving city: ${city}`)
  } catch (error) {
    printError(`[weather.js] with saving city: ${error?.message}`)
  }
}

const getForecast = async (city) => {
  try {
    let cityForRequest = city ?? (await getValueByKey(DICTIONARY.city))

    const weather = await getWeather(cityForRequest)

    if (weather) {
      printWeather(weather)
    }
  } catch (error) {
    printError(`[weather.js] with fetching weather data: ${error?.message}`)
  }
}

const initCLI = async () => {
  try {
    const args = getArgs(process.argv)

    if (args?.h) {
      printHelp()
      return
    }
    if (args.c) {
      await saveCity(args.c)
      await getForecast(args.c)
      return
    }
    if (args.t) {
      await saveToken(args.t)
      return
    }

    return await getForecast()
  } catch (error) {
    printError(`[weather.js] with initializing CLI: ${error?.message}`)
  }
}

initCLI()
