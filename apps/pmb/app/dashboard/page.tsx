'use client';
import { NextPage } from 'next';
import { ReactElement } from 'react';

import DashboardLayout from '../layouts/DashboardLayout';

const DashboardHome: NextPage = (): ReactElement => {
  return <DashboardLayout></DashboardLayout>;
};

export default DashboardHome;
