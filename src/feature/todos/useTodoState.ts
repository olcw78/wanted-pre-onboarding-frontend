import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import type { TodoModel } from "network/spec/todo/model/TodoModel";

const DUMMY_TODOS: Array<TodoModel> = [
  {
    id: 1,
    todo: "Learn React",
    isCompleted: false,
    userId: 1
  },
  {
    id: 2,
    todo: "Learn Redux",
    isCompleted: false,
    userId: 2
  },
  {
    id: 3,
    todo: "Learn Node",
    isCompleted: true,
    userId: 3
  }
];

export const useTodoState = () => {
  const [todos, setTodos] = useState<Array<TodoModel>>(DUMMY_TODOS);
  const newTodoInputRef = useRef<HTMLInputElement>(null);
  const [newTodoInput, setNewTodoInput] = useState("");

  useEffect(() => {
    newTodoInputRef?.current?.focus();
  }, [newTodoInputRef]);

  const updateNewTodoInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTodoInput(event.target.value);
  };

  const toggleHandler = (id: number) => {
    const foundIdx = todos.findIndex((todo) => todo.id === id);
    if (foundIdx === -1) {
      return;
    }

    setTodos([
      ...todos.slice(0, foundIdx),
      {
        ...todos[foundIdx],
        isCompleted: !todos[foundIdx].isCompleted
      },
      ...todos.slice(foundIdx + 1)
    ]);
  };

  const addNewTodoHandler = () => {
    const newTodo = {
      id: todos.length + 1,
      todo: newTodoInput,
      isCompleted: false,
      userId: 1
    };

    setTodos([...todos, newTodo]);
    setNewTodoInput("");

    newTodoInputRef?.current?.focus();
  };

  const editTodoHandler = (id: number, newTodo: string) => {
    const foundIdx = todos.findIndex((todo) => todo.id === id);
    if (foundIdx === -1) {
      return;
    }

    setTodos([
      ...todos.slice(0, foundIdx),
      {
        ...todos[foundIdx],
        todo: newTodo
      },
      ...todos.slice(foundIdx + 1)
    ]);
  };

  const deleteTodoHandler = (id: number) => {
    const foundIdx = todos.findIndex((todo) => todo.id === id);
    if (foundIdx === -1) {
      return;
    }

    setTodos([...todos.slice(0, foundIdx), ...todos.slice(foundIdx + 1)]);
  };

  return {
    todos,

    newTodoInput,
    newTodoInputRef,

    updateNewTodoInput,

    addNewTodoHandler,
    editTodoHandler,
    toggleHandler,
    deleteTodoHandler
  };
};
