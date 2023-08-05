import React from "react";
import { render } from "@testing-library/react";
import { HalfEllipseGreen } from "./index";
import "@testing-library/jest-dom";

describe("Test Half Ellipse Green Illustration", () => {
  it("Illustration Should Defined", () => {
    const { getByTestId } = render(<HalfEllipseGreen />);
    expect(getByTestId("half-ellipse-green")).toBeDefined();
  });
});
