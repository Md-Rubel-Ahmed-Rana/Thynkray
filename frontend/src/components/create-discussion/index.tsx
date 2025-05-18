import { Box, TextField, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RichTextEditor from "../common/RichTextEditor";
import { useGetLoggedInUser } from "@/modules/user/hooks";
import { NewDiscussion } from "@/modules/discussion/types";
import { useAddNewDiscussion } from "@/modules/discussion/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Minimum 5 characters"),
  description: Yup.string()
    .required("Content is required")
    .min(20, "Minimum 20 characters"),
});

const CreateDiscussion = () => {
  const { user } = useGetLoggedInUser();
  const router = useRouter();
  const { addDiscussion, isAdding, response } = useAddNewDiscussion();
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
    },
  });

  const handleCreateDiscussion = async (data: {
    title: string;
    description: string;
  }) => {
    const payload: NewDiscussion = {
      title: data.title,
      description: data.description,
      userId: user?.id,
    };
    await addDiscussion(payload);

    if (response?.statusCode === 201) {
      toast.success(response?.message || "Discussion created successfully!");
      router.push("/discussions");
    } else {
      toast.error(
        response?.error.message ||
          response?.error.data?.message ||
          response?.data?.error?.message ||
          "Failed to created discussion!"
      );
    }
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
