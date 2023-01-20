import {
  closestCenter,
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CourseEntry, Schedule, Semester } from "@lib/course-solver";
import {
  Box,
  Button,
  CardOverflow,
  Divider,
  Sheet,
  SheetProps,
  styled,
  Typography,
} from "@mui/joy";
import Card, { CardProps } from "@mui/joy/Card";
import { cloneDeep } from "lodash";
import React, { useMemo, useState } from "react";
import Course from "./Course";
import { useActiveCourse, useCourses, useSemesters } from "./state";

export function SemesterSchedule({
  semester,
  courses,
  // grey out the active course when dragging
  ...props
}: {
  semester: Semester;
  courses: CourseEntry[];
} & CardProps) {
  const { setNodeRef } = useDroppable({
    id: semester.id,
  });

  const activeCourse = useActiveCourse()[0];
  return (
    <Card variant="outlined" {...props}>
      <Typography level="h5">{semester.semesterName}</Typography>

      <Divider sx={{ mt: 2 }} />

      <SortableContext
        id={semester.id}
        items={courses.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          sx={{
            minHeight: "100px",
            flexGrow: 1,
          }}
          ref={setNodeRef}
        >
          {courses.map((course) => (
            <Course
              type="dense"
              course={course}
              key={course.id}
              id={course.id}
              sx={(theme) => ({
                ":after":
                  activeCourse?.id == course.id
                    ? {
                        content: `""`,
                        backgroundColor: "grey",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        borderRadius: theme.radius.sm,
                        opacity: "50%",
                      }
                    : undefined,
              })}
            />
          ))}
        </Box>
      </SortableContext>
    </Card>
  );
}

const Row = styled(Sheet)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

export function SchedulingContext({
  plan,
  setPlan,
  ...props
}: React.PropsWithChildren<{
  plan: Schedule;
  setPlan?: (plan: Schedule) => void;
}>) {
  const courses = useCourses();
  const [activeCourse, setActiveCourse] = useActiveCourse();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {props.children}
      <DragOverlay>
        {activeCourse && (
          <Course type="dense" course={activeCourse} key={activeCourse.id} />
        )}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragOverEvent) {
    if (event.active.id)
      setActiveCourse(courses.find((c) => c.id == event.active.id));
  }

  function handleDragOver(event: DragOverEvent) {
    let target = plan.semesters.find((s) => s.semester == event.over?.id);
    if (!target) {
      // check if hovering a course in a different semester
      const curSemester = plan.semesters.find(
        (s) => !!s.courses.find((course) => course.id == activeCourse?.id)
      );

      const hovSemester = plan.semesters.find(
        (s) => !!s.courses.find((course) => course.id == event.over?.id)
      );
      if (curSemester != hovSemester) target = hovSemester;
    }
    if (target && activeCourse) {
      const newPlan = cloneDeep(plan);
      // erase the active course from the active semester
      newPlan.semesters.forEach((s) => {
        const idx = s.courses.findIndex(
          (course) => course.id == activeCourse.id
        );
        if (idx > -1) s.courses.splice(idx, 1);
      });
      const newTarget = newPlan.semesters.find(
        (s) => s.semester == target?.semester
      ) as Schedule["semesters"][number];
      newTarget.courses.push(activeCourse);
      if (setPlan) setPlan(newPlan);
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveCourse(undefined);
    // update the position in the current semester
    const curSemester = plan.semesters.find(
      (s) => !!s.courses.find((course) => course.id == activeCourse?.id)
    );
    if (!curSemester || !activeCourse) return;
    const oldIndex = curSemester.courses.findIndex(
      (course) => course.id == activeCourse?.id
    );
    const newIndex = curSemester.courses.findIndex(
      (course) => course.id == event.over?.id
    );
    console.log(event, newIndex, oldIndex, curSemester);
    if (oldIndex < 0) return;
    const newPlan = cloneDeep(plan);
    const newSemester = newPlan.semesters.find(
      (s) => !!s.courses.find((course) => course.id == activeCourse?.id)
    );
    if (!newSemester) return;
    newSemester.courses.splice(oldIndex, 1);

    if (newIndex < 0) {
      newSemester.courses.push(activeCourse);
    } else {
      newSemester.courses.splice(newIndex, 0, activeCourse);
    }
    setPlan?.(newPlan);
  }
}

export default function Plan({
  plan,
  ...props
}: {
  plan: Schedule;
} & SheetProps) {
  const semesters = useSemesters();
  const [activeCourse, setActiveCourse] = useActiveCourse();
  const semestersSchedules = useMemo(
    () =>
      plan.semesters.map(({ semester, courses }) => {
        const sem = semesters.find((s) => s.id == semester);
        if (!sem) throw new Error(`No semester with id ${semester}.`);
        return (
          <SemesterSchedule
            sx={{
              width: "400px",
              margin: "10px",
            }}
            courses={courses}
            semester={sem}
            key={semester}
            id={semester}
          />
        );
      }),
    [activeCourse, semesters, plan]
  );

  return <Row {...props}>{semestersSchedules}</Row>;
}
