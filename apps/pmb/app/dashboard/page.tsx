import { DashboardModule } from '@uninus/modules-fe';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard PMB | Beranda',
};

const DashboardHome: NextPage = (): ReactElement => <DashboardModule />;
export default DashboardHome;
