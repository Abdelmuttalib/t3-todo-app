/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Todo as TTodo } from "@prisma/client";
import Todo, { TodoLoader } from "./Todo";
import { Button } from "@/components/ui/button";
import useTranslation from "next-translate/useTranslation";
import cn from "@/utils/cn";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import TodoModal from "./TodoModal";
// import useTodos from "@/hooks/useTodos";
import { useTheme } from "next-themes";
import { TodoFormActionEnum } from "@/utils/enums";
import { useState } from "react";

const initialTodos: TTodo[] = [
  {
    id: "cliae592z0002l908drcd97ol",
    title: "Client Review & Feedback",
    completed: true,
    createdAt: new Date("2023-05-30T14:45:49.499Z"),
    updatedAt: new Date("2023-06-05T01:18:45.353Z"),
  },
];

export default function TodoList() {
  const { theme } = useTheme();
  const { t } = useTranslation("home");
  // const { todos, clearCompletedTodosMutation } = useTodos();
  const [todos, setTodos] = useState<TTodo[]>(initialTodos);

  // async function onClearCompletedTodos() {
  //   await clearCompletedTodosMutation.mutateAsync();
  // }

  function onClearCompletedTodos() {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  }

  const completedTodos = todos?.filter((todo) => todo.completed === true);

  return (
    <div className="mt-8 flex flex-col gap-7">
      <div className="flex items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <div>
          <h2 className="h4 dark:text-gray-200">{t("headings.todos")}</h2>
          <p className="label-sm text-[#969796] dark:text-gray-600">
            {t("paragraphs.manage_your_todos")}
          </p>
        </div>
        <TodoModal
          actionType={TodoFormActionEnum.CREATE}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {/* {todos.isLoading && [1, 2, 3].map((n) => <TodoLoader key={n} />)} */}
        {todos &&
          todos?.map((todo: TTodo) => (
            <Todo key={todo.id} {...todo} todos={todos} setTodos={setTodos} />
          ))}
        {/* {!todos.isLoading && todos.data && todos.data.length === 0 && (
          <p className="body-sm text-[#969796] dark:text-gray-700">
            {t("labels.no_todos")}
          </p>
        )} */}
      </div>
      <div>
        <Button
          className={cn("gap-2 pl-2", {
            // "pl-4": clearCompletedTodosMutation.isLoading,
          })}
          variant={theme === "dark" ? "outline" : "secondary"}
          onClick={onClearCompletedTodos}
          disabled={completedTodos?.length === 0}
          // disabled={
          //   clearCompletedTodosMutation.isLoading ||
          //   completedTodos?.length === 0 ||
          //   todos.isLoading
          // }
          // isLoading={clearCompletedTodosMutation.isLoading}
        >
          <CheckCircleIcon className="ml-2 w-5" />{" "}
          {t("buttons.clear_completed")}
        </Button>
      </div>
    </div>
  );
}
