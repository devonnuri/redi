import React from "react";
import styled from "styled-components";

const LinkContainer = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ItemContainer = styled.div`
  display: flex;

  margin-top: 3rem;
  max-height: 15rem;

  border-radius: 5px;
  box-shadow: 3px 3px 15px 0px black;
  background-image: linear-gradient(135deg, #affef4 10%, #b9b7ff 100%);
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 15rem;
  height: 15rem;
  flex-shrink: 0;

  overflow: hidden;
`;

const Image = styled.img`
  width: 15rem;
  height: 15rem;

  position: relative;

  float: left;
  object-fit: cover;

  transition: ease-in-out 0.1s all;

  &:hover {
    transform: scale(1.5) rotate(20deg);
  }
`;

const Info = styled.div`
  float: left;

  padding: 2rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const Body = styled.p`
  text-overflow: ellipsis;
`;

const CreatedAt = styled.span``;

const Item = ({ id, title, body, imageURL, createdAt }) => {
  return (
    <LinkContainer href={`/${id}`}>
      <ItemContainer>
        {imageURL ? (
          <ImageWrapper>
            <Image src={imageURL} />
          </ImageWrapper>
        ) : (
          ""
        )}

        <Info>
          <Title>{title}</Title>
          <Body>{body}</Body>
          {createdAt ? (
            <CreatedAt>{new Date(createdAt).toLocaleString()}</CreatedAt>
          ) : (
            ""
          )}
        </Info>
      </ItemContainer>
    </LinkContainer>
  );
};

export default Item;
