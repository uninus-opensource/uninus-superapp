import { VerifForgetModule } from '@uninus/modules-fe';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Verif Forget',
};

const verifEmail: NextPage = (): ReactElement => <VerifForgetModule />;
export default verifEmail;
