import * as z from "zod";

export const signupValidate = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 character." }),
});
export const signipValidate = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 character." }),
});
export const Postvalidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(5).max(100),
  tags: z.string(),
});
