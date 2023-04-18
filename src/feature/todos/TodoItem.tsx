import type { FC } from "react";
import { HTMLAttributes } from "react";
import type { TodoModel } from "../../network/spec/todo/model/TodoModel";

export interface TodoItemProps
  extends Pick<TodoModel, "todo" | "isCompleted">,
    Pick<HTMLAttributes<HTMLElement>, "className"> {
  order: number;
  onToggle: (id: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  order,
  todo,
  isCompleted,
  onToggle,
  className
}) => (
  <li className={"bg-amber-100 rounded-md px-3 py-2 ".concat(className || "")}>
    <label>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(order)}
        className="mr-4"
      />
      <span className="text-2xl text-bold">{todo}</span>
    </label>
  </li>
);
export default TodoItem;
