import { CourseConstraint, CourseEntry } from "@lib/course-solver";
import { Typography } from "@mui/joy";

export type ConstraintRowProps = {
  constraint: CourseConstraint;
  satisfied: boolean;
};

export function ConstraintRow(props: ConstraintRowProps) {
  return <Typography>Test</Typography>;
}

export default function ConstraintList(props: {
  constraints: ConstraintRowProps[];
}) {}
