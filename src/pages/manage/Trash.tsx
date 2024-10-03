import React, { FC } from 'react';
import styles from './Common.module.scss';
import Search from '../../components/ListSearch';
import { useTitle } from 'ahooks';

import { Empty, Typography, Table, Tag, Space, Button, Modal, message } from 'antd';

const rawQuestionList = [
    { _id: 'q1', title: '问卷1', isPublished: true, isStar: false, answerCount: 544412, created: new Date() },
    { _id: 'q2', title: '问卷2', isPublished: false, isStar: false, answerCount: 22333, created: new Date() },
    { _id: 'q3', title: '问卷3', isPublished: false, isStar: false, answerCount: 565651, created: new Date() }
];
const { Title } = Typography;
const { confirm } = Modal;
const Trash: FC = () => {

    useTitle('回收站');
    const [questionList, setQuestionList] = React.useState(rawQuestionList);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([]);
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
            render: (created: Date) => created.toLocaleDateString(),
            key: 'created',
        },
    ];
    //jsx片段设置成一个变量
    const TableElem = (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Space>
                    <Button type='primary' disabled={selectedRowKeys.length === 0}>还原</Button>
                    <Button danger disabled={selectedRowKeys.length === 0} onClick={() => del()}>彻底删除</Button>
                </Space>
            </div>

            <Table
                columns={tableColumns}
                dataSource={questionList}
                rowKey={q => q._id}
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
                {questionList.length === 0 && <Empty description="暂无数据" />}
                {questionList.length > 0 && TableElem}
            </div>

            <div className={styles.footer}>分页</div>
        </>
    )
}
export default Trash