const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

let choices = []

wss.on('connection', (ws) => {
  console.log("user connected")
  send = (firstplayer, lastplayer) => {
    ws.send(lastplayer)
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(firstplayer)
      }
    })
  }
  
  ws.on('message', (message) => {

    //reset
    if (message === 'reset') {
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('reset')
        }
      })
    } else {

    choices.push(message)
    console.log(choices)
    
    //handle winner logic
    if (choices.length !== 2) {
      ws.send('Waiting on Oponent')
    } else if (choices.length === 2) {
      if (choices[0] === choices[1]) {
        send('Tie', 'Tie')
      } else if (choices[0] === 'Rock' && choices[1] === 'Paper' || 
      choices[0] === 'Paper' && choices[1] === 'Scissor' || 
      choices[0] === 'Scissor' && choices[1] === 'Rock') {
        send('You Lost', 'You Won')
      } else {
        send('You Won', 'You Lost')
      }
      choices = []
    }

    }
  });

  ws.on('close', () => {
    console.log('client has closed');
  });

  ws.on('error', (e) => {
    console.log('client has thrown an error', e);
  });

});

// utility broadcast function
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};