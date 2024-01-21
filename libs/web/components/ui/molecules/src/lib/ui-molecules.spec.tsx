import { render } from "@testing-library/react";

import UiMolecules from "./ui-molecules";

describe("UiMolecules", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UiMolecules />);
    expect(baseElement).toBeTruthy();
  });
});
