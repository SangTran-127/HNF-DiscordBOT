

require('dotenv').config()
const { Client, Intents } = require('discord.js');
const Discord = require('discord.js')

const { commandHandle } = require('./command.js')
const client = new Discord.Client();
const welcome = require('./welcome')
client.login(process.env.TOKEN)

// that function make Bot online
client.on('ready', () => {
    console.log('❤️');
    welcome(client)
})

// 

client.on('message', commandHandle)
client.on('message', (message) => {
    const badWords = ['dm', 'cc', 'dmm', 'dcm', 'dkm', 'con cac', 'loz', 'lồn', 'lol'];
    const greeting = ['xin chào', 'hello', 'hi', 'hi mn', 'hello mn', 'hello mọi người', 'hi mọi người']
    const sadReactions = ['sad', 'hic', 'huhu', 'hjc', 'hix', 'hjx', 'buồn']
    mess = message.content;
    if (badWords.includes(mess.toLowerCase())) {
        message.react('🤬');
        message.reply('Chửi thề con căk')
    }
    if (greeting.includes(mess.toLowerCase())) {
        message.react('😍')
        message.reply('Chào bạn 🥳')
    }
    if (sadReactions.includes(mess.toLowerCase())) {
        message.react('😢')

    }
})