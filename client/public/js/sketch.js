let song
let fft
let ismute = false
let duration
let current_time
let left_time
let song_name
let playPercent
let songLoaded = false
function setup() {
  amp = new p5.Amplitude()

  document
    .getElementById('mute-toggle')
    .addEventListener('click', () => muteToggle())

  fft = new p5.FFT()
  w = width / 64
}
function draw() {
  var div = document.getElementById('sv')
  var canvas = createCanvas(div.offsetWidth, div.offsetHeight)
  canvas.parent('sv')
  if (songLoaded) {
    var spectrum = fft.analyze()
    noStroke()
    fill(255) // spectrum is green
    for (var i = 0; i < spectrum.length; i += 10) {
      var amp = spectrum[i]
      var y = map(amp, 0, 255, height, 0)
      rect(i * w, y, w, height - y)
      fill(255)
    }
    duration = song.duration()
    current_time = song.currentTime()
    left_time = current_time - duration
    playPercent = current_time / duration * 100
    var d1 = new Date(null)
    var d2 = new Date(null)
    d1.setSeconds(current_time) // specify value for SECONDS here
    // console.log(d1);
    d2.setSeconds(duration)
    document.getElementById('current_time').innerHTML = d1.toISOString().substr(11, 8)
    document.getElementById('left_time').innerHTML = d2.toISOString().substr(11, 8)
    document.getElementById('song_name').innerHTML = 'bom-diggi';

    // console.log(playPercent)

    document.getElementById('loader').style.width = `${Math.floor(playPercent)}%`
  }
}
const togglePlaying = () => {
  if (song.isPlaying()) {
    song.pause()
  } else {
    song.play()
    circle.setAttribute('class', 'play')
  }
}

$(document).ready(function () {
  var state = 'paused';
  $('#pause').on('click', function () {
    if (state == 'paused') {
      state = 'playing';
      $('#circle').attr('class', 'play')
      $('#from_pause_to_play')[0].beginElement()
    } else {
      state = 'paused';
      $('#circle').attr('class', '')
      $('#from_play_to_pause')[0].beginElement()
    }
  })
  $('#fileLoader').change(function (e) {
    var file = e.target.files[0];
    var stream = ss.createStream()
    // upload a file to the server.
    ss(socket).emit('file', stream, { size: file.size })
    var blobStream = ss.createBlobReadStream(file);
    var size = 0;

    blobStream.on('data', function(chunk) {
      size += chunk.length;
      if(Math.floor(size / file.size * 100) === 100) {
        console.log('done')
        ss(socket).emit('song',{});
      }
      // -> e.g. '42%'
    });

    blobStream.pipe(stream);
  })
  socket.on('loaded', () => {
    console.log()
    fetch('http://192.168.43.5:3000').then(()=>{
      song = loadSound('http://192.168.43.5:3000/assets/lol1.mp3', () => {
        document
          .getElementById('playButton')
          .addEventListener('click', () => togglePlaying())
        console.log('loaded')
        songLoaded = true
        song.play()
        angleMode(DEGREES)
  })
    }).catch((err)=>{
      if(err) {
        song = loadSound('http://localhost:3000/assets/lol1.mp3', () => {
          document
            .getElementById('playButton')
            .addEventListener('click', () => togglePlaying())
          console.log('loaded')
          songLoaded = true
          song.play()
          angleMode(DEGREES)
        })
      }
    })

  })
})

const muteToggle = () => {
  if (ismute) {
    document.getElementById('mute-toggle').innerHTML = 'volume_up';
    song.setVolume(1)
  } else {
    song.setVolume(0)
    document.getElementById('mute-toggle').innerHTML = 'volume_off';
  }
  ismute = !ismute
};
