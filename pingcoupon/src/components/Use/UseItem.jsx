import React from 'react';
import styled from 'styled-components';

import { patchUse, patchUseAtt } from '../../services/patch.js';

const Wrapper = styled.div`
  width: 450px;
  height: 60px;
  border: 1px solid #e73757;
  border-radius: 5px;
  display: flex;
  align-items: center;
  div {
    display: inline-block;
    margin-left: 30px;
  }
  button {
    position: relative;
    right: -160px;
    width: 120px;
    height: 35px;
    background-color: #e73757;
    color: white;
    border: none;
    border-radius: 5px;
  }
  & + & {
    margin-top: 15px;
  }
`;

const UseItem = ({email}) => {

  const onUseAtt = async (e) => {
    let use = window.confirm('쿠폰을 사용하시겠습니까?');
    if (use) {
      try {
        let response = await patchUseAtt(email);
        alert(response.name);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Wrapper>
      <div>{email}</div>
      <button onClick={onUseAtt}>사용하기</button>
    </Wrapper>
  );
};

export default UseItem;
