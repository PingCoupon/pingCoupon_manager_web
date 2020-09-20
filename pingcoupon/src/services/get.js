import axios from 'axios';

import { baseUrl } from './endpoint';

export const getCoupons = async (accesstoken = sessionStorage.getItem('ACCESS_TOKEN')) => {
  const response = await axios.get(`${baseUrl}/admin/coupons?size=2`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  return response.data;
};

//출석쿠폰사용요청목록
export const getAttCoupons = async (accesstoken = sessionStorage.getItem('ACCESS_TOKEN')) => {
  const response = await axios.get(`${baseUrl}/admin/coupons/request`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  return response.data.result;
};

export const getUsersApi = async (accesstoken = sessionStorage.getItem('ACCESS_TOKEN')) => {
  const response = await axios.get(`${baseUrl}/admin/coupons/users`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  return response.data.result;
};
