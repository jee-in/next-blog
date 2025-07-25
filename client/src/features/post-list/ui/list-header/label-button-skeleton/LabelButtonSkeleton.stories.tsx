import type { Meta, StoryObj } from "@storybook/react";
import LabelButtonSkeleton from "./LabelButtonSkeleton";

const meta: Meta<typeof LabelButtonSkeleton> = {
  title: "PostList/ListHeader/LabelButtonSkeleton",
  component: LabelButtonSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: "md",
  },
};
