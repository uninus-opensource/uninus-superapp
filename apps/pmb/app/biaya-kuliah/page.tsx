import { TuitionFeeModule } from '@uninus/modules-fe';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Biaya Kuliah',
};

const TuitionFeePage: NextPage = (): ReactElement => <TuitionFeeModule />;
export default TuitionFeePage;
