<template>
    <section class="goods-list">
        <v-title :title="title"></v-title>
        <ul class="mui-table-view mui-grid-view">
            <!-- 商品详情 -->
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list" :key="item.id">
                <router-link :to="{name:'goodsD',params:{id:item.id}}">
                    <div class="mui-card">
                        <!-- 商品图片 -->
                        <div class="mui-card-header">
                            <img :src="item.img_url" />
                        </div>
                        <!-- 商品描述 -->
                        <div class="mui-card-footer ">
                            <p class="mui-ellipsis-2">{{item.title}}</p>
                        </div>
                        <!-- 商品价格 -->
                        <div class="mui-card-content">
                            <p class="price">
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </p>
                            <p class="tip">
                                <span>热卖中</span>
                                <span>剩余{{item.stock_quantity}}件</span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        <!-- 加载更多 -->
        <button @click="getList" ref="loadMoreBtn" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">加载更多</button>
    </section>
</template>
<script>
import config from '../../js/config.js';
import Ctitle from '../common/title.vue';
export default {
    data() {
        return {
            title: '商品列表',
            pageindex: 1,
            list: []
        }
    },
    methods: {
        // 获取商品列表
        getList() {
            let url = config.goodsList + '?pageindex=' + this.pageindex;
            this.$http.get(url).then(rep => {
                let body = rep.body;
                // 因为有加载更多按钮，一页一页累加数据
                if (body.status == 0 && body.message.length > 0) {
                    this.list.push(...body.message);
                    this.pageindex++;
                }
            })
        }
    },
    created() {
        this.getList();
    },
    components: {
        'v-title': Ctitle
    }
}
</script>
<style lang="less">
.mui-card {
    .mui-card-header {
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>