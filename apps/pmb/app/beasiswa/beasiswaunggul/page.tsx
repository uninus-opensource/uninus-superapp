import { ReactElement } from 'react';
import { NextPage } from 'next';
import { ModuleUnggul } from '@uninus/web/modules';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beasiswa | Beasiswa Unggul',
};

const BeasiswaUnggul: NextPage = (): ReactElement => <ModuleUnggul />;
export default BeasiswaUnggul;
