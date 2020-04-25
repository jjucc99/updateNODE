const express = require(`express`);
const app = express();
const fs = require('fs');
const bodyParser = require(`body-parser`);
const compression = require(`compression`);
const topicRouter = require(`./routes/topic`);
const indexRouter = require(`./routes/index`)
const loginRouter = require(`./routes/login`)
const helmet = require(`helmet`);



// 전송하는 파일을 분석하는 미들웨어
app.use(bodyParser.urlencoded({extended: false}));

//주고 받는 파일을 압축하는 미들웨어
app.use(compression());

//정적인 파일을 load하는 미들웨어
app.use(`/`, express.static('public'));

// 파일을 읽어서 파일 안의 내용을 배열로 정리해주는 미들웨어
app.get(`*`,function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  })
})

// `topic` path로 접근하는 사이트들에게 미들웨어를 적용하겠다.
app.use(`/topic`, topicRouter);


// `/ `path로 접근하는 사이트들에게 미들웨어를 적용하겠다.
app.use(`/`, indexRouter);

app.use(`/login`, loginRouter)


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


