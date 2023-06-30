import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FC, PropsWithChildren, ReactElement } from 'react';

export const QueryProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
