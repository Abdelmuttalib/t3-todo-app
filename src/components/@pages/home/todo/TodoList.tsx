/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Todo as TTodo } from "@prisma/client";
import Todo, { TodoLoader } from "./Todo";
import { Button } from "@/components/ui/button";
import useTranslation from "next-translate/useTranslation";
import cn from "@/utils/cn";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import TodoModal from "./TodoModal";
import useTodos from "@/hooks/useTodos";
import { useTheme } from "next-themes";
import { TodoFormActionEnum } from "@/utils/enums";

export default function TodoList() {
  const { theme } = useTheme();
  const { t } = useTranslation("home");
  const { todos, clearCompletedTodosMutation } = useTodos();

  async function onClearCompletedTodos() {
    await clearCompletedTodosMutation.mutateAsync();
  }

  const completedTodos = todos?.data?.filter((todo) => todo.completed === true);

  return (
    <div className="mt-8 flex flex-col gap-7">
      <div className="flex items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <div>
          <h2 className="h4 dark:text-gray-200">{t("headings.todos")}</h2>
          <p className="label-sm text-[#969796] dark:text-gray-600">
            {t("paragraphs.manage_your_todos")}
          </p>
        </div>
        <TodoModal actionType={TodoFormActionEnum.CREATE} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {todos.isLoading && [1, 2, 3].map((n) => <TodoLoader key={n} />)}
        {!todos.isLoading &&
          todos.data &&
          todos?.data.map((todo: TTodo) => <Todo key={todo.id} {...todo} />)}
        {!todos.isLoading && todos.data && todos.data.length === 0 && (
          <p className="body-sm text-[#969796] dark:text-gray-700">
            {t("labels.no_todos")}
          </p>
        )}
      </div>
      <div>
        <Button
          className={cn("gap-2 pl-2", {
            "pl-4": clearCompletedTodosMutation.isLoading,
          })}
          variant={theme === "dark" ? "outline" : "secondary"}
          onClick={onClearCompletedTodos}
          disabled={
            clearCompletedTodosMutation.isLoading ||
            completedTodos?.length === 0 ||
            todos.isLoading
          }
          isLoading={clearCompletedTodosMutation.isLoading}
        >
          <CheckCircleIcon className="ml-2 w-5" />{" "}
          {t("buttons.clear_completed")}
        </Button>
      </div>
    </div>
  );
}
