import type { ChangeEventHandler, FC } from "react";
import { useEffect, useRef, useState } from "react";
import type { TodoModel } from "../network/spec/todo/model/TodoModel";
import TodoItem from "../feature/todos/TodoItem";

const TodosPage: FC = () => {
  const [todos, setTodos] = useState<Array<TodoModel>>([
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
  ]);

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

  console.log(todos);

  return (
    <div className="flex flex-col justify-center">
      <section className="mb-5 bg-slate-200 px-5 py-3 rounded-md mx-auto">
        {/* 새 Todo 항목 인풋 필드 */}
        <input
          type="text"
          data-testid="new-todo-input"
          className="border border-1 border-slate-300 rounded-md mr-3"
          value={newTodoInput}
          onChange={updateNewTodoInput}
          ref={newTodoInputRef}
        />

        {/* 새 Todo 항목 추가 버튼 */}
        <button
          type="button"
          data-testid="new-add-todo-button"
          className="bg-slate-600 px-3 py-1 rounded-md"
          onClick={addNewTodoHandler}
        >
          <span className="text-white text-bold text-xl">추가</span>
        </button>
      </section>

      {/* 현재 Todo 항목들 iterate & render */}
      <ul>
        {todos?.map((todo, i) => (
          <TodoItem
            key={todo.id}
            onToggleCompleted={toggleHandler}
            onEditTodo={editTodoHandler}
            onDeleteTodo={deleteTodoHandler}
            className="my-2"
            {...todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
