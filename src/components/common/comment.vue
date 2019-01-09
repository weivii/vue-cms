<template>
    <div class="comment-container"> 
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" placeholder="请输入要发表的内容（最多发表140字）" maxlength="140" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="pushComment">发表评论</mt-button>
        <div class="comment-list">
            <div class="comment-item" v-for="(item,i) in datalist" :key="item.add_time">
                <div class="comment-title">
                    第{{i+1}}楼 &nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
                </div>
                <div class="comment-body">
                    {{item.content}} 
                </div>
            </div>
        </div>

        <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
           
            msg:"",
            datalist:[],
            pageIndex:1,
        }
    },
    methods:{
        getComment(){
           this.$http.get("api/getcomments/"+this.id+'?pageindex='+this.pageIndex).then(result=>{
            //    console.log(result);
            if(result.body.status===0){
                // this.datalist=result.body.message;
                // 每当获取新评论数据时，不要把老数据青空覆盖，而是把老数据拼接新数据
                this.datalist=this.datalist.concat(result.body.message);
            }else{
              Toast("获取评论失败！");
            }
           });
        },
        pushComment(){
            // 校验是否为空
            if(this.msg.trim().length===0){
                Toast("内容不能为空！");
            }

            this.$http.post("api/postcomment/"+this.$route.params.id,{content:this.msg.trim()}).then(result=>{
                console.log(result);
                if(result.body.status===0){
                    // 思路：将本地的数据全部清空，重新获取第一页的数据
                    // 将现在的数据清空
                    this.datalist=[]
                    // 重置索引
                    this.pageIndex=1
                    // 重新获取评论
                    this.getComment()
                    // 清空文本框
                    this.msg="";
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComment();
        }

    },
    props:["id"],
    created(){
        this.getComment()
    }
}
</script>

<style lang="less">
.comment-container{
    h3{
        font-size:18px;
    }
    textarea{
        height:85px;
        margin-bottom:0;
        font-size:14px;
    }
    .comment-list{
        margin:5px 0;
        .comment-item{
            font-size:14px;
             .comment-title{
            background-color: #ccc;
           line-height:30px;
        }
        .comment-body{
            line-height:35px;
            text-indent:2em;
        }
        }
       
    }
}
</style>

