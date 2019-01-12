<template>
    <div class="goodList-container">
        <div class="good-list" v-for="item in list" :key="item.id" @click="getGoodInfo(item.id)">
            <img :src="item.img_url" >
            <h1>{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="new">￥{{item.sell_price}}</span>
                    <del class="old">￥{{item.market_price}}</del>
                </p>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <!-- 加载更多 -->
        <mt-button v-if="hasMore" type="danger" @click="getMore" size="large">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
         pageIndex:1,
         list:[],
         hasMore:true
        }
    },
    methods:{
      getGoodList(){
         this.$http.get("api/getgoods?pageIndex="+this.pageIndex).then(result=>{
             console.log(result.body);
             if(result.body.status==0){
                //  this.list=result.body.message
                this.list=this.list.concat(result.body.message)
                if(result.body.message.length==0){
                    this.hasMore=false;
                }
             }
         })
      },
      getMore(){
          this.pageIndex++;
          this.getGoodList();
      },
      getGoodInfo(id){
         this.$router.push({name:"goodInfo",params:{id}})
      }
    },
    created(){
       this.getGoodList()
    },
}
</script>
<style lang="less">
 .goodList-container{
     display:flex;
     flex-wrap: wrap;
     justify-content: space-between;
     padding:7px;
     .good-list{
         width:49%;
        border:1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin:4px 0;
         img{
             width:100%;
         }
         h1{
             font-size:14px;
             
         }
         .info{
             background-color: #eee;
         }
         .price{
             .new{
                 color:red;
                 font-size:18px;
                 font-weight:700;
                 margin-right:10px;
             }
             .old{
                 text-decoration: line-through;
                 font-size:12px;
             }
         }
         .sell{
             display:flex;
             justify-content:space-between;
              font-size: 14px;
             
         }
     }
 }
</style>

