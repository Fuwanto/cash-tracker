import { Router } from "express"
import { body, param } from "express-validator"
import { BudgetController } from "../controllers/BudgetController"
import { handleInputErrors } from "../middleware/validation"
import {
  validateBudgetExists,
  validateBudgetID,
  validateBudgetInput,
} from "../middleware/budget"

const router = Router()

// Si {param} participa, aplicar {middleware de validación}
router.param("budgetID", validateBudgetID)
router.param("budgetID", validateBudgetExists)

// rutas

router.get("/", BudgetController.getAll)

router.post(
  "/",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.create
)

router.get("/:budgetID", BudgetController.getBudgetByID)

router.put(
  "/:budgetID",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.updateBudgetByID
)

router.delete("/:budgetID", BudgetController.deleteBudgetByID)

export default router
