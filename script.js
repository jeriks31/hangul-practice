let currentLetter = "";
let currentAudio = "";
let correctCount = 0;
let wrongCount = 0;
let isRomanizationMode = false;

const letters = [
    { letter: 'ㄱ', sound: 'audio/consonants_with_a/g.mp3', romanization: 'g' },
    { letter: 'ㄴ', sound: 'audio/consonants_with_a/n.mp3', romanization: 'n' },
    { letter: 'ㄷ', sound: 'audio/consonants_with_a/d.mp3', romanization: 'd' },
    { letter: 'ㄹ', sound: 'audio/consonants_with_a/r.mp3', romanization: 'l/r' },
    { letter: 'ㅁ', sound: 'audio/consonants_with_a/m.mp3', romanization: 'm' },
    { letter: 'ㅂ', sound: 'audio/consonants_with_a/b.mp3', romanization: 'b' },
    { letter: 'ㅅ', sound: 'audio/consonants_with_a/s.mp3', romanization: 's' },
    { letter: 'ㅇ', sound: 'audio/no_sound.mp3', romanization: '-/ng' }, // TODO: Better solution?
    { letter: 'ㅈ', sound: 'audio/consonants_with_a/j.mp3', romanization: 'j' },
    { letter: 'ㅊ', sound: 'audio/consonants_with_a/ch.mp3', romanization: 'ch' },
    { letter: 'ㅋ', sound: 'audio/consonants_with_a/k.mp3', romanization: 'k' },
    { letter: 'ㅌ', sound: 'audio/consonants_with_a/t.mp3', romanization: 't' },
    { letter: 'ㅍ', sound: 'audio/consonants_with_a/p.mp3', romanization: 'p' },
    { letter: 'ㅎ', sound: 'audio/consonants_with_a/h.mp3', romanization: 'h' },
    { letter: 'ㅏ', sound: 'audio/simple_vowels/a.mp3', romanization: 'a' },
    { letter: 'ㅑ', sound: 'audio/simple_vowels/ya.mp3', romanization: 'ya' },
    { letter: 'ㅓ', sound: 'audio/simple_vowels/eo.mp3', romanization: 'eo' },
    { letter: 'ㅕ', sound: 'audio/simple_vowels/yeo.mp3', romanization: 'yeo' },
    { letter: 'ㅗ', sound: 'audio/simple_vowels/o.mp3', romanization: 'o' },
    { letter: 'ㅛ', sound: 'audio/simple_vowels/yo.mp3', romanization: 'yo' },
    { letter: 'ㅜ', sound: 'audio/simple_vowels/u.mp3', romanization: 'u' },
    { letter: 'ㅠ', sound: 'audio/simple_vowels/yu.mp3', romanization: 'yu' },
    { letter: 'ㅡ', sound: 'audio/simple_vowels/eu.mp3', romanization: 'eu' },
    { letter: 'ㅣ', sound: 'audio/simple_vowels/i.mp3', romanization: 'i' },
    { letter: 'ㅔ/ㅐ', sound: 'audio/complex_vowels/ae_or_e.mp3', romanization: 'ae/e' },
    { letter: 'ㅖ/ㅒ', sound: 'audio/complex_vowels/yae_or_ye.mp3', romanization: 'yae/ye' }
];

let remainingLetters = [...letters];
let currentQuestion = null;

window.onload = () => {
    document.getElementById('startQuiz').onclick = initQuiz;
    document.getElementById('replaySound').onclick = replaySound;
    document.getElementById('switchMode').onclick = switchMode;
    displayButtons();
};

function displayButtons() {
    const buttonsDiv = document.getElementById('buttons');
    buttonsDiv.innerHTML = '';
    
    const options = isRomanizationMode 
        ? letters.map(letter => letter.romanization).reverse()
        : letters.map(letter => letter.letter);

    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        if (currentQuestion) {
            button.onclick = () => checkAnswer(option, button);
        } else {
            button.disabled = true;
        }
        buttonsDiv.appendChild(button);
    });
}

function initQuiz() {
    remainingLetters = [...letters];
    currentQuestion = null;
    correctCount = 0;
    wrongCount = 0;
    document.getElementById('letter').innerHTML = '';
    doTurn();
    displayButtons();
}

function doTurn() {
    if (remainingLetters.length === 0) {
        endQuiz();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingLetters.length);
    currentQuestion = remainingLetters.splice(randomIndex, 1)[0];
    
    if (isRomanizationMode) {
        document.getElementById('letter').innerHTML = currentQuestion.letter;
    } else {
        document.getElementById('letter').innerHTML = '';
        currentAudio = new Audio(currentQuestion.sound);
        currentAudio.play();
    }
}

function checkAnswer(answer, button) {
    const correctAnswer = isRomanizationMode 
        ? currentQuestion.romanization 
        : currentQuestion.letter;
    
    const correctButton = Array.from(document.getElementById('buttons').children)
        .find(btn => btn.innerText === correctAnswer);

    if (answer === correctAnswer) {
        button.classList.add('correct');
        correctCount++;
        document.getElementById('correct').innerText = correctCount;
    } else {
        correctButton.classList.add('incorrect');
        wrongCount++;
        document.getElementById('wrong').innerText = wrongCount;
    }

    setTimeout(() => {
        Array.from(document.getElementById('buttons').children)
            .forEach(btn => btn.classList.remove('correct', 'incorrect'));
        doTurn();
    }, 500);
}

function switchMode() {
    isRomanizationMode = !isRomanizationMode;
    displayButtons();
}

function replaySound() {
    if (currentAudio) {
        currentAudio.play();
    }
}

function endQuiz() {
    alert('Quiz completed! Check your scores.');
    const buttonsDiv = document.getElementById('buttons');
    Array.from(buttonsDiv.children).forEach(button => {
        button.disabled = true;
    });
}
