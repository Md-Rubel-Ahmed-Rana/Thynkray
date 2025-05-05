import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

type Props = {
  buttonText?: string;
  buttonSize?: "large" | "medium" | "small";
};

const LoginButton = ({
  buttonSize = "medium",
  buttonText = "Sign in",
}: Props) => {
  return (
    <Button
      size={buttonSize}
      onClick={() => signIn("google")}
      variant="contained"
    >
      {buttonText}
    </Button>
  );
};

export default LoginButton;
