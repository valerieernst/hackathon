const pubnub = new PubNub({
  subscribeKey: 'sub-c-9d147b8e-f09d-11e6-b753-0619f8945a4f',
  publishKey: 'pub-c-d8e13905-d441-4507-ade4-cbbe7095b684'
})

//initializes listeners. Alter handlers to configure. Check API docs for alternate configuration.
pubnub.addListener({
  message: (message) => {
    console.log('New message', message.message);
  },
  presence: (presence) => {
    console.log('New presence', presence)
  },
  status: (status) => {
    console.log('New status', status);
  }
});

// subscribe to chat channel.
// enter the name of the channel to subcribe to as parameter .
const subscribe = (channel) => {
  pubnub.subscribe({
    channels: [channel],
    withPresence: true
  });
}

// Publish 'message' to 'channel'.
// Both parameters required.
const publish = (message, channel) => {
  pubnub.publish({
    message: message,
    channel: channel,
    storeInHistory: true,
    sendByPost: true
  },
  (status, response) => {
    console.log('Status', status);
    console.log('Response', response);
  });
};
