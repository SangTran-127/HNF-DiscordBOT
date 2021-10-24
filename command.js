
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');


const gif = require('./commands/gif')
const kick = require('./commands/kick')
const ban = require('./commands/ban')
const help = require('./commands/help')
const allCommand = {
    gif,
    kick,
    ban,
    help
}

const queue = new Map();
async function commandHandle(message) {
    // message.channel.id === '900781507982008411' dac biet o 1 channel nao do

    let content = message.content.split(' ')
    let command = content.shift();
    if (command.charAt(0) === '!') {
        // valid command here

        command = command.substring(1); // remove '!'
        if (allCommand[command]) {
            allCommand[command](message, content)
        }
        const serverQueue = queue.get(message.guild.id)
        if (command === 'play') {
            const voice_channel = message.member.voice.channel;

            if (!voice_channel) return message.channel.send('Chưa ai vào voice sao mà bật nhạc được 😢')
            const permissions = voice_channel.permissionsFor(message.client.user)
            if (!permissions.has('CONNECT')) return message.channel.send('Bạn không đủ quyền để sử dụng lệnh này');
            if (!permissions.has('SPEAK')) return message.channel.send('Bạn không đủ quyền để sử dụng lệnh này');

            if (!content.length) return message.channel.send('Play thì phải cho tên nhạc chứ')
            let song = {}
            if (ytdl.validateURL(content[0])) {
                const song_info = await ytdl.getInfo(content[0])
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                // if there no link, use keyword to search
                const video_finder = async (query) => {
                    const videoResult = await ytSearch(query)
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
                }
                const video = await video_finder(content.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send(`Không tìm được video 😞`)
                }
            }
            if (!serverQueue) {
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                queue.set(message.guild.id, queue_constructor)
                queue_constructor.songs.push(song)
                try {

                    const connection = await voice_channel.join()
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0])
                } catch (error) {
                    queue.delete(message.guild.id)
                    message.channel.send(`Lỗi kết nối 😵`)
                    throw error;
                }
            } else {
                serverQueue.songs.push(song)
                return message.channel.send(`👉 **${song.title}** đã được thêm vào danh sách phát!`)
            }
        } else if (command === 'skip') {
            console.log('hello');
            skipSong(message, serverQueue);
        } else if (command === 'stop') {
            stopSong(message, serverQueue);
        }


    }


}
const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id)
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id)
        return
    }
    const stream = ytdl(song.url, { filter: 'audioonly' })
    song_queue.connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
        song_queue.songs.shift()
        video_player(guild, song_queue.songs[0])
    })
    await song_queue.text_channel.send(`🎵 đang phát **${song.title}**`)
}
function skipSong(message, serverQueue) {
    if (!message.member.voice.channel) return message.channel.send('Phải vào voice channel mới phát nhạc được chứ ');
    if (!serverQueue) {
        return message.channel.send(`Không có bài các ở trong hàng đợi 😔`);
    }
    serverQueue.connection.dispatcher.end();
}
function stopSong(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send('Phải vào voice channel mới phát nhạc được chứ');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}



module.exports = {
    commandHandle
}