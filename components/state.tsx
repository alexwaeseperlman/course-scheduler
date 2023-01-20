import { CourseEntry, Semester } from "@lib/course-solver";
import React from "react";

const Semesters = React.createContext<Semester[]>([]);
export const useSemesters = () => React.useContext<Semester[]>(Semesters);

const Courses = React.createContext<CourseEntry[]>([]);
export const useCourses = () => React.useContext<CourseEntry[]>(Courses);

type ActiveCourseType = [
  CourseEntry | undefined,
  React.Dispatch<CourseEntry | undefined>
];
const ActiveCourse = React.createContext<ActiveCourseType>([
  undefined,
  () => {},
]);
export const useActiveCourse = () =>
  React.useContext<ActiveCourseType>(ActiveCourse);

export default function CoursesProvider(
  props: React.PropsWithChildren<{
    semesters: Semester[];
    courses: CourseEntry[];
  }>
) {
  const activeCourseValue = React.useState<CourseEntry>();
  return (
    <Courses.Provider value={props.courses}>
      <Semesters.Provider value={props.semesters}>
        <ActiveCourse.Provider value={activeCourseValue}>
          {props.children}
        </ActiveCourse.Provider>
      </Semesters.Provider>
    </Courses.Provider>
  );
}
