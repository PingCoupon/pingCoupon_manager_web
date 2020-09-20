import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import useDebounce from '../components/Attendance/useDebound';
import AttItem from '../components/Attendance/AttItem';
import { getUsersApi } from '../services/get.js';

const Wrapper = styled.div`
  margin: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const SearchId = styled.input`
  width: 430px;
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
const Search = styled.form`
  padding-bottom: 70px;
  border-bottom: 1px solid #d1d1d1;
  margin-bottom: 45px;
`;

const AttendanceCoupon = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search, 300);

  const handleSearch = useCallback(({ target: { value } }) => {
    setSearch(value);
  }, []);

  const handleData = useCallback(
    (searchDebounce) => {
      setData(data.filter((v) => v.indexOf(searchDebounce) === 0));
    },
    [data]
  );

  const getUsers = useCallback(async () => {
    const result = await getUsersApi();
    setData(result);
  }, []);

  useEffect(() => {
    if (searchDebounce) {
      handleData(searchDebounce);
    } else {
      getUsers();
    }
  }, [searchDebounce]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Wrapper>
      <Search>
        <SearchId
          placeholder="이메일을 검색하세요"
          onChange={handleSearch}
          value={search}
          type="text"
        />
      </Search>
      <div>
        {data.map((v) => (
          <AttItem key={v} email={v} />
        ))}
      </div>
    </Wrapper>
  );
};

export default AttendanceCoupon;
