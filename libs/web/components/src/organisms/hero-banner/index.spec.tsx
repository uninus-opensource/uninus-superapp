import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import "@testing-library/jest-dom";
import { HeroBanner } from ".";

function MockImage(props: any) {
  return React.createElement("img", props);
}

jest.mock("next/image", () => MockImage);

describe("Hero Banner Functionally", () => {
  it("Should be Defined", () => {
    const { getByTestId } = render(<HeroBanner />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-banner")).toHaveClass(
      "bg-center flex justify-center items-center relative bg-fixed object-center bg-cover lg:w-full h-auto bg-no-repeat bg-blend-overlay",
    );
  });

  it("Should be Defined when using heroTitle props", () => {
    const { getByTestId } = render(<HeroBanner heroTitle=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-title")).toHaveClass(
      "mb-8 text-lg md:text-3xl xl:text-4xl font-semibold text-primary-white",
    );
  });

  it("Should be Defined when using heroTitle2 props", () => {
    const { getByTestId } = render(<HeroBanner heroTitle2=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-title2")).toHaveClass(
      "mb-4 text-lg sm:text-xl md:font-medium lg:font-bold md:text-3xl lg:text-5xl text-primary-white relative bottom-4",
    );
  });

  it("Should be Defined when using heroTitleBottomRight props", () => {
    const { getByTestId } = render(<HeroBanner heroTitleBottomRight=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-title-bottom-right")).toHaveClass(
      "flex flex-col text-2xl md:text-5xl text-primary-white absolute left-0 lg:left-24 bottom-0 gap-2 font-black",
    );
  });

  it("Should be Defined when using heroImages props", () => {
    const { getByTestId } = render(<HeroBanner heroImages=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
  });

  it("Should be Defined when using backgroundColor props", () => {
    const { getByTestId } = render(<HeroBanner backgroundColor=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
  });

  it("Should be Defined when using subTitle props", () => {
    const { getByTestId } = render(<HeroBanner subTitle=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-subtitle")).toHaveClass(
      "text-lg sm:text-xl md:text-4xl xl:text-5xl py-4 font-black text-primary-white leading-normal uppercase lg:pt-10 pt-40",
    );
  });

  it("Should be Defined when using subTitle2 props", () => {
    const { getByTestId } = render(<HeroBanner subTitle2=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-subtitle2")).toHaveClass(
      "text-lg md:text-3xl text-primary-white font-bold",
    );
  });

  it("Should be Defined when using isDownload props", () => {
    const { getByTestId } = render(<HeroBanner isDownload />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-download")).toHaveClass("flex mt-12 gap-8");
  });

  it("Should be Defined when using blur props", () => {
    const { getByTestId } = render(<HeroBanner blur />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-banner")).toBeDefined();
    expect(getByTestId("hero-section-blur")).toHaveClass("backdrop-blur-sm");
  });
});

describe("Test Slider Functionally", () => {
  it("Should be Defined", () => {
    const { getByTestId } = render(<HeroBanner isSlider />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using heroTitle props", () => {
    const { getByTestId } = render(<HeroBanner isSlider heroTitle=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using heroTitle2 props", () => {
    const { getByTestId } = render(<HeroBanner isSlider heroTitle2=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using heroTitleBottomRight props", () => {
    const { getByTestId } = render(<HeroBanner isSlider heroTitleBottomRight=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using heroImages props", () => {
    const { getByTestId } = render(<HeroBanner isSlider heroImages=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using backgroundColor props", () => {
    const { getByTestId } = render(<HeroBanner isSlider backgroundColor=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using subTitle props", () => {
    const { getByTestId } = render(<HeroBanner isSlider subTitle=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using subTitle2 props", () => {
    const { getByTestId } = render(<HeroBanner isSlider subTitle2=" " />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using isDownload props", () => {
    const { getByTestId } = render(<HeroBanner isSlider isDownload />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should be Defined when using blur props", () => {
    const { getByTestId } = render(<HeroBanner isSlider blur />);
    mockAllIsIntersecting(true);
    expect(getByTestId("hero-slider")).toBeDefined();
  });

  it("Should have a prev & next buttons", () => {
    const onClickFn = jest.fn();
    const { getByRole } = render(<button onClick={onClickFn} />);
    fireEvent.click(getByRole("button"));
    expect(onClickFn).toHaveBeenCalled();
  });
});
