import { exit } from "node:process"
import colors from "colors"
import { db } from "../config/db"

const clearData = async () => {
  try {
    console.log(
      colors.blue.bold("Eliminando datos de la BD antes de los tests...")
    )
    await db.sync({ force: true })
    console.log(colors.green.bold("Datos eliminados correctamente"))
    exit(0)
  } catch (error) {
    console.log(colors.red.bold("Hubo un error"))
    exit(1)
  }
}

if (process.argv[2] === "--clear") {
  clearData()
}
