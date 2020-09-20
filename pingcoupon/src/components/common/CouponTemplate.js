import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { Tab, Tabs } from 'react-bootstrap';
import { MakeCoupon, AttendanceCoupon, UseCoupon } from '../pages';

const CouponTemplate = ({children, nav, setNav}) => {
  return (
      <div>
          {children}
      </div>
  );
};

export default CouponTemplate;
