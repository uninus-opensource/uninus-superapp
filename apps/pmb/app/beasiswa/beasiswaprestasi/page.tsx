import { ReactElement } from 'react';
import { NextPage } from 'next';
import { ModulePrestasi } from '@uninus/modules-fe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beasiswa | Beasiswa Prestasi',
};

const BeasiswaPrestasi: NextPage = (): ReactElement => <ModulePrestasi />;
export default BeasiswaPrestasi;
