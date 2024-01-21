import { ReactElement, forwardRef } from "react";
import { TInputRadio } from "./type";

export const NeoInputRadio = forwardRef<HTMLInputElement, TInputRadio>(
  (props, ref): ReactElement => {
    return <input type="radio" data-testid="input-radio" {...props} ref={ref} />;
  },
);

NeoInputRadio.displayName = "NeoInputRadio";
