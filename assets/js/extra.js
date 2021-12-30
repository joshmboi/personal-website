const gallery = document.getElementById('extra-gallery');
const yjsp = document.getElementById('yjsp');
const code = document.getElementById('code');
const gtweb = document.getElementById('gtweb');
const galleryHeader = document.getElementById('extra-gallery-header');
const galleryWords = document.getElementById('picture-words');
var galleryImage = document.getElementById('extra-gallery-picture');

const yjspWords = "In the YJSP, I had the opportunity to work on building the first collegiate liquid-fueled rocket that would reach space. As a member of the Propulsion Flight Feedsystem team, I worked on the design and arrangement of the feedsystem in the flight vehicle."
const codeWords = "I have been coding for 9 years. Though my current college degree is in Aerospace Engineering, I have never stopped coding personal projects and have been learning increasingly more. I recently participated in HackGT8 where my partner and I competed in the capture the flag competitions and placed 15th overall as a team of two."
const gtwebWords = "Over the Fall semester of 2021, I worked with two other members to create a website that allows users to gather their Spotify statistics. The primary objective of our website over the semester was to finish the authentication process of users. Though I was not the main contributor of the project, I was able to gain a lot of insight into authentication and the use of Angular in general."

var yjsps = new Array();
var codes = new Array();
var gtwebs = new Array();
var indexNumber = 0;
var galleryTimer = null;

yjsps[0] = new Image();
yjsps[0].src = '../images/yjsp/yjsp1.jpg';
yjsps[1] = new Image();
yjsps[1].src = '../images/yjsp/yjsp2.jpg';
yjsps[2] = new Image();
yjsps[2].src = '../images/yjsp/yjsp3.jpg';
yjsps[3] = new Image();
yjsps[3].src = '../images/yjsp/yjsp4.jpg';

codes[0] = new Image();
codes[0].src = '../images/code/code1.jpg';
codes[1] = new Image();
codes[1].src = '../images/code/code2.jpg';

gtwebs[0] = new Image();
gtwebs[0].src = '../images/gtweb/gtweb1.jpg';
gtwebs[1] = new Image();
gtwebs[1].src = '../images/gtweb/gtweb2.jpg';

function galleryScroll(imgArray) {
  galleryImage.classList.add('fade');
  setTimeout(function () { galleryImage.src = imgArray[indexNumber % imgArray.length].src; }, 1500)
  setTimeout(function () { galleryImage.classList.remove('fade'); }, 1500);
  indexNumber++;
  if (gallery.style.display !== 'none'){
    galleryTimer = setTimeout(galleryScroll, 5000, imgArray);
  }
}

yjsp.onclick = function() {
  galleryHeader.innerHTML = 'YJSP';
  galleryImage.src = yjsps[0].src;
  galleryWords.innerText = yjspWords;
  gallery.style.display = 'block';
  indexNumber = 0;
  galleryTimer = setTimeout(galleryScroll, 5000, yjsps);
}

code.onclick = function() {
  galleryHeader.innerHTML = 'CODING';
  galleryImage.src = codes[0].src;
  galleryWords.innerText = codeWords;
  gallery.style.display = 'block';
  indexNumber = 0;
  galleryTimer = setTimeout(galleryScroll, 5000, codes);
}

gtweb.onclick = function() {
  galleryHeader.innerHTML = 'GT-WEBDEV';
  galleryImage.src = gtwebs[0].src;
  galleryWords.innerText = gtwebWords;
  gallery.style.display = 'block';
  indexNumber = 0;
  galleryTimer = setTimeout(galleryScroll, 5000, gtwebs);
}

window.onclick = function(event) {
  if (event.target == gallery) {
    gallery.style.display = 'none';
    clearTimeout(galleryTimer);
  }
}
