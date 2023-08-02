import { FC, ReactElement, useState } from "react";
import { TSliderProps, TbannerProps } from "./type";
import { Reveal, Button } from "../../atoms";
import Image from "next/image";
import AliceCarousel, { EventObject } from "react-alice-carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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
  isSlider = false,
}): ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const slidePrev = () => {
    if (activeIndex <= 0) {
      setActiveIndex(heroSlider.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };
  const slideNext = () => {
    if (activeIndex >= heroSlider.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const sync = (e: EventObject) => {
    if (e.item > 3) {
      setActiveIndex(e.item * 0);
    } else {
      setActiveIndex(e.item);
    }
  };

  const heroSlider: TSliderProps[] = [
    {
      sliderSection: (
        <header
          className={`bg-center ${backgrounColor} flex justify-center items-center bg-fixed object-center bg-cover lg:w-full xl:h-screen lg:h-[120vh] h-[50vh] relative bg-no-repeat bg-blend-overlay`}
          style={{
            backgroundImage: `url(${heroImages})`,
          }}
        >
          <section
            className={`px-4 mx-auto w-full h-full ${
              blur ? "backdrop-blur-sm" : ""
            } text-center md:pt-16 lg:pt-28 xl:pt-16`}
          >
            <Reveal w="w-full" blur={blur}>
              <div className="flex items-center justify-center lg:h-screen flex-col w-full">
                <div className="text-sm sm:text-xl md:text-4xl xl:text-5xl py-2 lg:py-4 font-black text-primary-white leading-normal uppercase pt-32">
                  {subTitle}
                </div>
                <h2 className="mb-5 lg:mb-8 text-base md:text-3xl xl:text-4xl font-semibold text-primary-white">
                  {heroTitle}
                </h2>
                <h1 className="lg:mb-4 text-lg sm:text-xl font-bold md:font-medium lg:font-bold md:text-3xl lg:text-5xl text-primary-white relative bottom-4">
                  {heroTitle2}
                </h1>
                <p className="text-lg md:text-3xl text-primary-white font-bold">{subTitle2}</p>
                <div className="flex flex-col text-2xl md:text-5xl text-primary-white absolute left-0 lg:left-24 bottom-0 gap-2 font-black">
                  {heroTitleBottomRight}
                  <div
                    className={`border-2 border-primary-green w-36 ${
                      heroTitleBottomRight ? "block" : "hidden"
                    }`}
                  ></div>
                </div>
                {isDownload ? (
                  <section className="flex mt-4 lg:mt-12 gap-8 ">
                    <Button
                      href="https://pmb.uninus.ac.id/wp-content/uploads/2023/03/Brosur-Program-Sarjana.pdf"
                      variant="outlined"
                      styling="border-primary-white lg:p-7"
                      size="sm"
                    >
                      Unduh Brosur
                    </Button>
                    <Button href="/auth/register" variant="filled" size="sm" styling="lg:p-7">
                      Daftar Sekarang
                    </Button>
                  </section>
                ) : null}
              </div>
            </Reveal>
          </section>
        </header>
      ),
    },
    {
      sliderSection: (
        <Image
          src={"/illustrations/slider-1.webp"}
          alt="slider-1"
          quality={100}
          width={1000}
          height={500}
          className={`bg-center flex justify-center items-center absolute mt-24 lg:mt-2 lg:h-auto lg:w-full`}
        />
      ),
    },
    {
      sliderSection: (
        <Image
          src={"/illustrations/slider-2.webp"}
          alt="slider-2"
          quality={100}
          width={1000}
          height={500}
          className={`bg-center flex justify-center items-center absolute mt-24 lg:mt-2 lg:h-auto lg:w-full`}
        />
      ),
    },
    {
      sliderSection: (
        <Image
          src={"/illustrations/slider-3.webp"}
          alt="slider-3"
          quality={100}
          width={1000}
          height={500}
          className={`bg-center flex justify-center items-center absolute mt-24 lg:mt-2 lg:h-auto lg:w-full`}
        />
      ),
    },
  ];

  const cardProps = {
    items: heroSlider.map((item) => item.sliderSection),

    animationDuration: 1000,
    autoPlay: true,
    autoPlayInterval: 4000,
    infinite: true,
    activeIndex: activeIndex,
    disableButtonsControls: true,
    disableDotsControls: true,
    touchTracking: true,
    mouseTracking: true,
  };

  return isSlider ? (
    <div className="flex items-center justify-center">
      <AliceCarousel {...cardProps} onSlideChanged={sync} autoHeight />
      <button
        className="hidden lg:block absolute z-30 left-3 text-5xl text-primary-white lg:mt-16"
        onClick={slidePrev}
      >
        <LeftOutlined />
      </button>
      <button
        className="hidden lg:block absolute z-30 right-3 text-5xl text-primary-white lg:mt-20"
        onClick={slideNext}
      >
        <RightOutlined />
      </button>
    </div>
  ) : (
    <header
      className={`bg-center ${backgrounColor} flex justify-center items-center relative bg-fixed object-center bg-cover lg:w-full h-auto bg-no-repeat bg-blend-overlay`}
      style={{
        backgroundImage: `url(${heroImages})`,
      }}
    >
      <section
        className={`px-4 mx-auto w-full h-full ${
          blur ? "backdrop-blur-sm" : ""
        } text-center py-24 lg:py-52`}
      >
        <Reveal w="w-full" blur={blur}>
          <div className="flex items-center flex-col w-full">
            <div className="text-lg sm:text-xl md:text-4xl xl:text-5xl py-4 font-black text-primary-white leading-normal uppercase lg:pt-10 pt-40">
              {subTitle}
            </div>
            <h2 className="mb-8 text-lg md:text-3xl xl:text-4xl font-semibold text-primary-white">
              {heroTitle}
            </h2>
            <h1 className="mb-4 text-lg sm:text-xl md:font-medium lg:font-bold md:text-3xl lg:text-5xl text-primary-white relative bottom-4">
              {heroTitle2}
            </h1>
            <p className="text-lg md:text-3xl text-primary-white font-bold">{subTitle2}</p>
            <div className="flex flex-col text-2xl md:text-5xl text-primary-white absolute left-0 lg:left-24 bottom-0 gap-2 font-black">
              {heroTitleBottomRight}
              <div
                className={`border-2 border-primary-green w-36 ${
                  heroTitleBottomRight ? "block" : "hidden"
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
                <Button href="/auth/register" variant="filled" size="lg">
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
