/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateDiscussion } from "@/modules/discussion/api";
import { Discussion, UpdateDiscussion } from "@/modules/discussion/types";
import { generateDiscussionSlug } from "@/utils/generateDiscussionSlug";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import RichTextEditor from "../common/RichTextEditor";

type Props = {
  discuss: Discussion;
};

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

const DiscussionEditForm = ({ discuss }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: discuss.title,
      description: discuss.description,
      tags: discuss.tags.join(", "),
    },
  });

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: UpdateDiscussion) => updateDiscussion(discuss?.id, data),
    onSuccess: () => {
      toast.success("Discussion updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      router.back();
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
    const payload: UpdateDiscussion = {
      title: data.title,
      description: data.description,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
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
      aria-disabled={isUpdating}
    >
      <Typography variant="h5">Update Discussion</Typography>

      <TextField
        label="Title"
        variant="outlined"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
        disabled={isUpdating}
      />

      <TextField
        label="Tags (comma separated)"
        variant="outlined"
        {...register("tags")}
        error={!!errors.tags}
        helperText={errors.tags?.message}
        fullWidth
        disabled={isUpdating}
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
        disabled={isUpdating}
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
        disabled={isUpdating}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
      >
        {isUpdating ? "Saving..." : "Save changes"}
      </Button>
    </Box>
  );
};

export default DiscussionEditForm;
