let target = document.querySelector('#dynamic');

function randomString() {
  let stringArr = [
    'Learn to HTML',
    'Learn to CSS',
    'Learn to Javascript',
    'Learn to Python',
    'Learn to Ruby',
  ];
  let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
  let selectStringArr = selectString.split('');
  return selectStringArr;
}

function removeChar() {
  let temp = target.textContent;
  target.textContent = temp.slice(0, temp.length - 1);
  resetTyping();
}
//타이핑 리셋
function resetTyping() {
  if (target.textContent.length !== 0) {
    setTimeout(removeChar, 80);
  } else {
    //target.textContent = '';
    dynamic(randomString());
  }
}

//한글자씩 텍스트 출력 함수
function dynamic(randomArr) {
  if (randomArr.length > 0) {
    target.textContent += randomArr.shift();
    setTimeout(function () {
      dynamic(randomArr);
    }, 80);
  } else {
    setTimeout(resetTyping, 3000);
  }
}

dynamic(randomString());

//커서 깜빡임
function blink() {
  target.classList.toggle('active');
}
setInterval(blink, 500);
