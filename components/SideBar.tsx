import {
  CourseConstraint,
  CourseEntry,
  Schedule,
  Semester,
} from "@lib/course-solver";
import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { SemesterSchedule } from "./Plan";
import { useCourses, useSemesters } from "./state";

export type SideBarProps = {
  courses: CourseEntry[];
  schedule: Schedule;
  school: string;
  constraints: { constraint: CourseConstraint; satisfied: boolean }[];
  addCourse: (course: CourseEntry) => void;
  addSemester: (semester: Semester) => void;
};

export const UNSCHEDULED_SEMESTER: Semester = {
  id: "no-semester",
  school: "no-school",
  semesterName: "Unscheduled Courses",
};

export default function SideBar(props: SideBarProps) {
  const { addCourse, addSemester } = props;
  const semesters = useSemesters();
  const courses = useCourses();

  const [semesterInputValue, setSemesterInputValue] = useState<Semester | null>(
    null
  );
  const [courseInputValue, setCourseInputValue] = useState<CourseEntry | null>(
    null
  );

  const scheduledCourses = props.schedule.semesters.flatMap((s) => s.courses);
  return (
    <Box>
      <Typography level="h3">Course scheduler</Typography>
      <FormControl
        sx={{
          my: 1,
        }}
      >
        <FormLabel>Add course</FormLabel>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <Autocomplete
            options={courses.filter(
              (c) => !scheduledCourses.find((d) => d.id == c.id)
            )}
            onChange={(e, v) => setCourseInputValue(v)}
            getOptionLabel={(c) => `${c.department} ${c.code}`}
            sx={{
              flexGrow: 1,
            }}
          ></Autocomplete>
          <IconButton
            variant="soft"
            onClick={() => courseInputValue && addCourse(courseInputValue)}
          >
            <Add />
          </IconButton>
        </Box>
      </FormControl>

      <SemesterSchedule
        semester={UNSCHEDULED_SEMESTER}
        courses={props.courses}
      ></SemesterSchedule>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Autocomplete
          onChange={(e, v) => setSemesterInputValue(v)}
          sx={{ flexGrow: 1 }}
          options={semesters.filter(
            (s) => !props.schedule.semesters.find((t) => s.id == t.semester)
          )}
          getOptionLabel={(s) => s.semesterName}
        ></Autocomplete>
        <IconButton
          variant="soft"
          onClick={() => semesterInputValue && addSemester(semesterInputValue)}
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
}
