import React from 'react';
import {UserAddOutlined} from '@ant-design/icons';

const Header = () => {
	return (
      	<div id='header'>
			<div className='header-left'>
        		<div className='kuemkwang-logo'>
					{/* <img src='src/assets/images/logo.png' alt='kkk'/> */}
				</div>
			</div>
			<div className='header-right'>
				<span className='user-add-button'>
					<UserAddOutlined />
				</span>
			</div>
      	</div>
	);
};

export default Header;
