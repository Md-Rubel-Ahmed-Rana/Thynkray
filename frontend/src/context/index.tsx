import { useLoginUser } from "@/modules/user/hooks";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";

export type IContext = {
  handleChangeThemeMode: () => void;
  themeMode: PaletteMode;
};

const context: IContext = {
  handleChangeThemeMode: () => {},
  themeMode: "light",
};

export const ContextProvider = createContext<IContext>(context);

type Props = {
  children: React.ReactNode;
};

const themeName = "thynkray-theme";

const ContextAPI = ({ children }: Props) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const handleChangeThemeMode = () => {
    const mode = themeMode === "light" ? "dark" : "light";
    setThemeMode(mode);
    localStorage.setItem(themeName, mode);
  };

  useEffect(() => {
    const rawTheme = localStorage.getItem(themeName);
    if (rawTheme) {
      setThemeMode(rawTheme as PaletteMode);
    }
  }, []);

  const values = {
    handleChangeThemeMode,
    themeMode,
  };

  useLoginUser();

  return (
    <ContextProvider.Provider value={values}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ContextProvider.Provider>
  );
};

export default ContextAPI;
