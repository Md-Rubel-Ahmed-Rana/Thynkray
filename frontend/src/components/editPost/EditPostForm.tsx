/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, UpdatePost } from "@/modules/post/types";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Tags from "../create-post/Tags";
import Category from "../create-post/Category";
import ContentSections from "./ContentSections";
import { generatePostSlug } from "@/utils/generatePostSlug";
import makePostFormData from "@/utils/makePostFormData";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePost } from "@/modules/post/api";

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
  const queryClient = useQueryClient();
  const router = useRouter();
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

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["update-post", post.id],
    mutationFn: (data: FormData) => updatePost(post.id, data),
    onSuccess: () => {
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      router.back();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update the post."
      );
    },
  });

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
    mutate(formData);
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
