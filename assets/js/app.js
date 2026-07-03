// app.js — extracted from index.html
// Handles working-hours banner, mobile nav toggle, particles, accessibility helpers
(function () {
    const openHour = 9; // 09:00
    const closeHour = 21; // 21:00
    const banner = document.getElementById('workingBanner');
    const statusText = document.getElementById('statusText');
    const statusDot = document.getElementById('statusDot');
    const countdownEl = document.getElementById('countdown');

    function getAlgiersNow() {
        // Use Intl to get time in Africa/Algiers; fallback to local time if not supported
        try {
            const now = new Date();
            const tz = 'Africa/Algiers';
            const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now);
            const map = {};
            parts.forEach(p => map[p.type] = p.value);
            // Build a date in that timezone using the numeric parts
            return new Date(`${map.year}-${map.month.padStart(2,'0')}-${map.day.padStart(2,'0')}T${map.hour.padStart(2,'0')}:${map.minute.padStart(2,'0')}:${map.second.padStart(2,'0')}`);
        } catch (e) {
            return new Date();
        }
    }

    function updateStatus() {
        const now = getAlgiersNow();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const open = hour >= openHour && hour < closeHour;
        if (open) {
            banner.classList.remove('closed');
            statusDot.classList.add('open');
            statusDot.classList.remove('closed');
            statusText.textContent = 'المتجر مفتوح الآن';
            statusText.classList.remove('closed');
            statusText.classList.add('open');
            // countdown to close
            const closeTime = new Date(now);
            closeTime.setHours(closeHour,0,0,0);
            const diff = closeTime - now;
            updateCountdown(diff);
        } else {
            banner.classList.add('closed');
            statusDot.classList.remove('open');
            statusDot.classList.add('closed');
            statusText.textContent = 'المتجر مغلق حالياً';
            statusText.classList.remove('open');
            statusText.classList.add('closed');
            // countdown to next open
            const nextOpen = new Date(now);
            if (hour >= closeHour) {
                // tomorrow
                nextOpen.setDate(nextOpen.getDate() + 1);
            }
            nextOpen.setHours(openHour,0,0,0);
            const diff = nextOpen - now;
            updateCountdown(diff);
        }
    }

    function updateCountdown(ms) {
        if (ms <= 0) { countdownEl.textContent = '00:00:00'; return; }
        const sec = Math.floor(ms / 1000) % 60;
        const min = Math.floor(ms / (1000 * 60)) % 60;
        const hrs = Math.floor(ms / (1000 * 60 * 60));
        countdownEl.textContent = `${String(hrs).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    }

    // Initial run
    updateStatus();
    // Update every second for countdown, but status every 30s
    setInterval(() => updateStatus(), 1000);

    // Mobile nav toggle
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', String(!expanded));
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.gap = '1rem';
                navLinks.style.background = 'var(--card)';
                navLinks.style.padding = '1rem';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '68px';
                navLinks.style.right = '1rem';
                navLinks.style.borderRadius = '10px';
                navLinks.setAttribute('aria-hidden', 'false');
            }
        });

        // Gesture/keyboard accessible close for nav
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navLinks.style.display = '';
                mobileToggle.setAttribute('aria-expanded','false');
            }
        });
    }

    // Particle generation (lightweight)
    const particlesEl = document.getElementById('particles');
    function spawnParticles(count = 18) {
        if (!particlesEl) return;
        for (let i=0;i<count;i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.width = `${2 + Math.random()*6}px`;
            p.style.height = p.style.width;
            p.style.opacity = 0.15 + Math.random()*0.4;
            p.style.animationDuration = `${10 + Math.random()*20}s`;
            p.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
            particlesEl.appendChild(p);
            // cleanup
            setTimeout(() => { p.remove(); }, 30000);
        }
    }
    spawnParticles(24);
    setInterval(() => spawnParticles(8), 4000);

    // Simple keyboard navigation focus management for products
    const productButtons = Array.from(document.querySelectorAll('.product button'));
    productButtons.forEach((btn, idx) => {
        btn.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
                const prev = productButtons[idx-1]; if (prev) prev.focus();
            } else if (e.key === 'ArrowRight') {
                const next = productButtons[idx+1]; if (next) next.focus();
            }
        });
    });

    // Reduce motion for users who prefer it
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) {
        document.querySelectorAll('.bg-animation, .particle').forEach(el => { el.style.animation = 'none'; });
    }

})();
