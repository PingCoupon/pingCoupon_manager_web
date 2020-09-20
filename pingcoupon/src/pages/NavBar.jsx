import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { Tab, Tabs } from 'react-bootstrap';
import { MakeCoupon, AttendanceCoupon, UseCoupon } from '../pages';

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    outline: none;
    color: black;
  }
  a::active {
    color: #e73757;
  }
`;
const Logo = styled.img`
  position: relative;
  left: 50%;
  margin-left: -156px;
  margin-top: 100px;
`;

const NavBar = ({history}) => {
  const [nav, setNav] = useState("default");
  const { push } = useHistory();
  const id = window.sessionStorage.getItem('ACCESS_TOKEN');
  useEffect(() => {
    if(!id) push('/signin')
  }, []);

  return (
    <>
      <Logo src={logo} />
      <NavWrapper>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="make" title="쿠폰발행" >
            <MakeCoupon />
          </Tab>
          <Tab eventKey="attendance" title="출석쿠폰 지급" >
            <AttendanceCoupon />
          </Tab>
          <Tab eventKey="use" title="쿠폰사용">
            <UseCoupon />
          </Tab>
        </Tabs>
      </NavWrapper>
    </>
  );
};

export default NavBar;
