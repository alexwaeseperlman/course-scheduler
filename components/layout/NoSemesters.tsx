import { Box, Typography } from "@mui/joy";

export default function NoSemesters() {
  return (
    <Box
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography level="h5">No semesters</Typography>
        <Typography level="body1">Add a semester to get started</Typography>
      </Box>
    </Box>
  );
}
