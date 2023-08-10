import React from "react";
import { render } from "@testing-library/react";
import { Rectangle } from "./index";
import "@testing-library/jest-dom";

describe("Test ArrowLine Illustration", () => {
  it("Illustration Should Defined", () => {
    const { getByTestId } = render(<Rectangle fill="" />);
    expect(getByTestId("rectangle")).toBeDefined();
  });

  it("Should have valid className when className was set to flex flex-col", () => {
    const { getByTestId } = render(<Rectangle fill="" className="flex flex-col" />);
    expect(getByTestId("rectangle")).toBeDefined();
    expect(getByTestId("rectangle")).toHaveClass("flex flex-col");
  });

  it("Should have valid className when className was set to bg-primary-green", () => {
    const { getByTestId } = render(<Rectangle fill="bg-primary-green"  />);
    expect(getByTestId("rectangle")).toBeDefined();
    expect(getByTestId("rectangle")).toHaveClass("bg-primary-green");
  });
});
