import Search from 'antd/es/transfer/search'
import axios, { ResDataType } from './ajax'
type SearchOption = {
    keyword: string;
    isStar: boolean;
    isDeleted: boolean;
    page: number;
    pageSize: number;
}

//获取单个问卷
export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = (await axios.get(url)) as ResDataType
    return data
}
//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
    const url = `/api/question`;
    try {
        const data = (await axios.post(url)) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}
//获取所有问卷
export async function getAllQuestionService(opt: Partial<SearchOption> = {}): Promise<ResDataType> {
    const url = `/api/question`;
    try {
        const data = (await axios.get(url, { params: opt })) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}

//标星
export async function updateQuestionService(id: string, opt: { [key: string]: any }): Promise<ResDataType> {
    const url = `/api/question/${id}`;
    try {
        const data = (await axios.patch(url, { params: opt })) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}

//复制
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`;
    try {
        const data = (await axios.post(url)) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}

//删除
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
    const url = `/api/question/${ids}`;
    try {
        const data = (await axios.post(url, { data: { ids } })) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}