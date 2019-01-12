<template>
    <div class="photo-container">
        <h2> {{photoInfo.title}}</h2>
        <p class="time">
            <span>发表时间：{{photoInfo.add_time|dateFormat}}</span>
            <span>点击：{{photoInfo.click}}次</span>
        </p>
        <hr>
       <!-- 缩略图区域 -->
       <div class="thumbs">
           <img 
           class="preview-img"
            height="100" 
            v-for="(item,index) in list"
            :src="item.src" 
            :key="index"
            @click="$preview.open(index, list)"
           >
       </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfo.content"></div>
        <comment :id="id"></comment >
    </div>
</template>
<script>
export default {
    data(){
        return{
           photoInfo:{},
           id:this.$route.params.id,
           list:[],//获取缩略图
        }
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                // console.log(result);
                if(result.body.status==0){
                    this.photoInfo=result.body.message[0]
                }
            })
        },
        getgetthumimages(){
            // 获取缩略图
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                console.log(result);
                if(result.body.status==0){
                    // 循环遍历每个图片，设置宽和高
                    result.body.message.forEach(item=>{
                     item.w= 600;
                     item.h= 400;
                    })
                }
                //将缩略图数据放到list中
                this.list=result.body.message;
            })
        }
    },
    created(){
        this.getPhotoInfo(),
        this.getgetthumimages()
    }
}
</script>
<style lang="less">
 .photo-container{
    background-color: #fff;
     h2{
         font-size:15px;
         text-align:center;
         line-height:50px;
         color:blue;
     }
     .time{
          display:flex;
          justify-content:space-between;
     }
     .content{
         font-size:13px;
         line-height:25px;
     }
     .thumbs{
         img{
             margin:10px;
             box-shadow:0  0 8px #999;
         }
     }
 }
</style>
