import React, { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from "antd";
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import styles from './ManageLayout.module.scss';
import { createQuestionService } from '../services/question';


const ManagetLayout: FC = () => {

    const nav = useNavigate()
    const { pathname } = useLocation()
    //useRequest代替 errppr,loading,data
    // const [loading, setLoading] = useState(false)
    // async function createQuestionHandler() {
    //     setLoading(true);
    //     try {
    //         const data = await createQuestionService();
    //         const { id } = data || {};
    //         if (id) {
    //             nav(`/question/edit/${id}`);
    //             message.success('创建问卷成功');
    //         } else {
    //             message.error('创建问卷失败');
    //         }
    //     } catch (error) {
    //         console.error('Error creating question:', error);
    //         message.error('创建问卷失败');
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    const { loading, error, run: createQuestionHandler } = useRequest(createQuestionService, {
        manual: true,
        onSuccess: (data) => {
            const { id } = data || {};
            if (id) {
                nav(`/question/edit/${id}`);
                message.success('创建问卷成功');
            } else {
                message.error('创建问卷失败');
            }
        },
    })
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Space direction="vertical">
                    <Button type='primary' size='large' icon={<PlusOutlined />} onClick={createQuestionHandler} disabled={loading}>
                        创建问卷
                    </Button>
                    <Divider style={{ borderTop: 'transparent' }} />
                    <Button
                        type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
                        size='large'
                        icon={<BarsOutlined />}
                        onClick={() => nav('/manage/list')}>
                        我的问卷
                    </Button>

                    <Button
                        type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
                        size='large'
                        icon={<StarOutlined />}
                        onClick={() => nav('/manage/star')}>
                        星标问卷
                    </Button>

                    <Button
                        type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
                        size='large'
                        icon={<DeleteOutlined />}
                        onClick={() => nav('/manage/trash')}>
                        回收站
                    </Button>
                </Space>


            </div>

            <div className={styles.right}>
                <Outlet />
            </div>


        </div>

    )
}
export default ManagetLayout