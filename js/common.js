<<<<<<< HEAD
window.onload = () => {
  getDragonflyAccount();
};
/* Dropdown menu
 When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show-acc-dropdown');
=======

document.addEventListener('DOMContentLoaded', function () {
    const savedUser = localStorage.getItem('user')
    console.log('Dom loaded')
    if (savedUser !== null) {
        document.getElementById('drgn-accountname').innerText = savedUser
        document.querySelector('.dropdown-account').style.display = 'inline-block'
    } else {
        document.getElementById('drgn-accountname').innerText = 'Log in'
    }

    getDragonflyAccount()
})

/* Dropdown menu
 When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropdown(element) {
    element.nextElementSibling.classList.toggle("show-acc-dropdown");
>>>>>>> 3c4abe0636d7368d84364c53bd149f33d938d58c
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
<<<<<<< HEAD
  console.log(event.target);
  if (!event.target.matches('.drgn-information')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show-acc-dropdown')) {
        openDropdown.classList.remove('show-acc-dropdown');
      }
=======
    if (!event.target.matches('.drgn-information')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-acc-dropdown')) {
                openDropdown.classList.remove('show-acc-dropdown');
            }
        }
>>>>>>> 3c4abe0636d7368d84364c53bd149f33d938d58c
    }
  }
};
function getDragonflyAccount() {
<<<<<<< HEAD
  fetch('https://api.playdragonfly.net/cookie/auth', {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        const accNameIcon = document.getElementById('drgn-accountname-icon');
        if (res.success) {
          console.log(res.username);
          document.getElementById('drgn-accountname').innerText = res.username;

          document.querySelector('.dropdown-account').style.display = 'inline-block';
          accNameIcon.style.display = 'inline-block';
        } else {
          console.log(res.error);
          document.getElementById('drgn-accountname').innerText = 'Log in';

          document.querySelector('.dropdown-account').style.display = 'inline-block';
          document.getElementById('myDropdown').remove();
          accNameIcon.remove();
          document
            .getElementById('drgn-account-login')
            .setAttribute('href', 'https://playdragonfly.net/login');
=======
    const accNameIcon = document.getElementById('drgn-accountname-icon')
    const savedUser = localStorage.getItem('user')
    fetch("https://api.playdragonfly.net/cookie/auth", {
        method: 'POST',
        credentials: 'include'
    }).then(res => {
        if (res.status === 200) {
            res.json().then(res => {
                if (res.success) {
                    console.log(res.username)
                    document.getElementById('drgn-accountname').innerText = res.username
                    localStorage.setItem('user', res.username)
                } else {
                    console.log(res.error)
                    localStorage.removeItem('user')
                    document.getElementById('drgn-accountname').innerText = 'Log in'

                    document.querySelector('.dropdown-account').style.display = 'inline-block'
                    document.getElementById('myDropdown').remove()
                    accNameIcon.remove()
                    document.getElementById('drgn-account-login').setAttribute('href', `https://playdragonfly.net/login?ref=${window.location.href}`)
                }
            })
>>>>>>> 3c4abe0636d7368d84364c53bd149f33d938d58c
        }
      });
    }
  });
}

/* Set parameter from page before */
if (window.location.href.indexOf('login') > -1) {
    document.getElementById('switch-register').href = `register?ref=${params.get('ref')}`
} else if (window.location.href.indexOf('register') > -1) {
    document.getElementById('switch-login').href = `login?ref=${params.get('ref')}`
}

/* Dragonfly account logout */
function logOut() {
<<<<<<< HEAD
  fetch('https://api.playdragonfly.net/cookie/logout', {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((res) => {
        if (res.success) {
          console.log(res);
          location.reload();
        }
      });
    }
  });
}

/* ham nav */
window.addEventListener('load', function () {
  const nav = document.querySelector('.nav'),
    ham = document.querySelector('.ham-wrapper'),
    socials = document.querySelector('.socials');
  function toggleNav() {
    nav.classList.contains('nav-active')
      ? setTimeout(function () {
          (nav.style.display = 'none'), (nav.style.position = 'fixed');
        }, 350)
      : (nav.classList.contains('dfo') && nav.classList.remove('dfo'),
        (nav.style.display = 'flex'),
        (nav.style.position = 'sticky')),
      setTimeout(function () {
        nav.classList.toggle('nav-active'),
          ham.classList.toggle('ham-active'),
          socials.classList.toggle('socials-active');
      }, 5);
  }
  if (nav.classList.contains('nav-active')) {
    nav.classList.remove('nav-active');
    ham.classList.remove('ham-active');
  }
  ham.addEventListener('click', toggleNav);
  function closeMenu(e) {
    nav.classList.remove('nav-active'), ham.classList.remove('ham-active');
  }
});
=======

    fetch("https://api.playdragonfly.net/cookie/logout", {
        method: 'POST',
        credentials: 'include'
    }).then(res => {
        if (res.status === 200) {
            res.json().then(res => {
                if (res.success) {
                    location.reload()
                    localStorage.removeItem('user')
                }
            })
        }
    })
}
function scrollToTop() {
    $("html, body").animate({
        scrollTop: 0
    }, 400)
    closeMenu()
}
>>>>>>> 3c4abe0636d7368d84364c53bd149f33d938d58c
