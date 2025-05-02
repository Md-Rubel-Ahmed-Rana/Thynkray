import { Box, Typography, useTheme } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

interface NoDataFoundProps {
  message?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  message = "No data found.",
  icon,
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      minHeight="300px"
      p={3}
      sx={{
        borderRadius: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box mb={2} color={theme.palette.text.secondary}>
        {icon || (
          <SentimentDissatisfiedIcon
            sx={{ fontSize: 64, color: theme.palette.text.disabled }}
          />
        )}
      </Box>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {message}
      </Typography>
      {children && <Box mt={2}>{children}</Box>}
    </Box>
  );
};

export default NoDataFound;
