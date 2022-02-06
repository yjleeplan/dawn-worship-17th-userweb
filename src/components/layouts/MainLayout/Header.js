import { UserAddOutlined } from '@ant-design/icons';
import { Col, Image, Row } from 'antd';
import React, { useState } from 'react';
import logo from '../../../assets/images/logo.png';
import UserAddModal from '../../common/modal/UserAddModal/UserAddModal';

const Header = () => {
	/** State */
	const [userAddModalVisible, setUserAddModalVisible] = useState(false);

	// 사용자 등록 모달 오픈
	const handleUserAddModalOpen = () => {
		setUserAddModalVisible(true);
	};

	// 사용자 등록 모달 닫기
	const handleUserAddModalClose = () => {
		setUserAddModalVisible(false);
	};

	return (
      	<div id='header'>
			<Row>
				<Col span={20}>
					<Image width={102} height={25} src={logo} preview={false} />
				</Col>
				<Col span={4} className='header-right'>
					<span className='user-add-button'>
						<UserAddOutlined onClick={handleUserAddModalOpen}/>
					</span>
				</Col>
			</Row>

			<UserAddModal visible={userAddModalVisible} onCancel={handleUserAddModalClose}/>
      	</div>
	);
};

export default Header;
