new Vue({
    el: "#app",
    data() {
        return {
            envId: "",
            list_b: [],
            list_g: [],
            total_b: 0,
            total_g: 0,
            page_b: 1,
            page_g: 1,
            limit: 5,
            app: null,
            dbName: 'talks'
        }
    },
    created() {
        this.one();
    },
    methods: {
        one(index = 2) {
            var app = cloudbase.init({
                env: ""
            });
            app.auth({
                persistence: "none" //避免与同实例冲突
            }).anonymousAuthProvider().signIn().then(() => {
                var db = app.database()
                var collection = db.collection('talks')
                if (index == 0 || index == 2) {
                    //显示女生数据
                    this.getWomanInfo(collection)
                }
                if (index == 1 || index == 2) {
                    // 显示男生数据
                    this.getManInfo(collection)
                }
            }).catch(err => {
                console.log(err)
            });
        },
        //男生数据
        getManInfo(collection) {
            collection
                .where({
                    from: "boyfriend"
                })
                .limit(this.limit)
                .skip((this.page_b - 1) * this.limit)
                .orderBy('date', 'desc')
                .get()
                .then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        var date = res.data[i].date;
                        var content = res.data[i].content
                        if (date == null) {
                            continue;
                        }
                        res.data[i].date = timestampToTime_b(date);
                        res.data[i].content = urlToLink(content);
                    }
                    this.list_b = this.list_b.concat(res.data);
                    function timestampToTime_b(timestamp) {
                        // 计算年月日时分的函数
                        var date = new Date(timestamp)
                        var Y = date.getFullYear()
                        var M = (date.getMonth() + 1).toString().padStart(2,0)
                        var D = date.getDate().toString().padStart(2,0)
                        var h = date.getHours().toString().padStart(2,0)
                        var m = date.getMinutes().toString().padStart(2,0)
                        return Y  + '-' + M + '-' + D + ' ' + h + ':' + m
                    };
                    function urlToLink(str) {
                        var re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
                        var re_forpic = /\bhttps?:\/\/.*?(\.gif|\.jpeg|\.png|\.jpg|\.bmp|\.webp)/g;
                        var re_forpic_vx = /^http:\/\/mmbiz\.qpic\.cn[^\s]*/g;
                        str = str.replace(re, function (website) {
                            return "<a href='" + website + "' target='_blank'> <i class='iconfont icon-lianjie-copy'></i>链接</a>";
                        });
                        str = str.replace(re_forpic, function (imgurl) {
                            return "<img src='" + imgurl + "' /> ";
                        });
                        str = str.replace(re_forpic_vx, function (imgurl) {
                            return "<img src='" + imgurl + "' /> ";
                        });
                        return str;
                    }
                });
            this.page_b++;
            //显示总条数
            collection.where({ from: "boyfriend" }).count().then(res => {
                this.total_b = res.total
            })
        },
        //女方信息
        getWomanInfo(collection) {
            collection
                .where({
                    from: "girlfriend"
                })
                .limit(this.limit)
                .skip((this.page_g - 1) * this.limit)
                .orderBy('date', 'desc')
                .get()
                .then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        var date = res.data[i].date;
                        var content = res.data[i].content;
                        if (date == null || content == null) {
                            continue;
                        }
                        res.data[i].date = timestampToTime_g(date);
                        res.data[i].content = urlToLink1(content);
                    };
                    this.list_g = this.list_g.concat(res.data);
                    function timestampToTime_g(timestamp) {
                        // 计算年月日时分的函数
                        var date = new Date(timestamp)
                        var Y = date.getFullYear()
                        var M = (date.getMonth() + 1).toString().padStart(2,0)
                        var D = date.getDate().toString().padStart(2,0)
                        var h = date.getHours().toString().padStart(2,0)
                        var m = date.getMinutes().toString().padStart(2,0)
                        return Y  + '-' + M + '-' + D + ' ' + h + ':' + m
                    };
                    function urlToLink1(str) {
                        var re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
                        var re_forpic = /\bhttps?:\/\/.*?(\.gif|\.jpeg|\.png|\.jpg|\.bmp|\.webp)/g;
                        var re_forpic_vx = /^http:\/\/mmbiz\.qpic\.cn[^\s]*/g;
                        str = str.replace(re, function (website) {
                            return "<a href='" + website + "' target='_blank'> <i class='iconfont icon-lianjie-copy'></i>链接</a>";
                        });
                        str = str.replace(re_forpic, function (imgurl) {
                            return "<img src='" + imgurl + "' /> ";
                        });
                        str = str.replace(re_forpic_vx, function (imgurl) {
                            return "<img src='" + imgurl + "' /> ";
                        });
                        return str;
                    }
                });
            this.page_g++;
            //显示总条数
            collection.where({ from: "girlfriend" }).count().then(res => {
                this.total_g = res.total
            })
        }
    }
})