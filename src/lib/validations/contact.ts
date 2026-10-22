import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80, "First name is too long"),
  lastName: z.string().trim().max(80, "Last name is too long").optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Email field is required")
    .email("This field must contain a valid email"),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message")
    .max(5000, "Message must be 5000 characters or fewer"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
