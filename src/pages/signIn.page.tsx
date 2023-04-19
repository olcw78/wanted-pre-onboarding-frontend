import type { FC, MouseEventHandler } from "react";
import { useEffect } from "react";
import InputItem from "feature/auth/component/InputItem";
import { useAuthLocalState } from "../feature/auth/useAuthLocalState";
import { useAuthCtx } from "../state/auth/auth.state";
import { useNavigate } from "react-router-dom";
import { AuthRequestStatic } from "../network/httpRequest/auth/auth.request";

const SignInPage: FC = () => {
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

  useEffect(() => {
    if (authCtx.hasAccessToken()) {
      navigate("/todo");
    }
  }, [authCtx, authCtx.hasAccessToken, navigate]);

  const signInHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!isValidToSubmit) {
      return;
    }

    try {
      const response = await AuthRequestStatic.signIn(
        emailInput,
        passwordInput
      );

      authCtx.updateAccessToken(response.access_token);

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
        <p className="text-4xl font-bold">로그인</p>
      </div>

      <section className="mb-10 px-5 py-3 rounded-md bg-amber-200">
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
        <p className="font-bold text-xl text-white">로그인 하기</p>
      </button>
    </div>
  );
};

export default SignInPage;
