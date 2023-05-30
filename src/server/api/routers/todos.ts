/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const todosRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return todos;
  }),

  createTodo: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const newTodo = await ctx.prisma.todo.create({
        data: {
          title: input.title,
        },
      });
      return newTodo;
    }),

  editTodo: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const updatedTodo = await ctx.prisma.todo.update({
        where: { id: input.id },
        data: { title: input.title },
      });
      return updatedTodo;
    }),

  deleteTodo: publicProcedure

    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.todo.delete({
        where: { id: input.id },
      });
    }),

  toggleTodo: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const updatedTodo = await ctx.prisma.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
      return updatedTodo;
    }),

  toggleAllTodos: publicProcedure
    .input(z.object({ completed: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const updatedTodos = await ctx.prisma.todo.updateMany({
        where: { completed: !input.completed },
        data: { completed: input.completed },
      });
      return updatedTodos;
    }),

  clearCompletedTodos: publicProcedure.mutation(async ({ ctx }) => {
    const deletedTodos = await ctx.prisma.todo.deleteMany({
      where: { completed: true },
    });
    return deletedTodos;
  }),
});
