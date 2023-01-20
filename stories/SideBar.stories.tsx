import SideBar from "@components/SideBar";

import type { Meta, StoryObj } from "@storybook/react";
import { sampleCourses } from "./sampleData";

const meta: Meta<typeof SideBar> = {
  title: "components/SideBar",
  component: SideBar,
  tags: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SideBar>;

export const Primary: Story = {
  args: {
    courses: sampleCourses,
    constraints: [],
    school: "McGill",
  },
};
