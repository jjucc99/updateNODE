const express = require(`express`);
const app = express();
const fs = require('fs');
const bodyParser = require(`body-parser`);
const compression = require(`compression`);
const topicRouter = require(`./routes/topic`);
const indexRouter = require(`./routes/index`)
const logRouter = require(`./routes/log`)
const helmet = require(`helmet`);
const cookie = require('cookie');


// 전송하는 파일을 분석하는 미들웨어
// 'request.body'
app.use(bodyParser.urlencoded({extended: false}));

//주고 받는 파일을 압축하는 미들웨어
app.use(compression());

//정적인 파일을 load하는 미들웨어
app.use(`/`, express.static('public'));


// 파일을 읽어서 파일 안의 내용을 배열로 정리해주는 미들웨어
// `request.list`
app.use(function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  })
})

// 홈페이지에 로그인이 됬는 지 안됬는 지 체크하는 미들웨어
// 'requst.isOwers'
app.use(function(request, response, next){
  let cookies = {}
  request.isOwers = false
  if(request.headers.cookie){
    cookies  = cookie.parse(request.headers.cookie);
    if(cookies.email === 'asdf1234' && cookies.password === '1111'){
      request.isOwers= true;
    }
  }
  next();
})

// `topic` path로 접근하는 사이트들에게 미들웨어를 적용하겠다.
app.use(`/topic`, topicRouter);


// `/ `path로 접근하는 사이트들에게 미들웨어를 적용하겠다.
app.use(`/`, indexRouter);

// `/login' path로 접슨하는 사이트들에게 미들워어를 적용하겠다.
app.use(`/log`, logRouter)


//보안 사고를 예방하는 미들웨어
app.use(helmet());

app.use(function(request, response, next){
    response.status(404).send(`page can't find`);
})

app.use(function(err, req, res, next){
  console.log(err.stack)
  res.status(500).send(`something is error`)
})
app.listen(3000, function(){
})


