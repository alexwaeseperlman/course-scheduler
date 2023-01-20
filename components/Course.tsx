import React from "react";

import { CSS } from "@dnd-kit/utilities";
import Card, { CardProps } from "@mui/joy/Card";
import { CourseEntry, CourseInfo } from "../lib/course-solver";
import {
  Box,
  BoxProps,
  CardContent,
  CardOverflow,
  Divider,
  Sheet,
  styled,
  Theme,
} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { ViewStream } from "@mui/icons-material";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";

const DenseCard = styled((props: CardProps) => (
  <Card
    sx={{
      my: 1,
    }}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row",
  flexGrow: 1,
  display: "flex",
  gap: 1.5,
  "--Card-padding": theme.spacing(1),
}));

export default function Course({
  course,
  type,
  handleProps,
  ...props
}: CardProps & {
  course: CourseEntry;
  handleProps?: BoxProps;
  type: "dense" | "card" | "full";
}) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: course.id,
      transition: {
        duration: 150, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  if (type == "dense") {
    return (
      <DenseCard
        component={(props) => (
          <Box ref={setNodeRef} {...attributes} {...props} id={course.id} />
        )}
        row
        variant="outlined"
        style={style}
        id={course.id}
        {...props}
      >
        <CardOverflow
          component={(props) => (
            <Box {...handleProps} {...listeners} {...props} />
          )}
          variant="solid"
          sx={{
            mr: 1,
            padding: 1,
            display: "flex",
            cursor: "move",
          }}
        >
          <ViewStream
            fontSize="small"
            sx={{
              textAlign: "center",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
        </CardOverflow>
        <Typography level="body3">{course.info.name}</Typography>
        <Divider
          orientation="vertical"
          sx={{
            mx: 1,
          }}
        ></Divider>
        <Typography level="body3">
          {course.department} {course.code}
        </Typography>
        <Divider orientation="vertical" sx={{ mx: 1 }}></Divider>
        <Typography level="body3">{course.info.credits} credits</Typography>
      </DenseCard>
    );
  }

  return (
    <Card variant="outlined" ref={setNodeRef} {...props}>
      <Typography level="h5">{course.info.name}</Typography>
      {type == "full" && (
        <Typography level="body2" mt={1}>
          {course.info.description}
        </Typography>
      )}
      <Divider sx={{ mt: 2 }} />
      <CardOverflow
        variant="soft"
        sx={{
          gap: 1.5,
          display: "flex",
          py: 1.5,
        }}
      >
        <Typography level="body2">{course.info.school}</Typography>
        <Divider orientation="vertical" />
        <Typography level="body2">
          {course.department} {course.code}
        </Typography>
        <Divider orientation="vertical" />

        <Typography level="body2">Credits: {course.info.credits}</Typography>
      </CardOverflow>
    </Card>
  );
}
