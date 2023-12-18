import { Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

function Banner() {
  return (
    <>
      <div className="banner">
        <Container className="bannerContent">
          <div className="tagline">
            <Typography
              variant="h2"
              style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Montserrat",
              }}
            >
              CryptoPulse
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                color: "darkgray",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Get all the Info regarding your favorite Cryptocurrency
            </Typography>
          </div>
          <Carousel />
        </Container>
      </div>
    </>
  );
}

export default Banner;
