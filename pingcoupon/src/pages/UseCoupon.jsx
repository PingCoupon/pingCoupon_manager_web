import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UseItem from '../components/Use/UseItem';
import { getAttCoupons } from '../services/get.js';
import { patchUse, patchUseAtt } from '../services/patch.js';

const Wp = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  margin-top: 80px;
  margin: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  :nth-child(1) {
    margin-top: 100px;
  }
  :nth-child(2) {
    margin-top: 80px;
  }
`;
const InputCouponNumber = styled.input`
  width: 350px;
  height: 40px;
  padding: 0 15px;
  outline: none;
  border: 1px solid #707070;
  border-radius: 5px;
  :placeholder {
    color: #c4c4c4;
    font-size: 15px;
  }
`;
const Button = styled.button`
  width: 90px;
  height: 40px;
  background-color: #e73757;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 15px;
`;
const Title = styled.div`
  width: 450px;
  padding-left: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #707070;
  margin-bottom: 30px;
  font-size: 17px;
`;

const UseCoupon = () => {
  const [data, setData] = useState([]);
  const { push } = useHistory();

  const getUsers = useCallback(async () => {
    const result = await getAttCoupons();
    setData(result);
  }, []);

  useEffect(() => {
    try {
      getUsers();
    } catch (error) {
      if (error.response.status === 401) push('/signin');
    }
  }, []);

  const [number, setNumber] = useState('');
  const onChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const onUse = async (e) => {
    try {
      e.preventDefault();
      if (window.confirm('쿠폰을 사용하시겠습니까?')) {
        let response = await patchUse(number);
        alert('[' + response.name + '] 사용완료');
        setNumber('');
        push('/');
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert('유효하지 않는 쿠폰번호입니다');
        setNumber('');
      }
    }
  };

  return (
    <Wp>
      <Wrapper>
        <Title>출석쿠폰</Title>
        <div>
          {data.map((v) => (
            <UseItem key={v} email={v} />
          ))}
        </div>
      </Wrapper>
      <Wrapper>
        <Title>일반쿠폰</Title>
        <div>
          <InputCouponNumber id="number" value={number} placeholder="쿠폰 번호" onChange={onChangeNumber} />
          <Button onClick={onUse}>사용</Button>
        </div>
      </Wrapper>
    </Wp>
  );
};

export default UseCoupon;
