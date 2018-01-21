let song;
let amp;
function setup() {

  amp = new p5.Amplitude()
  song = loadSound('http://localhost:3000/assets/lol.mp3', () => {
    document.getElementById('playButton').addEventListener('click', () => togglePlaying())
    console.log('loaded')
  })

}
function draw() {

}
const togglePlaying = () => {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}