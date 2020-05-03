const express = require(`express`);
const router = express.Router();
const template = require(`../lib/template.js`)


router.get(`/`, function(request, response){
    const title = 'Welcome';
    const description = 'Hello, Node.js';
    let authStatus = "<a href='/auth'>logIn</a>"
    if(request.isOwers === true){
        authStatus = "<a href='/auth/logout_process'>logOut</a>"
    }
    var list = template.list(request.list);
    var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}
    <img src ='hello.jpg' style="width : 300px; display : block; margin-top : 10px;">`,
    `<a href="/topic/create">create</a>`, authStatus
    );
response.send(html);
})


module.exports = router;