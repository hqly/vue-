<template>
    <article class="goods-detail">
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
                <button @click="addShopcart" type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">加入购物车</button>
            </div>
        </div>

        <!-- 评论与介绍 -->
             <div class="mui-card">
            <!-- 选项卡 -->
            <mt-navbar v-model="selectedTab">
                <mt-tab-item id="v-comment">商品评论</mt-tab-item>
                <mt-tab-item id="v-info">图文介绍</mt-tab-item>
            </mt-navbar>
            <!-- 显示内容，需要传入id，需要根据is值来控制组件的切换 -->
           <component :id="id" :is="selectedTab"></component>
        </div>
    </article>
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
            title: '商品详情',
            lunbos: [],
            goods: {},
            selectedTab: '',
            id: this.$route.params.id,
            total:goodsStorage.get(this.$route.params.id)
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
                        item.src = config.imgDomain + item.src;
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
            this.total=v;
        },
        // 加入购物车
        addShopcart(){
            goodsStorage.set(this.id,this.total);
            document.querySelector('.mui-badge').innerHTML=goodsStorage.get();
        }
    },
    created() {
        this.getLunbos();
        this.getPrice();
    },
    components: {
        'v-title': Ctitle,
        'v-swipe': Cswipe,
        'v-comment': Ccomment,
        'v-info': Cinfo,
        'v-numbox':Cnumbox
    }
}
</script>
<style lang="less">
  .goods-detail {
    .mui-card-content {
      .price {
        color: rgb(51, 51, 51);
        margin-bottom: 4px;
        span {
          margin-left: 6px;
        }
        em {
          font-size: 18px;
          color: red;
        }
      }
    }
    .mui-card-footer {
      div {
        width: 100%;
      }
      .mui-btn {
        padding: 8px 0;
        font-size: 16px;
      }
    }
    .mint-tab-item {
    	&.is-selected {
    		margin-bottom: 0;
    		border-bottom: 3px solid #2ce094;
    		color: #2ce094;
    	}
    }
    .mint-tab-item-label {
    	font-size: 18px;
    	color: #2ce094;
    }
  }
</style>
