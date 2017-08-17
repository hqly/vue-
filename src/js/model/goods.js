import storage from '../common/storage.js';
const storageKey = 'goodsTotal';
let goodsTotal = storage.get(storageKey) || {};
export default {
    // 根据id存储选择数量
    set(id, total) {
        goodsTotal[id] = total;
        storage.set(storageKey, goodsTotal);
    },
    get(id) {
        if (id) {
            return goodsTotal[id] || 0;
        } else {
            let totals=this.getTotalList();
            return totals.length && totals.reduce((v1,v2)=>(+v1)+(+v2));
        }
    },
    // 根据id删除对应商品的数量，删除后记得持久化存储最新结果
    remove(id){
        delete goodsTotal[id];
        storage.set(storageKey,goodsTotal);
    },
    // 获取所有id组成的数组
    getIDList(){
        return Object.keys(goodsTotal);
    },
    // 获取所有total组成的数组
    getTotalList(){
        return Object.values(goodsTotal);
    }
}