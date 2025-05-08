/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { EditPostFormData } from "./EditPostForm";
import { Add, Delete } from "@mui/icons-material";
import RichTextEditor from "../common/RichTextEditor";

type Props = {
  register: UseFormRegister<EditPostFormData>;
  control: Control<EditPostFormData, any, EditPostFormData>;
  watch: UseFormWatch<EditPostFormData>;
  setValue: UseFormSetValue<EditPostFormData>;
};

const ContentSections = ({ register, control, watch, setValue }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content",
  });

  const watchContent = watch("content");

  const handleImageAdd = (index: number, files: FileList) => {
    const current = watchContent[index].images || [];
    const updated = [...current, ...files];
    setValue(`content.${index}.images`, updated);
  };

  const handleImageRemove = (index: number, imgIndex: number) => {
    const current = watchContent[index].images || [];
    const updated = current.filter((_, i) => i !== imgIndex);
    setValue(`content.${index}.images`, updated);
  };

  const handleAddSectionDescription = (value: string, index: number) => {
    watchContent[index].description = value;
  };

  return (
    <Box mt={3}>
      <Typography variant="h6">Content Items</Typography>

      {fields.map((field, index) => (
        <Box key={field.id} sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register(`content.${index}.title` as const)}
          />
          <Typography variant="subtitle2">Images</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {watchContent?.[index]?.images?.map((img, imgIdx) => (
              <Box key={imgIdx} position="relative">
                <Box
                  component="img"
                  src={
                    typeof img === "string"
                      ? img
                      : URL.createObjectURL(img as File)
                  }
                  alt="content"
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleImageRemove(index, imgIdx)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "red",
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Button
            component="label"
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
          >
            Add Image
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                console.log(files);
                if (files) handleImageAdd(index, files);
              }}
            />
          </Button>

          <Box sx={{}}>
            <Typography>Description: </Typography>
            <RichTextEditor
              value={field?.description || ""}
              setValue={(val) => handleAddSectionDescription(val, index)}
            />
          </Box>

          <Button
            onClick={() => remove(index)}
            variant="outlined"
            size="small"
            color="error"
            sx={{
              mt: 2,
            }}
          >
            Remove Item
          </Button>
        </Box>
      ))}

      <Button
        startIcon={<Add />}
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            title: "",
            images: [],
            description: "",
          })
        }
        sx={{ mt: 2 }}
      >
        Add Content Item
      </Button>
    </Box>
  );
};

export default ContentSections;
