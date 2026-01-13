import chalk from "chalk"

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR "), error)
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS "), message)
}

const printHelp = () => {
  console.log(chalk.bgCyan(" HELP "), "Available commands:")
  console.log("\t -h for getting help")
  console.log("\t -c [CITY] for setting city")
  console.log("\t -t [TOKEN] for token")
  console.log("\t  without params for getting the weather")
}

export { printError, printSuccess, printHelp }
