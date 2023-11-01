const socketClient = io();

const h4Name = document.getElementById("name");
const form = document.getElementById("chatForm");
const inputMessage = document.getElementById("message");
const divChat = document.getElementById("chat");

let user;

//formulario nombre
Swal.fire({
        title: 'Welcome!',
        input: 'What is your name?',
        input: "text",
        inputValidator: (value) => {
            if (!value) {
                return 'Name is require'
            }
        },
        confirmButtonText: "Enter",

    })
    .then(input => {
        user = input.value;
        h4Name.innerText = user;
        //emite evento nuevo usuario
        socketClient.emit('newUser', user);
    });

//escuchamos evento usuario conectado y mostramos nombre
socketClient.on('userConnected', user => {
    Toastify({
        text: `${user} connected`,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 5000,
        className: "info",
        close: true,
        gravity: "top",
        position: "left"
    }).showToast();
})

socketClient.on('connected', async () => {
    Toastify({
        text: `Your are connected`,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 5000,
        className: "info",
        close: true,
        gravity: "top",
        position: "left"
    }).showToast();

    const messages = await messageManager.findAll();
    const chat = messages.map(m => {
            return `<p>${m.user}: ${m.message}</p>`
        })
        .join(" ");
    divChat.innerHTML = chat;

});

form.onsubmit = (e) => {
    e.preventDefault();

    const infoMessage = {
        user: user,
        message: inputMessage.value,
    };

    socketClient.emit('message', infoMessage);

    inputMessage.value = "";

};

socketClient.on('chat', (messages) => {
    console.log(messages);
    const chat = messages.map(m => {
            return `<p>${m.user}: ${m.message}</p>`
        })
        .join(" ");
    divChat.innerHTML = chat;
})