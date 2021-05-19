// file-system 文件系统
let fs = require("fs");
// http 核心模块
let http = require("http");
// Axios
let axios = require("axios");
// URL 模块
let parseURL = require("url");

// 读取配置文件
let config = null;
fs.readFile("./config/lovexhj.json", (err, data) => {
    config = JSON.parse(data.toString());
})

// 返回类型
function back(err, data) {
    return JSON.stringify({
        error: err,
        data: data
    });
}

// 创建 WEB 服务器
http.createServer(function (request, response) {
    // 跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("content-type", "application/json")

    // 获取请求地址
    let url = request.url;

    // 防止乱码
    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    // 获取记仇
    if (url.includes("/get")) {
        // 获取分页数据
        let page = parseURL.parse(request.url, true);

        // 数据验证
        if (!page.query.page && !page.query.per_page) {
            return response.end(back("分页参数缺失！", null));
        }

        axios.get(`https://gitee.com/api/v5/repos/${config.Gitee.owner}/${config.Gitee.repo}/issues?access_token=${config.Gitee.access_token}&state=open&sort=created&direction=desc&page=${page.query.page}&per_page=${page.query.per_page}`).then(res => {
            if (res.status == 200) {
                return response.end(back(null, res.data));
            }
        }, err => {
            return response.end(back(err, null));
        });
        return;
    }

    // 新增记仇
    if (url === "/add") {
        // post 参数获取
        let result = "";
        request.on("data", function (chunk) {
            result += chunk;
        });
        request.on("end", function () {
            try {
                result = JSON.parse(result);
            } catch {
                return response.end(back("error", null));
            }

            // 数据验证
            if (result.password != config.Gitee.password) {
                return response.end(back("爬", null));
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
                        return response.end(back(null, "ok"));
                    }
                }, err => {
                    return response.end(back(err, null));
                });
            }
        });
    } else {
        return response.end(back("404", null));
    }
}).listen(3000, () => {
    console.log("服务端已启动！访问地址：http://localhost:3000");
});