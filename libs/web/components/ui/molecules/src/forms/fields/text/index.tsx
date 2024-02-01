import { InputText } from "@uninus/ui-atoms";
import { Fieldset } from "@uninus/ui-templates";
import { ReactElement, forwardRef } from "react";
import { TFieldText } from "./type";

export const FieldText = forwardRef<HTMLInputElement, TFieldText>((props, ref): ReactElement => {
  return (
    <Fieldset {...props}>
      <InputText {...props} ref={ref} />
    </Fieldset>
  );
});

FieldText.displayName = "FieldText";
