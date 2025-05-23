import type { Request, Response } from "express"
import Expense from "../models/Expense"

export class ExpensesController {
  static create = async (req: Request, res: Response) => {
    try {
      const expense = await Expense.create(req.body)
      expense.budgetId = req.budget.id
      await expense.save()
      return res.status(201).json("Gasto agregado correctamente")
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" })
    }
  }

  static getById = async (req: Request, res: Response) => {
    return res.json(req.expense)
  }

  static updateById = async (req: Request, res: Response) => {
    await req.expense.update(req.body)
    return res.json("Se actualizo correctamente")
  }

  static deleteById = async (req: Request, res: Response) => {
    await req.expense.destroy()
    return res.json("Gasto Eliminado")
  }
}
