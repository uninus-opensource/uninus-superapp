import React from "react";
import { render } from "@testing-library/react";
import { XIcon } from "./index";
import "@testing-library/jest-dom";

describe("Test X Icon", () => {
  it("Icon Should Defined", () => {
    const { getByTestId } = render(<XIcon />);
    expect(getByTestId("x-icon")).toBeDefined();
  });
});
