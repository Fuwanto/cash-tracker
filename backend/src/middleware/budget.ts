import type { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Budget from "../models/Budget"

// Extiende la interfaz Request de Express para incluir una
// propiedad opcional 'budget' de tipo 'Budget'.
declare global {
  namespace Express {
    interface Request {
      budget?: Budget
    }
  }
}

export const validateBudgetID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("budgetID")
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

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { budgetID } = req.params
    const budget = await Budget.findByPk(budgetID)
    if (!budget) {
      const error = new Error("Presupuesto no encontrado")
      return res.status(404).json({ error: error.message })
    }
    req.budget = budget

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error" })
  }
}

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre del presupuesto no puede ir vacío")
    .run(req)
  await body("amount")
    .notEmpty()
    .withMessage("La cantidad del presupuesto no puede ir vacía")
    .isNumeric()
    .withMessage("Cantidad no válida")
    .custom((value) => value > 0)
    .withMessage("El presupuesto debe ser mayor a 0")
    .run(req)

  next()
}
