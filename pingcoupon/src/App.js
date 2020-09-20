import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import {
  SignIn,
  SignUp,
  NavBar } from './pages';

export const GlobalStyle = createGlobalStyle`
  *{
      font-family: NanumSquare;
      margin: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Route path="/" exact component={NavBar} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </BrowserRouter>
    </>
  ); 
}

export default App;
