import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      type: "dark",
    },
  });

  const { currency, setCurrency } = CryptoState();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Link to="/"><Typography style={{ color: "gold" }}>CryptoPulse</Typography></Link>
            <Select
              variant="outlined"
              style={{ widows: 100, height: 40, marginRight: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
