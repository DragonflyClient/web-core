
document.addEventListener('DOMContentLoaded', function () {
    const accNameIcon = document.getElementById('drgn-accountname-icon')
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
    console.log(element)
    element.nextElementSibling.classList.toggle("show-acc-dropdown");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.drgn-information')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-acc-dropdown')) {
                openDropdown.classList.remove('show-acc-dropdown');
            }
        }
    }
}
function getDragonflyAccount() {
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
        }
    })
}

/* Set parameter from page before */
if (window.location.href.indexOf('login') > -1) {
    document.getElementById('switch-register').href = `register?ref=${params.get('ref')}`
} else if (window.location.href.indexOf('register') > -1) {
    document.getElementById('switch-login').href = `login?ref=${params.get('ref')}`
}

/* Dragonfly account logout */
function logOut() {

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