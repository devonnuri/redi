import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Box, Button } from "gestalt";

import "./index.css";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="container">
          <div>
            행복한 삶으로의 <span>복귀</span>
          </div>
          <div>
            <span>REDI</span>
            로부터
          </div>
          <Box display="flex" marginTop={12}>
            <Box direction="row" column={2} marginRight={5}>
              <Button
                text="회원가입"
                onClick={() => {
                  this.props.history.push("/signup");
                }}
              />
            </Box>
            <Box direction="row" column={2}>
              <Button
                color="transparent"
                text="로그인"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              />
            </Box>
          </Box>
        </div>
      </div>
    );
  }
}

export default withRouter(Welcome);
