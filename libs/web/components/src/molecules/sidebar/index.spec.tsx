import React from "react";
import { render } from "@testing-library/react";
import { Sidebar } from ".";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import "@testing-library/jest-dom";

describe("Test Sidebar functionally", () => {
  it("Should be Defined", () => {
    const closeSideBarFn = jest.fn();
    const { getByTestId } = render(
      <Sidebar closeSidebar={closeSideBarFn} showSidebar>
        children
      </Sidebar>,
    );
    mockAllIsIntersecting(true);
    expect(getByTestId("sidebar-navbar")).toBeDefined();
    expect(getByTestId("sidebar-navbar")).toHaveClass("translate-x-0");
  });

  it("Should have a valid condition when showSideBar was set to false", () => {
    const closeSideBarFn = jest.fn();
    const { getByTestId } = render(
      <Sidebar closeSidebar={closeSideBarFn} showSidebar={false}>
        children
      </Sidebar>,
    );
    mockAllIsIntersecting(true);
    expect(getByTestId("sidebar-navbar")).toBeDefined();
    expect(getByTestId("sidebar-navbar")).toHaveClass("translate-x-full");
  });
});
