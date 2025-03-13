import type { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Expense from "../models/Expense"

// Extiende la interfaz Request de Express para incluir una
// propiedad opcional 'expense' de tipo 'Expense'.
declare global {
  namespace Express {
    interface Request {
      expense?: Expense
    }
  }
}

export const validateExpenseInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre del gasto no puede ir vacío")
    .run(req)
  await body("amount")
    .notEmpty()
    .withMessage("La cantidad del gasto no puede ir vacía")
    .isNumeric()
    .withMessage("Cantidad no válida")
    .custom((value) => value > 0)
    .withMessage("El gasto debe ser mayor a 0")
    .run(req)

  next()
}

export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("expenseId")
    .isInt()
    .withMessage("ID no valido")
    .custom((value) => value > 0)
    .withMessage("ID no valido")
    .run(req)

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expenseId } = req.params
    const expense = await Expense.findByPk(expenseId)
    if (!expense) {
      const error = new Error("Gasto no encontrado")
      return res.status(404).json({ error: error.message })
    }
    req.expense = expense

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error" })
  }
}
