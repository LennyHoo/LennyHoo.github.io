var vm = new Vue({
    el: "#admin",
    data: {

    },
    methods: {
        login(){
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            this.$http.post("http://127.0.0.1:8000/login", {username: username, password: password}
                , {emulateJSON: true}).then(msg => {
                    content = msg.body;
                    if(content['status']==="ok") {
                        var div = parent.getElementById("login");
                        div.style.display = "none";
                    }
                    else{
                        alert("账号或密码错误");
                    }
                });
        },
    },
})