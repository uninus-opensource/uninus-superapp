import { FC, Fragment, ReactElement } from 'react';
import { HeroBanner } from '@uninus/web/components';

export const HeroSection: FC = (): ReactElement => {
  return (
    <HeroBanner
      subTitle={
        <Fragment>
          Get Your Future with{' '}
          <span className="text-primary-yellow">UNINUS</span>
        </Fragment>
      }
      heroTitle="PENERIMAAN MAHASISWA BARU"
      heroTitle2="UNIVERSITAS ISLAM NUSANTARA"
      subTitle2="Tahun Akademik 2023/2024"
      heroImages="/illustrations/gedung.webp"
      backgrounColor="bg-grayscale-9"
      isDownload
      blur
      isSlider
    />
  );
};
