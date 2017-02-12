const pubnub = new PubNub({
  subscribeKey: 'sub-c-9d147b8e-f09d-11e6-b753-0619f8945a4f',
  publishKey: 'pub-c-d8e13905-d441-4507-ade4-cbbe7095b684'
})

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

pubnub.subscribe({
  channels: ['nick===GOD'],
  withPresence: true
});

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
