import type { Meta, StoryObj } from "@storybook/react";

import { InputText } from "./index";

const meta: Meta<typeof InputText> = {
  component: InputText,
  tags: ["autodocs"],
  title: "Components/Atoms/Forms/Input/InputText",
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    name: {
      control: { type: "text" },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Primary: Story = {
  args: {
    name: "nama",
    disabled: false,
    placeholder: "Masukkan Nama Anda",
  },
};
