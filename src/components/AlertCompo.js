import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { CryptoState } from "../CryptoContext";

const AlertCompo = () => {
  const { alert, setAlert } = CryptoState();

  return (
    <>
      <Snackbar open={alert.open} autoHideDuration={3000}>
        <MuiAlert elevation={10} variant="filled" severity={alert.type}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AlertCompo;
