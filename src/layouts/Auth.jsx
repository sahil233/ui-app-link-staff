import React from "react";
import { Route, Switch, Link } from "react-router-dom";

// core components
import AuthFooter from "components/Footers/AuthFooter.jsx";

import routes from "routes.js";

class Auth extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          <section className="register-login">
            <div className="row no-gutters align-items-center">
              {/* Logo section*/}
              <div className="col-lg-6 left-side d-none d-lg-block">
                <img className="bg" src={require("assets/images/login/login.jpg")} alt="Login"/>
                <div className="white-logo">
                    <img src={require("assets/images/login/logo-white.svg")} alt="white logo"/>
                </div>
              </div>
              
              {/* Login Form */}
              <div className="col-lg-6 right-side-scroll">
                <div className="right-side">
                  <div className="logo">
                    <Link to="/auth/login"><img src={require("assets/images/login/linkstaff-logo.svg")} alt="Linkstaff Logo" /></Link>
                  </div>
                  {/* Page content */}
                  <Switch>{this.getRoutes(routes)}</Switch>
                </div>
              </div>
            </div>
          </section>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Auth;
