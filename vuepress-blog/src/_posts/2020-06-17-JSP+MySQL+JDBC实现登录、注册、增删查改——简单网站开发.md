---
title: JSP+MySQL+JDBC实现登录、注册、增删查改——简单网站开发
date: 2020-06-17
tags:
  - Jsp
  - MySQL
  - JDBC
---

## **前言**
JSP+MySQL+JDBC实现登录、注册、增删查改——简单网站开发（没有加上查询哦），
这算是一个比较完全的jsp简易项目了，希望大家耐心指教！，本想录个视频展示一下的，但是又放弃了，呜呜呜...

## **所需软件：**
tomact服务器，推荐7.0及以上版本
eclipse/myclipse用来搭载tomact服务器，编写jsp文件
HBuilder——快速编写html，css，js（主要用来判断注册，登录）
MySQL数据库（推荐5.6以上）+Navicat Premium 12以及jdbc jar包

## **所需页面：**  

主页：
index.jsp           ——利用jsp实现从数据库导入商品信息显示，链接登录注册页面

登录：
Login.jsp           ——实现登录页面
do_login.jsp        ——连接数据库，将登录信息与数据库信息进行比对    查询
login_fail.jsp      ——提示登录失败
login_success.jsp   ——提示登录成功

注册：
Register.jsp        ——实现注册页面
do_Reg.jsp          ——连接数据库，先进行用户名验证是否已存在，然后将符合条件的注册信息添加到数据库   查询
reg_fail.jsp        ——提示注册失败
reg_success.jsp     ——提示注册成功

用户信息管理和商品信息管理页面
以我的命名文件为例：
guanli.jsp          实现展示用户信息和商品信息
由于用户信息是用户主动注册，不需要增删改，有能力的可以添加查询，这里我只针对商品信息管理
商品管理页面添加3个功能——*==添加数据==    ==删除数据==    ==修改数据==*（添加和修改类似，删除最为简单，原理后面讲）

链接界面

实现修改
detail.jsp——通过id（数据库id一般都是主键，有其唯一性，分页的总页数的计算也需要利用它）传递整条数据，作为修改的可视化界面
用于修改，主要通过input的text以及textarea来进行传递，然后通过name将修改后的数据传递给数据库，实现修改功能

备注：这里的textarea用来实现多行数据输入，但是它并不通过value来传递数据，而是直接写在标签中间

```bash
<textarea name="lvjs"><%=rs.getString("lvjs")%></textarea>//正确

<textarea name="lvjs" value="<%=rs.getString("lvjs")%>"></textarea>//错误

```
update.jsp——将修改后的数据通过name传递给数据库，实现修改功能，返回guanli.js
这里有个小技巧，也算是个问题

实现添加
add.jsp——笔修改界面要简单一点，不需要接收数据，自己填写数据然后传递给数据库，唯一不同的就是一个是update...的sal语句
，一个是insert...的sql语句

addform.jsp——实现接收添加数据到数据
这里也会有个小问题！

实现删除
写到这里，这算是最简单的了！
delete.jsp——通过id传递，使用delete...sql语句删除对应id所在的数据即可

综合问题：如果你的代码在传递中文数据时，出现乱码，一般是通过以下方法解决：
 

```bash
request.setCharacterEncoding("utf-8");//请
response.setCharacterEncoding("utf-8");//接
String url = "jdbc:mysql://localhost:3306/mldn?useUnicode=true&characterEncoding=utf-8";
//?useUnicode=true&characterEncoding=utf-8  加上这三句一般就可以解决了
```
其他方法...应该没了吧！


## **具体页面功能代码**
算了还是将自己的代码全部奉上吧
首先附上jsp必须要有的一行代码： 

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
```

 index.jsp——我的是webindex.jsp以及web.jsp

webindex.jsp   

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/donghua.css">
<style>
	span {
		font-size:12px;
	}
	span>a {
		color:orange;
	}
	span>a:hover {
		color:white;
	}
</style>
<title>首页</title>
</head>

<body>
<script type="text/javascript">
	function check() {
		window.prompt
		var n = window.prompt('请输入访问密码:',);
		if(n==123){
			alert('密码输入正确!正在跳转...');
			return true;
		}
		else {
			return false;
		}
		
}
</script>
<!------------导航部分----------------->
<ul class="nav" id="ul1">
	<li class="logo">TraHeart</li>
	<li><a href="#">首页</a></li>
	<li><a href="web.jsp">关于我们</a></li>
	<li><a href="#">产品展示</a>
		<ul class="subs">	
		</ul>
	</li>
	<li><a href="#">案例作品</a></li>
	<li><a href="#">联系我们</a></li>
	<div class="kg"></div>
	<li><a href="Login.jsp">登录</a></li>
	<li><a href="Register.jsp">注册</a></li>
	<li><a href="guanli.jsp" onmousedown="check(true)">管理</a></li>
</ul>
<hr />
<!---------------BANNER----------------------------->
<div class="banner">
	<img src="img/banner.png" alt="">
</div>

<!---------------about us--------------------------->
<ul class="block">
<div class="aboutus">
	<div class="tittle">关于我们</div>
	<img src="img/image2/gsjs.jpg" alt="">
	<div class="jieshao">公司介绍</div>
	<div class="neirong">
		 <p style="font-size: 15px;font-family: "微软雅黑";float: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司创建于2020年x月x日,拥有丰富的旅游资源和众多优秀旅游前端旅游开发旅游咨询人才,注册半月便融资xxx，是一个综合性的旅游网上运营服务公司。技术力量较为雄厚，与多家网上教学机构有过多次合作，企业规模效益明显。
		 </p>
	</div>
	<div class="more">more</div>
</div>
</ul>
<!-----------------产品展示----------------------------->
<ul>
<div class="show">
	<div class="tittle" style="color: #ffffff">产品介绍</div>
	 <div class="chanpinphoto">
        <!----pingyidonghua---------------------------------------------------->
         <div class="tuhe">
          <div class="bbox pingyi">
             <a href="http://baidu.com"><img src="img/image2/1.jpg" width="300" height="200"  alt="" /></a>
            <div class="wenzi">
           <h3> <a href="http://baidu.com" class="a">泰姬陵</a></h3>
            <p>泰姬陵，被评为“世界新7大奇迹”。相传，这是当年的莫卧儿皇帝为心爱的妃子修建的。图片上的泰姬陵，金碧辉煌、美轮美奂，让人无比向往。</p>
            </div>
           </div>
              <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -7px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;">100RMB</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action="">90RMB/人次</a></span></p>
            </div>
             <div class="tuhe">
        <div class="bbox xuanzhuan">
        <a href="http://baidu.com"><img src="img/image2/2.jpg" width="300" height="200"  alt=""/></a>
        <div class="wenzi">
            <h3><a href="http://baidu.com" class="a">八达岭长城</a></h3> 
            <p style="line-height: 27px;">“不到长城非好汉”，这句话不知道激起了多少人想去长城看一看的冲动。真切感受到它的宏伟壮阔。</p>
            <div class="kuang"></div>
        </div>
        </div>
           <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -7px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;">150RMB</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action="">120RMB/人次</a></span></p>
        </div>
        <div class="tuhe">
            <div class="bbox suofang">
        <a href="http://baidu.com"><img src="img/image2/4.jpg" width="300" height="200" alt=""/></a>
        <div class="wenzi">
		<h3><a href="http://baidu.com" class="a">英国巨石阵</a></h3>
		<p style="line-height: 25px;">巨石阵，每个英国人心中最神圣的地方。孤独的矗立在草坪中，看上去十分神秘而不可侵犯，让人只敢观而不敢肆意触摸。</p>
		<div class="kuang"></div>
	</div>
    </div>
        <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -7px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;">60￡</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action="">50￡/人次</a></span></p>
    </div>
         <div class="tuhe">
         <div class="bbox xieqie">
        <a href="http://baidu.com"><img src="img/image2/3.jpg" width="300" height="200" alt="" style="margin: 0"/></a><div class="wenzi">
		<h3><a href="http://baidu.com" class="a">故宫</a></h3>
		<p>有着“紫禁城”这个神秘奇迹的北京故宫是中国明清两代的皇家宫殿，是中国古代宫廷建筑之精华，被称为“世界十大奇迹之一”。</p>
	</div>
    </div>
        <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -8px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;">120RMB</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action="">100RMB/人次</a></span></p>
    </div>   
        </div>
        <div class="chaxun">点击查询</div>
</div>
</ul>
<!-----------------客户案例-------------------->
<ul>
<div class="anlibox">
	<div class="tittle">案例作品</div>
	<div class="photobox">
		<li><img src="img/just2.png" alt=""></li>
		<li><img src="img/just3.png" alt=""></li>
		<li><img src="img/just4.png" alt=""></li>
		<li><img src="img/just5.png" alt=""></li>
		<li><img src="img/just6.png" alt=""></li>
		<li><img src="img/just7.png" alt=""></li>
		<li><img src="img/just8.png" alt=""></li>
		<li><img src="img/just9.png" alt=""></li>
		<li><img src="img/just13.jpeg" alt=""></li>
		<li><img src="img/just15.png" alt=""></li>
	</div>
</div>
</ul>
<!-------------------联系我们------------------------->
<ul>
<div class="callme">
	<div class="tittle">联系我们</div>
	<div class="callmebox">
		<div>
			<img src="img/home.png" alt="">
			<p>ADRESS</p>
			<span>地址：XX市xx区xx广场</span>
		</div>
		
		<div>
			<img src="img/dianhua.png" alt="">
			<p>TELL</p>
			<span>电话：155****5938</span>
		</div>
		
		<div>
			<img src="img/xinxi.png" alt="">
			<p>MESSAGE</p>
			<span>您有什么问题请在线留言</span>
		</div>
		
	</div>
</div>
</ul>
<!------------底部----------------->
<div class="bottom">
	 <div class="logobottom">
        TraHeart
        </div>
        <div class="wenzi1">
        版权所有|*******有限公司（备注：本网页不做商用，如有侵权，请与本人协商。）
        </div>
        <div></div>
</div>
</body>
</html>
```
这里的代码借鉴了虎课网M老师的原html页面代码，有兴趣的可以去虎课网搜索 DW网页制作...里面有原psd文件和html，css代码
下载链接：链接：[虎课网DWpsd及源码 ](%E9%93%BE%E6%8E%A5%EF%BC%9Ahttps://pan.baidu.com/s/1elif56Ky9ft3mcSbcFZaLg)  提取码：n1oe

web.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/style1.css">
<link rel="stylesheet" href="css/donghua.css"/>
<style>
	#active a {
    background-color: #0c53ad;
    color: #fff;
}
	.last:hover {
	color: #fff;
	background: #0c53ad;
}
	span {
		font-size:10px;
	}
	span>a {
		color:orange;
	}
	span>a:hover {
		color:white;
	}
</style>
<title>分页</title>
</head>

<body>
<script>
	function setTab(m, n) { //虽然该m可以知道是一个常数1，但是在函数中参数是不能已知的，故只能写成m，但是"menus"+m <=> "menus1"
		var tli = document.getElementById("ul" + m).getElementsByClassName("lia"); //控制悬浮标题的显示与遮盖
		var mli = document.getElementById("box" + m).getElementsByTagName("ul");
		//控制悬浮标题时，对应内容的显示与遮盖
		for(i = 0; i < tli.length; i++) {
			tli[i].id = (i == n) ? "active" : "";
			mli[i].style.display = (i == n) ? "block" : "none";
		}
	}
</script>
<%
    		Class.forName("com.mysql.jdbc.Driver");
    		String url = "jdbc:mysql://localhost:3306/mldn";
    		String sql_user = "root";
    		String sql_password = "123456";
    		Connection conn = DriverManager.getConnection(url,sql_user,sql_password);
    		String sql = "select * from lv_info";
    		PreparedStatement pst = conn.prepareStatement(sql);
    		ResultSet rs = pst.executeQuery();
    		rs.next();
    		
%>
	
<!------------导航部分----------------->
<ul class="nav" id="ul1">
	<li class="logo">TraHeart</li>
	<li><a href="webindex.jsp" class="last">返回首页</a></li>
	<li class="lia" onmousedown="setTab(1,0)" id="active"><a href="#">关于我们</a></li>
	<li class="lia" onmousedown="setTab(1,1)"><a href="#">产品展示</a></li>
	<li class="lia" onmousedown="setTab(1,2)"><a href="#">案例作品</a></li>
	<li class="lia" onmousedown="setTab(1,3)"><a href="#">联系我们</a></li>
	<!--<li><a href="Login.jsp">登录</a></li>
	<li><a href="Register.jsp">注册</a></li>-->
</ul>
<hr />
<!---------------BANNER----------------------------->
<!--<div class="banner">
	<img src="img/banner.png" alt="">
</div>-->
<!---------------about us--------------------------->
<div id="box1" class="box">
<!---------------about us--------------------------->
<ul class="block">
<div class="aboutus">
	<div class="tittle">关于我们</div>
	<img src="img/image2/gsjs.jpg" alt="">
	<div class="jieshao">公司介绍</div>
	<div class="neirong">
		 <p style="font-size: 15px;font-family: "微软雅黑";float: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本公司创建于2020年x月x日,拥有丰富的旅游资源和众多优秀旅游前端旅游开发旅游咨询人才,注册半月便融资xxx，是一个综合性的旅游网上运营服务公司。技术力量较为雄厚，与多家网上教学机构有过多次合作，企业规模效益明显。
		 </p>
	</div>
	<div class="more">more</div>
</div>
</ul>
<!-----------------产品展示----------------------------->
<ul>
<div class="show">
	<div class="tittle" style="color: #ffffff">产品介绍</div>
	 <div class="chanpinphoto">
        <!----pingyidonghua---------------------------------------------------->
         <div class="tuhe">
          <div class="bbox pingyi">
             <a href="http://baidu.com"><img src="<%=rs.getString("lvtp")%>" width="300" height="200"  alt="" /></a>
            <div class="wenzi">
           <h3> <a href="http://baidu.com" class="a"><%=rs.getString("lvmc")%></a></h3>
            <p><%=rs.getString("lvjs")%></p>
            </div>
           </div>
              <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -7px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>
              原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;"><%=rs.getDouble("yj")%>RMB</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action=""><%=rs.getDouble("xj")%>RMB/人次</a></span></p>
            </div>
            <% rs.next();%>
             <div class="tuhe">
        <div class="bbox xuanzhuan">
        <a href="http://baidu.com"><img src="<%=rs.getString("lvtp")%>" width="300" height="200"  alt=""/></a>
        <div class="wenzi">
            <h3><a href="http://baidu.com" class="a"><%=rs.getString("lvmc")%></a></h3> 
            <p style="line-height: 27px;"><%=rs.getString("lvjs")%></p>
            <div class="kuang"></div>
        </div>
        </div>
           <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -7px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>
           原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;"><%=rs.getDouble("yj")%>RMB</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action=""><%=rs.getDouble("xj")%>RMB/人次</a></span></p>
        </div>
        <% rs.next();%>
        <div class="tuhe">
            <div class="bbox suofang">
        <a href="http://baidu.com"><img src="<%=rs.getString("lvtp")%>" width="300" height="200" alt=""/></a>
        <div class="wenzi">
		<h3><a href="http://baidu.com" class="a"><%=rs.getString("lvmc")%></a></h3>
		<p style="line-height: 25px;"><%=rs.getString("lvjs")%></p>
		<div class="kuang"></div>
	</div>
    </div>
        <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -7px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;">
        <%=rs.getDouble("yj")%>￡</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action=""><%=rs.getDouble("xj")%>￡/人次</a></span></p>
    </div>
    	<% rs.next();%>
         <div class="tuhe">
         <div class="bbox xieqie">
        <a href="http://baidu.com"><img src="<%=rs.getString("lvtp")%>" width="300" height="200" alt="" style="margin: 0"/></a><div class="wenzi">
		<h3><a href="http://baidu.com" class="a"><%=rs.getString("lvmc")%></a></h3>
		<p><%=rs.getString("lvjs")%></p>
	</div>
    </div>
        <p style="width: 100%;height: 20px;font-size: 10px;font-family:微软雅黑;text-align: center;line-height: 20px;float: left;margin: 5px 0 0 -8px;color: white;"><span style="font-family:songti;color:greenyellow;font-size:12px;">票价特惠：</span>原价:&nbsp;&nbsp;<span style="color: red;text-decoration: line-through;">
        <%=rs.getDouble("yj")%>RMB</span>&nbsp;&nbsp;&nbsp;现价:&nbsp;&nbsp;<span style="text-decoration: underline"><a href="#" action=""><%=rs.getDouble("xj")%>RMB/人次</a></span></p>
    </div>   
        </div>
        <div class="chaxun">点击查询</div>
</div>
</ul>
<!-----------------客户案例-------------------->
<ul>
<div class="anlibox">
	<div class="tittle">案例作品</div>
	<div class="photobox">
		<li><img src="img/just2.png" alt=""></li>
		<li><img src="img/just3.png" alt=""></li>
		<li><img src="img/just4.png" alt=""></li>
		<li><img src="img/just5.png" alt=""></li>
		<li><img src="img/just6.png" alt=""></li>
		<li><img src="img/just7.png" alt=""></li>
		<li><img src="img/just8.png" alt=""></li>
		<li><img src="img/just9.png" alt=""></li>
		<li><img src="img/just13.jpeg" alt=""></li>
		<li><img src="img/just15.png" alt=""></li>
	</div>
</div>
</ul>
<!-------------------联系我们------------------------->
<ul>
<div class="callme">
	<div class="tittle">联系我们</div>
	<div class="callmebox">
		<div>
			<img src="img/home.png" alt="">
			<p>ADRESS</p>
			<span>地址：XX市xx区xx广场</span>
		</div>
		
		<div>
			<img src="img/dianhua.png" alt="">
			<p>TELL</p>
			<span>电话：155****5938</span>
		</div>
		
		<div>
			<img src="img/xinxi.png" alt="">
			<p>MESSAGE</p>
			<span>您有什么问题请在线留言</span>
		</div>
		
	</div>
</div>
</ul>
<!------------zongti----------------->
</div>
<!------------底部----------------->
<div class="bottom">
	 <div class="logobottom">
        TraHeart
        </div>
        <div class="wenzi1">
        版权所有|*******有限公司（备注：本网页不做商用，如有侵权，请与本人协商。）
        </div>
        <div></div>
</div>

</body>
</html>

```
这个页面是我作为该页面的一个分页，实现整个浏览器完整显示每个部分的内容，用了一个很好理解还很实用的简单js实现点击标题切换对应的内容

登录、注册
Login.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<script type="text/javascript" src="js/zdyzm.js"></script>
		<style type="text/css">
		 
		</style>
	</head>
	<body>
		<script>
		function setTab(m,n) { //虽然该m可以知道是一个常数1，但是在函数中参数是不能已知的，故只能写成m，但是"menus"+m <=> "menus1"
		var tli=document.getElementById("ul"+m).getElementsByTagName("li");//控制悬浮标题的显示与遮盖
		var mli=document.getElementById("box"+m).getElementsByTagName("div");//控制悬浮标题时，对应内容的显示与遮盖
		 for(i=0;i<tli.length;i++) {
		  tli[i].className=(i==n)?"hover":"";
		  mli[i].style.display=(i==n)?"block":"none";
		}
	}
		function setTab1(m,n) { //虽然该m可以知道是一个常数1，但是在函数中参数是不能已知的，故只能写成m，但是"menus"+m <=> "menus1"
		var tli=document.getElementById("u"+m).getElementsByTagName("li");//控制悬浮标题的显示与遮盖
		var mli=document.getElementById("box"+m).getElementsByTagName("div");//控制悬浮标题时，对应内容的显示与遮盖
		 for(i=0;i<tli.length;i++) {
		  tli[i].className=(i==n)?"hover":"";
		  mli[i].style.display=(i==n)?"block":"none";
		}
	}
	</script>
		<div id="" class="logo">
			<h1>Travel Heart</h1>
		</div>
		
		<div class="box">
			<div class="top">
		<div class="dlname">
			<ul class="c1" id="ul1">
			<li class="hover" onMouseOver="setTab(1,0)">用户登录</li>
			<li onMouseOver="setTab(1,1)">快速登录</li>
			</ul>
			</div>
		<div class="dlname1">
			<ul class="c2" id="u1">
			<li>USER &nbsp;LOGIN</li><!--class="hover" onMouseOver="setTab1(1,0)"-->
			<li>&nbsp;&nbsp;USER &nbsp;LOGIN</li><!--onMouseOver="setTab1(1,1)"-->
			</ul>
			</div>
		</div>
			<div class="boxd" id="box1">
				
				<div class="block">
				<form action="do_Login.jsp" method="post">
				<input type="text" name="t_name" id="name" value="" placeholder="用户名" class="user"/><!--onfocus="javascript:if(this.value=='用户名')this.value='';" -->
				<input type="password" name="t_psd" id="pwd"  value="" placeholder="密码" class="pwd"/><br />
				<input type="checkbox" name="checked" id="rem" value="" class="check"/>
				<label for="rem" style="color: #b2b2b2;">&nbsp;&nbsp;&nbsp;记住用户名和密码</label><br />
				<input type="submit" value="登录" onclick="return check();" class="sub"/>
				</form>
			</div>
			
				<div>
				<form action="" method="post">
				<input type="text" name="user_name" id="user_name" value="" placeholder="手机号" onfocus="javascript:if(this.value=='用户名')this.value='';" class="user"/>
				<!--时间：2017-01-11 描述：输入框ct100_textcode -->
				<input type="text" name="ctl00_txtcode"  value="" placeholder="验证码" id="ctl00_txtcode" class="pwd"/>
			   	<!--时间：2017-01-11 描述：把验证码定义为按钮，点击刷新-->
			   	<input type="button" id="code" onclick="createCode()"/>
			   	<!--时间：2017-01-11 描述：验证按钮 -->
			    <input type="button" value="验证" onclick="validate()" class="yz"/><br />
			    
			    <input type="checkbox" name="checked" id="rem" value="" class="check"/>
				<label for="rem" style="color: #b2b2b2;">&nbsp;&nbsp;&nbsp;记住用户名和密码</label><br />
				
				<input type="submit" value="登录" class="sub"/>
				</form>	
			</div>
		</div>
		<div class="bottom">
				<span class="c3">还没有账号？</span>
				&nbsp;&nbsp;<span class="c4"><a href="Register.jsp" class="zc">立即注册</a></span>
				&nbsp;&nbsp;<span class="c4" style="float: right;"><a href="#" class="zc">忘记密码？</a></span>
			</div>
	</div>
	    <script type="text/javascript">
        	function check(){
        		var flag = true;
        		var admin = document.getElementById("name").value;
        		var password = document.getElementById("pwd").value;
    			if ("" == admin){
    				alert("请输入用户名！");
    				flag = false;
    				return false;
    			}
    			else if ("" == password){
    				alert("请输入密码！");
    				flag = false;
    				return false;
    			}
    			if(flag == true){
    				return true;
    				//form.submit();
    			}
    		}
        </script>
    
	</body>
</html>

```
里面有比较简单的js登录验证，可以参考参考，当然都是我借鉴和修改后的

do_login.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>JSP Page</title>
    </head>
    <body>
    <%
    		Class.forName("com.mysql.jdbc.Driver");
    		String url = "jdbc:mysql://localhost:3306/mldn";
    		String username = "root";
    		String password = "123456";
    		Connection conn = DriverManager.getConnection(url,username,password);
    		String sql = "select * from user_info where user_name=? and user_password=?";
    		PreparedStatement preStmt = conn.prepareStatement(sql);
    		preStmt.setString(1,request.getParameter("t_name"));
    		preStmt.setString(2,request.getParameter("t_psd"));
    		ResultSet rs = preStmt.executeQuery();
    		if( rs.next())
    		{
    			//response.sendRedirect("web.jsp");
    			response.sendRedirect("Login_success.jsp");
    		}
    			else
    			{
    				response.sendRedirect("Login_fail.jsp");
    			}
    	%>
 	</body>
</html>
```
从这里开始就有数据库的代码了，如果你没有jar包，我可以那我的给你试试，一套完整的！
下载链接：链接：[综合软件安装包](%E9%93%BE%E6%8E%A5%EF%BC%9Ahttps://pan.baidu.com/s/1K6a8Mj_cQZqX5CNjKcfX4w)  提取码：s9ez

login_fail.jsp和login_success.jsp 

```bash
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
    <script>
    	alert("用户名或密码错误，登录失败，点击确认跳转到登录界面")
    </script>
    	<%response.setHeader("Refresh","1;url=http://localhost:8080/Jsp/Login.jsp");%>
 	</body>
</html>


//
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
    <script>
    	alert("恭喜登录成功！即将前往主页...")
    </script>
    	<%response.setHeader("Refresh","1;url=http://localhost:8080/Jsp/webindex.jsp");%>
    	
 	</body>
</html>
```
主要是实现跳转功能，放一起了！

Register.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
	</head>
	<body>
		<div id="" class="logo">
			<h1>Travel Heart</h1>
		</div>
		
		<div class="box">
			<div class="top">
		<div class="dlname">
			<ul class="c1" id="ul1">
			<li>用户注册</li>
			</ul>
			</div>
		<div class="dlname1">
			<ul class="c2" id="u1">
			<li>USER &nbsp;REGISTER</li>
			</ul>
			</div>
		</div>
			<div class="boxd" id="box1">
				<div class="block">
				<form action="do_Reg.jsp" method="post">
				<input type="text" name="t_name" id="user_name" value="" placeholder="用户名" onfocus="javascript:if(this.value=='用户名')this.value='';" class="user"/>
				<input type="password" name="t_psd" id="password"  value="" placeholder="密码" class="pwd1"/>
				<input type="password" name="re_psd" id="repassword"  value="" placeholder="再次输入密码" class="repwd"/><br />
				<input type="checkbox" name="checked" id="rem" value="" class="check"/>
				<label for="rem" style="color: #b2b2b2;">&nbsp;&nbsp;&nbsp;记住用户名和密码</label><br />
				<input type="submit" value="注册" onclick="return check();" class="sub"/>
				</form>
				<span class="c3">已有账号？</span>&nbsp;&nbsp;<span class="c4"><a href="Login.jsp" class="dl">立即登录</a></span>
			</div>
			
		</div>
	</div>
	<script>
		function check() {
			var flag = true;
    		var admin = document.getElementById("user_name").value;
    		var password = document.getElementById("password").value;
    		var repassword = document.getElementById("repassword").value;
			if ("" == admin){
				alert("请输入用户名！");
				flag = false;
				return false;
			}
			else if ("" == password){
				alert("请输入密码！");
				flag = false;
				return false;
			}
			else if ("" == repassword){
				alert("再次输入密码框为空！");
				flag = false;
				return false;
			}
			else if (password != repassword){
				alert("两次密码输入不一致，请重新输入！");
				flag = false;
				return false;
			}
			if(flag == true){
				return true;
				//form.submit();
			}
		}
	</script>
	</body>
</html
```
do_Reg.jsp  

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<%-- <%@ page   errorPage="Reg_fail.jsp" %> --%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
    	<%
    		ResultSet rs =null;
    		Class.forName("com.mysql.jdbc.Driver");
    		String url = "jdbc:mysql://localhost:3306/mldn";
    		String username = "root";
    		String password = "123456";
    		Connection conn = DriverManager.getConnection(url,username,password);
    		
    		String user_name = request.getParameter("t_name");
    		String sql1 = "select * from user_info where user_name='"+user_name+"'";
    		PreparedStatement pst = conn.prepareStatement(sql1);
    		rs = pst.executeQuery(sql1);
     		if (rs.next()) {
     		   	response.sendRedirect("Reg_fail.jsp");
     		}
     		else 
     		{
    		String sql = "INSERT INTO user_info(user_name,user_password) VALUES(?,?)";
    		PreparedStatement preStmt = conn.prepareStatement(sql);
    		preStmt.setString(1,request.getParameter("t_name"));
    		preStmt.setString(2,request.getParameter("t_psd"));
    		int rows = preStmt.executeUpdate();
    		if( rows > 0)
    		{
    			response.sendRedirect("Reg_success.jsp");
    		}
    		else
    			{
    				response.sendRedirect("Reg_fail.jsp");
    			}
     		}
    	%>
 	</body>
</html>
```
reg_fail.jsp/reg_fail.jsp

```bash
<!DOCTYPE html>
<html>
    <head>
        <%@page language="java" contentType="text/html;charset=UTF-8"%>
        <title>JSP Page</title>
    </head>
    <body>
    <script>
    	alert("用户名已存在，注册失败，将重新跳转到注册页面")
    </script>
    	<%response.setHeader("Refresh","3;url=http://localhost:8080/Jsp/Register.jsp");%>
 	</body>
</html>
//
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
    <script>
    	alert("恭喜你注册成功！即将跳转登录界面")
    </script>
    	<%response.setHeader("Refresh","1;url=http://localhost:8080/Jsp/Login.jsp");%>
 	</body>
</html>
 ```
管理界面
guanli.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/style1.css">
<style>
	#active a {
		background-color: #0c53ad;
		color: #fff;
	}
	
	.last:hover {
		color: #fff;
		background: #0c53ad;
	}
	
	.bigbox {
		width: 900px;
		height:100%;
		margin: 20px auto 0;
		/*background: red;*/
	}
	table {
		border: 1px solid white;
	}
 	tr { 
 	   /*width: 300px; 
 		height: 36px; 
 		margin: 0 auto; 
 		text-align: center;*/
	} 
 	tr td { 
 		width: 120px;  
 		text-align: center; 
 		margin-left: -20px;
 		/*height: 36px;
 		line-height: 20px; 
 		*/
 	}
 	.tdjs {
 		width:300px;
 	}
 	.js {
 		width:300px;
 	}
	h4 >a {
		text-decoration: none;
		margin-left: 30px;
	}
	h4 >a:hover {
		color: deeppink;
	}
	img {
		width:100px;
		height:60px;
	}
	.page {
 		margin:50px 30px;
 	}
    .page:link {
        color: skybule;
    }
    .page:visited {
        color: pink;
    }
    .page:hover {
        color: green;
    }
    .page:active {
        color: red;
    }
</style>
<title>管理页</title>
</head>

<body>
<script>
	function setTab(m, n) { //虽然该m可以知道是一个常数1，但是在函数中参数是不能已知的，故只能写成m，但是"menus"+m <=> "menus1"
		var tli = document.getElementById("ul" + m).getElementsByClassName("lia"); //控制悬浮标题的显示与遮盖
		var mli = document.getElementById("box" + m).getElementsByTagName("div");
		//控制悬浮标题时，对应内容的显示与遮盖
		for(i = 0; i < tli.length; i++) {
			tli[i].id = (i == n) ? "active" : "";
			mli[i].style.display = (i == n) ? "block" : "none";
		}
	}
</script>
<%
    		Class.forName("com.mysql.jdbc.Driver");
    		String url = "jdbc:mysql://localhost:3306/mldn";
    		String sql_user = "root";
    		String sql_password = "123456";
    		Connection conn = DriverManager.getConnection(url,sql_user,sql_password);
    		ResultSet rs =null;
    		int cur_page=1;//当前第一页
    		if(request.getParameter("cur_page")!= null)
    		{
    			cur_page=Integer.parseInt(request.getParameter("cur_page"));
    		}
    		int num_page=2;//每页显示两条记录
        	//int cur_page=1;//当前第一页
        	//int num_page=2;//每页显示两条记录
        	String sql = "select * from lv_info limit ?,?";
        	PreparedStatement pst = conn.prepareStatement(sql);
        	pst.setInt(1,(cur_page-1)*num_page);
        	pst.setInt(2,num_page);
        	rs = pst.executeQuery("select count(*) totalCount from lv_info");//这样就OK了
        	int rowCount = 0;
        	if(rs.next()) {
        	  rowCount=rs .getInt("totalCount");
        	}
        	rs = pst.executeQuery();
    		
    		String sql1 = "select * from user_info";
    		PreparedStatement pst1 = conn.prepareStatement(sql1);
    		ResultSet rs1 = pst1.executeQuery();
    		
    		
		
%>
<!------------导航部分----------------->
<ul class="nav" id="ul1">
	<li class="logo">TraHeart</li>
	<li style="margin-left: 50px;"><a href="webindex.jsp" class="last">返回首页</a></li>
	<li class="lia" onmousedown="setTab(1,0)" id="active" style="margin-left: 50px;width: 200px;"><a href="#">商品信息管理</a></li>
	<li class="lia" onmousedown="setTab(1,1)" style="margin-left: 50px;width: 200px;"><a href="#">用户信息管理</a></li>
</ul>
<hr />

<div class="bigbox" id="box1">
	
	<div class="block">
		<br />
		<h2 style="text-align: center;color: deepskyblue;">商品信息界面</h2>
				<h4><a href="selectshop.jsp">查询</a><a href="addlv.jsp">添加</a></h4>
				<table align="center" width="900px" height="400px">
			<tr>
				<td>记录</td>
				<td>商品名称</td>
				<td class="tdjs">商品介绍</td>
				<td>商品图片</td>
				<td>原价</td>
				<td>现价</td>
				<td colspan="2">操作</td>
				
			</tr>
			<% 
			while(rs.next()) {%>
			<tr>
				<td><%=rs.getInt("id")%></td>
				<td><%=rs.getString("lvmc")%></td>
				<td class="js"><%=rs.getString("lvjs")%></td>
				<td><img src="<%=rs.getString("lvtp")%>" alt=""></td>
				<td><%=rs.getDouble("yj")%>RMB/$</td>
				<td><%=rs.getDouble("xj")%>RMB/$</td>
				<td><a href="detaillv.jsp?id=<%=rs.getInt("id") %>" style="color: #676767; text-decoration: none;">修改</a></td>
				<td><a href="delete.jsp?id=<%=rs.getInt("id") %>" style="color: #676767; text-decoration: none;">删除</a></td>
			</tr>
		<% }%>
		</table>
	<% if(cur_page != 1)
	{ %>
		<a href="guanli.jsp?cur_page=1" class="page">首页</a>
	<% }%>	
	<% if(cur_page >=1 && cur_page < ((rowCount+num_page -1)/num_page))
	{ %>
		<a href="guanli.jsp?cur_page=<%=cur_page+1%>" class="page">下一页</a>
	<% }%>
	<% if(cur_page >1 &&  cur_page <= ((rowCount+num_page -1)/num_page))
 	{%> 
		<a href="guanli.jsp?cur_page=<%=cur_page-1%>" class="page">上一页</a>
	<% }%>
	<% if(cur_page != (rowCount+num_page-1)/num_page)
	{ %>
		<a href="guanli.jsp?cur_page=<%=(rowCount+num_page-1)/num_page%>" class="page">尾页</a>
	<% }%>
<span>当前页为第<em style="color:red;"><%=cur_page%></em>页</span>
<span>总页数为<%=(rowCount+num_page-1)/num_page%>页</span><br/> 
 </div>

<!------------第二部分----------------->
		<div>
		<br />
		<h2 style="text-align: center;color: deepskyblue;">用户信息界面</h2>
				<h4><a href="selectuser.jsp">查询</a></h4>
		<table align="center" width="500px" height="600px">
			<tr>
				<td>记录</td>
				<td>用户名</td>
				<td>密码</td>
			</tr>
			<% 
			while(rs1.next()) {%>
			<tr>
				<td><%=rs1.getInt("id")%></td>
				<td><%=rs1.getString("user_name")%></td>
				<td><%=rs1.getString("user_password")%></td>
			</tr>
		<% }%>	
		</table>
	</div>
</div>

</body>
</html>


```

 
关键的增删查改来了，他来了，他来了哦！

实现修改：
detaillv.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="css/upform.css"/>
        <title>商品修改界面</title>
    </head>
    <body>
    	<%
    	//request.setCharacterEncoding("utf-8");
		ResultSet rs =null;
    	Class.forName("com.mysql.jdbc.Driver");
    	String url = "jdbc:mysql://localhost:3306/mldn?useUnicode=true&characterEncoding=utf-8";
    	String sql_user = "root";
    	String sql_password = "123456";
    	Connection conn = DriverManager.getConnection(url,sql_user,sql_password);
    	String sql = "select * from lv_info where id=?";
    	PreparedStatement pst = conn.prepareStatement(sql);
    	pst.setInt(1,Integer.parseInt(request.getParameter("id")));
    	rs = pst.executeQuery();
    	rs.next();
    	%>
    		
    	<form action="updateform.jsp" method="post">
    	<div class="box">
    	<div class="boxx">商品编号：<input type="text" name="id"  value="<%=rs.getInt("id")%>"  readonly="readonly" class="inyx" /></div><br />
    	<div class="boxx">商品名称：<input type="text" name="lvmc" value="<%=rs.getString("lvmc")%>"  class="inyx" /></div><br />
    	<div class="boox2"><span>商品介绍：</span><textarea class="jsg" name="lvjs"><%=rs.getString("lvjs")%></textarea></div><br />
    	<div class="boxx">商品图片：<input type="text" name="lvtp" value="<%=rs.getString("lvtp")%>"  class="inyx1" /></div><br />
    	<div class="boxx">&nbsp;&nbsp;&nbsp;原&nbsp;&nbsp;价&nbsp;&nbsp;：<input type="text" name="yj" value="<%=rs.getDouble("yj")%>"  class="inyx" /></div><br />
    	<div class="boxx">&nbsp;&nbsp;&nbsp;现&nbsp;&nbsp;价&nbsp;&nbsp;：<input type="text" name="xj" value="<%=rs.getDouble("xj")%>"  class="inyx" /></div><br />
    	<div class="boxx1"><input type="submit" name="submit" value="修改" class="sub" /></div>
    	</div></form>
 	</body>
</html>
```
updateform.jsp  

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>修改</title>
    </head>
    <body>
    	<%
    	request.setCharacterEncoding("UTF-8");
		ResultSet rs =null;
    	Class.forName("com.mysql.jdbc.Driver");
    	String url = "jdbc:mysql://localhost:3306/mldn?useUnicode=true&characterEncoding=utf-8";
    	String sql_user = "root";
    	String sql_password = "123456";
    	Connection conn = DriverManager.getConnection(url,sql_user,sql_password);
    	String sql = "update lv_info set lvmc=?,lvjs=?,lvtp=?,yj=?,xj=? where id=?";
    	PreparedStatement pst = conn.prepareStatement(sql);
    	pst.setString(1,request.getParameter("lvmc"));
    	pst.setString(2,request.getParameter("lvjs"));
    	pst.setString(3,request.getParameter("lvtp"));
    	pst.setDouble(4,Double.parseDouble(request.getParameter("yj")));
    	pst.setDouble(5,Double.parseDouble(request.getParameter("xj")));
    	pst.setInt(6,Integer.parseInt(request.getParameter("id")));
    	response.setCharacterEncoding("utf-8");
    	int rows = pst.executeUpdate();
    	if(rows>0) {
    		response.sendRedirect("guanli.jsp");
    	}
    	%>
 	</body>
</html>
```

实现添加
addlv.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="css/upform.css"/>
        <title>商品添加界面</title>
    </head>
    <body>
    		<%
    	//request.setCharacterEncoding("utf-8");
		ResultSet rs =null;
    	Class.forName("com.mysql.jdbc.Driver");
    	String url = "jdbc:mysql://localhost:3306/mldn?useUnicode=true&characterEncoding=utf-8";
    	String sql_user = "root";
    	String sql_password = "123456";
    	Connection conn = DriverManager.getConnection(url,sql_user,sql_password);
    	String sql = "select count(*) totalCount from lv_info";
    	PreparedStatement pst = conn.prepareStatement(sql);
    	int count = 0;
    	try {
    		rs = pst.executeQuery();
			if (rs.next()) {
				count = rs.getInt(1);
			}
    	}catch(Exception e) {
    		
    	}
    	int rowCount = 0;
    	rowCount =rs.getInt("totalCount");
    	%>
    	<form action="addform.jsp" method="post">
    	<div class="box">
    	<div class="boxx">商品编号：<input type="text" name="id"  value="<%=count+1%>" placeholder=""  readonly="readonly" class="inyx" /></div><br />
    	<div class="boxx">商品名称：<input type="text" name="lvmc" value="" placeholder="" class="inyx" /></div><br />
    	<div class="boox2"><span>商品介绍：</span><textarea class="jsg" name="lvjs"></textarea></div><br />
    	<div class="boxx">商品图片：<input type="text" name="lvtp" value=""  class="inyx1" /></div><br />
    	<div class="boxx">&nbsp;&nbsp;&nbsp;原&nbsp;&nbsp;价&nbsp;&nbsp;：<input type="text" name="yj" value=""  class="inyx" /></div><br />
    	<div class="boxx">&nbsp;&nbsp;&nbsp;现&nbsp;&nbsp;价&nbsp;&nbsp;：<input type="text" name="xj" value=""  class="inyx" /></div><br />
    	<div class="boxx1"><input type="submit" name="submit" value="添加" class="sub" /></div>
    	</div></form>
 	</body>
</html>
```
addform.jsp

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="css/upform.css"/>
        <title>商品修改界面</title>
    </head>
    <body>
    	<%
    	request.setCharacterEncoding("utf-8");
    	Class.forName("com.mysql.jdbc.Driver");
    	String url = "jdbc:mysql://localhost:3306/mldn?useUnicode=true&characterEncoding=utf-8";
    	String sql_user = "root";
    	String sql_password = "123456";
    	Connection conn = DriverManager.getConnection(url,sql_user,sql_password);
    	String sql = "insert into lv_info (lvmc,lvjs,lvtp,yj,xj,id) values(?,?,?,?,?,?)";
    	PreparedStatement pst = conn.prepareStatement(sql);
    	pst.setString(1,request.getParameter("lvmc"));
    	pst.setString(2,request.getParameter("lvjs"));
    	pst.setString(3,request.getParameter("lvtp"));
    	pst.setDouble(4,Double.parseDouble(request.getParameter("yj")));
    	pst.setDouble(5,Double.parseDouble(request.getParameter("xj")));
    	pst.setInt(6,Integer.parseInt(request.getParameter("id")));
    	response.setCharacterEncoding("utf-8");
    	int rs = pst.executeUpdate();
    	%>
    	<script type="text/javascript">
			alert("添加成功，即将跳转！");
		</script>
		<%response.setHeader("Refresh","1;url=http://localhost:8080/Jsp/guanli.jsp");%>
 	</body>
</html>
```
最后实现删除  

```bash
<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="css/upform.css"/>
        <title>商品修改界面</title>
    </head>
    <body>
    	<%
    	//request.setCharacterEncoding("utf-8");
    	Class.forName("com.mysql.jdbc.Driver");
    	String url = "jdbc:mysql://localhost:3306/mldn?useUnicode=true&characterEncoding=utf-8";
    	String sql_user = "root";
    	String sql_password = "123456";
    	Connection conn = DriverManager.getConnection(url,sql_user,sql_password);
    	String sql = "delete from lv_info where id=?";
    	PreparedStatement pst = conn.prepareStatement(sql);
    	pst.setInt(1,Integer.parseInt(request.getParameter("id")));
    	int rs = pst.executeUpdate();
    	%>
    	<script type="text/javascript">
			alert("删除成功，即将跳转！");
		</script>
		<%response.setHeader("Refresh","1;url=http://localhost:8080/Jsp/guanli.jsp");%>
 	</body>
</html>
```
代码分享完毕，接下来我们还需要css和js来修饰一下子哈

CSS共有6个，其中包括一些动画效果的css哦，比如斜切，旋转，平移，缩放四种以及美观的登录和注册界面，图片展示放做后，也给自己欣赏欣赏！

css,js以及图片下载链接：[js在css文件夹哦](%E9%93%BE%E6%8E%A5%EF%BC%9Ahttps://pan.baidu.com/s/1DMa69ebrJacbrI3KRXHFjw)  
提取码：60ww   

(备注：JS代码完全来自于他人，并非原创，感谢分享!)主要用来实现==随机随机生成四位验证码==


该附上我的图片了，当然经过我的多次实践，目前还没有很大的问题，基本上已解决，如有调试出现问题的朋友，欢迎留言讨论指出，感谢！

就附上登录和注册以及分页界面吧！
理论效果展示：（对了，我用的是火狐浏览器，推荐使用一样的，否则可能会有偏差!）
分页界面——web.jsp

![案例作品](https://img-blog.csdnimg.cn/20200617081407600.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70)
![产品介绍](https://img-blog.csdnimg.cn/20200617081406384.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70)
![联系我们](https://img-blog.csdnimg.cn/20200617081403952.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70)
![关于我们](https://img-blog.csdnimg.cn/20200617081404888.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70

登录，注册  
![登录](https://img-blog.csdnimg.cn/20200617081540349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70)
![注册](https://img-blog.csdnimg.cn/20200617081540299.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70)网页效果还是可以的吧！

功能介绍：
1.登录界面利用js实现了两种登录方式，但是后面那种我没有去实现，理论一样，想完善的小伙伴可以去试试。其次能够简单检验
用户名，密码框是否为空

2.注册也能够实现用户名，密码，复写密码框的为空判断以及两次密码是否一致

综上两点不足之处在于没有用ajax实现自动提示，都是以提交按钮来进行一系列操作的，Ajax没学过，以后慢慢学，现在学python要紧！

3，利用一个很实用的js实现点击标题，切换内容
假设1 2 3为导航栏上的标题     在页面固定一个div，给定边框样式或者背景样式，便于观察
给定js事件给1 2 3，当我悬浮（onmouseover）或者是点击（onmousedowm，注意不是onclick，这个主要用于提交button事件）1 2 3时，
div会给出对象的内容，假定div中也有三个对应的div 命名为 div1 div2 div3


你是否注意到，css中有一个控制div盒子显示或不显示的样式？对，就是 display
display:block  显示 display：none 隐藏
我们可以绑定 1和div1 当然如果你是通过标签来访问，这里的div1里面的标签尽量不能在使用div 多说无益，上代码参考对照：

```bash
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>登录-悬浮</title>
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
			/*background: green;*/
		}
		.top #ul1 .hover {
			border-bottom: 1.5px solid #929ba2;
			color: #838486;
		}
		.buttom div {display: none;}
		.buttom	.block {display: block;}
	</style>
</head>

<body>
	<script>
	function setTab(m, n) { //虽然该m可以知道是一个常数1，但是在函数中参数是不能已知的，故只能写成m，但是"menus"+m <=> "menus1"
		var tli = document.getElementById("ul" + m).getElementsByTagName("li"); //控制悬浮标题的显示与遮盖
		var mli = document.getElementById("but" + m).getElementsByTagName("div"); //控制悬浮标题时，对应内容的显示与遮盖
		for(i = 0; i < tli.length; i++) {
			tli[i].className = (i == n) ? "hover" : "";
			mli[i].style.display = (i == n) ? "block" : "none";
		}
	}
	// id="ul1" > li标签    		id="but1"  >div标签	因为我这里的3个div里面没有div标签，所以我直接这样访问是可以的
	//如果div不唯一，亦可以给定一个唯一的但又能够多次使用的  那无疑是class，而不是id，id只能用一次
	
</script>
<!----第一个控制整个页面---->
	<div class="box">
		<!----第二个控制导航栏---->
		<div class="top">
			<ul id="ul1">
			<li class="hover" onMouseOver="setTab(1,0)">快速登录</li>
		    <li onMouseOver="setTab(1,1)">账号密码登录</li>
			</ul>
		</div>
			
		<!----第三个控制固定显示内容的div--所有需要实现小div都写在里面，通过给定class类名给定对应的css样式来控制显示或隐藏----->
		<div class="buttom" id="but1">
				<!----等价于 div1--默认显示--因为给定了class="block" ---具体见style样式-->
			<div class="block">
				<dt class="nr">
					<br><br>
			<input type="text" name="" value="" class="ipt1" size="30" placeholder="支持学号登录"><br><br>
			<input type="password" name="" value="" class="ipt2" size="30" placeholder="密码"><br><br><br><br>
			<input type="submit" name="submit" value="登&nbsp;&nbsp;录" class="ipt4"><br><br>
				</dt>
				</div>
				
			<!----等价于 div2----具体见style样式-->
			<div>
				<dt class="nr">
					<br><br>
			<input type="text" name="" value="" class="ipt1" placeholder="支持qq号/邮箱/手机号登录"><br><br>
			<input type="password" name="" value="" class="ipt2" placeholder="密码"><br><br>
			<input type="checkbox" name="" value="" class="ipt3">&nbsp;&nbsp;下次自动登录<br><br>
			<input type="submit" name="submit" value="登&nbsp;&nbsp;录" class="ipt4"><br><br>
				</dt>
				</div>
			<!----等价于 div3----具体见style样式-->
			<div>
			<span>哈哈！</span>
				</div>
	</div>
		
</div>
<!---等级： .box>.top+(.buttom/.block+div+div)--.top(div)用来控制标题   .buttom(div)用来控制3个显示内容的div-->
</body>
</html>

```

## **最后说说我在完成该项目遇到的问题及解决办法**
 1.如何验证注册名已存在？

本人学的不是很好，所以在CSDN中找了半天才找到适合自己的。


首先，在不会写判断代码的条件下，最为简易的办法就是在数据库中将用户名设置为主键，来确定它的唯一性。当然，这种做法会有局限
就是在do_reg.jsp界面会直接提示错误——405  告知你该用户名已存在，key键唯一，但是没有跳转到你给定的错误界面reg_fail.js
解决办法就是添加异常语句，使其不弹出错误，但是很无奈，我不会写，也没找到合适的
但是有个更简便的方法：添加这一句

```bash
<%@ page   errorPage="Reg_fail.jsp" %>

```

当然，这种办法会给后面分页显示数据，修改信息等造成一些麻烦，我们的id无法保持唯一性了，默认我们都是id设为主键的，因为它可以自动递增
第二种就是老老实实写出判断是否已存在的代码
解决办法

```bash
String user_name = request.getParameter("t_name");
    		String sql1 = "select * from user_info where user_name='"+user_name+"'";
    		PreparedStatement pst = conn.prepareStatement(sql1);
    		rs = pst.executeQuery(sql1);
     		if (rs.next()) 
                {
     		   	response.sendRedirect("Reg_fail.jsp");
     	}

     		else 
     		{

    		String sql = "INSERT INTO user_info(user_name,user_password)VALUES(?,?)";
    		PreparedStatement preStmt = conn.prepareStatement(sql);
    		preStmt.setString(1,request.getParameter("t_name"));
    		preStmt.setString(2,request.getParameter("t_psd"));
    		int rows = preStmt.executeUpdate();

    		if( rows > 0)
    		{
    			response.sendRedirect("Reg_success.jsp");
    		}
    		else
    		{
    			response.sendRedirect("Reg_fail.jsp");
    		}
     	}
```
String sql1 = "select * from user_info where user_name='"+user_name+"'";

这一句是关键，用来判断数据库中是否有已注册用户名与从注册界面接收的用户名相同，具体看代码自己体会

==如何分页？==   
分页首先要获取总记录数，确定每页显示几条记录等等，然后利用一个等式去计算总页数 

```bash
int cur_page=1;//当前第一页
		if(request.getParameter("cur_page")!= null)
		{
			cur_page=Integer.parseInt(request.getParameter("cur_page"));
		}
		int num_page=2;//每页显示两条记录
    	//int cur_page=1;//当前第一页
    	//int num_page=2;//每页显示两条记录
    	String sql = "select * from older_list limit ?,?";
    	PreparedStatement pst = conn.prepareStatement(sql);
    	pst.setInt(1,(cur_page-1)*num_page);
    	pst.setInt(2,num_page);
    	rs = pst.executeQuery("select count(*) totalCount from older_list");//这样就OK了
    	int rowCount = 0;
    	if(rs.next()) {
    	  rowCount=rs .getInt("totalCount");
    	}
    	rs = pst.executeQuery();
   		while(rs.next())
    	{
    		%>
    		
		<tr>
			<td><%=rs.getInt("id")%></td>
			<td><%=rs.getString("shop_name")%></td>
			<td><%=rs.getDouble("shop_price")%></td>
			<td><%=rs.getInt("shop_num")%></td>
			<td><%=rs.getDouble("total_price")%></td>
			<td><a href="detail_list.jsp?id=<%=rs.getInt("id") %>" style="text-decoration: none;">修改</a></td>
		</tr>
	<%}%>

	</table>
	<br/>
	<% if(cur_page != 1)
	{ %>
		<a href="older_list.jsp?cur_page=1">首页</a>
	<% }%>	
	<% if(cur_page >=1 && cur_page < ((rowCount+num_page -1)/num_page))
	{ %>
		<a href="older_list.jsp?cur_page=<%=cur_page+1%>">下一页</a>
	<% }%>
	<% if(cur_page >1 &&  cur_page <= ((rowCount+num_page -1)/num_page))
 	{%> 
		<a href="older_list.jsp?cur_page=<%=cur_page-1%>">上一页</a>
	<% }%>
	<% if(cur_page != (rowCount+num_page-1)/num_page)
	{ %>
		<a href="older_list.jsp?cur_page=<%=(rowCount+num_page-1)/num_page%>">尾页</a>
	<% }%>
```

 
关键sql语句：String sql = "select * from older_list limit ?,?";
总页数计算：(rowCount+num_page -1)/num_page   （总记录数+每页显示条数-1）/每页显示条数
这个公式可以完美解决总记录数是否是偶数还是单数的问题，这可能就是数学的魅力


==备注==：我使用的数据库是 mldn  安装mysql编口号是3306  请对应好自己的，以免出现不必要的错误！

所使用的表格 user_info 实现用户信息    lv_info 实现商品信息 
![user_info](https://img-blog.csdnimg.cn/20200617082127202.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70)
![lv_info](https://img-blog.csdnimg.cn/20200617082127199.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70)
总之很多问题都是关键的sql语句不会写，思路大家都有！本项目唯一不足就是没有实现购物车功能，哈哈越往后越复杂，慢慢学！

对了，对应的图片也应该发给你们，毕竟我们要学会云分享，与时俱进，希望有小伙伴能指出其中的问题，或者优化代码等问题哦



**原创不易，可以借鉴，但不可完全复制，毕竟这是我的个人学校作业，欢迎转载！** 