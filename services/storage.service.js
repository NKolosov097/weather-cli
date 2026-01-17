import { promises } from "fs"

import { printError } from "./log.service.js"

import { FILE_PATH } from "../constants.js"

const isFileExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch (error) {
    printError(
      `[storage.service.js] with getting statistic for file with path: ${path}`,
    )
    return false
  }
}

export const saveKeyValue = async (key, value) => {
  try {
    let data = {}

    try {
      const hasFile = await isFileExist(FILE_PATH)

      if (hasFile) {
        const file = await promises.readFile(FILE_PATH)
        data = JSON.parse(file ?? "{}")
      }
    } catch (error) {
      printError(
        `[storage.service.js] with reading file with path: ${FILE_PATH}`,
      )
    }

    data = { ...data, [key]: value }

    await promises.writeFile(FILE_PATH, JSON.stringify(data))
  } catch (error) {
    printError(
      `[storage.service.js] with writing data into file.\nkey: ${key}\nvalue: ${value}\nfile path: ${FILE_PATH}`,
    )
  }
}

export const getValueByKey = async (key) => {
  try {
    const hasFile = await isFileExist(FILE_PATH)

    if (hasFile) {
      const file = await promises.readFile(FILE_PATH)
      const data = JSON.parse(file ?? "{}")
      return data[key]
    }
  } catch (error) {
    printError(
      `[storage.service.js] with getting value by key - ${key}: ${error?.message}`,
    )
  }

  return null
}
