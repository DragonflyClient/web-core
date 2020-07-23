const form = document.getElementById("form")

form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(form)
    const name = formData.get("name")
    const password = formData.get("password")
    const body = {
        "name": name,
        "password": password
    }

    fetch("https://api.inceptioncloud.net/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
        .then(result => {
            if (result.success) {
                const username = result.username
                const token = result.token

                document.getElementById('id01').style.display = "none"
                localStorage.setItem('dragonfly-token', token)
                console.log(token)

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

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
            } else {
                const error = result.error
                console.log(error)
                // handle login no success
            }
        })
});

const form2 = document.getElementById("form2")
form2.addEventListener('submit', event => {
    console.log(form2);
    event.preventDefault()
    const formData = new FormData(form2)
    const name = formData.get("name2")
    const password = formData.get("password2")
    const body = {
        "name": name,
        "password": password
    }

    fetch("https://api.inceptioncloud.net/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
        .then(result => {
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
            if (result.success) {
                document.getElementById('id02').style.display = "none"
                console.log(result)
                Toast.fire(
                    'Good job!',
                    'Successfully registered!',
                    'success'
                )
            } else {
                const error = result.error
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: error
                })
            }
        })
});