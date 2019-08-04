var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const path = require('path');
var Downloader = function() {

    var self = this;
    
    //Configure YoutubeMp3Downloader with your settings
    const filePath = path.resolve(__dirname, '..', 'musics');
    const fileFf = path.resolve(__dirname, '..', '..', 'ffmpeg');
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": '/app/vendor/ffmpeg/ffmpeg',        // Where is the FFmpeg binary located?
        "outputPath": filePath,    // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",       // What video quality should be used?
        "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
        "progressTimeout": 2000,                // How long should be the interval of the progress reports
        "outputOptions" : ["-af", "silenceremove=1:0:-50dB"] // Additional output options passend to ffmpeg
    });

    self.callbacks = {};

    self.YD.on("finished", function(error, data) {
		
        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error in finish");
        }
    
    });

    self.YD.on("progress", function(progress) {
        console.log(JSON.stringify(progress.progress.percentage));
    });

    self.YD.on("error", function(error, data) {
	
        console.log(error + " on videoId " + data.videoId);
    
        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }
     
    });

};

Downloader.prototype.getMP3 = function(track, callback){

    var self = this;
	
    // Register callback
    self.callbacks[track.videoId] = callback;
    // Trigger download
    self.YD.download(track.videoId, track.name);

};

module.exports = Downloader;
