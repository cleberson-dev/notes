import React, { useState, useContext } from "react";
import axios from "axios";
import Joi from "@hapi/joi";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import AppContext from "../utils/store";
import { findErrorFactory, errorMessages } from "../utils/errors";
import { userLoginSchema } from "../utils/validators";

function LoginPage() {
  const history = useHistory();
  const { authCredential, setAuthCredential } = useContext(AppContext);
  if (authCredential) {
    history.push("/");
  }

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState(null);
  const findError = findErrorFactory(errors);
  const usernameOrEmailError = findError("usernameOrEmail");
  const passwordError = findError("password");

  function handleBtnClick(e) {
    try {
      Joi.assert({ usernameOrEmail, password }, userLoginSchema);
      axios
        .post("http://localhost:8080/api/auth/login", {
          usernameOrEmail,
          password,
        })
        .then((res) => {
          const { data: user, accessToken: token } = res.data;
          setAuthCredential({ user, token });
          history.push("/");
        })
        .catch(console.error);
    } catch ({ details }) {
      setErrors(
        details.map((detail) => ({ field: detail.path[0], type: detail.type }))
      );
    }
  }

  return (
    <Box
      component="form"
      height="85vh"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box width="100%" mb={6}>
        <Typography variant="h2" align="left">
          Entre!
        </Typography>
      </Box>
      <Box mb={5}>
        <TextField
          id="usernameOrEmail"
          label="Nome de usuário ou email"
          required
          fullWidth={true}
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          error={Boolean(usernameOrEmailError)}
          helperText={
            Boolean(usernameOrEmailError) &&
            errorMessages[usernameOrEmailError.type]
          }
        />
      </Box>
      <Box mb={5}>
        <TextField
          id="password"
          label="Senha"
          type="password"
          fullWidth={true}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(passwordError)}
          helperText={
            Boolean(passwordError) && errorMessages[passwordError.type]
          }
        />
      </Box>
      <Box alignSelf="start">
        <Button variant="contained" color="primary" onClick={handleBtnClick}>
          Entrar
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
