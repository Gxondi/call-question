import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import { Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import Search from '../../components/ListSearch';
const rawQuestions = [
  { _id: 'q1', title: '问卷1', isPublished: true, isStar: true, answerCount: 5, created: new Date() },
  { _id: 'q2', title: '问卷2', isPublished: false, isStar: false, answerCount: 5, created: new Date() },
  { _id: 'q3', title: '问卷3', isPublished: false, isStar: false, answerCount: 5, created: new Date() }
];
const { Title } = Typography;
const List: FC = () => {
  const [questions, setQuestions] = useState(rawQuestions);
  return (
    <>
      <div className={styles.header}>
        {/* 左边 */}
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        {/* 右边 */}
        <div className={styles.right}>
            <Search/>
        </div>
      </div>

      <div className={styles.content}>
        {questions.length > 0 &&
          questions.map(q => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>上划加载更多</div>
    </>
  );
}

export default List;