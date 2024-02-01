import type { Meta, StoryObj } from "@storybook/react";

import { FieldText } from "./index";

const meta: Meta<typeof FieldText> = {
  component: FieldText,
  tags: ["autodocs"],
  title: "Components/Molecules/Forms/Fields/FieldText",
  argTypes: {
    required: {
      control: { type: "boolean" },
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
    type: {
      control: { type: "text" },
    },
    message: {
      control: { type: "text" },
    },
    hint: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldText>;

export const Primary: Story = {
  args: {
    size: "sm",
    required: false,
    label: "Nama Lengkap",
    status: "none",
    name: "nama",
    placeholder: "Nama Lengkap",
  },
};
