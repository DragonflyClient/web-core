fetch("https://api.playdragonfly.net/cookie/auth", {
    method: 'POST',
    credentials: 'include'
}).then(res => {
    if (res.status === 200) {
        res.json().then(json => {
            if (json.success) {
                username = json.username;
                document.getElementById('acc-name').innerText = json.username
                document.getElementById('content').style.display = 'block'
                document.getElementById('load').style.display = 'none'
                console.log(username)
            }
        })
    } else {
        if (res.status === 401) {
            document.getElementById('id01').style.display = 'block'
        } else {
            setTimeout(function () {
                Swal.fire({
                    title: `Error!`,
                    text: `${res.error}`,
                    icon: 'error',
                    confirmButtonText: 'Got it'
                })
            }, 50)
        }
    }
})