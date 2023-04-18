import type { FC } from "react";
import { useState } from "react";
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

  const toggleHandler = (order: number) => {
    setTodos([
      ...todos.slice(0, order),
      {
        ...todos[order],
        isCompleted: !todos[order].isCompleted
      },
      ...todos.slice(order + 1)
    ]);
  };

  return (
    <ul>
      {todos?.map((todo, i) => (
        <TodoItem
          key={todo.id}
          order={i}
          onToggle={toggleHandler}
          className="my-2"
          {...todo}
        />
      ))}
    </ul>
  );
};

export default TodosPage;
