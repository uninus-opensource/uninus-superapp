import { FC, ReactElement } from "react";
import { TMessage } from "./type";
import { clsx } from "clsx";
import { match } from "ts-pattern";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";

export const Message: FC<TMessage> = (props): ReactElement => {
  const { status = "none" } = props;

  const statusIcon = match(status)
    .with("error", () => <BiErrorCircle />)
    .with("success", () => <BiCheckCircle />)
    .with("warning", () => <BiErrorCircle />)
    .with("none", () => null)
    .exhaustive();

  const className = clsx("text-xs flex items-center gap-x-1 mt-[-7px]", {
    "text-red-400": status === "error",
    "text-green-600": status === "success",
    "text-gray-400": status === "none",
    "text-yellow-400": status === "warning",
  });

  return (
    <span className={className} {...props}>
      {statusIcon}
      {props.children}
    </span>
  );
};
