import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import AppContext from "../store";

function PrivateRoute({ component: Component, ...rest }) {
    const { authCredential: isAuthenticated } = useContext(AppContext);

    return (
        <Route
            { ...rest }
            render={props => isAuthenticated ? (
                <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;