import React, { FC } from 'react';
import { Button, Form, Input, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { LOGIN_PATHNAME } from '../router/Index';
import { UserAddOutlined } from '@ant-design/icons';
const { Title } = Typography;
const Register: FC = () => {

    const onFinish = (values: any)=>{
        console.log(values)
    }
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined></UserAddOutlined>
                    </Title>
                    <Title level={2}>
                        注册新用户
                    </Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { type:'string',min:6,max:12,message:'用户名长度为6-12位'},
                            { pattern: /^[a-zA-Z0-9]+$/,message: '用户名只能包含字母和数字'}
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密  码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: '请输入密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次密码不一致'));
                                },
                            }),
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="昵称"
                        name="nickname"
                        rules={[
                            { required: true, message: '请输入昵称' },
                            {type:'string',min:6,max:12,message:'昵称长度为6-12位'}
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                            <Link to={LOGIN_PATHNAME}>
                                已有账号，去登录
                            </Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
export default Register