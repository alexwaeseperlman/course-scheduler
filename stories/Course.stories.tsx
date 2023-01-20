import Course from "@components/Course";

import type { Meta, StoryObj } from "@storybook/react";
import { sampleCourses } from "./sampleData";

const meta: Meta<typeof Course> = {
  title: "components/Course",
  component: Course,
  tags: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Course>;

export const Primary: Story = {
  args: {
    course: sampleCourses[0],
    type: "card",
  },
};
export const Full: Story = {
  args: {
    course: sampleCourses[0],
    type: "full",
  },
};

export const Dense: Story = {
  args: {
    course: sampleCourses[0],
    type: "dense",
  },
};
