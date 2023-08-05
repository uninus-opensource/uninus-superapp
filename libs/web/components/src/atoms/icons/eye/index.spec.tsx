import React from "react";
import { render } from "@testing-library/react";
import { EyeOpen, EyeSlash } from "./index";
import "@testing-library/jest-dom";

describe("Test Icon EyeOpen and EyeSlash", () => {
  it("Icon EyeOpen Should defined", () => {
    const { getByTestId } = render(<EyeOpen />);
    expect(getByTestId("eye-open")).toBeDefined();
  });

  it("Icon EyeClose Should defined", () => {
    const { getByTestId } = render(<EyeSlash />);
    expect(getByTestId("eye-slash")).toBeDefined();
  });
});
