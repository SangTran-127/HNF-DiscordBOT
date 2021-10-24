const axios = require('axios')



async function tenorGifApi(keyword) {
    let limitGif = 10;
    let url = `https://g.tenor.com/v1/search?q=${keyword}&key=${process.env.TENOR_KEY}&limit=${limitGif}`
    try {
        const index = Math.floor(Math.random() * limitGif);
        console.log(index);
        const response = await axios.get(url)
        return response.data.results[index].url
    } catch (error) {
        console.log(error.message)
        return `không có (do CODE của tui hoặc API có vấn đề rồi)`;
    }
}
module.exports = { tenorGifApi }