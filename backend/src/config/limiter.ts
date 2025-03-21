import { rateLimit } from "express-rate-limit"

export const limiter = rateLimit({
  windowMs: 60 * 100,
  limit: process.env.NODE_ENV === "production" ? 5 : 100,
  message: { error: "Has alcanzado el límite de peticiones" },
})
