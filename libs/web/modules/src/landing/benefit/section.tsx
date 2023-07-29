'use client';
import { Card } from '@uninus/web/components';
import { FC, ReactElement } from 'react';
import {
  AiFillStar,
  AiFillSafetyCertificate,
  AiFillTags,
  AiFillEnvironment,
  AiFillTrophy,
} from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { TBenefit } from './type';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const CardBenerfit: TBenefit[] = [
  {
    icon: <AiFillStar />,
    title: 'Kampus pilihan',
    desc: (
      <p>
        {' '}
        <span className="text-secondary-green-4 font-bold">Peringkat 6 </span>
        Kampus NU terbaik se - Indonesia,{' '}
        <span className="text-secondary-green-4 font-bold">10 Terbaik </span> se
        - Kota Bandung dan{' '}
        <span className="text-secondary-green-4 font-bold">
          99 Kampus Terbaik{' '}
        </span>
        se - Indonesia
      </p>
    ),
  },
  {
    icon: <AiFillSafetyCertificate />,
    title: 'Terakreditasi',
    desc: (
      <p>
        Seluruh Program Studi di UNINUS yang Terakreditasi BAN - PT mendapatkan
        Rata - rata Penilaian{' '}
        <span className="text-secondary-green-4 font-bold">
          {`"Baik Sekali"`}
        </span>
      </p>
    ),
  },
  {
    icon: <AiFillTags />,
    title: 'Biaya Terjangkau',
    desc: (
      <p>
        <span className="text-secondary-green-4 font-bold">
          Biaya Kuliah Terjangkau{' '}
        </span>
        dengan{' '}
        <span className="text-secondary-green-4 font-bold">
          berbagai Kemudahan Pembiayaan
        </span>
      </p>
    ),
  },
  {
    icon: <AiFillEnvironment />,
    title: 'Lokasi Strategis',
    desc: (
      <p>
        <span className="text-secondary-green-4 font-bold">
          Akses Transportasi mudah
        </span>{' '}
        dan lokasi kampus berada{' '}
        <span className="text-secondary-green-4 font-bold">
          pusat Kota Bandung
        </span>
      </p>
    ),
  },
  {
    icon: <AiFillTrophy />,
    title: 'Pilihan Beasiswa',
    desc: (
      <p>
        <span className="text-secondary-green-4 font-bold">
          Terdapat berbagai Beasiswa Pilihan
        </span>{' '}
        Nusantara Unggul, Nusantara Berprestasi dan Mitra Nusantara
      </p>
    ),
  },
  {
    icon: <BiSolidUser />,
    title: 'Dosen Berpengalaman',
    desc: (
      <p>
        Dosen{' '}
        <span className="text-secondary-green-4 font-bold">
          Lulusan Universitas Terkemuka
        </span>{' '}
        di{' '}
        <span className="text-secondary-green-4 font-bold">
          Indonesia & Luar Negeri
        </span>{' '}
        yang berpengalaman dalam bidangnya.
      </p>
    ),
  },
];

const cardProps = {
  items: CardBenerfit.map((x, i) => (
    <div key={i} className="flex h-full p-4">
      <Card key={i} icon={x.icon} cardTitle={x.title} height="h-48">
        {x.desc}
      </Card>
    </div>
  )),
  responsive: {
    0: {
      items: 1,
    },
    640: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  },
  autoPlay: true,
  autoPlayInterval: 3000,
  animationDuration: 1000,
  infinite: true,
  disableButtonsControls: true,
};

export const BenefitSection: FC = (): ReactElement => {
  return (
    <section className="mt-40 h-full w-full gap-4 my-20 lg:px-16 px-4 py-2 flex flex-col items-center ">
      <h1 className="p-5 text-2xl text-center lg:text-4xl text-secondary-green-4 font-bold">
        Kenapa Harus Kuliah di{' '}
        <span className="text-primary-yellow">UNINUS?</span>
      </h1>
      <section className="lg:grid hidden lg:grid-cols-3 lg:gap-10 gap-4 xl:gap-16">
        {CardBenerfit.map((x, i) => (
          <Card key={i} icon={x.icon} cardTitle={x.title}>
            {x.desc}
          </Card>
        ))}
      </section>

      <div className="lg:hidden w-full">
        <AliceCarousel {...cardProps} />
      </div>
    </section>
  );
};
