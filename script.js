// Unlock Content Function
function unlockContent() {
    const password = document.getElementById('unlock-password').value;
    const exclusiveContent = document.getElementById('exclusive-content');
    const unlockButton = document.querySelector('#unlock-section button');
    const unlockSection = document.getElementById('unlock-section');
    const lockedCard = document.querySelector('.locked-card');

    if (password === 'FuckNXF') {
        exclusiveContent.style.display = 'block';
        exclusiveContent.style.animation = 'fadeInUp 0.5s ease-out';
        if (unlockButton) {
            unlockButton.textContent = 'Unlocked ✓';
            unlockButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            unlockButton.disabled = true;
        }
        if (unlockSection) {
            unlockSection.style.display = 'none';
        }
        if (lockedCard) {
            lockedCard.classList.remove('locked-card');
            lockedCard.querySelector('.event-icon').textContent = '🎓';
        }
    } else {
        alert('Incorrect password!');
        document.getElementById('unlock-password').value = '';
        document.getElementById('unlock-password').focus();
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    }
}

// Set active page in navigation
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'home.html') ||
            (currentPage === 'index.html' && linkPage === 'home.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Set active page
    setActivePage();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const menuToggle = document.querySelector('.menu-toggle');
                const nav = document.querySelector('nav');
                if (menuToggle && nav) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (nav && menuToggle && window.innerWidth <= 768) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });
    // Registration Button Handler - Redirect to Google Forms
    const registerButtons = document.querySelectorAll('.register-btn');
    
    // Google Form URLs
    const footballFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdPYfAn7CYa6iR1PcTCl6KhzPGzsCqx3T_b0nIQldN-JuPiGQ/viewform?usp=dialog';
    const basketballFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSebmOc5kakav30iHIvnpsr94vsrUT8n2fgLtnQ5NhC5BNYY9A/viewform?usp=dialog';
    
    // Redirect to appropriate form when register button is clicked
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sport = this.getAttribute('data-sport');
            
            // Redirect based on sport
            if (sport === 'football') {
                window.open(footballFormUrl, '_blank');
            } else if (sport === 'basketball') {
                window.open(basketballFormUrl, '_blank');
            }
        });
    });
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (registrationModal) {
                registrationModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal when clicking outside
    if (registrationModal) {
        registrationModal.addEventListener('click', function(e) {
            if (e.target === registrationModal) {
                registrationModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && registrationModal && registrationModal.classList.contains('active')) {
            registrationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Registration Form Handler
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data['team-name'] || !data['captain-name'] || !data['captain-email'] || !data['captain-phone'] || !data['players-count'] || !data['players-names']) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data['captain-email'])) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Player count validation
            const playerCount = parseInt(data['players-count']);
            const sport = data.sport;
            if (sport === 'football' && (playerCount < 5 || playerCount > 7)) {
                alert('Football teams must have 5-7 players.');
                return;
            }
            if (sport === 'basketball') {
                const option = data.option;
                if (option === '3 players' && playerCount !== 3) {
                    alert('This package requires exactly 3 players.');
                    return;
                }
                if (option === '5 players' && (playerCount < 3 || playerCount > 5)) {
                    alert('This package requires 3-5 players.');
                    return;
                }
            }
            
            // Success message
            const sportName = sport === 'football' ? 'Football' : 'Basketball';
            const price = parseInt(data.price).toLocaleString('en-IN');
            alert(`Thank you for registering your ${sportName} team!\n\nTeam: ${data['team-name']}\nPrice: ₹${price}\n\nWe will contact you soon with payment details and further instructions.`);
            
            // Close modal and reset form
            if (registrationModal) {
                registrationModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            this.reset();
        });
    }
    
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message
            alert('Thank you for contacting us! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe ticket boxes and sections
    document.querySelectorAll('.ticket-box, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Enhanced password input - allow Enter key
    const unlockPassword = document.getElementById('unlock-password');
    if (unlockPassword) {
        unlockPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                unlockContent();
            }
        });
    }
});

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, 2000);
}

// Purchase button handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle purchase buttons
    const purchaseButtons = document.querySelectorAll('.ticket-box .cta-button');
    const ticketFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd7PoKURzuq4WM-KtP31qUwnjJc6X4lJ8VLCEVbgW1CB2apqQ/viewform?usp=dialog';
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to Google Form
            window.open(ticketFormUrl, '_blank');
        });
    });
});

// Lucky Draws - Countdown Timer
function initCountdownTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    // Set target date (30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Lucky Draws - Spin the Wheel
function initSpinWheel() {
    const canvas = document.getElementById('wheelCanvas');
    const spinButton = document.getElementById('spinButton');
    const resultModal = document.getElementById('resultModal');
    const closeResult = document.querySelector('.close-result');
    const closeResultBtn = document.getElementById('closeResultBtn');
    
    if (!canvas || !spinButton) return;
    
    // Set canvas size based on screen width
    const isMobile = window.innerWidth <= 768;
    const canvasSize = isMobile ? 300 : 400;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvasSize * 0.45;
    let isSpinning = false;
    let currentRotation = 0;
    
    // Prizes with 1000:1 probability (1000 Better Luck, 1 for each prize)
    const prizes = [
        { name: 'Better Luck Next Time', icon: '🍀', color: '#2A2A2A', probability: 1000 },
        { name: 'Free Tickets', icon: '🎫', color: '#DC143C', probability: 1 },
        { name: 'Gift Hamper', icon: '🎁', color: '#8B0000', probability: 1 },
        { name: 'Gift Card', icon: '💳', color: '#FF1744', probability: 1 },
    ];
    
    // Calculate total probability
    const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    
    // Draw wheel
    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const anglePerPrize = (2 * Math.PI) / prizes.length;
        let currentAngle = currentRotation;
        
        prizes.forEach((prize, index) => {
            const startAngle = currentAngle;
            const endAngle = currentAngle + anglePerPrize;
            
            // Draw segment
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = prize.color;
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + anglePerPrize / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Draw icon with better visibility
            ctx.font = 'bold 40px Arial';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeText(prize.icon, 0, -radius * 0.35);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(prize.icon, 0, -radius * 0.35);
            
            // Draw prize name with better readability
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 4;
            
            // Split text into lines for better readability
            const maxCharsPerLine = 12;
            const words = prize.name.split(' ');
            const lines = [];
            let currentLine = '';
            
            words.forEach(word => {
                if ((currentLine + word).length <= maxCharsPerLine) {
                    currentLine += (currentLine ? ' ' : '') + word;
                } else {
                    if (currentLine) lines.push(currentLine);
                    currentLine = word;
                }
            });
            if (currentLine) lines.push(currentLine);
            
            // Draw each line
            lines.forEach((line, i) => {
                const yOffset = radius * 0.45 + (i * 20);
                ctx.strokeText(line, 0, yOffset);
                ctx.fillText(line, 0, yOffset);
            });
            
            ctx.restore();
            
            currentAngle = endAngle;
        });
    }
    
    // Get random prize based on probability
    function getRandomPrize() {
        const random = Math.random() * totalProbability;
        let cumulative = 0;
        
        for (const prize of prizes) {
            cumulative += prize.probability;
            if (random <= cumulative) {
                return prize;
            }
        }
        return prizes[0]; // Fallback
    }
    
    // Spin wheel
    function spin() {
        if (isSpinning) return;
        
        isSpinning = true;
        spinButton.disabled = true;
        
        const selectedPrize = getRandomPrize();
        const prizeIndex = prizes.findIndex(p => p.name === selectedPrize.name);
        const anglePerPrize = (2 * Math.PI) / prizes.length;
        const targetAngle = prizeIndex * anglePerPrize;
        
        // Calculate spin (multiple rotations + target angle)
        const spins = 5; // Number of full rotations
        const totalRotation = spins * 2 * Math.PI + (2 * Math.PI - targetAngle) + anglePerPrize / 2;
        
        const startRotation = currentRotation;
        const duration = 3000; // 3 seconds
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            currentRotation = startRotation + totalRotation * easeOut;
            drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Show result
                showResult(selectedPrize);
                isSpinning = false;
                spinButton.disabled = false;
            }
        }
        
        animate();
    }
    
    // Show result modal
    function showResult(prize) {
        const resultTitle = document.getElementById('resultTitle');
        const resultPrize = document.getElementById('resultPrize');
        const resultMessage = document.getElementById('resultMessage');
        
        if (prize.name === 'Better Luck Next Time') {
            resultTitle.textContent = 'Better Luck Next Time!';
            resultPrize.textContent = prize.icon;
            resultMessage.textContent = 'Don\'t worry! Try again in the next draw. Keep spinning for a chance to win amazing prizes!';
        } else {
            resultTitle.textContent = 'Congratulations!';
            resultPrize.textContent = prize.icon;
            resultMessage.textContent = `You won: ${prize.name}! We'll contact you soon with details on how to claim your prize.`;
        }
        
        resultModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        resultModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    spinButton.addEventListener('click', spin);
    if (closeResult) closeResult.addEventListener('click', closeModal);
    if (closeResultBtn) closeResultBtn.addEventListener('click', closeModal);
    
    resultModal.addEventListener('click', function(e) {
        if (e.target === resultModal) {
            closeModal();
        }
    });
    
    // Initial draw
    drawWheel();
}

// Initialize lucky draws when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCountdownTimer();
    initSpinWheel();
});
