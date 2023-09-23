import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonComponent() {
  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ bgcolor: "gray", width: "200px" }}
        />
        <Skeleton
          variant="circular"
          animation="wave"
          sx={{ bgcolor: "gray", width: "40px", height: "40px" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: "gray", width: "200px", height: "60px" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: "gray", width: "200px", height: "60px" }}
        />
      </Box>
    </Box>
  );
}
