/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import cn from "@/utils/cn";
import useTranslation from "next-translate/useTranslation";
import useTodos from "@/hooks/useTodos";
import type { Todo } from "@prisma/client";
import { TodoFormActionEnum } from "@/utils/enums";
import type { FormActionType } from "./types";
import { todoFormSchema } from "./schema";

type TodoForm = z.infer<typeof todoFormSchema>;

interface TodoFormProps {
  closeModal: () => void;
  actionType: FormActionType;
  todoId?: Todo["id"];
  todoTitle?: Todo["title"];
}

export default function TodoForm({
  actionType,
  closeModal,
  todoId,
  todoTitle,
}: TodoFormProps) {
  const { t } = useTranslation("home");
  const {
    onCreateTodoFormSubmit,
    onEditTodoFormSubmit,
    createTodoMutation,
    editTodoMutation,
  } = useTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoForm>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todoTitle,
    },
  });

  async function onSubmit(data: TodoForm): Promise<void> {
    if (actionType === TodoFormActionEnum.EDIT && todoId) {
      await onEditTodoFormSubmit
        .mutateAsync({
          ...data,
          id: todoId,
        })
        .then(closeModal);
    } else if (actionType === TodoFormActionEnum.CREATE) {
      await onCreateTodoFormSubmit.mutateAsync(data).then(closeModal);
    }
  }

  function renderSubmitButtonText() {
    switch (actionType) {
      case TodoFormActionEnum.CREATE:
        return t("buttons.create_todo");
      case TodoFormActionEnum.EDIT:
        return t("buttons.save_changes");
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="title"
        type="text"
        {...register("title")}
        placeholder={`${t("labels.todo_title")}`}
        inputMode="text"
        className={cn(
          "h6 h-16 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
          {
            "border-red-500": errors.title,
          }
        )}
        disabled={createTodoMutation.isLoading || editTodoMutation.isLoading}
      />
      {errors.title && (
        <p className="text-red-500">{t("errors.title.message")}</p>
      )}
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-primary-lg"
          onClick={closeModal}
          disabled={createTodoMutation.isLoading || editTodoMutation.isLoading}
        >
          {t("buttons.cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="inline-flex h-fit flex-1 items-center justify-center gap-1 rounded-primary-lg px-4 py-3 capitalize sm:flex-initial"
          disabled={createTodoMutation.isLoading || editTodoMutation.isLoading}
          isLoading={createTodoMutation.isLoading || editTodoMutation.isLoading}
        >
          {renderSubmitButtonText()}
        </Button>
      </div>
    </form>
  );
}
