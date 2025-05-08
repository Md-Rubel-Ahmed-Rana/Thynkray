import { Box, Button, Typography } from "@mui/material";
import { CreateSection } from "@/modules/post/types";
import SectionForm from "./SectionForm";

const section = {
  id: "",
  title: "",
  images: [],
  description: "",
};

type Props = {
  content: CreateSection[];
  setContent: (content: CreateSection[]) => void;
};

const Sections = ({ content, setContent }: Props) => {
  const handleAddSection = () => {
    const updatedContent = [...content, section];
    setContent(updatedContent);
  };

  return (
    <Box>
      <Typography mb={2}>Content: </Typography>
      <Box
        sx={{
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {content.map((section, index) => (
          <SectionForm
            index={index}
            key={index}
            sections={content}
            setSections={setContent}
          />
        ))}
        <Button
          sx={{
            mt: 2,
          }}
          type="button"
          variant="outlined"
          onClick={handleAddSection}
        >
          Add Section
        </Button>
      </Box>
    </Box>
  );
};

export default Sections;
