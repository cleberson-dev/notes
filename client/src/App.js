import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory, Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountIcon from "@material-ui/icons/AccountCircle";

import MyAlert from "./components/MyAlert";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import AppContext from "./store";

import "./App.css";

function App() {
  const existingCredentials = JSON.parse(localStorage.getItem("credentials"));
  const [authCredential, setAuthCredential] = useState(existingCredentials);

  const setAuth = (data) => {
    localStorage.setItem("credentials", JSON.stringify(data));
    setAuthCredential(data);
  };

  const [alert, setAlert] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppContext.Provider
      value={{
        authCredential,
        setAuthCredential: setAuth,
        alert,
        setAlert,
      }}
    >
      <Router>
        <div className="App">
          <MyAlert open={!!alert} {...alert} />
          <AppBar position="static">
            <Toolbar>
              <Box
                display="flex"
                width="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">Note to Self</Typography>
                <Box display="flex" alignItems="center" position="relative">
                  { authCredential ? (
                    <Button
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    startIcon={<AccountIcon />}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    Olá, {authCredential.user.username}!
                  </Button>) : (
                    <Button>
                      <Link to="/login">Entrar</Link>
                    </Button>
                  )}
                  
                  <Menu
                    id="profile-menu"
                    onClose={() => setAnchorEl(null)}
                    keepMounted
                    open={Boolean(anchorEl)}
                  >
                    <MenuItem
                      onClick={() => {
                        setAuth(null);
                        setAnchorEl(null);
                      }}
                    >Sair</MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg">
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </Switch>
          </Container>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
