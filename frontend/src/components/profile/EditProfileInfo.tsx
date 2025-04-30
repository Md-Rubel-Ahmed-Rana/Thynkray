import {
  Backdrop,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const EditProfileInfo = ({ open, setOpen }: Props) => {
  const user = {
    name: "Jane Doe",
    designation: "Senior Software Engineer",
    bio: "Passionate developer with a love for building scalable web applications. Tech enthusiast and coffee lover.",
  };
  const handleClose = () => setOpen(false);
  return (
    <Modal
      aria-labelledby="Edit Profile"
      aria-describedby="edit your profile information"
      open={open}
      onClose={handleClose}
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
            value={user.name}
            label="Name"
            variant="outlined"
          />
          <TextField
            id="designation"
            value={user.designation}
            label="Designation"
            variant="outlined"
          />
          <TextField id="bio" value={user.bio} label="Bio" variant="outlined" />
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
          <Button size="small" type="button" variant="contained">
            Save changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileInfo;
