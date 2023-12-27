/*
code that i stole from the web
*/

// create web audio api context
const audioCtx = new AudioContext();

/*
my code >:)
*/

function pitch(hertz, time) {
    let sound = audioCtx.createOscillator();
    sound.type = "sine";
    sound.frequency.setValueAtTime(hertz, audioCtx.currentTime);
    sound.connect(audioCtx.destination);
    sound.start();
    setTimeout(function() {sound.stop()}, time)
}

// note, altered form a = a natural and A = a sharp, 

const pitchConstant = Math.pow(2, (1/12)); // interval between semitones
const lowA = 55 // hz of low A

var octave = 1; 
const validOctaves = ["1","2","3","4","5","6"]
const validKeyBinds = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"]

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

const keyBind = new Map([
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
    ["]", "G"],
    
])


function splitString(input) {
    let split = [...input.toString()];
    return split;
}

function octaveMult(octave) {
    return 2**(octave-1); 
}

function parse(input) {
    let parsed = splitString(input);
    let frequency = noteMap.get(parsed[0]) * octaveMult(parsed[1]);
    pitch(frequency, 1000);
}


document.body.addEventListener("keypress", function(event) {
    if (validKeyBinds.includes(event.key)) {
        let frequency =  (noteMap.get(keyBind.get(event.key)) * octaveMult(octave));
        pitch(frequency, 100)
    };
    if (validOctaves.includes(event.key)){
        let int = parseInt(event.key);
        octave = int;
        console.log(octave)
    };
})