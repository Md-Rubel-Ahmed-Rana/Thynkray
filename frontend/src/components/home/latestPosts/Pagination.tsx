/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Box, Link } from "@mui/material";
import { useRouter } from "next/router";

const PaginationContainer = () => {
  const { query } = useRouter();
  const page = Number(query?.page);
  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 0px",
      }}
    >
      <Pagination
        page={page}
        count={10}
        renderItem={(item) => (
          <PaginationItem
            component={Link as any}
            to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default PaginationContainer;
