import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import ItemList from '../components/Make/ItemList';
import { patchLimit } from '../services/patch.js';
import { postMake } from '../services/post.js';

const MakeWrapper = styled.div`
  width: 500px;
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

const CheckWrapper = styled.div`
  width: 390px;
  margin-bottom: 20px;
  label {
    padding-left: 10px;
    margin-right: 30px;
  }
`;
const NumberWrapper = styled.div`
  margin-bottom: 70px;
  padding-left: 60px;
  p {
    font-size: 14px;
  }
  div {
    display: inline-block;
    width: 130px;
  }
  input {
    margin-left: 20px;
    width: 240px;
    height: 40px;
    padding: 0 15px;
    outline: none;
    border: 1px solid #707070;
    border-radius: 5px;
    background: white;
    :placeholder {
      color: #c4c4c4;
      font-size: 15px;
    }
  }
  button {
    width: 390px;
    height: 40px;
    border: 2px solid #e73757;
    border-radius: 5px;
    margin-top: 30px;
  }
`;
const InputWrapper = styled.div`
  margin-bottom: 15px;
  div {
    display: inline-block;
    width: 70px;
  }
  input {
    margin-left: 20px;
  }
`;
const Input = styled.input`
  width: 300px;
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
  width: 400px;
  height: 40px;
  background-color: #e73757;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 30px;
`;

const MakeCoupon = ({ history }) => {
  const [limit, setLimit] = useState('');
  const { push } = useHistory();
  const onChangeLimit = (e) => {
    setLimit(Number(e.target.value));
  };

  const onMakeLimit = async (e) => {
    try {
      await patchLimit(limit);
      alert('출석쿠폰 최대개수: ' + limit);
    } catch (error) {
      if (error.response.status === 409) {
        alert('이미 출석쿠폰이 생성되었습니다');
        setLimit('');
      }
      if (error.response.status === 401) {
        window.sessionStorage.clear();
        alert('재로그인하세요');
        push('/signin');
      }
    }
  };
  const [type, setType] = useState('attendance');
  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const [coupon, setCoupon] = useState('');
  const onChangeCoupon = (e) => {
    setCoupon(e.target.value);
  };
  const [content, setContent] = useState('');
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const [maker, setMaker] = useState('');
  const onChangeMaker = (e) => {
    setMaker(e.target.value);
  };
  const [email, setEmail] = useState('');
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onMakeCoupon = async (e) => {
    try {
      await postMake(type, coupon, content, maker, email);
      alert(`[${type}] ${coupon} 생성완료`);
      setCoupon('');
      setContent('');
      setMaker('');
      setEmail('');
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        window.sessionStorage.clear();
        alert('재로그인하세요');
        push('/signin');
      }
      if (error.status === 409) {
        alert('쿠폰을 모두 모았습니다!');
      }
    }
  };

  return (
    <>
      <MakeWrapper>
        <NumberWrapper>
          <p>** 출석쿠폰 발급 전 한 번만 생성하면 됩니다.</p>
          <div>출석쿠폰 최대개수</div>
          <input
            name="limit"
            value={limit}
            type="number"
            placeholder="출석쿠폰 최대개수"
            onChange={onChangeLimit}
          />
          <button onClick={onMakeLimit}>생성하기</button>
        </NumberWrapper>
        <CheckWrapper>
          <input
            type="radio"
            id="contactChoice1"
            onChange={onChangeType}
            name="type"
            value="attendance"
            defaultChecked
          />
          <label htmlFor="contactChoice1">출석쿠폰</label>
          <input
            type="radio"
            id="contactChoice2"
            onChange={onChangeType}
            name="type"
            value="default"
          />
          <label htmlFor="contactChoice2">일반쿠폰</label>
        </CheckWrapper>
        <InputWrapper>
          <div>쿠폰 이름</div>
          <Input type="text" value={coupon} placeholder="쿠폰 이름" onChange={onChangeCoupon} />
        </InputWrapper>
        <InputWrapper>
          <div>쿠폰 내용</div>
          <Input type="text" value={content} placeholder="내용" onChange={onChangeContent} />
        </InputWrapper>
        <InputWrapper>
          <div>발행인</div>
          <Input type="text" value={maker} placeholder="이름" onChange={onChangeMaker} />
        </InputWrapper>
        <InputWrapper>
          <div>받는 계정 </div>
          <Input type="text" value={email} placeholder="이메일" onChange={onChangeEmail} />
        </InputWrapper>
        <Button onClick={onMakeCoupon}>발행하기</Button>
      </MakeWrapper>
      <ItemList  />
    </>
  );
};

export default MakeCoupon;
