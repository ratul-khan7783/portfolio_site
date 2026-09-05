document.addEventListener('DOMContentLoaded', () => {
    buildSiteFromConfig();
    initCardDeck();
    initVideoTriggers();
    initCustomPlayer();
    initModals();
    initForms();
    initSmoothScroll();
    initScrollAnimations();
    initScrollNavbar();
    initScrollspy();
    initCreativeShowcaseTabs();
    initVerticalScrollIndicator();
});

function deepMerge(target, source) {
    if (!target) return source;
    if (!source) return target;
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target && target[key] instanceof Object && !Array.isArray(source[key])) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target, source);
    return target;
}

function getActiveConfig() {
    try {
        const stored = localStorage.getItem('my_site_config');
        if (stored) {
            const parsed = JSON.parse(stored);
            const base = JSON.parse(JSON.stringify(typeof siteConfig !== 'undefined' ? siteConfig : {}));
            return Object.assign({}, base, parsed);
        }
    } catch (e) {
        console.warn('LocalStorage config read error:', e);
    }
    return typeof siteConfig !== 'undefined' ? siteConfig : null;
}

window.addEventListener('storage', (e) => {
    if (e.key === 'my_site_config') {
        buildSiteFromConfig();
    }
});

function buildSiteFromConfig() {
    const config = getActiveConfig();
    if (!config) return;

    // 1. Render Hero Section
    if (config.hero) {
        const badgeEl = document.querySelector('.hero-badge');
        if (badgeEl && config.hero.badge) {
            badgeEl.innerHTML = `<span class="badge-icon">✦</span> ${config.hero.badge.replace(/^✦\s*/, '')}`;
        }

        const headlineEl = document.querySelector('.hero-headline');
        if (headlineEl && config.hero.headlineHTML) {
            headlineEl.innerHTML = config.hero.headlineHTML;
        }

        const sublineEl = document.querySelector('.hero-subline');
        if (sublineEl && config.hero.sublineHTML) {
            sublineEl.innerHTML = config.hero.sublineHTML;
        }

        const pillsEl = document.querySelector('.hero-metrics-pills');
        if (pillsEl && config.hero.metrics) {
            pillsEl.innerHTML = config.hero.metrics.map(m => `
                <div class="metric-pill">
                    <span class="metric-val">${m.val}</span>
                    <span class="metric-lbl">${m.lbl}</span>
                </div>
            `).join('');
        }

        if (config.hero.deck) {
            const cardLeft = document.getElementById('card-left');
            const cardCenter = document.getElementById('card-center');
            const cardRight = document.getElementById('card-right');

            if (cardLeft && config.hero.deck.left) {
                cardLeft.setAttribute('data-src', config.hero.deck.left.video);
                const videoSrc = cardLeft.querySelector('video source');
                if (videoSrc) videoSrc.src = config.hero.deck.left.video;
                cardLeft.querySelector('.card-badge')?.remove();
                cardLeft.querySelector('video')?.load();
            }

            if (cardCenter && config.hero.deck.center) {
                cardCenter.setAttribute('data-src', config.hero.deck.center.video);
                const videoSrc = cardCenter.querySelector('video source');
                if (videoSrc) videoSrc.src = config.hero.deck.center.video;
                cardCenter.querySelector('.card-badge')?.remove();
                cardCenter.querySelector('video')?.load();
            }

            if (cardRight && config.hero.deck.right) {
                cardRight.setAttribute('data-src', config.hero.deck.right.video);
                const videoSrc = cardRight.querySelector('video source');
                if (videoSrc) videoSrc.src = config.hero.deck.right.video;
                cardRight.querySelector('.card-badge')?.remove();
                cardRight.querySelector('video')?.load();
            }
        }
    }

    // 2. Render About Section
    if (config.about) {
        const kickerEl = document.querySelector('.about-card .section-kicker');
        if (kickerEl && config.about.kicker) kickerEl.textContent = config.about.kicker;

        const titleEl = document.querySelector('.about-card h2');
        if (titleEl && config.about.title) titleEl.innerHTML = config.about.title;

        const textEl = document.querySelector('.about-card p');
        if (textEl && config.about.text) textEl.innerHTML = config.about.text;
    }

    // 3. Render Projects Showcase (3 Landscape Cards Side-by-Side in 1 Row: Video Left, Text Right inside each card)
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && config.projects) {
        projectsContainer.innerHTML = '';
        config.projects.forEach((project) => {
            const breakdownHTML = (project.breakdown || []).map(item => `
                <div class="breakdown-box">
                    <h4>${item.subtitle}</h4>
                    <p>${item.text}</p>
                </div>
            `).join('');

            const projectHTML = `
                <div class="project-card-h glass-neon-card animate-on-scroll">
                    <div class="project-visual" data-src="${project.video}">
                        <video loop muted playsinline autoplay src="${project.video}" controlsList="nodownload"></video>
                        <div class="play-indicator">
                            <div class="play-icon-circle" style="width:36px; height:36px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <div class="breakdown-list">
                            ${breakdownHTML}
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.insertAdjacentHTML('beforeend', projectHTML);
        });
    }

    // 4. Render Core Capabilities & Performance Systems (4 Side-by-Side 3D Tilt Cards)
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        if (config.capabilitiesHeader) {
            const kicker = document.getElementById('services-kicker');
            const title = document.getElementById('services-title');
            const subline = document.getElementById('services-subline');
            if (kicker && config.capabilitiesHeader.kicker) kicker.textContent = config.capabilitiesHeader.kicker;
            if (title && config.capabilitiesHeader.title) title.innerHTML = config.capabilitiesHeader.title;
            if (subline && config.capabilitiesHeader.subline) subline.innerHTML = config.capabilitiesHeader.subline;
        }

        const cards = config.services || [];
        servicesContainer.innerHTML = cards.map((c, i) => `
            <div class="perf-card glass-neon-card animate-on-scroll" style="animation-delay: ${i * 0.06}s;">
                <div class="card-3d-glow"></div>
                <div class="perf-icon-badge">${c.icon || '✦'}</div>
                <div class="perf-card-title-wrap">
                    <h3>${c.title}</h3>
                </div>
                <p>${c.desc}</p>
            </div>
        `).join('');

        init3DTiltCards();
    }

    // 5. Render Vault Grid & Header Copy
    if (config.vaultHeader) {
        const vKicker = document.getElementById('vault-kicker');
        const vTitle = document.getElementById('vault-title');
        const vSubline = document.getElementById('vault-subline');
        if (vKicker && config.vaultHeader.kicker) vKicker.textContent = config.vaultHeader.kicker;
        if (vTitle && config.vaultHeader.title) vTitle.innerHTML = config.vaultHeader.title;
        if (vSubline && config.vaultHeader.subline) vSubline.innerHTML = config.vaultHeader.subline;
    }

    const vaultContainer = document.getElementById('exploding-stack');
    if (vaultContainer && config.methodVideos && config.methodVideos.length > 0) {
        const uniqueVideos = Array.from(new Set(config.methodVideos)).filter(v => v && v.trim() !== '');
        const marqueeSequence = [...uniqueVideos, ...uniqueVideos];

        vaultContainer.innerHTML = marqueeSequence.map(v => `
            <div class="vault-card animate-on-scroll" data-src="${v}">
                <video muted loop playsinline src="${v}" controlsList="nodownload" preload="metadata"></video>
                <div class="play-indicator">
                    <div class="play-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                </div>
            </div>
        `).join('');

        initVideoTriggers();
    }

    // 6. Render Client Reviews (Dynamic Section Visibility)
    const reviewsSection = document.getElementById('reviews');
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewsNavBtn = document.querySelector('.nav-links a[href="#reviews"]');

    if (config.reviews) {
        const activeReviews = config.reviews.filter(r => r && r.visible !== false && (r.clientName || r.quote));
        if (activeReviews.length === 0) {
            if (reviewsSection) reviewsSection.style.display = 'none';
            if (reviewsNavBtn) reviewsNavBtn.style.display = 'none';
        } else {
            if (reviewsSection) reviewsSection.style.display = 'block';
            if (reviewsNavBtn) reviewsNavBtn.style.display = 'inline-flex';
            if (reviewsContainer) {
                reviewsContainer.innerHTML = activeReviews.map(rev => {
                    const stars = '★'.repeat(rev.rating || 5);
                    return `
                        <div class="review-card glass-neon-card animate-on-scroll">
                            <div class="review-header">
                                <img src="${rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${rev.clientName}" class="review-avatar">
                                <div class="review-meta">
                                    <h4>${rev.clientName}</h4>
                                    <span class="review-brand">${rev.brand}</span>
                                </div>
                            </div>
                            <div class="review-stars">${stars}</div>
                            <p class="review-quote">"${rev.quote}"</p>
                        </div>
                    `;
                }).join('');
            }
        }
    }

    // 7. Render Socials & Contact Links
    const socialsContainer = document.getElementById('socials-container');
    if (socialsContainer && config.socials) {
        socialsContainer.innerHTML = config.socials.map(soc => `
            <a href="${soc.url}" target="_blank" rel="noopener" class="social-link">${soc.name}</a>
        `).join('');
    }

    if (config.contact) {
        const emailVal = config.contact.email || "khanratul201258@gmail.com";
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailVal)}&su=${encodeURIComponent("Performance Creative Inquiry")}`;

        const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
        mailLinks.forEach(mailLink => {
            mailLink.href = `mailto:${emailVal}`;
        });

        document.querySelectorAll('.direct-email-trigger').forEach(el => {
            if (el.tagName === 'A') {
                el.href = gmailComposeUrl;
                el.target = '_blank';
                el.rel = 'noopener';
            }
        });

        document.querySelectorAll('.direct-email-display-text').forEach(el => {
            el.textContent = emailVal;
        });

        const calLinks = document.querySelectorAll('a[href*="calendly"]');
        calLinks.forEach(calLink => {
            if (config.contact.calendly) {
                calLink.href = config.contact.calendly;
            }
        });
    }

    // 8. Render Homepage Bottom CTA Section
    if (config.ctaHeader) {
        const ctaKicker = document.querySelector('.cta-card .section-kicker');
        const ctaTitle = document.querySelector('.cta-title');
        const ctaSub = document.querySelector('.cta-sub');
        const ctaBtnSpan = document.querySelector('.cta-card .btn-primary-3d span');

        if (ctaKicker && config.ctaHeader.kicker) ctaKicker.textContent = config.ctaHeader.kicker;
        if (ctaTitle && config.ctaHeader.title) ctaTitle.innerHTML = config.ctaHeader.title;
        if (ctaSub && config.ctaHeader.subline) ctaSub.innerHTML = config.ctaHeader.subline;
        if (ctaBtnSpan && config.ctaHeader.buttonText) ctaBtnSpan.textContent = config.ctaHeader.buttonText;
    }

    initAllVideosAutoplay();
}

function initAllVideosAutoplay() {
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const vid = entry.target;
                if (vid.id === 'modal-showreel-player') return;
                if (entry.isIntersecting) {
                    vid.muted = true;
                    vid.play().catch(() => {});
                } else {
                    vid.pause();
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('video').forEach(vid => {
            if (vid.id !== 'modal-showreel-player') {
                videoObserver.observe(vid);
            }
        });
    } else {
        document.querySelectorAll('video').forEach(vid => {
            if (vid.id !== 'modal-showreel-player') {
                vid.muted = true;
                vid.play().catch(() => {});
            }
        });
    }
}

function showToast(msg) {
    let toast = document.getElementById('custom-site-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'custom-site-toast';
        toast.className = 'custom-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initCardDeck() {
    const wrapper = document.getElementById('cluster-wrapper');
    if (!wrapper) return;

    let cards = Array.from(wrapper.querySelectorAll('.cluster-card'));
    if (cards.length === 0) return;

    let currentIndex = cards.findIndex(c => c.classList.contains('pos-front'));
    if (currentIndex === -1) currentIndex = 0;

    function renderDeck() {
        const total = cards.length;
        cards.forEach((card, index) => {
            card.classList.remove('pos-front', 'pos-left', 'pos-right', 'pos-hidden');

            const diff = (index - currentIndex + total) % total;

            if (diff === 0) {
                card.classList.add('pos-front');
            } else if (diff === 1 || (total === 2 && diff === 1)) {
                card.classList.add('pos-right');
            } else if (diff === total - 1) {
                card.classList.add('pos-left');
            } else {
                card.classList.add('pos-hidden');
            }
        });
    }

    function rotateNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        renderDeck();
    }

    function rotatePrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        renderDeck();
    }

    const prevArrow = document.getElementById('deck-arrow-prev');
    const nextArrow = document.getElementById('deck-arrow-next');

    if (prevArrow) prevArrow.addEventListener('click', (e) => { e.stopPropagation(); rotatePrev(); });
    if (nextArrow) nextArrow.addEventListener('click', (e) => { e.stopPropagation(); rotateNext(); });

    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('pos-front')) {
                const videoSrc = card.getAttribute('data-src');
                if (videoSrc) openVideoModal(videoSrc, 'hero');
            } else {
                e.stopPropagation();
                currentIndex = index;
                renderDeck();
            }
        });
    });

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    wrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) rotateNext();
            else rotatePrev();
        }
    }, { passive: true });

    wrapper.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
    });

    wrapper.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) rotateNext();
            else rotatePrev();
        }
    });

    renderDeck();
}

function initVideoTriggers() {
    document.addEventListener('click', (e) => {
        const projectTrigger = e.target.closest('.project-visual');
        if (projectTrigger) {
            const src = projectTrigger.getAttribute('data-src');
            if (src) openVideoModal(src, 'projects');
            return;
        }

        const aiTrigger = e.target.closest('.ai-card-media');
        if (aiTrigger) {
            const src = aiTrigger.getAttribute('data-src');
            if (src) openVideoModal(src, 'method');
            return;
        }

        const vaultTrigger = e.target.closest('.vault-card');
        if (vaultTrigger) {
            const src = vaultTrigger.getAttribute('data-src');
            if (src) openVideoModal(src, 'method');
            return;
        }
    });
}

function initCustomPlayer() {
    const player = document.getElementById('modal-showreel-player');
    const wrapper = document.getElementById('custom-player-wrapper');
    const overlayScreen = document.getElementById('player-overlay-screen');
    const centerPlayBtn = document.getElementById('center-play-btn');
    const playBtn = document.getElementById('player-play-btn');
    const scrubContainer = document.getElementById('player-scrub-container');
    const scrubBar = document.getElementById('player-scrub-bar');
    const timeDisplay = document.getElementById('player-time-display');
    const muteBtn = document.getElementById('player-mute-btn');
    const fullscreenBtn = document.getElementById('player-fullscreen-btn');
    const controlsBar = document.getElementById('player-controls-bar');

    if (!player || !wrapper) return;

    const metaBadge = document.getElementById('player-meta-badge');
    let controlsTimeout;

    function resetControlsTimer() {
        if (controlsBar) controlsBar.classList.remove('controls-hidden');
        if (overlayScreen) overlayScreen.classList.remove('controls-hidden');

        clearTimeout(controlsTimeout);
        if (!player.paused) {
            controlsTimeout = setTimeout(() => {
                if (!player.paused) {
                    if (controlsBar) controlsBar.classList.add('controls-hidden');
                    if (overlayScreen) overlayScreen.classList.add('controls-hidden');
                }
            }, 900);
        }
    }

    wrapper.addEventListener('mousemove', resetControlsTimer);
    wrapper.addEventListener('touchstart', resetControlsTimer, { passive: true });
    wrapper.addEventListener('mouseleave', () => {
        if (!player.paused) {
            if (controlsBar) controlsBar.classList.add('controls-hidden');
            if (overlayScreen) overlayScreen.classList.add('controls-hidden');
        }
    });

    player.addEventListener('ended', () => {
        if (!modalPlaylist.length) return;
        currentModalVideoIndex = (currentModalVideoIndex + 1) % modalPlaylist.length;
        updateModal3DDeck();
    });

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function updatePlayIcons() {
        const iconPlay = playBtn?.querySelector('.icon-play');
        const iconPause = playBtn?.querySelector('.icon-pause');
        const iconCenterPlay = centerPlayBtn?.querySelector('.icon-center-play');
        const iconCenterPause = centerPlayBtn?.querySelector('.icon-center-pause');

        if (player.paused) {
            if (iconPlay) iconPlay.style.display = 'block';
            if (iconPause) iconPause.style.display = 'none';
            if (iconCenterPlay) iconCenterPlay.style.display = 'block';
            if (iconCenterPause) iconCenterPause.style.display = 'none';
            if (controlsBar) controlsBar.classList.remove('controls-hidden');
            if (overlayScreen) overlayScreen.classList.remove('controls-hidden');
        } else {
            if (iconPlay) iconPlay.style.display = 'none';
            if (iconPause) iconPause.style.display = 'block';
            if (iconCenterPlay) iconCenterPlay.style.display = 'none';
            if (iconCenterPause) iconCenterPause.style.display = 'block';
            resetControlsTimer();
        }
    }

    function togglePlay() {
        if (player.paused) {
            player.play().then(updatePlayIcons).catch(() => {});
        } else {
            player.pause();
            updatePlayIcons();
        }
    }

    if (overlayScreen) overlayScreen.addEventListener('click', togglePlay);
    if (centerPlayBtn) centerPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
    if (playBtn) playBtn.addEventListener('click', togglePlay);

    player.addEventListener('timeupdate', () => {
        if (player.duration) {
            const pct = (player.currentTime / player.duration) * 100;
            if (scrubBar) scrubBar.style.width = `${pct}%`;
            if (timeDisplay) timeDisplay.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;
        }
    });

    if (scrubContainer) {
        let isScrubbing = false;

        function scrub(e) {
            const rect = scrubContainer.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            if (player.duration) player.currentTime = pos * player.duration;
        }

        scrubContainer.addEventListener('mousedown', (e) => {
            isScrubbing = true;
            scrub(e);
        });

        window.addEventListener('mousemove', (e) => {
            if (isScrubbing) scrub(e);
        });

        window.addEventListener('mouseup', () => isScrubbing = false);
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            player.muted = !player.muted;
            const iconUnmute = muteBtn.querySelector('.icon-unmute');
            const iconMute = muteBtn.querySelector('.icon-mute');

            if (player.muted) {
                if (iconUnmute) iconUnmute.style.display = 'none';
                if (iconMute) iconMute.style.display = 'block';
            } else {
                if (iconUnmute) iconUnmute.style.display = 'block';
                if (iconMute) iconMute.style.display = 'none';
            }
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                wrapper.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        });
    }

    player.addEventListener('loadedmetadata', () => {
        if (player.videoHeight > player.videoWidth) {
            wrapper.style.aspectRatio = '9/16';
            wrapper.style.maxWidth = '360px';
        } else {
            wrapper.style.aspectRatio = '16/9';
            wrapper.style.maxWidth = '880px';
        }
        updatePlayIcons();
    });
}

let modalPlaylist = [];
let currentModalVideoIndex = 0;

function getAllSiteVideos() {
    const config = getActiveConfig();
    const list = [];
    if (config) {
        if (config.hero?.deck?.center?.video) list.push(config.hero.deck.center.video);
        if (config.hero?.deck?.left?.video) list.push(config.hero.deck.left.video);
        if (config.hero?.deck?.right?.video) list.push(config.hero.deck.right.video);
        if (config.projects) config.projects.forEach(p => p.video && list.push(p.video));
        if (config.methodVideos) config.methodVideos.forEach(v => v && list.push(v));
    }
    return Array.from(new Set(list.filter(Boolean)));
}

function getVideoMetadataTitle(src) {
    const config = getActiveConfig();
    if (!config || !src) return '✦ CREATIVE SHOWCASE';

    if (modalPlaylist.length === (config.methodVideos?.length || 0) && config.methodVideos?.includes(src)) {
        const idx = config.methodVideos.indexOf(src) + 1;
        return `✦ STRATEGY VAULT CASE 0${idx}`;
    }

    if (modalPlaylist.length === (config.projects?.length || 0) && config.projects?.some(p => p.video === src)) {
        const found = config.projects.find(p => p.video === src);
        if (found && found.title) return `✦ ${found.title.toUpperCase()}`;
    }

    if (config.hero?.deck?.center?.video === src) return config.hero.deck.center.badge || '✦ TALKING HEAD AD';
    if (config.hero?.deck?.left?.video === src) return config.hero.deck.left.badge || '✦ AI MOTION FX';
    if (config.hero?.deck?.right?.video === src) return config.hero.deck.right.badge || '✦ DIRECT TO DTC';

    if (config.projects) {
        const found = config.projects.find(p => p.video === src);
        if (found && found.title) return `✦ ${found.title.toUpperCase()}`;
    }

    if (config.methodVideos && config.methodVideos.includes(src)) {
        const idx = config.methodVideos.indexOf(src) + 1;
        return `✦ STRATEGY VAULT CASE 0${idx}`;
    }

    return '✦ CREATIVE SHOWCASE';
}

function updateModal3DDeck() {
    if (!modalPlaylist.length) return;
    const len = modalPlaylist.length;
    const player = document.getElementById('modal-showreel-player');

    const srcCenter = modalPlaylist[currentModalVideoIndex];
    if (player && player.getAttribute('data-active-src') !== srcCenter) {
        player.setAttribute('data-active-src', srcCenter);
        player.src = srcCenter;
        player.play().catch(() => {});
    }

    const metaBadgeText = document.getElementById('meta-badge-text');
    if (metaBadgeText) {
        metaBadgeText.textContent = getVideoMetadataTitle(srcCenter);
    }

    const cardL2 = document.getElementById('modal-card-left2');
    const cardL1 = document.getElementById('modal-card-left1');
    const cardR1 = document.getElementById('modal-card-right1');
    const cardR2 = document.getElementById('modal-card-right2');

    const vidL2 = cardL2?.querySelector('video');
    const vidL1 = cardL1?.querySelector('video');
    const vidR1 = cardR1?.querySelector('video');
    const vidR2 = cardR2?.querySelector('video');

    if (len < 5) {
        if (cardL2) cardL2.style.setProperty('display', 'none', 'important');
        if (cardR2) cardR2.style.setProperty('display', 'none', 'important');
        if (vidL2) { vidL2.removeAttribute('src'); vidL2.removeAttribute('data-active-src'); vidL2.load(); }
        if (vidR2) { vidR2.removeAttribute('src'); vidR2.removeAttribute('data-active-src'); vidR2.load(); }

        const srcL1 = modalPlaylist[(currentModalVideoIndex - 1 + len) % len];
        const srcR1 = modalPlaylist[(currentModalVideoIndex + 1) % len];

        if (vidL1) {
            if (vidL1.getAttribute('data-active-src') !== srcL1) {
                vidL1.setAttribute('data-active-src', srcL1);
                vidL1.src = srcL1;
            }
            vidL1.pause();
            vidL1.currentTime = 0.1;
        }
        if (vidR1) {
            if (vidR1.getAttribute('data-active-src') !== srcR1) {
                vidR1.setAttribute('data-active-src', srcR1);
                vidR1.src = srcR1;
            }
            vidR1.pause();
            vidR1.currentTime = 0.1;
        }
    } else {
        if (cardL2) cardL2.style.setProperty('display', 'block', 'important');
        if (cardR2) cardR2.style.setProperty('display', 'block', 'important');

        const sideCards = [
            { el: vidL2, src: modalPlaylist[(currentModalVideoIndex - 2 + len) % len] },
            { el: vidL1, src: modalPlaylist[(currentModalVideoIndex - 1 + len) % len] },
            { el: vidR1, src: modalPlaylist[(currentModalVideoIndex + 1) % len] },
            { el: vidR2, src: modalPlaylist[(currentModalVideoIndex + 2) % len] }
        ];

        sideCards.forEach(item => {
            if (item.el) {
                if (item.el.getAttribute('data-active-src') !== item.src) {
                    item.el.setAttribute('data-active-src', item.src);
                    item.el.src = item.src;
                }
                item.el.pause();
                item.el.currentTime = 0.1;
            }
        });
    }
}

function openVideoModal(src, context = 'all') {
    const modal = document.getElementById('showreel-modal');
    const player = document.getElementById('modal-showreel-player');
    const controlsBar = document.getElementById('player-controls-bar');
    const overlayScreen = document.getElementById('player-overlay-screen');
    const metaBadge = document.getElementById('player-meta-badge');
    const config = getActiveConfig();

    document.querySelectorAll('section video').forEach(v => v.pause());

    if (context === 'hero') {
        modalPlaylist = [
            config.hero?.deck?.center?.video,
            config.hero?.deck?.right?.video,
            config.hero?.deck?.left?.video
        ].filter(Boolean);
    } else if (context === 'projects') {
        modalPlaylist = (config.projects || []).map(p => p.video).filter(Boolean);
    } else if (context === 'method') {
        modalPlaylist = (config.methodVideos || []).filter(Boolean);
    } else if (config?.hero?.deck && [config.hero.deck.center?.video, config.hero.deck.left?.video, config.hero.deck.right?.video].includes(src)) {
        modalPlaylist = [
            config.hero?.deck?.center?.video,
            config.hero?.deck?.right?.video,
            config.hero?.deck?.left?.video
        ].filter(Boolean);
    } else if (config?.projects && config.projects.some(p => p.video === src)) {
        modalPlaylist = (config.projects || []).map(p => p.video).filter(Boolean);
    } else if (config?.methodVideos && config.methodVideos.includes(src)) {
        modalPlaylist = (config.methodVideos || []).filter(Boolean);
    } else {
        modalPlaylist = getAllSiteVideos();
    }

    if (!modalPlaylist.includes(src)) modalPlaylist.unshift(src);
    currentModalVideoIndex = modalPlaylist.indexOf(src);

    if (modal && player) {
        modal.classList.add('is-open');
        if (controlsBar) controlsBar.classList.remove('controls-hidden');
        if (overlayScreen) overlayScreen.classList.remove('controls-hidden');
        if (metaBadge) metaBadge.classList.remove('controls-hidden');

        updateModal3DDeck();
    }
}

function initModals() {
    const showreelModal = document.getElementById('showreel-modal');
    const showreelPlayer = document.getElementById('modal-showreel-player');
    const closeShowreel = document.getElementById('modal-close-showreel');

    const contactModal = document.getElementById('contact-modal');
    const closeContact = document.getElementById('modal-close-contact');

    const reviewModal = document.getElementById('review-modal');
    const closeReview = document.getElementById('modal-close-review');
    const openReviewBtn = document.getElementById('open-review-modal-btn');

    const optionsStack = document.getElementById('contact-options-stack');
    const bookingForm = document.getElementById('strategy-booking-form');
    const triggerFormBtn = document.getElementById('trigger-form-choice');
    const backBtn = document.getElementById('back-to-options-btn');

    function resetContactModalState() {
        if (optionsStack) {
            optionsStack.classList.remove('is-hidden');
            optionsStack.style.display = 'flex';
        }
        if (bookingForm) {
            bookingForm.style.display = 'none';
        }
        const modalTitle = document.querySelector('#contact-modal .modal-card-title');
        const modalSub = document.querySelector('#contact-modal .modal-card-sub');
        if (modalTitle) {
            modalTitle.innerHTML = 'Start The <span class="highlight-cyan">Conversation</span>';
        }
        if (modalSub) {
            modalSub.textContent = 'Ready to engineer your performance creative?';
        }
    }

    function closeAllModals() {
        if (showreelModal) showreelModal.classList.remove('is-open');
        if (contactModal) contactModal.classList.remove('is-open');
        if (reviewModal) reviewModal.classList.remove('is-open');
        if (showreelPlayer) {
            showreelPlayer.pause();
            showreelPlayer.currentTime = 0;
        }
        resetContactModalState();

        document.querySelectorAll('section video').forEach(v => {
            v.muted = true;
            v.play().catch(() => {});
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });

    if (closeShowreel) closeShowreel.addEventListener('click', closeAllModals);
    if (closeContact) closeContact.addEventListener('click', closeAllModals);
    if (closeReview) closeReview.addEventListener('click', closeAllModals);

    const modalPrevBtn = document.getElementById('modal-prev-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');

    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            if (!modalPlaylist.length) return;
            currentModalVideoIndex = (currentModalVideoIndex - 1 + modalPlaylist.length) % modalPlaylist.length;
            updateModal3DDeck();
        });
    }

    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            if (!modalPlaylist.length) return;
            currentModalVideoIndex = (currentModalVideoIndex + 1) % modalPlaylist.length;
            updateModal3DDeck();
        });
    }

    document.getElementById('modal-card-left1')?.addEventListener('click', () => {
        if (!modalPlaylist.length) return;
        currentModalVideoIndex = (currentModalVideoIndex - 1 + modalPlaylist.length) % modalPlaylist.length;
        updateModal3DDeck();
    });

    document.getElementById('modal-card-left2')?.addEventListener('click', () => {
        if (!modalPlaylist.length) return;
        currentModalVideoIndex = (currentModalVideoIndex - 2 + modalPlaylist.length) % modalPlaylist.length;
        updateModal3DDeck();
    });

    document.getElementById('modal-card-right1')?.addEventListener('click', () => {
        if (!modalPlaylist.length) return;
        currentModalVideoIndex = (currentModalVideoIndex + 1) % modalPlaylist.length;
        updateModal3DDeck();
    });

    document.getElementById('modal-card-right2')?.addEventListener('click', () => {
        if (!modalPlaylist.length) return;
        currentModalVideoIndex = (currentModalVideoIndex + 2) % modalPlaylist.length;
        updateModal3DDeck();
    });

    if (openReviewBtn && reviewModal) {
        openReviewBtn.addEventListener('click', () => {
            reviewModal.classList.add('is-open');
        });
    }

    document.querySelectorAll('.direct-email-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const config = typeof getActiveConfig === 'function' ? getActiveConfig() : (typeof siteConfig !== 'undefined' ? siteConfig : {});
            const targetEmail = config?.contact?.email || "khanratul201258@gmail.com";
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(targetEmail).then(() => {
                    showToast(`Email copied: ${targetEmail}`);
                }).catch(() => {});
            }

            const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent("Performance Creative Inquiry")}`;
            if (trigger.tagName !== 'A' || !trigger.href || trigger.href.includes('mailto:')) {
                e.preventDefault();
                window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
            }
        });
    });

    const secFormTrigger = document.getElementById('section-trigger-form-choice');
    if (secFormTrigger) {
        secFormTrigger.addEventListener('click', () => {
            const formInput = document.getElementById('sec-form-name');
            if (formInput) {
                formInput.focus();
                formInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    document.querySelectorAll('.contact-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            resetContactModalState();
            if (contactModal) contactModal.classList.add('is-open');
        });
    });

    if (triggerFormBtn && optionsStack && bookingForm) {
        triggerFormBtn.addEventListener('click', () => {
            optionsStack.classList.add('is-hidden');
            optionsStack.style.display = 'none';
            bookingForm.style.display = 'flex';
            const modalTitle = document.querySelector('#contact-modal .modal-card-title');
            const modalSub = document.querySelector('#contact-modal .modal-card-sub');
            if (modalTitle) {
                modalTitle.innerHTML = 'Strategy Brief <span class="highlight-cyan">Inquiry</span>';
            }
            if (modalSub) {
                modalSub.textContent = 'Fill in your project details to get a customized performance creative audit.';
            }
        });
    }

    if (backBtn && optionsStack && bookingForm) {
        backBtn.addEventListener('click', () => {
            resetContactModalState();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === showreelModal || e.target === contactModal || e.target === reviewModal) {
            closeAllModals();
        }
    });
}

async function sendAdminNotificationEmail(formData) {
    const config = typeof getActiveConfig === 'function' ? getActiveConfig() : (typeof siteConfig !== 'undefined' ? siteConfig : {});
    const adminEmail = config?.contact?.email || "khanratul201258@gmail.com";
    
    try {
        await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: 'c90bf43d-2401-4475-80a5-f9380918730b',
                to_email: adminEmail,
                subject: `🚀 New Strategy Brief Submission from ${formData.name}`,
                from_name: formData.name,
                replyto: formData.email,
                message: `New Strategy Brief Received on Live Site:\n\nClient Name: ${formData.name}\nEmail: ${formData.email}\nBrand / URL: ${formData.url || 'N/A'}\nMonthly Spend: ${formData.spend || 'N/A'}\n\nProject Brief / Goals:\n${formData.brief || 'N/A'}\n\n--- Sent automatically to Admin (${adminEmail}) ---`
            })
        });
    } catch (e) {
        console.warn('Form email notification queued:', e);
    }
}

function initForms() {
    const bookingForm = document.getElementById('strategy-booking-form');
    const successMsg = document.getElementById('booking-success-msg');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('.submit-booking-btn');
            if (submitBtn) submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('form-name')?.value || '',
                email: document.getElementById('form-email')?.value || '',
                url: document.getElementById('form-url')?.value || '',
                spend: document.getElementById('form-spend')?.value || '',
                brief: document.getElementById('form-brief')?.value || ''
            };

            await sendAdminNotificationEmail(formData);

            if (successMsg) {
                successMsg.style.display = 'block';
                bookingForm.reset();
                showToast("✅ Notification emailed to admin! We will respond within 24h.");
                setTimeout(() => {
                    successMsg.style.display = 'none';
                    if (submitBtn) submitBtn.disabled = false;
                    if (typeof resetContactModalState === 'function') resetContactModalState();
                    const contactModal = document.getElementById('contact-modal');
                    if (contactModal) contactModal.classList.remove('is-open');
                }, 3000);
            }
        });
    }

    const secBookingForm = document.getElementById('section-strategy-booking-form');
    const secSuccessMsg = document.getElementById('sec-booking-success-msg');

    if (secBookingForm) {
        secBookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const secSubmitBtn = secBookingForm.querySelector('button[type="submit"]');
            if (secSubmitBtn) secSubmitBtn.disabled = true;

            const formData = {
                name: document.getElementById('sec-form-name')?.value || '',
                email: document.getElementById('sec-form-email')?.value || '',
                url: document.getElementById('sec-form-url')?.value || '',
                spend: document.getElementById('sec-form-spend')?.value || '',
                brief: document.getElementById('sec-form-brief')?.value || ''
            };

            await sendAdminNotificationEmail(formData);

            if (secSuccessMsg) {
                secSuccessMsg.style.display = 'block';
                secBookingForm.reset();
                showToast("✅ Strategy inquiry sent! Notification emailed to admin.");
                setTimeout(() => {
                    secSuccessMsg.style.display = 'none';
                    if (secSubmitBtn) secSubmitBtn.disabled = false;
                }, 4000);
            }
        });
    }

    const reviewForm = document.getElementById('submit-review-form');
    const reviewModal = document.getElementById('review-modal');

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const config = getActiveConfig() || {};
            if (!config.reviews) config.reviews = [];

            const name = document.getElementById('rev-name').value;
            const brand = document.getElementById('rev-brand').value;
            const rating = parseInt(document.getElementById('rev-rating').value, 10);
            const quote = document.getElementById('rev-quote').value;

            config.reviews.unshift({
                id: Date.now(),
                clientName: name,
                brand: brand,
                rating: rating,
                quote: quote,
                visible: true,
                avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
            });

            try {
                localStorage.setItem('my_site_config', JSON.stringify(config));
            } catch(err){}

            buildSiteFromConfig();
            if (reviewModal) reviewModal.classList.remove('is-open');
            reviewForm.reset();
            alert('✦ Thank you! Your client review has been published live to the website.');
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function init3DTiltCards() {
    document.querySelectorAll('.perf-card, .about-card, .cta-card, .ai-workflow-box, .n8n-node-card, .ai-node-card, .dynamic-island-container').forEach(card => {
        let ticking = false;
        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -7;
                    const rotateY = ((x - centerX) / centerX) * 7;

                    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale(1.01)`;
                    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`;
        });
    });
}

function initScrollNavbar() {
    const nav = document.querySelector('.premium-nav');
    if (!nav) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

function initScrollspy() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    if (!navLinks.length || !sections.length) return;

    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 250;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
}

function initCreativeShowcaseTabs() {
    const tabBtns = document.querySelectorAll('.showcase-tab-btn');
    const tabPanels = document.querySelectorAll('.showcase-tab-panel');
    const stepItems = document.querySelectorAll('.pipeline-step-item');

    function activateTab(tabId) {
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabPanels.forEach(panel => {
            if (panel.id === tabId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            if (tabId) activateTab(tabId);
        });
    });

    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            stepItems.forEach(s => s.classList.remove('active'));
            item.classList.add('active');
            const targetTab = item.getAttribute('data-tab-target');
            if (targetTab) activateTab(targetTab);
        });
    });

    document.querySelectorAll('.video-preview-wrapper[data-src]').forEach(wrap => {
        wrap.addEventListener('click', () => {
            const src = wrap.getAttribute('data-src');
            if (src && typeof openVideoModal === 'function') {
                openVideoModal(src, 'showcase');
            }
        });
    });
}

function initVerticalScrollIndicator() {
    const barFill = document.getElementById('v-scroll-bar-fill');
    const indicator = document.getElementById('vertical-scroll-indicator');
    const nodes = document.querySelectorAll('.v-scroll-node');
    const sections = document.querySelectorAll('section[id]');
    if (!indicator || !barFill || !nodes.length || !sections.length) return;

    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        let progress = 0;
        if (scrollHeight > 0) {
            progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
        }
        
        barFill.style.height = `${progress}%`;

        // Determine active section
        let activeId = '';
        const scrollPos = scrollTop + (window.innerHeight * 0.35);

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                activeId = sec.getAttribute('id');
            }
        });

        // Update node active states
        let passedActive = true;
        nodes.forEach(node => {
            const sectionId = node.getAttribute('data-section');
            if (sectionId === activeId) {
                node.classList.add('active');
                node.classList.remove('passed');
                passedActive = false;
            } else {
                node.classList.remove('active');
                if (passedActive) {
                    node.classList.add('passed');
                } else {
                    node.classList.remove('passed');
                }
            }
        });
    }

    // Node click to smooth scroll section into view
    nodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = node.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
}