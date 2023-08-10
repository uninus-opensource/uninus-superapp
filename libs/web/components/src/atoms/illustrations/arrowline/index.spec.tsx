import React from "react";
import { render } from "@testing-library/react";
import { ArrowLine } from "./index";
import "@testing-library/jest-dom";

describe("Test ArrowLine Illustration", () => {
  it("Illustration Should Defined", () => {
    const { getByTestId } = render(<ArrowLine />);
    expect(getByTestId("arrow-line")).toBeDefined();
  });
});
