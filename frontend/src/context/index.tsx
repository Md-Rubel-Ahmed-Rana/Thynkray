import { getCurrentUser, userLogin } from "@/modules/user/api";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export type IContext = {
  handleChangeThemeMode: () => void;
  themeMode: PaletteMode;
  aiResponse: string;
  setAiResponse: React.Dispatch<React.SetStateAction<string>>;
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
};

const context: IContext = {
  handleChangeThemeMode: () => {},
  themeMode: "light",
  aiResponse: "",
  setAiResponse: () => {},
  question: "",
  setQuestion: () => {},
};

export const ContextProvider = createContext<IContext>(context);

type Props = {
  children: ReactNode;
};

const themeName = "thynkray-theme";

const ContextAPI = ({ children }: Props) => {
  const [aiResponse, setAiResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const { data: session, status } = useSession();
  const hasLoggedIn = useRef(false);

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", session?.user?.email as string],
    queryFn: getCurrentUser,
    enabled: !!session?.user?.email,
  });

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user &&
      !hasLoggedIn.current &&
      !isUserLoading &&
      !user?.id
    ) {
      const email = session.user.email as string;
      const name = session.user.name as string;
      const profile_image = session.user.image as string;
      userLogin({ name, email, profile_image });
      hasLoggedIn.current = true;
    }
  }, [session?.user, status, user?.id, isUserLoading]);

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
    aiResponse,
    setAiResponse,
    question,
    setQuestion,
  };

  return (
    <ContextProvider.Provider value={values}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ContextProvider.Provider>
  );
};

export default ContextAPI;
