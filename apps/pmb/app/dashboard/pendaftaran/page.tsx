import { NextPage } from 'next';
import { ReactElement } from 'react';
import { ModulePendaftaran } from '@uninus/modules-fe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard PMB | Form Pendaftaran',
};

const DashboardPendaftaran: NextPage = (): ReactElement => (
  <ModulePendaftaran />
);

export default DashboardPendaftaran;
