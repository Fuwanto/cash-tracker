import { Router } from "express"
import { BudgetController } from "../controllers/BudgetController"
import { handleInputErrors } from "../middleware/validation"
import {
  hasAccess,
  validateBudgetExists,
  validateBudgetId,
  validateBudgetInput,
} from "../middleware/budget"
import { ExpensesController } from "../controllers/ExpenseController"
import {
  validateExpenseExists,
  validateExpenseId,
  validateExpenseInput,
} from "../middleware/expense"
import { authenticate } from "../middleware/auth"

const router = Router()

router.use(authenticate) // genera -> req.user

// Si {param} participa, aplicar {middleware de validación} (El orden es importante)
router.param("budgetId", validateBudgetId)
router.param("budgetId", validateBudgetExists) // genera -> req.budget
router.param("budgetId", hasAccess) // necesita de req.user y req.budget
router.param("expenseId", validateExpenseId)
router.param("expenseId", validateExpenseExists)

// rutas

router.get("/", BudgetController.getAll)

router.post(
  "/",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.create
)

router.get("/:budgetId", BudgetController.getById)

router.put(
  "/:budgetId",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.updateById
)

router.delete("/:budgetId", BudgetController.deleteById)

// routes for expenses:

router.post(
  "/:budgetId/expenses",
  validateExpenseInput,
  handleInputErrors,
  ExpensesController.create
)

router.get(
  "/:budgetId/expenses/:expenseId",
  validateExpenseInput,
  handleInputErrors,
  ExpensesController.getById
)

router.put("/:budgetId/expenses/:expenseId", ExpensesController.updateById)

router.delete("/:budgetId/expenses/:expenseId", ExpensesController.deleteById)

export default router
