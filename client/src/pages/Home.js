import React from "react";

import { Link } from "react-router-dom";

import { Typography, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Button";

function HomePage() {
  return (
    <Box 
        height="90vh"
        display="flex" flexDirection="column" justifyContent="center"
    >
      <Typography variant="h2">Lembre o que você esqueceu. Guarde para você.</Typography>
      <Box width="50%" mt={2}>
        <Grid container spacing={2}>
            <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <MuiLink variant="contained" color="primary">Entrar</MuiLink>
                </Link>
            </Grid>
            <Grid item>
                <Link to="/register" style={{ textDecoration: 'none'}}>
                  <MuiLink variant="contained" color="primary">Registrar</MuiLink>
                </Link>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
