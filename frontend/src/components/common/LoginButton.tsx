import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <Button onClick={() => signIn("google")} variant="contained">
      Sign in
    </Button>
  );
};

export default LoginButton;
