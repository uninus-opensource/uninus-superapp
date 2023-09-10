import React from "react";
import { render } from "@testing-library/react";
import { LoadingSpinner } from "./index";
import "@testing-library/jest-dom";

describe("Test Loading Spinner", () => {
  it("Loading Spinner Should Defined", () => {
    const { getByRole } = render(<LoadingSpinner />);
    expect(getByRole("status")).toBeDefined();
  });
});
