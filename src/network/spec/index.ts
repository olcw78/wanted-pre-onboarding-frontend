export const API_SPEC = Object.freeze({
  auth: {
    signUp: {
      routes: "auth/signup",
      expect: {
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            email: "",
            password: ""
          }
        },
        response: {
          statusCode: 201,
          body: undefined
        }
      }
    },
    signIn: {
      routes: "auth/signin",
      expect: {
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            email: "",
            password: ""
          }
        },
        response: {
          statusCode: 200,
          body: {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjo0LCJpYXQiOjE2NTk5MDQyMTUsImV4cCI6MTY2MDUwOTAxNX0.DyUCCsIGxIl8i_sGFCa3uQcyEDb9dChjbl40h3JWJNc"
          }
        }
      }
    }
  }
});

export type APISpecT = typeof API_SPEC;