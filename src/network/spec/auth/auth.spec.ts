import { NetworkSpecItem } from "../spec/spec.gen";
import { EApiCategory } from "../spec/EApiCategory";
import type {
  SigninModelBodyT,
  SigninModelResponseT,
  SignupModelBodyT
} from "./model";
import faker from "@fakerjs/faker";

export const authSpec = {
  ...NetworkSpecItem.factory<EApiCategory.auth, SignupModelBodyT>({
    name: "signin",
    routes: "auth/signin"
  })
    .options({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .body({
      email: faker().email(),
      password: faker().word()
    })
    .response({
      statusCode: 201
    }),

  ...NetworkSpecItem.factory<
    EApiCategory.auth,
    SigninModelBodyT,
    SigninModelResponseT
  >({
    name: "signup",
    routes: "auth/signup"
  })
    .options({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .body({
      email: faker().email(),
      password: faker().word()
    })
    .response({
      statusCode: 201,
      body: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjo0LCJpYXQiOjE2NTk5MDQyMTUsImV4cCI6MTY2MDUwOTAxNX0.DyUCCsIGxIl8i_sGFCa3uQcyEDb9dChjbl40h3JWJNc"
      }
    })
};
