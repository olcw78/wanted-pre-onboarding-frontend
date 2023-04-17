import { faker } from "@faker-js/faker";

export const authSpec = {
  auth: {
    // 1. sign up
    signup: {
      url: "/auth/signup",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    },

    // 2. sign in
    signin: {
      url: "/auth/signin",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    }
  }
};
