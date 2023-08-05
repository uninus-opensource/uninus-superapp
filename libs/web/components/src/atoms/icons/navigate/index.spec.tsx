import React from "react";
import { render } from "@testing-library/react";
import { Navigate } from "./index";
import "@testing-library/jest-dom";

describe("Test Navigate Icon", () => {
  it("Icon Should Defined", () => {
    const { getByTestId } = render(<Navigate />);
    expect(getByTestId("navigate-icon")).toBeDefined();
  });
});
