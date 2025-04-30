import { Backdrop, Box, Button, Modal, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const EditProfileInfo = ({ open, setOpen }: Props) => {
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
      <Box sx={style}>
        <Typography id="spring-modal-title" variant="h6" component="h2">
          Edit Profile info
        </Typography>
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button>Cancel</Button>
          <Button>Save changes</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileInfo;
