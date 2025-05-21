import { List, ListItem, Typography } from "@mui/material";

const ChatList = () => {
  return (
    <List
      sx={{
        overflowY: "auto",
        maxHeight: "calc(100vh)",
        padding: "0",
      }}
    >
      {Array.from({ length: 100 }).map((_, index) => (
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "10px",
          }}
          key={index}
        >
          <Typography gutterBottom noWrap variant="h6">
            Chat Title {index + 1}
          </Typography>
          <Typography variant="body2">{new Date().toLocaleString()}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
