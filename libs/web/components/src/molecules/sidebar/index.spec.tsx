import React from "react";
import { render } from "@testing-library/react";
import { Sidebar } from ".";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import "@testing-library/jest-dom";
import type * as ReactDom from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual<typeof ReactDom>("react-dom"),
  preload: jest.fn(),
}));

describe("Test sidebar functionally", () => {
  it("Should be Defined", () => {
    const closeSidebarFn = jest.fn();
    const { getByTestId } = render(
      <Sidebar showSidebar closeSidebar={closeSidebarFn}>
        children
      </Sidebar>,
    );
    mockAllIsIntersecting(true);
    expect(getByTestId("sidebar-navbar")).toBeDefined();
    expect(getByTestId("sidebar-navbar")).toHaveClass("-translate-x-0 lg:-translate-x-full");
    expect(getByTestId("bg-sidebar-navbar")).toBeDefined();
    expect(getByTestId("bg-sidebar-navbar")).toHaveClass("-translate-x-0 lg:-translate-x-full");
  });

  it("Should be Defined when showSideBar is set to false", () => {
    const closeSidebarFn = jest.fn();
    const { getByTestId } = render(
      <Sidebar showSidebar={false} closeSidebar={closeSidebarFn}>
        children
      </Sidebar>,
    );
    mockAllIsIntersecting(true);
    expect(getByTestId("sidebar-navbar")).toBeDefined();
    expect(getByTestId("sidebar-navbar")).toHaveClass("-translate-x-full");
    expect(getByTestId("bg-sidebar-navbar")).toBeDefined();
    expect(getByTestId("bg-sidebar-navbar")).toHaveClass("-translate-x-full");
  });
});
