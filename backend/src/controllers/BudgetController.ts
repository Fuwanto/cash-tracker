import type { Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
      })
      // TODO: Filtrar por el usuario autenticado
      return res.json(budgets)
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" })
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body)
      await budget.save()
      return res.status(201).json("Presupuesto creado correctamente")
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" })
    }
  }

  static getBudgetByID = async (req: Request, res: Response) => {
    return res.json(req.budget)
  }

  static updateBudgetByID = async (req: Request, res: Response) => {
    await req.budget.update(req.body)
    return res.json("Presupuesto actualizado correctamente")
  }

  static deleteBudgetByID = async (req: Request, res: Response) => {
    await req.budget.destroy()
    return res.json("Presupuesto eliminado correctamente")
  }
}
