const Discord = require('discord.js')
module.exports = function (message, args) {
    const botInfo = new Discord.MessageEmbed()
        .setColor('#FF9292')
        .setTitle('Các lệnh cơ bản hiện tại, sẽ phát triển trong tương lai 🥺')
        .addField('**KICK**', '!kick @[tên] [lý do]')
        .addField('**BAN**', '!ban @[tên] [lý do]')
        .addField('**SONG**', '!play|skip|stop [tên bài nhạc/link]')
        .addField('**GIF**', '!gif [tên ảnh gif]')

    return message.channel.send(botInfo)
}