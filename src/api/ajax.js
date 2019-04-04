import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data, method='GET') {
  method = method.toUpperCase();

  let promise = null;

  if (method === 'GET') {
    //GET请求
    promise = axios.get(url, {
      params: data
    })
  } else {
    //POST请求
    promise = axios.post(url, data)
  }

  return promise
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('请求失败', err);
      message.error('网络异常，请刷新重试', 2)
    })
}