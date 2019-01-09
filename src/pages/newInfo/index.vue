<template>
    <div class="newInfo-container">
        <!-- 文章标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <div class="subtitle">
            <span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
            <span>点击{{newsinfo.click}}次</span>
        </div>
     <hr>
        <!-- 文章内容 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论组件 -->
    <comment :id="this.id"></comment>
    </div>
</template>
<script>
import {Toast} from "mint-ui" 

export default {
    data(){
        return{
          id:this.$route.params.id,
          newsinfo:{}
        };
    },
   methods:{
       getNewsList() {
      this.$http.get("api/getnew/"+this.id).then(result => {
        //   console.log(result);
        if(result.body.status==0){
            this.newsinfo=result.body.message[0]
        }else{
          Toast("获取新闻失败！");
        }
       
        });
    }
    },
     created(){
        this. getNewsList()
    },
}
</script>
<style lang="less">
  .newInfo-container{
      background-color: #fff;
      padding:0 4px;
      .title{
          color:red;
          font-size:16px;
          text-align:center;
          line-height:40px;
      }
      .subtitle{
          display:flex;
          justify-content:space-between;
          color:blue;
          font-size:14px;
      }
  }
</style>
