// Sélection des éléments pour la section des questions
const questionInput = document.getElementById('question-input');
const submitQuestion = document.getElementById('submit-question');
const questionList = document.getElementById('question-list');

// Fonction pour ajouter une question avec réactions et réponses
function addQuestion() {
  const questionText = questionInput.value.trim();

  if (questionText === '') {
    alert('Veuillez poser une question avant de l\'envoyer.');
    return;
  }

  // Créer un nouvel élément de question
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');

  // Ajouter le texte de la question
  const questionContent = document.createElement('p');
  questionContent.classList.add('question-text');
  questionContent.textContent = questionText;

  // Ajouter l'auteur (optionnel)
  const questionAuthor = document.createElement('p');
  questionAuthor.classList.add('question-author');
  questionAuthor.textContent = 'Par Utilisateur'; // Remplacez par un système d'authentification si nécessaire

  // Ajouter les boutons d'action
  const questionActions = document.createElement('div');
  questionActions.classList.add('question-actions');

  // Bouton Supprimer
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-question');
  deleteButton.textContent = 'Supprimer';
  deleteButton.addEventListener('click', () => {
    questionList.removeChild(questionDiv); // Supprimer la question
    saveQuestions(); // Mettre à jour localStorage après suppression
  });

  // Bouton Répondre
  const replyButton = document.createElement('button');
  replyButton.classList.add('reply-button');
  replyButton.textContent = 'Répondre';
  replyButton.addEventListener('click', () => {
    const replyText = prompt('Entrez votre réponse:');
    if (replyText && replyText.trim() !== '') {
      const replyDiv = createReply(replyText);
      questionDiv.appendChild(replyDiv);
      saveQuestions();
    }
  });

  // Ajouter les boutons de réaction
  const reactionButtons = createReactionButtons();
  questionDiv.appendChild(reactionButtons);

  // Ajouter les éléments à la question
  questionActions.appendChild(deleteButton);
  questionActions.appendChild(replyButton);

  questionDiv.appendChild(questionContent);
  questionDiv.appendChild(questionAuthor);
  questionDiv.appendChild(questionActions);

  // Ajouter la question à la liste
  questionList.appendChild(questionDiv);

  // Effacer le champ de texte
  questionInput.value = '';

  // Sauvegarder les questions dans localStorage
  saveQuestions();
}

// Fonction pour créer une réponse
function createReply(replyText) {
  const replyDiv = document.createElement('div');
  replyDiv.classList.add('reply');

  const replyContent = document.createElement('p');
  replyContent.classList.add('reply-text');
  replyContent.textContent = replyText;

  replyDiv.appendChild(replyContent);
  return replyDiv;
}

// Fonction pour créer les boutons de réaction
function createReactionButtons() {
  const reactionContainer = document.createElement('div');
  reactionContainer.classList.add('reaction-buttons');

  const reactions = [
    { name: 'Like', icon: '👍' },
    { name: 'Love', icon: '❤️' },
    { name: 'Wow', icon: '🤩' },
    { name: 'Haha', icon: '😂' },
    { name: 'Sad', icon: '😢' },
    { name: 'Angry', icon: '😠' }
  ];

  reactions.forEach(reaction => {
    const button = document.createElement('button');
    button.classList.add('reaction-button');
    button.dataset.reaction = reaction.name; // Store reaction name in data attribute
    button.textContent = reaction.icon;

    // Add click event to toggle reaction
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      reactionContainer.querySelectorAll('.reaction-button').forEach(btn => {
        btn.classList.remove('active');
      });

      // Add active class to clicked button
      button.classList.add('active');

      // Save reactions to localStorage
      saveQuestions();
    });

    reactionContainer.appendChild(button);
  });

  return reactionContainer;
}

// Fonction pour sauvegarder les questions dans localStorage
function saveQuestions() {
  const questions = [];
  document.querySelectorAll('.question').forEach(question => {
    const questionData = {};
    questionData.text = question.querySelector('.question-text').textContent;

    // Collecter les réponses
    questionData.replies = [];
    question.querySelectorAll('.reply-text').forEach(reply => {
      questionData.replies.push(reply.textContent);
    });

    // Collecter la réaction
    const activeReaction = question.querySelector('.reaction-button.active');
    questionData.reaction = activeReaction ? activeReaction.dataset.reaction : null;

    questions.push(questionData);
  });
  localStorage.setItem('questions', JSON.stringify(questions));
}

// Fonction pour charger les questions depuis localStorage
function loadQuestions() {
  const questions = JSON.parse(localStorage.getItem('questions')) || [];
  questions.forEach(questionData => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionContent = document.createElement('p');
    questionContent.classList.add('question-text');
    questionContent.textContent = questionData.text;

    const questionAuthor = document.createElement('p');
    questionAuthor.classList.add('question-author');
    questionAuthor.textContent = 'Par Utilisateur';

    const questionActions = document.createElement('div');
    questionActions.classList.add('question-actions');

    // Bouton Supprimer
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-question');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => {
      questionList.removeChild(questionDiv);
      saveQuestions();
    });

    // Bouton Répondre
    const replyButton = document.createElement('button');
    replyButton.classList.add('reply-button');
    replyButton.textContent = 'Répondre';
    replyButton.addEventListener('click', () => {
      const replyText = prompt('Entrez votre réponse:');
      if (replyText && replyText.trim() !== '') {
        const replyDiv = createReply(replyText);
        questionDiv.appendChild(replyDiv);
        saveQuestions();
      }
    });

    // Ajouter les réponses existantes
    questionData.replies.forEach(replyText => {
      const replyDiv = createReply(replyText);
      questionDiv.appendChild(replyDiv);
    });

    // Ajouter les boutons de réaction
    const reactionButtons = createReactionButtons();
    if (questionData.reaction) {
      const activeButton = reactionButtons.querySelector(`[data-reaction="${questionData.reaction}"]`);
      if (activeButton) {
        activeButton.classList.add('active');
      }
    }
    questionDiv.appendChild(reactionButtons);

    // Ajouter les éléments à la question
    questionActions.appendChild(deleteButton);
    questionActions.appendChild(replyButton);

    questionDiv.appendChild(questionContent);
    questionDiv.appendChild(questionAuthor);
    questionDiv.appendChild(questionActions);

    // Ajouter la question à la liste
    questionList.appendChild(questionDiv);
  });
}

// Charger les questions au chargement de la page
window.addEventListener('load', loadQuestions);

// Écouter le clic sur le bouton "Envoyer"
submitQuestion.addEventListener('click', addQuestion);

// Écouter la touche "Entrée" dans le champ de texte
questionInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addQuestion();
  }
});




// Variable pour suivre l'état actuel
let isExpanded = false;
let currentExpandedCard = null;

// Fonction pour mettre en avant un article
function expandArticle(card) {
  const postCards = document.querySelectorAll('.post-card');

  postCards.forEach(c => {
    if (c === card) {
      c.classList.add('expanded'); // Ajouter la classe "expanded"
      c.style.display = 'block';
    } else {
      c.style.display = 'none';
    }
  });

  isExpanded = true;
  currentExpandedCard = card;
}

function resetArticles() {
  const postCards = document.querySelectorAll('.post-card');

  postCards.forEach(c => {
    c.style.display = 'block';
    c.classList.remove('expanded'); // Retirer la classe "expanded"
  });

  isExpanded = false;
  currentExpandedCard = null;
}

// Ajouter un écouteur de clic sur chaque carte
document.querySelectorAll('.post-card').forEach(card => {
  card.addEventListener('click', () => {
    if (!isExpanded) {
      // Si aucun article n'est étendu, mettre en avant cet article
      expandArticle(card);
    } else if (currentExpandedCard === card) {
      // Si l'article étendu est cliqué à nouveau, revenir à l'état normal
      resetArticles();
    }
  });
});

// Function to toggle "Lire la suite"
function toggleReadMore(link) {
  event.preventDefault();
  event.stopPropagation(); // Stop the event from propagating to the parent .post-card

  const postCard = link.closest('.post-card');
  const shortText = postCard.querySelector('.short-text');
  const fullText = postCard.querySelector('.full-text');

  if (fullText.style.display === 'none') {
    fullText.style.display = 'block';
    shortText.style.display = 'none';
    link.textContent = 'Lire moins';
  } else {
    fullText.style.display = 'none';
    shortText.style.display = 'block';
    link.textContent = 'Lire la suite';
  }
}