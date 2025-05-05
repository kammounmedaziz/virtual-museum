// museum-script.js
document.addEventListener("scroll", function () {
    const footer = document.querySelector(".fantasy-footer");
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  
    // Show the footer when the user is near the bottom (e.g., 100px from the bottom)
    if (documentHeight - (scrollPosition + windowHeight) < 100) {
      footer.classList.add("visible");
    } else {
      footer.classList.remove("visible");
    }
  });

  // Function to create and animate stars
function createStars() {
  const container = document.getElementById("stars-container");

  // Number of stars to create
  const starCount = 100;

  // Create stars and append them to the container
  for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      // Set random size and position for each star
      const size = Math.random() * 5 + 1; // Random size between 1px and 6px
      const xPosition = Math.random() * window.innerWidth; // Random horizontal position
      const yPosition = Math.random() * window.innerHeight; // Random vertical position

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${yPosition}px`;
      star.style.left = `${xPosition}px`;

      // Randomize the animation speed
      const animationDuration = Math.random() * 10 + 5; // Between 5s and 15s
      star.style.animationDuration = `${animationDuration}s`;

      // Append the star to the container
      container.appendChild(star);
  }
}

// Initialize stars on page load
window.onload = createStars;

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("mouseenter", () => {
      for (let i = 0; i < 10; i++) { // Create multiple sparks
          let spark = document.createElement("div");
          spark.classList.add("spark");
          
          let size = Math.random() * 5 + 2; // Random size between 2px and 7px
          let x = (Math.random() - 0.5) * 100; // Random position around button
          let y = (Math.random() - 0.5) * 100;

          spark.style.width = `${size}px`;
          spark.style.height = `${size}px`;
          spark.style.position = "absolute";
          spark.style.top = `50%`;
          spark.style.left = `50%`;
          spark.style.transform = `translate(${x}%, ${y}%)`;
          spark.style.background = "gold";
          spark.style.borderRadius = "50%";
          spark.style.boxShadow = "0 0 5px gold, 0 0 10px rgba(255, 215, 0, 0.8)";
          spark.style.animation = "sparkle 0.8s linear";

          button.appendChild(spark);

          setTimeout(() => spark.remove(), 800);
      }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  let wandCursor = document.createElement("div");
  wandCursor.classList.add("wand-glow");
  document.body.appendChild(wandCursor);

  document.addEventListener("mousemove", (e) => {
      // Move the wand glow with the cursor
      wandCursor.style.left = `${e.pageX}px`;
      wandCursor.style.top = `${e.pageY}px`;

      // Create sparkles
      let spark = document.createElement("div");
      spark.classList.add("spark");
      document.body.appendChild(spark);

      // Randomize sparkle position slightly around cursor
      let size = Math.random() * 5 + 3;
      let xOffset = (Math.random() - 0.5) * 30;
      let yOffset = (Math.random() - 0.5) * 30;

      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${e.pageX + xOffset}px`;
      spark.style.top = `${e.pageY + yOffset}px`;

      // Remove spark after animation
      setTimeout(() => spark.remove(), 500);
  });
});
