document.getElementById('enter-door').addEventListener('click', () => {
  // Apply the fade-out effect to the current page
  document.getElementById('welcome-page').classList.add('fade-out');

  // Wait for the fade-out animation to complete before navigating
  setTimeout(() => {
    window.location.href = 'museum-hall.html'; // Navigate to the Museum Hall
  }, 1000); // Match this time with the fade-out duration in CSS
});
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".info-card");
  cards.forEach(card => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.1)";
    });
    card.addEventListener("mouseout", () => {
      card.style.transform = "scale(1)";
    });
  });
});