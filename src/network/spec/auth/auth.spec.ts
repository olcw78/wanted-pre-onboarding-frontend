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
        email: "testtest@gg.gg",
        password: "123123123"
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
        email: "testtest@gg.gg",
        password: "123123123"
      }
    }
  }
};
