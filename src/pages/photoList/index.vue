<template>
    <div class="phptoList-container">
        <!-- 头部导航栏 -->
         <div id="maincate" class="maincate" >
            
                <a   v-for="item in ptomsg" :key="item.id" 
                :class=" ['photol', xid==item.id? 'active' : '']" 
                @click = 'getPohtoList(item.id)'>
                    {{item.title}}
                </a>
        </div>
       <!-- 图片列表区域 -->
      <ul class="photo-list">
         <router-link :to="'/home/photoInfo/'+item.id" v-for="item in list" :key="item.id" tag="li">
             <img v-lazy="item.img_url" >
             <div class="info">
                 <h3 class="info-title">{{item.title}}</h3>
                 <div class="info-body">{{item.zhaiyao}}</div>
             </div>
         </router-link>
      </ul>
    </div>
</template>
<script>

// caller', 'callee', and 'arguments' properties  mui.js中用到了webpack默认严格模式下不能用，所以把严格模式关闭，移除严格模式


export default {
    data(){
        return{
            xid:0,
           ptomsg:[],
           list:[]
        }
    },
    mounted(){
    //     mui('.mui-scroll-wrapper').scroll({//若使用区域滚动组件，需手动初始化scroll控件，导入js文件需要手动初始化
	//        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    //    });
    },
    methods:{
    getAllCategory(){
        // 获取全图片
        this.$http.get("api/getimgcategory").then(result=>{
            // console.log(result)
            if(result.body.status==0){
                // 手动拼接一个全部
                result.body.message.unshift({title:"全部",id:0});
                this.ptomsg=result.body.message
            }
        })
    },
   getPohtoList(cateid){
      this.$http.get("api/getimages/"+cateid).then(result=>{
        //   console.log(result)
          if(result.body.status==0){
              this.list=result.body.message
          }
      })
   }
    },
    created(){
        this. getAllCategory()
        this.getPohtoList(0)
    }
}
</script>
<style lang="less" >
.phptoList-container{
    background-color: #fff;
    overflow-x:hidden;
    .maincate {        
            width: 100%;
            height: 40px;
            line-height: 40px;
            white-space: nowrap;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
            overflow-x: scroll;
            overflow-y: hidden;
            // -webkit-backface-visibility: hidden;
            // -webkit-perspective: 1000;
            // -webkit-overflow-scrolling: touch;
            text-align: justify;
            padding: 0px 5px;
            box-sizing: border-box;
                .photol{
                    font-size: 15px;
                 color: inherit;
                 text-decoration: none;
                padding: 0 20px;
                }
            a:active, a:hover{
                    
                    color: #007aff;
                }
        }
        .maincate::-webkit-scrollbar {
            display: none;
        }
        .maincate .active{
            color: #007aff;
        }

        // 图片列表
        .photo-list{
            margin:0;
            padding:10px;
            list-style:none;
            padding-bottom:0;
            li{
                
                position:relative;
                margin-bottom:10px;
                 img {
                    width: 100%;
                    vertical-align: middle;
                    }
                img[lazy="loading"] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                    }


                .info{
                  position:absolute;
                  bottom:0;
                   background-color: rgba(0, 0, 0, 0.4);
                   color:#fff;
                   text-align:left;
                    max-height: 84px;
                   .info-title{
                       font-size:14px;
                   }
                   .info-body{
                       font-size:13px;
                   }
                }
            }
        }

}

</style>
