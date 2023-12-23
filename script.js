/*
code that i stole from the web
*/

// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "sine";
oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);


/*
my code >:)
*/

const body = document.body;

function key(event) {
    return event;
}
var iskeybeingpressed = false;


body.addEventListener("keydown", function keydown(event) {
    if (!iskeybeingpressed) {
    console.log(key(event.key));
    iskeybeingpressed = true;
    console.log(iskeybeingpressed);
    }
    if (iskeybeingpressed) {
    body.addEventListener("keyup", function(event2) {
        if(event.key === event2.key) {
            console.log("AA");
            iskeybeingpressed = false;
            console.log(iskeybeingpressed);
        }
    })}
});