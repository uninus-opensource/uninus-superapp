import { FC, ReactElement } from 'react';
import { TbannerProps } from './type';
import { Reveal, Button } from '../../atoms';

export const HeroBanner: FC<TbannerProps> = ({
  heroTitles,
  heroImages,
  backgrounColor,
  subTitle,
  isDownload = false,
}): ReactElement => {
  return (
    <header
      className={`bg-center ${backgrounColor} flex justify-center items-center relative bg-fixed object-center bg-cover w-full h-screen bg-no-repeat bg-blend-overlay`}
      style={{ backgroundImage: `url(${heroImages})` }}
    >
      <section className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <Reveal w="w-full">
          <div className="flex items-center flex-col w-full">
            <p className="text-2xl md:text-3xl text-yellow-400 py-4 font-medium">
              {subTitle}
            </p>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight  leading-none text-white md:text-5xl">
              {heroTitles}
            </h1>
            {!isDownload ? (
              <Button
                href="#"
                variant="primary"
                size="lg"
                width="w-full"
                height="h-8"
              >
                Unduh Brosur
              </Button>
            ) : null}
          </div>
        </Reveal>
      </section>
    </header>
  );
};
