import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AnswerActions = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={{ xs: "100%", md: "auto" }}
    >
      <IconButton component="a" color="primary">
        <EditIcon />
      </IconButton>
      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default AnswerActions;
