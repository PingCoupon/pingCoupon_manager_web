import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';

import Item from './Item';
import { getCoupons } from '../../services/get.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;
const Title = styled.div`
  width: 440px;
  padding-left: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #707070;
  margin-bottom: 30px;
  font-size: 17px;
`;

const ItemList = () => {

  const [coupons,setCoupons] = useState([]);

  const showCoupons = useCallback(async () => {
    const result = await getCoupons();
    setCoupons(result.coupons);
  }, []);

  useEffect(() => {
    showCoupons();
  }, []);

  console.log(coupons);

  return (
    <Wrapper>
      <Title>발행한 쿠폰</Title>
      {coupons.map((coupon) => (
        <Item name={coupon.name} issuer={coupon.issuer} key={coupon.name} /> 
      ))}
       
    </Wrapper>
  ); 
};

export default ItemList;
