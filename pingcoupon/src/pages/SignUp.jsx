import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

import { postSignUp } from '../services/post.js';

const LoginWrapper = styled.div`
  width: 316px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  left: 50%;
  margin-left: -158px;
  margin-top: 100px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-top: 25px;
  font-size: 17px;
  font-weight: bold;
  input {
    width: 315px;
    height: 40px;
    outline: none;
    flex: 1;
    border: 1px solid #707070;
    border-radius: 5px;
    margin-top: 10px;
    padding-left: 20px;
    ::placeholder {
      font-size: 14px;
      font-family: 'Nanumsqaure';
    }
  }
`;
const Password = {
  fontFamily: 'Serif',
};

const Button = styled.button`
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #e73757;
  color: white;
  font-size: 17px;
  font-weight: bold;
  margin-top: 60px;
  cursor: pointer;
`;
const GoLogin = styled.a`
  font-size: 17px;
  font-weight: bold;
  color: #afafaf;
  margin-top: 40px;
  text-align: center;
  cursor: pointer;
  :hover {
    text-decoration: none;
    color: #afafaf;
  }
`;
const Error = styled.div`
  font-size: 14px;
  color: #e73757;
  margin-top: 10px;
  padding-left: 5px;
`;

const SignUp = ({history}) => {
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = (e) => {
      setter(e.target.value);
    };
    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [pw, onChangePw] = useInput('');
  const [name, onChangeName] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [address, onChangeAddress] = useInput('');

  const [pwError, setPwError] = useState(false);
  const [repw, setRepw] = useState(false);
  const checkPw = (e) => {
    setPwError(e.target.value !== pw);
    setRepw(e.target.value);
  };

  
  const { push } = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (pw !== repw) {
      return setPwError(true);
    }

    try {
      await postSignUp(id, pw, name, phone, address);
      alert('회원가입 성공');
      push('/signin');
    } catch (error) {
      if (error.status === 400) {
        alert('회원가입 실패');
      }
      if (error.status === 409) {
        alert('이미 등록된 아이디입니다');
      }
    }
  };

  return (
    <LoginWrapper>
      <img src={logo} />
      <LoginForm>
        <InputWrapper>
          <span>아이디</span>
          <input placeholder="아이디" name="id" required onChange={onChangeId} />
        </InputWrapper>
        <InputWrapper>
          <span>비밀번호</span>
          <input
            placeholder="비밀번호"
            name="pw"
            required
            type="password"
            style={Password}
            onChange={onChangePw}
          />
        </InputWrapper>
        <InputWrapper>
          <span>비밀번호 확인</span>
          <input
            placeholder="비밀번호 재입력"
            name="repw"
            placeholder="영문, 숫자 혼합 8~13자 (특수문자 가능)"
            required
            type="password"
            style={Password}
            onChange={checkPw}
          />
          {pwError && <Error>비밀번호가 일치하지 않습니다.</Error>}
        </InputWrapper>
        <InputWrapper>
          <span>가게 이름</span>
          <input placeholder="가게 이름" name="name" required onChange={onChangeName} />
        </InputWrapper>
        <InputWrapper>
          <span>전화번호</span>
          <input name="phone" placeholder="000-0000-0000" required onChange={onChangePhone} />
        </InputWrapper>
        <InputWrapper>
          <span>주소</span>
          <input placeholder="주소" name="address" required onChange={onChangeAddress} />
        </InputWrapper>
        <Button type="submit" onClick={onSubmit}>
          회원가입
        </Button>
      </LoginForm>
      <GoLogin href="/signin">로그인</GoLogin>
    </LoginWrapper>
  );
};

export default SignUp;
