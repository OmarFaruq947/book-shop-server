import { z } from "zod";
import { role } from "./user.constants";

const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: "Phone Number is required ",
      })
      .optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    password: z
      .string({
        required_error: "Password is required ",
      })
      .optional(),
    address: z
      .string({
        required_error: "Address is required ",
      })
      .optional(),
    budget: z
      .number({
        required_error: "Budget is required ",
      })
      .optional(),
    income: z
      .number({
        required_error: "Income is required ",
      })
      .optional(),
  }),
});

export const UserValidaion = {
  updateUserZodSchema,
};
