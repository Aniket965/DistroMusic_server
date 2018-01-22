let song;
let amp;
function setup() {

  amp = new p5.Amplitude()
  song = loadSound('http://localhost:3000/assets/lol.mp3', () => {
    document.getElementById('playButton').addEventListener('click', () => togglePlaying())
    console.log('loaded')
  })
 let div = document.getElementById('sv')
 console.log(div.getAttribute('width'))
  var canvas = createCanvas(div.offsetWidth, div.offsetHeight);
 canvas.parent('sv');
 background(255, 0, 200);

}
function draw() {
    background(244, 248, 252);
rect(mouseX, mouseY,100, 100);
}
const togglePlaying = () => {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}