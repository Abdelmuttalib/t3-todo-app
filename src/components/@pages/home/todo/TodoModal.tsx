/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@/components/ui/button";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "lucide-react";
import { Fragment, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import TodoForm from "./TodoForm";
import type { Todo } from "@prisma/client";
import { TodoFormActionEnum } from "@/utils/enums";

export type FormActionType =
  | TodoFormActionEnum.CREATE
  | TodoFormActionEnum.EDIT;

interface TodoModalProps {
  actionType: FormActionType;
  todoId?: Todo["id"];
  todoTitle?: Todo["title"];
}

export default function TodoModal({
  actionType,
  todoId,
  todoTitle,
}: TodoModalProps) {
  const { t } = useTranslation("home");
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  // text-[#1561de]
  // bg-[#e2ebfa]
  return (
    <>
      {actionType === TodoFormActionEnum.CREATE && (
        <Button
          // variant="secondary"
          className="inline-flex h-fit items-center justify-center gap-1 rounded-primary-lg px-4 py-2 "
          onClick={openModal}
        >
          <PlusIcon className="w-5" />
          {t("buttons.new_todo")}
        </Button>
      )}

      {actionType === TodoFormActionEnum.EDIT && (
        <PencilSquareIcon
          className="w-7 cursor-pointer text-gray-700 hover:text-emerald-500 dark:hover:text-emerald-400"
          onClick={openModal}
        />
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-30 dark:bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 text-center sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:border-2 dark:border-gray-800/30 dark:bg-gray-900 dark:shadow-2xl dark:shadow-gray-900/50 sm:max-w-xl">
                  <Dialog.Title
                    as="h3"
                    className="h4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    {actionType === TodoFormActionEnum.CREATE && (
                      <>{t("headings.new_todo")}</>
                    )}
                    {actionType === TodoFormActionEnum.EDIT && (
                      <>{t("headings.edit_todo")}</>
                    )}
                  </Dialog.Title>

                  <div className="mt-4">
                    <TodoForm
                      closeModal={closeModal}
                      actionType={actionType}
                      {...(actionType === TodoFormActionEnum.EDIT &&
                        todoId && {
                          todoId,
                        })}
                      {...(actionType === TodoFormActionEnum.EDIT &&
                        todoTitle && {
                          todoTitle,
                        })}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
