/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import RichTextEditor from "../common/RichTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnswer } from "@/modules/answer/api";
import { toast } from "react-toastify";
import { Answer } from "@/modules/discussion/types";

type Props = {
  answer: Answer;
  setIsEdit: (value: boolean) => void;
};

const AnswerEditForm = ({ answer, setIsEdit }: Props) => {
  const [updatedAnswer, setUpdatedAnswer] = useState(answer?.content || "");
  const queryClient = useQueryClient();

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: () => updateAnswer(answer?.id, updatedAnswer),
    onSuccess: () => {
      toast.success("Answer edited successfully!");
      queryClient.invalidateQueries({
        queryKey: ["answers", "answers", "discussions", "discussion"],
      });
      setUpdatedAnswer("");
      setIsEdit(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update answer.");
    },
  });

  const handleUpdateAnswer = () => {
    mutate();
  };

  return (
    <Box border={1} borderColor={"gray"} mt={5} p={2} borderRadius={2}>
      <Typography variant="subtitle2" fontSize={20}>
        Edit answer
      </Typography>
      <RichTextEditor
        isDisabled={isUpdating}
        value={updatedAnswer}
        setValue={setUpdatedAnswer}
      />
      <Box mt={2} display={"flex"} gap={2} justifyContent={"flex-end"}>
        <Button
          disabled={isUpdating}
          onClick={() => setIsEdit(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          disabled={isUpdating}
          onClick={handleUpdateAnswer}
          variant="contained"
        >
          {isUpdating ? "Saving..." : "Save changes"}
        </Button>
      </Box>
    </Box>
  );
};

export default AnswerEditForm;
