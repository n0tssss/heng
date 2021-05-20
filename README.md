# 记仇小本本

> 与你的第三个 520

前段时间我们聊到 “记仇” 的话题，当时就突发奇想做一个好用简约的 “记仇小本本”，随即开工。
一天时间完成了这个小玩意，后端基于 Node，前端则使用 Vue 完成。

# 预览

[点我进入](https://heng.n0ts.cn/)

![](https://cdn.nutssss.cn/wp-content/uploads/2021/05/1621480993-Snipaste_2021-05-20_11-17-37.png)

# 使用到的技术

前端：Vue + ElementUI
后端：Node
数据存储：Gitee Issues

# 使用教程

前端与后端都存在一个 `config` 的文件夹，里面是网站的 **配置文件**

## 前端配置

前端的文案内容都在 `./config/lovexhj.json` 进行配置，其中 `ServerBase` 为 Node 部署后的地址；

修改完毕后直接丢到服务器一把梭即可；

## 后端配置

后端需要配置 Gitee Open API，首先进入 `Gitee - 个人设置 - 私人令牌`，[点我进入](https://gitee.com/profile/personal_access_tokens)

点击 `生成新令牌`

只需要勾选 `issues` 这项即可

生成后将令牌填写到后端的 `./api/config/lovexhj.json` 中的 `access_token` 中，
`owner` 填写自己的账号，repo 则是填写自己的仓库名称（仓库可设为私有），`password` 则是自己设置一个记仇上传的密码，部署即可；

我使用的是宝塔面板中的 PM2管理器 进行 Node 项目的部署

# 更新日志

> 2021-5-21

+ 新增身份选择功能，可在前端 config 进行配置
+ 密码输入后可以直接上传文章无需再次点击
+ 密码错误可再次重新输入
+ 后端逻辑 bug 修复

> 2021-5-20

+ 新增懒加载功能，每次加载十条记仇
+ 新增密码录入功能，只需要输入一次密码即可连续记仇
+ 新增了阴影美化
+ 修复了富文本菜单不能用问题
+ 修复了加载页面一些显示问题

# QQ群讨论

[坚果小栈](https://jq.qq.com/?_wv=1027&k=Mh7ah6Dd)