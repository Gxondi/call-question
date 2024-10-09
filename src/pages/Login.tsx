import React, { FC ,useEffect} from 'react';
import { Button, Form, Input, Checkbox, Typography, Space, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link ,useNavigate } from 'react-router-dom';
import { REGISTER_PATHNAME } from '../router/Index';
import styles from './Login.module.scss';
import { loginService } from '../services/user';
import { useRequest } from 'ahooks';
import { MANAGE_LIST_PATHNAME } from '../router/Index';
import { setToken } from '../utils/userToken';
const { Title } = Typography;

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

const Login: FC = () => {
    const [form] = Form.useForm();
    //记住用户名
    function rememberUsername(username: string, password: string) {
        localStorage.setItem(USERNAME_KEY, username)
        localStorage.setItem(PASSWORD_KEY, password)
    }
    //删除用户名
    function deleteUsername() {
        localStorage.removeItem(USERNAME_KEY)
        localStorage.removeItem(PASSWORD_KEY)
    }
    //获取用户名
    function getUserInfo(){
        const username = localStorage.getItem(USERNAME_KEY)
        const password = localStorage.getItem(PASSWORD_KEY)
        return {username,password}
    }
    useEffect(()=>{
        const{username,password} = getUserInfo()
        //设置表单的值
        form.setFieldsValue({ username, password })
    },)
    const nav = useNavigate();
    const { run } = useRequest(async (values) => {
        const { username, password } = values;
        const data = await loginService(username, password);
        return data
    }, {
        manual: true,
        onSuccess: (result) => {
            const { token = '' } = result
            //设置token
            setToken(token)
            message.success('登录成功')
            nav(
                {
                    pathname: MANAGE_LIST_PATHNAME
                }
            )
        }
    });
    const onFinish = (values: any) => {
        const {username,password,remember} = values || {}
        run(values)
        if (remember) {
            rememberUsername(username,password)
        } else {
            deleteUsername()
        }
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
                        用户登录
                    </Title>
                </Space>
            </div>
            <div>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{remember:true}}>
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
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            <Link to={REGISTER_PATHNAME}>
                                没有账号，去注册
                            </Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
export default Login