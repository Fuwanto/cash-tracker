import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      const error = new Error("Un usuario con ese email ya esta registrado")
      return res.status(409).json({ error: error.message })
    }

    try {
      const user = await User.create(req.body)
      user.password = await hashPassword(password)
      const token = generateToken()
      user.token = token

      if (process.env.NODE_ENV !== "production") {
        globalThis.cashTrackerConfirmationToken = token
      }

      await user.save()

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      })
      return res.status(201).json("Cuenta creada correctamente")
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" })
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body
    const user = await User.findOne({ where: { token } })

    if (!user) {
      const error = new Error("Token no válido")
      return res.status(401).json({ error: error.message })
    }

    // activar cuenta del usuario
    user.confirmed = true
    user.token = null
    await user.save()

    return res.json("Cuenta confirmada correctamente")
  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error("El email no está registrado")
      return res.status(404).json({ error: error.message })
    }

    if (!user.confirmed) {
      const error = new Error("La cuenta no ha sido confirmada")
      return res.status(403).json({ error: error.message })
    }

    const isPasswordCorrect = checkPassword(password, user.password)
    if (!isPasswordCorrect) {
      const error = new Error("Contraseña incorrecta")
      return res.status(401).json({ error: error.message })
    }

    const token = generateJWT(user.id)

    return res.json(token)
  }

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error("El email no está registrado")
      return res.status(404).json({ error: error.message })
    }

    user.token = generateToken()

    await user.save()

    await AuthEmail.sendPasswordResetToken({
      name: user.name,
      email: user.email,
      token: user.token,
    })

    return res.json("Revisa tu email para instrucciones")
  }

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body
    const user = await User.findOne({ where: { token } })

    if (!user) {
      const error = new Error("Token no valido")
      return res.status(401).json({ error: error.message })
    }

    return res.json("Token válido, asigna un nuevo password")
  }

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ where: { token } })
    if (!user) {
      const error = new Error("Token no valido")
      return res.status(401).json({ error: error.message })
    }

    // asignar el nuevo password
    user.password = await hashPassword(password)
    user.token = null
    await user.save()

    return res.json("Password actualizado correctamente")
  }

  static user = async (req: Request, res: Response) => {
    return res.json(req.user)
  }

  static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)
    const isPasswordCorrect = await checkPassword(
      current_password,
      user.password
    )
    if (!isPasswordCorrect) {
      const error = new Error("El password actual es incorrecto")
      return res.status(401).json({ error: error.message })
    }

    user.password = await hashPassword(password)
    await user.save()
    return res.json("El password se modifico correctamente")
  }

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
      const error = new Error("El password actual es incorrecto")
      return res.status(401).json({ error: error.message })
    }

    return res.json("Password correcto")
  }

  static updateUser = async (req: Request, res: Response) => {
    const { name, email } = req.body

    try {
      const exitingUser = await User.findOne({ where: { email } })
      console.log(exitingUser)

      if (exitingUser && exitingUser.id !== req.user.id) {
        const error = new Error("Ese email ya está registrado por otro usuario")
        return res.status(409).json({ error: error.message })
      }
      await User.update(
        { email, name },
        {
          where: { id: req.user.id },
        }
      )

      return res.json("Perfil actualizado correctamente")
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" })
    }
  }
}
