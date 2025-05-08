/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, UpdatePost } from "@/modules/post/types";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Tags from "../create-post/Tags";
import Category from "../create-post/Category";
import ContentSections from "./ContentSections";
import { generatePostSlug } from "@/utils/generatePostSlug";
import { useUpdatePost } from "@/modules/post/hooks";
import makePostFormData from "@/utils/makePostFormData";
import { useRouter } from "next/router";

type MixedImage = string | File;

export type EditPostFormData = Omit<
  Post,
  "slug" | "comments" | "author" | "createdAt"
> & {
  thumbnail: MixedImage | null;
  content: {
    title: string;
    images: MixedImage[];
    description: string;
  }[];
};

type Props = {
  post: Post;
};

const EditPostForm = ({ post }: Props) => {
  const router = useRouter();
  const { updatePost, isLoading } = useUpdatePost();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    typeof post.thumbnail === "string" ? post.thumbnail : null
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditPostFormData>({
    defaultValues: {
      ...post,
    },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      setValue("thumbnail", file as any);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdatePost = async (data: EditPostFormData) => {
    const updatedData: UpdatePost = {
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      thumbnail: data.thumbnail,
      authorId: post.author.id as string,
      slug: "",
      content: data.content.map((item) => ({
        id: item?.id || "",
        title: item.title,
        images: item.images,
        description: item.description,
      })),
    };
    updatedData.slug = generatePostSlug(updatedData);

    const formData = makePostFormData(updatedData);

    await updatePost(post.id, formData);

    router.back();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleUpdatePost)}
      sx={{ p: 2 }}
    >
      <Typography variant="h5" mb={2}>
        Edit Post
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <Box mt={2}>
        <Typography variant="subtitle1">Thumbnail</Typography>
        {thumbnailPreview && (
          <Box
            component="img"
            src={thumbnailPreview}
            alt="thumbnail"
            sx={{ width: 200, mt: 1 }}
          />
        )}
        <Stack direction="row" spacing={2} mt={1}>
          <Button variant="outlined" component="label">
            Change Thumbnail
            <input type="file" hidden onChange={handleThumbnailChange} />
          </Button>
        </Stack>
      </Box>

      <Box mt={2}>
        <Tags setValue={setValue} errors={errors} watch={watch} />
      </Box>
      <Box mt={4}>
        <Category
          setValue={setValue}
          errors={errors}
          watch={watch}
          register={register}
        />
      </Box>

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        {...register("description")}
      />

      <ContentSections
        control={control}
        register={register}
        setValue={setValue}
        watch={watch}
      />

      <Button
        disabled={isLoading}
        variant="contained"
        type="submit"
        sx={{ mt: 4 }}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
};

export default EditPostForm;
