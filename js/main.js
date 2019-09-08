var vm = new Vue({
    el: "#app",
    data: {
        tag_list: [{tag: "机器学习", url: "./images/ml_icon.png"}, 
                    {tag: "数据库", url: "./images/db_icon.png"}, 
                    {tag: "javascript", url: "./images/js_icon.png"}, 
                    {tag: "Vue.js", url:"./images/vue_icon.png"},
                    {tag: "Django", url:"./images/django_icon.png"}],
        statistics: {view_num: 0, article_num: 0, comment_num: 0},
    },
    methods: {
        
    },
})