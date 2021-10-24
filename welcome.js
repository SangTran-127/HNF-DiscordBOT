const Discord = require('discord.js')
const client = new Discord.Client();
const { tenorGifApi } = require('./getApi')
module.exports = (client) => {
    const channelID = '900759220230709312'
    const channelRule = '900759220230709313'
    client.on('guildMemberAdd', async member => {
        let res = await tenorGifApi('hello cute');
        const message = `Chào mừng <@${member.id}> đã đến với server HNF🥰, nhớ đọc ${member.guild.channels.cache.get(channelRule)} trước khi vào server nha`
        const channel = member.guild.channels.cache.get(channelID)
        channel.send(message + '\n' + res)

    })
}