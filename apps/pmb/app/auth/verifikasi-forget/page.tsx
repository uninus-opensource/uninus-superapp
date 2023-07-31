import { VerifForgetModule } from '@uninus/web/modules';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Verif Forget',
};

const verifEmail: NextPage = (): ReactElement => (
  <VerifForgetModule key={'verifForgot'} />
);
export default verifEmail;
