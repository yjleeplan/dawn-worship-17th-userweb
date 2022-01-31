import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer'

const SampleLayout = ({children}) => {
    return (
		<div id='sample-layout'>
        	<Header/>
        	<Content>{children}</Content>
            <Footer/>
      	</div>
    );
};

export default SampleLayout;