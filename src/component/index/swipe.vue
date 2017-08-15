<template>
    <section class="swipe">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(item,i) in list" :key="i">
                <a :href="item.url">
                    <img :src="item.img" />
                </a>
            </mt-swipe-item>

        </mt-swipe>
    </section>
</template>

<script>
export default {
    data() {
        return {
            // 轮播图列表数据
            list: []
        };
    },
    methods: {
        // 获取轮播图数据的方法

        getLunbo() {
            let url = 'http://139.199.192.48:8888/api/getlunbo';
            this.$http.get(url).then(req => {
                console.log(req);
                if (req.body.status == 0) {
                    this.list = req.body.message;
                }
            })
        }
    },
    created() {
        this.getLunbo();
    }
}
</script>

<style lang="less">
.swipe {
    height: 300px;
    img {
        width: 100%;
    }
}
</style>
