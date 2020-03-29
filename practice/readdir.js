var testFolder ='../data';
var fs = require('fs');

fs.readdir(testFolder, function(err, file){
    console.log(file)
    });
// 폴더의 구성 파일을 arr로 리턴 해주는 메소드.
// 찾는 파일의 위치는 'testFolder에 저장. 이후  readdir 함수의 인자로 전달 되어 
// 콜백함수에 정보전달

//result ['CSS', 'HTML', 'JavaScript']