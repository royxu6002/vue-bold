// 本地开发环境
// const baseUrl = "http://iot.test/api/v1";

// 生产环境解决跨域问题, 
// const baseUrl = "/apis/api/v1";

// 直接用 NODE_ENV 判断是生产环境还是开发环境, 避免人工切换;
let productionUrl = "/apis/api/v1";
let developmentUrl = "http://iot.test/api/v1";
let baseUrl = "";
process.env.NODE_ENV === "development" ? baseUrl = developmentUrl : baseUrl = productionUrl;

export default {
    baseUrl
};