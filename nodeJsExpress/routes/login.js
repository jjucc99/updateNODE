const express = require(`express`);
const router = express.Router();
const template = require(`../lib/template.js`)


router.get(`/`, function(request, response){
    var title = 'Login';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
    `<form action="/login/login_process" method="post">
    <p><input type="text" name="email" placeholder='plese your email'></p>
    <p><input type="text" name="password" placeholder='plese your password'></p>
    </form>
    <img src ='hello.jpg' style="width : 300px; display : block; margin-top : 10px;">`,
    `<a href="/topic/create">create</a>`
    );
response.send(html);
})

//router.post('/login_process',)



module.exports = router;
