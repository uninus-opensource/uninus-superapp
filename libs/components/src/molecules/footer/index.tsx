import { FC, ReactElement } from 'react';
import HybridUniv from '../../atoms/illustrations/hybriduniversity/Hybrid-University-1536x558.png';
import Image from 'next/image';
import { FooterList } from './type';
import { Email, Navigate, Phone } from '../../atoms';

export const Footer: FC = (): ReactElement => {
  const footList: FooterList[] = [
    {
      icon: <Navigate />,
      item: 'Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286',
    },
    {
      icon: <Phone />,
      item: '0811-2161-530',
    },
    {
      icon: <Email />,
      item: 'humas@uninus.ac.id',
    },
  ];

  return (
    <footer className="bottom-0 bg-green-930 w-full h-[40vh] z-30 lg:h-[25vh] text-sm font-semibold flex flex-col justify-between items-center text-white ">
      <section className="flex flex-col lg:flex-row lg:mt-6 w-full h-full lg:h-auto justify-around items-center lg:justify-between px-10">
        <ul>
          {footList?.map((foot, idx) => (
            <li key={idx} className="flex items-center gap-4 mt-1">
              <figure className="mt-0.5">{foot.icon}</figure>
              {foot.item}
            </li>
          ))}
        </ul>
        <figure>
          <Image
            src={HybridUniv}
            priority
            alt="hybrid-university"
            className="w-[12rem] lg:w-[15vw]"
          />
        </figure>
      </section>
      <section className="w-full bg-green-950 h-[7vh] flex items-center justify-center text-sm">
        <h1 className="text-yellow-300 font-semibold">
          UNIVERSITAS ISLAM NUSANTARA
        </h1>
      </section>
    </footer>
  );
};
