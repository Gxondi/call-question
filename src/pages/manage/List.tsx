import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './Common.module.scss';
import { Spin, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import Search from '../../components/ListSearch';
import { useTitle, useDebounceFn, useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getAllQuestionService } from '../../services/question';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARMA_KEYWORD } from '../../constants/index';

const { Title } = Typography;
const List: FC = () => {
  // const [list, setList] = useState([]);

  // const [total, setTotal] = useState(0);
  // useEffect(() => {

  //   // 获取数据
  //   async function load() {
  //     const data = await getAllQuestionService();
  //     const { list = [], total = 0 } = data;
  //     setList(list);
  //     setTotal(total);
  //   }
  //   load();
  // }, []);
  useTitle('我的问卷');
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARMA_KEYWORD) || '';
  useEffect(() => {
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);
  //真正加载数据
  const { run: load, loading } = useRequest(async () => {
    const data = await getAllQuestionService({ page, pageSize: LIST_PAGE_SIZE, keyword: keyword});
    return data;
  }, {
    manual: true, //默认不自动加载
    onSuccess: (data) => {
      const { list: newList = [], total = 0 } = data;
      setList(list.concat(newList));
      setTotal(total);
      setPage(page + 1);
    }
  });
  //loadData 尝试触发加载数据--防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: loadData } = useDebounceFn(() => {
    const elme = containerRef.current;
    if (elme == null) return;
    const domRect = elme.getBoundingClientRect();
    if (domRect == null) return;
    const { bottom } = domRect;
    if (bottom <= document.body.clientHeight) {
      load();//加载数据
    };

  }, {
    wait: 1000,
  }
  )
  useEffect(() => {
    loadData();
  }, [searchParams]);
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', loadData) //防抖

    }
    return () => {
      window.removeEventListener('scroll', loadData)
    }
  }, [searchParams,haveMoreData]);

  function LoadMoreContentElement() {
    if(!haveMoreData){
      return <Spin>没有更多数据了</Spin>
    }
    if(total === 0){
      return <Spin>没有更多数据了...</Spin>
    }
    if(loading){
      return <Spin>加载中...</Spin>
    }
    return <Spin>加载中...</Spin>
  }
  return (
    <>
      <div className={styles.header}>
        {/* 左边 */}
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        {/* 右边 */}
        <div className={styles.right}>
          <Search />
        </div>
      </div>
      <div className={styles.content}>
        {(list.length > 0) &&
          list.map((item: any) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>
          {LoadMoreContentElement()}
           </div>
      </div>
    </>
  );
}

export default List;