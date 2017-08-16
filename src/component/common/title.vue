<template>
    <section class="list mint-header">

        <div class="mint-header-button is-left">
            <button @click="rollback" class="mint-button mint-button--default mint-button--normal">
                <i class="mintui mintui-back"></i>
                <label class="mint-button-text">返回</label>
            </button>
        </div>
        <h1 class="mint-header-title">新闻资讯</h1>
        <div class="mint-header-button is-right"></div>

    </section>
</template>
<script>
export default {
    // 接收来自父指定的title数据
    props: ['title'],
    methods: {
        // 调用返回上一页
        rollback() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less">
.list {
    background-color: #ccc;
}
</style>
