import axios from 'axios';
import { message } from 'antd';

let Axios = axios.create({
    timeout: 20000
});
//请求拦截
Axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token;
        return config;
    },
    error => {
        return Promise.error(error);
    })
// // 响应拦截
// Axios.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return Promise.resolve(response);
//         } else {
//             return Promise.reject(response);
//         }
//     },
//     error => {
//         if (error.response.status) {
//             switch (error.response.status) {
//                 case 403:
//                     localStorage.clear()
//                     message.error('权限出错，请重新登录');
//                     window.location.hash = '/login'
//                     break
//                 case 429:
//                     message.error('失败次数过多，请 5 分钟后重试', 5);
//                     break;

//                 // 404请求不存在
//                 case 404:
//                     message.error('网络请求不存在');
//                     break;
//                     // 其他错误，直接抛出错误提示
//                 default:
//                     if(error.response.data=='failed'){
//                         message.error('用户名或密码错误');
//                     }else{
//                         message.error('请求出错');

//                     }
//             }
//             return Promise.reject(error.response);
//         }
//     }
// );
export default Axios;