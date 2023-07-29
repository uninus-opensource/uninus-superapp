import { DashboardModuleAdmin } from '@uninus/web/modules';
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
