import React from "react";
import { render } from "@testing-library/react";
import { TableLoadingData } from "./index";
import "@testing-library/jest-dom";

describe("Test Loading Data Table", () => {
  it("Loading Data Table Should Defined", () => {
    const { getByTestId } = render(<TableLoadingData />);
    expect(getByTestId("load-table-data")).toBeDefined();
  });
});
