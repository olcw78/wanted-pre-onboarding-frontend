import { type ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Validator } from "./validator";

export const useAuthLocalState = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isValidToSubmit, setValidToSubmit] = useState(false);

  useEffect(() => {
    if (!emailInputRef?.current) {
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
    setValidToSubmit(Validator.validateEmail(email));
  };

  const passwordInputHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const password = event.target.value;
    setPasswordInput(password);
    setValidToSubmit(Validator.validatePassword(password));
  };

  return {
    emailInput,
    emailInputHandler,
    emailInputRef,

    passwordInput,
    passwordInputHandler,

    resetInput,

    isValidToSubmit
  };
};
