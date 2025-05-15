import React, { useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import BlogCard from "../components/BlogCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "./BlogPage.module.css";
import image from "../data/kk.jpeg";
import { useMediaQuery } from "@mui/material";

function BlogPage() {
  const cards = [
    {
      id: "card1",
      title: "SECURE SOCKETS LAYER (SSL) VE TRANSPORT LAYER SECURITY (TLS)",
      content:
        "Günlük hayatta sıkça kullanılan ve kurumların işleyişinin bir parçası haline gelen internet ağları oldukça karmaşık yapılara sahiptir.",
      size: 6,
      image: image,
    },
    {
      id: "card2",
      title: "Rüzgar",
      content:
        "Rüzgara bırakmış kendini, derdi yakmış kalbini de yanmış ısıtmış kendini. Rüzgar almış yangını, ateş sarmış evi barkı, düşman kalmış arkada, atmış derdin' yangınlara.",
      size: 4,
    },
    {
      id: "card3",
      title: "Card 3",
      content: "This is the third card.",
      size: 8,
    },
    {
      id: "card4",
      title: "Card 4",
      content: "This is the fourth card.",
      size: 2,
    },
  ];

  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const truncatedContent = (content) => {
    return content.length > 60 ? content.slice(0, 60) + "..." : content;
  };

  return (
    <div
      className={`flex flex-col h-full w-[calc(100%-160px)] m-y-auto p-y-[20px] min-w-[400px] relative ${
        isSmallScreen ? "" : "ml-[160px]"
      } `}
    >
      <Box
        sx={{ flexGrow: 1 }}
        className="flex flex-col h-screen w-full items-center justify-center p-5"
      >
        <Grid container spacing={2} className={styles.gridContainer}>
          {cards.map((card, index) => (
            <Grid item xs={8} md={card.size} key={index}>
              <div md={card.size}>
                <BlogCard
                  img={
                    card.image ||
                    "https://images.pexels.com/photos/48794/boy-walking-teddy-bear-child-48794.jpeg?cs=srgb&dl=pexels-pixabay-48794.jpg&fm=jpg"
                  }
                  title={card.title}
                  content={truncatedContent(card.content)}
                ></BlogCard>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default BlogPage;
