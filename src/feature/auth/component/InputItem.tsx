import type { ChangeEvent, FC, HTMLAttributes, RefObject } from "react";

interface InputItemProps
  extends Pick<HTMLAttributes<HTMLElement>, "className"> {
  label: string;
  inputValue: string;
  testId: string;
  type?: HTMLInputElement["type"];
  inputRef?: RefObject<HTMLInputElement>;
  inputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: FC<Readonly<InputItemProps>> = ({
  label,
  inputValue,
  testId,
  type = "text",
  inputRef,
  inputHandler,
  className
}) => {
  return (
    <div
      className={"flex flex-row items-center gap-x-10 ".concat(className || "")}
    >
      <p className="w-20 text-xl font-bold">{label}</p>
      <input
        type={type}
        data-testid={testId}
        className="border border-1 border-slate-300 rounded-lg w-[20vw]"
        value={inputValue}
        onChange={inputHandler}
        ref={inputRef}
      />
    </div>
  );
};

export default InputItem;
