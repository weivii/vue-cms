<template>
    <div class="goodInfo-container">
        <div class="ball"></div>
       <div class="mui-card">
            <!--内容区-->
            <div class="mui-card-content swaper">
                 <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="(item,index) in LunBo" :key="index">
                        <a :href="item.url">
                            <img :src="item.src" alt="">
                        </a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
         <div class="mui-card">
           
            <div class="mui-card-header">商品名称</div>
            
            <div class="mui-card-content" >
                <p class="price">
                    市场价:<del>￥{{info.market_price}}</del>
                    销售价：<span class="now_price">￥{{info.sell_price}}</span>
                </p>
                <div class="sell">
                   购买数量：
                    <div class="mux-box">
                        <input 
                        type="button" 
                        value="-"
                        @click="buyCount>1&&buyCount--"
                        :disabled="buyCount<1">
                        <input type="text" v-model="buyCount">
                        <input 
                        type="button" 
                        value="+" 
                        @click="buyCount<info.stock_quantity&&buyCount++"
                        :disabled="buyCount>=info.stock_quantity"
                        >
                    </div>
                </div>
                <p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small">加入购物车</mt-button>
                </p>
            </div>
        </div>
         <div class="mui-card">
          
            <div class="mui-card-header">商品参数</div>
            
            <div class="mui-card-content">
                <p>商品货号：{{info.goods_no}}</p>
                <p>库存情况：{{info.stock_quantity}}件</p>
                <p>上架时间：{{info.add_time|dateFormat}}</p>
            </div>
          
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="getDemo(id)">图文介绍</mt-button>
                <mt-button type="danger" plain  size="large" @click="getComment(id)">商品评论</mt-button>
            </div>
           
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           id:this.$route.params.id,
           LunBo:[],
           info:{},
           buyCount:1
        }
    },
    created(){
     this.getLunBo(),
     this.getGood()
    },
    methods:{
        getLunBo(){//轮播图
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                // console.log(result.body)
                if(result.body.status==0){
                    this.LunBo=result.body.message
                }
            })
        },
        getGood(){//获取商品信息
            this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
                // console.log(result.body)
                if(result.body.status==0){
                    this.info=result.body.message[0]
                }
            })
        },
        getDemo(id){
            this.$router.push({name:"goodDemo",params:{id}})
        },
        getComment(id){
            this.$router.push({name:"goodComment",params:{id}})
        }
    }
}
</script>
<style lang="less">
.goodInfo-container{
    background-color: #eee;
    .swaper{
        text-align:center;
        padding:10px;
    }
     .mint-swipe{
         height:200px;
         .mint-swipe-item{
           height:100%;
           img{
              
               height:100%;
           }
           
         }
    }
    // 商品名称
    .price{
        line-height:30px;
    }
    .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .mui-card-content{
     padding-left:10px;
     padding-top:20px;
      padding-bottom:20px;
      
  }
  .sell{
      margin:10px 0;
      .mux-box{
          position: relative;
      display: inline-block;
    //   overflow: hidden;
      width: 220px;
      height: 35px;
      input[type="text"] {
        width: 65px;
        height:35px;
        text-align: center;
      }
      input[type="button"] {
        width: 40px;
        height: 100%;
      }
      }
  }
.ball{
    width:15px;
    height:15px;
    background-color: red;
    border-radius:50%;
    position:absolute;
    top:414px;
    left:165px;
    z-index:99
}
}
</style>
