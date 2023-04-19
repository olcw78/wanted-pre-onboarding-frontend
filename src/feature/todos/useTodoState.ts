import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import type { TodoModel } from "network/spec/todo/model/TodoModel";
import { TodosRequestStatic } from "../../network/httpRequest/todos/todos.request";

export const useTodoState = (
  newTodoInput: string,
  setNewTodoInput: Dispatch<SetStateAction<string>>
) => {
  const [todos, setTodos] = useState<Array<TodoModel>>([]);
  const [isFetching, setFetching] = useState(false);
  const newTodoInputRef = useRef<HTMLInputElement>(null);

  // 페이지 열면 인풋 필드로 focus.
  useEffect(() => {
    newTodoInputRef?.current?.focus();
  }, [newTodoInputRef]);

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

  const toggleHandler = useCallback(
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
      setNewTodoInput("");
      newTodoInputRef?.current?.focus();
    }
  };

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
    toggleHandler,
    deleteTodoHandler
  };
};
