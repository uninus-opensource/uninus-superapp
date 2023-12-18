import { ReactElement, forwardRef } from "react";
import { TInputCheckbox } from "./type";

export const InputCheckbox = forwardRef<HTMLInputElement, TInputCheckbox>(
  (props, ref): ReactElement => {
    return (
      <input {...props} type="checkbox" data-testid="input-checkbox" id={props.name} ref={ref} />
    );
  },
);

InputCheckbox.displayName = "InputCheckbox";
