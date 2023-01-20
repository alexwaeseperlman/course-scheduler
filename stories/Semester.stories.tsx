import Course from "@components/Course";
import { SemesterSchedule } from "@components/Plan";

import type { Meta, StoryObj } from "@storybook/react";
import { sampleCourses, sampleSemesters } from "./sampleData";

const meta: Meta<typeof SemesterSchedule> = {
  title: "components/Semester",
  component: SemesterSchedule,
  tags: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SemesterSchedule>;

export const Primary: Story = {
  args: {
    courses: [],
    semester: sampleSemesters[0],
  },
};
