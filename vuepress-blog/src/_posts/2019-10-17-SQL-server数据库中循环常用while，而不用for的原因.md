---
title: SQL-server数据库中循环常用while，而不用for的原因
date: 2019-10-17
tags:
  - SQL
  - CSDN
---

## SQL-server数据库中循环常用while，而不用for的原因

这是SQL数据库的规定，for只是一个关键字，并不是一个用来引导循环的for语句。
为啥要注意呢？学习过c语言的我们都知道，循环可以使用while、do-while以及for，但是数据库中用for来写循环则会被提示错误，所以在数据库中常常使用while来做循环，而for不能做循环。

**栗子**
1.别人大佬写的代码：
```sql
DECLARE @v INT
DECLARE @sum INT
SET @v = 50
SET @sum = 0
WHILE @v<=100
BEGIN
IF @v%2 <> 0
BEGIN
IF @v%3 = 0
--SELECT @v
SET @sum = @v + @sum
END
SET @v = @v+1
END
SELECT @sum
```
2.这里的xi表示v，yi表示sum；这是我参照大佬写的最终代码，是==正确==的！
```sql
declare @xi int,@yi int
set @xi = 50
set @yi = 0
while @xi<=100
	begin
	if(@xi%3 = 0 and @xi%2 = 1)
	begin
		set @yi = @xi + @yi
	end
		set @xi = @xi + 1
	end
select @yi
```
3.这个就是我之前写的==错误代码==
```sql
declare @x int(10),@y int(10)
set @y = 0
for (@x = 50;@x <= 100;@x=@x+1) 
	begin
	if(@x%3 = 0 and @x%2 = 1)
	begin
		set @y = @x + @y
	end
end
select @y
```
**错误如下：**
1.int类型不要加参数
2.for语句在这里面无效，数据库会提示你for周围有错误
注意事项：
这里的{}在数据库中常用begin ... end来替代，可以这样理解，数据库跟你写英文差不多

**心得**
总之，当时在这里我卡了20多分钟，我深有体会。

