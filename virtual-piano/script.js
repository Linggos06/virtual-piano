const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btn_notes = document.querySelector('.btn-notes');
const btn_letters = document.querySelector('.btn-letters');
const fullScreen = document.querySelector('.fullscreen');


window.addEventListener('mousedown', handleMouseDown, false);
window.addEventListener('mouseup', handleMouseUp);

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

btn_notes.addEventListener('click', handleChange);
btn_letters.addEventListener('click', handleChange);

fullScreen.addEventListener('click', handleFullScreen);


function handleMouseDown(event) {
    if (event.target.classList.contains('piano-key')) {

        event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
        playAudio(event);
    }

    pianoKeys.forEach(key => {
        key.addEventListener('mouseover', playAudio);
        key.addEventListener('mouseout', stopAudio);
    })
}

function handleMouseUp() {

    pianoKeys.forEach(key => {
        key.classList.remove('piano-key-active', 'piano-key-active-pseudo');
        key.removeEventListener('mouseover', playAudio);
        key.removeEventListener('mouseout', stopAudio);
    })
}

function handleKeyDown(event) {
    if (event.repeat) return;

    const button = document.querySelector(`[data-letter="${event.code.substring(3)}"]`);
    button.classList.add('piano-key-active', 'piano-key-active-pseudo');
    
    const audio = new Audio();
    audio.src = `./assets/audio/${button.dataset.note}.mp3`;
    audio.currentTime = 0;
    audio.play();
}


function handleKeyUp(event) {
    const button = document.querySelector(`[data-letter="${event.code.substring(3)}"]`);
    button.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}


function handleChange(event) {

    if (event.target.classList.contains('btn-letters')) {
        btn_letters.classList.add('btn-active');
        btn_notes.classList.remove('btn-active');
        pianoKeys.forEach(button => {
            button.classList.add('piano-key-letter')
        })
    }

    if (event.target.classList.contains('btn-notes')) {
        btn_notes.classList.add('btn-active');
        btn_letters.classList.remove('btn-active');
        pianoKeys.forEach(button => {
            button.classList.remove('piano-key-letter')

        })
    }
}

function handleFullScreen(event){
    
    if(event.target.classList.contains('openfullscreen')){
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
    
        }
    }
     
}
}

function playAudio(event) {
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');

    const audio = new Audio();
    audio.src = `./assets/audio/${event.target.dataset.note}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

function stopAudio(event) {
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}
