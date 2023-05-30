import { api } from "@/utils/api";
import { toast } from "sonner";

export interface CreateTodoForm {
  title: string;
}

export interface EditTodoForm {
  title: string;
  id: string;
}

export default function useTodos() {
  const apiContext = api.useContext();

  const invalidateTodos = () => apiContext.todos.getTodos.invalidate();

  const todos = api.todos.getTodos.useQuery();

  const createTodoMutation = api.todos.createTodo.useMutation({
    onSuccess: async () => {
      await invalidateTodos();
      toast.success("New todo created!");
    },
    onError: () => {
      toast.error("Failed to create new todo");
    },
  });

  const editTodoMutation = api.todos.editTodo.useMutation({
    onSuccess: async () => {
      await invalidateTodos();
      toast.success("todo was edited successfully");
    },
    onError: () => {
      toast.error("Failed to edit todo");
    },
  });

  const toggleTodoMutation = api.todos.toggleTodo.useMutation({
    onSuccess: async () => {
      await invalidateTodos();
      toast.success("todo was toggled successfully");
    },
    onError: () => {
      toast.error("Failed to toggle todo");
    },
  });

  const clearCompletedTodosMutation = api.todos.clearCompletedTodos.useMutation(
    {
      onSuccess: async () => {
        await invalidateTodos();
        toast.success("todos were cleared successfully");
      },
      onError: () => {
        toast.error("Failed to clear todos");
      },
    }
  );

  const deleteTodoMutation = api.todos.deleteTodo.useMutation({
    onSuccess: async () => {
      await invalidateTodos();
      toast.success("todo was deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete todo");
    },
  });

  return {
    todos,
    createTodoMutation,
    toggleTodoMutation,
    clearCompletedTodosMutation,
    deleteTodoMutation,
    onCreateTodoFormSubmit: createTodoMutation,
    onEditTodoFormSubmit: editTodoMutation,
    editTodoMutation,
  };
}
