import { AppBar, Fade, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as React from "react";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase";
import "./AuthModal.css";
import Login from "./Login";
import SignUp from "./SignUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  color: "white",
  bgcolor: "#211f1f",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        variant="container"
        style={{
          width: 90,
          height: 50,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
        closeAfterTransition
      >
        <Box sx={style}>
          <Fade in={open}>
            <div className="paper">
              <AppBar
                position="static"
                style={{ backgroundColor: "transparent", color: "white" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{ borderRadius: 10 }}
                >
                  <Tab label="Login" style={{ color: "white" }} />
                  <Tab label="Sign Up" style={{ color: "white" }} />
                </Tabs>
              </AppBar>
              {value === 0 && <Login handleClose={handleClose} />}
              {value === 1 && <SignUp handleClose={handleClose} />}
              <Box className="google">
                <span>OR</span>
                <GoogleButton
                  style={{ width: "100%", outline: "none" }}
                  onClick={signInWithGoogle}
                />
              </Box>
            </div>
          </Fade>
        </Box>
      </Modal>
    </div>
  );
}
