import { NextPage } from 'next';
import { ReactElement } from 'react';
import { RegisterModule } from '@uninus/modules-fe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Pendaftaran',
};

const LoginPage: NextPage = (): ReactElement => <RegisterModule />;
export default LoginPage;
