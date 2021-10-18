const gallery = document.getElementById('extra-gallery');
const yjsp = document.getElementById('yjsp');
const program = document.getElementById('program');
const galleryHeader = document.getElementById('extra-gallery-header');
var galleryImage = document.getElementById('extra-gallery-picture');

var imgArray = new Array();
var indexNumber = 0;
var galleryTimer = null;

imgArray[0] = new Image();
imgArray[0].src = '../images/image1.jpg';

imgArray[1] = new Image();
imgArray[1].src = '../images/image2.jpg';

imgArray[2] = new Image();
imgArray[2].src = '../images/image3.jpg';

function galleryScroll() {
  galleryImage.classList.add('fade');
  setTimeout(function () { galleryImage.src = imgArray[indexNumber % imgArray.length].src; }, 1500)
  setTimeout(function () { galleryImage.classList.remove('fade'); }, 1500);
  indexNumber++;
  if (gallery.style.display !== 'none'){
    galleryTimer = setTimeout(galleryScroll, 5000);
  }
}

yjsp.onclick = function() {
  galleryHeader.innerHTML = 'YJSP';
  gallery.style.display = 'block';
  galleryTimer = setTimeout(galleryScroll, 5000);
}

program.onclick = function() {
  galleryHeader.innerHTML = 'PROGRAMMING';
  gallery.style.display = 'block';
  galleryTimer = setTimeout(galleryScroll, 5000);
}

window.onclick = function(event) {
  if (event.target == gallery) {
    gallery.style.display = 'none';
    console.log(gallery.style.display);
    clearTimeout(galleryTimer);
  }
}
