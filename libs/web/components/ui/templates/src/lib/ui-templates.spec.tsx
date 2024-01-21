import { render } from "@testing-library/react";

import UiTemplates from "./ui-templates";

describe("UiTemplates", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UiTemplates />);
    expect(baseElement).toBeTruthy();
  });
});
