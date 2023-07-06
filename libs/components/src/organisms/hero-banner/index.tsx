import { FC, ReactElement } from 'react';
import { TbannerProps } from './type';
import { Reveal, Button } from '../../atoms';

export const HeroBanner: FC<TbannerProps> = ({
  heroTitle,
  heroTitle2,
  heroImages,
  backgrounColor,
  subTitle,
  subTitle2,
  isDownload = false,
  blur = false,
}): ReactElement => {
  return (
    <header
      className={`bg-center ${backgrounColor} flex justify-center items-center relative bg-fixed object-center bg-cover w-full h-full bg-no-repeat bg-blend-overlay`}
      style={{ backgroundImage: `url(${heroImages})` }}
    >
      <section
        className={`px-4 mx-auto w-full h-full ${
          blur ? 'backdrop-blur-sm' : ''
        } text-center py-24 lg:py-52`}
      >
        <Reveal w="w-full">
          <div className="flex items-center flex-col w-full">
            <div className="text-xl md:text-4xl font-bebasNeue py-4 font-normal text-primary-white leading-normal uppercase">
              {subTitle}
            </div>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-white md:text-3xl">
              {heroTitle}
            </h2>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-white md:text-5xl relative bottom-4">
              {heroTitle2}
            </h1>
            <p className="text-2xl md:text-3xl text-primary-white font-medium">
              {subTitle2}
            </p>
            {isDownload ? (
              <section className="flex mt-12 gap-8">
                <Button
                  href="#"
                  variant="outlined"
                  styling="border-primary-white "
                  size="lg"
                >
                  Unduh Brosur
                </Button>
                <Button href="#" variant="filled" size="lg">
                  Daftar Sekarang
                </Button>
              </section>
            ) : null}
          </div>
        </Reveal>
      </section>
    </header>
  );
};
