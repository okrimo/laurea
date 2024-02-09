const questions = [
    {
      question: "Dove si trova la zecca di stato in Puglia?",
      options: ["Maglie", "Copertino", "Foggia", "Bisceglie"],
      answer: "Foggia"
    },
    {
      question: "Quale la capitale del Montenegro?",
      options: ["Ribnica", "Podgorica", "Moraca", "Zeta-Skadar"],
      answer: "Podgorica"
    },
    {
      question: "Quanto dista Tirana da Bari?",
      options: ["270km", "3km più lunghi del mondo", "135km", "400km"],
      answer: "270km"
    },
    {
      question: "Quale artista è nato a Vienna?",
      options: ["Mozart", "Hegel", "Gaudì", "Enzo Fiore"],
      answer: "Mozart"
    },
    {
      question: "Se Parigi avesse il mare, sarebbe una piccola..",
      options: ["Roma", "Casamassella", "Bari", "Trani"],
      answer: "Bari"
    }
  ];

  
  let currentQuestion = 0;
  let score = 0;
  
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options-container');
  const feedbackElement = document.getElementById('feedback');
  const submitButton = document.getElementById('submit-btn');
  const videoContainer = document.getElementById('video-container');
  const confettiContainer = document.getElementById('confetti');
  
  function displayQuestion() {
    const currentQ = questions[currentQuestion];
    questionElement.textContent = currentQ.question;
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = option;
      button.addEventListener('click', () => {
        checkAnswer(option);
        showCorrectAnswer(currentQ.answer);
      });
      optionsContainer.appendChild(button);
    });
    feedbackElement.textContent = '';
  }
  
  function showCorrectAnswer(correctAnswer) {
    optionsContainer.childNodes.forEach((button) => {
      if (button.textContent === correctAnswer) {
        button.classList.add('correct-answer');
      }
    });
  }
  
  
  function checkAnswer(option) {
    const currentQ = questions[currentQuestion];
    if (option === currentQ.answer) {
      feedbackElement.textContent = 'Risposta corretta!';
      score++;
      setTimeout(showConfetti, 500); // Aggiungi un ritardo di 500ms prima di chiamare showConfetti()
    } else {
      feedbackElement.textContent = 'Risposta sbagliata. La risposta corretta è ' + currentQ.answer;
      optionsContainer.classList.add('flash-red');
      setTimeout(() => {
        optionsContainer.classList.remove('flash-red');
      }, 500);
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showResult();
    }
  }
  
  function showConfetti() {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.setProperty('--random', Math.random()); // Genera una posizione casuale
      confetti.style.animationDuration = Math.random() * 3 + 1 + 's'; // Durata casuale tra 1 e 4 secondi
      confettiContainer.appendChild(confetti);
    }
    setTimeout(() => {
      confettiContainer.innerHTML = '';
    }, 4000); // Pulisce i confetti dopo 4 secondi
  }
  
  
  function showResult() {
    const percentage = (score / questions.length) * 100;
    feedbackElement.textContent = 'Hai ottenuto ' + score + ' su ' + questions.length + ' (' + percentage + '%)';
    if (percentage >= 50) {
      videoContainer.style.display = 'block'; // Mostra il video se il punteggio è maggiore o uguale al 50%
    }
}

document.getElementById('start-video-btn').addEventListener('click', function() {
  var videoContainer = document.getElementById('video-container');
  var video = document.getElementById('videoPlayer');
  
  // Mostra il container del video
  videoContainer.style.display = 'block';
  
  // Avvia la riproduzione del video
  video.play();
});

  function displayFinalPage() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('final-page').style.display = 'block';
  }
  
  function showResult() {
    const percentage = (score / questions.length) * 100;
    feedbackElement.textContent = 'Hai ottenuto ' + score + ' su ' + questions.length + ' (' + percentage + '%)';
    if (percentage >= 50) {
      videoContainer.style.display = 'block';
    } else {
      displayFinalPage(); // Se il punteggio è inferiore al 50%, mostra direttamente la pagina finale
    }
  }
  
  submitButton.addEventListener('click', () => {
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showResult();
    }
  });
  

  
  
  submitButton.addEventListener('click', () => {
    displayQuestion();
  });
  

  document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    displayQuestion(); // Avvia il quiz mostrando la prima domanda
  });
