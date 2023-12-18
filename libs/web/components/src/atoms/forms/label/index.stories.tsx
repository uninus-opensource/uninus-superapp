import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./index";

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ["autodocs"],
  title: "Components/Atoms/Forms/Label",
  argTypes: {
    required: {
      control: { type: "boolean" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    size: "sm",
    children: "Nama Lengkap",
  },
};
