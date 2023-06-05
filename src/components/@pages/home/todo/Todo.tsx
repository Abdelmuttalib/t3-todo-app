/* eslint-disable @typescript-eslint/no-misused-promises */
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
// import useTodos from "@/hooks/useTodos";
import cn from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import type { Todo } from "@prisma/client";
import TodoModal from "./TodoModal";
import { TrashIcon } from "lucide-react";
import { TodoFormActionEnum } from "@/utils/enums";
import type { Dispatch, SetStateAction } from "react";

export default function Todo({
  id,
  title,
  createdAt,
  completed,
  todos,
  setTodos,
}: Todo & {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) {
  // const { toggleTodoMutation, deleteTodoMutation } = useTodos();

  // async function onToggleTodo(
  //   todoId: Todo["id"],
  //   completed: Todo["completed"]
  // ) {
  //   await toggleTodoMutation.mutateAsync({
  //     completed: completed,
  //     id: todoId,
  //   });
  // }

  // async function onDeleteTodo(todoId: Todo["id"]) {
  //   await deleteTodoMutation.mutateAsync({
  //     id: todoId,
  //   });
  // }

  function onToggleTodo(todoId: Todo["id"], completed: Todo["completed"]) {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  function onDeleteTodo(todoId: Todo["id"]) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  return (
    <div className="flex flex-col gap-1 rounded-primary-lg border-2 border-transparent bg-white px-5 py-4 dark:border-gray-800/50 dark:bg-gray-900 dark:shadow-2xl">
      <div className="flex w-full items-center justify-between">
        <h3
          className={cn("text-lg font-semibold dark:text-gray-300", {
            "line-through decoration-gray-800 decoration-2 dark:decoration-gray-300":
              completed,
          })}
        >
          {title}
        </h3>
        <div className="flex items-center gap-1.5">
          <Checkbox
            id="completed"
            checked={completed}
            onCheckedChange={(value: boolean) => onToggleTodo(id, value)}
            className="mr-0.5"
          />
          <TodoModal
            actionType={TodoFormActionEnum.EDIT}
            todoId={id}
            todoTitle={title}
            todos={todos}
            setTodos={setTodos}
          />
          <TrashIcon
            className="w-7 cursor-pointer text-gray-700 hover:text-red-500 dark:hover:text-red-400"
            onClick={() => onDeleteTodo(id)}
          />
        </div>
      </div>
      <p className="text-sm font-medium text-[#969796] dark:text-gray-600">
        {formatDate(createdAt)}
      </p>
    </div>
  );
}

export function TodoLoader() {
  return (
    <div className="flex flex-col gap-1 rounded-primary-lg border-2 border-transparent bg-white px-5 py-4 dark:border-gray-800/50 dark:bg-gray-900 dark:shadow-2xl">
      <div className="flex w-full items-center justify-between">
        <h3>
          <Skeleton className="h-6 w-36" />
        </h3>
        <div className="flex items-center gap-1">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
        </div>
      </div>
      <div className="text-sm font-medium text-[#969796] dark:text-gray-600">
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  );
}
