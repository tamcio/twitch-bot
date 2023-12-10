const tmi = require('tmi.js');
const {getStats} = require('./chess.js');
const { twitch_bot_name, twitch_oauth_token } = require('./config.js')



const client = new tmi.Client({
    identity: {
        username: twitch_bot_name,
        password: twitch_oauth_token
    },
    channels: [ 'tamcio_' ]
});

client.connect();

client.on('connected', (address, port) => {
    console.log(`Połączono z serwerem Twitch`);
});

client.on('message', (channel, tags, message, self) => {
    console.log(`${tags['display-name']}: ${message}`);
    if (!(tags.username === 'tamcio_'))
    {
        if(self || !message.startsWith('!')) return;

        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();

        if(command === 'chess')
        {
            const name = args.join(' ');
            (async () =>
                {
                    const result = await getStats(name);
                    // console.log('test ' + result);
                    if (result.length === 1)
                        client.say(channel,`@${tags.username} nie znaleziono gracza o nicku ${name}`);
                    else(client.say(channel,`@${tags.username} gracz o nicku ${name} ma na rapid ${result[0]}, blitz ${result[1]}, i na puzzlach ${result[3]}`))
                })();
        }
    }
    else
    {
        return;
    }


});
