<template>
    <div class="mui-numbox">
        <button class="mui-btn mui-btn-numbox-minus" @click="subtract">-</button>
        <input class="mui-input-numbox" type="number" v-model="value">
        <button class="mui-btn mui-btn-numbox-plus" @click="add">+</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            value:this.initVal || 0
        }
    },
    props:['initVal'],
    methods:{
        add(){
            this.value++;
        },
        // 减
        subtract(){
            this.value&&this.value--;
        },
    },
    // 当值变化时，通过事件的方式传给父
    watch:{//watch是用来监听事件变化的，想监听哪个就写哪个？比如这里的value
        value(){
            this.$emit('change',this.value);
        }
    }
}
</script>
<style>

</style>
