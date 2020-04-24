const http  = require(`http`);
const cookie = require(`cookie`);


http.createServer(function(request, response){
    let cookies ={}
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie)
    }
    response.writeHead(200, {
        'Set-Cookie' :[
            'Id=choco'
            ,'Ip=strawberry',
            `Permanent=cookies; Max-age=${60*60*24*30}`,
            'Secure=secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly',
            'Path=Path; Path=/cookie'
        ]
    })
    response.end(`it's ok`)
}).listen(3000);
