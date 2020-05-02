/*---------------*/
/*== SELECTORS ==*/
/*---------------*/

/* #region selectors */
const nav = document.querySelector('.nav');
const ham = document.querySelector('.ham-wrapper');
const socials = document.querySelector('.socials');
const landing = document.querySelector('.landing');
const vid = document.querySelector('.landing-vid');
const video = document.querySelector('video');
const accordionHeader = document.querySelectorAll('.accordion-item-header');
const width = window.innerWidth;
/* #endregion */



/*---------------------*/
/*== MAIN STATEMENTS ==*/
/*---------------------*/

/* #region main-statements */

nav.classList.remove('nav-active');
ham.classList.remove('ham-active');

/* #endregion */


/*-------------------*/
/*== WINDOW EVENTS ==*/
/*-------------------*/

/* #region window-events */
// Autostart Download
window.addEventListener("load", () => {
    const downloadLink = $("a[data-download]")[0];
    setTimeout(() => {
        window.location = downloadLink.getAttribute("href");
        console.log("Hello");
    }, 2000);
});


/*------------------*/
/*== OTHER EVENTS ==*/
/*------------------*/


// Hamburger Menu
ham.addEventListener('click', toggleNav);
/* #endregion */


/*---------------*/
/*== FUNCTIONS ==*/
/*---------------*/

/* #region functions */
// Open / Close the nav menu
function toggleNav() {
    nav.classList.toggle('nav-active');
    ham.classList.toggle('ham-active');
    socials.classList.toggle('socials-active');
}

// Close the nav menu
function closeMenu(e) {
    nav.classList.toggle('nav-active');
    ham.classList.toggle('ham-active');
}