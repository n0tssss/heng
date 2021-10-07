// Express
const express = require("express");
// Axios
const axios = require("axios");
// file-system 文件系统
const fs = require("fs");
// 读取配置文件
const config = require("./config/config");
// 创建服务器
const app = express();

/**
 * 获取 post 参数
 */
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

/**
 * 返回类型
 * @param {*} err 错误信息
 * @param {*} data 数据
 * @returns
 */
function back(err, data) {
    return {
        error: err,
        data: data
    };
}

/**
 * 跨域配置
 */
app.all("*", (req, res, next) => {
    try {
        // google需要配置，否则报错cors error
        res.setHeader("Access-Control-Allow-Credentials", "true");
        // 允许的地址,http://127.0.0.1:9000这样的格式
        res.setHeader("Access-Control-Allow-Origin", req.get("Origin"));
        // 允许跨域请求的方法
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        // 允许跨域请求header携带哪些东西
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since");
    } catch {
        return next();
    }
    next();
});

/**
 * 获取小本本数据
 */
app.get("/get", function (req, res) {
    let { page, per_page } = req.query;
    // 数据验证
    if (!page && !per_page) {
        return res.json(back("少了点什么吧哥？", null));
    }
    axios
        .get(
            `https://gitee.com/api/v5/repos/${config.Gitee.owner}/${config.Gitee.repo}/issues?access_token=${config.Gitee.access_token}&state=open&sort=created&direction=desc&page=${page}&per_page=${per_page}`
        )
        .then(
            (res1) => {
                if (res1.status == 200) {
                    return res.json(back(null, res1.data));
                }
            },
            (err) => {
                return res.json(back(err, null));
            }
        );
});

/**
 * 记仇
 */
app.post("/add", function (req, res) {
    let { title, body, password } = req.body;

    // 数据验证
    if (!title || !body || !password) {
        return res.json(back("少了点什么吧哥？", null));
    }

    // 密码验证
    if (password != config.Gitee.password) {
        return res.json(back("爬", null));
    }

    // 请求发送
    axios
        .post(`https://gitee.com/api/v5/repos/${config.Gitee.owner}/issues`, {
            access_token: config.Gitee.access_token,
            owner: config.Gitee.owner,
            repo: config.Gitee.repo,
            title: title,
            body: body
        })
        .then(
            (res1) => {
                if (res1.status == 201) {
                    return res.json(back(null, "ok"));
                }
            },
            (err) => {
                return res.json(back(err, null));
            }
        );
});

/**
 * 其他页面处理
 */
app.get("*", function (req, res) {
    res.send("小本本跑起来了！");
});

/**
 * 服务器开启
 */
app.listen(3001, function () {
    console.log("服务端已启动！访问地址：http://localhost:3001");
});
