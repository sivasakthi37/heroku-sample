import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Button, Input } from "antd";
import { connect } from "react-redux";
import { userdata } from "../../stateManager/actions";
// import axios from "axios";
import { GoogleLogin } from "react-google-login";

class Signin extends Component {
  componentDidMount() {}

  responseGoogle = response => {
    console.log(response);
    if (response.accessToken) {
      this.props.userdata(response);
      
      this.props.history.push("/dashboard");
    }
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1> signin</h1>

        <GoogleLogin
          clientId="885560216033-2lgci89m84tp1jivmb198itnratpp3vq.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state.user.user);

  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { userdata }
)(Signin);
