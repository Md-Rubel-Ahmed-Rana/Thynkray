import { CreateNewPost } from "@/modules/post/types";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

type Props = {
  errors: FieldErrors<CreateNewPost>;
  watch: UseFormWatch<CreateNewPost>;
  setValue: UseFormSetValue<CreateNewPost>;
};

const Tags = ({ errors, watch, setValue }: Props) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = async () => {
    if (tagInput.trim()) {
      const currentTags = watch("tags");
      setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    const currentTags = watch("tags");
    setValue(
      "tags",
      currentTags.filter((_, i) => i !== index)
    );
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          size="small"
          label="Add tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button variant="outlined" onClick={handleAddTag}>
          Add
        </Button>
      </Box>
      <Box mt={1} display="flex" gap={1} flexWrap="wrap">
        {watch("tags").map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleRemoveTag(index)}
          />
        ))}
      </Box>
      {errors.tags && (
        <Typography color="error">{errors.tags.message}</Typography>
      )}
    </Box>
  );
};

export default Tags;
