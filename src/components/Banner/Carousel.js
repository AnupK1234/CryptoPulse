import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { currency } = CryptoState();
  const [trending, setTrending] = useState([]);

    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };

    useEffect(() => {
      fetchTrendingCoins();
    }, [currency]);
  console.log(trending);

  const items = trending.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
      </Link>
    );
  });
  return (
    <>
      <div className="carousel">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          responsive={{ 0: { items: 2 }, 512: { items: 4 } }}
          autoPlay
          items={items}
        />
      </div>
    </>
  );
};

export default Carousel;
