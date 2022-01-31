import React from 'react';
import Header from '../Header';
import Content from '../Content';
// import Footer from '../Footer';

const MainLayout = ({
  ContentBody,
}) => {
  return (
    <>
      <Header/>
      <Content ContentBody={ContentBody}/>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;