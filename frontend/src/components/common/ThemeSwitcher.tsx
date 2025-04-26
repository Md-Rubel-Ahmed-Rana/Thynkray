import { ContextProvider, IContext } from "@/context";
import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useContext } from "react";

const ThemeSwitcher = () => {
  const { handleChangeThemeMode, themeMode }: IContext =
    useContext(ContextProvider);

  const handleChangeTheme = () => {
    handleChangeThemeMode();
  };

  return (
    <IconButton
      style={{ marginRight: "5px" }}
      onClick={handleChangeTheme}
      color="inherit"
    >
      {themeMode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeSwitcher;
