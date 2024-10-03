import React, { FC } from 'react';
import { Button, Space, Divider, Tag, Popconfirm, Modal ,message} from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { QUESTION_EDIT_PATHNAME } from '../router/Index';
import { QUESTION_STAT_PATHNAME } from '../router/Index';
import styles from './QuestionCard.module.scss';
const { confirm } = Modal;

type PropsType = {
    _id: string;
    title: string;
    isPublished: boolean;
    isStar: boolean;
    answerCount: number;
    created: Date;
}

const QuestionCard: FC<PropsType> = (Props: PropsType) => {
    const nav = useNavigate();
    const { _id, title, created, answerCount, isPublished, isStar } = Props;
    function duplicate() {
        message.success('复制成功');
    }
    function del() {
        confirm({
            title: '确认删除该问卷？',
            content: '删除后不可恢复',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                message.success('删除成功');
            }
        });
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.left}>
                        <Link to={isPublished ? (`${QUESTION_STAT_PATHNAME}/${_id}`) : (`${QUESTION_EDIT_PATHNAME}/${_id}`)}>
                            <Space>
                                {isStar ? <StarOutlined style={{ color: 'red' }} /> : <StarOutlined />}
                                {title}
                            </Space>

                        </Link>
                    </div>
                    <div className={styles.right}>
                        <Space>
                            {isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>}
                            &nbsp;
                            <span>答卷：{answerCount}</span>
                            &nbsp;
                            <span>{created.toLocaleDateString()}</span>
                        </Space>
                    </div>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <div className={styles['button-container']}>
                    <div className={styles.left}>
                        <Space>
                            <Button
                                icon={<EditOutlined />}
                                type="text"
                                size="small"
                                onClick={() => nav(`${QUESTION_EDIT_PATHNAME}/${_id}`)}>
                                编辑问卷
                            </Button>
                            <Button
                                icon={<LineChartOutlined />}
                                type="text"
                                size="small"
                                onClick={() => nav(`${QUESTION_STAT_PATHNAME}/${_id}`)}
                                disabled={!isPublished}>
                                数据统计
                            </Button>
                        </Space>
                    </div>

                    <div className={styles.right}>
                        <Space>
                            <Button
                                icon={<StarOutlined />}
                                type="text"
                                size="small">
                                {isStar ? '取消标星' : '标星'}
                            </Button>
                            <Popconfirm
                                title="确认复制该问卷？"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={duplicate}>
                                <Button
                                    icon={<CopyOutlined />}
                                    type="text"
                                    size="small">复制
                                </Button>
                            </Popconfirm>
                            <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                size="small"
                                onClick={() => del()}>
                                删除
                            </Button>
                        </Space>

                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestionCard;