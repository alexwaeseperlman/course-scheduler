import NoSemesters from "@components/layout/NoSemesters";
import Plan, { SchedulingContext } from "@components/Plan";
import SideBar, { UNSCHEDULED_SEMESTER } from "@components/SideBar";
import CoursesProvider from "@components/state";
import { CourseEntry, Schedule, Semester } from "@lib/course-solver";
import { Box, styled } from "@mui/joy";
import type { NextPage } from "next";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/index.module.css";

const FixedSideContainer = styled(Box)(({ theme, width }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  overflow: "auto",
  padding: theme.spacing(2),
  borderRight: "1px solid",
  borderColor: theme.palette.divider,
}));

const Home: NextPage = () => {
  const sideBarWidth = 300;

  const [activeSchedule, setActiveSchedule] = useState<Schedule>({
    semesters: [{ courses: [], semester: UNSCHEDULED_SEMESTER.id }],
  });

  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const [semesterCount, setSemesterCount] = useState<number>(0);

  const scheduledCourses = activeSchedule.semesters.flatMap((s) => s.courses);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchSemesters = async () => {
      const response = await fetch("/api/semesters");
      const data = await response.json();
      setSemesters(data);
    };
    fetchSemesters();
  }, []);

  return (
    <React.StrictMode>
      <div className={styles.container}>
        <CoursesProvider
          courses={courses}
          semesters={[...semesters, UNSCHEDULED_SEMESTER]}
        >
          <SchedulingContext plan={activeSchedule} setPlan={setActiveSchedule}>
            <FixedSideContainer
              sx={{
                width: sideBarWidth,
              }}
            >
              <SideBar
                constraints={[]}
                courses={
                  activeSchedule.semesters.find(
                    (s) => s.semester == UNSCHEDULED_SEMESTER.id
                  )?.courses ?? []
                }
                schedule={activeSchedule}
                school={"McGill"}
                addCourse={(course) => {
                  if (scheduledCourses.find((c) => c.id == course.id)) return;
                  const newSchedule = { ...activeSchedule };
                  const semester = newSchedule.semesters.find(
                    (s) => s.semester == UNSCHEDULED_SEMESTER.id
                  );
                  if (semester) {
                    semester.courses.push(course);
                  }
                  setActiveSchedule(newSchedule);
                }}
                addSemester={(semester) => {
                  if (
                    activeSchedule.semesters.find(
                      (s) => s.semester == semester.id
                    )
                  )
                    return;
                  const newSchedule = { ...activeSchedule };
                  newSchedule.semesters.push({
                    semester: semester.id,
                    courses: [],
                  });
                  setActiveSchedule(newSchedule);
                }}
              ></SideBar>
            </FixedSideContainer>
            <Box
              sx={{
                left: sideBarWidth,
                right: 0,
                top: 0,
                bottom: 0,
                position: "fixed",
                p: 3,
              }}
            >
              <Plan
                plan={(() => {
                  const out = { semesters: [...activeSchedule.semesters] };
                  out.semesters.splice(
                    out.semesters.findIndex(
                      (s) => s.semester == UNSCHEDULED_SEMESTER.id
                    ),
                    1
                  );
                  return out;
                })()}
              ></Plan>
              {activeSchedule.semesters.length == 0 && (
                <NoSemesters></NoSemesters>
              )}
            </Box>
          </SchedulingContext>
        </CoursesProvider>
      </div>
    </React.StrictMode>
  );
};

export default Home;
