/*---------------*/
/*== SELECTORS ==*/
/*---------------*/
/* #region selectors */
const nav = document.querySelector('#nav');
const ham = document.querySelector('.ham-wrapper');
const socials = document.querySelector('.socials');
const landing = document.getElementById("landing")
const video = document.querySelector('video');
const accordionList = document.querySelectorAll('.accordion-item-header');
const width = window.innerWidth;
const newsCloseBtn = document.getElementById("news-close")
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
    video.setAttribute('playsinline', "true");
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

    // Nav
    if (nav.classList.contains("nav-active")) {
        setTimeout(function () {
            nav.style.display = "none"
        }, 400)
    } else {
        nav.style.display = "flex"
    }
});

// Pre-Loader
window.addEventListener('load', function () {
    setTimeout(function () {
        const loader = document.querySelector('.pre-loader');
        loader.classList.add('pl-hide');
    }, 350)
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
    accordionHeader.addEventListener('click', () => {
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
            accordionItemBody.style.maxHeight = "0";
        }
    });
});

// Hamburger Menu
ham.addEventListener('click', toggleNav);
/* #endregion */

const news = document.getElementById("news")
newsCloseBtn.addEventListener("click", manageNews)
let newsClosed = false

function manageNews() {
    newsClosed = true
    hideNews()
}

function hideNews() {
    news.style.transform = `translateY(-${news.offsetHeight}px)`
    document.getElementById("navbar").style.transform = `translateY(-${news.offsetHeight}px)`
    document.getElementById("navbar").style.top = `${news.offsetHeight}px`

    if (newsClosed && width < 1000) {
        document.getElementById("features").style.paddingTop = "0px"
        document.getElementById("features").style.marginTop = "-50px"
    }
    if (newsClosed) {
        landing.style.transform = `translateY(-${news.offsetHeight}px)`
    }
}

function showNews() {
    news.style.transform = `translateY(0px)`
    document.getElementById("navbar").style.transform = `translateY(0px)`
    document.getElementById("navbar").style.top = `0px`
}

/*---------------*/
/*== FUNCTIONS ==*/
/*---------------*/

/* #region functions */

// Open / Close the nav menu
function toggleNav() {
    if (nav.classList.contains("nav-active")) {
        setTimeout(function () {
            nav.style.display = "none"
            console.log("here")
        }, 400)
    } else {
        if(nav.classList.contains("dfo")) {
            nav.classList.remove("dfo")
        }
        nav.style.display = "flex"
    }
    setTimeout(function () {
        nav.classList.toggle('nav-active');
        ham.classList.toggle('ham-active');
        socials.classList.toggle('socials-active');
    }, 5)
    // Check if user is at top to prevent bugs
    if (document.documentElement.scrollTop < 50) {
        document.getElementById("navbar").style.transition = "all .35s ease"
    } else {
        document.getElementById("navbar").style.transition = "none"
    }
    // Hide news while the menu is open
    if (socials.classList.contains("socials-active")) {
        hideNews()
        nav.style.position = "fixed"
        nav.style.top = "auto"
        landing.style.transform = `translateY(-${news.offsetHeight}px)`
    } else {
        if (!newsClosed) {
            landing.style.transform = `translateY(0px)`
            showNews()
            setTimeout(function () {
                nav.style.position = "sticky"
                nav.style.top = "0"
            }, 1000)
        }
    }
}

// Close the nav menu
function closeMenu() {
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
    $("html, body").animate({scrollTop: 0}, 400)
    closeMenu()
}

// Shrink navbar on scroll
window.onscroll = function () {
    scrollFunction();
};
window.onload = function () {
    scrollFunction()
    if (!news.getAttribute("style")) {
        document.getElementById("features").style.paddingTop = "80px"
    }
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
