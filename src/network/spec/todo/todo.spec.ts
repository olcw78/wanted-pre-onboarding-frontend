export const todoSpec = {
  // 1. create a todo
  todos: {
    createTodo: {
      url: "/todos",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (accessToken: string) => `Bearer ${accessToken}`
      },
      data: {
        todo: []
      }
    },
    getTodos: {
      url: "/todos",
      method: "GET",
      headers: {
        Authorization: (accessToken: string) => `Bearer ${accessToken}`
      }
    },
    updateTodo: {
      url: (id: number) => `/todos/${id}`,
      method: "PUT"
    },
    deleteTodo: {
      url: (id: number) => `/todos/${id}`,
      method: "DELETE",
      headers: {
        Authorization: (accessToken: string) => `Bearer ${accessToken}`
      }
    }
  }
};
