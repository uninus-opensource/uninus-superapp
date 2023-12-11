import { forwardRef, ReactElement } from "react";
import { inputClassName } from "@uninus/web/utilities";
import { TInputText } from "./type";

export const InputText = forwardRef<HTMLInputElement, TInputText>(
  ({ size, ...props }, ref): ReactElement => {
    return (
      <input
        {...props}
        data-testid="input-text"
        className={inputClassName({ size, ...props })}
        ref={ref}
        id={props.name}
      />
    );
  },
);

InputText.displayName = "InputText";
