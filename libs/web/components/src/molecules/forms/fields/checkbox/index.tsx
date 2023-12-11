import { Fieldset } from "../../fieldset";
import { InputCheckbox } from "../../../../atoms";
import { ReactElement, forwardRef } from "react";
import { TFieldCheckbox } from "./type";

export const FieldCheckbox = forwardRef<HTMLInputElement, TFieldCheckbox>(
  (props, ref): ReactElement => {
    return (
      <Fieldset type="checkbox" {...props}>
        <InputCheckbox {...props} ref={ref} />
      </Fieldset>
    );
  },
);

FieldCheckbox.displayName = "FieldCheckbox";
