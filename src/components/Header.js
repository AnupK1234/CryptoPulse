import {
  AppBar,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const Header = () => {
  const { setCurrency, user } = CryptoState();
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/">
            <Typography
              style={{ color: "gold", fontWeight: "700", fontSize: "1.5rem" }}
            >
              CryptoPulse
            </Typography>
          </Link>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel style={{ color: "white" }}>Currency</InputLabel>
              <Select
                label="Currency"
                sx={{
                  color: "white",
                  "&:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline ":
                    {
                      borderColor: "white",
                    },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"AUD"}>AUD</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Link to="/news" style={{ fontSize:25 }}>
            News
          </Link>
          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
