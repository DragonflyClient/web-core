/* Handle login */
const formLogin = document.getElementById("form-login")
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
formLogin.addEventListener('submit', event => {
    event.preventDefault()
    const formDataLogin = new FormData(formLogin)
    const name = formDataLogin.get("name")
    const password = formDataLogin.get("password")
    const body = {
        "name": name,
        "password": password
    }

    fetch("https://api.playdragonfly.net/cookie/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }).then(result => result.json())
        .then(result => {
            if (result.success) {
                console.log(result)
                const username = result.username

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })

                document.getElementById('id01').style.display = 'none'

                const container = document.getElementById("username-info")
                const pre = document.createElement("span")
                const post = document.createElement("span")
                const strong = document.createElement('strong')

                container.innerText = ""
                pre.innerText = "You are currently logged in as "
                strong.innerText = username
                post.innerText = ". Posts you create are marked with your name."

                container.appendChild(pre)
                container.appendChild(strong)
                container.appendChild(post)
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

/* Handle register */
const formRegister = document.getElementById("form-register")
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

    fetch("https://api.playdragonfly.net/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
        .then(result => {
            if (result.success) {
                console.log(result);
                Toast.fire({
                    icon: 'success',
                    title: 'Account successfully created!'
                })
                document.getElementById('id02').style.display = 'none'
            } else {
                const error = result.error
                console.log(result);
                Toast.fire({
                    icon: 'error',
                    title: result.error
                })
            }
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
