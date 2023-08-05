import React from "react";
import { render } from "@testing-library/react";
import { LazyLoading } from "./index";
import "@testing-library/jest-dom";

describe("Test Lazy Loading", () => {
  it("Loading Should Defined", () => {
    const { getByTestId } = render(<LazyLoading />);
    expect(getByTestId("loading-full")).toBeDefined();
  });
});
