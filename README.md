# 记仇小本本

> 与你的第三个 520

前段时间我们聊到 “记仇” 的话题，当时就突发奇想做一个好用简约的 “记仇小本本”，随即开工。
一天时间完成了这个小玩意，开源出来给大家玩！

# 预览

[点我进入](https://heng.n0ts.cn/)

![](https://cdn.nutssss.cn/wp-content/uploads/2021/05/1621480993-Snipaste_2021-05-20_11-17-37.png)



# 使用教程

前往 [Gitee AccessToken 管理平台 (n0ts.cn)](https://gitee.n0ts.cn/) 注册一个账号，并录入自己码云的 Access Token，权限最少需要给与 Issues 操作权限

然后在 `config/config.js` 中修改如下选项

后端地址为：https://giteeapi.n0ts.cn/ 编号，编号来源于刚刚设置 Access Token 主面板会显示；

码云账号与仓库名称填上，就可以使用了！

```json
// 后端地址
ServerBase: "https://giteeapi.n0ts.cn/编号",
// 码云账号
owner: "n0ts",
// 仓库名称
repo: "jichou",
```



# 后端开源

[GiteeApi: 存储码云私钥，代理请求码云 API](https://gitee.com/n0ts/gitee-api)



# QQ 群讨论

[坚果小栈](https://jq.qq.com/?_wv=1027&k=Mh7ah6Dd)
