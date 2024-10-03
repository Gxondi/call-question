import React, { FC, useState } from 'react';
import { Empty, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import { useTitle } from 'ahooks';
import styles from './Common.module.scss';
import Search from '../../components/ListSearch';
const { Title } = Typography;
const rawQuestionList = [
    { _id: 'q1', title: '问卷1', isPublished: true, isStar: true, answerCount: 5, created: new Date() },
    { _id: 'q2', title: '问卷2', isPublished: false, isStar: true, answerCount: 5, created: new Date() },
    { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 5, created: new Date() }
];
const Star: FC = () => {
    useTitle('星标问卷');
    const [questionList, setQuestionList] = useState(rawQuestionList);
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
                {questionList.length === 0 && <Empty description="暂无数据" />}
                {questionList.length > 0 && questionList.map(q => {
                    const { _id } = q;
                    return <QuestionCard key={_id} {...q} />
                })}
            </div>

            <div className={styles.footer}>分页</div>
        </>
    )
}
export default Star