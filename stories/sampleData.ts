import {
  ConstraintType,
  CourseEntry,
  Schedule,
  Semester,
} from "@lib/course-solver";

export const sampleCourses: CourseEntry[] = [
  {
    constraints: [],
    info: {
      credits: 3,
      description:
        "Mathematics & Statistics (Sci) : Systems of linear equations, matrices, inverses, determinants; geometric vectors in three dimensions, dot product, cross product, lines and planes; introduction to vector spaces, linear dependence and independence, bases. Linear transformations. Eigenvalues and diagonalization.",
      name: "Linear Algebra and Geometry",
      school: "McGill University",
    },
    id: "mcgill-math-133",
    department: "MATH",
    code: 133,
  },
  {
    constraints: [
      {
        type: ConstraintType.PREREQ,
        course: "mcgill-comp-250",
        enabled: true,
        source: "mcgill-comp-252",
      },
      {
        type: ConstraintType.OR,
        enabled: true,
        source: "mcgill-comp-252",
        constraints: [
          {
            type: ConstraintType.PREREQ,
            course: "mcgill-math-235",
            enabled: true,
            source: "mcgill-comp-252",
          },
          {
            type: ConstraintType.PREREQ,
            course: "mcgill-math-240",
            enabled: true,
            source: "mcgill-comp-252",
          },
        ],
      },
    ],
    info: {
      credits: 3,
      description:
        "Informatique (Sci) : The design and analysis of data structures and algorithms. The description of various computational problems and the algorithms that can be used to solve them, along with their associated data structures. Proving the correctness of algorithms and determining their computational complexity.",
      name: "Honours Algorithms and Data Structures",
      school: "McGill University",
    },
    id: "mcgill-comp-252",
    department: "COMP",
    code: 252,
  },
];

export const sampleSemesters: Semester[] = [];

export const sampleSchedule: Schedule = {
  semesters: [],
};

for (let i = 2022; i <= 2025; i++) {
  sampleSemesters.push({
    id: `mcgill-fall-${i}`,
    school: "McGill University",
    semesterName: `Fall ${i}`,
  });
  sampleSemesters.push({
    id: `mcgill-winter-${i + 1}`,
    school: "McGill University",
    semesterName: `Winter ${i + 1}`,
  });
}

sampleSemesters.forEach((s) => {
  sampleSchedule.semesters.push({ semester: s.id, courses: [] });
});

sampleSchedule.semesters[0].courses.push(sampleCourses[0]);
sampleSchedule.semesters[0].courses.push(sampleCourses[1]);
