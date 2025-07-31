document.addEventListener('DOMContentLoaded', () => {
    // Custom heart shape for confetti
    const heartShape = {
        type: 'path',
        path: 'M167 72c19,-38 37,-56 75,-56 74,0 87,75 87,94 0,24 -31,60 -64,82 -42,27 -89,45 -94,70 -4,-24 -55,-42 -92,-70 -33,-21 -64,-58 -64,-82 0,-18 14,-94 87,-94 38,0 55,18 75,56z',
        matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.533333333333333, -2.0666666666666664]
    };

    // Initialize particles.js with pastel stars
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 1200 } },
            color: { value: ['#FF99CC', '#CC99FF', '#99CCFF', '#FFD700'] },
            shape: { type: 'star', stroke: { width: 0 } },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.2 } },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 1, direction: 'none', random: true }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'bubble' }, onclick: { enable: true, mode: 'push' } },
            modes: { bubble: { distance: 200, size: 5, duration: 2 }, push: { particles_nb: 2 } }
        }
    });

    // Message toggle with GSAP timeline
    const messageToggle = document.getElementById('messageToggle');
    const hiddenMessage = document.getElementById('hiddenMessage');
    messageToggle.addEventListener('click', () => {
        const isHidden = hiddenMessage.classList.contains('hidden');
        hiddenMessage.classList.toggle('hidden');
        messageToggle.textContent = isHidden ? 'Hide Special Message' : 'Show Special Message';
        messageToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        hiddenMessage.setAttribute('aria-hidden', isHidden ? 'false' : 'true');

        const tl = gsap.timeline();
        if (isHidden) {
            tl.fromTo(hiddenMessage, 
                { scale: 0.7, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' }
            );
            // Confetti burst with hearts
            confetti({
                particleCount: 60,
                spread: 50,
                origin: { y: 0.6 },
                colors: ['#FF99CC', '#CC99FF', '#99CCFF'],
                shapes: [heartShape]
            });
        } else {
            tl.to(hiddenMessage, {
                scale: 0.7,
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.in'
            });
        }
    });

    // Music control with GSAP animation
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    bgMusic.src = './Golden Brown - The Stranglers.mp3';

    musicControl.addEventListener('click', () => {
        const tl = gsap.timeline();
        if (isPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
            tl.to(musicControl, { scale: 1, rotation: 0, duration: 0.6, ease: 'power3.out' });
        } else {
            bgMusic.play().catch(e => console.error('Audio play failed:', e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
            tl.to(musicControl, { scale: 1.2, rotation: 360, duration: 0.6, ease: 'power3.out' });
            // Confetti burst with hearts
            confetti({
                particleCount: 30,
                spread: 20,
                origin: { x: 0.95, y: 0.95 },
                colors: ['#FF99CC', '#CC99FF', '#99CCFF'],
                shapes: [heartShape]
            });
        }
        isPlaying = !isPlaying;
    });

    // Launch celebration button with GSAP timeline
    const launchButton = document.getElementById('launchButton');
    const launchMessage = document.getElementById('launchMessage');
    launchButton.addEventListener('click', () => {
        const isHidden = launchMessage.classList.contains('hidden');
        if (isHidden) {
            launchMessage.classList.remove('hidden');
            const tl = gsap.timeline({
                onComplete: () => {
                    // Rocket launch effect with confetti
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.4 },
                        colors: ['#FF99CC', '#CC99FF', '#99CCFF', '#FFD700'],
                        shapes: [heartShape, 'star']
                    });
                }
            });
            tl.to(launchButton, {
                y: -20,
                scale: 1.1,
                duration: 0.4,
                ease: 'power2.out'
            })
            .to(launchButton, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.inOut'
            })
            .fromTo(launchMessage, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' }, '-=0.8'
            )
            .fromTo('.celebration', 
                { scale: 1, boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)' },
                { scale: 1.05, boxShadow: '0 20px 40px rgba(255, 153, 204, 0.4)', duration: 1, ease: 'power3.out' }, '-=0.8'
            );
        }
    });

    // Raining hearts effect
    function rainHearts() {
        confetti({
            particleCount: 2,
            spread: 15,
            origin: { y: -0.1, x: Math.random() },
            colors: ['#FF99CC', '#CC99FF', '#99CCFF'],
            shapes: [heartShape],
            scalar: 0.4,
            gravity: 0.2,
            ticks: 500
        });
    }

    setInterval(rainHearts, 4000);

    // Initial animations
    const tl = gsap.timeline();
    tl.from('.container', {
        opacity: 0,
        y: 70,
        duration: 1.5,
        ease: 'power4.out'
    })
    .from('h1', {
        opacity: 0,
        x: -70,
        duration: 1.8,
        ease: 'elastic.out(1, 0.4)',
        delay: 0.3
    }, '-=1.2')
    .from('.birthdate', {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.6
    }, '-=1.0')
    .from('.celebration', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power4.out'
    }, '-=0.8');
});