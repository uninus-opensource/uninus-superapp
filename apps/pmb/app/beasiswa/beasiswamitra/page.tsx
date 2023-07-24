import { ReactElement } from 'react';
import { NextPage } from 'next';
import { ModuleMitra } from '@uninus/modules-fe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beasiswa | Beasiswa Mitra',
};

const MitraPage: NextPage = (): ReactElement => <ModuleMitra />;

export default MitraPage;
