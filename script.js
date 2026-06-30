// script.js

// ==================== EASING FUNCTIONS ====================

const easeOutQuad = (t) => t * (2 - t);
const easeOutCubic = (t) => --t * t * t + 1;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// ==================== NAVIGATION ====================

const nav = document.querySelector("nav");
const menu = document.querySelector("#menu");
const navLinks = document.querySelectorAll(".nav-links li a");

function toggleMenu() {
    const isOpen = nav.classList.contains("active");
    nav.classList.toggle("active");
    menu.classList.toggle("active");
    menu.setAttribute("aria-expanded", String(!isOpen));
}

menu.addEventListener("click", toggleMenu);

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove("active");
        menu.classList.remove("active");
        menu.setAttribute("aria-expanded", "false");
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menu.classList.remove("active");
        menu.setAttribute("aria-expanded", "false");
    });
});

// Active nav link
function setActiveLink() {
    navLinks.forEach(link => link.parentElement.classList.remove("active"));
    
    const current = Array.from(navLinks).find(link => {
        const section = document.querySelector(link.getAttribute("href"));
        if (section) {
            const rect = section.getBoundingClientRect();
            return rect.top <= 180 && rect.bottom >= 180;
        }
        return false;
    });

    if (current) current.parentElement.classList.add("active");
}

// ==================== SMOOTH SCROLL ANIMATION ====================

const verticalLine = document.querySelector(".vertical");
const circles = document.querySelectorAll(".circle");
const horizontalLines = document.querySelectorAll(".strip-line.horizontal");

let activeIndex = 0;
let targetIndex = 0;
let currentHeight = 0;        // For smooth line animation
let ticking = false;

function scrollEffect() {
    const scrollY = window.scrollY;
    const startingPoint = document.getElementById("home").offsetHeight * 0.6;
    const featureHeight = document.querySelector(".feature")?.offsetHeight || 600;

    if (scrollY < startingPoint) {
        targetIndex = 0;
    } else {
        const progress = (scrollY - startingPoint) / featureHeight;
        targetIndex = Math.min(Math.floor(progress) + 1, circles.length);
    }

    // Smoothly animate towards target
    if (targetIndex !== activeIndex) {
        activeIndex = targetIndex;

        // Activate circles and horizontal lines immediately (they look better snapped)
        circles.forEach((circle, i) => {
            circle.classList.toggle("active", i < activeIndex);
        });
        horizontalLines.forEach((line, i) => {
            line.classList.toggle("active", i < activeIndex);
        });
    }

    // Smooth eased height for vertical line
    const targetHeight = (activeIndex / circles.length) * 100;
    currentHeight += (targetHeight - currentHeight) * 0.15; // Ease factor

    if (verticalLine) {
        verticalLine.style.height = `${currentHeight}%`;
    }
}

// Throttled scroll with requestAnimationFrame
function throttledScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            scrollEffect();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener("scroll", throttledScroll, { passive: true });

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    setActiveLink();
    scrollEffect(); // Initial call
});

// Optional: Update active link on scroll
window.addEventListener("scroll", setActiveLink);
