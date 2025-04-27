import { Box, Grid } from "@mui/material";
import SearchContent from "./SearchContent";
import { cardData } from "@/constants/cardData";
import ContentCard from "./ContentCard";
import Categories from "./Categories";

const MainContent = () => {
  const firstRowCards = cardData.slice(0, 2);
  const leftCard = cardData[2];
  const middleCards = [cardData[3], cardData[4]];
  const rightCard = cardData[5];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "20px 0px",
      }}
    >
      {/* categories of posts  */}
      <Categories />
      {/* search posts  */}
      <SearchContent />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        {/* search posts  */}
        <SearchContent />
      </Box>

      {/* posts cards  */}
      <Grid container spacing={2} columns={12}>
        {firstRowCards.map((card, index: number) => {
          return (
            <Grid key={card?.id} size={{ xs: 12, md: 6 }}>
              <ContentCard post={card} index={index} />
            </Grid>
          );
        })}

        {/* left card  */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ContentCard post={leftCard} index={2} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {middleCards.map((card, index: number) => (
              <ContentCard key={card?.id} post={card} index={index + 3} />
            ))}
          </Box>
        </Grid>

        {/* right card  */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ContentCard post={rightCard} index={2} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;
