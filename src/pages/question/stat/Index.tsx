import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
const Stat: FC = () => {
    const {loading , data ,error} = useLoadQuestionData()
    return (
        <div>
            <p>统计数据</p>
            {loading ? 'loading' : JSON.stringify(data)}
        </div>
    )
}
export default Stat