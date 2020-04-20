/*
목표  array의 값을 큰 것부터 앞으로 정렬한다.
    콜백 함수가 음수를 반환하게 한다.
*/

var array = [101, 26, 7, 1237]

var practice = array.sort(function(one, two){
    return two - one
})

console.log(practice)