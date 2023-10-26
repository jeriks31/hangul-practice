let currentLetter = "";
let currentAudio = "";
let correctCount = 0;
let wrongCount = 0;

const sounds = [
    { letter: 'ㄱ', sound: 'audio/consonants_with_a/g.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㄴ', sound: 'audio/consonants_with_a/n.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㄷ', sound: 'audio/consonants_with_a/d.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㄹ', sound: 'audio/consonants_with_a/r.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅁ', sound: 'audio/consonants_with_a/m.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅂ', sound: 'audio/consonants_with_a/b.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅅ', sound: 'audio/consonants_with_a/s.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅇ', sound: 'audio/no_sound.mp3', correct: 0, incorrect: 0 }, // TODO: Better solution?
    { letter: 'ㅈ', sound: 'audio/consonants_with_a/j.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅊ', sound: 'audio/consonants_with_a/ch.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅋ', sound: 'audio/consonants_with_a/k.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅌ', sound: 'audio/consonants_with_a/t.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅍ', sound: 'audio/consonants_with_a/p.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅎ', sound: 'audio/consonants_with_a/h.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅏ', sound: 'audio/simple_vowels/a.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅑ', sound: 'audio/simple_vowels/ya.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅓ', sound: 'audio/simple_vowels/eo.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅕ', sound: 'audio/simple_vowels/yeo.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅗ', sound: 'audio/simple_vowels/o.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅛ', sound: 'audio/simple_vowels/yo.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅜ', sound: 'audio/simple_vowels/u.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅠ', sound: 'audio/simple_vowels/yu.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅡ', sound: 'audio/simple_vowels/eu.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅣ', sound: 'audio/simple_vowels/i.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅔ/ㅐ', sound: 'audio/complex_vowels/ae_or_e.mp3', correct: 0, incorrect: 0 },
    { letter: 'ㅖ/ㅒ', sound: 'audio/complex_vowels/yae_or_ye.mp3', correct: 0, incorrect: 0 }
];

window.onload = () => {
    const buttonsDiv = document.getElementById('buttons');
    sounds.forEach(sound => {
        const button = document.createElement('button');
        button.innerText = sound.letter;
        button.onclick = () => checkAnswer(sound.letter, button);
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

function updateScores() {
    const scoresTbody = document.getElementById('individualScores').getElementsByTagName('tbody')[0];
    scoresTbody.innerHTML = ''; // Clear previous scores

    sounds.forEach(sound => {
        const totalAttempts = sound.correct + sound.incorrect;
        const percentageCorrect = totalAttempts > 0 ? (sound.correct / totalAttempts * 100).toFixed(2) : 0;

        const row = scoresTbody.insertRow();
        row.insertCell().innerText = sound.letter;
        row.insertCell().innerText = sound.correct;
        row.insertCell().innerText = sound.incorrect;
        row.insertCell().innerText = `${percentageCorrect}%`;
    });
}

function checkAnswer(letter, button) {
    let correctButton = null;
    const soundObj = sounds.find(sound => sound.letter === letter);

    if (letter === currentLetter) {
        button.classList.add('correct');
        correctCount++;
        document.getElementById('correct').innerText = correctCount;
        soundObj.correct++;
    } else {
        button.classList.add('incorrect');
        wrongCount++;
        document.getElementById('wrong').innerText = wrongCount;
        soundObj.incorrect++;

        // Highlight correct button
        correctButton = Array.from(document.getElementById('buttons').children).find(btn => btn.innerText === currentLetter);
        correctButton.classList.add('correct');
    }

    updateScores();

    setTimeout(() => {
        button.classList.remove('correct', 'incorrect');
        correctButton?.classList.remove('correct');
        startQuiz(); // Start the next question
    }, 1000); // Wait 1 second before starting the next question
}
