import { Box, Grid } from "@mui/material";
import ContentCard from "./ContentCard";
import Categories from "../../common/Categories";
import SearchForm from "@/components/common/SearchForm";
import { useGetLatestPosts } from "@/modules/post/hooks";
import CommonPostLoadingSkeleton from "@/skeletons/CommonPostLoadingSkeleton";

const MainContent = () => {
  const { isLoading, posts } = useGetLatestPosts(6);
  const firstRowCards = posts.slice(0, 2);
  const leftCard = posts[2];
  const middleCards = [posts[3], posts[4]];
  const rightCard = posts[5];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginTop: "50px",
      }}
    >
      {/* SearchContent  and categories */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <Categories />
        </Box>
        {/* search posts  */}
        <Box sx={{ width: { xs: "100%", md: "25%" } }}>
          <SearchForm />
        </Box>
      </Box>

      {isLoading ? (
        <CommonPostLoadingSkeleton />
      ) : (
        <Grid container spacing={2} columns={12}>
          {firstRowCards.map((card, index: number) => {
            return (
              <Grid key={card?.id} size={{ xs: 12, md: 6 }}>
                <ContentCard post={card} index={index} key={card?.id} />
              </Grid>
            );
          })}

          {/* left card  */}
          <Grid key={Math.random()} size={{ xs: 12, md: 4 }}>
            <ContentCard key={leftCard?.id} post={leftCard} index={2} />
          </Grid>

          {/* middle two cards  */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "500px",
              }}
            >
              {middleCards.map((card, index: number) => (
                <ContentCard
                  key={card?.id}
                  post={card}
                  index={index + 3}
                  shouldShowThumbnail={false}
                />
              ))}
            </Box>
          </Grid>

          {/* right card  */}
          <Grid key={rightCard?.id} size={{ xs: 12, md: 4 }}>
            <ContentCard key={rightCard?.id} post={rightCard} index={2} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MainContent;
