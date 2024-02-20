import type { Meta, StoryObj } from "@storybook/react";

import { Buttons } from "./index";

const meta: Meta<typeof Buttons> = {
  component: Buttons,
  tags: ["autodocs"],
  title: "Components/Atoms/Forms/Button",
  argTypes: {
    variant: {
      options: ["primary", "secondary", "error", "cancel", "warning", "success"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Buttons>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Button",
    isLoading: false,
  },
};
