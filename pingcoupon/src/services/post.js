import axios from 'axios';

import { baseUrl } from './endpoint';

export const postSignUp = async (id, password, name, phone, address) => {
  const response = await axios.post(
    `${baseUrl}/admin/signup`,
    {
      id: id,
      password: password,
      name: name,
      phone: phone,
      address: address,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  return response.data;
};

export const postSignIn = async (id, password) => {
  const response = await axios.post(
    `${baseUrl}/admin/login`,
    {
      id: id,
      password: password,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  return response.data;
};

export const postMake = async (
  type,
  name,
  description,
  issuer,
  receiver,
  accesstoken = sessionStorage.getItem('ACCESS_TOKEN')
) => {
  const response = await axios.post(
    `${baseUrl}/admin/coupon?type=${type}`,
    {
      name: name,
      description: description,
      issuer: issuer,
      receiver: receiver
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
