import React from 'react';
import styled from 'styled-components';

import { patchAtt } from '../../services/patch.js';

const ItemWrapper = styled.div`
  width: 430px;
  height: 60px;
  span {
    margin-left: 20px;
  }
  border: 1px solid #e73757;
  border-radius: 5px;
  display: flex;
  align-items: center;
  & + & {
    margin-top: 20px;
  }
`;

const Button = styled.button`
  position: relative;
  left: 150px;
  width: 120px;
  height: 35px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AttItem = ({ email }) => {
  const onAtt = async (e) => {
    try {
      const response = await patchAtt(email);
      alert(email + '\n' + response.has_count + ' / ' + response.required);
    } catch (error) {
      console.log(error);
      if(error.status===409){alert("쿠폰을 모두 모았습니다!")}
    }
  };

  return (
    <ItemWrapper>
      <span>{email}</span>
      <Button onClick={onAtt}>출석하기</Button>
    </ItemWrapper>
  );
};

export default AttItem;
