document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 1000 } },
            color: { value: ['#FFD700', '#1E3A8A', '#8B4513'] },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 1.5, direction: 'none', random: true }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 80 }, push: { particles_nb: 3 } }
        }
    });

    // Countdown timer
    function updateCountdown() {
        const now = new Date();
        const nextBirthday = new Date(now.getFullYear(), 7, 2); // August 2
        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }
        
        const diff = nextBirthday - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Animate countdown numbers
    function animateCountdown() {
        gsap.from('.countdown-number', {
            y: 15,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.5)'
        });
    }

    // Message toggle with smooth GSAP animation and confetti
    const messageToggle = document.getElementById('messageToggle');
    const hiddenMessage = document.getElementById('hiddenMessage');
    messageToggle.addEventListener('click', () => {
        const isHidden = hiddenMessage.classList.contains('hidden');
        hiddenMessage.classList.toggle('hidden');
        messageToggle.textContent = isHidden ? 'Hide Special Message' : 'Show Special Message';
        messageToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        hiddenMessage.setAttribute('aria-hidden', isHidden ? 'false' : 'true');

        if (isHidden) {
            gsap.fromTo(hiddenMessage, 
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
            );
            // Confetti burst
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#1E3A8A', '#8B4513']
            });
        } else {
            gsap.to(hiddenMessage, {
                scale: 0.8,
                opacity: 0,
                y: 20,
                duration: 0.9,
                ease: 'power3.in'
            });
        }
    });

    // Music control with smooth GSAP animation
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    // Update audio source to local file
    bgMusic.src = './Golden Brown - The Stranglers.mp3';

    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
            gsap.to(musicControl, { scale: 1, rotation: 0, duration: 0.5, ease: 'power3.out' });
        } else {
            bgMusic.play().catch(e => console.error('Audio play failed:', e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
            gsap.to(musicControl, { scale: 1.15, rotation: 360, duration: 0.5, ease: 'power3.out' });
            // Confetti burst
            confetti({
                particleCount: 40,
                spread: 30,
                origin: { x: 0.95, y: 0.95 },
                colors: ['#FFD700', '#1E3A8A', '#8B4513']
            });
        }
        isPlaying = !isPlaying;
    });

    // Raining flowers effect
    function rainFlowers() {
        confetti({
            particleCount: 3, // Few particles
            spread: 20,
            origin: { y: -0.1 }, // Start above the viewport
            colors: ['#FFD700', '#1E3A8A', '#8B4513'],
            shapes: ['circle'], // Simple shape to resemble small flowers
            scalar: 0.5, // Smaller size
            gravity: 0.3, // Slower fall
            ticks: 400 // Longer duration for falling
        });
    }

    // Trigger flower rain every 3 seconds
    setInterval(rainFlowers, 3000);

    // Initial animations
    gsap.from('.container', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('h1', {
        opacity: 0,
        x: -50,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.3
    });

    gsap.from('.birthdate', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
    });

    // Update countdown every second and animate
    setInterval(() => {
        updateCountdown();
        animateCountdown();
    }, 1000);
    updateCountdown();
    animateCountdown();
});
