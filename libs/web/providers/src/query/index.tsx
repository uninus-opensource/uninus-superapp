"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FC, PropsWithChildren, ReactElement } from "react";

export const QueryProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * (60 * 1000),
        cacheTime: 15 * (60 * 1000),
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
