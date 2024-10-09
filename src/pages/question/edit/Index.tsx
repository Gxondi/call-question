import React, { FC, useEffect, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
const Edit: FC = () => {
   const {loading , data } = useLoadQuestionData()
    return (
        <div>
            <p>编辑问卷</p>
            {loading ? 'loading' : JSON.stringify(data)}
        </div>
    )
}
export default Edit