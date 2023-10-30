"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidaion = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        })
            .optional(),
        phoneNumber: zod_1.z
            .string({
            required_error: "Phone Number is required ",
        })
            .optional(),
        role: zod_1.z.enum([...user_constants_1.role]).optional(),
        password: zod_1.z
            .string({
            required_error: "Password is required ",
        })
            .optional(),
        address: zod_1.z
            .string({
            required_error: "Address is required ",
        })
            .optional(),
        budget: zod_1.z
            .number({
            required_error: "Budget is required ",
        })
            .optional(),
        income: zod_1.z
            .number({
            required_error: "Income is required ",
        })
            .optional(),
    }),
});
exports.UserValidaion = {
    updateUserZodSchema,
};
