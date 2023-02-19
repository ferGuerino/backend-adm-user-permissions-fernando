import { createLoginSchema } from "../schemas/login.schemas";
import { z } from "zod";

type iLoginRequest = z.infer<typeof createLoginSchema>;

export { iLoginRequest };
