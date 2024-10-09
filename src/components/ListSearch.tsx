import React, { FC , useState ,useEffect} from 'react';
import { Input } from "antd" ;
import { useNavigate , useLocation, useSearchParams} from 'react-router-dom';
import { LIST_SEARCH_PARMA_KEYWORD } from '../constants/index';

const { Search } = Input;

const ListSearch: FC= () => {
    const [value, setValue] = useState('');
    const nav = useNavigate();
    const {pathname} = useLocation();
    
    function handlerChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }
 
    function handlerSearch(value: string) {
        //跳转到列表页
        nav(
            {
                pathname: pathname,
                search: `${LIST_SEARCH_PARMA_KEYWORD}=${value}`
            }
        )
        
    }
    const [searchParams] = useSearchParams();
    useEffect(()=>{
        const newValue = searchParams.get(LIST_SEARCH_PARMA_KEYWORD) || '';
        setValue(newValue);
        //searchParams有变化就执行useEffect
    },[searchParams])
    return (
        <Search placeholder="输入关键字" allowClear value={value} onChange={handlerChange} onSearch={handlerSearch} style={{ width: 200 }} />
    )
}
export default ListSearch;