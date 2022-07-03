---
title: vue+element实现自定义轮播效果
date: 2021-11-21
tags:
  - vue
  - Element ui
  - 走马灯
---

## 毕设篇：vue+element实现自定义轮播效果

##### 效果展示
![lb](https://img-blog.csdnimg.cn/50c2f93e5e9143238202998e3e8e9f35.gif#pic_center)
##### 实现代码
Carouse.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="lib/theme-chalk/index.css">
    <script src="js/vue.js"></script>
    <script src="lib/index.js"></script>
    <link rel="stylesheet" href="css/common.css">
</head>

<body>
    <div id="app">
        <template>
            <el-carousel indicator-position="outside" style="margin: 50px auto; width: 1152px;">
                <el-carousel-item v-for="item in imgArray" :key="item">
                    <img :src="item" class="rightImg">
                </el-carousel-item>
            </el-carousel>
        </template>
    </div>
    <script>
        new Vue({
            el: "#app",
            // name: "XXXXXXX",
            data() {
                return {
                    imgArray: [
                        'img/1.png',
                        'img/2.png',
                        'img/3.png',
                        'img/4.png'
                    ]
                }
            }
        })
    </script>
</body>

</html>
```
style样式

```css
<style>
		/*在检查元素中，可以发现这个class类，给它对应的属性就可以解决了*/
        /*.el-carousel__container {
            width: 1152px;
            height: 540px;
            text-align: center;
        }*/
        /*显示该样式，会发现出现滚动条*/
        /* .el-carousel__item {
            width: 1152px;
            height: 540px;
        } */
        .rightImg {
            width: 1152px;
            height: 540px;
        }
        .el-carousel__item img {
            opacity: 0.85;
            line-height: 540px;
            margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
    </style>
```
##### 相关描述
1.相关vue，element需要自己本地导入
2.案例中的图片是我在图怪兽上采集的，默认设置都是1152 x 540的大小
3.图片路径自行修改

##### 问题解决
使用官方的走马灯很简单，就几行代码就可以实现

html中的element代码

```html
<template>
    <el-carousel indicator-position="outside" style="margin: 50px auto; width: 1152px;">
      <el-carousel-item v-for="item in imgArray" :key="item">
          <img :src="item" class="rightImg">
      </el-carousel-item>
    </el-carousel>
</template>
```

但是当你想自定义轮播图大小时，你会发现图片并没有完全显示出来。一开始我以为是==el-carousel-item==组件默认设置有超出高度隐藏的属性，也就是overflow: hidden;于是设置el-carousel-item 和 .rightImg一样的css属性，但是不仅没有效果，右侧还会出现一个滚动条

![在这里插入图片描述](https://img-blog.csdnimg.cn/6de18dc2cace49eaa062f841547736b1.gif#pic_center)
这简直让我气抖冷！在检查不是代码本身的问题时，就需要我们在浏览器摁下 F12	—— 检查元素了

![在这里插入图片描述](https://img-blog.csdnimg.cn/560a17670c2a4362921f8b3e4dab0403.gif#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/b6c55eeb95eb4f98a335f92932727e76.png)

这时，可以发现图片是在一个class为el-carousel__container的div里面的，这本质上是element内部所隐藏的代码（不得不说element ui确实简化了很多代码），并且发现它的默认高度在300px左右，所以只要修改它的高度就ok了

```bash
<div class="el-carousel__container"></div>
```
事实也是如此，将下面样式显示就大功告成了

```css
 .el-carousel__container {
            width: 1152px;
            height: 540px;
            text-align: center;//让左右两边箭头居中
 }
```

##### 相关链接 && 资源分享
[vue2.0 + element-ui 实战项目-实现一个简单的轮播图](https://www.jianshu.com/p/a80d384b922d)

[element走马灯效果](https://element.eleme.cn/#/zh-CN/component/carousel)

[jQuery插件库](https://www.jq22.com/)


图片分享：
1.png
![1.png](https://img-blog.csdnimg.cn/b722ff3659734cb883f67c678c6dda07.png)
2.png
![2.png](https://img-blog.csdnimg.cn/45a4f62876a346e381e67715696d8763.png)
3.png
![3.png](https://img-blog.csdnimg.cn/de1d408698564a9d930f9f772a34812e.png)
4.png
![4.png](https://img-blog.csdnimg.cn/e7cbb85011ea4819818280578dc73013.png)
