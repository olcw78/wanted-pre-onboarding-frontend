import type { FC } from "react";
import TodoItem from "../feature/todos/TodoItem";
import { useTodoState } from "../feature/todos/useTodoState";

const TodosPage: FC = () => {
  const {
    todos,

    newTodoInput,
    newTodoInputRef,

    updateNewTodoInput,

    addNewTodoHandler,
    editTodoHandler,
    toggleHandler,
    deleteTodoHandler
  } = useTodoState();

  if (process.env.NODE_ENV === "development") {
    console.log(todos);
  }

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
        {todos?.map((todo) => (
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
