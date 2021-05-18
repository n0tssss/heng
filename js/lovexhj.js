const lovexhj = new Vue({
    el: "#lovexhj",
    data() {
        return {
            localConfig: null, // 本地配置
            jsonConfig: null, // Json 配置
        }
    },
    created() {},
    mounted() {
        // 本地配置获取
        this.getLocalConfig();
        // Json 配置获取
        this.getJsonConfig();
    },
    destroyed() {},
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
                    console.log(this.jsonConfig);

                    // 同步处理
                    setTimeout(() => {
                        // 书本大小设置
                        this.setBookSize();
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
        // 页面打开
        pageOpen() {
            let e = event.target;
            e.classList.add("lovexhjBookActive");
        },
    },
})