# 记仇小本本

> 与你的第三个 520

前段时间我们聊到 “记仇” 的话题，当时就突发奇想做一个好用简约的 “记仇小本本”，随即开工。
一天时间完成了这个小玩意，后端基于 Node，前端则使用 Vue 完成。

# 预览

[点我进入](https://heng.n0ts.cn/)

![](https://cdn.nutssss.cn/wp-content/uploads/2021/05/1621480993-Snipaste_2021-05-20_11-17-37.png)

# 使用到的技术

前端：Vue

后端：Node，Express

数据存储：Gitee Issues

# 使用教程

前端与后端都存在一个 `config` 的文件夹，里面是网站的 **配置文件**

群内文件 `教程 - 记仇小本本部署教程.doxc` 可查看图文教程配置

## 后端配置

后端需要配置 Gitee Open API，首先进入 `Gitee - 个人设置 - 私人令牌`，[点我进入](https://gitee.com/profile/personal_access_tokens)

点击 `生成新令牌`

只需要勾选 `issues` 这项即可

生成后将令牌填写到后端的 `./api/config/lovexhj.json` 中的 `access_token` 中，
`owner` 填写自己的账号，repo 则是填写自己的仓库名称（仓库可设为私有），`password` 则是自己设置一个记仇上传的密码，部署即可；

我使用的是宝塔面板中的 PM2 管理器 进行 Node 项目的部署，部署后使用映射功能就可通过链接访问 API；

## 前端配置

在 `./config/config.js` 中，找到 `ServerBase`，更改成自己后端映射的地址；

同时这里面包含了小本本的文案，可随意修改；

修改完毕后直接丢到服务器一把梭即可；

## 注意事项

-   如果需要添加 ssl，前后端都需要添加上才能使用
-   前端填写接口地址时，地址不要添加最后面的 `/`，例如 `https://heng.nutssss.cn/` 必须改成 `https://heng.nutssss.cn`

# QQ 群讨论

[坚果小栈](https://jq.qq.com/?_wv=1027&k=Mh7ah6Dd)
