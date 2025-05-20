/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import RichTextEditor from "../common/RichTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnswer } from "@/modules/answer/api";
import { toast } from "react-toastify";
import { Answer } from "@/modules/discussion/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

type Props = {
  answer: Answer;
  setIsEdit: (value: boolean) => void;
};

type FormValues = {
  content: string;
};

const AnswerEditForm = ({ answer, setIsEdit }: Props) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const id = query?.id as string;
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { content: answer?.content || "" },
  });

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (content: string) => updateAnswer(answer?.id, content),
    onSuccess: () => {
      toast.success("Answer edited successfully!");
      queryClient.invalidateQueries({
        queryKey: ["discussion", id],
      });
      setIsEdit(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update answer.");
    },
  });

  const handleUpdateAnswer: SubmitHandler<FormValues> = (data: FormValues) => {
    mutate(data.content.trim());
  };

  return (
    <Box border={1} borderColor={"gray"} mt={5} p={2} borderRadius={2}>
      <Typography variant="subtitle2" fontSize={20}>
        Edit answer
      </Typography>
      <form onSubmit={handleSubmit(handleUpdateAnswer)}>
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
                isDisabled={isUpdating}
              />
              {fieldState.error && (
                <Typography marginTop={1} color="error">
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Box mt={2} display={"flex"} gap={2} justifyContent={"flex-end"}>
          <Button
            disabled={isUpdating}
            onClick={() => setIsEdit(false)}
            variant="outlined"
            type="button"
          >
            Cancel
          </Button>
          <Button
            disabled={isUpdating || !isValid}
            variant="contained"
            type="submit"
          >
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AnswerEditForm;
