// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
const h2 = document.querySelector(`h2`);
const superEventHandler = {
mouseEnter: function() {
    h2.innerText = `The mouse is here`;
    h2.style.color = `#1abc9c`;
},
mouseLeave: function() {
    h2.innerText = `The mouse is gone`;
    h2.style.color = `#3498db`;
},
windowClick: function() {
    h2.innerText = `That was a right click`;
    h2.style.color = `#e74c3c`;
},
    windowResize: function() {
    h2.innerText = `you just resize`;
    h2.style.color = `#9b59b6`;
}
};

// 색깔과 텍스트를 바꾸는 함수.

function init() {
    h2.addEventListener(`mouseenter`, superEventHandler.mouseEnter);
    h2.addEventListener(`mouseleave`, superEventHandler.mouseLeave);
    window.addEventListener(`click`, superEventHandler.windowClick);
    window.addEventListener(`resize`, superEventHandler.windowResize);
}

init();

// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/
