myEmail = 'joshmboisvert@gmail.com';
popUpCopy = document.getElementById('copy-email');

document.getElementById('mail').onclick = function() {
    navigator.clipboard.writeText(myEmail);
    popUpCopy.style.opacity = '1';
    setTimeout(function() {popUpCopy.style.opacity = '0';}, 1500);
}