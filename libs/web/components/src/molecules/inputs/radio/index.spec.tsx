// Radio.test.tsx

import React, { FC, ReactElement } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { RadioButton } from "."; // Import your RadioButton component
import { useForm } from "react-hook-form";
import "@testing-library/jest-dom";

const RadioButtonWithControl: FC<{
  variant?: string;
  size?: string;
}> = ({ variant, size }): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      testRadio: "",
    },
  });

  const props = {
    fieldName: "Test Radio",
    required: true,
    control,
    size,
    variant,
    options: [
      { value: "option1", name: "Option 1" },
      { value: "option2", name: "Option 2" },
      // Add more options if needed
    ],
  };

  return <RadioButton {...props} name={"testRadio"} />;
};

describe("Test RadioButton Component", () => {
  it("Should renders correctly", () => {
    const { getAllByRole } = render(<RadioButtonWithControl />);
    const radioButtons = getAllByRole("radio");
    expect(radioButtons.length).toBe(2); // Adjust the count based on the number of options
    radioButtons.forEach((radioButton) => {
      expect(radioButton).toBeInTheDocument();
      expect(radioButton).not.toBeChecked();
    });
  });

  it("Should Have Label Test Radio", () => {
    const { getByText } = render(<RadioButtonWithControl />);
    const label = getByText("Test Radio");
    expect(label).toBeInTheDocument();
  });

  it("Should Have valid className when variant set to primary", () => {
    const { getAllByRole } = render(<RadioButtonWithControl variant="primary" />);
    const radioButtons = getAllByRole("radio");
    radioButtons.forEach((radioButton) => {
      expect(radioButton).toHaveClass("checked:bg-primary-green");
    });
  });

  it("Should triggers onChange correctly", async () => {
    const { getAllByRole } = render(<RadioButtonWithControl />);
    const radioButtons = getAllByRole("radio");
    fireEvent.click(radioButtons[0]);
    await waitFor(() => expect(radioButtons[0]).toBeChecked());
  });
});
