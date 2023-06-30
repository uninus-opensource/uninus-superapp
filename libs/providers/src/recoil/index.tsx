import { FC, PropsWithChildren, ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

export const RecoilProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => <RecoilRoot>{children}</RecoilRoot>;
