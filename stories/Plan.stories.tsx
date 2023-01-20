import Course from "@components/Course";
import Plan, { SchedulingContext } from "@components/Plan";
import CoursesProvider from "@components/state";
import { Schedule } from "@lib/course-solver";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { sampleCourses, sampleSchedule, sampleSemesters } from "./sampleData";

const meta: Meta<typeof Plan> = {
  title: "components/Plan",
  component: function Component(props) {
    const [plan, setPlan] = useState<Schedule>(props.plan);
    return (
      <CoursesProvider semesters={sampleSemesters} courses={sampleCourses}>
        <SchedulingContext plan={plan} setPlan={setPlan}>
          <Plan plan={plan} />
        </SchedulingContext>
      </CoursesProvider>
    );
  },
  tags: [],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Plan>;

export const Primary: Story = {
  args: {
    plan: sampleSchedule,
  },
};
