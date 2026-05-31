// Navigation Toggle for Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close nav when clicking a link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// Terminal Typing Effect
const terminalText = "Starting reverse shell...\nConnection established on port 4444.\nPrivilege escalation successful. \nWe are root.";
let charIndex = 0;
const typingElement = document.getElementById('typing-text');

function typeText() {
    if (charIndex < terminalText.length) {
        if(terminalText.charAt(charIndex) === '\n') {
            typingElement.innerHTML += '<br><span class="prompt">root@kali:~#</span> ';
        } else {
            typingElement.innerHTML += terminalText.charAt(charIndex);
        }
        charIndex++;
        setTimeout(typeText, Math.random() * 50 + 20); // random delay for natural typing feel
    }
}

// Start typing effect after delay
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1500);
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form submission mockup
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.style.display = 'block';
    formMessage.textContent = "> Payload submitted successfully. I'll connect back soon.";
    form.reset();
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Scroll Reveal Effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .achievement-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});

// Interactive dynamic card hover effects
const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Apply dynamic radial gradient based on mouse position
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 65, 0.1) 0%, rgba(20, 20, 25, 0.7) 50%)`;
        card.style.border = '1px solid rgba(0, 255, 65, 0.5)';
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(20, 20, 25, 0.7)';
        card.style.border = '1px solid rgba(0, 255, 65, 0.3)';
        card.style.transform = 'translateY(0) scale(1)';
        card.style.zIndex = '1';
    });
});

// Interactive Terminal Window Dragging (Simulated)
const terminalWindow = document.querySelector('.terminal-window');
const terminalHeader = document.querySelector('.terminal-header');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

if(terminalHeader && terminalWindow) {
    terminalHeader.addEventListener("mousedown", dragStart);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("mousemove", drag);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === terminalHeader || e.target.parentElement === terminalHeader) {
            isDragging = true;
            terminalWindow.style.transition = 'none';
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        terminalWindow.style.transition = 'transform 0.3s ease';
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            
            // Limit dragging to a small radius to prevent breaking layout
            if(Math.abs(currentX) < 100 && Math.abs(currentY) < 100) {
                terminalWindow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            }
        }
    }
}
