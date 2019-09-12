var vm = new Vue({
    el: "#admin",
    data: {

    },
    methods: {
        login(){
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            this.$http.post("http://217.69.1.36:8000/login", {username: username, password: password}
                , {emulateJSON: true}).then(msg => {
                    content = msg.body;
                    if(content['status']==="ok") {
                        var target = window.parent.document.getElementById('login');
                        target.style.display = 'none';
                        var con = window.parent.document.getElementById('con');
                        con.style.display = 'block';
                        var logo = window.parent.document.getElementById('logo');
                        logo.style.display = 'block';
                    }
                    else{
                        alert("账号或密码错误");
                    }
                });
        },
    },
})