import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Shimmer from "../components/Shimmer";
import { NewsAPI } from "../config/api";

function News() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const cachedNews = localStorage.getItem("cachedNews");
      const cachedTimestamp = localStorage.getItem("cachedTimestamp");
      const currentTimestamp = new Date().getTime();

      if (
        cachedNews &&
        cachedTimestamp &&
        currentTimestamp - parseInt(cachedTimestamp) < 300000
      ) {
        // 5 min = 3L msec
        setNews(JSON.parse(cachedNews));
      } else {
        const data = await axios.get(
          NewsAPI
        );
        const json = await data.data.results;
        setNews(json);
        localStorage.setItem("cachedNews", JSON.stringify(json));
        localStorage.setItem("cachedTimestamp", currentTimestamp.toString());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!news) {
      fetchNews();
    }
  }, [news]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {loading ? (
          <Shimmer />
        ) : (
          news &&
          news.map((item) => <NewsCard item={item} key={item.article_id} />)
        )}
      </div>
    </>
  );
}

export default News;
