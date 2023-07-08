import { FC, ReactElement } from 'react';
import { TbannerProps } from './type';
import { Reveal, Button } from '../../atoms';

export const HeroBanner: FC<TbannerProps> = ({
  heroTitle,
  heroTitle2,
  heroTitleBottomRight,
  heroImages,
  backgrounColor,
  subTitle,
  subTitle2,
  isDownload = false,
  blur = false,
}): ReactElement => {
  return (
    <header
      className={`bg-center ${backgrounColor} flex justify-center items-center relative bg-fixed object-center bg-cover lg:w-full lg:h-auto h-screen bg-no-repeat bg-blend-overlay`}
      style={{
        backgroundImage: `url(${heroImages})`,
      }}
    >
      <section
        className={`px-4 mx-auto w-full h-full ${
          blur ? 'backdrop-blur-sm' : ''
        } text-center py-24 lg:py-52`}
      >
        <Reveal w="w-full">
          <div className="flex items-center flex-col w-full">
            <div className="text-5xl lg:text-4xl font-bebasNeue lg:py-4 pt-16 font-normal text-primary-white leading-normal uppercase">
              {subTitle}
            </div>
            <h2 className="mb-4 lg:text-4xl text-5xl font-extrabold tracking-tight text-primary-white md:text-3xl lg:pt-20 pt-20">
              {heroTitle}
            </h2>
            <h1 className="mb-4 lg:text-4xl text-5xl font-extrabold tracking-tight text-primary-white md:text-5xl relative bottom-4">
              {heroTitle2}
            </h1>
            <p className="text-2xl md:text-3xl text-primary-white font-medium">
              {subTitle2}
            </p>
            <div className="flex flex-col text-2xl md:text-4xl text-primary-white absolute left-24 bottom-0 gap-2 font-extramedium font-bebasNeue">
              {heroTitleBottomRight}
              <div
                className={`border-2 border-primary-green w-26 ${
                  heroTitleBottomRight ? 'block' : 'hidden'
                }`}
              ></div>
            </div>
            {isDownload ? (
              <section className="flex mt-12 gap-8">
                <Button
                  href="https://pmb.uninus.ac.id/wp-content/uploads/2023/03/Brosur-Program-Sarjana.pdf"
                  variant="outlined"
                  styling="border-primary-white "
                  size="lg"
                >
                  Unduh Brosur
                </Button>
                <Button href="/register" variant="filled" size="lg">
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
