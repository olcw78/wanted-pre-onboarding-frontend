import type { FC } from "react";
import { HTMLAttributes } from "react";
import type { TodoModel } from "../../network/spec/todo/model/TodoModel";

export interface TodoItemProps
  extends Pick<TodoModel, "todo" | "isCompleted">,
    Pick<HTMLAttributes<HTMLElement>, "className"> {
  id: number;
  onToggle: (id: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  id,
  todo,
  isCompleted,
  onToggle,
  className
}) => (
  <li className={"bg-pink-200 rounded-md px-3 py-2 ".concat(className || "")}>
    <label className="mr-10">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(id)}
        className="mr-4"
      />
      <span className="text-2xl text-bold text-slate-700 w-[250px]">
        {todo}
      </span>
    </label>

    <button className="bg-violet-300 rounded-md px-3 py-1 mr-5">
      <span className="text-white text-xl">수정</span>
    </button>

    <button className="bg-red-300 rounded-md px-3 py-1">
      <span className="text-white text-xl">삭제</span>
    </button>
  </li>
);
export default TodoItem;
