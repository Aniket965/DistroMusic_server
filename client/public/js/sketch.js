
let song;
let fft;
let ismute = false
let duration;
let current_time;
let left_time;
let song_name;
let playPercent;
function setup() {
  amp = new p5.Amplitude();
  song = loadSound("http://localhost:3000/assets/lol.mp3", () => {
    document
      .getElementById("playButton")
      .addEventListener("click", () => togglePlaying());
    console.log("loaded");
    song.play()
  });
  document.getElementById('mute-toggle')
  .addEventListener("click", () => muteToggle());
  
  fft = new p5.FFT();
  
  
  
}
function draw() {
  
  var div = document.getElementById("sv");
  var canvas = createCanvas(div.offsetWidth, div.offsetHeight);
  
  canvas.parent("sv");
  var spectrum = fft.analyze();
  noStroke();
  fill(255); // spectrum is green
  for (var i = 0; i< spectrum.length; i= i+20){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, 10, h )

    duration=song.duration();
   current_time= song.currentTime()
    left_time=current_time-duration;
    playPercent=(current_time/duration)*100;
    // var myElement = document.getElementById('load')
    // myElement.style.width = playPercent;
    //var myElement=$(load).width()
    //console.log(myElement);
    document.getElementById('current_time').innerHTML=parseFloat(current_time/60).toFixed(2)
    document.getElementById('left_time').innerHTML=parseFloat(left_time/60).toFixed(2)
    document.getElementById('song_name').innerHTML="lol";
    
  }
}
const togglePlaying = () => {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
    circle.setAttribute('class','play')
  }
};

$(document).ready(function() {
	var state = "paused";
	$('#pause').on('click', function() {
		if(state == 'paused') {
			state = "playing";
			$("#circle").attr("class", "play");
			$("#from_pause_to_play")[0].beginElement();
		} else {
			state = "paused";
			$("#circle").attr("class", "");
			$("#from_play_to_pause")[0].beginElement();
		}
	});
});

const muteToggle = () => {
if(ismute) {
  document.getElementById('mute-toggle').innerHTML ="volume_up"
  song.setVolume(1)
}else{
  song.setVolume(0)
    document.getElementById('mute-toggle').innerHTML ="volume_off"
}
ismute = !ismute
}


