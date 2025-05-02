import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

type Props = {
  variant?: "outlined" | "contained" | "text";
  size?: "medium" | "small";
};

const LogoutButton = ({ size = "small", variant = "text" }: Props) => {
  return (
    <Button
      fullWidth
      size={size}
      onClick={() => signOut()}
      variant={variant}
      type="button"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
