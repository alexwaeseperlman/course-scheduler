export type CourseID = string;
export type SemesterID = string;
export enum ConstraintType {
  PREREQ = "prerequsite",
  COREQ = "corequisite",
  SEMESTER = "semester",
  OR = "or",
}
// All constraints must be satisfied before a course is placed,
// and they are not allowed to be broken by placing a new course.
export type CourseConstraint = (
  | {
      type: ConstraintType.SEMESTER;
      semester: SemesterID;
    }
  | {
      type: ConstraintType.PREREQ | ConstraintType.COREQ;
      course: CourseID;
    }
  | {
      type: ConstraintType.OR;
      constraints: CourseConstraint[];
    }
) & { enabled: boolean; source: CourseID };

/*
	for example:
	{
		year: 2023,
		semesterID: 0
		semesterName: "Fall"
	}
*/
export type Semester = {
  id: SemesterID;
  school: string;
  semesterName: string;
};

export type CourseInfo = {
  school: string;
  name: string;
  description: string;
  credits: number;
};

export interface CourseEntry {
  constraints: CourseConstraint[];
  info: CourseInfo;
  id: CourseID;
  department: string;
  code: number;
}

export interface Schedule {
  semesters: { semester: SemesterID; courses: CourseEntry[] }[];
}

export interface CourseOffering {
  course: CourseID;
  semester: SemesterID;
  // If scheduled is false then we don't have confirmation
  // that this course is scheduled (we are predicting that
  // it will be offered this semester)
  scheduled: boolean;
}

export function getConstraints(plan: Schedule) {
  const constraints: CourseConstraint[] = [];
  plan.semesters.forEach((s) => {
    s.courses.forEach((course) => {
      constraints.push(...course.constraints);
    });
  });
}
