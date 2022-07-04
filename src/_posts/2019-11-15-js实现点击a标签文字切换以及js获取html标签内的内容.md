---
title: js实现点击a标签文字切换以及js获取html标签内的内容
date: 2019-11-15
tags:
  - Javascript
  - CSDN
---

## js实现点击a标签文字切换以及js获取html标签内的内容

本人喜欢玩英雄联盟，有次登录wegame时，发现点击“QQ账号登录”，对应的“QQ账号登录”会被置换成“账号密码登录”，也就是点击a标签切换文字，同时上面的窗口的内容也会相应的变化。


具体构想代码如下：

**1.js实现点击a标签文字切换**
（1）
```bash
<a href="javascript:void(0);" onclick="javascript:this.innerHTML=(this.innerHTML=='QQ账号登录'?'账号密码登录':'QQ账号登录')">QQ账号登录</a>
```
这个是最简单的，也很好理解，代码来自别人的灵感修改

（2）
```bash
<a href="javascript:void(0);" id="a1" onclick="get_t(this)">QQ账号登录</a>
<script>
function get_t(obj){
if(obj.innerText=="QQ账号登录"){
obj.innerText="账号密码登录";
}else{
obj.innerText="QQ账号登录"
}
}
</script>
```
注意：这里用innerText来获取内容，innerHTML是修改内容。


**2.点击案例2，实现多个a标签文字切换**
```bash
		<a href="#" id="text">深圳</a>
		<hr />
		<a href="#" onclick="settext(this)">上海</a>
		<a href="#" onclick="settext(this)">北京</a>
	<script type="text/javascript">
		function settext(obj) {
    document.getElementById("text").innerHTML = obj.innerHTML;
	}
</script>
```
该段代码来自他人，感谢！


**3.js获取html标签内的内容**
整体代码如下：

```bash
<style>
			div {
				border: 1px solid red;
				width: 200px;
				height: 100px;
				position: absolute;
				left: 200px;
				top: 200px;
			}
			#box1 {
				background: purple;
				display: block;
			}
			#box2 {
				background: orange;
				display: none;
			}
		</style>
<a href="javascript:void(0);" id="a1" onclick="get_t(this)">修改</a>
		<div id="box1"><p>woshinibaba</p></div>
		<div id="box2"><p>anibaba</p></div>

<script>

function get_t(obj){
var a = document.getElementById("box1");
var b = document.getElementById("box2");	
if(obj.innerText=="修改"){
obj.innerText="关闭";
a.style.display = "none";
b.style.display = "block";
}else{
obj.innerText="修改"
b.style.display = "none";
a.style.display = "block";
}

}
</script>
```
css使用了position：absolute；绝对定位；
同时div中可以添加任何元素标签来丰富内容；
本例子不适合用onMouseMove来，效果不好看。

**总结**
上述代码有过借鉴，并添加了一些自我构想元素，从而实现上面的窗口的内容也会相应的变化，但是发现*js代码好像不够简洁*，**渴望有大佬能够优化该js代码**，使其更简便，谢谢！
