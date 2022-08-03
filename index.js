let obj = [], currObj = [], len = 0, active = true;

$(document).on('keypress', function (event) {
  if (active) {
    if (active && event.key.toLowerCase() == 'a') {
      makeStep();
    }
  } else {
    obj = [], currObj = [], len = 0;
    active = true;
    makeStep();
  }
});

$('.b').on('click', function () {
  let name = $(this).attr('id');

  $('#' + name).addClass('active');
  setTimeout(function () {
    $('#' + name).toggleClass('active');
  }, 100);

  currObj.push(name);
  check();
});

function makeStep() {
  let curr = Math.floor(Math.random() * 4) + 1, res;
  switch (curr) {
    case 1:
      res = 'green';
      break;
    case 2:
      res = 'red';
      break;
    case 3:
      res = 'yellow';
      break;
    case 4:
      res = 'blue';
      break;
    default: alert('something wrong');
  }

  obj.push(res);
  len++;
  $('#title').text('Level ' + len);

  let audio = new Audio('sounds/' + res + '.mp3');
  audio.play();

  $('#' + res).animate({ opacity: 0.5 }, 200);
  $('#' + res).animate({ opacity: 1 }, 200);

  /* $('#' + res).addClass('pressed');

  setTimeout(function () {
    $('#' + res).removeClass('pressed');
  }, 220); */
}

function check() {
  for (let i = 0; i < Math.min(len, currObj.length); i++) {
    if (obj[i] != currObj[i]) active = false;
  }

  if (!active) {
    let audio = new Audio('sounds/wrong.mp3');
    audio.play();

    $('body').toggleClass('red');
    setTimeout(function () {
      $('body').toggleClass('red');
    }, 240);

    $('#title').text('Game Over, Press Any Key To Restart');
  } else if (len == currObj.length) {
    currObj = [];
    setTimeout(makeStep, 300);
  }
}
