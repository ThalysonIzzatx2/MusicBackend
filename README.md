<h1 align='center'>InstMusic - Backend</h1>

<ul>
  <li><h3>Descrição:</h3>
    <ul><li>Pequeno projeto que utiliza tanto de nodejs para criar um stream de áudio, quanto de ffmpeg para converter o vídeo selecionado em áudio.</li><li><strong>Obs:</strong>É possivel utilizar para downloads das musicas, que nesse casa era uma necessidade minha no momento hehe :D</li></ul>
  </li>
  <li><h3>Rotas:</h3>
  <ol>
    <li><strong>/nomedamusica :</strong> Retorna um json contendo informações sobre a musica e um link para o mp3</li>
    <li><strong>/stream/nomedamusica :</strong> Começa a stream do arquivo de audio, retorne para seu play de audio</li>
    <li><strong>/static/pasta/nomedamusica.mp3 :</strong> Retorna o arquivo de audio(se ele existir) da pasta static</li>
  </ol>
  </li>
  <li><h3>Instalação:</h3>
    <ol>
      <li>git clone https://github.com/ThalysonIzzatx2/MusicBackend</li>
      <li>baixe o <a href="https://ffmpeg.org/download.html" title="ffmpeg">ffmpeg</a></li>
      <li><strong>npm install</strong> na pasta do projeto</li>
      <li><strong>npm start</strong> na pasta do proejeto</li>
      <li>acesse no navegador digitando <strong>localhost:8081</trong></li>
    </ol>
  </li>
  <li><h3>Aplicação em produção:</h3><a href="https://instmusic.herokuapp.com/" title="link for test">InstMusic</a></li>
</ul>


