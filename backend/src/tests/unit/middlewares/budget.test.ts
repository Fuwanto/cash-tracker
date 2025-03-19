import { createRequest, createResponse } from "node-mocks-http"
import { validateBudgetExists, hasAccess } from "../../../middleware/budget"
import Budget from "../../../models/Budget"
import { budgets } from "../../mocks/budgets"

jest.mock("../../../models/Budget", () => ({
  findByPk: jest.fn(),
}))

describe("budget - validateBudgetExists", () => {
  it("should handle non-existent budget", async () => {
    ;(Budget.findByPk as jest.Mock).mockResolvedValue(null)
    const req = createRequest({
      params: { budgetId: 1 },
    })
    const res = createResponse()
    const next = jest.fn()

    await validateBudgetExists(req, res, next)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(404)
    expect(data).toEqual({ error: "Presupuesto no encontrado" })
    expect(next).not.toHaveBeenCalled()
  })

  it("should handle catch error", async () => {
    ;(Budget.findByPk as jest.Mock).mockRejectedValue(new Error())
    const req = createRequest({
      params: { budgetId: 1 },
    })
    const res = createResponse()
    const next = jest.fn()

    await validateBudgetExists(req, res, next)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(500)
    expect(data).toEqual({ error: "Hubo un error" })
    expect(next).not.toHaveBeenCalled()
  })

  it("should proceed to next middleware if budget exists", async () => {
    ;(Budget.findByPk as jest.Mock).mockResolvedValue(budgets[0])
    const req = createRequest({
      params: { budgetId: 1 },
    })
    const res = createResponse()
    const next = jest.fn()

    await validateBudgetExists(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(req.budget).toEqual(budgets[0])
  })
})

describe("budget - hasAccess", () => {
  it("should call next() if user has access to budget", async () => {
    const req = createRequest({
      budget: budgets[0],
      user: { id: 1 },
    })
    const res = createResponse()
    const next = jest.fn()

    await hasAccess(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })

  it("should return 401 error if userId does not have access to budget", async () => {
    const req = createRequest({
      budget: budgets[0],
      user: { id: 2 },
    })
    const res = createResponse()
    const next = jest.fn()

    await hasAccess(req, res, next)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(401)
    expect(data).toEqual({ error: "Acción no válida" })
    expect(next).not.toHaveBeenCalled()
  })
})
