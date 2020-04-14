const nav = document.querySelector('.nav');
const ham = document.querySelector('.ham-wrapper');
const socials = document.querySelector('.socials');
const landing = document.querySelector('.landing');
const vid = document.querySelector('.landing-vid');

const video = document.querySelector('video');

vid.addEventListener(
  'loadedmetadata',
  (event) => {
    vid.currentTime = 8;
  },
  false
);

nav.classList.remove('nav-active');
ham.classList.remove('ham-active');

ham.addEventListener('click', function (event) {
  nav.classList.toggle('nav-active');
  ham.classList.toggle('ham-active');
  socials.classList.toggle('socials-active');
  event.preventDefault();
});
const i = 0;
landing.addEventListener('click', function () {
  if (i == 0) {
    vid.pause();
    i = 1;
  } else {
    vid.play();
    i = 0;
  }
});
function closeMenu(e) {
  nav.classList.toggle('nav-active');
  ham.classList.toggle('ham-active');
  e.preventDefault();
}
