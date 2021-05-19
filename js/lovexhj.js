const lovexhj = new Vue({
    el: "#lovexhj",
    data() {
        return {
            ServerBase: "http://localhost:3000", // Node 后端地址
            localConfig: null, // 本地配置
            jsonConfig: null, // Json 配置
            wdnmdData: null, // 记仇数据
            wdnmdIndex: 0, // 当前选择的记仇
            wdnmdGo: true, // 是否在首页
            title: "", // 记仇标题
            body: "", // 记仇内容
        }
    },
    mounted() {
        // 本地配置获取
        this.getLocalConfig();
        // Json 配置获取
        this.getJsonConfig();
    },
    methods: {
        // 本地配置获取
        getLocalConfig() {
            // 获取配置，没有则初始化
            this.localConfig = JSON.parse(window.localStorage.getItem("lovexhj"));
            if (!this.localConfig) {
                window.localStorage.setItem("lovexhj", JSON.stringify({
                    "theme": "light"
                }));
                this.localConfig = JSON.parse(window.localStorage.getItem("lovexhj"));
            }

            // 调试
            // console.log(this.localConfig);

            // 主题加载
            this.loadTheme();
        },
        // Json 配置获取
        getJsonConfig() {
            let json = "../config/lovexhj.json";
            let request = new XMLHttpRequest();
            request.open("get", json);
            request.send(null);
            request.onload = () => {
                if (request.status == 200) {
                    this.jsonConfig = JSON.parse(request.responseText);
                    // 调试
                    // console.log(this.jsonConfig);

                    // 同步处理
                    setTimeout(() => {
                        // 书本大小设置
                        this.setBookSize();
                        // 记仇获取
                        this.getWdnmd();
                        // 富文本编辑器创建
                        this.createEditor();
                    }, 0);
                }
            }
        },
        // 主题设置
        loadTheme() {
            // 颜色配置
            let themeConfig = {
                "white": [
                    // 背景颜色
                    ["--bg-color", "rgb(241, 242, 246)"],
                ],
                "dark": [
                    // 背景颜色
                    ["--bg-color", "rgb(40, 44, 52)"],
                ]
            };

            // 主题切换
            let result = [];
            if (this.localConfig.theme == "light") {
                result = themeConfig.white;
            } else {
                result = themeConfig.dark;
            }

            result.forEach(item => {
                document.documentElement.style.setProperty(item[0], item[1]);
            });
        },
        // 切换主题
        checkTheme() {
            // 主题修改
            if (this.localConfig.theme == "light") {
                this.localConfig.theme = "dark";
            } else {
                this.localConfig.theme = "light";
            }
            // 存储配置
            this.saveLocalConfig();
            // 刷新主题
            this.loadTheme();
        },
        // 本地配置存储
        saveLocalConfig() {
            window.localStorage.setItem("lovexhj", JSON.stringify(this.localConfig));
        },
        // 书本大小设置
        setBookSize() {
            let book = document.querySelector(".lovexhjBook");
            book.style.width = this.jsonConfig.lovexhj.lovexhjBookSize + "px";
            book.style.height = this.jsonConfig.lovexhj.lovexhjBookSize + 80 + "px";
        },
        // 封面打开
        fmOpen() {
            let fm = document.querySelector(".lovexhjBookFm");
            if (fm.className.includes("lovexhjBookActive")) {
                return fm.classList.remove("lovexhjBookActive");
            }
            fm.classList.add("lovexhjBookActive");
        },
        // 记仇获取
        getWdnmd() {
            axios.get(`${this.ServerBase}/get?page=${this.jsonConfig.lovexhj.pageloadNum[0]}&per_page=${this.jsonConfig.lovexhj.pageloadNum[1]}`).then(res => {
                if (res.data.error) {
                    return console.log(res.data.error);
                }
                if (res.data.data.length == 0) {
                    return;
                }

                this.wdnmdData = res.data.data;

                // 调试
                // console.log(this.wdnmdData.data);

                // 日期处理
                for (let i = 0; i < this.wdnmdData.length; i++) {
                    this.wdnmdData[i].created_at = new Date(this.wdnmdData[i].created_at).toLocaleDateString();
                }
            }, err => {
                console.log(err);
            });
        },
        // 记仇选择
        selectWdnmd(i) {
            this.wdnmdIndex = i;
            this.ListOpen();
        },
        // 目录翻页
        ListOpen() {
            let list = document.querySelector(".lovexhjBookList");
            if (list.className.includes("lovexhjBookActive")) {
                list.classList.remove("lovexhjBookActive");
                return document.querySelector(".lovexhjBookListBg").classList.remove("lovexhjBookActive", "lovexhjBookListBgActive");
            }
            list.classList.add("lovexhjBookActive");
            document.querySelector(".lovexhjBookListBg").classList.add("lovexhjBookActive", "lovexhjBookListBgActive");
        },
        // 板块切换
        move() {
            let dom = document.querySelector(".lovexhjBookMove");
            if (this.wdnmdGo) {
                dom.style.transform = "translateX(-50%)";
            } else {
                dom.style.transform = "translateX(0%)";
            }
            this.wdnmdGo = !this.wdnmdGo;
        },
        // 富文本编辑器创建
        createEditor() {
            let E = window.wangEditor;
            let ed = new E("#ed");
            //  菜单配置
            ed.config.menus = [
                "head",
                "bold",
                // "fontSize",
                // "fontName",
                "italic",
                "underline",
                "strikeThrough",
                // "indent",
                // "lineHeight",
                // "foreColor",
                //" backColor",
                "link",
                "list",
                // "todo",
                "justify",
                "quote",
                // "emoticon",
                "image",
                "video",
                "table",
                // "code",
                "splitLine",
                "undo",
                "redo",
            ];
            // 关闭粘贴样式
            ed.config.pasteFilterStyle = false;
            // 代码高亮
            ed.highlight = this.hljs;
            // 提示文本
            ed.config.placeholder = "这个仇我先记上！";
            // 配置 onchange 回调函数
            ed.config.onchange = (content) => {
                this.body = content;
            }
            // 高度设置
            ed.config.height = 200;

            // 创建
            ed.create();

            // 默认样式修改
            document.querySelector(".w-e-toolbar").style.background = "transparent";
            document.querySelector(".w-e-toolbar").style.borderWidth = "0";
            document.querySelector(".w-e-text-container").style.background =
                "transparent";
            document.querySelector(".w-e-text-container").style.border =
                "transparent";
        },
        // 记个仇
        wdnmdSubmit() {
            // 数据验证
            if(!this.title && !this.body) {
                return this.$message({
                    message: "记仇也需要认真填写哦！",
                    showClose: true,
                    type: "warning"
                });
            }
            let password = prompt("记仇也需要密码的：");
            if(!password) {
                return this.$message({
                    message: "密码呢？",
                    showClose: true,
                    type: "warning"
                });
            }
            axios.post(this.ServerBase + "/add", {
                title: this.title,
                body: this.body,
                password
            }).then(res => {
                console.log(res);
            }, err => {});
        },
    },
})