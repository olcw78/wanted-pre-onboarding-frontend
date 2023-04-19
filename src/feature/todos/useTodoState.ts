import { useCallback, useEffect, useRef, useState } from "react";
import type { TodoModel } from "network/spec/todo/model/TodoModel";
import { TodosRequestStatic } from "../../network/httpRequest/todos/todos.request";
import { useNavigate } from "react-router-dom";
import { useAuthCtx } from "../../state/auth/auth.state";

export const useTodoState = (
  newTodoInput: string,
  resetNewTodoInput: () => void
) => {
  const [todos, setTodos] = useState<Array<TodoModel>>([]);
  const [isFetching, setFetching] = useState(false);
  const newTodoInputRef = useRef<HTMLInputElement>(null);
  const authCtx = useAuthCtx();
  const navigate = useNavigate();

  // accessToken 없으면 sign-in 으로 이동
  useEffect(() => {
    if (authCtx.hasAccessToken()) {
      return;
    }

    navigate("/signin");
  }, []);

  // 페이지 열면 인풋 필드로 focus.
  useEffect(() => {
    newTodoInputRef?.current?.focus();
  }, [newTodoInputRef]);

  // 첫 todos fetching.
  useEffect(() => {
    (async () => {
      try {
        setFetching(true);

        const response = await TodosRequestStatic.getTodos();
        setTodos(response);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  // completed 여부 토글 핸들러.
  // newTodoInput 갱신마다 re-evaluate 막기 위해 useCallback 사용.
  const toggleCompletedHandler = useCallback(
    async (id: number) => {
      const foundIdx = todos.findIndex((todo) => todo.id === id);
      if (foundIdx === -1) {
        return;
      }

      const targetTodo = todos[foundIdx];
      try {
        setFetching(true);

        const updatedLocalTodo = await TodosRequestStatic.updateTodo({
          id,
          todo: targetTodo.todo,
          isCompleted: !targetTodo.isCompleted
        });

        // local todos 갱신.
        setTodos([
          ...todos.slice(0, foundIdx),
          {
            ...targetTodo,
            ...updatedLocalTodo
          },
          ...todos.slice(foundIdx + 1)
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    },
    [todos]
  );

  // 새 todo 항목 추가 핸들러.
  const addNewTodoHandler = async () => {
    try {
      setFetching(true);

      const newLocalTodo = await TodosRequestStatic.createTodo({
        todo: newTodoInput
      });

      // 새 todo local 리스트에 추가.
      setTodos([...todos, newLocalTodo]);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);

      // 인풋필드 정리.
      resetNewTodoInput();
      newTodoInputRef?.current?.focus();
    }
  };

  // todo 내용 수정 핸들러.
  const editTodoHandler = useCallback(
    async (id: number, newTodo: string) => {
      if (newTodo === "") {
        return;
      }

      const foundIdx = todos.findIndex((todo) => todo.id === id);
      if (foundIdx === -1) {
        return;
      }

      try {
        setFetching(true);
        const targetTodo = todos[foundIdx];
        const updatedLocalTodo = await TodosRequestStatic.updateTodo({
          id,
          todo: newTodo,
          isCompleted: targetTodo.isCompleted
        });

        // 갱신한 todo 로 local todolist 설정.
        setTodos([
          ...todos.slice(0, foundIdx),
          {
            ...targetTodo,
            ...updatedLocalTodo
          },
          ...todos.slice(foundIdx + 1)
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    },
    [todos]
  );

  // todo 항목 삭제 핸들러.
  const deleteTodoHandler = useCallback(
    async (id: number) => {
      const foundIdx = todos.findIndex((todo) => todo.id === id);
      if (foundIdx === -1) {
        return;
      }

      try {
        setFetching(true);

        await TodosRequestStatic.deleteTodo(id);

        // local todos 에서 삭제.
        setTodos([...todos.slice(0, foundIdx), ...todos.slice(foundIdx + 1)]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    },
    [todos]
  );

  return {
    todos,

    isFetching,

    newTodoInput,
    newTodoInputRef,

    addNewTodoHandler,
    editTodoHandler,
    toggleCompletedHandler,
    deleteTodoHandler
  };
};
