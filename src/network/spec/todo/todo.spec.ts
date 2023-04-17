import { faker } from "@faker-js/faker";

export const todoSpec = {
  // 1. create a todo
  todos: {
    createTodo: {
      url: "/todos",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`
      },
      data: {
        todo: faker.helpers.arrayElements([])
      }
    },
    getTodos: {
      url: "/todos",
      method: "GET",
      headers: {
        Authorization: `Bearer`
      }
    },
    updateTodo: {
      url: "/todos/:id",
      method: "PUT",
      headers: {}
    },
    deleteTodo: {
      url: "/todos/:id",
      method: "DELETE",
      headers: {
        Authorization: `Bearer`
      }
    }
  }
};
