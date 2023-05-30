import { z } from "zod";

export const todoFormSchema = z.object({
  title: z.string().min(2, "validations.todo_title").nonempty(),
});
