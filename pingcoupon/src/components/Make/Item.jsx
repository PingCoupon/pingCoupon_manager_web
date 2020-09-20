import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  width: 420px;
  height: 95px;
  border: 1px solid #e73757;
  border-radius: 20px;
  & + & {
    margin-top: 20px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  margin-left: 20px;
  margin-top: 20px;
`;
const Name = styled.div`
  font-size: 14px;
  margin-left: 20px;
  margin-top: 10px;
`;

const Item = ({name, issuer}) => {

  return (
    <ItemWrapper>
      <Title>{name}</Title>
      <Name>발행인: {issuer}</Name>
    </ItemWrapper>
  );
};

export default Item;
