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
    { letter: 'ㅇ', sound: 'audio/no_sound.mp3' }, // TODO: Better solution?
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
    { letter: 'ㅔ/ㅐ', sound: 'audio/complex_vowels/ae_or_e.mp3' },
    { letter: 'ㅖ/ㅒ', sound: 'audio/complex_vowels/yae_or_ye.mp3' }
];
let remainingSounds = [...sounds];


window.onload = () => {
    const buttonsDiv = document.getElementById('buttons');
    sounds.forEach(sound => {
        const button = document.createElement('button');
        button.innerText = sound.letter;
        button.onclick = () => checkAnswer(sound.letter, button);
        buttonsDiv.appendChild(button);
    });

    document.getElementById('startQuiz').onclick = initQuiz;
    document.getElementById('replaySound').onclick = replaySound;
};

function initQuiz(){
remainingSounds = [...sounds];
    currentLetter = "";
    currentAudio = "";
    correctCount = 0;
    wrongCount = 0;

    const buttonsDiv = document.getElementById('buttons');
    Array.from(buttonsDiv.children).forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
    });

    doTurn();
}

function doTurn() {
    if (remainingSounds.length === 0) {
        endQuiz();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingSounds.length);
    const chosenSound = remainingSounds.splice(randomIndex, 1)[0];
    currentLetter = chosenSound.letter;
    currentAudio = new Audio(chosenSound.sound);
    currentAudio.play();
}

function endQuiz() {
    alert('Quiz completed! Check your scores.');
    const buttonsDiv = document.getElementById('buttons');
    Array.from(buttonsDiv.children).forEach(button => {
        button.disabled = true;
    });
}

function replaySound() {
    if (currentAudio) {
        currentAudio.play();
    }
}

function checkAnswer(letter, button) {
    let correctButton = null;

    if (letter === currentLetter) {
        button.classList.add('correct');
        correctCount++;
        document.getElementById('correct').innerText = correctCount;
    } else {
        correctButton = Array.from(document.getElementById('buttons').children).find(btn => btn.innerText === currentLetter);
        correctButton.classList.add('incorrect');
        wrongCount++;
        document.getElementById('wrong').innerText = wrongCount;
    }

    setTimeout(() => {
        doTurn();
    }, 500);
}
