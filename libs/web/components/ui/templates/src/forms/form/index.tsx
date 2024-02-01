import type { FC, PropsWithChildren, ReactElement } from "react";

export const Form: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return <form>{children}</form>;
};
