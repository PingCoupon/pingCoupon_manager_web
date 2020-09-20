import axios from 'axios';

import { baseUrl } from './endpoint';

export const patchLimit = async (required, accesstoken = sessionStorage.getItem('ACCESS_TOKEN')) => {
  const response = await axios.patch(
    `${baseUrl}/admin/coupon/attendance/limit`,
    {
      required,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    }
  );
  return response.data;
};

export const patchAtt = async (email, accesstoken = sessionStorage.getItem('ACCESS_TOKEN')) => {
  const response = await axios.patch(
    `${baseUrl}/admin/coupons/attendance`,
    {
      email
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    }
  );
  return response.data;
};

//일반쿠폰사용
export const patchUse = async (coupon_code, accesstoken = sessionStorage.getItem('ACCESS_TOKEN')) => {
    const response = await axios.patch(
      `${baseUrl}/admin/coupon/default`,
      {
        coupon_code: coupon_code,
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    return response.data;
  };

  //출석쿠폰사용
export const patchUseAtt = async (email, accesstoken = sessionStorage.getItem('ACCESS_TOKEN')) => {
  const response = await axios.patch(
    `${baseUrl}/admin/coupon/attendance`,
    {
      email
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    }
  );
  return response.data;
};