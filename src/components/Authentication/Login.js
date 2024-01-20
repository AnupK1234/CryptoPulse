import { Alert, Box, Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const [error, setError] = useState(false);

  const TextFieldStyle = {
    "& .MuiFormLabel-root": {
      color: "white",
      borderColor: "white",
    },
    "& .MuiFormControl-root, & .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      <Alert severity="error">Please fill all the Fields</Alert>;
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Result: ", result);
      if (result.user.emailVerified) handleClose();
      else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error.code);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
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
          sx={TextFieldStyle}
        />
        <TextField
          variant="outlined"
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={TextFieldStyle}
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#EEBC1D" }}
          onClick={handleSubmit}
        >
          Login
        </Button>

        {error && (
          <Alert variant="filled" severity="error">
            Invalid Credentials/Email not verified
          </Alert>
        )}
      </Box>
    </>
  );
};

export default Login;
