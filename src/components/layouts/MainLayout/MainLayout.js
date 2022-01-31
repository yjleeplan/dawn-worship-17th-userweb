import React from 'react';
import Header from './Header';
import Content from './Content';

const MainLayout = ({children}) => {
    return (
		<div id='main-layout'>
        	<Header/>
        	<Content>{children}</Content>
      	</div>
    );
};

export default MainLayout;