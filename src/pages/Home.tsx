import React, { FC, useEffect } from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MANAGE_LIST_PATHNAME } from '../router/Index';
import '../_mock/index';
import axios from 'axios';
import styles from './Home.module.scss';
const { Title, Paragraph } = Typography;

const Home: FC = () => {
    const nav = useNavigate();
    useEffect(()=>{
        axios.get('/api/test').then(res=>{
            console.log(res)
        })
    })
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div>
                    <Title>问卷调查 | 在线投票</Title>
                    <Paragraph>已累计创建问卷 100份，发布问卷 5000份，收到答卷54612份</Paragraph>
                </div>
                <div>
                    <Button
                        type='primary'
                        onClick={() => nav(MANAGE_LIST_PATHNAME)}>
                        开始使用
                    </Button>
                </div>
            </div>
        </div>

    )
}
export default Home