import React, { useState, useContext } from "react";
import Joi from "@hapi/joi";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { userRegisterSchema } from "../utils/validators";
import { findErrorFactory, errorMessages } from "../utils/errors";

import AppContext from "../utils/store";


const Field = (props) => (
  <Box mb={5}>
    <TextField {...props} />
  </Box>
);

function RegisterPage() {
  const { authCredential } = useContext(AppContext);
  const history = useHistory();
  if (authCredential) history.push("/main");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState(null);

  const findError = findErrorFactory(errors);
  const usernameError = findError("username");
  const emailError = findError("email");
  const passwordError = findError("password");
  const nameError = findError("name");

  const createUser = () => {
    const newUser = { username, email, password, name };
    try {
      Joi.assert(newUser, userRegisterSchema);
      axios
        .post("http://localhost:8080/api/auth/register", newUser)
        .then((res) => {
          history.push("/main");
        })
        .catch(console.log);
    } catch ({ details }) {
      const formattedErrors = details.map((detail) => ({ field: detail.path[0], type: detail.type }));
      console.log(formattedErrors);
      setErrors(formattedErrors);
    }
  };

  return (
    <Box
      component="form"
      minHeight="85vh"
      pt={5}
      pb={5}
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box width="100%" mb={6}>
        <Typography variant="h2" align="left">
          Crie uma nova conta
        </Typography>
      </Box>
      <Field
        id="username"
        label="Nome de usuário"
        type="text"
        fullWidth={true}
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={Boolean(usernameError)}
        helperText={
          Boolean(usernameError) &&
          errorMessages[usernameError.type]
        }
      />
      <Field
        id="email"
        label="Email"
        type="email"
        required
        fullWidth={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(emailError)}
        helperText={
          Boolean(emailError) &&
          errorMessages[emailError.type]
        }
      />
      <Field
        id="password"
        label="Senha"
        type="password"
        required
        fullWidth={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(passwordError)}
        helperText={
          Boolean(passwordError) &&
          errorMessages[passwordError.type]
        }
      />
      <Field
        id="name"
        label="Nome de Apresentação"
        type="text"
        fullWidth={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={Boolean(nameError)}
        helperText={
          Boolean(nameError) &&
          errorMessages[nameError.type]
        }
      />
      <Box alignSelf="start">
        <Button variant="contained" color="primary" onClick={createUser}>
          Registrar
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
