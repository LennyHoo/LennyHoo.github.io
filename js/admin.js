var vm = new Vue({
    el: "#manager",
    data: {
        tag_list: [], 
        title: "",
        selected_tag: '',
        intro: '',
        add_tag: false,
        tag: "",
        nickname: "",
    },
    created() {
        this.get_tags();
    },
    methods: {
        // 提交新文章数据
        summit(){
            if(this.title===""||this.selected_tag===""||this.intro===""){
                alert("填写的信息不完整");
                return;
            }
            this.$http.post("http://217.69.1.36:8000/summit", 
            {title: this.title, tag: this.selected_tag, intro: this.intro}, 
            {emulateJSON: true}).then(msg => {
                content = msg.body;
                if(content=="404") alert("请重新上传文件");
                else if(content=="ok") alert("添加文章成功");
            })
        },
        get_tags(){
            // 获取标签描述数据
            this.tag_list = [];
            this.$http.get("http://217.69.1.36:8000/get_tags").then(msg => {
                content = msg.body;
                content.forEach(element => {
                    this.tag_list.push(element);
                })
            });
        },
        add_a_tag(){
            if(this.tag==""||this.nickname==""){
                alert("输入的数据不完整");
                return;
            }
            if(document.getElementById('tag_file').files.length==0){
                alert("没有选择图片");
                return;
            }
            file_name = document.getElementById('tag_file').files[0].name;
            this.$http.post("http://217.69.1.36:8000/add_tag", {file_name: file_name, tag: this.tag, nickname: this.nickname}
                , {emulateJSON: true}).then(msg => {
                    content = msg.body;
                    if(content=="ok"){
                        this.get_tags();
                        this.tag = "";
                        this.nickname = "";
                        alert("标签添加成功");
                    }
                    else alert("标签添加失败");
                })
        },
    },
})