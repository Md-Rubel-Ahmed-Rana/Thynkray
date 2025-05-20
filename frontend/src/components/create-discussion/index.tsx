/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RichTextEditor from "../common/RichTextEditor";
import { NewDiscussion } from "@/modules/discussion/types";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { generateDiscussionSlug } from "@/utils/generateDiscussionSlug";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscussion } from "@/modules/discussion/api";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Minimum 5 characters"),
  description: Yup.string()
    .required("Content is required")
    .min(20, "Minimum 20 characters"),
  tags: Yup.string()
    .required("At least one tag is required")
    .test("min-tags", "Please provide at least one tag", (value) => {
      return value?.split(",").filter((tag) => tag.trim() !== "").length > 0;
    }),
});

const CreateDiscussion = () => {
  const queryClient = useQueryClient();
  const { user } = useGetCurrentUser();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  const { mutate, isPending: isAdding } = useMutation({
    mutationFn: (data: NewDiscussion) => createDiscussion(data),
    onSuccess: () => {
      toast.success("Discussion created successfully!");
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      router.push("/discussions");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create discussion."
      );
    },
  });

  const handleCreateDiscussion = async (data: {
    title: string;
    description: string;
    tags: string;
  }) => {
    const payload: NewDiscussion = {
      title: data.title,
      description: data.description,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      userId: user?.id as string,
      slug: generateDiscussionSlug(data.title),
    };
    mutate(payload);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleCreateDiscussion)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "100%",
      }}
      aria-disabled={isAdding}
    >
      <Typography variant="h5">Create Discussion</Typography>

      <TextField
        label="Title"
        variant="outlined"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
      />

      <TextField
        label="Tags (comma separated)"
        variant="outlined"
        {...register("tags")}
        error={!!errors.tags}
        helperText={errors.tags?.message}
        fullWidth
      />

      <Typography
        sx={{
          mb: -2,
        }}
      >
        Content:
      </Typography>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Box>
            <RichTextEditor value={field.value} setValue={field.onChange} />
            {errors.description && (
              <Typography variant="caption" color="error">
                {errors.description.message}
              </Typography>
            )}
          </Box>
        )}
      />

      <Button
        disabled={isAdding}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
      >
        {isAdding ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default CreateDiscussion;
