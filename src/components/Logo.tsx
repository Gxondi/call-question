import React from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from './Logo.module.scss';
import { Link } from "react-router-dom";
const Logo = () => {
    const { Title } = Typography;
    return <div className={styles.container}>
        <Link to='/'>
            <Space>
                <Title >
                    <FormOutlined />
                </Title>
                <Title >
                    发财问卷
                </Title>
            </Space>
        </Link>


    </div>;
};
export default Logo;