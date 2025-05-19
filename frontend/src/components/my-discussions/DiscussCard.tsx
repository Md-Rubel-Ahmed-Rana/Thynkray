import { Discussion } from "@/modules/discussion/types";
import { Box, Typography, Chip, Stack, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

type Props = {
  discuss: Discussion;
};

const DiscussCard = ({ discuss }: Props) => {
  const { id, title, views, tags, totalAnswer } = discuss;

  return (
    <Box
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      p={2}
      mb={2}
      boxShadow={1}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Box flex="1">
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" />
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {views} views • {totalAnswer} answers
        </Typography>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={{ xs: "100%", md: "auto" }}
        mt={2}
      >
        <Link href={`/discussion/edit/${id}`} passHref>
          <IconButton component="a" color="primary">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DiscussCard;
