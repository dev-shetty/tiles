const { z } = require("zod")

const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
})

const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
})

const tileSchema = z.object({
  body: {
    x: z.number(),
    y: z.number(),
    color: z.string(),
  },
})

module.exports = {
  createUserSchema,
  loginUserSchema,
  tileSchema,
}
