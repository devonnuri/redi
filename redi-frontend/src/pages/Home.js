import React, { Component } from "react";

import { Box, Label, Text, TextArea, Button } from "gestalt";
import removeMd from "remove-markdown";

import Item from "../components/Item";
import Welcome from "../components/Welcome";
import InfiniteScroll from "../components/InfiniteScroll";

import "gestalt/dist/gestalt.css";
import client from "../lib/Client";

class Home extends Component {
  state = {
    logined: false,
    posts: [],
    loaded: false,
    ended: false,
    cursor: 1,
    text: ""
  };

  loadMore = () => {
    this.setState({ ...this.state, loaded: false });
    client.get(`/posts/${this.state.cursor}/3/desc`).then(response => {
      const length = response.data.length;
      if (length < 1) {
        this.setState({
          ...this.state,
          ended: true
        });
      }

      this.setState({
        ...this.state,
        posts: this.state.posts.concat(...response.data),
        cursor: this.state.cursor + length,
        loaded: true
      });
    });
  };

  componentDidMount() {
    this.loadMore();
    client.post("/user/checklogin").then(() => {
      this.setState({ logined: true });
    });
  }

  handleChange = ({ value }) => {
    this.setState({ ...this.state, text: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const body = this.state.text;

    let title = body.split("\n")[0];

    if (title.length > 15) {
      title = title.substring(0, 15) + "...";
    }

    client
      .post("/posts/write", {
        title,
        body
      })
      .then(() => {
        alert("글이 성공적으로 게시되었습니다!");
      })
      .catch(() => {
        alert("글 작성에 실패하였습니다.");
      });
  };

  render() {
    return (
      <div>
        {this.state.logined ? (
          <div className="container">
            <h1>최근 글</h1>

            <form onSubmit={this.handleSubmit}>
              <Box>
                <Box marginBottom={2}>
                  <Label htmlFor="write">
                    <Text>글쓰기</Text>
                  </Label>
                </Box>
                <TextArea
                  id="write"
                  onChange={this.handleChange}
                  placeholder="당신의 하루를 표현해보세요!"
                  value={this.state.text}
                />
                <Box marginTop={2}>
                  <Button text="올리기" type={this.handleSubmit} />
                </Box>
              </Box>
            </form>

            <InfiniteScroll
              throttle={100}
              threshold={300}
              isLoading={!this.state.loaded}
              hasMore={!!this.state.cursor}
              onLoadMore={this.loadMore}
            >
              {this.state.posts.length > 0
                ? this.state.posts
                    .sort((a, b) => b.id - a.id)
                    .map(post => (
                      <Item
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={removeMd(post.body)}
                        createdAt={post.createdAt}
                      />
                    ))
                : ""}
            </InfiniteScroll>
          </div>
        ) : (
          <Welcome />
        )}
      </div>
    );
  }
}

export default Home;
