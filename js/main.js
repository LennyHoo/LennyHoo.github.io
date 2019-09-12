var vm = new Vue({
    el: "#app",
    data: {
        tag_list: [],
        statistics: {view_num: 0, article_num: 0, comment_num: 0},
        article_list: [],
        current_page: 1,
        all_page_num: 0,
        mode: "overview",
        article_url: "",
        keyword: "",
    },
    created() {
        this.update();
    },
    methods: {
        update(){
            // 获取首页文章
            this.article_list = [];
            this.$http.get("http://www.aspendove.xyz:8000/update/latest/1").then(msg => {
                content = msg.body;
                content.forEach(element => {
                    this.article_list.push(element);
                });
            });
            // 获取浏览量、文章数量等数据
            this.$http.get("http://www.aspendove.xyz:8000/statistics").then(msg => {
                content = msg.body[0];
                this.statistics['view_num'] = content['view_num'];
                this.statistics['article_num'] = content['article_num'];
                this.statistics['comment_num'] = content['comment_num'];
                this.all_page_num = content['all_page_num'];
            })
            // 获取标签描述数据
            this.$http.get("http://www.aspendove.xyz:8000/get_tags").then(msg => {
                this.tag_list = []
                content = msg.body;
                content.forEach(element => {
                    this.tag_list.push(element);
                });
            })
        },
        go_to_page(page_num){
            /*翻页功能*/
            if(page_num<1 || page_num > this.all_page_num) return;
            this.article_list = [];
            this.$http.get("http://www.aspendove.xyz:8000/update/"+String(page_num)).then(msg => {
                content = msg.body;
                content.forEach(element => {
                    this.article_list.push(element);
                });
            });
            this.current_page = page_num;
        },
        to_next_page(){
            // 去下一页
            if(this.current_page>=this.all_page_num) return;
            this.go_to_page(this.current_page+1);
        },
        to_front_page(){
            // 去上一页
            if(this.current_page<=1) return;
            this.go_to_page(this.current_page-1);
        },
        switch_mode_to_overview(){
            // 显示概览
            var frame = document.getElementById("iframe-content");
            frame.contentWindow.location.href = this.article_url;
            this.mode = "overview";
        },
        switch_mode_to_content(url, id){
            this.article_url = url;
            var frame = document.getElementById("iframe-content");
            frame.contentWindow.location.href = this.article_url;
            this.mode = "content";
            this.$http.get("http://www.aspendove.xyz:8000/log_article_view/"+id);
        },
        match_article_overview(tag){
            this.article_list = [];
            this.$http.get("http://www.aspendove.xyz:8000/update/"+tag+"/1").then(msg => {
                content = msg.body;
                this.all_page_num = Math.floor(content.length / 9) + 1;
                content.forEach(element => {
                    this.article_list.push(element);
                });
            })
        },
        search(keyword){
            this.article_list = [];
            this.$http.get("http://www.aspendove.xyz:8000/search/"+keyword).then(msg => {
                content = msg.body;
                this.all_page_num = Math.floor(content.length / 9) + 1;
                content.forEach(element => {
                    this.article_list.push(element);
                });
            })
        }
    },
})