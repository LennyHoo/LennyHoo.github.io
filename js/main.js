var vm = new Vue({
    el: "#app",
    data: {
        tag_list: [{tag: "机器学习", url: "./images/ml_icon.png"}, 
                    {tag: "数据库", url: "./images/db_icon.png"}, 
                    {tag: "javascript", url: "./images/js_icon.png"}, 
                    {tag: "Vue.js", url:"./images/vue_icon.png"},
                    {tag: "Django", url:"./images/django_icon.png"}],
        statistics: {view_num: 0, article_num: 0, comment_num: 0},
        article_list: [],
        current_page: 1,
        all_page_num: 0,
        mode: "overview",
    },
    created() {
        this.update();
    },
    methods: {
        update(){
            this.article_list = [];
            this.$http.get("http://127.0.0.1:8000/update/1").then(msg => {
                content = msg.body;
                content.forEach(element => {
                    this.article_list.push(element);
                });
            });
            this.$http.get("http://127.0.0.1:8000/statistics").then(msg => {
                console.log(msg)
                content = msg.body[0];
                this.statistics['view_num'] = content['view_num'];
                this.statistics['article_num'] = content['article_num'];
                this.statistics['comment_num'] = content['comment_num'];
                this.all_page_num = content['all_page_num'];
            })
        },
        go_to_page(page_num){
            if(page_num<1 || page_num > this.all_page_num) return;
            this.article_list = [];
            this.$http.get("http://127.0.0.1:8000/update/"+String(page_num)).then(msg => {
                content = msg.body;
                content.forEach(element => {
                    this.article_list.push(element);
                });
            });
            this.current_page = page_num;
        },
        to_next_page(){
            if(this.current_page>=this.all_page_num) return;
            this.go_to_page(this.current_page+1);
        },
        to_front_page(){
            if(this.current_page<=1) return;
            this.go_to_page(this.current_page-1);
        }
    },
})