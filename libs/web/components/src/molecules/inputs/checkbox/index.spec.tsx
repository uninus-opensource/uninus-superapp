// CheckBox.test.tsx

import React, { FC, ReactElement } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { CheckBox } from "."; // Import your CheckBox component
import { useForm } from "react-hook-form";
import "@testing-library/jest-dom";

const CheckBoxWithControl: FC<{ variant?: string; size?: string }> = ({
  variant,
  size,
}): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      testCheckbox: "",
    },
  });

  const props = {
    label: "Test Checkbox",
    required: true,
    control,
    size,
    variant,
  };

  return <CheckBox {...props} name={"testCheckbox"} />;
};

describe("Test CheckBox Component", () => {
  it("Should renders correctly", () => {
    const { getByRole } = render(<CheckBoxWithControl />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("Should Have Label Test Checkbox", () => {
    const { getByRole, getByText } = render(<CheckBoxWithControl />);
    const checkbox = getByRole("checkbox");
    const checkboxText = getByText("Test Checkbox");
    expect(checkboxText).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("Should Have Attribute Name testCheckbox", () => {
    const { getByRole } = render(<CheckBoxWithControl />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "testCheckbox");
    expect(checkbox).not.toBeChecked();
  });

  it("Should Have valid className when variant set to primary", () => {
    const { getByRole } = render(<CheckBoxWithControl variant="primary" />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "testCheckbox");
    expect(checkbox).toHaveClass(
      "accent-primary-green focus:accent-sexondary-green-2 rounded-full text-primary-green focus:ring-0 ring-0 ring-primary-white",
    );
    expect(checkbox).not.toBeChecked();
  });

  it("Should Have valid className when variant set to error", () => {
    const { getByRole } = render(<CheckBoxWithControl variant="error" />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "testCheckbox");
    expect(checkbox).toHaveClass("accent-red-300 focus:accent-red-400");
    expect(checkbox).not.toBeChecked();
  });

  it("Should Have valid className when variant set to warning", () => {
    const { getByRole } = render(<CheckBoxWithControl variant="warning" />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "testCheckbox");
    expect(checkbox).toHaveClass("accent-yellow-300 focus:accent-yellow-400");
    expect(checkbox).not.toBeChecked();
  });


  it("Should triggers onChange correctly", async () => {
    const { getByRole } = render(<CheckBoxWithControl />);
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox).toBeChecked());
  });
});
