import React from "react";
import { render } from "@testing-library/react";
import { Accordion } from ".";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import "@testing-library/jest-dom";

describe("Test Accordion functionally", () => {
  it("Should be Defined", () => {
    const { getByTestId } = render(<Accordion title=" "> children </Accordion>);
    mockAllIsIntersecting(true);
    expect(getByTestId("accordion")).toBeDefined();
  });
});
