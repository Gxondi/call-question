import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/userToken';
const instance = axios.create(
    {
        timeout: 1000 * 10,
    }
)
// request 拦截器 统一处理请求头
instance.interceptors.request.use(config => {
    //添加token
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
}, error => Promise.reject(error))

// response 拦截器 统一处理返回值
instance.interceptors.response.use(res => {
    //返回值data转换为对象ResType
    const resData = (res.data || {}) as ResType
    //解析返回值
    const { code, data, msg } = resData
    if (code !== 0) {
        //错误提示
        if (msg) {
            message.error(msg)
        }

        throw new Error(msg || '未知错误')
    }
    return data as any;
}
)

export default instance
export type ResType = {
    code: number,
    data?: ResDataType,
    msg?: string
}
export type ResDataType = {
    [key: string]: any
}