import React from "react";
import { render } from "@testing-library/react";
import { Ellipse } from "./index";
import "@testing-library/jest-dom";

describe("Test Ellipse Illustration", () => {
  it("Illustration Should Defined", () => {
    const { getByTestId } = render(<Ellipse />);
    expect(getByTestId("ellipse")).toBeDefined();
  });
});
