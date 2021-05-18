// 加载 file-system 文件系统
let fs = require("fs");
// 加载 http 核心模块
let http = require("http");
// 引入 Axios
let axios = require("axios");

// 读取配置文件
let config = null;
fs.readFile("./config/lovexhj.json", (err, data) => {
    config = JSON.parse(data.toString());
})

// 创建 WEB 服务器
http.createServer(function (request, response) {
    // 获取请求地址
    let url = request.url;

    // 防止乱码
    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    // 获取记仇
    if (url === "/get") {
        axios.get(`https://gitee.com/api/v5/repos/${config.Gitee.owner}/${config.Gitee.repo}/issues?access_token=${config.Gitee.access_token}&state=open&sort=created&direction=desc&page=1&per_page=20`).then(res => {
            if (res.status == 200) {
                return response.end(JSON.stringify(res.data));
            }
        }, err => {
            return response.end(err);
        });
        return;
    }
    if (url === "/add") {
        // post 参数获取
        let result = "";
        request.on("data", function (chunk) {
            result += chunk;
        });
        request.on("end", function () {
            result = JSON.parse(result);

            // 数据验证
            if(result.password != config.Gitee.password) {
                return response.end("error");
            }
            if (result.title != "" && result.body != "") {
                axios.post(`https://gitee.com/api/v5/repos/${config.Gitee.owner}/issues`, {
                    access_token: config.Gitee.access_token,
                    owner: config.Gitee.owner,
                    repo: config.Gitee.repo,
                    title: result.title,
                    body: result.body
                }).then(res => {
                    if (res.status == 201) {
                        return response.end(JSON.stringify("ok"));
                    }
                }, err => {
                    return response.end(JSON.stringify(err));
                });
            }
        });
    } else {
        return response.end("404");
    }
}).listen(3000, () => {
    console.log("服务端已启动！访问地址：http://localhost:3000");
});