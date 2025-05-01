/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, TextField, Typography } from "@mui/material";
import UploadSectionImages from "./UploadSectionImages";
import RichTextEditor from "../common/RichTextEditor";
import { CreateSection } from "@/modules/post/types";

type Props = {
  index: number;
  sections: CreateSection[];
  setSections: (sections: CreateSection[]) => void;
};

const SectionForm = ({ index, sections, setSections }: Props) => {
  const section = sections[index];

  const updateSection = (field: keyof CreateSection, value: any) => {
    const updated = [...sections];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setSections(updated);
  };

  const handleRemoveSection = () => {
    const updated = sections.filter((_, idx) => idx !== index);
    setSections(updated);
  };

  return (
    <Box
      sx={{
        border: "1px solid gray",
        p: 2,
        mt: 2,
        borderRadius: 2,
      }}
    >
      <Typography mb={2}>Section {index + 1}</Typography>

      <TextField
        fullWidth
        size="small"
        label="Title"
        name="title"
        value={section?.title || ""}
        onChange={(e) => updateSection("title", e.target.value)}
        sx={{ mb: 2 }}
      />

      <UploadSectionImages
        images={section?.images || []}
        setImages={(files) => updateSection("images", files)}
      />

      <RichTextEditor
        value={section?.description || ""}
        setValue={(val) => updateSection("description", val)}
      />

      <Button
        type="button"
        variant="outlined"
        color="warning"
        size="small"
        sx={{ mt: 2 }}
        onClick={handleRemoveSection}
      >
        Remove
      </Button>
    </Box>
  );
};

export default SectionForm;
