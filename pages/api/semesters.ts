// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CourseEntry, Semester } from "@lib/course-solver";
import type { NextApiRequest, NextApiResponse } from "next";

import { sampleSemesters } from "stories/sampleData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Semester[]>
) {
  res.status(200).json(sampleSemesters);
}
