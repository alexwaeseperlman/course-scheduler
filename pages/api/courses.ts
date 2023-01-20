// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CourseEntry } from "@lib/course-solver";
import type { NextApiRequest, NextApiResponse } from "next";

import { sampleCourses } from "stories/sampleData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseEntry[]>
) {
  res.status(200).json(sampleCourses);
}
