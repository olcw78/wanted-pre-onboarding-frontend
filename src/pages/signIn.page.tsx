import type { MouseEventHandler } from "react";
import { useLayoutEffect } from "react";
import InputItem from "feature/auth/component/InputItem";
import { httpClient } from "../network/httpClient/httpClient";
import type {
  SigninModelBody,
  SigninModelResponse
} from "../network/spec/auth/model";
import { API_SPEC } from "../network/spec";
import { useAuthLocalState } from "../feature/auth/useAuthLocalState";
import { useAuthCtx } from "../state/auth/auth.state";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const {
    emailInput,
    emailInputHandler,
    emailInputRef,

    passwordInput,
    passwordInputHandler,

    resetInput,

    isValidToSubmit
  } = useAuthLocalState();

  const authCtx = useAuthCtx();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (authCtx.hasAccessToken()) {
      navigate("/todo");
    }
  }, [authCtx, authCtx.hasAccessToken, navigate]);

  const signInHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!isValidToSubmit) {
      return;
    }

    const signInSpec = API_SPEC.auth.signin;
    try {
      const { access_token } = await httpClient.post<
        SigninModelBody,
        SigninModelResponse
      >(signInSpec.url, {
        email: emailInput,
        password: passwordInput
      });
      authCtx.updateAccessToken(access_token);
      navigate("/todo");
    } catch (err) {
      console.error(err);
    } finally {
      // 로그인 버튼 누른 후 인풋 초기화.
      resetInput();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-10">
        <p className="text-4xl text-bold">로그인</p>
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
        onClick={signInHandler}
        disabled={!isValidToSubmit}
      >
        <p className="text-bold text-xl text-white">로그인 하기</p>
      </button>
    </div>
  );
};

export default SignInPage;
