import { FC, ReactElement } from 'react';
import { TbannerProps } from './type';
import { Reveal, Button } from '../../atoms';

export const HeroBanner: FC<TbannerProps> = ({
  heroTitle,
  heroTitle2,
  heroTitleBottomLeft,
  heroImages,
  backgrounColor,
  subTitle,
  subTitle2,
  isDownload = false,
  blur = false,
}): ReactElement => {
  return (
    <header
      className={`bg-center ${backgrounColor} flex justify-center items-center relative bg-fixed object-center bg-cover lg:w-full h-screen bg-no-repeat bg-blend-overlay`}
      style={{
        backgroundImage: `url(${heroImages})`,
      }}
    >
      <section
        className={`px-4 mx-auto w-full h-full ${
          blur ? 'backdrop-blur-sm' : ''
        } text-center py-24 lg:py-52`}
      >
        <Reveal w="w-full" blur={blur}>
          <div className="flex items-center flex-col w-full">
            <div className="text-xl md:text-4xl font-bebasNeue py-4 font-normal text-primary-white leading-normal uppercase lg:pt-10 pt-40">
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
                  href="https://pmb.uninus.ac.id/wp-content/uploads/2023/03/Brosur-Program-Sarjana.pdf"
                  variant="outlined"
                  styling="border-primary-white "
                  size="lg"
                >
                  Unduh Brosur
                </Button>
                <Button href="/auth/register" variant="filled" size="lg">
                  Daftar Sekarang
                </Button>
              </section>
            ) : null}
            <div className="flex flex-col w-full justify-start text-left p-10 lg:pt-44 pt-48 bottom-0 text-3xl md:text-5xl text-primary-white left-16 font-extramedium font-bebasNeue">
              {heroTitleBottomLeft}
              <div className="border-2 border-primary-green w-36 "></div>
            </div>
          </div>
        </Reveal>
      </section>
    </header>
  );
};
