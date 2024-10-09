import { z } from "zod";

const updateProfilSchmea = z.object({
  image: z
    .any().optional()
    .refine((file) => file?.[0]?.size <= 2000000, "File size should be <= 2MB"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  comment: z.string().optional(),
  location: z.string().optional(),
  bio : z.string().optional()
});

export { updateProfilSchmea };
