var http = require('http')
var fs = require('fs')
var url = require('url')
var qs = require('querystring')
var path = require('path')
var sanitazeHtml = require('sanitize-html')

var tamplates = {
  HTML: function(title, list, body, control){
      return `
      <!doctype html>
      <html>
      <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
      </head>
      <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${control}
          ${body}
      </body>
      </html>
  `;
  },
  list: function(list){
      var list = '<ul>';
      for(var i = 0; i < topics.length; i++){
      list = list + `<li><a href="/?id=${topics[i]}">${topics[i]}</a></li>`;
  }
      list = list+'</ul>';
      return list;
  }
}

var app = http.createServer(function(request, response) {
	var _url = request.url
	var queryData = url.parse(_url, true).query
	var pathname = url.parse(_url, true).pathname
	if (pathname === '/') {
		if (queryData.id === undefined) {
			fs.readdir('./data', function(error, filelist) {
				var title = 'Welcome'
				var description = 'Hello, Node.js'
				var list = tamplates.list(filelist)
				var template = tamplates.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`)
				response.writeHead(200)
				response.end(template)
			})
		} else {
			fs.readdir('./data', function(error, filelist) {
				var fileterId = path.parse(queryData.id).base
				fs.readFile(`data/${fileterId}`, 'utf8', function(err, description) {
					var title = queryData.id
					var list = tamplates.list(filelist)
					var sanitazedTitle = sanitazeHtml(title)
					var sanitazedDescrip = sanitazeHtml(description)
					var template = tamplates.HTML(
						sanitazedTitle,
						list,
						`<h2>${sanitazedTitle}</h2>${sanitazedDescrip}`,
						`<a href="/create">create</a>`
					)
					response.writeHead(200)
					response.end(template)
				})
			})
		}
	} else if (pathname === '/create') {
		fs.readdir('./data', function(error, filelist) {
			var title = 'WEB - create'
			var list = tamplates.list(filelist)
			var template = tamplates.HTML(
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
				var list = tamplates.list(filelist)
				var sanitazedTitle = sanitazeHtml(title)
				var sanitazedDescrip = sanitazeHtml(description)
				var template = tamplates.HTML(
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

/*------------------------------- 정리 노트 -----------------------------------------------

1. url.parse(url, boolean)

      이 오브젝트는 생성된 서버의 url을 인자로 주면 정보를 담은 오브적트를 리턴해 준다.

      보통 boolean은 true로 해야 작동한다.
      
      주요 내용은 protocol, host, pathname, query 이다.

      각각의 기능이나 역할은 인터넷에 검색하면 자세히 나오므로 언급하지 않겠다.

      다음 결과는 url.parse(request.url, true)에 입력 값을 넣어준 결과이다. 

      result. {protocol: null, salshes: null, port: null, host: null,
      hostname: null, search: 해당 페이지의 쿼리스티링, 
      query: [Object: null prototype] {id : (?id=)의 뒤의 값을 가져옴 }, pathname:'/',
      part: 퀴리스크팅', herf : '퀴리스트링'}

      *해당 결과는 아직 이 실습이 정식 서버를 사용한 게 아니기 때문에 현실과 오차가 있을 수
      있음

2. fs 오브젝트

      fs는 file system 의 약자이며 그 이름에 걸맞게 다양한 파일 시스템을 메소드로 제공한다.
      
  첫번째 메소드.

      fs.readFile('파일의 위치', '출력기준(ex: utf8)', callback funtion(err, data){});

      이 메소드는 파일 안의 데이터 (담고 있는 파일의 텍스트 등)를 가져와 callback함수 안에서
      쓸 수 있게 해준다. 

      이 메소드는 비동기적으로 작동하는 함수이므로 콜백함수를 꼭 넣어 줘야 한다.

      이 메소드는 파일 안에 들어 있는 데이터를 읽어 오는 데 callback에서 데이터를 변환해주고
      전송하는 게 훨씬 편하다.
      
      또한 데이터를 바깥에서 사용하려면 전역 변수나 callback함수 부모 함수에 지역변수를
      만들어 줘야한다.
      
      하지만 그럴빠에 callback함수 안에서 작업을 끝내는 게 더 났다.

      다음 결과는 fs.readFile(`data/nodejk`, 'utf8', function(err, data){
        console.log(date)
      })
      의 결과 이다.
      
      result. node isjk llfuny game
      
  두번째 메소드.

      fs.readdir("사용할 폴더 위치", callback function(err, data){})
      
      이 메소드는 해당 위치의 폴더 안의 파일을 array로 반환한다.

      이 메소드는 비동기적으로 작동하고 있으며 data를 콜백 함수 안에서 사용할 수 있게
      해준다.

      다음은 fs.readdir('./data', function(error, filelist){
        console.log(filelist)
      })
      의 결과이다.

      result. [CSS, HTML, JavaScript, nodejk]

  세번째 메소드.

      fs.writeFile('작성할 파일 위치 / 파일 제목(css나 html파일을 만들수도 있다.)', 
      작성할 내용, 출력방식(ex utf8), callback function(err){})

      fs.writeFile은 지정한 위치에 정한 제목으로 파일을 만들고 작성할 내용을 안에
      넣어준다.

      또한 이 함수는 이미 만들어진 파일 안의 내용을 수정할 때에도 사용된다.
      그러나 이 때 파일의 이름을 바꾸려고 파일 제목을 변경하면 새로운 파일이 만들어지게 된다.
      때문에 작성할 내용은 바꿀 수 있게 도와주지만 파일 이름을 바꿀 순 없다.

      이 메소드는 비동기적으로 작동하고 있다.

      다음 결과는 
      fs.writeFile(`data/practice`, description, 'utf8', function(err){
        fs.readdir('./data', fuction(err, data){
          console.log(data)
        })
      })
      result. [CSS, HTML, JavaScript, nodejk, practice]
      
  네번쨰 메소드.
      
      fs.rename('파일 위치/바꾸기 전 이름', '파일 위치/바꾸려고 하는 이름', callback
      function(err){})

      이 메소드는 fs.writeFile의 단점을 메꿔줄 메소드이다.

      이 메소드를 사용하면 지정된 파일의 이름을 바꾸려고 하는 이름으로 변경해준다.
      다만 이 때 지정된 파일이 존재하지 않다면 오류가 날 수도 있다. 이 메소드는 파일을 
      만드는 것이 아니라 파일의 이름만 변경해주기 때문이다. 

      이 메소드는 fs.writeFile과 같이 쓰면 더욱더 좋다.
    
      다음 결과는 fs.rename(`data/nodejk`,`data/nodejs`,function(err){
        fs.readdir('./data', fuction(err, data){
          console.log(data)
        })
      })을 실행시켰을 떄의 결과이다.

      result. [CSS, HTML, JavaScript, nodejs]

  5번째 메소드.
      fs.unlink('파일의 위치/삭제할 파일', fuction(err){})
      
      이 메소드는 파일을 삭제한다. 

      이 메소드는 비동기적으로 작동한다.

      다음 결과는 

      fs.unlink("data/nodejs", function(err){
        fs.readdir("data", function(err, filelist){
          console.log(filelist)
        })
      })
      
      을 작동시켰을 때의 결과이다.
      
      result. ["CSS", "HTML", "JavaScrip"]

3.request.on 
    
      이 메소드는 form으로 받은 데이터를 서버로 가져오는 기능을 가지고 있다.

      메소드는 두개로 나뉘어 진다.

  1. 첫번째 인자로 data를 받을 때
      
      데이터를 전송받고 저장하는 단계라고 생각하면 편하다.
      
      var body ="";
      request.on(data, function(){
        body += data
        console.log(body)
      })
      result. id=값&title=값&description=값
      하지만 data를 콘솔로그 했을 때 바로 나오지 않는다. 16진수로 데이터가 전송되어 온다.
      무조건 지역변수 body를 선언하고 data를 넣으면 qurey string으로 잘 전송되어 온다.
      
  2. 첫번째 인자로 end를 받을 때
      
      전송 받은 데이터를 가공하는 단계이며 데이터 전송를 마무리하는 단계이다.
      
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        var id = post.id;
        fs.rename(`data/${id}`,`data/${title}`,function(err){
          fs.writeFile(`data/${title}`, description, function(){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
        })            
      })
      
      qs.parse 라는 메소드를 이용해 받아 저장한 데이터인 'body'를 object로 변환해준다.
      object의 key는 input의 name 속성에 지정된 값이며 value는 전송된 데이터이다.
      
      다음은 위 함수에 143번 줄 다음에 console.log(post)를 삽입했을 때 결과이다.
      
      result. {iput의'name' ='input의 입력값', input의 'name' ='input의 입력값'};

4.path.parse('주소(파일이나, 쿼리스트링 등)')
      쿼리스트링 등 입력정보에 대한 보안 때문에 등장한 메소드.
      
      이 메소드를 사용하면 사용자가 정보를 입력할 때 보안에 문제되는 내용을 걸러준다.
      
      이 메소드는  입력된 주소에 대한 원하는 정보만을 가져오게 도와주기 떄문에 사용자가
      도중에 어떠한 다른 정보를 입력했다고 한들 원하는 정보만을 가져오기 떄문에 보안을
      크게 높여준다.

      다음은 결과는
      path.parse('도매인 or 폴더위치/password.js');
      의 코드을 입력했을 떄의 결과이디.
      
      result.

      {root:"(서버와 통신할 경우 pathname을 가져온다.)", dir:"도매인 or 폴더 위치 전부", 
      base:"paseword.js", ext:".js", name:"password"}

      나 깃허브 성공
        <<<<<<< Updated upstream
            지금 깃허브 
        >>>>>>> Stashed changes
      */
