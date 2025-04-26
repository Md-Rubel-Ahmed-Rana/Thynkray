import AnimatedCursor from "react-animated-cursor";

const CustomCursor = () => {
  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={20}
      showSystemCursor={true}
      color="50, 50, 70"
      outerAlpha={0.4}
      innerScale={1}
      outerScale={2}
      outerStyle={{
        border: "2px solid #323246",
        backgroundColor: "transparent",
      }}
      innerStyle={{
        backgroundColor: "#323246",
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
