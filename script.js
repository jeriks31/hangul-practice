let currentLetter = "";
let currentAudio = "";
let correctCount = 0;
let wrongCount = 0;

const sounds = [
    { letter: 'ㄱ', sound: 'audio/consonants_with_a/g.mp3' },
    { letter: 'ㄴ', sound: 'audio/consonants_with_a/n.mp3' },
    { letter: 'ㄷ', sound: 'audio/consonants_with_a/d.mp3' },
    { letter: 'ㄹ', sound: 'audio/consonants_with_a/r.mp3' },
    { letter: 'ㅁ', sound: 'audio/consonants_with_a/m.mp3' },
    { letter: 'ㅂ', sound: 'audio/consonants_with_a/b.mp3' },
    { letter: 'ㅅ', sound: 'audio/consonants_with_a/s.mp3' },
    { letter: 'ㅇ', sound: 'audio/consonants_with_a/ng.mp3' },
    { letter: 'ㅈ', sound: 'audio/consonants_with_a/j.mp3' },
    { letter: 'ㅊ', sound: 'audio/consonants_with_a/ch.mp3' },
    { letter: 'ㅋ', sound: 'audio/consonants_with_a/k.mp3' },
    { letter: 'ㅌ', sound: 'audio/consonants_with_a/t.mp3' },
    { letter: 'ㅍ', sound: 'audio/consonants_with_a/p.mp3' },
    { letter: 'ㅎ', sound: 'audio/consonants_with_a/h.mp3' },
    { letter: 'ㅏ', sound: 'audio/simple_vowels/a.mp3' },
    { letter: 'ㅑ', sound: 'audio/simple_vowels/ya.mp3' },
    { letter: 'ㅓ', sound: 'audio/simple_vowels/eo.mp3' },
    { letter: 'ㅕ', sound: 'audio/simple_vowels/yeo.mp3' },
    { letter: 'ㅗ', sound: 'audio/simple_vowels/o.mp3' },
    { letter: 'ㅛ', sound: 'audio/simple_vowels/yo.mp3' },
    { letter: 'ㅜ', sound: 'audio/simple_vowels/u.mp3' },
    { letter: 'ㅠ', sound: 'audio/simple_vowels/yu.mp3' },
    { letter: 'ㅡ', sound: 'audio/simple_vowels/eu.mp3' },
    { letter: 'ㅣ', sound: 'audio/simple_vowels/i.mp3' },
    { letter: 'ㅔ', sound: 'audio/complex_vowels/e.mp3' },
    { letter: 'ㅐ', sound: 'audio/complex_vowels/ae.mp3' },
    { letter: 'ㅖ', sound: 'audio/complex_vowels/ye.mp3' },
    { letter: 'ㅒ', sound: 'audio/complex_vowels/yae.mp3' }
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
    document.getElementById('replaySound').onclick = replaySound;
};

function startQuiz() {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const chosenSound = sounds[randomIndex];
    currentLetter = chosenSound.letter;

    const audio = new Audio(chosenSound.sound);
    currentAudio = audio;
    audio.play();
}

function replaySound() {
    if (currentAudio) {
        currentAudio.play();
    }
}

function checkAnswer(letter) {
    if (letter === currentLetter) {
        correctCount++;
        document.getElementById('correct').innerText = correctCount;
    } else {
        wrongCount++;
        document.getElementById('wrong').innerText = wrongCount;
    }
    startQuiz(); // Start the next question
}
