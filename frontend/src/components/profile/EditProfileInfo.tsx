import compareFieldsChanges from "@/utils/compareFieldsChanges";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const originalUser = {
  name: "Jane Doe",
  designation: "Senior Software Engineer",
  bio: "Passionate developer with a love for building scalable web applications. Tech enthusiast and coffee lover.",
};

const EditProfileInfo = ({ open, setOpen }: Props) => {
  const [isChanged, setIsChanged] = useState(false);
  const [user, setUser] = useState(originalUser);

  const handleChangeValues = (field: string, value: string) => {
    const newValues = { ...user, [field]: value };
    setUser(newValues);
    setIsChanged(compareFieldsChanges(originalUser, newValues));
  };

  const handleUpdateUserInfo = () => {
    console.log({
      updatedUser: user,
    });
  };

  return (
    <Modal
      aria-labelledby="Edit Profile"
      aria-describedby="edit your profile information"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      sx={{ padding: "0px" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid gray",
          borderRadius: "10px",
          boxShadow: 24,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography id="spring-modal-title" variant="h6" component="h2">
          Edit Profile info
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            id="name"
            defaultValue={user.name}
            label="Name"
            name="name"
            onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
            variant="outlined"
          />
          <TextField
            id="designation"
            name="designation"
            onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
            defaultValue={user.designation}
            label="Designation"
            variant="outlined"
          />
          <TextField
            onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
            id="bio"
            name="bio"
            defaultValue={user.bio}
            label="Bio"
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            type="button"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            disabled={!isChanged}
            size="small"
            type="button"
            onClick={handleUpdateUserInfo}
            variant="contained"
          >
            Save changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileInfo;
