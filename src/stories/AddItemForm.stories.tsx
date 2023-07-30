import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ItemForm } from "../ItemForm";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ItemForm> = {
  title: "Todolists/ItemForm",
  component: ItemForm,
  tags: ["autodocs"],
  argTypes: {
    addItem: {
      description: "Buuton clicked inside form ",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddItemFormStory: Story = {
  args: {
    addItem: action("button clicked iniside form"),
  },
};
