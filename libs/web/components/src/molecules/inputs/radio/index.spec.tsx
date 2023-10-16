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
    value: "value 1",
    defaultChecked: true,
  };

  return <RadioButton data-testid="radio-button" {...props} name={"testRadio"} />;
};

describe("Test RadioButton Component", () => {
  it("Should renders correctly", () => {
    const { getByTestId } = render(<RadioButtonWithControl />);
    const radioButtons = getByTestId("radio-button");
    expect(radioButtons).toBeDefined();
  });

  it("Should Have Label Test Radio", () => {
    const { getByText } = render(<RadioButtonWithControl />);
    const label = getByText("Test Radio");
    expect(label).toBeInTheDocument();
  });

  it("Should Have valid variant when variant set to primary", () => {
    const { getByTestId } = render(<RadioButtonWithControl variant="primary" />);
    const radioButtons = getByTestId("radio-button");
    expect(radioButtons).toHaveClass("checked:bg-primary-green");
  });

  it("Should triggers onChange correctly", async () => {
    const { getByTestId } = render(<RadioButtonWithControl />);
    const radioButtons = getByTestId("radio-button");
    fireEvent.click(radioButtons);
    await waitFor(() => expect(radioButtons).toBeChecked());
  });
});
