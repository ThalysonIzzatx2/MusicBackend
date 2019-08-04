const axios = require('axios')
const cheerio = require('cheerio')
const Downloader = require('./Down');

const links =[];
const dl = new Downloader();


const removerAcentos = (s) => {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

const LeanResponse = (html) => {
    let $ = cheerio.load(html)
    let test = 0;
    return $('.yt-lockup-content').map((index, element) => {
        if(test === 0) {
            this.links = ($(element).find('.yt-uix-tile-link').attr('href'))
        }
        test++;
        console.log($(element).find('.yt-uix-tile-link').attr('href'))

    })
    
}
const SearchVideos = async (name) => {

    const newName = removerAcentos(name);

    const response = await axios({ url: `https://www.youtube.com/results?search_query=${newName}`, method: 'get' })
    const objectReturn = await LeanResponse(response.data)
    const id = await this.links;
    const newId = id.split('=');
    console.log('Newid: '+ newId)
    console.log('newName: '+ newName)
    const data = { 
        newId: newId[1],
        newName:newName
    }
    return data;
  
}


module.exports = SearchVideos;
