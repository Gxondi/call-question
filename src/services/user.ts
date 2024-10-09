import Search from 'antd/es/transfer/search'
import axios, { ResDataType } from './ajax'

export async function getUserInfoService(): Promise<ResDataType> {
    const url = `/api/user/info`;
    try {
        const data = (await axios.get(url)) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}
//注册
export async function registerService(username:string,password:string,nickname? :string): Promise<ResDataType> {
    const url = `/api/user/register`;
    try {
        const body = { username, password, nickname: nickname ? nickname : username };
        const data = (await axios.post(url, body)) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}
//登录
export async function loginService(username:string,password:string): Promise<ResDataType> {
    const url = `/api/user/login`;
    try {
        const body = { username, password };
        const data = (await axios.post(url, body)) as ResDataType;
        return data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error; // 重新抛出错误以便上层捕获
    }
}