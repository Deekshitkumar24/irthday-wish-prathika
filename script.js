// ===== FLOATING BACKGROUND ELEMENTS =====
const floatingEmojis = ['🌸', '💖', '🦋', '✨', '🌹', '🧸', '💐', '🎀', '⭐', '🌷', '💝', '🌺'];
const floatingContainer = document.getElementById('floatingElements');

function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');
    item.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    item.style.left = Math.random() * 100 + '%';
    item.style.animationDuration = (8 + Math.random() * 12) + 's';
    item.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    floatingContainer.appendChild(item);
    setTimeout(() => item.remove(), 20000);
}

setInterval(createFloatingItem, 1200);
for (let i = 0; i < 8; i++) setTimeout(createFloatingItem, i * 400);

// ===== HERO SPARKLES =====
const sparklesContainer = document.getElementById('heroSparkles');
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparkle.style.width = sparkle.style.height = (2 + Math.random() * 4) + 'px';
    sparklesContainer.appendChild(sparkle);
}
for (let i = 0; i < 50; i++) createSparkle();

// ===== WELCOME SCREEN / GIFT BOX =====
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');

welcomeScreen.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        mainContent.classList.add('visible');
        launchConfetti();
    }, 400);
});

// ===== CONFETTI =====
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let confettiPieces = [];
const confettiColors = ['#ff6b9d', '#ffd700', '#ff9a9e', '#a18cd1', '#fbc2eb', '#f6d365', '#84fab0', '#ff6b6b'];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.w = 8 + Math.random() * 8;
        this.h = 4 + Math.random() * 4;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.vy = 2 + Math.random() * 3;
        this.vx = (Math.random() - 0.5) * 4;
        this.angle = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 10;
        this.opacity = 1;
    }
    update() {
        this.y += this.vy;
        this.x += this.vx;
        this.angle += this.spin;
        if (this.y > canvas.height * 0.8) this.opacity -= 0.02;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }
}

let confettiActive = false;
function launchConfetti() {
    confettiActive = true;
    for (let i = 0; i < 150; i++) {
        setTimeout(() => confettiPieces.push(new Confetti()), i * 20);
    }
    animateConfetti();
    // Second burst
    setTimeout(() => {
        for (let i = 0; i < 80; i++) {
            setTimeout(() => confettiPieces.push(new Confetti()), i * 25);
        }
    }, 1500);
}

function animateConfetti() {
    if (!confettiActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(c => { c.update(); c.draw(); });
    confettiPieces = confettiPieces.filter(c => c.opacity > 0);
    if (confettiPieces.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiActive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// ===== BLOW CANDLES =====
const blowBtn = document.getElementById('blowBtn');
const wishReveal = document.getElementById('wishReveal');

blowBtn.addEventListener('click', () => {
    document.querySelectorAll('.flame').forEach((flame, i) => {
        setTimeout(() => flame.classList.add('blown'), i * 300);
    });
    blowBtn.classList.add('hidden');
    setTimeout(() => {
        wishReveal.classList.add('visible');
        launchConfetti();
    }, 1200);
});

// ===== GIFT REVEAL =====
function revealGift(card) {
    if (card.classList.contains('revealed')) return;
    card.classList.add('revealed');
    // Mini confetti burst for each gift
    for (let i = 0; i < 40; i++) {
        setTimeout(() => confettiPieces.push(new Confetti()), i * 15);
    }
    if (!confettiActive) {
        confettiActive = true;
        animateConfetti();
    }
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.teddy-section, .wishes-section, .deserve-section, .friendship-section, .gifts-section, .cake-section, .final-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});
