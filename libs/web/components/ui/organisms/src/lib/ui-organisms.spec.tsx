import { render } from "@testing-library/react";

import UiOrganisms from "./ui-organisms";

describe("UiOrganisms", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UiOrganisms />);
    expect(baseElement).toBeTruthy();
  });
});
