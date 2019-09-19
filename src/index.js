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
console.log(__dirname)
app.use('/static/pasta', express.static(__dirname + '/musics'));

const dir = path.join(__dirname, 'musics');
var music = '';
const dl = new Downloader();

//read all musics in directory
const allFilesSync = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file)

    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? { [file]: allFilesSync(filePath) }
        : file
    )
  })
  this.music = fileList;
  console.log(this.music)

}

//create stream in browser
const create = (name, data) => {
  if (fs.existsSync(name + '.json')) {
    const file = fs.readSync(name + '.json')
    return JSON.parse(file)
  }
  let nData = JSON.stringify(data)
  fs.writeFileSync(name + '.json', nData)
  return data
}
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
  const { name } = req.params
  //check if music is downloaded
  //if music is not downloaded start convert and download
  if (this.music.indexOf(`${req.params.name}.mp3`) === -1) {
    //get id and name for YT(using crawler)
    const dv = SearchVideos(req.params.name);
    dv.then(result => {
      console.log(result.newId)
      console.log('Download started')
      const dv = dl.getMP3({ videoId: result.newId, name: `${result.newName}.mp3` }, (err, response) => {
        console.log(response.title)
        let data = [response, { rota: 'stream/' + req.params.name }]
        const resposta = create(name, data)
        res.send({ resposta })
        //res.redirect(`/${result.newName}`)
        //exclude music before play (10s delay)
        //setInterval(() => {fs.unlinkSync(`${dir}\\${result.newName}.mp3`)}, 7000 );
      });

    })
    //if music is downloaded start stream
  } else {
    //stream
    return create(name, '')

  }
  //



});

app.get('/', (req, res) => {
  res.send('Digite o nome da musica após a barra /');
});
app.get('/stream/:name', (req, res) => {
  stream(req.params.name, res)
})




app.listen(process.env.PORT || 8081, () => console.log('App na porta 3000'));
