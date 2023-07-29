import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';
import { LoginModule } from '@uninus/web/modules';

export const metadata: Metadata = {
  title: 'PMB-ADMIN | Masuk',
};

const LoginPageAdmin: NextPage = (): ReactElement => <LoginModule />;
export default LoginPageAdmin;
