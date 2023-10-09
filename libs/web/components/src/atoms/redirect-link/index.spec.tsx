import React from "react";
import { render } from "@testing-library/react";
import { RedirectLink } from "./index";
import "@testing-library/jest-dom";

describe("Test Redirect Link", () => {
  it("Redirect Link Should Defined", () => {
    const { getByTestId } = render(<RedirectLink link="/dashboard" />);
    expect(getByTestId("redirect-link")).toBeDefined();
  });
});
