import React from "react";
import { render } from "@testing-library/react";
import { TabJalurSeleksi } from ".";

import "@testing-library/jest-dom";
import type * as ReactDom from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual<typeof ReactDom>("react-dom"),
  preload: jest.fn(),
}));
describe("Test Tab Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("Should render correctly", () => {
    const { getByTestId, getAllByText } = render(<TabJalurSeleksi />);
    expect(getByTestId("Tab")).toBeInTheDocument();
    expect(getByTestId("Tab")).toHaveClass(
      "flex flex-col gap-6 lg:p-6 lg:w-7/12 xl:w-8/12 w-auto items-center",
    );

    expect(getAllByText("jalur seleksi pmb uninus")).toBeDefined();
  });

  it("cycles through buttonList on timer", () => {
    const { getByText } = render(<TabJalurSeleksi />);

    jest.advanceTimersByTime(9000);
    let activeText = getByText("SPA");
    expect(activeText).toBeInTheDocument();

    jest.advanceTimersByTime(9000);
    activeText = getByText("SPNA");
    expect(activeText).toBeInTheDocument();

    jest.advanceTimersByTime(9000);
    activeText = getByText("ST");
    expect(activeText).toBeInTheDocument();
  });

  it("shows display All Persyaratan Text", () => {
    const { getByTestId, getByText } = render(<TabJalurSeleksi />);
    const persyaratanText = getByTestId("content-text");
    expect(persyaratanText).toBeDefined();
    expect(getByText("Persyaratan")).toBeDefined();
    expect(persyaratanText).toHaveClass("flex flex-col justify-center gap-2 text-sm");
  });

  it("Should render persyaratan by content1", () => {
    const { getByTestId } = render(<TabJalurSeleksi />);
    expect(getByTestId("content-1")).toBeDefined();
  });

  it("Should render persyaratan by content2", () => {
    const { getByTestId } = render(<TabJalurSeleksi />);
    expect(getByTestId("content-2")).toBeDefined();
  });

  it("Should render persyaratan by content3", () => {
    const { getByTestId } = render(<TabJalurSeleksi />);
    expect(getByTestId("content-3")).toBeDefined();
  });
});
