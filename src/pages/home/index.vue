<template>
    <div class="home-container">
         <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
         </mt-swipe>
         <!-- 九宫格改六宫格 -->
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <!-- /home的目的是为了路由切换的高亮显示 -->
                    <router-link to="/home/newsList">
                    <img src="../../assets/menu1.png" alt>
                    <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photoList">
                    <img src="../../assets/menu2.png" alt>
                    <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <img src="../../assets/menu3.png" alt>
                    <div class="mui-media-body">商品购买</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <img src="../../assets/menu4.png" alt>
                    <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <img src="../../assets/menu5.png" alt>
                    <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <img src="../../assets/menu6.png" alt>
                    <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
                </ul>
    </div>
</template>
<script>
import{Toast} from "mint-ui"
export default {
    data(){
        return {
           bannerList:[]
        };
    },
    created(){
      this.getBannerData();
    },
    methods:{
        getBannerData(){
            this.$http.get('api/getlunbo').then(result=>{
                // console.log(result.body)
                if(result.body.status===0){
                    this.bannerList=result.body.message;
                }else{
                    Toast("获取失败，请重试！")
                }
            });
        }
    }
}
</script>
<style lang="less">
.home-container{
    .mint-swipe{
         height:200px;
         .mint-swipe-item{
           height:100%;
           img{
               width:100%;
               height:100%;
           }
           
         }
    }
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    .mui-table-view-cell {
      border: 0;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .mui-media-body {
      font-size: 13px;
    }
  }
}
</style>
