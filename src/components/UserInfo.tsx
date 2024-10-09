import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { LOGIN_PATHNAME } from "../router/Index";
import { getUserInfoService } from "../services/user";
import { useRequest } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import { deleteToken } from '../utils/userToken';
import { useNavigate } from 'react-router-dom';
const UserInfo: FC = () => {
    const { data } = useRequest(getUserInfoService);
    const nav = useNavigate();
    const { username, nickname } = data || {}
    console.log('username:',username)
    const logout = () => {
        deleteToken()
        message.success('退出成功')
        nav(
            {
                pathname: LOGIN_PATHNAME
            }
        )
    }
    const userInfo = (
        <>
            <span style={{ color: '#e8e8e8' }}>
                <UserOutlined />
                {nickname}        
            </span>
            <Button type="link" onClick={logout}>退出</Button>
        </>
    )
    const login = (
        <Link to={LOGIN_PATHNAME}>登录</Link>
    )
    return (
        <div>
            {username ? userInfo : login}
            
        </div>
    );
};
export default UserInfo;