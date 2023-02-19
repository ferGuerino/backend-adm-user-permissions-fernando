import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email().max(100),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean(),
  active: z.boolean(),
});

const updateUserSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.string().email().max(100).optional(),
  password: z
    .string()
    .transform((pass) => {
      return hashSync(pass, 10);
    })
    .optional(),
});

const returnUserSchema = createUserSchema.extend({
  id: z.number(),
});

const returnUpdateUserSchema = updateUserSchema.extend({
  id: z.number(),
});

const returnUserSchemaWithoutPassword = returnUserSchema.omit({ password: true });

const listUsersSchema = z.array(returnUserSchema);

const returnUpdateUserSchemaWithoutPassword = returnUpdateUserSchema.omit({ password: true });

export {
  createUserSchema,
  returnUserSchema,
  returnUserSchemaWithoutPassword,
  listUsersSchema,
  updateUserSchema,
  returnUpdateUserSchema,
  returnUpdateUserSchemaWithoutPassword,
};
