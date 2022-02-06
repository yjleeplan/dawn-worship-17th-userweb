import { Image, message } from 'antd';
import React, { useState } from 'react';
import * as api from '../../api';
import btn1 from '../../assets/images/btn_1.png';
import btn2 from '../../assets/images/btn_2.png';
import btn3 from '../../assets/images/btn_3.png';
import btn4 from '../../assets/images/btn_4.png';
import btn5 from '../../assets/images/btn_5.png';
import btn6 from '../../assets/images/btn_6.png';
import complete from '../../assets/images/btn_complete.png';
import soon from '../../assets/images/btn_soon.png';

const Stamp = ({ data, index, attendanceId, onSelectUser }) => {
    const [disabled, setDisabled] = useState(true);

    const getStamp = () => {
        const today = new Date();

        switch(index) {
            case 0:
                // today.getDate() === 14 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 14 ? btn1 : soon;
                return data === "Y" ? complete : btn1;
            case 1:
                // today.getDate() === 15 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 15 ? btn2 : soon;
                return data === "Y" ? complete : btn2;
            case 2:
                // today.getDate() === 16 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 16 ? btn3 : soon;   
                return data === "Y" ? complete : btn3;
            case 3:
                // today.getDate() === 17 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 17 ? btn4 : soon;
                return data === "Y" ? complete : btn4;
            case 4:
                // today.getDate() === 18 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 18 ? btn5 : soon;
                return data === "Y" ? complete : btn5;
            case 5:
                // today.getDate() === 19 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 19 ? btn6 : soon;
                return data === "Y" ? complete : btn6;
            case 6:
                today.getDate() === 21 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 21 ? btn7 : soon;
                return soon;
            case 7:
                today.getDate() === 22 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 22 ? btn8 : soon;
                return soon;
            case 8:
                today.getDate() === 23 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 23 ? btn9 : soon;
                return soon;
            case 9:
                today.getDate() === 24 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 24 ? btn10 : soon;
                return soon;
            case 10:
                today.getDate() === 25 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 25 ? btn11 : soon;
                return soon;
            case 11:
                today.getDate() === 26 && setDisabled(true);
                // return data === "Y" ? complete : today.getDate() === 26 ? btn12 : soon;
                return soon;
                
            default:
                return false;
        };
    };

    // 출석
    const handleUpdatedAttendance = async () => {
        if (!disabled) {
            try {
                await api.updatedAttendance({
                    path: { attendance_id: attendanceId },
                    data: { [`day${Number(index) + 1}`]: "Y" }
                });
                onSelectUser();
            } catch (error) {
                message.error(error.response ? `${error.response.data.code}, ${error.response.data.message}` : "출석 실패");
            }
        }
    };

    return (
        <div>
            <Image src={getStamp()} preview={false} onClick={handleUpdatedAttendance}/>
            {Number(index) + 1}일차
        </div>
    );
}

export default Stamp;