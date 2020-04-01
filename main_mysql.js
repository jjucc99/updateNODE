var http = require('http')
var fs = require('fs')
var url = require('url')
var qs = require('querystring')
var templ = require('./lib.js')
var path = require('path')
var sanitazeHtml = require('sanitize-html')
var mysql      = require('mysql');
var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Lkz*028web',
	database : 'opentutorials'
});
db.connect();

var app = http.createServer(function(request, response) {
	var _url = request.url
	var queryData = url.parse(_url, true).query
	var pathname = url.parse(_url, true).pathname
	if (pathname === '/') {
		if (queryData.id === undefined) {
			db.query(`select * from topic`, function(err, topics){
				var title = 'Welcome'
				var description = 'Hello, Node.js'
				var list = templ.list(topics)
				var template = templ.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`)
				response.writeHead(200)
				response.end(template)
			})
			
		} else {
			fs.readdir('./data', function(error, filelist) {
				var fileterId = path.parse(queryData.id).base
				fs.readFile(`data/${fileterId}`, 'utf8', function(err, description) {
					var title = queryData.id
					var list = templ.list(filelist)
					var sanitazedTitle = sanitazeHtml(title)
					var sanitazedDescrip = sanitazeHtml(description)
					var template = templ.HTML(
						sanitazedTitle,
						list,
						`<h2>${sanitazedTitle}</h2>${sanitazedDescrip}`,
						`<a href="/create">create</a> 
                <a href="/update?id=${sanitazedTitle}">update</a>
                <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitazedTitle}">
                <input type="submit" value="delete" onclick="alert('one more time')">
                </form>`
					)
					response.writeHead(200)
					response.end(template)
				})
			})
		}
	} else if (pathname === '/create') {
		fs.readdir('./data', function(error, filelist) {
			var title = 'WEB - create'
			var list = templ.list(filelist)
			var template = templ.HTML(
				title,
				list,
				`
            <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
            <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
            <input type="submit">
            </p>
            </form>
            `,
				''
			)
			response.writeHead(200)
			response.end(template)
		})
	} else if (pathname === '/create_process') {
		var body = ''
		request.on('data', function(data) {
			body = body + data
		})
		request.on('end', function() {
			var post = qs.parse(body)
			var title = post.title
			var description = post.description
			fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
				response.writeHead(302, { Location: `/?id=${title}` })
				response.end()
			})
		})
	} else if (pathname === '/update') {
		fs.readdir('./data', function(error, filelist) {
			var filterId = path.parse(queryData.id).base
			fs.readFile(`data/${filterId}`, 'utf8', function(err, description) {
				var title = queryData.id
				var list = templ.list(filelist)
				var sanitazedTitle = sanitazeHtml(title)
				var sanitazedDescrip = sanitazeHtml(description)
				var template = templ.HTML(
					sanitazedTitle,
					list,
					`
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${sanitazedTitle}">
            <p><input type="text" name="title" placeholder="title" value="${sanitazedTitle}"></p>
            <p>
                <textarea name="description" placeholder="description">${sanitazedDescrip}</textarea>
            </p>
            <p>
            <input type="submit">
            </p>
            </form>
            `,
					`<a href="/create">create</a> <a href="/update?id=${sanitazedTitle}">update</a>`
				)
				response.writeHead(200)
				response.end(template)
			})
		})
	} else if (pathname === '/update_process') {
		var body = ''
		request.on('data', function(data) {
			body = body + data
		})
		request.on('end', function() {
			var post = qs.parse(body)
			var title = post.title
			var description = post.description
			var id = post.id
			fs.rename(`data/${id}`, `data/${title}`, function(err) {
				fs.writeFile(`data/${title}`, description, function() {
					response.writeHead(302, { Location: `/?id=${title}` })
					response.end()
				})
			})
		})
	} else if (pathname === '/delete_process') {
		var body = ''
		request.on('data', function(data) {
			body = body + data
		})
		request.on('end', function() {
			var post = qs.parse(body)
			var id = post.id
			var filterId = path.parse(id).base
			fs.unlink(`data/${filterId}`, function(err) {
				response.writeHead(302, { Location: '/' })
				response.end()
			})
		})
	} else {
		response.writeHead(404)
		response.end('Not found')
	}
})
app.listen(3000)