import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./config/api";
import { auth, db } from "./firebase";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Adding coins to watchlist
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      let unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  // Fetching coins data
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "AUD") setSymbol("AU$");
    fetchCoins();
  }, [currency]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  // On User Login/Signup
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, [user]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        alert,
        setAlert,
        user,
        coins,
        loading,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
