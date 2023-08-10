import React from "react";
import { render } from "@testing-library/react";
import { Email } from "./index";
import "@testing-library/jest-dom";

describe("Test Email Icon", () => {
  it("Icon Should Defined", () => {
    const { getByTestId } = render(<Email />);
    expect(getByTestId("email-icon")).toBeDefined();
  });
});
