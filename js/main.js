/*---------------*/
/*== SELECTORS ==*/
/*---------------*/
/* #region selectors */
const nav = document.querySelector('.nav');
const ham = document.querySelector('.ham-wrapper');
const socials = document.querySelector('.socials');
const landing = document.getElementById("landing")
const video = document.querySelector('video');
const accordionList = document.querySelectorAll('.accordion-item-header');
const width = window.innerWidth;
/* #endregion */


/*------------*/
/*== FIELDS ==*/
/*------------*/

/* #region fields */
let withTwentyTwenty = false
let withLandingImg = false
/* #endregion */


/*---------------------*/
/*== MAIN STATEMENTS ==*/
/*---------------------*/

/* #region main-statements */
nav.classList.remove('nav-active');
ham.classList.remove('ham-active');

// Twenty Twenty only Laptop+
if (width > 1000) {
    injectScript('./twentytwenty-master/js/jquery.event.move.js');
    injectScript('./twentytwenty-master/js/jquery.twentytwenty.js');
    withTwentyTwenty = true
}

function createLandingVideo(qualifiedName, value) {
    const video = document.createElement("video")
    video.classList.add("desktop-only")
    video.classList.add("landing-vid")
    video.setAttribute("id", "landing-vid")
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.currentTime = 8;
    video.setAttribute('playsinline', true);
    video.setAttribute("preload", "auto")
    document.body.appendChild(video)
    const source = document.createElement('source');
    source.setAttribute('src', './assets/landing-vid.mp4');
    video.appendChild(source);
    document.getElementById("vid-wrapper").appendChild(video);
}

function injectLandingVideo() {
    if (window.innerWidth > 1000 && !withLandingImg) {
        createLandingVideo()
        withLandingImg = true
    }
}

injectLandingVideo()
const landingVid = document.getElementById("landing-vid")
landing.addEventListener("click", () => {
    if (landingVid.paused) {
        landingVid.play()
    } else {
        landingVid.pause()
    }
})
/* #endregion */


/*-------------------*/
/*== WINDOW EVENTS ==*/
/*-------------------*/

/* #region window-events */
// Autostart Download
// window.addEventListener("load", () => {
//     const downloadLink = $("a[data-download]")[0];
//     setTimeout(() => {
//         window.location = downloadLink.getAttribute("href");
//         console.log("Hello");
//     }, 2000);
// });

// Resize
window.addEventListener("resize", () => {
    if (window.innerWidth > 1000 && !withTwentyTwenty) {
        console.log("Injecting script to use TwentyTwenty since the width was increased.");
        refresh();
        withTwentyTwenty = true;
    } else if (window.innerWidth <= 1000 && withTwentyTwenty) {
        console.log("Reloading document to remove TwentyTwenty since the width was decreased.");
        refresh();
        withTwentyTwenty = false;
    }
});

// Pre-Loader
window.addEventListener('load', function () {
    setTimeout(function () {
        const loader = document.querySelector('.pre-loader');
        loader.classList.add('pl-hide');
    }, 350)
    document.documentElement.style.overflowY = "scroll"
});

// Landing video
window.addEventListener("resize", injectLandingVideo)
/* #endregion */


/*------------------*/
/*== OTHER EVENTS ==*/
/*------------------*/

/* #region other-events */
// FAQ Accordion
accordionList.forEach((accordionHeader) => {
    accordionHeader.addEventListener('click', (event) => {
        accordionHeader.classList.toggle('accordion-active');
        const accordionItemBody = accordionHeader.nextElementSibling;
        if (accordionHeader.classList.contains('accordion-active')) {
            accordionList.forEach((otherAccordion) => {
                if (otherAccordion !== accordionHeader) {
                    otherAccordion.classList.remove('accordion-active')
                    otherAccordion.nextElementSibling.style.maxHeight = 0;
                }
            })
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    });
});

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
    nav.classList.remove('nav-active');
    ham.classList.remove('ham-active');
}

// Refresh the page
function refresh() {
    window.location.reload(false)
}

// Add a script to the document
function injectScript(source) {
    script = document.createElement('script');
    script.type = 'text/javascript';
    /*script.onload = function () {
        console.log('Script with source' + source + ' was successfully injected!');
    };*/
    script.src = source;
    document.getElementsByTagName('head')[0].appendChild(script);
}

if (!window.location.hash) {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
}

/* #endregion */

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    closeMenu()
}

scrollToTop();
// Shrink navbar on scroll
window.onscroll = function () {
    scrollFunction();
};
window.onload = function () {
    scrollFunction()
};

function scrollFunction() {
    if (window.innerWidth > 800 || document.innerWidth > 800) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.height = "70px";
            document.getElementById("logo-img").style.width = "150px";
            document.getElementById('nav').style.fontSize = "18px";
        } else {
            document.getElementById("navbar").style.height = "90px";
            document.getElementById("logo-img").style.width = "180px";
            document.getElementById('nav').style.fontSize = "22px";
        }
    }
}
