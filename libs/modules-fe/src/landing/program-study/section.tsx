import { Card } from '@uninus/components';
import { FC, ReactElement } from 'react';
import { ProgramPendidikanProps } from './type';

const programPendidikanList: ProgramPendidikanProps[] = [
  {
    iconText: 'S1',
    title: 'sarjana',
    item: 'Bergabunglah dengan program sarjana di UNINUS. Kami menawarkan pendidikan berkualitas & dosen berpengalaman. Mari raih impianmu bersama kami.',
  },
  {
    iconText: 'S2',
    title: 'magister',
    item: 'Program Pendidikan UNINUS Di Perguruan Tinggi berkualitas yang fleksibel, dikelola oleh dosen berpengalaman, meningkatkan jenjang karier dan wawasan bakat minat anda.',
  },
  {
    iconText: 'S3',
    title: 'doktor',
    item: 'Program Pendidikan Doktor memberikan pengetahuan dan keterampilan yang luas, dikelola oleh dosen berpengalaman dan sudah ahli dibidangnya. Ayo bergabunglah bersama kami.',
  },
];

export const ProgramSection: FC = (): ReactElement => {
  return (
    <section className="mt-32 mb-20 h-auto lg:w-full w-auto gap-4 lg:px-16 px-8 py-2 flex flex-col">
      <h1 className="uppercase text-center lg:ml-8 w-full text-xl lg:text-3xl text-secondary-green-4 font-bold ">
        program <span className="text-primary-green">pendidikan</span>
      </h1>
      <section className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 items-center gap-10 xl:flex xl:justify-center xl:gap-8 px-8 mt-10">
        {programPendidikanList.map((list, idx) => (
          <Card
            key={idx}
            iconText={list.iconText}
            cardTitle={list.title}
            height="h-60"
          >
            {list.item}
          </Card>
        ))}
      </section>
    </section>
  );
};
