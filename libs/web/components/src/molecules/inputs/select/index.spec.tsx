import React, { FC, ReactElement } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { SelectField } from "."; // Import your SelectField component
import { SELECT_STATUS } from "./enum";
import { useForm } from "react-hook-form";
import "@testing-library/jest-dom";

const SelectFieldWithControl: FC<{
  status?: string;
  size?: string;
}> = ({ status, size }): ReactElement => {
  const { control } = useForm({
    values: {
      testSelect: "",
    },
  });

  const props = {
    label: "Test Select",
    required: true,
    message: "Test message",
    control,

    size: "sm",
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
    ],
    placeholder: "Select an option",
    status,
  };

  return <SelectField {...props} name={"testSelect"} />;
};

describe("Test SelectField Component", () => {
  it("Should renders correctly ", () => {
    const { getByRole } = render(<SelectFieldWithControl />);
    const select = getByRole("select");
    expect(select).toBeInTheDocument();
  });
  it("Should Have valid className when status set to success", () => {
    const { getByRole } = render(<SelectFieldWithControl status={SELECT_STATUS.SUCCESS} />);
    const selectInput = getByRole("select");
    expect(selectInput).toHaveClass("border-green-300 bg-green-100 p-1.5 text-sm");
  });
  it("Should Have valid className when status set to warning", () => {
    const { getByRole } = render(<SelectFieldWithControl status={SELECT_STATUS.WARNING} />);
    const selectInput = getByRole("select");
    expect(selectInput).toHaveClass("border-amber-300 bg-amber-100 p-1.5 text-sm");
  });
  it("Should Have valid className when status set to error", () => {
    const { getByRole } = render(<SelectFieldWithControl status={SELECT_STATUS.ERROR} />);
    const selectInput = getByRole("select");
    expect(selectInput).toHaveClass("border-red-300 bg-red-100 p-1.5 text-sm");
  });
  it("Should Have valid className when status set to none", () => {
    const { getByRole } = render(<SelectFieldWithControl status={SELECT_STATUS.NONE} />);
    const selectInput = getByRole("select");
    expect(selectInput).toHaveClass("border-slate-300 bg-slate-2 p-1.5 text-sm");
  });
  describe("Test Message ClassName", () => {
    it("Should have valid message className based on status succes", () => {
      const { getByRole, getByText } = render(
        <SelectFieldWithControl status={SELECT_STATUS.SUCCESS} />,
      );
      const selectInput = getByRole("select");
      const message = getByText("Test message");
      fireEvent.click(selectInput);
      expect(message).toHaveClass("text-green-4");
    });
    it("Should have valid message className based on status warning", () => {
      const { getByRole, getByText } = render(
        <SelectFieldWithControl status={SELECT_STATUS.WARNING} />,
      );
      const selectInput = getByRole("select");
      const message = getByText("Test message");
      fireEvent.click(selectInput);
      expect(message).toHaveClass("text-amber-3");
    });
    it("Should have valid message className based on status error", () => {
      const { getByRole, getByText } = render(
        <SelectFieldWithControl status={SELECT_STATUS.ERROR} />,
      );
      const selectInput = getByRole("select");
      const message = getByText("Test message");
      fireEvent.click(selectInput);
      expect(message).toHaveClass("text-red-4");
    });
    it("Should have valid message className based on status none", () => {
      const { getByRole, getByText } = render(
        <SelectFieldWithControl status={SELECT_STATUS.NONE} />,
      );
      const selectInput = getByRole("select");
      const message = getByText("Test message");
      fireEvent.click(selectInput);
      expect(message).toHaveClass("text-slate-4");
    });
  });

  describe("Test Select Option ", () => {
    it("Should render options correctly", () => {
      const { getByRole, getByText } = render(<SelectFieldWithControl />);
      const selectInput = getByRole("select");
      fireEvent.click(selectInput);
      const option1 = getByText("Option 1");
      const option2 = getByText("Option 2");
      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
    });

    it("Should select an option", async () => {
      const { getByRole, getByText } = render(<SelectFieldWithControl />);
      const selectInput = getByRole("select");
      fireEvent.click(selectInput);
      const option1 = getByText("Option 1") as HTMLOptionElement;
      const option2 = getByText("Option 2") as HTMLOptionElement;
      fireEvent.click(option1);
      await waitFor(() => {
        expect(option1.selected).toBe(true);
        expect(option2.selected).toBe(false);
      });
    });

    it("Should display selected option in the input", async () => {
      const { getByRole, getByText } = render(<SelectFieldWithControl />);
      const selectInput = getByRole("select");
      fireEvent.click(selectInput);
      const option1 = getByText("Option 1");
      fireEvent.click(option1);
      await waitFor(() => {
        expect(selectInput).toHaveValue("Option 1");
      });
    });
  });
});
