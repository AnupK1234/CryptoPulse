import { Avatar, Drawer } from "@mui/material";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CryptoState } from "../../CryptoContext";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import "./AuthModal.css";

const UserSidebar = () => {
  const [state, setState] = useState({
    right: false,
  });

  const { user, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // User logout
  const logOut = () => {
    signOut(auth);
    toggleDrawer();
  };

  // Remove coin from watchlist
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="sideContainer">
              <div className="profile">
                <Avatar
                  className="picture"
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className="watchlist">
                  <span style={{ fontSize: 20, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className="coin" key={coin.id}>
                          <div>
                            <span>{coin.name}</span>
                            <span style={{ display: "flex", gap: 8 }}>
                              {symbol}{" "}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                            </span>
                          </div>
                          <AiFillDelete
                            style={{ cursor: "pointer" }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
              <button className="logout" onClick={logOut}>
                Log Out
              </button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSidebar;
