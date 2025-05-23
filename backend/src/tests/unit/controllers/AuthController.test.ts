import { createRequest, createResponse } from "node-mocks-http"
import { AuthController } from "../../../controllers/AuthController"
import User from "../../../models/User"
import { checkPassword, hashPassword } from "../../../utils/auth"
import { generateToken } from "../../../utils/token"
import { AuthEmail } from "../../../emails/AuthEmail"
import { generateJWT } from "../../../utils/jwt"

jest.mock("../../../models/User") // Si lo dejo asi se le aplica mocking automático (aplica el mock a todas las funciones del modelo)
jest.mock("../../../utils/auth")
jest.mock("../../../utils/token")
jest.mock("../../../utils/jwt")

describe("AuthController.createAccount", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should return 409 status and an error message if the email is already registered", async () => {
    const req = createRequest({
      method: "POST",
      url: "/api/auth/create-account",
      body: {
        email: "test@test.com",
        password: "testpassword",
      },
    })
    const res = createResponse()

    ;(User.findOne as jest.Mock).mockResolvedValue(true) // los mocks son globales, por lo que sin el before Each esto se hereda en el siguiente test

    await AuthController.createAccount(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(409)
    expect(data).toHaveProperty(
      "error",
      "Un usuario con ese email ya esta registrado"
    ) // alternativa a toEqual, ambas funcionan bien
    expect(User.findOne).toHaveBeenCalled()
    expect(User.findOne).toHaveBeenCalledTimes(1)
  })

  it("should register a new user and return a success message", async () => {
    const req = createRequest({
      method: "POST",
      url: "/api/auth/create-account",
      body: {
        email: "test@test.com",
        password: "testpassword",
        name: "test",
      },
    })
    const res = createResponse()

    const mockUser = { ...req.body, save: jest.fn() }

    ;(User.create as jest.Mock).mockResolvedValue(mockUser)
    ;(hashPassword as jest.Mock).mockResolvedValue("hashedPassword") // mockResolvedValue es para operaciones asíncronas
    ;(generateToken as jest.Mock).mockReturnValue("123456") // mockReturnValue es para operaciones síncronas
    jest
      .spyOn(AuthEmail, "sendConfirmationEmail")
      .mockImplementation(() => Promise.resolve())

    await AuthController.createAccount(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(201)
    expect(data).toBe("Cuenta creada correctamente")
    expect(User.findOne).toHaveBeenCalled()
    expect(User.findOne).toHaveBeenCalledTimes(1)

    expect(User.create).toHaveBeenCalled()
    expect(User.create).toHaveBeenCalledTimes(1)

    expect(mockUser.save).toHaveBeenCalled()
    expect(mockUser.save).toHaveBeenCalledTimes(1)
    expect(mockUser.password).toBe("hashedPassword")
    expect(mockUser.token).toBe("123456")

    expect(hashPassword).toHaveBeenCalled()
    expect(hashPassword).toHaveBeenCalledTimes(1)

    expect(generateToken).toHaveBeenCalled()
    expect(generateToken).toHaveBeenCalledTimes(1)

    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledTimes(1)
    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledWith({
      name: req.body.name,
      email: req.body.email,
      token: "123456",
    })
  })
})

describe("AuthController.login", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should return 404 if user is not found", async () => {
    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: {
        email: "test@test.com",
        password: "testpassword",
      },
    })
    const res = createResponse()

    ;(User.findOne as jest.Mock).mockResolvedValue(null)

    await AuthController.login(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(404)
    expect(data).toEqual({ error: "El email no está registrado" })
  })

  it("should return 403 if account has not been confirmed", async () => {
    const userMock = {
      id: 1,
      email: "test@test.com",
      password: "testpassword",
      confirmed: false,
    }
    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: {
        email: "test@test.com",
        password: "testpassword",
      },
    })
    const res = createResponse()

    ;(User.findOne as jest.Mock).mockResolvedValue(userMock)

    await AuthController.login(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(403)
    expect(data).toEqual({ error: "La cuenta no ha sido confirmada" })
  })

  it("should return 401 if the password is incorrect", async () => {
    const userMock = {
      id: 1,
      email: "test@test.com",
      password: "testpassword",
      confirmed: true,
    }
    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: {
        email: "test@test.com",
        password: "wrong_password",
      },
    })
    const res = createResponse()

    ;(User.findOne as jest.Mock).mockResolvedValue(userMock)
    ;(checkPassword as jest.Mock).mockReturnValue(false)

    await AuthController.login(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(401)
    expect(data).toEqual({ error: "Contraseña incorrecta" })
    expect(checkPassword).toHaveBeenCalledWith(
      req.body.password,
      userMock.password
    )
    expect(checkPassword).toHaveBeenCalledTimes(1)
  })

  it("should return a JWT if authentication is successful", async () => {
    const userMock = {
      id: 1,
      email: "test@test.com",
      password: "hashed_testpassword",
      confirmed: true,
    }

    const req = createRequest({
      method: "POST",
      url: "/api/auth/login",
      body: {
        email: "test@test.com",
        password: "testpassword",
      },
    })
    const res = createResponse()

    const fakeJWT = "fake_jwt"

    ;(User.findOne as jest.Mock).mockResolvedValue(userMock)
    ;(checkPassword as jest.Mock).mockResolvedValue(true)
    ;(generateJWT as jest.Mock).mockReturnValue(fakeJWT)

    await AuthController.login(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200)
    expect(checkPassword).toHaveBeenCalledWith(
      req.body.password,
      userMock.password
    )
    expect(checkPassword).toHaveBeenCalledTimes(1)
    expect(data).toEqual(fakeJWT)
    expect(generateJWT).toHaveBeenCalledWith(userMock.id)
    expect(generateJWT).toHaveBeenCalledTimes(1)
  })
})
