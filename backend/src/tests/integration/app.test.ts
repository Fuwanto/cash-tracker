import request from "supertest"
import server from "../../server"
import { AuthController } from "../../controllers/AuthController"
import User from "../../models/User"
import * as authUtils from "../../utils/auth"
import * as jwtUtils from "../../utils/jwt"

// SECTION: Authentication tests

describe("Authentication - Create Account", () => {
  it("should display validation errors when form is empty", async () => {
    const response = await request(server)
      .post("/api/auth/create-account")
      .send({})

    const createAccountMock = jest.spyOn(AuthController, "createAccount")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(3)
    expect(response.status).not.toBe(201)
    expect(createAccountMock).not.toHaveBeenCalled()
  })

  it("should return 400 status code when the email is invalid", async () => {
    const response = await request(server)
      .post("/api/auth/create-account")
      .send({
        name: "Anto",
        password: "12345678",
        email: "not_valid_email",
      })

    const createAccountMock = jest.spyOn(AuthController, "createAccount")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Email no válido")
    expect(response.status).not.toBe(201)
    expect(createAccountMock).not.toHaveBeenCalled()
  })

  it("should return 400 status code when the password is less than 8 characters", async () => {
    const response = await request(server)
      .post("/api/auth/create-account")
      .send({
        name: "Anto",
        password: "123",
        email: "anto@hotmail.com",
      })

    const createAccountMock = jest.spyOn(AuthController, "createAccount")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe(
      "El password es muy corto, mínimo 8 caracteres"
    )
    expect(response.status).not.toBe(201)
    expect(createAccountMock).not.toHaveBeenCalled()
  })

  it("should create an account successfully with valid data", async () => {
    const userData = {
      name: "Anto",
      password: "password",
      email: "test@test.com",
    }

    const response = await request(server)
      .post("/api/auth/create-account")
      .send(userData)

    expect(response.status).toBe(201)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")
  })

  it("should return 409 status code when a user is already registered", async () => {
    const userData = {
      name: "Anto",
      password: "password",
      email: "test@test.com",
    }

    const response = await request(server)
      .post("/api/auth/create-account")
      .send(userData)

    expect(response.status).toBe(409)
    expect(response.status).not.toBe(201)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe(
      "Un usuario con ese email ya esta registrado"
    )
  })
})

describe("Authentication - Account Confirmation with Token", () => {
  it("should display error if token is empty or is not valid", async () => {
    const formData = {
      token: "not_valid",
    }

    const response = await request(server)
      .post("/api/auth/confirm-account")
      .send(formData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Token no válido")
    expect(response.status).not.toBe(200)
  })

  it("should return 401 status code when the token is not exists", async () => {
    const formData = {
      token: "123456",
    }

    const response = await request(server)
      .post("/api/auth/confirm-account")
      .send(formData)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("error")
    expect(response.body).not.toHaveProperty("errors")
    expect(response.body.error).toBe("Token no válido")
    expect(response.status).not.toBe(200)
  })

  it("should confirm account with a valid token", async () => {
    const formData = {
      token: globalThis.cashTrackerConfirmationToken,
    }

    const response = await request(server)
      .post("/api/auth/confirm-account")
      .send(formData)

    expect(response.status).toBe(200)
    expect(response.body).toBe("Cuenta confirmada correctamente")
  })
})

describe("Authentication - Login", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should display validation errors when the form is empty", async () => {
    const formData = {}

    const response = await request(server)
      .post("/api/auth/login")
      .send(formData)

    const loginMock = jest.spyOn(AuthController, "login")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(2)
    expect(loginMock).not.toHaveBeenCalled()
  })

  it("should return 400 bad request when the email is invalid", async () => {
    const formData = {
      email: "not_valid",
      password: "12345678",
    }

    const response = await request(server)
      .post("/api/auth/login")
      .send(formData)

    const loginMock = jest.spyOn(AuthController, "login")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Email no válido")
    expect(loginMock).not.toHaveBeenCalled()
  })

  it("should return a 400 status code if then user is not found", async () => {
    const formData = {
      email: "no_existo@test.com",
      password: "12345678",
    }

    const response = await request(server)
      .post("/api/auth/login")
      .send(formData)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("El email no está registrado")
  })

  // Simulando el return de findOne con un user no confirmado
  it("should return a 403 error if the user account is not confirmed - 1", async () => {
    const userData = {
      id: 1,
      email: "no_confirmo@test.com",
      password: "hashed_password",
      confirmed: false,
    }

    const formData = {
      email: userData.email,
      password: "12345678",
    }

    ;(jest.spyOn(User, "findOne") as jest.Mock).mockResolvedValue(userData)

    const response = await request(server)
      .post("/api/auth/login")
      .send(formData)

    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("La cuenta no ha sido confirmada")
  })

  // creando una cuenta e inmediatamente intentar iniciar sesión si haberlo confirmado
  it("should return a 403 error if the user account is not confirmed - 2", async () => {
    const formData = {
      email: "no_confirmo@test.com",
      password: "12345678",
    }

    await request(server).post("/api/auth/create-account").send(formData)

    const response = await request(server)
      .post("/api/auth/login")
      .send(formData)

    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("La cuenta no ha sido confirmada")
  })

  it("should return 401 status code if the password is not correct", async () => {
    const userData = {
      id: 1,
      email: "confirmado@test.com",
      password: "hashed_password",
      confirmed: true,
    }

    const formData = {
      email: userData.email,
      password: "wrong_password",
    }

    const findOne = (
      jest.spyOn(User, "findOne") as jest.Mock
    ).mockResolvedValue(userData)
    const checkPassword = (
      jest.spyOn(authUtils, "checkPassword") as jest.Mock
    ).mockReturnValue(false)

    const response = await request(server)
      .post("/api/auth/login")
      .send(formData)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Contraseña incorrecta")
    expect(findOne).toHaveBeenCalledTimes(1)
    expect(checkPassword).toHaveBeenCalledTimes(1)
  })

  it("should return a JWT token when login is successful", async () => {
    const userData = {
      id: 1,
      email: "token@test.com",
      password: "hashed_password",
      confirmed: true,
    }

    const formData = {
      email: userData.email,
      password: "correct_password",
    }

    const findOne = (
      jest.spyOn(User, "findOne") as jest.Mock
    ).mockResolvedValue(userData)
    const checkPassword = (
      jest.spyOn(authUtils, "checkPassword") as jest.Mock
    ).mockResolvedValue(true)
    const generateJWT = (
      jest.spyOn(jwtUtils, "generateJWT") as jest.Mock
    ).mockReturnValue("jwt_token")

    const response = await request(server)
      .post("/api/auth/login")
      .send(formData)

    expect(response.status).toBe(200)
    expect(response.body).toBe("jwt_token")
    expect(findOne).toHaveBeenCalledTimes(1)
    expect(checkPassword).toHaveBeenCalledTimes(1)
    expect(checkPassword).toHaveBeenCalledWith(
      formData.password,
      userData.password
    )
    expect(generateJWT).toHaveBeenCalledTimes(1)
    expect(generateJWT).toHaveBeenCalledWith(userData.id)
  })
})

// SECTION: Budgets Tests

let jwt: string

async function authenticateUser() {
  const response = await request(server).post("/api/auth/login").send({
    email: "test@test.com",
    password: "password",
  })
  jwt = response.body
}

describe("GET /api/budgets", () => {
  beforeAll(() => {
    jest.restoreAllMocks() // restaurar las funciones de los jest.spy a su implementación original
  })

  beforeAll(async () => {
    await authenticateUser()
  })

  it("should reject unauthenticated access to budgets without a JWT", async () => {
    const response = await request(server).get("/api/budgets")

    expect(response.status).toBe(401)
    expect(response.body.error).toBe("No autorizado")
  })

  it("should allow authenticated access to budgets with a valid JWT", async () => {
    const response = await request(server)
      .get("/api/budgets")
      .auth(jwt, { type: "bearer" })

    expect(response.status).toBe(200)
    expect(response.body).not.toBe("No autorizado")
    expect(response.body).toHaveLength(0)
  })

  it("should reject access to budgets with an invalid JWT", async () => {
    const response = await request(server)
      .get("/api/budgets")
      .auth("not_valid_jwt", { type: "bearer" })

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: "Token no válido" })
  })
})

describe("POST /api/budgets", () => {
  beforeAll(async () => {
    await authenticateUser()
  })

  it("should reject unauthenticated access to create a budget without a JWT", async () => {
    const response = await request(server).post("/api/budgets")

    expect(response.status).toBe(401)
    expect(response.body.error).toBe("No autorizado")
  })

  it("should display validation errors when the form is empty", async () => {
    const formData = {}

    const response = await request(server)
      .post("/api/budgets")
      .auth(jwt, { type: "bearer" })
      .send(formData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(4)
  })

  it("should return 400 status code when the amount is negative", async () => {
    const formData = {
      name: "Presupuesto",
      amount: -20,
    }

    const response = await request(server)
      .post("/api/budgets")
      .auth(jwt, { type: "bearer" })
      .send(formData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe(
      "El presupuesto debe ser mayor a 0"
    )
  })

  it("should return 400 status code when the amount is not a valid number", async () => {
    const formData = {
      name: "Presupuesto",
      amount: "no_valid",
    }

    const response = await request(server)
      .post("/api/budgets")
      .auth(jwt, { type: "bearer" })
      .send(formData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(2)
  })

  it("should create a budget successfully with valid data", async () => {
    const formData = {
      name: "Presupuesto",
      amount: 400,
    }

    const response = await request(server)
      .post("/api/budgets")
      .auth(jwt, { type: "bearer" })
      .send(formData)

    expect(response.status).toBe(201)
    expect(response.body).toBe("Presupuesto creado correctamente")
  })
})
