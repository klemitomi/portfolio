// Get the button:
let mybutton = document.getElementById("toTopBtn");

// When the user scrolls down 20px from the top of the document, show the button and toggle dark mode button visibility
window.onscroll = function() {
  scrollFunction();
  toggleDarkModeButton();
};

window.onscroll = function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.classList.add("show"); // Show the button when scrolled down 20px from the top of the documentdisplay = "block";
  } else {
    mybutton.classList.remove("show"); // Hide the button when not scrolled down 20px from the top of the document.display = "none";
  }
};

function toggleDarkModeButton() {
  if (window.scrollY > 20) {
    darkModeToggle.classList.add('show');
  } else {
    darkModeToggle.classList.remove('show');
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//darkSwitch
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.onclick = function () {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light' : 'Dark';
};

window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        darkModeToggle.classList.add('show');
    } else {
        darkModeToggle.classList.remove('show');
    }
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}



//Feedback
document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const reviewsContainer = document.getElementById("reviews");
    const stars = document.querySelectorAll("#star-rating .star");
    let selectedRating = 0;

    // 📌 Csillagkezelés
    stars.forEach(star => {
        star.addEventListener("click", () => {
            selectedRating = parseInt(star.getAttribute("data-value"));
            updateStarDisplay(selectedRating);
        });
    });

    function updateStarDisplay(rating) {
        stars.forEach(star => {
            star.style.color = star.getAttribute("data-value") <= rating ? "gold" : "gray";
        });
    }

    // 📌 Vélemények beküldése és karusszelhez adása
    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("nameFeedback").value.trim();
        const feedbackText = document.getElementById("feedbackText").value.trim();

        if (!name || !feedbackText) {
            alert("Please fill in all fields!");
            return;
        }

        if (selectedRating === 0) {
            alert("Please provide a rating!");
            return;
        }

        let starRatingHTML = "⭐".repeat(selectedRating);

        // 📌 Új vélemény HTML szerkezete
        const newReview = `
       
            
              
                    <div class="review p-3 border rounded">
                        <p class="review-text">"${feedbackText}"</p>
                        <div class="review-author">
                            <strong>- ${name}</strong>
                            <span class="stars">${starRatingHTML}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        // 📌 Megkeressük az utolsó diát
        let lastSlide = reviewsContainer.querySelector(".carousel-item:last-child");

        if (!lastSlide || lastSlide.querySelectorAll(".review").length >= 3) {
            // Ha nincs dia vagy már van benne 3 vélemény, új diát hozunk létre
            let newSlide = document.createElement("div");
            newSlide.classList.add("carousel-item");
            if (!reviewsContainer.querySelector(".carousel-item")) {
                newSlide.classList.add("active"); // Az első legyen aktív
            }
            newSlide.innerHTML = `<div class="d-flex flex-column">${newReview}</div>`;
            reviewsContainer.appendChild(newSlide);
        } else {
            // Ha van hely az utolsó dián, oda tesszük az új véleményt
            lastSlide.querySelector(".d-flex").innerHTML += newReview;
        }

        // Mezők törlése
        feedbackForm.reset();
        selectedRating = 0;
        updateStarDisplay(0);
    });

    updateStarDisplay(selectedRating);
});

//bfcache
