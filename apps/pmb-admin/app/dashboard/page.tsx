import { DashboardModuleAdmin } from '@uninus/modules-fe';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard PMB | Beranda',
};

const DashboardHomeAdmin: NextPage = (): ReactElement => (
  <DashboardModuleAdmin />
);
export default DashboardHomeAdmin;
