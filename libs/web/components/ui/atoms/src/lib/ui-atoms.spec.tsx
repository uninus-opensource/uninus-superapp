import { render } from "@testing-library/react";

import UiAtoms from "./ui-atoms";

describe("UiAtoms", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UiAtoms />);
    expect(baseElement).toBeTruthy();
  });
});
