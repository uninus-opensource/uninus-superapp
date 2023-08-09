import React from "react";
import { render } from "@testing-library/react";
import { Reveal } from ".";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import "@testing-library/jest-dom";

describe("Test Reveal functionally", () => {
  it("Should be Defined", () => {
    const { getByTestId } = render(<Reveal> children </Reveal>);
    mockAllIsIntersecting(true);
    expect(getByTestId("reveal")).toBeDefined();
  });
});

describe("Test Reveal Style", () => {
  it("Should have a valid className when w was set to w-fit", () => {
    const { getByTestId } = render(<Reveal w="w-fit"> children </Reveal>);
    mockAllIsIntersecting(true);
    expect(getByTestId("reveal")).toHaveClass("w-fit");
  });

  it("Should have a valid className when w was set to w-full", () => {
    const { getByTestId } = render(<Reveal w="w-full"> children </Reveal>);
    mockAllIsIntersecting(true);
    expect(getByTestId("reveal")).toHaveClass("w-full");
  });

  it("Should have a valid className when blur was set", () => {
    const { getByTestId } = render(<Reveal blur> children </Reveal>);
    mockAllIsIntersecting(true);
    expect(getByTestId("reveal")).toHaveClass("backdrop-blur-sm");
  });
});
