import {
  type ChangeEventHandler,
  MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import InputItem from "feature/signIn/component/InputItem";
import { validator } from "../feature/signIn/validator";
import { httpClient } from "../network/httpClient/httpClient";
import { SignupModelBody } from "../network/spec/auth/model";
import { API_SPEC } from "../network/spec";

const SignUpPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [isValidToSubmit, setValidToSubmit] = useState(false);

  useLayoutEffect(() => {
    if (!emailInputRef.current) {
      return;
    }

    // 페이지 이동시 email input 으로 focus.
    emailInputRef.current.focus({});
  }, []);

  const resetInput = () => {
    setEmailInput("");
    setPasswordInput("");
  };

  const emailInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const email = event.target.value;
    setEmailInput(email);
    setValidToSubmit(validator.validateEmail(email));
  };

  const passwordInputHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const password = event.target.value;
    setPasswordInput(password);
    setValidToSubmit(validator.validatePassword(password));
  };

  const signUpHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!isValidToSubmit) {
      return;
    }

    const signUpSpec = API_SPEC.auth.signup;
    await httpClient.post<SignupModelBody>(signUpSpec.url, {
      email: emailInput,
      password: passwordInput
    });

    // 가입 버튼 누른 후 인풋 초기화.
    resetInput();
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
        <p className="text-bold text-xl text-white">로그인 하기</p>
      </button>
    </div>
  );
};

export default SignUpPage;
