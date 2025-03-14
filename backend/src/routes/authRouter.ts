import { Router } from "express"
import { body } from "express-validator"
import { AuthController } from "../controllers/AuthController"
import { handleInputErrors } from "../middleware/validation"
import { limiter } from "../config/limiter"

const router = Router()

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede ir vacío"),
  body("password")
    .notEmpty()
    .withMessage("El password no puede ir vacío")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto, mínimo 8 caracteres"),
  body("email").isEmail().withMessage("Email no válido"),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  "/confirm-account",
  limiter,
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Token no valido"),
  handleInputErrors,
  AuthController.confirmAccount
)

export default router
