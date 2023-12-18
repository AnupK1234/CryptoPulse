import { Box, Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Wrong password");
      setTimeout(() => {
        setError(null);
      }, 3000);

      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(result);
      handleClose();
    } catch (error) {
      console.log(error.message);
      console.log("Signup Unsuccessful");
      <Alert severity="success">SignUp successful</Alert>;
      return;
    }
  };

  return (
    <>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#EEBC1D" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default SignUp;
