// observer.js
const imageSections = document.querySelectorAll(".image-section");
const horizontalLines = document.querySelectorAll(".strip-line"); // Make sure this class exists

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.5,      // 50% visible
        rootMargin: "0px 0px -50px 0px" // Trigger a bit earlier
    }
);

// Function to handle observations based on screen size
function observeElements() {
    // Observe image sections (desktop only)
    if (window.innerWidth >= 768) {
        imageSections.forEach((section) => {
            observer.observe(section);
        });
    } else {
        // On mobile, you can choose to observe or add class immediately
        imageSections.forEach((section) => {
            section.classList.add("active");
        });
    }

    // Always observe horizontal lines (decorative elements)
    horizontalLines.forEach((line) => {
        observer.observe(line);
    });
}

// Initial observation
observeElements();

// Handle window resize (debounced)
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-run logic on resize
        observeElements();
    }, 150);
});
