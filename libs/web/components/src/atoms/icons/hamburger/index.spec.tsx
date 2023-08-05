import React from "react";
import { render } from "@testing-library/react";
import { HamburgerIcon } from "./index";
import "@testing-library/jest-dom";

describe("Test Hamburger Icon", () => {
  it("Hamburger Icon Should defined", () => {
    const { getByTestId } = render(<HamburgerIcon />);
    expect(getByTestId("hamburger-icon")).toBeDefined();
  });

  it("Should have valid className when className was provided", () => {
    const { getByTestId } = render(<HamburgerIcon className="w-22 flex flex-col" />);
    expect(getByTestId("hamburger-icon")).toHaveClass("w-22 flex flex-col");
  });
});
