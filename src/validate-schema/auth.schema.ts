import { z } from "zod";

const registerValidateSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters"),
  phone: z
    .string()
    .min(9, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .nonempty("Phone number is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address must be less than 200 characters"),
});

export {registerValidateSchema};
