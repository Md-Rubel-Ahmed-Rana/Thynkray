import { Answer } from "@/modules/discussion/types";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import AnswerActions from "./AnswerActions";
import { useState } from "react";
import AnswerEditForm from "./AnswerEditForm";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

type Props = {
  answer: Answer;
};

const AnswerCard = ({ answer }: Props) => {
  const { user } = useGetCurrentUser();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {isEdit ? (
        <AnswerEditForm answer={answer} setIsEdit={setIsEdit} />
      ) : (
        <Box
          sx={{
            borderBottom: "1px solid gray",
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            overflow="auto"
            component={"div"}
            dangerouslySetInnerHTML={{ __html: answer?.content || "" }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography color="textDisabled">
              By <b>{answer.user?.name}</b>
            </Typography>
            <Typography color="textDisabled">
              edited {moment(answer.updatedAt).format("MMM D, YYYY [at] H:mm")}
            </Typography>
            <Typography color="textDisabled">
              answered{" "}
              {moment(answer.createdAt).format("MMM D, YYYY [at] H:mm")}
            </Typography>
            {answer?.user?.id === user?.id && (
              <AnswerActions answer={answer} setIsEdit={setIsEdit} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default AnswerCard;
