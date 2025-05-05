// Sélection des éléments
const commentInput = document.getElementById('comment-input');
const submitComment = document.getElementById('submit-comment');
const commentList = document.getElementById('comment-list');

// Fonction pour ajouter un commentaire
function addComment() {
  const commentText = commentInput.value.trim();

  if (commentText === '') {
    alert('Veuillez écrire un commentaire avant de l\'envoyer.');
    return;
  }

  // Créer un nouvel élément de commentaire
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');

  // Ajouter le texte du commentaire
  const commentContent = document.createElement('p');
  commentContent.classList.add('comment-text');
  commentContent.textContent = commentText;

  // Ajouter un bouton de suppression
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-comment');
  deleteButton.textContent = 'Supprimer';
  deleteButton.addEventListener('click', () => {
    commentList.removeChild(commentDiv); // Supprimer le commentaire
    saveComments(); // Mettre à jour localStorage après suppression
  });

  // Ajouter les éléments au commentaire
  commentDiv.appendChild(commentContent);
  commentDiv.appendChild(deleteButton);

  // Ajouter le commentaire à la liste
  commentList.appendChild(commentDiv);

  // Effacer le champ de texte
  commentInput.value = '';

  // Sauvegarder les commentaires dans localStorage
  saveComments();
}

// Fonction pour sauvegarder les commentaires dans localStorage
function saveComments() {
  const comments = [];
  document.querySelectorAll('.comment-text').forEach(comment => {
    comments.push(comment.textContent);
  });
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Fonction pour charger les commentaires depuis localStorage
function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(commentText => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    const commentContent = document.createElement('p');
    commentContent.classList.add('comment-text');
    commentContent.textContent = commentText;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-comment');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => {
      commentList.removeChild(commentDiv);
      saveComments(); // Mettre à jour localStorage après suppression
    });

    commentDiv.appendChild(commentContent);
    commentDiv.appendChild(deleteButton);
    commentList.appendChild(commentDiv);
  });
}

// Charger les commentaires au chargement de la page
window.addEventListener('load', loadComments);

// Écouter le clic sur le bouton "Envoyer"
submitComment.addEventListener('click', addComment);

// Écouter la touche "Entrée" dans le champ de texte
commentInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addComment();
  }
});

// Function to toggle "Lire la suite"
function toggleReadMore(link) {
  // Prevent the default link behavior (opening a new page)
  event.preventDefault();

  // Find the parent post-card
  const postCard = link.closest('.post-card');

  // Find the short text and full text elements
  const shortText = postCard.querySelector('.short-text');
  const fullText = postCard.querySelector('.full-text');

  // Toggle visibility
  if (fullText.style.display === 'none') {
    fullText.style.display = 'block';
    shortText.style.display = 'none';
    link.textContent = 'Lire moins'; // Change the link text
  } else {
    fullText.style.display = 'none';
    shortText.style.display = 'block';
    link.textContent = 'Lire la suite'; // Change the link text back
  }
}