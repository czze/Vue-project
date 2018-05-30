<template>
    <div>
        <div @click="subtract" class="left">-</div>
        <div class="center">{{count}}</div>
        <div @click="add" class="right">+</div>
    </div>
</template>

<style scoped>
    .left, .center, .right {
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        display: inline-block;
        text-align: center;
        line-height: 30px;
    }
</style>


<script>
    export default {
        props:['goodsCount','goodsId'],
        data(){
            return{
                count:1,
            }
        },
        created(){
            this.count = this.goodsCount;
        },
        methods:{
            subtract(){
                if(this.count<=1) return;
                this.count--;

                this.notify();
            },
            add(){
                this.count++;

                this.notify();
            },
            notify(){
                const goods = {
                    goodsId: this.goodsId,
                    count: this.count
                }

                this.$emit('goodsCountChange',goods)
                
            }

        }
    }
</script>
