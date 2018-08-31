import React, { Component } from "react";

import { Box, Label, Text, TextField, Button } from "gestalt";
import client from "../lib/Client";

class Login extends Component {
  state = {
    id: "",
    password: ""
  };

  onChangeId = ({ value }) => {
    this.setState({ ...this.state, id: value });
  };

  onChangePassword = ({ value }) => {
    this.setState({ ...this.state, password: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    client
      .post("/user/login", {
        id: this.state.id,
        password: this.state.password
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        alert("로그인에 실패하였습니다.");
      });
  };

  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h1>로그인</h1>

        <Box marginBottom={5}>
          <Box marginBottom={2}>
            <Label htmlFor="id">
              <Text>아이디</Text>
            </Label>
          </Box>
          <TextField
            id="id"
            onChange={this.onChangeId}
            placeholder="아이디를 입력하세요"
            value={this.state.id}
            type="text"
          />
        </Box>

        <Box marginBottom={5}>
          <Box marginBottom={2}>
            <Label htmlFor="password">
              <Text>비밀번호</Text>
            </Label>
          </Box>
          <TextField
            id="password"
            onChange={this.onChangePassword}
            placeholder="비밀번호를 입력하세요"
            value={this.state.password}
            type="password"
          />
        </Box>

        <Box display="flex">
          <Box lgColumn={6}>
            <Button color="blue" text="로그인" type="submit" />
          </Box>
          <Box lgColumn={6}>
            <Button
              text="회원가입"
              onClick={() => {
                this.props.history.push("/signup");
              }}
            />
          </Box>
        </Box>
      </form>
    );
  }
}

export default Login;
