import { z } from "zod";



const passwordSchema = z.string().min(6, "Password must be at least 6 characters long");
 const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"], 
      });
    }
  });


  export {resetPasswordSchema}