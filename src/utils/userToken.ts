const KEY = 'userToken'
//获取token
export function getToken() {
    return localStorage.getItem(KEY) || ''
}
//设置token
export function setToken(token: string) {
    localStorage.setItem(KEY, token)
}
//删除token
export function deleteToken() {
    localStorage.removeItem(KEY)
}