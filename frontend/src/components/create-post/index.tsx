/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import UploadThumbnail from "./UploadThumbnail";
import Sections from "./Sections";
import { useGetLoggedInUser } from "@/modules/user/hooks";
import Category from "./Category";
import Tags from "./Tags";
import { CreateNewPost, CreateSection } from "@/modules/post/types";
import { useCreatePostMutation } from "@/modules/post/hooks";
import { generatePostSlug } from "@/utils/generatePostSlug";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreatePost = () => {
  const router = useRouter();
  const { user } = useGetLoggedInUser();
  const { createPost, isLoading } = useCreatePostMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateNewPost>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      tags: [],
      thumbnail: "" as any,
      slug: "",
      authorId: "",
    },
    mode: "onChange",
  });

  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [content, setContent] = useState<CreateSection[]>([
    {
      title: "",
      images: [],
      description: "",
    },
  ]);

  const handleCreatePost = async (data: CreateNewPost) => {
    data.content = content;
    data.thumbnail = thumbnailImage as File;
    data.authorId = user?.id;
    data.slug = generatePostSlug(data);

    await createPost(data);
    router.push(
      `/dashboard?name=${user?.name}&email=${user?.email}&designation=${user?.designation}`
    );
    toast.success("Post created successfully!");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleCreatePost)}>
      <Typography
        sx={{ fontSize: { xs: "18px", md: "20px" } }}
        variant="h4"
        mb={2}
      >
        Create Post
      </Typography>

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        container
        spacing={2}
      >
        {/* title  */}
        <TextField
          size="small"
          label="Title"
          {...register("title", { required: "Title is required" })}
        />

        {errors.title && (
          <Typography color="error">{errors.title.message}</Typography>
        )}

        {/* category  */}
        <Category
          errors={errors}
          setValue={setValue}
          watch={watch}
          register={register}
        />

        <Tags errors={errors} setValue={setValue} watch={watch} />

        <TextField
          size="small"
          label="Description"
          {...register("description", { required: "Description is required" })}
        />

        {errors.description && (
          <Typography color="error">{errors.description.message}</Typography>
        )}

        <UploadThumbnail image={thumbnailImage} setImage={setThumbnailImage} />

        <Sections content={content} setContent={setContent} />
      </Grid>

      <Button
        sx={{ marginTop: "10px", width: "100%" }}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        loadingPosition="start"
        loadingIndicator
      >
        {isLoading ? "Creating..." : "Submit Post"}
      </Button>
    </Box>
  );
};

export default CreatePost;
