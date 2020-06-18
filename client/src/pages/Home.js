import React from "react";

import { Link } from "react-router-dom";

import { Typography, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

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
                <Link to="/login" color="primary">Entrar</Link>
            </Grid>
            <Grid item>
                <Link to="/register" color="primary">Registrar</Link>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
