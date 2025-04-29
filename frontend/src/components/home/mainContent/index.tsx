import { Box, Grid } from "@mui/material";
import { cardData } from "@/constants/cardData";
import ContentCard from "./ContentCard";
import Categories from "../../common/Categories";
import SearchForm from "@/components/common/SearchForm";

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
        <Grid size={{ xs: 12, md: 4 }}>
          <ContentCard post={rightCard} index={2} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;
