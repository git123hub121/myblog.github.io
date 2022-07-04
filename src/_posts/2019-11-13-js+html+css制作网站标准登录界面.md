---
title: js+html+css制作网站标准登录界面
date: 2019-11-13
tags:
  - Javascript
  - CSDN
---

## js+html+css制作网站标准登录界面

首先来看css代码：

```css
	<style>
		* {
			margin: 0;
		}
		body {
			text-align: center;
		}
		.box {
			width: 300px;
			height: 400px;
			border: 1px solid silver;
			margin: 0 auto;
			margin-top: 150px;
		}
		.box .top {
			width: 300px;
			height: 60px;
			background-color: #faf9ff;
			
		}
		.box .buttom {
			width: 300px;
			height: 300px;
			
		}
		.box .footer {
			width: 300px;
			height: 40px;
			
		}
		.top #ul1 {
			width: 300px;
			height: 60px;
			list-style-type: none;
		}
		.top #ul1 li {
			list-style: none;
			font-size: 18px;
			color: #adaeb0;
			text-align: center;
			line-height: 60px;
			float: left;
			margin-left: -5px;
			margin-right: 50px;
			cursor: pointer;
			
		}
		.top #ul1 .hover {
			border-bottom: 1.5px solid #929ba2;
			color: #838486;
		}
		.buttom div {display: none;}
		.buttom	.block {display: block;}
		input[type="text"],input[type="password"] {
			width: 240px;
			height: 30px;
			text-align: left;
			border: 1px solid #ced0cf;
			text-indent: 1em;
			color: #c9c9c9;
		}
		input[type="checkbox"] {
			margin-left: -120px;
			display: inline-block;
		}
		input[type="checkbox"]::before {
			background: #fff;
			border: 1px solid #ced0cf;
		}
		input[type="checkbox"]:checked::before {
			background-color: #fff;
			border: 1px solid #e50232;
			color:#e50232;
		}
		input[type="submit"] {
			width: 240px;
			height: 40px;
			text-align: center;
			font-size: 20px;
			line-height: 20px;
			background-color: #5897dc;
			color: white;
			border: 0px solid #5897dc;
		}
		.sp3 {
			margin-left: 60px;
			font-size: 12px;
		}
		.sp3 a {
			text-decoration: none;
			color: #698bae;
		}
	</style>
```
这里的input[type="checkbox"]，我想设置边框，但是没有效果，加了dispaly：block也没有用，input[type="checkbox"]::before与input[type="checkbox"]:checked::before不知道是否被废弃，添加之后也无法实现想要的效果，读者可自行百度解决，本人能力有限，暂不解决！

html代码：

```bash
<div class="box">
		<div class="top">
			<ul id="ul1">
			<li class="hover" onMouseOver="setTab(1,0)">快速登录</li>
		    <li onMouseOver="setTab(1,1)">账号密码登录</li>
			</ul></div>
		<div class="buttom" id="but1">
				<div class="block">
				<dt class="nr">
					<br><br>
			<input type="text" name="" value="" class="ipt1" size="30" placeholder="支持学号登录"><br><br>
			<input type="password" name="" value="" class="ipt2" size="30" placeholder="密码"><br><br><br><br>
			<input type="submit" name="submit" value="登&nbsp;&nbsp;录" class="ipt4"><br><br>
				</dt></div>
				<div>
				<dt class="nr">
					<br><br>
			<input type="text" name="" value="" class="ipt1" placeholder="支持qq号/邮箱/手机号登录"><br><br>
			<input type="password" name="" value="" class="ipt2" placeholder="密码"><br><br>
			<input type="checkbox" name="" value="" class="ipt3">&nbsp;&nbsp;下次自动登录<br><br>
			<input type="submit" name="submit" value="登&nbsp;&nbsp;录" class="ipt4"><br><br>
				</dt></div>
		</div>
		<div class="footer">
			<span class="sp3">
			<a href="">忘记密码？</a>&nbsp;&nbsp;
			<a href="">注册新账号</a>&nbsp;&nbsp;
			<a href="">意见反馈</a>
		</span>
		</div>
	</div>
```
js代码：这里用到的是之前要实现的一个效果——悬浮标题显示不同的内容，故html中的id命名是有要求要相对应的，如有疑问，
[可点击以下链接：](https://blog.csdn.net/qq_44760912/article/details/102835579)

```js
	<script>
		function setTab(m,n){ //虽然该m可以知道是一个常数1，但是在函数中参数是不能已知的，故只能写成m，但是"menus"+m <=> "menus1"
var tli=document.getElementById("ul"+m).getElementsByTagName("li");//控制悬浮标题的显示与遮盖
var mli=document.getElementById("but"+m).getElementsByTagName("div");//控制悬浮标题时，对应内容的显示与遮盖
 for(i=0;i<tli.length;i++){
  tli[i].className=(i==n)?"hover":"";
  mli[i].style.display=(i==n)?"block":"none";
 }
}</script>
```
效果图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191113083612987.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191113083536903.png)
