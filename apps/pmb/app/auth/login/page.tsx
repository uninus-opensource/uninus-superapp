import { NextPage } from 'next';
import { ReactElement } from 'react';
import { LoginModule } from '@uninus/web/modules';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Masuk',
};

const LoginPage: NextPage = (): ReactElement => <LoginModule />;
export default LoginPage;
