import React from "react";
import { render } from "@testing-library/react";
import { Navbar } from ".";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

import "@testing-library/jest-dom";
import type * as ReactDom from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual<typeof ReactDom>("react-dom"),
  preload: jest.fn(),
}));
describe("Test Navbar Componetn", () => {
  it("Should renders navbar correctly", () => {
    const { getByTestId } = render(<Navbar />);
    const navbar = getByTestId("navbarLanding");
    mockAllIsIntersecting(true);
    expect(navbar).toBeDefined();
  });

  it("Should Have a Login Button", () => {
    const { getAllByText } = render(<Navbar />);
    mockAllIsIntersecting(true);
    expect(getAllByText("Login")).toBeDefined();
  });
  it("Should Have a valid ClassName", () => {
    const { getByTestId } = render(<Navbar />);
    mockAllIsIntersecting(true);
    expect(getByTestId("navbarLanding")).toHaveClass(
      "z-40 px-8 lg:px-14 flex justify-between items-center h-[100px] lg:h-navbarlg text-grayscale-1 w-full bg-primary-green fixed top-0 leading-normal font-bold",
    );
  });
  it("should hidden on sm , Block on lg", () => {
    const { getByTestId } = render(<Navbar />);
    mockAllIsIntersecting(true);
    expect(getByTestId("navDesktop")).toHaveClass("hidden lg:block");
  });
});
