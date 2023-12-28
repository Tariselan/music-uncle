/*
code that i stole from the web
*/

// create web audio api context
let audioCtx;

// Check for browser support
if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
    // Use standard AudioContext if available
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
} else {
    // Use webkitAudioContext for older browsers
    audioCtx = new webkitAudioContext();
}

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
const validNotes = ["a", "A", "b", "c", "C", "d", "D", "e", "f", "F", "g", "G"];
const validKeyBindsWaves = ["a", "s", "d", "f"];
const validWaves = ["sine", "square", "triangle", "sawtooth"];

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

const keyBindOctaves = new Map([
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
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
        document.getElementById(keyBindOctaves.get(octave.toString())).classList.remove("selected");
        let int = parseInt(event.key);
        octave = int;
        document.getElementById(keyBindOctaves.get(octave.toString())).classList.add("selected");
    };
    if (validKeyBindsWaves.includes(event.key)) {
        document.getElementById(wave).classList.remove("selected");
        wave = waveType[keyBindWaves.get(event.key)];
        document.getElementById(wave).classList.add("selected");
    }
});

(Array.from(document.getElementsByClassName("grid-item"))).forEach((element) => {
    if (validNotes.includes(element.id)) {
        element.addEventListener("click", function() {
            let frequency =  (noteMap.get(element.id)) * octaveMult(octave);
            let time = 150;
            pitch(frequency, time);
            document.getElementById(element.id).classList.add("selected");
            setTimeout(() => {
                document.getElementById(element.id).classList.remove("selected");
            }, time);
        })
    }
    if (validWaves.includes(element.id)) {
        element.addEventListener("click", function() {
            document.getElementById(wave).classList.remove("selected");
            wave = element.id;
            element.classList.add("selected");
        });

    } 
    if (validOctaves.includes(element.id)) {
        element.addEventListener("click", function() {
            document.getElementById(octave.toString()).classList.remove("selected");
            octave = parseInt(element.id);
            element.classList.add("selected");
            document.querySelectorAll(".octave").forEach(function(span) {
                span.innerText = octave;
            });
            document.querySelectorAll(".octave-plus").forEach(function(span) {
                span.innerText = octave +1;
            });
            // changing frequency values in html
            document.getElementById("a-freq").innerHTML = Math.round(noteMap.get("a") * octaveMult(octave));
            document.getElementById("A-freq").innerHTML = Math.round(noteMap.get("A") * octaveMult(octave));
            document.getElementById("b-freq").innerHTML = Math.round(noteMap.get("b") * octaveMult(octave));
            document.getElementById("c-freq").innerHTML = Math.round(noteMap.get("c") * octaveMult(octave));
            document.getElementById("C-freq").innerHTML = Math.round(noteMap.get("C") * octaveMult(octave));
            document.getElementById("d-freq").innerHTML = Math.round(noteMap.get("d") * octaveMult(octave));
            document.getElementById("D-freq").innerHTML = Math.round(noteMap.get("D") * octaveMult(octave));
            document.getElementById("e-freq").innerHTML = Math.round(noteMap.get("e") * octaveMult(octave));
            document.getElementById("f-freq").innerHTML = Math.round(noteMap.get("f") * octaveMult(octave));
            document.getElementById("F-freq").innerHTML = Math.round(noteMap.get("F") * octaveMult(octave));
            document.getElementById("g-freq").innerHTML = Math.round(noteMap.get("g") * octaveMult(octave));
            document.getElementById("G-freq").innerHTML = Math.round(noteMap.get("G") * octaveMult(octave));
        });
    } 
})


alert("Use the keys on the top row of your qwerty keyboard ('q' through to ']') to play the notes and to change the octave press the number of the respective octave")