import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

import { postSignIn } from '../services/post.js';

const LoginWrapper = styled.div`
  width: 316px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  left: 50%;
  margin-left: -158px;
  margin-top: 200px;
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

const GoRegister = styled.a`
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

const SignIn = ({history}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  
  const { push } = useHistory();
  const onSubmit = async (e) => {
    try {
      console.log(id, password);
      const response = await postSignIn(id, password);
      sessionStorage.setItem('ACCESS_TOKEN', response.access_token);
      alert('로그인 성공');
      push('/')
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        alert('정확한 정보가 아닙니다');
      }
    }
  };
  useEffect(() => {
    if(id) history.push('/')
  }, []);

  return (
    <LoginWrapper>
      <img src={logo} />
      <LoginForm>
        <InputWrapper>
          <span>아이디</span>
          <input name="id" onChange={onChangeId} />
        </InputWrapper>
        <InputWrapper>
          <span>비밀번호</span>
          <input name="password" type="password" style={Password} onChange={onChangePassword} />
        </InputWrapper>
        <Button onClick={onSubmit} type="submit">
          로그인
        </Button>
      </LoginForm>
      <GoRegister href="/signup">회원가입</GoRegister>
    </LoginWrapper>
  );
};

export default SignIn;
