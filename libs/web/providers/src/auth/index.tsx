"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, FC, ReactElement } from "react";

export const AuthProvider: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <SessionProvider>{children}</SessionProvider>
);
