<template>
  <div v-theme:column="'narrow'" id="show-blog">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filteredBlog" class="single-blog">
      <!-- 需要遍历filteredBlog，不能遍历blogs -->
      <router-link v-bind:to="'/blog/' + blog.id">
      <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>  
      <!-- to-uppercase，转换为大写 -->
      </router-link>
      <article>
        {{blog.content | snippet}}
        <!-- snippet，文章内容只显示前XX字数 -->
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show-blog',
  data(){
    return{
      blogs:[],
      search:""
    }
  },
  created(){
    this.$http.get('https://my-blog-8f4cc-default-rtdb.firebaseio.com/posts.json')  //请求本地json
    .then(function(data){
      console.log(data.json());
      return data.json()
      // this.blogs = data.body.slice(0,10);//返回10条数据，默认为100条
      // console.log(this.blogs)
    })
    .then(function(data){
      var blogsArray = [];
      for(let key in data){
        // console.log(key);
        // console.log(data[key]);
        data[key].id=key;   //将唯一标识赋值给id
        blogsArray.push(data[key])  //将id添加进blogsArray数组
      }
      // console.log(blogsArray);
      this.blogs = blogsArray; 
    })
  },
  computed:{
    filteredBlog:function(){
      return this.blogs.filter((blog) =>{
        return blog.title.match(this.search)
        // 判断输入内容和blog.title也就是标题是否匹配
      });
    }
  },
  // 过滤器也可以在这里写
  filter:{
    // "to-uppercase":function(value){
    //   return value.toUppercase();
    // }

    // toUppercase(value){
    //   return value.toUppercase();
    // }
  },
  directives:{
    // 'rainbow':{
    //   bind(el,binding,vnode){
    //     el.style.color = "#" + Math.random().toString(16).slice(2,8) 
    //   }
    // }
  }
}
</script>

<style>
#show-blog{
    max-width: 800px;
    margin: 0px auto;
}
.single-blog{
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background-color: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a{
  color: #444;
  text-decoration: none;
}

input[type="text"]{
  padding:8px;
  width: 100%;
  box-sizing: border-box;
}
</style>