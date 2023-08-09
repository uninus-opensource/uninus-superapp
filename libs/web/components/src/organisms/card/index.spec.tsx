import React from "react";
import { render } from "@testing-library/react";
import { Card } from ".";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import "@testing-library/jest-dom";

describe("Test card functionally", () => {
  it("Should be Defined", () => {
    const { getByTestId } = render(<Card> children </Card>);
    mockAllIsIntersecting(true);
    expect(getByTestId("card")).toBeDefined();
  });

  it("Should have a valid cardTitle child when cardTitle was set", () => {
    const { getByTestId } = render(<Card cardTitle=" "> children </Card>);
    mockAllIsIntersecting(true);
    expect(getByTestId("card")).toBeDefined();
  });

  it("Should have a valid icon child when icon was set", () => {
    const { getByTestId } = render(<Card icon> children </Card>);
    mockAllIsIntersecting(true);
    expect(getByTestId("card")).toBeDefined();
  });

  it("Should have a valid iconText child when iconText was set", () => {
    const { getByTestId } = render(<Card iconText=" "> children </Card>);
    mockAllIsIntersecting(true);
    expect(getByTestId("card")).toBeDefined();
  });
});

describe("Test Card Style", () => {
  it("Should have a vaild className when height was set to h-auto", () => {
    const { getByTestId } = render(<Card> children </Card>);
    mockAllIsIntersecting(true);
    expect(getByTestId("card")).toHaveClass("h-auto");
  });

  it("Should have a vaild className when iconText was defined", () => {
    const { getByTestId } = render(<Card iconText=" "> children </Card>);
    mockAllIsIntersecting(true);
    expect(getByTestId("card-figure")).toHaveClass("text-3xl font-bold");
  });

  it("Should have a vaild className when icon was defined", () => {
    const { getByTestId } = render(<Card icon> children </Card>);
    mockAllIsIntersecting(true);
    expect(getByTestId("card-figure")).toHaveClass("text-5xl");
  });
});
