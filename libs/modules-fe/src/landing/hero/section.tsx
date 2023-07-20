import { FC, ReactElement } from 'react';
import { HeroBanner } from '@uninus/components';

export const HeroSection: FC = (): ReactElement => {
  return (
    <HeroBanner
      subTitle={
        <p>
          Get Your Future with{' '}
          <span className="text-primary-yellow">UNINUS</span>
        </p>
      }
      heroTitle="PENERIMAAN MAHASISWA BARU"
      heroTitle2="UNIVERSITAS ISLAM NUSANTARA"
      subTitle2="Tahun Akademik 2023/2024"
      heroImages="/illustrations/gedung.png"
      backgrounColor="bg-grayscale-9"
      isDownload
      blur
    />
  );
};
