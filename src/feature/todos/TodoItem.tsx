import type { ChangeEventHandler, FC } from "react";
import { type HTMLAttributes, useState } from "react";
import type { TodoModel } from "../../network/spec/todo/model/TodoModel";

export interface TodoItemProps
  extends Pick<TodoModel, "todo" | "isCompleted">,
    Pick<HTMLAttributes<HTMLElement>, "className"> {
  id: number;
  onToggleCompleted: (id: number) => void;
  onEditTodo: (id: number, newTodo: string) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  id,
  todo,
  isCompleted,
  onToggleCompleted,
  onEditTodo,
  onDeleteTodo,
  className
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodoInput, setEditTodoInput] = useState("");

  const enableEditMode = () => {
    setIsEditMode(true);
  };

  const disableEditMode = () => {
    setEditTodoInput("");
    setIsEditMode(false);
  };

  const updateEditTodoInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditTodoInput(event.target.value);
  };

  const onSubmitEditing = () => {
    disableEditMode();
    onEditTodo(id, editTodoInput);
  };

  return (
    <li className={"bg-pink-200 rounded-md px-3 py-2 ".concat(className || "")}>
      <label className="mr-10">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleCompleted(id)}
          className="mr-4"
        />

        {/* todo / edit todo input */}
        {!isEditMode ? (
          <span className="text-2xl font-bold text-slate-700 w-[250px]">
            {todo}
          </span>
        ) : (
          <input
            type="text"
            value={editTodoInput}
            onChange={updateEditTodoInput}
            className="mr-4"
          />
        )}
      </label>

      {!isEditMode ? (
        // 수정/삭제 버튼.
        <>
          <button
            className="bg-violet-300 rounded-md px-3 py-1 mr-2"
            data-testid="modify-button"
            onClick={enableEditMode}
          >
            <span className="text-white text-xl">수정</span>
          </button>

          <button
            className="bg-red-300 rounded-md px-3 py-1"
            data-testid="delete-button"
            onClick={() => onDeleteTodo(id)}
          >
            <span className="text-white text-xl">삭제</span>
          </button>
        </>
      ) : (
        // 제출/취소 버튼.
        <>
          <button
            className="bg-violet-300 rounded-md px-3 py-1 mr-2"
            data-testid="submit-button"
            onClick={onSubmitEditing}
          >
            <span className="text-white text-xl">제출</span>
          </button>

          <button
            className="bg-red-300 rounded-md px-3 py-1"
            data-testid="cancel-button"
            onClick={disableEditMode}
          >
            <span className="text-white text-xl">취소</span>
          </button>
        </>
      )}
    </li>
  );
};
export default TodoItem;
