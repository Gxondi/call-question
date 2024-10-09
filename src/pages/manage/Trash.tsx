import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import Search from '../../components/ListSearch';
import { updateQuestionService, deleteQuestionService } from '../../services/question';
import { Spin } from 'antd';
import ListPage from '../../components/ListPage';
import { useRequest, useTitle } from 'ahooks';

import { Empty, Typography, Table, Tag, Space, Button, Modal, message } from 'antd';
import useLoadParamQuestion from '../../hooks/useLoadParamQuestion';

const { Title } = Typography;
const { confirm } = Modal;
const Trash: FC = () => {

    useTitle('回收站');
    const { data = {}, loading, refresh } = useLoadParamQuestion({ isDeleted: true });
    const { list = [], total = 0 } = data;
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([]);
    //const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const { run: reCover } = useRequest(async () => {
        for await (const id of selectedRowKeys) {
            await updateQuestionService(id, { isDeleted: false });
        }
    },
        {
            manual: true,
            //防抖
            debounceWait: 500,
            onSuccess: () => {
                message.success('还原成功')
                refresh()
                setSelectedRowKeys([])
            }
        }
    );

    const { run: deleteQuestion } = useRequest(async () => {
        await deleteQuestionService(selectedRowKeys);
    }, {
        manual: true,
        debounceWait: 500,

        onSuccess: () => {
            message.success('删除成功')
            refresh()
            setSelectedRowKeys([])
        }
    });
    function del() {
        confirm({
            title: '确认删除该问卷？',
            content: '删除后不可恢复',
            okText: '确定',
            cancelText: '取消',
            onOk: deleteQuestion
        });
    }

    const tableColumns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '发布状态',
            dataIndex: 'isPublished',
            render: (isPublished: boolean) => isPublished ? <Tag>已发布</Tag> : <Tag>未发布</Tag>,
            key: 'isPublished',
        },
        {
            title: '答卷数',
            dataIndex: 'answerCount',
            key: 'answerCount',
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            //render是一个函数，参数是created，返回值是created.toLocaleDateString()
            render: (created: string) => {
                const date = new Date(created);
                return date.toLocaleDateString();
            },
            key: 'created',
        },
    ];

    //jsx片段设置成一个变量
    const TableElem = (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Space>
                    <Button type='primary' disabled={selectedRowKeys.length === 0} onClick={reCover}>还原</Button>
                    <Button danger disabled={selectedRowKeys.length === 0} onClick={del}>彻底删除</Button>
                </Space>
            </div>

            <Table
                columns={tableColumns}
                pagination={false}
                dataSource={list}
                rowKey={(q: any) => q._id}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys) => {
                        setSelectedRowKeys(selectedRowKeys as string[]);
                    }
                }}
            />
        </>

    )
    return (
        <>

            <div className={styles.header}>
                {/* 左边 */}
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                {/* 右边 */}
                <div className={styles.right}>
                    <Search />
                </div>
            </div >

            <div className={styles.content}>
                {loading && <div style={{ textAlign: 'center' }}><Spin></Spin></div>}
                {(!loading && list.length === 0) && <Empty description="暂无数据" />}
                {list.length > 0 && TableElem}
            </div>
            <div className={styles.footer}>
                <ListPage total = {total}/>
            </div>
        </>
    )
}
export default Trash