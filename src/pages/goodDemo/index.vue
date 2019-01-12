<template>
    <div class="goodDemo-container">
     <h1>{{list.title}}</h1>
     <hr>
     <p v-html="list.content" class="content"></p>
    </div>
</template>
<script>
export default {
    data(){
        return{
        id:this.$route.params.id,
         list:{}
        }
    },
    methods:{
        getInfo(){
            this.$http.get("api/goods/getdesc/"+this.id).then(result=>{
                console.log(result.body)
                if(result.body.status==0){
                    this.list=result.body.message[0]
                }
            })
        }
    },
    created(){
        this.getInfo()

      
    }
}
</script>
<style lang="less">
 .goodDemo-container{
     background-color: #fff;
    
      h1{
          font-size:16px;
          color:blue;
          text-align:center;
          line-height:50px;
           margin:0;
          
      }
      .content{
          padding:0 5px;
          img{
              width:100%;
          }
      }
 }
</style>
