import React from "react";
import { render } from "@testing-library/react";
import { Phone } from "./index";
import "@testing-library/jest-dom";

describe("Test Phone Icon", () => {
  it("Icon Should Defined", () => {
    const { getByTestId } = render(<Phone />);
    expect(getByTestId("phone-icon")).toBeDefined();
  });
});
