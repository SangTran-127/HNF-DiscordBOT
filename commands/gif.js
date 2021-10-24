const { tenorGifApi } = require('../getApi')

module.exports = async function (message, args) {
    if (args.length === 0) {
        return message.channel.send('Phải bao gồm keyword để search chứ')
    }
    if (args.length > 0) {
        keyword = args.join(' ');


        let res = await tenorGifApi(keyword);
        message.channel.send(`GIF của ${message.author} nè: ` + res);
    }
}