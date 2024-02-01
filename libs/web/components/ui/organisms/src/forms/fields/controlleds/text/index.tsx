import { FieldText } from "@uninus/ui-molecules";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledFieldText } from "./type";

export const ControlledFieldText = <T extends FieldValues>(
  props: TControlledFieldText<T>,
): ReactElement => {
  const { field } = useController(props);
  return <FieldText {...{ ...props, ...field }} />;
};
