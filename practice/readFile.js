var fs = require('fs');
fs.readFile('sample.txt','utf8',function(err, data){
    console.log(data)
})
//폴더 안의 파일의 내용을 리턴해주는 메소드
// 첫번째 파라미터로 내용을 가져올 파일을 정해준다.
// 두번쨰 파라미터는 어떤 형식으로 파일 안의 내용을 인코딩 할 지 정해준다.
// 세번째 파라미터는 콜백 함수로 파라미터로 전해진 정보들을 종합해 data라는 파라미터로 
// 정보를 내뱉는다.

//result sdfgdfsgewrtvdfgrsdfgwertvsdertwes