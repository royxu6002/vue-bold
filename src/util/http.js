import axios from "axios";

// 请求拦截器
axios.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("cle_api_token");
  if(!isEmpty(token)) {
  	config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
}, (err) => {
	return Promise.reject(err);
});

/* 自定义一个函数, 判断是否为空 */
function isEmpty(str){
  if(str === '' || str === null || str === undefined){
    return true;
  }
  return false;
}

// > 考虑再添加一个相应拦截器
// > 把 axios 方法按 Promise 方法封装

// 设置对外出口
export default axios;