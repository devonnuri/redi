import React, { Component } from "react";

import client from "../../lib/Client";

import "./index.css";

class Navbar extends Component {
  state = {
    logined: false,
    username: ""
  };

  componentDidMount() {
    client.post("/user/checklogin").then(response => {
      this.setState({ logined: true, username: response.data.name });
    });
  }

  render() {
    return (
      <div className="navbar">
        <div className="container">
          <a id="logo" href="/">
            레디
          </a>

          {this.state.logined ? (
            <div className="dropdown right">
              <button className="dropbtn">{this.state.username} ▼</button>
              <div className="dropdown-content">
                <a href="/logout">로그아웃</a>
              </div>
            </div>
          ) : (
            <div className="right">
              <a href="/login">로그인</a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
