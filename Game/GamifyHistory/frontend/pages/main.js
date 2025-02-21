document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Forum Thread Interactions
    document.querySelectorAll(".upvote-btn").forEach((button) => {
        button.addEventListener("click", () => {
            let count = button.nextElementSibling;
            count.textContent = parseInt(count.textContent) + 1;
            button.classList.add("voted");
            button.disabled = true;
        });
    });

    document.querySelectorAll(".reply-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            let parentThread = e.target.closest(".thread");
            let replyBox = parentThread.querySelector(".reply-box");
            replyBox.classList.toggle("show");
        });
    });

    // Claim Rewards
    document.querySelectorAll(".claim-btn").forEach((button) => {
        button.addEventListener("click", () => {
            button.textContent = "Claimed";
            button.classList.add("claimed");
            button.disabled = true;
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll(".nav-menu a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
});