import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from "./index";
import "@testing-library/jest-dom";

describe("Test Button Functionality", () => {
  it("Should have onClick", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
  });

  it("Should have ignore onClick when disabled", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button disabled onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalledTimes(0);
  });

  it("Should have onClick when loading", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button loading onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
  });

  it("Should have role status when loading", () => {
    const onClickFn = jest.fn();
    const { getByTestId, getByRole } = render(<Button loading onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByRole("status")).toBeDefined();
  });

  it("Should have a link when href provided", () => {
    const onClickFn = jest.fn();
    const { getByRole, getByTestId } = render(
      <Button href={"https://www.test.com/"} as={"https://www.test.com/"} onClick={onClickFn} />,
    );
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByRole("link")).toHaveProperty("href", "https://www.test.com/");
  });

  it("Should have type submit when type set to submit", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button type="submit" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "submit");
  });

  it("Should have type button when type set to button", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button type="button" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "button");
  });

  it("Should have type reset when type set to reset", () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(<Button type="reset" onClick={onClickFn} />);
    fireEvent.click(getByTestId("button"));
    expect(onClickFn).toHaveBeenCalled();
    expect(getByTestId("button")).toHaveAttribute("type", "reset");
  });
});

describe("Test Button Style", () => {
  it("Should have lg:p-4 p-3 when size SM", () => {
    const { getByTestId } = render(<Button size="sm" />);
    expect(getByTestId("button")).toHaveClass("lg:p-4 p-3");
  });

  it("Should have p-5 when size MD", () => {
    const { getByTestId } = render(<Button size="md" />);
    expect(getByTestId("button")).toHaveClass("p-5");
  });

  it("Should have p-6 when size LG", () => {
    const { getByTestId } = render(<Button size="lg" />);
    expect(getByTestId("button")).toHaveClass("p-6");
  });

  it("Should have a valid className when variant set to elevated", () => {
    const { getByTestId } = render(<Button variant="elevated" />);
    expect(getByTestId("button")).toHaveClass(
      "bg-primary-green text-primary-white shadow-sm shadow-grayscale-6 hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-none active:scale-95",
    );
  });

  it("Should have a valid className when variant set to filled", () => {
    const { getByTestId } = render(<Button variant="filled" />);
    expect(getByTestId("button")).toHaveClass(
      "bg-primary-green text-primary-white hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-inset",
    );
  });

  it("Should have a valid className when variant set to filled-tonal", () => {
    const { getByTestId } = render(<Button variant="filled-tonal" />);
    expect(getByTestId("button")).toHaveClass(
      "bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5 active:shadow-inset",
    );
  });

  it("Should have a valid className when variant set to outlined", () => {
    const { getByTestId } = render(<Button variant="outlined" />);
    expect(getByTestId("button")).toHaveClass(
      "text-primary-white border-2 border-secondary-green-4",
    );
  });

  it("Should have a valid classNAme when variant is set to outlind-white", () => {
    const { getByTestId } = render(<Button variant="outlined-white" />);
    expect(getByTestId("button")).toHaveClass("text-primary-white border-2 border-primary-white");
  });

  it("Should have a valid className when variant set to text-icon", () => {
    const { getByTestId } = render(<Button variant="text-icon" />);
    expect(getByTestId("button")).toHaveClass(
      "text-secondary-green-4 hover:bg-secondary-sky-1 active:bg-secondary-sky-2",
    );
  });

  it("Should have a valid className when variant set to navlist", () => {
    const { getByTestId } = render(<Button variant="navlist" />);
    expect(getByTestId("button")).toHaveClass(
      "text-primary-white hover:text-slate-3 active:text-slate-4",
    );
  });

  it("Should have a valid className when variant set to float-bottom-right", () => {
    const { getByTestId } = render(<Button variant="float-bottom-right" />);
    expect(getByTestId("button")).toHaveClass(
      "fixed bottom-4 right-4 bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5",
    );
  });

  it("Should have a valid className when variant set to custom", () => {
    const { getByTestId } = render(<Button variant="custom" />);
    expect(getByTestId("button")).toHaveClass("active:shadow-inset");
  });

  it("Should have a valid className when variant set to sidebarlist", () => {
    const { getByTestId } = render(<Button variant="sidebarlist" />);
    expect(getByTestId("button")).toHaveClass(
      "flex items-center justify-between bg-none hover:bg-green-800 font-semibold hover:opacity-100",
    );
  });

  it("Should have a valid className when variant set to sidebarbutton", () => {
    const { getByTestId } = render(<Button variant="sidebarbutton" />);
    expect(getByTestId("button")).toHaveClass("text-primary-green font-normal");
  });

  it("Should have a valid className when variant set to green-outline", () => {
    const { getByTestId } = render(<Button variant="green-outline" />);
    expect(getByTestId("button")).toHaveClass(
      "bg-primary-white text-primary-green border border-primary-green  active:shadow-inset",
    );
  });

  it("Should have a valid className when loading was set", () => {
    const { getByTestId } = render(<Button loading />);
    expect(getByTestId("button")).toHaveClass("hover:cursor-wait");
  });

  it("Should have a valid className when uppercase was set", () => {
    const { getByTestId } = render(<Button uppercase />);
    expect(getByTestId("button")).toHaveClass("uppercase");
  });

  it("Should have a valid className when width was set to w-22", () => {
    const { getByTestId } = render(<Button width="w-22" />);
    expect(getByTestId("button")).toHaveClass("w-22");
  });

  it("Should have a valid className when height was set to h-22", () => {
    const { getByTestId } = render(<Button height="h-22" />);
    expect(getByTestId("button")).toHaveClass("h-22");
  });

  it("Should have a valid className when styling was set to flex flex-col", () => {
    const { getByTestId } = render(<Button styling="flex flex-col" />);
    expect(getByTestId("button")).toHaveClass("flex flex-col");
  });
});
