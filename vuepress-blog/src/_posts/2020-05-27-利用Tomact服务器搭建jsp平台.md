---
title: 利用Tomact服务器搭建jsp平台
date: 2020-05-27
tags:
  - Jsp
  - Tomact
---

## Tomact实现jsp

**1.官网安装Tomact服务器，直接百度Tomact即可**   
我这里下载的是7.104版本，但是网站更新很快，你们可能是7.105等等，但这都不影响。   
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527102531924.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70#pic_center)**2.测试Tomact服务器** 
找到bin文件夹，双击打开startup.bat，如果没有出现闪退，能够最后显示Server startup in xxxx ms ，则表示环境变量配置成功！注意，打开之后不要马上关闭，需要手动打开才能连接服务器。
如果打开秒退，则需要配置JAVA环境变量 ，去jdk官网下载一个即可，也可以先打开电脑C盘，查看是否有java文件夹，如果有，在查看里面是否有jdk，如果都有，就直接使用该安装路径。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020052710443353.png)配置完成之后，再双击打开startup.bat就不会出现闪退了，如果还有，那就只能说明你的环境配置问题。        
最后就是在浏览器输入localhost:8080/,出现一只猫即表示成功了。 

 **3.创建一个jsp网页**
 
在webapps中创建一个文件夹A，里面存放你的jsp文件；
从ROOT中复制一个WEB-INF文件夹，粘贴到 A 中；
因为只是简单测试效果，你可以使用记事本；新建一个txt，写入html代码，选择另存为，修改编码格式为utf-8，修改后缀为.jsp，命名自定义，然后放入文件夹A中即可

**4.最终测试该jsp**

浏览器输入localhost:8080/A/xxx.jsp即可看到你输入的内容

注意：如果网页无法显示，可能是你的端口号被占用，这时你可以找到conf文件夹，找到并使用记事本打开server.xml  ，修改端口，如修改为8089，保存就OK了。（找到	<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/>，将port=“8080”改为8089）

**以上就是全部内容了，来自学习心得，时代在更新，知识也要与时俱进，有时候总感觉有些东西自己写出来才是......词穷了**