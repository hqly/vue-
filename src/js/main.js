// 导入第三方包
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import MintUI from 'mint-ui';//MintUI是vue插件，需要手动use才可以使用
import 'mint-ui/lib/style.css';//引入样式库还需单独导入css
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';//引入mui的扩展图标样式

//手动use启用插件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);


// 导入自己的东西

// 导入过滤器
import Filter from './filter';
Vue.use(Filter);

// 导入组件
import App from '../component/App.vue'//根组件

// 导入路由对象
import router from './router.js';

// 创建一个vue实例，关联视图
new Vue({
    el:'#app',
    render:c=>c(App),
    router
});
