const express = require(`express`);
const router = express.Router();
const template = require(`../lib/template.js`)

let authData ={
    email: 'asdf@1234',
    password: '1111',
    nickname: 'jay ju'
}


router.get(`/`, function(request, response){
    var title = 'Log';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
    `<form action="/auth/login_process" method="post">
    <p><input type="text" name="email" placeholder='plese your email'></p>
    <p><input type="password" name="password" placeholder='plese your password'></p>
    <p><input type="submit" value="login"></p>
    </form>
    <img src ='hello.jpg' style="width : 300px; display : block; margin-top : 10px;">`,
    `<a href="/topic/create">create</a>`
    );
response.send(html);
})

router.post('/login_process', function(request, response){
    const post = request.body;
    const email = post.email;
    const password = post.password;
    if(email === authData.email && password === authData.password){
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        response.redirect('/');
        /*response.writeHead(302, {
            'Set-Cookie' :[
                `email=${email}; Path=/`,
                `password=${password}; Path=/`,
                `nickname=jay ju; Path=/`
            ],Location:`/`
        })*/
        response.end()
    }else{
        response.end('Who?')
    }
})

router.get('/logout_process', function(request, response){
    const post = request.body;
    const email = post.email;
    const password = post.password;
        response.writeHead(302, {
            'Set-Cookie' :[
                `email=; Max-age=0; Path=/`,
                `password=; Max-age=0; Path=/`,
                `nickname=; Max-age=0; Path=/`
            ],Location:`/`
        })
        response.end()
})

module.exports = router;
