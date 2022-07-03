---
title: vue+element+js实现文章管理的分页功能
date: 2021-11-21
tags:
  - vue
  - Element ui
  - 分页
---

## 毕设篇：使用vue+element+js实现文章管理的分页功能

##### 效果展示
![article page](https://img-blog.csdnimg.cn/7560da5ae2384ccbb1911f16e2da7873.gif#pic_center)
##### 实现代码：

```bash
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>分页展示</title>
    <link rel="stylesheet" href="lib/theme-chalk/index.css">
    <script src="js/vue.js"></script>
    <script src="lib/index.js"></script>
    <link rel="stylesheet" href="css/common.css">
    <style>
        #app {
            margin: 50px 0 0 50px;
            width: 1000px;
            height: 640px;
            /* background: wheat; */
            /* border: 1px solid orange; */
        }
        .content {
            width: 1000px;
            height: 300px;
            margin-bottom: 20px;
            /* background: wheat; */
            /* border: 1px solid orange; */
        }

        .imgleft {
            width: 400px;
            height: 300px;
            /* background: orangered; */
            float: left;
        }

        .artright {
            width: 600px;
            height: 300px;
            /* background: orchid; */
            float: right;
            position: relative;
        }

        .artright h3 {
            position: absolute;
            color: white;
            background: #1566c1;
            width: 150px;
            height: 60px;
            z-index: 999;
            top: 0;
            left: 0;
            text-align: center;
            line-height: 60px;
        }

        .artright p {
            position: absolute;
            display: inline-block;
            width: 600px;
            height: 270px;
            z-index: 100;
            background: #edf0f0;
            padding: 0;
            top: 30px;
            left: 0;
        }
        .artright span {
            display: block;
            color: #727272;
            margin-top: 100px;
        }

        img {
            width: 400px;
            height: 300px;
        }
    </style>
</head>

<body>
    <div id="app">
        <div class="content" v-for="(item,index) in PageDatas" :key="index">
            <figure class="imgleft">
                <img :src="'img/img'+item.imgc+'.png'" alt="">
            </figure>
            <div class="artright">
                <h3>{{item.hc}}</h3>
                <p><span>{{item.artc}}</span></p>
            </div>
        </div>
        <div class="footer">
            <!-- <button @click="prevPage()" :disabled="currentPage <= 1">
                上一页
            </button>
            <span>第{{currentPage}}页/共{{totalPage}}页</span>
            <button @click="nextPage()" :disabled="currentPage >= totalPage">
                下一页
            </button> -->
            <!-- //这是下拉框可以选择的，每选择一行，要展示多少内容 //显示当前行的条数-->
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[2, 4, 6, 12]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalList.length">
            </el-pagination>
        </div>
    </div>

    <script>
        let totalList = [];
        //图片数组、标题数组、内容数组
        let hc = ['北京天坛', '张家界武陵源', '世界之窗', '浯溪碑林',
            '北京天坛', '张家界武陵源', '世界之窗', '浯溪碑林',
            '北京天坛', '张家界武陵源', '世界之窗', '浯溪碑林']
        var name = '这就是'
        let artc = [name + '北京天坛', name + '张家界武陵源', name + '世界之窗', name + '浯溪碑林',
        name + '北京天坛', name + '张家界武陵源', name + '世界之窗', name + '浯溪碑林',
        name + '北京天坛', name + '张家界武陵源', name + '世界之窗', name + '浯溪碑林']
        for (let i = 0; i < 12; i++) {
            totalList.push({
                imgc: i + 1,
                hc: hc[i],
                artc: artc[i]
            });
        }
        // 父组件
        new Vue({
            //
            el: '#app',
            data() {
                return {
                    totalList,//所有数据
                    totalPage: 1,//总共页数，默认为1
                    currentPage: 1, //当前页数 ，默认为1
                    pageSize: 2, // 每页显示数量
                    PageDatas: [] //当前页显示内容
                }
            },
            mounted() {
                //计算一共有几页
                this.totalPage = Math.ceil(this.totalList.length / this.pageSize);
                // 计算得0时设置为1
                this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
                this.setPageDatas();
            },
            methods: {
                // 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
                setPageDatas() {
                    let begin = (this.currentPage - 1) * this.pageSize;
                    let end = this.currentPage * this.pageSize;
                    this.PageDatas = this.totalList.slice(
                        begin, end);
                },
                //上一页
                prevPage() {
                    console.log(this.currentPage);
                    if (this.currentPage == 1) return;

                    this.currentPage--;
                    this.setPageDatas();
                },
                // 下一页
                nextPage() {
                    if (this.currentPage == this.totalPage) return;

                    this.currentPage++;
                    this.setPageDatas();

                },
                // 初始页currentPage、初始每页数据数pagesize和数据data
                handleSizeChange: function (size) {
                    this.pageSize = size;
                    console.log(this.pageSize)  //每页下拉显示数据
                    this.setPageDatas();
                },
                handleCurrentChange: function (currentPage) {
                    this.currentPage = currentPage;
                    console.log(this.currentPage)  //点击第几页
                    this.setPageDatas();
                },

            }

        });
    </script>
</body>

</html>

```

##### vue的常用方法与生命周期
|常用方法  | 具体描述 |
|--|--|
| created | html加载完成之前，执行。执行顺序：父组件-子组件|
|mounted| html加载完成后执行。执行顺序：子组件-父组件|
|methods|事件方法执行|
|watch |watch是去监听一个值的变化，然后执行相对应的函数 |
|computed|computed是计算属性，也就是依赖其它的属性计算所得出最后的值|

##### element组件	[Pagination 分页](https://element.eleme.cn/#/zh-CN/component/pagination)
具体参考：[vue+Element-ui实现分页效果](https://www.cnblogs.com/zhoulifeng/p/9395295.html)

##### 总结
图片命名格式为：img/imgi.png，其中i是变量

标题和内容都是采用数组的形式写入（后期应该是从本地数据库中导入）

代码具体功能实现参考	[vue实现简单的前端分页功能](https://blog.csdn.net/illusion_melody/article/details/84139714)

这里涉及到对应版本的element和vue.js的版本问题，具体参考链接：

这里我的vue版本为	Vue.js v2.6.14
而element本地下载的是官方对应的2.15.7，亲测可用！
大家也可以自己百度对应版本的相关信息，据我所知vue3.0是不能使用element ui的，vue3对应的是element plus，但是只用到vue.js的功能，优先考虑vue2，可以减少学习成本

[element ui本地下载 版本选2.15.7](https://www.cnblogs.com/yph5233/p/12870251.html)

![https://tse1-mm.cn.bing.net/th/id/R-C.b6d0b0ee791a44df0cf668f46c8d2031?rik=JlHAhRQRBhM6rg&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20170910%2faff5993170d244e49424211cf47cd55a.gif&ehk=Jdjj58la2lUoNpfD0ZddfKgrkrpX63B8%2bc6SbvDwMbM%3d&risl=&pid=ImgRaw&r=0](https://img-blog.csdnimg.cn/34deb91b77c94b4ebcc9856b451bd42b.png)
