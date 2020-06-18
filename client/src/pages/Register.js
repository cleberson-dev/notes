import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function RegisterPage() {
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
          Crie uma nova conta
        </Typography>
      </Box>
      <Box mb={5}>
        <TextField
          id="usernameOrEmail"
          label="Nome de usuário ou email"
          required
          fullWidth={true}
        />
      </Box>
      <Box mb={5}>
        <TextField
          id="password"
          label="Senha"
          type="password"
          fullWidth={true}
          required
        />
      </Box>
      <Box alignSelf="start">
        <Button variant="contained" color="primary">
          Registrar
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
