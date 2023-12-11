import type { Meta, StoryObj } from "@storybook/react";

import { FieldCheckbox } from "./index";

const meta: Meta<typeof FieldCheckbox> = {
  component: FieldCheckbox,
  tags: ["autodocs"],
  title: "Components/Molecules/Forms/Fields/FieldCheckbox",
  argTypes: {
    required: {
      control: { type: "boolean" },
    },

    text: {
      control: { type: "text" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    status: {
      options: ["none", "success", "warning", "error"],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    name: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldCheckbox>;

export const Primary: Story = {
  args: {
    size: "sm",
    required: false,
    label: "Setujui Syarat & Ketentuan",
    text: "Setuju",
    status: "none",
    name: "nama",
  },
};
