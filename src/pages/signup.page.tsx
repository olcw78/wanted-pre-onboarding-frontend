import type { MouseEventHandler } from "react";
import { useEffect, useLayoutEffect } from "react";
import InputItem from "feature/auth/component/InputItem";
import { httpClient } from "../network/httpClient/httpClient";
import type { SignupModelBody } from "../network/spec/auth/model";
import { API_SPEC } from "../network/spec";
import { useNavigate } from "react-router-dom";
import { useAuthLocalState } from "../feature/auth/useAuthLocalState";
import { useAuthCtx } from "../state/auth/auth.state";

const SignUpPage = () => {
  const {
    emailInput,
    emailInputHandler,
    emailInputRef,

    passwordInput,
    passwordInputHandler,

    resetInput,

    isValidToSubmit
  } = useAuthLocalState();

  const navigate = useNavigate();
  const authCtx = useAuthCtx();

  useLayoutEffect(() => {
    if (authCtx.hasAccessToken()) {
      navigate("/todo");
    }
  }, [authCtx, authCtx.hasAccessToken, navigate]);

  const signUpHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!isValidToSubmit) {
      return;
    }

    const signUpSpec = API_SPEC.auth.signup;

    try {
      await httpClient.post<SignupModelBody>(signUpSpec.url, {
        email: emailInput,
        password: passwordInput
      });
      navigate("/signin");
    } catch (err) {
      console.error(err);
    } finally {
      // 가입 버튼 누른 후 인풋 초기화.
      resetInput();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-10">
        <p className="text-4xl text-bold">회원가입</p>
      </div>

      <section className="mb-10 px-5 py-3 rounded-md bg-amber-200 ">
        <InputItem
          label="E-mail"
          inputValue={emailInput}
          inputHandler={emailInputHandler}
          className="mb-5"
          testId="email-input"
          inputRef={emailInputRef}
        />

        <InputItem
          label="Password"
          inputValue={passwordInput}
          inputHandler={passwordInputHandler}
          testId="password-input"
        />
      </section>

      <button
        type="button"
        data-testid="signin-button"
        className="px-5 py-1 rounded-md border border-1 bg-amber-500"
        onClick={signUpHandler}
        disabled={!isValidToSubmit}
      >
        <p className="text-bold text-xl text-white">회원가입 하기</p>
      </button>
    </div>
  );
};

export default SignUpPage;
