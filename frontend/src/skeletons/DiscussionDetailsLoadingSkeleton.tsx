import { Box, Skeleton } from "@mui/material";

const getRandomSize = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DiscussionDetailsLoadingSkeleton = () => {
  return (
    <Box>
      {Array.from({ length: 30 }).map((_, index) => {
        const width = `${getRandomSize(40, 100)}%`;
        const height = getRandomSize(16, 32);
        return (
          <Skeleton
            key={index}
            variant="text"
            width={width}
            height={height}
            sx={{ marginBottom: 1 }}
          />
        );
      })}
    </Box>
  );
};

export default DiscussionDetailsLoadingSkeleton;
