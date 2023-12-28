/*
code that i stole from the web
*/

// create web audio api context
const audioCtx = new AudioContext();

/*
my code >:)
*/
const waveType = ["sine", "square", "triangle", "sawtooth"];
var wave = waveType[0];

function pitch(hertz, time) {
    let sound = audioCtx.createOscillator();
    sound.type = wave;
    sound.frequency.setValueAtTime(hertz, audioCtx.currentTime);
    sound.connect(audioCtx.destination);
    sound.start();
    setTimeout(function() {
        sound.stop()
    }, time);
}

// note, altered form a = a natural and A = a sharp, 

const pitchConstant = Math.pow(2, (1/12)); // interval between semitones
const lowA = 55 // hz of low A

var octave = 4; 
const validOctaves = ["1","2","3","4","5","6", "7", "8", "9"];
const validKeyBindsNotes = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
const validKeyBindsWaves = ["a", "s", "d", "f"];

const noteMap = new Map([
    ["a", lowA],
    ["A", lowA*(pitchConstant)],
    ["b", lowA*(pitchConstant**2)],
    ["c", lowA*(pitchConstant**3)],
    ["C", lowA*(pitchConstant**4)],
    ["d", lowA*(pitchConstant**5)],
    ["D", lowA*(pitchConstant**6)],
    ["e", lowA*(pitchConstant**7)],
    ["f", lowA*(pitchConstant**8)],
    ["F", lowA*(pitchConstant**9)],
    ["g", lowA*(pitchConstant**10)],
    ["G", lowA*(pitchConstant**11)]
])

const keyBindNotes = new Map([
    ["q", "a"],
    ["w", "A"],
    ["e", "b"],
    ["r", "c"],
    ["t", "C"],
    ["y", "d"],
    ["u", "D"],
    ["i", "e"],
    ["o", "f"],
    ["p", "F"],
    ["[", "g"],
    ["]", "G"]    
])

const keyBindWaves = new Map([
    ["a", 0],
    ["s", 1],
    ["d", 2],
    ["f", 3]
])

function octaveMult(octave) {
    return 2**(octave-1); 
}



document.body.addEventListener("keypress", function(event) {
    if (validKeyBindsNotes.includes(event.key)) {
        let frequency =  (noteMap.get(keyBindNotes.get(event.key)) * octaveMult(octave));
        let time = 150;
        pitch(frequency, time);
        document.getElementById(keyBindNotes.get(event.key)).classList.add("selected");
        setTimeout(() => {
            document.getElementById(keyBindNotes.get(event.key)).classList.remove("selected");
        }, time);
    };
    if (validOctaves.includes(event.key)){
        let int = parseInt(event.key);
        octave = int;
    };
    if (validKeyBindsWaves.includes(event.key)) {
        wave = waveType[keyBindWaves.get(event.key)];
    }
})