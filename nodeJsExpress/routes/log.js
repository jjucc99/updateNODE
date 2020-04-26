const express = require(`express`);
const router = express.Router();
const template = require(`../lib/template.js`)


router.get(`/`, function(request, response){
    var title = 'Log';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
    `<form action="/log/login_process" method="post">
    <p><input type="text" name="email" placeholder='plese your email'></p>
    <p><input type="text" name="password" placeholder='plese your password'></p>
    <p><input type="submit"></p>
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
    if(email === 'asdf1234' && password === '1111'){
        response.writeHead(302, {
            'Set-Cookie' :[
                `email=${email}; Path=/`,
                `password=${password}; Path=/`,
                `nickname=jay ju; Path=/`
            ],Location:`/`
        })
        response.end()
    }else{
        response.end('Who?')
    }
})

router.post("/logout_process", function(request, response){
    response.send(`you didn't log in`)
})

module.exports = router;
