document.addEventListener('DOMContentLoaded', () => {
    // Custom heart shape for confetti
    const heartShape = {
        type: 'path',
        path: 'M167 72c19,-38 37,-56 75,-56 74,0 87,75 87,94 0,24 -31,60 -64,82 -42,27 -89,45 -94,70 -4,-24 -55,-42 -92,-70 -33,-21 -64,-58 -64,-82 0,-18 14,-94 87,-94 38,0 55,18 75,56z',
        matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.533333333333333, -2.0666666666666664]
    };

    // Initialize particles.js with more particles and faster movement
    particlesJS('particles-js', {
        particles: {
            number: { value: 250, density: { enable: true, value_area: 800 } }, // Increased to 250 particles
            color: { value: ['#FF99CC', '#CC99FF', '#99CCFF', '#FFD700'] },
            shape: { type: 'star', stroke: { width: 0 } },
            opacity: { value: 0.7, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.3 } },
            size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 1 } },
            line_linked: { enable: false },
            move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { 
                onhover: { enable: true, mode: 'grab' }, 
                onclick: { enable: true, mode: 'push' } 
            },
            modes: { 
                grab: { distance: 300, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 10 }
            }
        }
    });

    // Message toggle with enhanced GSAP timeline
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
                { scale: 0.6, opacity: 0, y: 50, rotation: -5 },
                { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
            )
            .to('.container', { scale: 1.05, duration: 0.5, ease: 'power2.out' }, '-=1.0')
            .fromTo('.birthdate i', 
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'back.out(1.7)' }, '-=1.2'
            );
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF99CC', '#CC99FF', '#99CCFF', '#FFD700'],
                shapes: [heartShape, 'star'],
                scalar: 0.6
            });
        } else {
            tl.to(hiddenMessage, {
                scale: 0.6,
                opacity: 0,
                y: 50,
                rotation: 5,
                duration: 1.2,
                ease: 'back.in(1.2)'
            })
            .to('.container', { scale: 1, duration: 0.5, ease: 'power2.out' }, '-=1.0');
        }
    });

    // Music control with enhanced animation
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    bgMusic.src = './blue.mp3';

    musicControl.addEventListener('click', () => {
        const tl = gsap.timeline();
        if (isPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
            tl.to(musicControl, { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        } else {
            bgMusic.play().catch(e => console.error('Audio play failed:', e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
            tl.to(musicControl, { scale: 1.3, rotation: 360, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
            confetti({
                particleCount: 50,
                spread: 30,
                origin: { x: 0.95, y: 0.95 },
                colors: ['#FF99CC', '#CC99FF', '#99CCFF'],
                shapes: [heartShape],
                scalar: 0.5
            });
        }
        isPlaying = !isPlaying;
    });

    // Launch celebration button with enhanced timeline
    const launchButton = document.getElementById('launchButton');
    const launchMessage = document.getElementById('launchMessage');
    launchButton.addEventListener('click', () => {
        const isHidden = launchMessage.classList.contains('hidden');
        if (isHidden) {
            launchMessage.classList.remove('hidden');
            const tl = gsap.timeline({
                onComplete: () => {
                    confetti({
                        particleCount: 200,
                        spread: 90,
                        origin: { y: 0.4 },
                        colors: ['#FF99CC', '#CC99FF', '#99CCFF', '#FFD700'],
                        shapes: [heartShape, 'star', 'circle'],
                        scalar: 0.7,
                        gravity: 0.3
                    });
                    setTimeout(() => confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } }), 1000);
                }
            });
            tl.to(launchButton, {
                y: -30,
                scale: 1.2,
                rotation: 360,
                duration: 0.7,
                ease: 'back.out(1.7)'
            })
            .to(launchButton, {
                y: -120,
                opacity: 0,
                duration: 1.8,
                ease: 'expo.inOut'
            })
            .fromTo(launchMessage, 
                { opacity: 0, y: 50, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }, '-=1.5'
            )
            .fromTo('.celebration', 
                { scale: 1, boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)' },
                { scale: 1.1, boxShadow: '0 25px 50px rgba(255, 153, 204, 0.6)', duration: 1.5, ease: 'expo.out' }, '-=1.5'
            )
            .to('.celebration-title', { color: '#FFFF00', duration: 0.5, ease: 'power2.out' }, '-=1.0');
        }
    });

    // Enhanced raining hearts effect with more frequency
    function rainHearts() {
        confetti({
            particleCount: 5,
            spread: 20,
            origin: { y: -0.1, x: Math.random() },
            colors: ['#FF99CC', '#CC99FF', '#99CCFF'],
            shapes: [heartShape],
            scalar: 0.5,
            gravity: 0.25,
            ticks: 600
        });
    }

    setInterval(rainHearts, 2000); // Increased frequency to every 2 seconds

    // Enhanced initial animations with stagger and more effects
    const tl = gsap.timeline();
    tl.from('.container', {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 2.0,
        ease: 'elastic.out(1, 0.5)'
    })
    .from('h1', {
        opacity: 0,
        x: -100,
        scale: 0.8,
        rotation: -10,
        duration: 2.2,
        ease: 'back.out(1.7)',
        delay: 0.5
    }, '-=1.8')
    .from('h2', {
        opacity: 0,
        y: 50,
        scale: 0.7,
        duration: 1.8,
        ease: 'back.out(1.6)',
        delay: 0.7
    }, '-=1.5')
    .from('.birthdate', {
        opacity: 0,
        scale: 0.5,
        stagger: 0.3,
        duration: 1.6,
        ease: 'back.out(1.5)'
    }, '-=1.2')
    .from('.celebration', {
        opacity: 0,
        y: 70,
        scale: 0.9,
        duration: 1.8,
        ease: 'elastic.out(1, 0.5)'
    }, '-=1.0')
    .to('.container', { rotation: 360, duration: 20, ease: 'none', repeat: -1 }, '-=1.0'); // Subtle continuous rotation
});
