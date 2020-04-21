/* Selectors */

const nav = document.querySelector('.nav');
const ham = document.querySelector('.ham-wrapper');
const socials = document.querySelector('.socials');
const landing = document.querySelector('.landing');
const vid = document.querySelector('.landing-vid');

const video = document.querySelector('video');

vid.currentTime = 8;

nav.classList.remove('nav-active');
ham.classList.remove('ham-active');

/* Eventlisteners */
ham.addEventListener('click', toggleNav);

/* Functions */
function toggleNav() {
  nav.classList.toggle('nav-active');
  ham.classList.toggle('ham-active');
  socials.classList.toggle('socials-active');
}
function closeMenu(e) {
  nav.classList.toggle('nav-active');
  ham.classList.toggle('ham-active');
}

window.addEventListener('load', function () {
  const loader = document.querySelector('.pre-loader');
  loader.classList.add('pl-hide');
});
// Twenty Twenty only Laptop +
var width = window.innerWidth;
if (width > 1000) {
  injectScript('twentytwenty-master/js/jquery.event.move.js');
  injectScript('./twentytwenty-master/js/jquery.twentytwenty.js');
}
function injectScript(source) {
  script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function () {
    console.log('Script with source' + source + ' was successfully injected!');
  };
  script.src = source;
  document.getElementsByTagName('head')[0].appendChild(script);
}
// FAQ Accordion

const accordionHeader = document.querySelectorAll('.accordion-item-header');

accordionHeader.forEach((accordionHeader) => {
  accordionHeader.addEventListener('click', (event) => {
    accordionHeader.classList.toggle('accordion-active');
    const accordionItemBody = accordionHeader.nextElementSibling;
    if (accordionHeader.classList.contains('accordion-active')) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});
