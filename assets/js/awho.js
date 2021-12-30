window.onload = function() {
  setup();
}

window.onresize = function() {
  setup();
}

function setup() {
  const awhoSection = document.getElementById('awho-section');
  var awhoCanvas = document.getElementById('awho-canvas');
  if (awhoCanvas != null) {
    awhoSection.removeChild(awhoCanvas);
  }
  var awhoBoundary = awhoSection.getBoundingClientRect();
  var awhoCanvas = document.createElement('canvas');
  awhoCanvas.id = 'awho-canvas';
  const magnify = 2;
  var fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  var screenDpr = window.devicePixelRatio || 1;
  screenDpr = screenDpr * 2;
  awhoCanvas = setupCanvas(awhoBoundary, awhoCanvas, fontSize, screenDpr, magnify);
  document.getElementById('awho-section').appendChild(awhoCanvas);
  startEvents(awhoCanvas, awhoBoundary, fontSize, screenDpr, magnify);
}

function setupCanvas(boundary, canvas, canvasFontSize, dpr, magPower) {
    canvas.width = boundary.width * dpr;
    canvas.height = boundary.height * dpr;
    canvas.style.height = boundary.height + 'px';
    canvas.style.width = boundary.width + 'px';
    var ctx = canvas.getContext('2d');
    drawText(ctx, canvasFontSize, dpr);
    return canvas;
  }

function drawText(ctx, pageFontSize, dpr) {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.font = pageFontSize * dpr / 2 + 'px Montserrat';
  const numRows = 1;
  const awhos = ['Aerospace Engineering Honor Society', 'Faculty Honors All Semesters', 'National Merit Scholar'];
  var vertSpacing = ctx.canvas.height/(numRows + 1);
  var vertPosition = vertSpacing;
  var horizSpacing;
  var horizPosition;
  var wordsPerLine = Math.floor(awhos.length/numRows);
  for (var row = 0; row < numRows; row++) {
    if (wordsPerLine > awhos.length) {
      wordsPerLine = awhos.length;
    }
    horizSpacing = ctx.canvas.width/(wordsPerLine + 1);
    horizPosition = horizSpacing;
    for (var word = 0; word < wordsPerLine; word++) {
      var wordHorizPosition = horizPosition - ctx.measureText(awhos[word]).width/2;
      var wordVertPosition = vertPosition - (ctx.measureText(awhos[word]).actualBoundingBoxAscent - ctx.measureText(awhos[word]).actualBoundingBoxDescent)/2;
      ctx.fillText(awhos[word], wordHorizPosition, wordVertPosition);
      horizPosition = horizPosition + horizSpacing;
    }
    vertPosition = vertPosition + vertSpacing;
    awhos.splice(0, wordsPerLine);
  }
}

function startEvents(canvas, boundary, remPx, dpr, magPower) {
  const magnifier = document.getElementById('magnifier');
  canvas.onmousemove = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var magRadius = 8*remPx;
    var newposX = x - magRadius - 0.5*(boundary.right + boundary.left);
    var newposY = y - magRadius - 0.5*(boundary.bottom + boundary.top);
    magnifier.style.transform = 'translate3d(' + newposX + 'px,' + newposY + 'px, 0px)';
    const magCtx = magnifier.getContext('2d');
    magCtx.canvas.height = magRadius*2;
    magCtx.canvas.width = magRadius*2;
    magCtx.drawImage(canvas, (x - boundary.left)*dpr - magRadius*dpr/magPower, (y - boundary.top)*dpr - magRadius*dpr/magPower, magRadius*2*dpr/magPower, magRadius*2*dpr/magPower, 0, 0, magRadius*2, magRadius*2);
  }
}