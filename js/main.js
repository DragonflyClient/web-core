/*---------------*/
/*== SELECTORS ==*/
/*---------------*/
/* #region selectors */
// const nav = document.querySelector('#nav');
// const ham = document.querySelector('.ham-wrapper');
// const socials = document.querySelector('.socials');
const landing = document.getElementById("landing")
const video = document.querySelector('video');
const accordionList = document.querySelectorAll('.accordion-item-header');
const width = window.innerWidth;
const ham = document.querySelector('.ham-wrapper')
const nav = document.getElementById('nav')
const socials = document.querySelector('.socials');
const news = document.getElementById("news")
const newsCloseBtn = document.getElementById("news-close")
// const newsCloseBtn = document.getElementById("news-close")
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
// nav.classList.remove('nav-active');
// ham.classList.remove('ham-active');

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
    video.currentTime = 9;
    video.setAttribute('playsinline', "true");
    video.setAttribute("preload", "auto")
    document.body.appendChild(video)
    const source = document.createElement('source');
    source.setAttribute('src', './assets/landing-vid.mp4');
    video.appendChild(source);
    document.getElementById("vid-wrapper").appendChild(video);
}

function injectLandingVideo() {
    if (!withLandingImg) {
        createLandingVideo()
        withLandingImg = true
    }
    if (withLandingImg) {
        setTimeout(() => {
            document.querySelector('.landing-vid-freeze').style.display = 'none'
            console.log('landing freeze out')
        }, 1000);
    }
}



landing.addEventListener("click", toggleLandingVid)

let landingVidStatus = true

function toggleLandingVid() {
    const landingVid = document.getElementById("landing-vid")
    if (landingVid.paused) {
        landingVidStatus = true
        landingVid.play()
    } else {
        landingVidStatus = false
        landingVid.pause()
    }
}

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
    // if (nav.classList.contains("nav-active")) {
    //     setTimeout(function () {
    //         nav.style.display = "none"
    //     }, 400)
    // } else {
    //     nav.style.display = "flex"
    // }
});

// Pre-Loader
window.addEventListener('load', function () {
    console.log("doc loaded")
    const loader = document.querySelector('.pre-loader');
    loader.classList.add('pl-hide');

    if (window.innerWidth >= 1250) {
        injectLandingVideo()
    }

});


// Landing video
window.addEventListener("resize", function () {
    if (window.innerWidth > 1000) {
        injectLandingVideo()
    }
})
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
nav.classList.remove('nav-active');
ham.classList.remove('ham-active');
console.log('nav test active')
let navOpen = false
ham.addEventListener('click', e => {

    if (!navOpen) {
        nav.classList.add('nav-active')
        ham.classList.add('ham-active')
        socials.classList.add('socials-active')
        if (news && news.getAttribute('closed') !== "true") {
            console.log('first if')
            setTimeout(() => {
                hideNews()
            }, 250);
        } else {
            console.log('first else')
            hideNews()
        }
        navOpen = true
    } else {
        if (news && news.getAttribute('closed') !== "true") {
            showNews()
            setTimeout(() => {
                nav.classList.remove('nav-active')
                ham.classList.remove('ham-active')
                socials.classList.remove('socials-active')
            }, 250);
        } else {
            nav.classList.remove('nav-active')
            ham.classList.remove('ham-active')
            socials.classList.remove('socials-active')
        }

        navOpen = false
    }
})

function hideNews() {
    let op = "-"
    if (news.getAttribute('closed') !== "true") {
        news.style.transform = `translateY(${op}${news.offsetHeight}px)`
        document.getElementById("navbar").style.transform = `translateY(${op}${news.offsetHeight}px)`
        document.getElementById("navbar").style.top = `${news.offsetHeight}px`
    }

    console.log(op, `translateY(${op}${news.offsetHeight}px)`)

    if (news.getAttribute('closed') == "true" && width < 1000) {
        document.getElementById("features").style.paddingTop = "0px"
        document.getElementById("features").style.marginTop = "-50px"
    }
    console.log(news.getAttribute('closed') == "true")
    if (news.getAttribute('closed') == "true") {
        landing.style.transform = `translateY(-${news.offsetHeight}px)`
    }
}
function showNews() {
    if (news.getAttribute('closed') !== "true") {
        news.style.transform = `translateY(0px)`
        document.getElementById("navbar").style.transform = `translateY(0px)`
        document.getElementById("navbar").style.top = `0px`
    }
}

if (news) {
    newsCloseBtn.addEventListener("click", manageNews)
}

function manageNews() {
    console.log('closing')
    news.style.transform = `translateY(-${news.offsetHeight}px)`
    document.getElementById("navbar").style.transform = `translateY(-${news.offsetHeight}px)`
    document.getElementById("navbar").style.top = `${news.offsetHeight}px`
    localStorage.setItem('newsClosed', 'true')
    news.setAttribute('closed', 'true')
    hideNews()
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
    $("html, body").animate({ scrollTop: 0 }, 400)
    closeMenu()
}

// Shrink navbar on scroll
window.onscroll = function () {
    const landingVid = document.getElementById("landing-vid")
    if (landingVid) {
        if (document.documentElement.scrollTop > window.innerHeight) {
            landingVid.pause()
        } else if (landingVidStatus) {
            landingVid.play()
        }
    }
};

window.onload = function () {
    if (localStorage.getItem('newsClosed') !== 'true') {
        news.style.display = 'block'
    }

    if (!document.getElementById("news")) {
        nav.style.position = "fixed"
    }
    if (!news.getAttribute("style")) {
        document.getElementById("features").style.paddingTop = "80px"
    }
};

/* Logout dropdown */
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}