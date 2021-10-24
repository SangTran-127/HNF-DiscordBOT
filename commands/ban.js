
module.exports = function (message, args) {
    // one 1 member per time

    if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.channel.send('Bạn không đủ quyền hạn để BAN')
    }

    if (!args[0]) {
        return message.channel.send('Bạn cần cung cấp tên để BAN')
    }
    let reason = args.slice(1).join(' ');
    if (!reason) {
        return message.channel.send('BAN phải có lý do chứ 🥲')
    }

    console.log(args);

    console.log(reason);
    const member = message.mentions.users.first();
    if (member) {
        const memberTarger = message.guild.members.cache.get(member.id);
        memberTarger.ban()
        message.channel.send(`Đã BAN thành công **${member.username}** ra khỏi group. Lý do **${reason}**! `)

    } else {
        message.channel.send(`Không BAN được, user **${args[0]}** không nằm trong server`);
    }

}