import { Answer } from "@/modules/discussion/types";
import { Box, Typography } from "@mui/material";
import AnswerHeader from "./AnswerHeader";
import AnswerCard from "./AnswerCard";
import { useState } from "react";
import AnswerAddForm from "./AnswerAddForm";

type Props = {
  answers: Answer[];
};

const Answers = ({ answers }: Props) => {
  const [sortedAnswers, setSortedAnswers] = useState<Answer[]>(answers);
  return (
    <Box
      sx={{
        borderTop: "1px solid gray",
        mt: 4,
        pt: 3,
      }}
    >
      <AnswerHeader answers={answers} setSortedAnswers={setSortedAnswers} />
      {sortedAnswers.length <= 0 ? (
        <Typography variant="button">Nobody has answered yet.</Typography>
      ) : (
        <Box>
          {sortedAnswers.map((answer) => (
            <AnswerCard answer={answer} key={answer?.id} />
          ))}
        </Box>
      )}
      <AnswerAddForm />
    </Box>
  );
};

export default Answers;
