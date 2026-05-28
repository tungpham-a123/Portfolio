// --- Custom Cursor ---
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay to the outline for a trailing effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effect to cursor when hovering over links and buttons
document.querySelectorAll('a, .btn, .project-card').forEach(el => {
    el.addEventListener('mouseover', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
    });
    el.addEventListener('mouseout', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// --- Typewriter Effect ---
const words = ["Backend Developer.", "FPT University Student.", "Java Enthusiast.", "Software Engineer."];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            deletingEffect();
            return false;
        };
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            };
            typingEffect();
            return false;
        };
        timer = setTimeout(loopDeleting, 50);
    };
    setTimeout(loopDeleting, 2000); // Wait 2 seconds before deleting
}

// Start Typewriter
typingEffect();

// --- Scroll Animation ---
// Add fade-in effect when sections scroll into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            
            // Stagger animation for children using Anime.js
            const animTargets = entry.target.querySelectorAll('.skill-bar, .project-card, .contact-item, .contact-form input, .contact-form textarea, .contact-form button');
            if (animTargets.length > 0) {
                anime({
                    targets: animTargets,
                    translateY: [30, 0],
                    opacity: [0, 1],
                    easing: 'easeOutElastic(1, .8)',
                    duration: 1200,
                    delay: anime.stagger(150) // Stagger by 150ms
                });
            }

            // If the section contains progress bars, animate them with Anime.js
            const progressBars = entry.target.querySelectorAll('.progress');
            if (progressBars.length > 0) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    anime({
                        targets: bar,
                        width: [0, width],
                        easing: 'easeInOutQuart',
                        duration: 1500,
                        delay: 500
                    });
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and attach observer
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// --- Navbar Scroll Effect ---
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector(".navbar").style.top = "0";
        document.querySelector(".navbar").style.boxShadow = currentScrollPos > 50 ? "0 10px 30px -10px rgba(2,12,27,0.7)" : "none";
    } else {
        document.querySelector(".navbar").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
}

// --- Scroll Cat Animation ---
const scrollString = document.getElementById('scroll-string');
const scrollCat = document.getElementById('scroll-cat');
let isScrolling;

window.addEventListener('scroll', () => {
    // Calculate scroll percentage
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollTop / scrollHeight;
    
    // Calculate position based on viewport height
    // The cat should move from top 0 to bottom 100vh - cat height (approx 120px)
    const maxScroll = window.innerHeight - 120; 
    let catPosition = scrollPercent * maxScroll;
    
    // Slight offset so the string looks like it's attached to the paw
    scrollString.style.height = `${catPosition + 10}px`;
    scrollCat.style.top = `${catPosition}px`;

    // Add wobble effect while scrolling
    scrollCat.classList.add('cat-wobble');

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
        scrollCat.classList.remove('cat-wobble');
    }, 150);
});

// --- Vanta.js Globe & Initial Page Animations ---
window.addEventListener('DOMContentLoaded', () => {
    // Hide initial elements for animation
    document.querySelector('.greeting').style.opacity = 0;
    document.querySelector('.summary').style.opacity = 0;
    document.querySelector('.hero-actions').style.opacity = 0;

    // Split name into letters
    const nameEl = document.querySelector('.name');
    nameEl.innerHTML = nameEl.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block'>$&</span>");

    // Vanta Configuration
    const vantaOptions = {
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        size: 1.20
    };

    let vantaEffect = null;

    function initVanta(theme) {
        if (vantaEffect) vantaEffect.destroy();
        if (theme === 'light') {
            vantaEffect = VANTA.GLOBE({
                ...vantaOptions,
                color: 0x2563eb,
                color2: 0x2563eb, // Dây nối màu xanh dương đậm
                backgroundColor: 0xf8fafc
            });
        } else {
            vantaEffect = VANTA.GLOBE({
                ...vantaOptions,
                color: 0x64ffda,
                color2: 0x0070f3,
                backgroundColor: 0x0a192f
            });
        }
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.checked = true;
    }
    
    // Initialize Vanta with the correct theme
    initVanta(currentTheme);

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            initVanta('light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            initVanta('dark');
        }
    });

    // Run Initial Hero Animation using Anime.js
    anime.timeline({loop: false})
    .add({
        targets: '.greeting',
        opacity: [0, 1],
        translateY: [30, 0],
        easing: "easeOutExpo",
        duration: 1200,
        delay: 300
    })
    .add({
        targets: '.name .letter',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: "easeOutElastic(1, .8)",
        duration: 1200,
        delay: anime.stagger(50)
    }, '-=800')
    .add({
        targets: '.summary, .hero-actions',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: "easeOutExpo",
        duration: 1000,
        delay: anime.stagger(200)
    }, '-=600');

    // --- GitHub Dodge Effect ---
    const githubLink = document.getElementById('github-link');
    let dodgeCount = 0;
    const taunts = [
        "Too slow! 😂",
        "Missed me! 😜",
        "Is that all you got? 🐢",
        "Try harder! 🤡",
        "Oops, over here! 🏃‍♂️",
        "You're not even trying! 🥱",
        "Catch me if you can! 💨",
        "Still too slow! 🐌",
        "Almost got it... Not! 🤪",
        "Fine, I'll let you click me now. 🙄"
    ];

    const tauntTooltip = document.createElement('div');
    tauntTooltip.className = 'taunt-tooltip';
    document.body.appendChild(tauntTooltip);

    if (githubLink) {
        githubLink.addEventListener('mouseenter', () => {
            if (dodgeCount === 0) {
                const rect = githubLink.getBoundingClientRect();
                githubLink.style.position = 'fixed';
                githubLink.style.left = rect.left + 'px';
                githubLink.style.top = rect.top + 'px';
                githubLink.style.zIndex = '9999';
                githubLink.style.transition = 'all 0.2s ease-out';
            }

            if (dodgeCount < 10) {
                const safeWidth = window.innerWidth - 100;
                const safeHeight = window.innerHeight - 100;
                const newLeft = Math.max(20, Math.random() * safeWidth);
                const newTop = Math.max(20, Math.random() * safeHeight);

                githubLink.style.left = newLeft + 'px';
                githubLink.style.top = newTop + 'px';

                tauntTooltip.textContent = taunts[dodgeCount];
                tauntTooltip.style.left = (newLeft + 40) + 'px';
                tauntTooltip.style.top = (newTop - 20) + 'px';
                tauntTooltip.style.opacity = '1';

                clearTimeout(tauntTooltip.timeout);
                tauntTooltip.timeout = setTimeout(() => {
                    tauntTooltip.style.opacity = '0';
                }, 1500);

                dodgeCount++;
            }
        });
    }
});
