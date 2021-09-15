<template>
    <div id="single-blog">
        <h1>{{blog.title}}</h1>
        <article>{{blog.content}}</article>
        <p>作者：{{blog.author}}</p>
        <p>分类：</p>
        <ul id="types">
            <li v-for="category in blog.categories">
                {{category}}
            </li>
        </ul>
        <router-link :to="/edit/ + id">编辑</router-link>
        <button @click="deleteBlog()">删除</button>
    </div>
</template>

<script>
export default {
    name:"single-blog",
    data(){
        return{
            id:this.$route.params.id,
            blog:{}
        }
    },
    created(){
        this.$http.get('https://my-blog-8f4cc-default-rtdb.firebaseio.com/posts/' + this.id + ".json")
        .then(function(data){
            return data.json()
        }).then(function(data){
            this.blog = data;
        })
    },
    methods:{
        deleteBlog(){
            this.$http.delete('https://my-blog-8f4cc-default-rtdb.firebaseio.com/posts/' + this.id + ".json")
            .then(Response =>{
                this.$router.push({path:'/'})
            })
        }
    }
}
</script>

<style>
#single-blog{
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background: #eee;
    border:1px dotted #aaa;
}
#types{
    margin: 0 ;
    text-align: left;
    padding: 0;
}
</style>