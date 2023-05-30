import { createTRPCRouter } from "@/server/api/trpc";
import { todosRouter } from "./routers/todos";

export const appRouter = createTRPCRouter({
  todos: todosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
