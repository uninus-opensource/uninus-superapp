import { render } from "@testing-library/react";

import UiOraganisms from "./ui-oraganisms";

describe("UiOraganisms", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UiOraganisms />);
    expect(baseElement).toBeTruthy();
  });
});
