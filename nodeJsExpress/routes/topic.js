const express = require(`express`);
const router = express.Router();
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const template = require(`../lib/template.js`)
const path = require('path');


router.get(`/create`, function(request, response){
    var title = 'WEB - create';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
    <form action="/topic/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
            <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `, '');
    response.send(html)
})




//create 페이지에서 정보를 전달 받는 페이지
//받은 정보를 분석해서 문서를 만들고 파일에 저장한다.
router.post(`/create_process`, function(request, response){
    var post = request.body
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.redirect(`/topic/${title}`)
    });
    })


    //바꾸고 싶은 정보를 update_process에 전달하는 페이지
    //정보를 전달하기 위해서 기존의 정보를 같이 보낸다.
router.get('/update/:pageId', function(request, response){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    if(err){
        throw err;
    }
        var title = request.params.pageId;
        var list = template.list(request.list);
        var html = template.HTML(title, list,
        `
        <form action="/topic/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
            <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
            <input type="submit">
            </p>
        </form>
        `,
        `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
        );
        response.send(html);
    });  
    })

    //update 페이지에서 정보를 전달 받으면 정보를 수정하는 페이지
    // 기존의 정보를 기반으로 페이지를 찾고 다시 저장한다.

router.post(`/update_process`, function(request, response){
    var post = request.body
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.redirect(`/topic/${title}`)
        })
    });
    })

    // 원하는 정보를 삭제하는 페이지
    // form안에 내장되어 있는 정보를 받아서 삭제한다.
router.post(`/delete_process`, function(request, response){
    var post = request.body;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error){
        response.redirect(`/`)
    })
    })

    
// 페이지에 접속하면 맨 처음 보게 되는 메인화면 
// list를 클릭했을 때 item의 title 과 description을 화면에 나타내는 item 화면
router.get(`/:pageId`, function(request, response, next){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err2, description){
        if(err2){
            next(err2);
        }else{
            var title = request.params.pageId;
            var sanitizedTitle = sanitizeHtml(title);
        var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
        });
        var list = template.list(request.list);
        var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/topic/create">create</a>
            <a href="/topic/update/${sanitizedTitle}">update</a>
            <form action="/topic/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
            </form>`
            );
        response.send(html);
        }
    });
})

module.exports = router;

