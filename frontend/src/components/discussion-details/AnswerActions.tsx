import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AnswerDeleteModal from "./AnswerDeleteModal";
import { Answer } from "@/modules/discussion/types";

type Props = {
  answer: Answer;
};

const AnswerActions = ({ answer }: Props) => {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={{ xs: "100%", md: "auto" }}
      >
        <IconButton component="a" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setIsDelete(true)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      <AnswerDeleteModal
        id={answer?.id}
        open={isDelete}
        setOpen={setIsDelete}
      />
    </>
  );
};

export default AnswerActions;
