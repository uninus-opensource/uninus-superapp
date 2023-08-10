import React from "react";
import { render } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { PopUp } from ".";
import "@testing-library/jest-dom";

describe("Test Pop Up functionally", () => {
  it("Should be Defined", () => {
    const { getByTestId } = render(<PopUp showPopUp> children </PopUp>);
    mockAllIsIntersecting(true);
    expect(getByTestId("popUp")).toBeDefined();
  });

  it("Should have a corect header child when header was set", () => {
    const { getByTestId } = render(
      <PopUp showPopUp header>
        children
      </PopUp>,
    );
    mockAllIsIntersecting(true);
    expect(getByTestId("popUp")).toBeDefined();
  });
});
