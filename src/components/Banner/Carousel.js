import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const btnStyle = {
  fontSize: "30px",
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};

const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className="carouselItem" to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: "25px",
          }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </span>
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
          keyboardNavigation
          responsive={{ 0: { items: 2 }, 512: { items: 4 } }}
          autoPlay
          items={items}
          buttonsDisabled // Disable default buttons
          renderPrevButton={({ isDisabled, onClick }) => (
            <button onClick={onClick} disabled={isDisabled} style={btnStyle}>
              {"<"}
            </button>
          )}
          renderNextButton={({ isDisabled, onClick }) => (
            <button onClick={onClick} disabled={isDisabled} style={btnStyle}>
              {">"}
            </button>
          )}
        />
      </div>
    </>
  );
};

export default Carousel;
