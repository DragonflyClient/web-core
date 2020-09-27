/* Handle login */
const formLogin = document.getElementById("form-login")
const reloadDelay = 500
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
if (location.href.indexOf('login') > -1 || location.href.indexOf('ideas') > -1) {
    formLogin.addEventListener('submit', event => {
        event.preventDefault()
        const formDataLogin = new FormData(formLogin)
        const name = formDataLogin.get("name")
        const password = formDataLogin.get("password")
        const body = {
            "name": name,
            "password": password
        }

        fetch("https://api.playdragonfly.net/v1/authentication/cookie/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }).then(result => result.json())
            .then(result => {
                if (result.success) {
                    const username = result.username

                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                    setTimeout(() => {
                        afterLogin(result.success, username)
                    }, reloadDelay);

                    if (location.href.indexOf('ideas') >= 8) {
                        console.log(location.href.indexOf('ideas') >= 8)
                        setTimeout(() => {
                            location.reload()
                        }, reloadDelay);
                    }
                } else {
                    const error = result.error
                    console.log(error)
                    Toast.fire({
                        icon: 'error',
                        title: result.error
                    })
                }
            })
    });
}

if (location.href.indexOf('register') > -1 || location.href.indexOf('ideas') > -1) {
    /* Handle register */
    const formRegister = document.getElementById("form-register")
    console.log('now')
    formRegister.addEventListener('submit', event => {
        event.preventDefault()
        const formDataRegister = new FormData(formRegister)
        console.log(formDataRegister)
        const name = formDataRegister.get("name")
        const password = formDataRegister.get("password")
        const body = {
            "name": name,
            "password": password
        }

        fetch("https://api.playdragonfly.net/v1/authentication/cookie/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }).then(result => result.json())
            .then(result => {
                if (result.success) {
                    console.log(result);
                    Toast.fire({
                        icon: 'success',
                        title: 'Account successfully created!'
                    })
                } else {
                    const error = result.error
                    console.log(error);
                    Toast.fire({
                        icon: 'error',
                        title: error
                    })
                }
                setTimeout(() => {
                    afterLogin(result.success, result.username)
                }, reloadDelay);
            })
    });

    function switchAuth(auth) {
        if (auth === 'login') {
            document.getElementById('id02').style.display = 'none'
            document.getElementById('id01').style.display = 'block'
        } else {
            document.getElementById('id01').style.display = 'none'
            document.getElementById('id02').style.display = 'block'
        }
    }
}
