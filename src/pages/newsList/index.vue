<template>
    <div>
       <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in dataList" :key="item.id">
                <router-link :to="'/home/newInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time|dateFormat}}</span>
                            <span>点击{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dataList:[]
        }
    },
    methods:{
         getDataList(){
             this.$http.get("api/getnewslist").then(result=>{
                //  console.log(result)
                if(result.body.status==0){
                    this.dataList=result.body.message
                }
             })
         }
    },
    created(){
       this.getDataList()
    }

}
</script>
<style lang="less">
   .mui-table-view{
      .mui-media-body{
          h1{
              font-size:14px;
          }
          .mui-ellipsis{
              display:flex;
              justify-content:space-between;
              
                  color:#226aff;
              
          }
      }
   }
</style>

