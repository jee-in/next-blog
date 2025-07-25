import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import LabelButton from "./LabelButton";

const meta: Meta<typeof LabelButton> = {
  title: "PostList/ListHeader/LabelButton",
  component: LabelButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "green", "rose", "gray"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

// --------------------------------------
// 1. args 기반 스토리 (문서화, 테스트용)
// --------------------------------------

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "React",
    checked: true,
    onToggle: () => {},
    color: "primary",
    size: "md",
  },
};

export const GrayUnchecked: Story = {
  args: {
    label: "Next.js",
    checked: false,
    onToggle: () => {},
    color: "gray",
    size: "md",
  },
};

// --------------------------------------
// 2. 커스텀 render 기반 스토리 (쇼케이스용)
// --------------------------------------

type LabelButtonProps = ComponentProps<typeof LabelButton>;

export const Showcase: StoryObj<LabelButtonProps> = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {["primary", "green", "rose", "gray"].map((color) => (
        <LabelButton
          key={color}
          {...args}
          color={color as LabelButtonProps["color"]}
          label={color}
        />
      ))}
    </div>
  ),
  args: {
    checked: true,
    onToggle: () => {},
    size: "md",
  },
};
