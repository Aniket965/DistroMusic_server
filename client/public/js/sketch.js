let song;
let fft;
function setup() {
  amp = new p5.Amplitude();
  song = loadSound("http://localhost:3000/assets/lol.mp3", () => {
    document
      .getElementById("playButton")
      .addEventListener("click", () => togglePlaying());
    console.log("loaded");
  });
  fft = new p5.FFT();
  let div = document.getElementById("sv");
  var canvas = createCanvas(div.offsetWidth, div.offsetHeight);
  canvas.parent("sv");
  background(15, 32, 50);
}
function draw() {
  background(15, 32, 50);
  var spectrum = fft.analyze();
  noStroke();
  fill(255); // spectrum is green
  for (var i = 0; i< spectrum.length; i= i+20){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, 10, h )
  }
}
const togglePlaying = () => {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
};
