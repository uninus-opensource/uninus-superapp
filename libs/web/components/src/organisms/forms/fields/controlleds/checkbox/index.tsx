import { FieldCheckbox } from "../../../../..";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledFieldText } from "./type";

export const ControlledFieldCheckbox = <T extends FieldValues>(
  props: TControlledFieldText<T>,
): ReactElement => {
  const { field } = useController(props);
  return <FieldCheckbox {...{ ...props, ...field }} />;
};
