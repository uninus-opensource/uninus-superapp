import { ReactElement } from 'react';
import { NextPage } from 'next';
import { ModulBeasiswa } from '@uninus/modules-fe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Beasiswa',
};

const BeasiswaPage: NextPage = (): ReactElement => <ModulBeasiswa />;
export default BeasiswaPage;
