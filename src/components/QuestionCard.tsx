import React, { FC ,useState } from 'react';
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { QUESTION_EDIT_PATHNAME } from '../router/Index';
import { QUESTION_STAT_PATHNAME } from '../router/Index';
import { updateQuestionService , duplicateQuestionService} from '../services/question';
import styles from './QuestionCard.module.scss';
import { useRequest } from 'ahooks';
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
    const createdDate = new Date(created);
    const isValidDate = !isNaN(createdDate.getTime()); // 检查日期是否有效
    const [isStarState,setIsStarState] = useState(isStar);
    // 复制问卷
    const { loading:duplicateLoading , run: duplicateQuestion } = useRequest(async () => {
       const data  = await duplicateQuestionService(_id);
       return data;   
    },{
        manual: true,
        onSuccess: (result) => {
            message.success('复制成功');
            // 跳转到编辑页面
            nav(
                {
                    pathname: `${QUESTION_EDIT_PATHNAME}/${result._id}`,
                }
            );
        }
    });
    // 删除
    const [isDeleted, setIsDeleted] = useState(false);
    const {loading:deleteLoading,run:deleteQuestion} = useRequest(async() => {
        const data = await updateQuestionService(_id, { isDeleted: true });
        return data;
    },{
        manual: true,
        onSuccess: () => {
            message.success('删除成功');
            setIsDeleted(true);
        }
    });
    function del() {
        confirm({
            title: '确认删除该问卷？',
            content: '删除后不可恢复',
            okText: '确定',
            cancelText: '取消',
            onOk:deleteQuestion,
        });
    }
    
   // 标星
    const {loading:changeStarLoding,run:changeStar} = useRequest(async() => {
        await updateQuestionService(_id, { isStar: !isStarState });
    },{
        manual: true,
        onSuccess: () => {
            setIsStarState(!isStarState);
            message.success('操作成功');
        }
    });
    if(isDeleted) return null;

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
                            <span>
                                {isValidDate
                                    ? createdDate.toLocaleString('zh-CN', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })
                                    : '无效日期'}
                            </span>
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
                            <Button icon={<StarOutlined />} type="text" size="small" onClick={changeStar} disabled={changeStarLoding}>
                                {isStarState ? '取消标星' : '标星'}
                            </Button>
                            <Popconfirm
                                title="确认复制该问卷？"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={duplicateQuestion} disabled={duplicateLoading}>
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
                                onClick={() => del()} disabled={deleteLoading}>
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