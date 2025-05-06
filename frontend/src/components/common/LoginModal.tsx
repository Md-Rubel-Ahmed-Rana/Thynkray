import { Backdrop, Box, Button, Modal, Typography } from "@mui/material";
import LoginButton from "./LoginButton";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const LoginModal = ({ open, setOpen }: Props) => {
  return (
    <Modal
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography id="login-modal-title" variant="h6" component="h2">
          Login to leave a comment
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <LoginButton buttonText="Login Now" />
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
