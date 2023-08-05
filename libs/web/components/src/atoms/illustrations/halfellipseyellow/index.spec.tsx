import React from "react";
import { render } from "@testing-library/react";
import { HalfEllipseYellow } from "./index";
import "@testing-library/jest-dom";

describe("Test HalfEllipseYellow Illustration", () => {
  it("Illustration Should Defined", () => {
    const { getByTestId } = render(<HalfEllipseYellow />);
    expect(getByTestId("half-ellipse-yellow")).toBeDefined();
  });
});
