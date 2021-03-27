// 定义一个 baseUrl, 处理 api 接口源头;

// 生产环境解决跨域问题, 
// * 服务器件中 nginx 将 /apis 解析为 comlibra.com;
// * let productionUrl = "/apis/api/v1"; 

// 直接用 NODE_ENV 判断是生产环境还是开发环境, 避免人工切换;
let productionUrl = "/apis/api/v1";
let developmentUrl = "http://iot.test/api/v1";
let baseUrl = "";
process.env.NODE_ENV === "development" ? baseUrl = developmentUrl : baseUrl = productionUrl;

export default {
    baseUrl
};