import React, { useEffect, useState } from "react";
import { Grid, Grow, Typography } from "@material-ui/core";
import useStyles from "./styles.js";
import NewsCard from "./NewsCard/NewsCard.jsx";
import { useNavigate } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
const infoCards = [
  { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#1565c0",
    title: "News by Categories",
    info: "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Health news",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    info: "Climate change, Bitcoin, Natural disasters, Covid-19...",
    text: "What's up with Climate change",
  },
  {
    color: "#283593",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

const alanKey =
  "719a4db1bd22c5579a847170b8b532b62e956eca572e1d8b807a3e2338fdd0dc/stage";

export const NewsCards = ({ newsArticles, activeArticle }) => {
  // const [newsArticles, setNewsArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // alanBtn({
    //   key: alanKey,
    //   onCommand: ({ command, articles }) => {
    //     if (command === "newHeadlines") {
    //       console.log(articles);
    //       setNewsArticles(articles);
    //     }
    //   },
    // });
  }, [newsArticles]);
  const classes = useStyles();
  if (!newsArticles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h5" component="h5">
                  {infoCard.title}
                </Typography>
                {infoCard.info ? (
                  <Typography variant="h6" component="h6">
                    <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="h6" component="h6">
                  Try saying: <br /> <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {newsArticles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <NewsCard i={i} article={article} activeArticle={activeArticle} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};
