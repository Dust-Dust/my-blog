<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <!-- 判断是否已经提交 -->
    <form v-if="!submmited">
        <!-- 博客标题部分 -->
        <label style="display: block;margin: 20px 0 10px;">博客标题</label>
        <input type="text" v-model="blog.title" required />
        <!-- required:  提交表单之前必须输入字段 -->
        <br>

        <!-- 博客内容部分 -->
        <label>博客内容</label>
        <textarea v-model="blog.content"></textarea>

        <!-- 博客分类复选框 -->
        <div id="checkboxes">
            <label >Vue.js</label>
            <input type="checkbox" value="Vue.js" v-model="blog.categories">
            <label >Node.js</label>
            <input type="checkbox" value="Node.js" v-model="blog.categories">
            <label >React.js</label>
            <input type="checkbox" value="React.js" v-model="blog.categories">
            <label >Angular10.js</label>
            <input type="checkbox" value="Angular10.js" v-model="blog.categories">
        </div>

        <!-- 博客作者 -->
        <label for="">作者:</label>
        <select v-model="blog.author">
            <option v-for="author in authors">
                {{author}}
            </option>
        </select>

        <!-- 添加博客按钮 -->
        <button v-on:click.prevent="post" class="submmitblog">添加博客</button>
        <!-- prevent:防止提交后刷新页面 -->
    </form>

    <div v-if="submmited">
        <h3>您的博客发布成功!</h3>
    </div>

    <hr>
    <!-- 测试 -->
    <div id="preview">
        <h3>博客总览</h3>
        <p>博客标题:{{blog.title}}</p>
        <p>博客内容:</p>
        <p>{{blog.content}}</p>
        <p>博客分类:</p>
        <ul>
            <li v-for="category in blog.categories">
                {{category}}
            </li>
        </ul>
        <p>作者:{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
export default {
// https://jsonplaceholder.typicode.com/
// https://jsonplaceholder.typicode.com/posts
  name: 'add-blog',
  data () {
    return {
      blog:{
          title:"",//博客标题
          content:"",//博客内容
          categories:[],//博客分类
          author:""
        //   若该处不返回数组，则复选框只能同时选择或非选择并且无法传值
      },
        authors:["再花","方长","塔罗"],//博客作者
        submmited:false  //判断是否提交，设置提交后隐藏输入框
    }
  },
  methods: {
      post:function(){
          this.$http.post("https://my-blog-8f4cc-default-rtdb.firebaseio.com/posts.json",this.blog)
                .then(function(data){
                    console.log(data);
                    this.submmited=true;//点击添加后隐藏输入框
                })
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
  box-sizing: border-box;
}

#add-blog{
      margin:20px auto;
     max-width: 600px;
     padding: 20px;
}

label{
     display: block;
     margin: 20px 0 10px;
}

input[type="text"],textarea,select{
     display: block;
     width: 100%;
     padding: 8px;
     height: 20 px;
}

textarea{
    height: 200px;
}

#checkboxes label{
     display: inline-block;
     margin-top: 15px;
}

#checkboxes input{
     display: inline-block;
     margin-right: 10px;
}

button{
    display: block;
    margin: 20px 0;
    background-color: crimson;
    color: #fff;
    border: 0;
    padding: 14px;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
}

#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}

h3{
    margin-top: 10px    ;
}
</style>
