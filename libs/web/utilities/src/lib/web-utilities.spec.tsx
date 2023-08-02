import { render } from "@testing-library/react";

import WebUtilities from "./web-utilities";

describe("WebUtilities", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<WebUtilities />);
    expect(baseElement).toBeTruthy();
  });
});
