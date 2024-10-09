import React, { FC } from 'react';
import { Empty, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import { useTitle } from 'ahooks';
import styles from './Common.module.scss';
import useLoadParamQuestion from '../../hooks/useLoadParamQuestion';
import ListPage from '../../components/ListPage';
import { Spin } from 'antd';

import Search from '../../components/ListSearch';
const { Title } = Typography;

const Star: FC = () => {
    useTitle('星标问卷');
    const { data = {}, loading } = useLoadParamQuestion({ isStar: true });
    const { list = [], total = 0 } = data;
    return (
        <>
            <div className={styles.header}>
                {/* 左边 */}
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                {/* 右边 */}
                <div className={styles.right}>
                    <Search />
                </div>
            </div >
            <div className={styles.content}>
                {loading && <div style={{ textAlign: 'center' }}><Spin></Spin></div>}
                {(!loading &&list.length === 0) && <Empty description="暂无数据" />}
                {list.length > 0 && list.map((q:any) => {
                    const { _id } = q;
                    return <QuestionCard key={_id} {...q} />
                })}
            </div>

            <div className={styles.footer}>
                <ListPage total = {total}/>
            </div>
        </>
    )
}
export default Star