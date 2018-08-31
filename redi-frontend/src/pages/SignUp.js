import React, { Component } from "react";

import { Box, Label, Text, TextField, Button } from "gestalt";
import client from "../lib/Client";

class SignUp extends Component {
  state = {
    id: "",
    name: "",
    age: "0",
    password: ""
  };

  onChangeId = ({ value }) => {
    this.setState({ ...this.state, id: value });
  };

  onChangeName = ({ value }) => {
    this.setState({ ...this.state, name: value });
  };

  onChangeAge = ({ value }) => {
    this.setState({ ...this.state, age: Number(value) });
  };

  onChangePassword = ({ value }) => {
    this.setState({ ...this.state, password: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    client
      .post("/user/register", {
        id: this.state.id,
        name: this.state.name,
        password: this.state.password,
        age: this.state.age
      })
      .then(() => {
        alert("가입이 완료되었습니다!");
      })
      .catch(() => {
        alert("가입이 실패되었습니다...");
      });
  };

  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h1>회원가입</h1>

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
            <Label htmlFor="name">
              <Text>이름</Text>
            </Label>
          </Box>
          <TextField
            id="name"
            onChange={this.onChangeName}
            placeholder="이름을 입력하세요"
            value={this.state.name}
            type="text"
          />
        </Box>

        <Box marginBottom={5}>
          <Box marginBottom={2}>
            <Label htmlFor="age">
              <Text>나이</Text>
            </Label>
          </Box>
          <TextField
            id="age"
            onChange={this.onChangeAge}
            placeholder="나이를 입력하세요"
            value={this.state.age}
            type="number"
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
          <Button text="회원가입" type="submit" />
        </Box>
      </form>
    );
  }
}

export default SignUp;
