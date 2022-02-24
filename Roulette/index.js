var options = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, "00", 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Helvetica, Arial';

    for (var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;


      ctx.fillStyle = (i == 0 || i == 19 ? "#00cc00" : (i % 2 ? "#000000" : "#FF0000"))



      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "rgb(220,220,220)";
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}


function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = options[index]

  // document.getElementById("spinResult").innerHTML=text;

  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
  const expr = document.getElementById('select').value;
  const mise = document.getElementById('mise').value;
  const mise2 = document.getElementById('mise2').value;
  const mise3 = document.getElementById('mise3').value;
  const mise4 = document.getElementById('mise4').value;
  


  

  switch (expr) {
    case 'impaire':

      if (text % 2 == 0) {
        console.log(text + " est pair vous vous perdez !");
        
        const money = parseInt(document.getElementById('myMoney').value);
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;



      }
      else {
        console.log(text + " est impair vous obtenez 1 fois la mise");

        
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money * 2+" €";

      }
      break;

    case 'paire':
      if (text % 2 == 0) {
        console.log(text + " est pair vous obtenez 1 fois la mise");
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money * 2+" €";
      }
      else {
        console.log(text + " est impair vous perdez !");

        const money = parseInt(document.getElementById('myMoney').value);
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;

    case 'simple':
      if (mise == text) {
        console.log('mise simple vous obtenez 35 fois la mise ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money * 35+" €";
      } else {
        console.log(text + " n'est pas egale à " + mise + " vous perdez !");
        const money = parseInt(document.getElementById('myMoney').value);
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'cheval':
      if (mise == text || mise2 == text) {
        console.log('vous remportez 17 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money * 17+" €";
      } else {
        console.log(" vous perdez !");
        const money = parseInt(document.getElementById('myMoney').value);
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'carre':
      if (mise == text || mise2 == text || mise3 == text || mise4 == text) {
        console.log('vous remportez 8 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money * 8+" €";
      } else {
        console.log(" vous perdez !");
        const money = parseInt(document.getElementById('myMoney').value);
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'rouge':
      if (text == 34 || text == 27 || text == 36 || text == 30 || text == 23 || text == 5 || text == 16 || text == 1 || text == 14 || text == 9 || text == 18 || text == 7 || text == 12 || text == 3 || text == 32 || text == 19 || text == 21 || text == 25) {
        console.log('vous remportez 1 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money + money +" €";
      } else {
        console.log(" vous perdez !");
        const money = parseInt(document.getElementById('myMoney').value);
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'noir':
      if (text == 26 || text == 15 || text == 4 || text == 2 || text == 17 || text == 6 || text == 13 || text == 11 || text == 8 || text == 10 || text == 24 || text == 33 || text == 20 || text == 31 || text == 22 || text == 29 || text == 28 || text == 35) {
        console.log('vous remportez 1 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money + money +" €";
      } else {
        console.log(" vous perdez !");
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'manque':
      if (text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == 10 || text == 11 || text == 12 || text == 13 || text == 14 || text == 15 || text == 16 || text == 17 || text == 18) {
        console.log('vous remportez 1 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money + money +" €";
      } else {
        console.log(" vous perdez !");
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'passe':
      if (text == 19 || text == 20 || text == 21 || text == 22 || text == 23 || text == 24 || text == 25 || text == 26 || text == 27 || text == 28 || text == 29 || text == 30 || text == 31 || text == 32 || text == 33 || text == 34 || text == 35 || text == 36) {
        console.log('vous remportez 1 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money + money +" €";
      } else {
        console.log(" vous perdez !");
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'top':
      if (text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == 10 || text == 11 || text == 12) {
        console.log('vous remportez 1 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money + money +" €";
      } else {
        console.log(" vous perdez !");
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'mid':
      if (text == 13 || text == 14 || text == 15 || text == 16 || text == 17 || text == 18 || text == 19 || text == 20 || text == 21 || text == 22 || text == 23 || text == 24) {
        console.log('vous remportez 1 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money + money +" €";
      } else {
        console.log(" vous perdez !");
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case 'bot':
      if (text == 25 || text == 26 || text == 27 || text == 28 || text == 29 || text == 30 || text == 31 || text == 32 || text == 33 || text == 34 || text == 35 || text == 36) {
        console.log('vous remportez 1 fois votre mise. ');
        const money = parseInt(document.getElementById('myMoney').value);
        document.getElementById("gains").innerHTML = money + money +" €";
      } else {
        console.log(" vous perdez !");
        let lost = " Gains Perdu";
        document.getElementById("gains").innerHTML = lost;
      }
      break;
    case '':
      console.log(`selectionnez une option de mise.`);
      break;



  }


}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

drawRouletteWheel();




