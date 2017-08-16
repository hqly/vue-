<template>
    <section class="swipe">
        <!-- 标题 -->
        <v-title :title="title"></v-title>
        <!-- 轮播图 -->
        <v-swipe :list="lunbos"></v-swipe>
        <!-- 商品购买 -->
        <div class="mui-card">
            <!-- 名称 -->
            <div class="mui-card-header">{{goods.title}}</div>
            <!-- 价格 -->
            <div class="mui-card-content mui-card-content-inner">
                <div class="price">
                    <s>市场价:￥{{goods.market_price}}</s>
                    <span>销售价: </span>
                    <em>￥{{goods.sell_price}}</em>
                </div>
                <div>
                    <span>购买数量：</span>
                    <!--数字输入框 -->
                    <v-numbox :initVal="total" @change="upTotal"></v-numbox>
                    <!--<div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus">-</button>
                        <input class="mui-input-numbox" type="number">
                        <button class="mui-btn mui-btn-numbox-plus">+</button>
                    </div>-->
                </div>
            </div>
            <!-- 按钮 -->
            <div class="mui-card-footer">
                <button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">结算</button>
                <div></div>
                <button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">加入购物车</button>
            </div>
        </div>

        <!-- 评论与介绍 -->
        <!--<div class="mui-card">

            <mt-navbar v-model="selectedTab">
                <mt-tab-item id="comment">商品评论</mt-tab-item>
                <mt-tab-item id="info">图文介绍</mt-tab-item>
            </mt-navbar>

            <mt-tab-container v-model="selectedTab">
                <mt-tab-container-item id="comment">
                    <v-comment :id="id"></v-comment>
                </mt-tab-container-item>
                <mt-tab-container-item id="info">
                    <v-info :id="id"></v-info>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>-->
             <div class="mui-card">
            <!-- 选项卡 -->
            <mt-navbar v-model="selectedTab">
                <mt-tab-item id="comment">商品评论</mt-tab-item>
                <mt-tab-item id="info">图文介绍</mt-tab-item>
            </mt-navbar>
            <!-- 显示内容，需要传入id，需要根据is值来控制组件的切换 -->
           <component :id="id" :is="selectedTab"></component>
        </div>
    </section>
</template>
<script>
import config from '../../js/config.js';
import goodsStorage from '../../js/model/goods.js';
import Ctitle from '../common/title.vue';
import Cswipe from '../index/swipe.vue';
import Ccomment from '../common/comment.vue';
import Cnumbox from '../common/numbox.vue';
import Cinfo from './son/info.vue'
export default {
    data() {
        return {
            title: '商品购买',
            lubos: [],
            goods: {},
            selectedTab: '',
            id: this.$route.params.id,
            total:0
        }
    },
    methods: {
        //获取轮播数据
        getLunbos() {
            let url = config.photoHums + this.$route.params.id;
            this.$http.get(url).then(rep => {
                let body = rep.body;
                if (body.status == 0) {
                    this.lunbos = body.message.map(item => {
                        item.src = config.imgDomain + tem.src;
                        return item;
                    })
                }
            })
        },
        // 获取商品价格信息
        getPrice(){
            let url=config.goodsPrice+this.id;
            this.$http.get(url).then(rep=>{
                let body=rep.body;
                if(body.status==0){
                    this.goods=body.message[0];
                }
            })
        },
        // 更新商品的选择数量
        upTotal(v){
            this.total=v
        },
        // 加入购物车
        addShopcart(){
            document.querySelector('.mui-badge').innerHTML=this.total;
        }
    },
    created() {
        this.getLunbos();
        this.getPrice();
    },
    comments: {
        'v-title': Ctitle,
        'v-swipe': Cswipe,
        'v-comment': Ccomment,
        'v-info': Cinfo,
        'v-numbox':Cnumbox
    }
}
</script>
<style>

</style>
