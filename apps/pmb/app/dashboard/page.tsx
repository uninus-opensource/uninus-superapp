import { NextPage } from 'next';
import { ReactElement } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardHome: NextPage = (): ReactElement => {
  return (
    <DashboardLayout>
      <h1 className="font-bold">Pengumuman</h1>
    </DashboardLayout>
  );
};

export default DashboardHome;
