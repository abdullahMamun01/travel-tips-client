import { z } from "zod";


const postValidateSchema  = z.object({
    title: z.string({ required_error: "title is required" }),
    description: z.string({ required_error: "description is required" }),
    categories: z.string({ required_error: "category is required" }) ,
    images: z
      .instanceof(FileList, { message: "images must be a file list" })
      .refine((files) => files.length > 0, { message: "At least one image is required" })
  });


  export {postValidateSchema}