const path = require("path");

module.exports = {
  title: 'Lovers 的博客 ｜ Lovers Blog',
  description: '个人博客',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ["link", { rel: "stylesheet", href: "/style.css" }],
  ],
  
  evergreen: true,

  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-165839722-1',
    }],
    ['@vuepress/back-to-top'],
  ],

  theme: 'melodydl',
  themeConfig: {
    title: 'Lovers Blog',

    // aside personInfo
    personalInfo: {
      name: 'lzmlovers',
      avatar: '/logo.jpg',
      headerBackgroundImg: '/me.png',
      description: 'Tomorrow will be better<br/>明天会更好',
      email: '2095793572@qq.com',
      location: 'Zhangjiajie, China',
      // organization: '',
    },
    // Nav link
    nav: [ 
      {text: 'HOME', link: '/' },
      {text: 'ABOUT', link: '/about/'},
      {text: 'TAGS', link: '/tags/'}      
    ],
    header: {
      home: {
        title: 'Lovers Blog', 
        subtitle: '好好生活，慢慢相遇', 
        headerImage: '/home-bg.jpeg'
      },
      tags: {
        title: 'Tags', 
        subtitle: '遇见你花光了我所有的运气', 
        headerImage: '/tags-bg.jpg'
      },
      postHeaderImg: '/post-bg.jpeg',
    },
    // footer sns
    sns: {
      csdn: { 
        account: 'csdn', 
        link: 'https://blog.csdn.net/qq_44760912', 
      },
      weibo: { 
        account: 'weibo', 
        link: 'https://weibo.com/u/7747087955', 
      },
      // juejin: { 
      //   account: 'juejin',
      //   link: 'https://juejin.im/user/5ce784a0f265da1b8333673c'
      // },
      zhihu: { 
        account: 'zhihu',
        link: 'https://www.zhihu.com/people/xiao-zhu-wen-wen-ti'
      },
      github: { 
        account: 'github',
        link: 'https://github.com/git123hub121'
      }
    },

    // footer github button
    footer: {
      gitbtn: {
        repository: "https://ghbtns.com/github-btn.html?user=youdeliang&repo=vuepress-theme-melodydl&type=star&count=true",
        frameborder: 0,
        scrolling: 0,
        width: "80px",
        height: "20px"
      },
      custom: `Copyright &copy; Lovers Blog 2022 | <a href="https://www.vuepress.cn/" target="_blank">VuePress</a>`
    },
    pagination: {
      perPage: 5,
    },

    comments: {
      owner: 'youdeliang',
      repo: 'vuepress-theme-melodydl',
      clientId: 'dfba8ecad544784fec1f',
      clientSecret: '1358ac11bc8face24f598601991083e27372988d',
      autoCreateIssue: false,
    },
  }
}