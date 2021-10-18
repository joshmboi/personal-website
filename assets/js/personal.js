var remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
var boundary = document.getElementById('project').getBoundingClientRect();
window.onresize = function() {
  var remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  var boundary = document.getElementById('project').getBoundingClientRect();
}


document.getElementById('project').onmousemove = function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var newposX = x - 5*remPx - 0.5*(boundary.right + boundary.left);
  var newposY = y - 5*remPx - 0.5*(boundary.bottom + boundary.top);
  document.getElementById('magnifier').style.transform = 'translate3d(' + newposX + 'px,' + newposY + 'px, 0px)';
  //document.getElementById('project').style.cursor = 'none';
  //document.getElementById('project').style.border = '1px solid black';

}

function reappear() {
  document.getElementById('magnifier').style.display = 'block';
  console.log('reapppear');
}

function disappear() {
  document.getElementById('magnifier').style.display = 'none';
}

// document.getElementById('project').onmouseleave = function() {
//   document.getElementById('project').style.cursor = 'initial';
//   document.getElementById('project').style.border = '1px solid red';
//   document.getElementById('magnifier').style.display = 'none';
//   console.log('we have out');
// }

//function mouseOut() {
//  document.getElementById('project').style.cursor = 'initial';
//  document.getElementById('project').style.border = '1px solid red';
//  document.getElementById('magnifier').style.display = 'none';
//  console.log('we have out');
//}
