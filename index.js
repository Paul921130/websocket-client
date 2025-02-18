var ws;

// 監聽 click 事件
document.querySelector("#connect")?.addEventListener("click", (e) => {
  console.log("[click connect]");
  connect();
});

document.querySelector("#disconnect")?.addEventListener("click", (e) => {
  console.log("[click disconnect]");
  disconnect();
});

document.querySelector("#sendBtn")?.addEventListener("click", (e) => {
  const msg = document.querySelector("#sendMsg");
  console.log(msg);
  sendMessage(msg?.value);
});

// Listen for messages from Server
function sendMessage(msg) {
  console.log("msg", msg);
  // Send messages to Server
  ws.send(msg);
  // Listen for messages from Server
  ws.onmessage = (event) => {
    console.log("[send message]", event);
    console.log(`[Message from server]:\n %c${event.data}`, "color: blue");
    insertMessage(event?.data);
  };
}

function insertMessage(msg) {
  const message = document.createElement("li");
  message.textContent = msg;
  document.querySelector("#messages").appendChild(message);
}

function connect() {
  // Create WebSocket connection
  ws = new WebSocket("ws://localhost:8080");
  // 在開啟連線時執行
  ws.onopen = () => {
    console.log("[open connection]");
    // Listen for messages from Server
    ws.onmessage = (event) => {
      console.log(`[Message from server]:\n %c${event.data}`, "color: blue");
      insertMessage(event?.data);
    };
  };
}

function disconnect() {
  ws.close();
  // 在關閉連線時執行
  ws.onclose = () => console.log("[close connection]");
}
