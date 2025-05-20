import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import RichTextEditor from "../common/RichTextEditor";

const AnswerAddForm = () => {
  const [answer, setAnswer] = useState("");

  const handlePostAnswer = () => {
    console.log(answer);
  };

  return (
    <Box mt={5}>
      <Typography variant="subtitle2" fontSize={20}>
        Your answer
      </Typography>
      <RichTextEditor value={answer} setValue={setAnswer} />
      <Box mt={2} textAlign={"end"}>
        <Button onClick={handlePostAnswer} variant="contained">
          Post Your Answer
        </Button>
      </Box>
    </Box>
  );
};

export default AnswerAddForm;
