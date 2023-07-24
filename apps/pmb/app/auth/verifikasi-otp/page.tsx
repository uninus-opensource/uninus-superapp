import { VerifEmailModule } from '@uninus/modules-fe';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Verifikasi',
};

const verifEmail: NextPage = (): ReactElement => <VerifEmailModule />;
export default verifEmail;
