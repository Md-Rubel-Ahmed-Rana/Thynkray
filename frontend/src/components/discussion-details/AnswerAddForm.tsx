/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import RichTextEditor from "../common/RichTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewAnswer } from "@/modules/answer/type";
import { createAnswer } from "@/modules/answer/api";
import { toast } from "react-toastify";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useRouter } from "next/router";

const AnswerAddForm = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const [answer, setAnswer] = useState("");
  const queryClient = useQueryClient();
  const { user } = useGetCurrentUser();

  const { mutate, isPending: isPosting } = useMutation({
    mutationFn: (data: NewAnswer) => createAnswer(data),
    onSuccess: () => {
      toast.success("Answer posted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["answers", "answers", "discussions", "discussion"],
      });
      setAnswer("");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to post answer.");
    },
  });

  const handlePostAnswer = () => {
    mutate({ content: answer, discussionId: id, userId: user?.id });
  };

  return (
    <Box mt={5}>
      <Typography variant="subtitle2" fontSize={20}>
        Your answer
      </Typography>
      <RichTextEditor
        isDisabled={isPosting}
        value={answer}
        setValue={setAnswer}
      />
      <Box mt={2} textAlign={"end"}>
        <Button
          disabled={isPosting}
          onClick={handlePostAnswer}
          variant="contained"
        >
          {isPosting ? "Posting..." : "Post Your Answer"}
        </Button>
      </Box>
    </Box>
  );
};

export default AnswerAddForm;
