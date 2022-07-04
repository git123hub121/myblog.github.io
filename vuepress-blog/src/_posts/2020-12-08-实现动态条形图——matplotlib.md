---
title: 实现动态条形图——matplotlib
date: 2020-12-08
tags:
  - Python
  - matplotlib
---

说明：
首先保证你导入的数据是这样的：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208230213815.png)
***数据源：***
[链接：https://pan.baidu.com/s/13HzYkMspIzKQRGUxndozQg](https://pan.baidu.com/s/13HzYkMspIzKQRGUxndozQg)
提取码：love 

#### 1.导入模块，读取文件

```python
import pandas as pd
df = pd.read_csv('D:/Python/Mypython/python项目集锦/actor-弹幕数据分析/df_resuluts.csv',engine='python',encoding='utf-8')
df.head(5)
```

#### 2.绘制单个图
```python
%matplotlib inline
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import matplotlib.animation as animation
from IPython.display import HTML
#显示中文（可能还会显示不了，请自行百度解决中文问题）
plt.rcParams['font.sans-serif']=['SimHei']

df2 = df[['name', '2020-09-28']].sort_values(by='2020-09-28', ascending=False).head(10)#内嵌一个列表实现取两列，温习
df2.sort_values(by='2020-09-28', ascending=True, inplace=True)
df2#为了条形图做准备
```

```python
fig, ax = plt.subplots(figsize=(15, 8))
ax.barh(df2['name'], df2['2020-09-28'])
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208230431897.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70#pic_center)

#### 3.为y轴数据随机配色
```python
colors = ['#adb0ff', '#ffb3ff', '#90d595', '#e48381', '#aafbff', '#f7bb5f', '#eafb50', 
         '#adb0ff', '#ffb3ff', '#90d595', '#e48381', '#aafbff', '#f7bb5f', '#eafb50',
         '#adb0ff', '#ffb3ff', '#90d595', '#e48381', '#aafbff', '#f7bb5f', '#eafb50',
         '#adb0ff', '#ffb3ff', '#90d595', '#e48381', '#aafbff', '#f7bb5f', '#eafb50',
         '#adb0ff', '#ffb3ff', '#90d595', '#e48381', '#aafbff', '#f7bb5f', '#eafb50',
          '#adb0ff', '#ffb3ff', '#90d595', '#e48381', '#aafbff', '#f7bb5f', '#eafb50',
          '#adb0ff', '#ffb3ff', '#90d595', '#e48381', '#aafbff']

#给每个国家随机分配颜色
namecolors = dict()
names = set(df['name'])
for color, name in zip(colors, names):#多个序列(列表，元组，集合)同时遍历，使用zip()方法，这里很高级哦！
    namecolors[name] = color
    
namecolors
```

#### 4.绘制单个彩色图
```python
fig, ax = plt.subplots(figsize=(15, 8))
#排名前10的国家
ax.barh(df2['name'], df2['2020-09-28'], color=[namecolors[c] for c in df2['name']])
for i, (value, name) in enumerate(zip(df2['2020-09-28'], df2['name'])):
        ax.text(value, i,     name,           size=14, weight=600, ha='right', va='bottom')
        ax.text(value, i,     f'{value:,.0f}',  size=14, ha='left',  va='center')
ax.text(1, 0.45, '2020-09-28', transform=ax.transAxes, size=46, ha='right')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208230521194.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70#pic_center)

#### 5.读取df列名
```python
list(df)
```

```python
#data = [i for i in df[1:]][1:]#瞎猫碰上死耗子了
#取出列名的几种方法之一
data = list(df)[1:] 
@datadata
```

#### 6.使用循环遍历，都是一种模板
```python
fig, ax = plt.subplots(figsize=(15, 8))

def draw_barchart(date):
    #整理数据
    date = str(date)
    df2 = df[['name', date]].sort_values(by=date, ascending=False).head(10)
    df2.sort_values(by=date, ascending=True, inplace=True)
    
    #横向条形图
    ax.clear()
    ax.barh(df2['name'], df2[date], color=[namecolors[name] for name in df2['name']])
    dx = df[date].max()/200
    
    for i, (value, name) in enumerate(zip(df2[date], df2['name'])):
        ax.text(value-dx, i,     name,           size=14, weight=600, ha='right', va='bottom')
        ax.text(value+dx, i,     f'{value:,.0f}',  size=14, ha='left',  va='center')
               
    #细节修饰
    ax.text(1, 0.45, date, transform=ax.transAxes, color='#777777', size=46, ha='right', weight=800)
    ax.text(0, 1.06, 'y轴标题', transform=ax.transAxes, size=12, color='#777777')
    
    ax.xaxis.set_ticks_position('top')
    ax.tick_params(axis='x', colors='#777777', labelsize=12)
    ax.xaxis.set_major_formatter(ticker.StrMethodFormatter('{x:,.0f}'))
    ax.xaxis.set_ticks_position('top')
    ax.tick_params(axis='x', colors='#777777', labelsize=12)

    
    ax.margins(0, 0.01)
    ax.grid(which='major', axis='x', linestyle='-')
    ax.set_axisbelow(True)
    ax.text(0.3, 1.05, '总标题',
           transform=ax.transAxes, size=24, weight=600, ha='left')
    
    plt.box(False)
    
#  for i in range(39):
draw_barchart(data[0])
```

#### 7.导入动画
```python
import matplotlib.animation as animation
from IPython.display import HTML

fig, ax = plt.subplots(figsize=(15, 8))
animator = animation.FuncAnimation(fig, draw_barchart, frames=[data[i] for i in range(39)])
HTML(animator.to_jshtml())
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208230726817.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzYwOTEy,size_16,color_FFFFFF,t_70#pic_center)

#### 8.保存为gif
```python
#保存为gif
#animator.save('resetvalue.gif', writer='imagemagick')
#animator.save('crap.gif', writer='imagemagick',  savefig_kwargs={'facecolor':'white'}, fps=1)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208230806908.gif#pic_center)

#### 9.保存为视频
```python
# 如何保存为视频
animator.to_html5_video()
#animator.save('countryflys1.mp4')
```

#### 10.导入视频需要下载ffmpeg

使用如下方法需要	先安装Anaconda3，直接在网上搜Anaconda镜像下载即可，或者官网。
cmd中使用该命令采用镜像方式安装

conda-forge是编译的ffmpeg视频编解码库，它可直接对视频读存取

```bash
conda install -c https:*//conda.anaconda.org/menpo ffmpeg*
```

```bash
conda install ffmpeg -c conda-forge
```
安装完后记得重启才会有效果
###### conda安装提速
```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --set show_channel_urls yes
```

### 补充：
使用pyecharts实现动态图
##### 1.先去pyecharts中文文档找到对应的代码，然后做如下修改

```python
data = [i for i in list(df)]#x
datay = [df.iloc[:,i] for i in range(1,40)]#y
```
##### 2.建表
```python
import pyecharts.options as opts
from pyecharts.charts import Timeline, Bar
def get(date: int) -> Bar:
    bar = (
        Bar()
        .add_xaxis(xaxis_data=x)
        .add_yaxis(
            series_name="弹幕探讨次数",
            y_axis=datay[date],
            label_opts=opts.LabelOpts(is_show=False),
        )
        .set_global_opts(
            title_opts=opts.TitleOpts(
                title="{}".format(data[date]), subtitle="人物被提及次数"
            ),
            # datazoom_opts=[opts.DataZoomOpts(), opts.DataZoomOpts(type_="inside"),],
            tooltip_opts=opts.TooltipOpts(
            is_show=True, trigger="axis", axis_pointer_type="shadow"
            ),
        )
    )
    return bar
# 生成时间轴的图
timeline = Timeline(init_opts=opts.InitOpts(width="1200px", height="600px"))

for i in range(39):
    timeline.add(get(date = i),time_point=str(data[i]))
# 1.0.0 版本的 add_schema 暂时没有补上 return self 所以只能这么写着
timeline.add_schema(is_auto_play=True, play_interval=1000,)
# timeline.render("wode.html")
```
最终得到的是一个横向柱形图。