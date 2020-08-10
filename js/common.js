
getDragonflyAccount()
/* Dropdown menu
 When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show-acc-dropdown");
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
    document.getElementById('drgn-accountname').innerText = localStorage.getItem('user')
    fetch("https://api.playdragonfly.net/cookie/auth", {
        method: 'POST',
        credentials: 'include'
    }).then(res => {
        if (res.status === 200) {
            res.json().then(res => {
                const accNameIcon = document.getElementById('drgn-accountname-icon')
                if (res.success) {
                    console.log(res.username)
                    document.getElementById('drgn-accountname').innerText = res.username

                    document.querySelector('.dropdown-account').style.display = 'inline-block'
                    accNameIcon.style.display = 'inline-block'
                } else {
                    console.log(res.error)
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
                }
            })
        }
    })
}