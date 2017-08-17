import Vue from 'vue';
import { Toast } from 'mint-ui';
import cache from './cache.js';

export default {

   // 自己封装的get请求方法，基本逻辑是优先使用缓存，缓存没有再请求接口
   get(url, success) {

      // 先用缓存
      let data = cache.get(url);
      if(data) {
        success(data);
      }
      // 没有缓存就使用Vue的http静态方法发送请求，请求回来时候先统一做一个判断处理，
      // 如果请求成功把结果传给成功回调。
      else {
        Vue.http.get(url).then(rep => {
            let body = rep.body;
            if(body.status == 0) {
                cache.set(url, body);  // 记得请求回来缓存存储
                success(body);
            }else {
                Toast('请求失败！');
            }
        })
      }

   },

   // 自己封装的post请求方法，基本逻辑是优先使用缓存，缓存没有再请求接口
   post() {

   }

};