'use strict';
let index = 0;
let word = [];
let limit = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'Enter',
  'Backspace',
];
let answer = '';
//console.log(limit);

document.addEventListener('DOMContentLoaded', () => {
  //마우스 입력
  const keyboard = document.querySelectorAll('.keyboard-button');
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener('click', (e) => {
      wordInput(e.target.getAttribute('data'));
    });
  }
  // 키보드 입력
  window.addEventListener('keydown', (ev) => {
    wordInput(ev.key);
  });
});

const box = document.querySelectorAll('.box');
function wordInput(c) {
  if (!limit.includes(c)) {
    // console.log('wrong input');
    return;
  }
  if (index > 30) {
    alert('실패!');
  }
  switch (c) {
    case 'Enter':
      if (word.length > 4) {
        // console.log('입력확인');
        // console.log(word.join(''));
        // console.log(answer[0]);
        dictionaryCheck(word.join(''));
        if (word.join('') === answer[0]) {
          alert('정답입니다!');
          return;
        } else {
          for (let i = 5; i > 0; i--) {
            (function (ind) {
              let position = answer[0].indexOf(word[word.length - ind]);
              console.log(`${word[word.length - ind]}`);
              console.log(`${answer[0]}`);
              console.log(`so the position is ${position}`);
              console.log(`word index is ${word.length - ind}`);
              console.log(`box is ${box[index - ind].innerHTML}`);
              if (position === -1) {
                // 아예 없는 스펠링
                box[index - ind].classList.add('gray');
              } else if (position !== word.length - ind) {
                // 있긴 있지만 위치가 다름
                box[index - ind].classList.add('yellow');
              } else {
                box[index - ind].classList.add('green');
              }

              setTimeout(function () {
                console.log(`in function : ${word.length}`);
                animateCSS(box[index - ind], 'flipInX');
              }, 1600 - 200 * ind);
            })(i);
          }
        }
        word = [];
      } else {
        console.log('아직 안찼다');
        for (let i = 1; i <= 5; i++) {
          animateCSS(box[index - i], 'shakeX');
        }
      }
      break;

    case 'Backspace':
      if (word.length === 0) {
        return;
      }
      index--;
      box[index].innerHTML = '';
      word.pop();
      // console.log(word);
      // console.log(index);
      break;

    default:
      if (word.length <= 4) {
        box[index].innerHTML += c;
        index++;
        word.push(c);
        // console.log(word);
        // console.log(index);
      }
      break;
  }
}

const dictionary_url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
async function dictionaryCheck(word) {
  const response = await fetch(dictionary_url + word);

  // Parsing it to JSON format
  const data = await response.json();
  console.log(data);
  if (data.title == 'No Definitions Found') {
    console.log('단어가 아니잖아');
    for (let i = 1; i <= 5; i++) {
      animateCSS(box[index - i], 'shakeX');
    }
  } else {
    return;
  }
  // console.log(data[0]);
  // return data[0];
}

const random_word_url =
  'https://random-word-api.herokuapp.com/word?length=5&lang=es';
async function getRandomWord() {
  const response = await fetch(random_word_url);

  // Parsing it to JSON format
  answer = await response.json();
  // console.log(data[0]);
  // return data[0];
}
getRandomWord();

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {
      once: true,
    });
  });
// // const answer = getRandomWord();
// 현재 문제
// 단어가 아닌 경우  체크한 후 에러메시지가 떠야하는데 그냥 실행 됨
// 같은 스펠링이 두개 위치한 경우 예를 들어  colon의 경우
// coool을 입력하면 초초노노노 가 뜨며 두번째 o에서 노란색이 출력되는 오류 발생
// 칸을 전부 사용하면 게임이 아예 안되거나 초기화 시켜야 하는데 지금은 에러메시지 출력 이후 그대로임
