import AnimatedCursor from "react-animated-cursor";
import { useTheme } from "@mui/material/styles";

const CustomCursor = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const cursorColor = isDarkMode ? "255, 255, 255" : "50, 50, 70";

  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={20}
      showSystemCursor={true}
      color={cursorColor}
      outerAlpha={0.4}
      innerScale={1}
      outerScale={2}
      outerStyle={{
        border: `2px solid rgb(${cursorColor})`,
        backgroundColor: "transparent",
        zIndex: 9999,
      }}
      innerStyle={{
        backgroundColor: `rgb(${cursorColor})`,
        zIndex: 9999,
      }}
      clickables={[
        "a",
        "button",
        ".MuiButtonBase-root",
        'input[type="submit"]',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="button"]',
        "label",
        "select",
        "textarea",
      ]}
    />
  );
};

export default CustomCursor;
