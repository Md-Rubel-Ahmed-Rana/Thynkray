/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import RichTextEditor from "../common/RichTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewAnswer } from "@/modules/answer/type";
import { createAnswer } from "@/modules/answer/api";
import { toast } from "react-toastify";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useRouter } from "next/router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormValues = {
  content: string;
};

const AnswerAddForm = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const queryClient = useQueryClient();
  const { user } = useGetCurrentUser();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { content: "" },
  });

  const { mutate, isPending: isPosting } = useMutation({
    mutationFn: (data: NewAnswer) => createAnswer(data),
    onSuccess: () => {
      toast.success("Answer posted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["discussion", id],
      });
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to post answer.");
    },
  });

  const handleCreateAnswer: SubmitHandler<FormValues> = (data: FormValues) => {
    if (!id || !user?.id) return;
    mutate({ content: data.content.trim(), discussionId: id, userId: user.id });
  };

  return (
    <Box mt={5}>
      <Typography variant="subtitle2" fontSize={20}>
        Your answer
      </Typography>
      <form onSubmit={handleSubmit(handleCreateAnswer)}>
        <Controller
          control={control}
          name="content"
          rules={{
            validate: (val) => {
              const plainText = val.replace(/<[^>]*>?/gm, "").trim();
              return plainText.length > 0 || "Answer should not be empty";
            },
          }}
          render={({ field: { value, onChange }, fieldState }) => (
            <>
              <RichTextEditor
                value={value}
                setValue={onChange}
                isDisabled={isPosting}
              />
              {fieldState.error && (
                <Typography marginTop={1} color="error">
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Box mt={2} textAlign="end">
          <Button
            type="submit"
            disabled={isPosting || !isValid}
            variant="contained"
          >
            {isPosting ? "Posting..." : "Post Your Answer"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AnswerAddForm;
