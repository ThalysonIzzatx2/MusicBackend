const express = require('express');
const SearchVideos = require('./components/Crawler');
const Downloader = require('./components/Down');
const path = require('path');
const fs = require('fs')
const getStat = require('util').promisify(fs.stat);
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') require('custom-env').env();
const app = express()
app.use(cors());

const dir = path.join(__dirname, 'musics');
var music =  '';
const dl = new Downloader();

//read all musics in directory
const allFilesSync = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file)

      fileList.push(
        fs.statSync(filePath).isDirectory()
          ? {[file]: allFilesSync(filePath)}
          : file
      )
    })
    this.music = fileList;
    console.log(this.music)
    
  }

//create stream in browser
const exclude = async (name) => {
  fs.unlinkSync(`${direct}/${name}.mp3`)
}
const stream = async (name, res) => {
  const filePath = await path.resolve(__dirname, 'musics', this.music[this.music.indexOf(`${name}.mp3`)]);
    const stat = await getStat(filePath);
    console.log(stat)
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath);

    stream.on('end', () => console.log('Start music in 5 seconds'));
    stream.pipe(res)
}

//rota
app.get('/:name', (req, res) => {
    allFilesSync(dir)
  //download
    //check if music is downloaded
    //if music is not downloaded start convert and download
    if(this.music.indexOf(`${req.params.name}.mp3`) === -1) {
      //get id and name for YT(using crawler)
      const dv = SearchVideos(req.params.name);
      dv.then(result => {
        console.log('Download started')
        const dv = dl.getMP3({videoId: result.newId, name: `${result.newName}.mp3`},(err,response) =>{
          console.log(response.title)
          res.redirect(`/${result.newName}`)
          //exclude music before play (10s delay)
         setInterval(() => {fs.unlinkSync(`${dir}\\${result.newName}.mp3`)}, 10000 );
      });
      
      })
    //if music is downloaded start stream
    } else {
        //stream
      stream(req.params.name, res) 
    }
    //
    
    
  
  });
    
    


app.listen(process.env.PORT || 8081, () => console.log('App na porta 3000'));
