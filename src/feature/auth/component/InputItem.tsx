import type { ChangeEvent, FC, HTMLAttributes, RefObject } from "react";

interface InputItemProps
  extends Pick<HTMLAttributes<HTMLElement>, "className"> {
  readonly label: string;
  readonly inputValue: string;
  readonly testId: string;
  inputRef?: RefObject<HTMLInputElement>;
  inputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: FC<InputItemProps> = ({
  label,
  inputValue,
  inputHandler,
  testId,
  inputRef,
  className
}) => (
  <div
    className={"flex flex-row items-center gap-x-10 ".concat(className || "")}
  >
    <p className="w-20 text-xl text-bold">{label}</p>
    <input
      type="text"
      data-testid={testId}
      className="border border-1 border-slate-300 rounded-lg w-[20vw]"
      value={inputValue}
      onChange={inputHandler}
      ref={inputRef}
    />
  </div>
);

export default InputItem;
