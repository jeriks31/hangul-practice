// You can populate this array with the paths to your audio files
const sounds = [
    { letter: 'ㄱ', sound: 'path_to_your_audio_file' },
    // Add more consonants and vowels here
];

window.onload = () => {
    const buttonsDiv = document.getElementById('buttons');
    sounds.forEach(sound => {
        const button = document.createElement('button');
        button.innerText = sound.letter;
        button.onclick = () => checkAnswer(sound.letter);
        buttonsDiv.appendChild(button);
    });

    document.getElementById('startQuiz').onclick = startQuiz;
};

function startQuiz() {
    // Logic to play a random sound and wait for the user to click a button
}

function checkAnswer(letter) {
    // Logic to check if the clicked button matches the played sound
}
