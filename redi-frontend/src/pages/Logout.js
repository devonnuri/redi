import { Component } from "react";

import client from "../lib/Client";

class Logout extends Component {
  componentDidMount() {
    client.post("/user/logout").then(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return "";
  }
}

export default Logout;
