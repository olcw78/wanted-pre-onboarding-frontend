import type { FC } from "react";
import { type ChangeEventHandler, useState } from "react";
import TodoItem from "../feature/todos/TodoItem";
import { useTodoState } from "../feature/todos/useTodoState";

const TodosPage: FC = () => {
  const [newTodoInput, setNewTodoInput] = useState("");
  const updateNewTodoInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTodoInput(event.target.value);
  };

  const resetNewTodoInput = () => setNewTodoInput("");

  const {
    todos,
    isFetching,
    newTodoInputRef,

    addNewTodoHandler,
    editTodoHandler,
    toggleCompletedHandler,
    deleteTodoHandler
  } = useTodoState(newTodoInput, resetNewTodoInput);

  if (process.env.NODE_ENV === "development") {
    console.log(todos);
  }

  return (
    <div className="flex flex-col flex-1 justify-center min-h-full">
      <div className="my-8 flex justify-center">
        <p className="text-4xl font-bold">투두 리스트</p>
      </div>

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
          <span className="text-white font-bold text-xl">추가</span>
        </button>
      </section>

      {/* 현재 Todo 항목들 iterate & render */}
      {!isFetching && todos.length === 0 && (
        <div className="bg-pink-200 rounded-md px-3 py-2 flex justify-center items-center h-[100px]">
          <p className="text-2xl text-slate-600 font-bold">
            현재 Todo 항목이 없습니다!
          </p>
        </div>
      )}

      <ul>
        {!isFetching &&
          todos?.map((todo) => (
            <TodoItem
              key={todo.id}
              onToggleCompleted={toggleCompletedHandler}
              onEditTodo={editTodoHandler}
              onDeleteTodo={deleteTodoHandler}
              className="my-2 overflow-hidden"
              {...todo}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodosPage;
