const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling", "flashsocket"],
});

const form = document.getElementById("send-container");
const massageInput = document.getElementById("massageInp");
const massageContainer = document.querySelector(".container");
var joined = new Audio('joined.wav');
var recieved = new Audio('recieved2.mp3');
var leaved = new Audio('leaved.wav');

const append = (massage, position) => {
  const massageElement = document.createElement("div");
  massageElement.innerHTML = massage;
  massageElement.classList.add('massage');
  massageElement.classList.add(position);
  massageContainer.append(massageElement);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const massage = massageInput.value;
  append(`You : ${massage}`, 'right');
  socket.emit('send', massage);
  massageInput.value = '';
});

const name = prompt("Enter your name");
socket.emit("new-user-joined", name);

socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'left');
  joined.play();
});

socket.on('recieve', data => {
  append(`${data.name} : ${data.message}`, 'left');
  recieved.play();
});

socket.on('left', name => {
  append(`${name} left the chat`, 'left');
  leaved.play();
});