const form = document.querySelector('#apply-form');
const positionSelect = document.getElementById('position')

var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{
        header: 1
    }, {
        header: 2
    }], // custom button values
    [{
        list: "ordered"
    }, {
        list: "bullet"
    }],

    ["clean"], // remove formatting button
];

var quill = new Quill("#message1", {
    modules: {
        toolbar: toolbarOptions,
    },
    theme: "snow",
});

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const position = positionSelect.options[positionSelect.selectedIndex].value;
    const name = formData.get('name');
    const nickname = formData.get('nickname');
    const discordName = formData.get('discordName');
    const message = quill.container.firstChild.innerHTML;

    const application = {
        email,
        name,
        nickname,
        discordName,
        position,
        message,
    };
    console.log(application)

    fetch(`https://apply-api.inceptioncloud.net/applications/submit`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(application)
    })
        .then(response => {
            if (response.ok) {
                response
                    .json()
                    .then(data => {
                        console.log('Success:', data);
                        Swal.fire({
                            title: 'Success!',
                            text: "Your application was successfully sent!",
                            icon: 'success',
                            confirmButtonText: 'Yeah',
                        });
                    })
                document.querySelector('.ql-editor').innerText = ''
                form.reset()
            } else {
                response.json().then((err) => {
                    console.log('Error', err)
                    Swal.fire({
                        title: 'Error!',
                        text: err.message,
                        icon: 'error',
                        confirmButtonText: 'Got it',
                    });
                })
            }
        })
    event.preventDefault();
});