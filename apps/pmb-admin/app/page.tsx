import { NextPage } from 'next';
import { ReactElement } from 'react';
import { LoginModuleAdmin } from '@uninus/modules-fe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB-ADMIN | Masuk',
};

const LoginPageAdmin: NextPage = (): ReactElement => <LoginModuleAdmin />;
export default LoginPageAdmin;
