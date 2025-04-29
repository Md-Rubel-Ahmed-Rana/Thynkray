import { Grid } from "@mui/material";
import { User } from "@/modules/user/types";
import AuthorCard from "./AuthorCard";

type Props = {
  authors: Partial<User>[];
};

const Authors = ({ authors }: Props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 8, md: 12 }}
    >
      {authors.map((author) => (
        <Grid key={author?.id} size={{ xs: 2, sm: 4, md: 4 }}>
          <AuthorCard author={author} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Authors;
