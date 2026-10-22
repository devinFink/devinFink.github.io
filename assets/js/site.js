// Small progressive enhancements. Every page works without this file.
(function () {
    'use strict';

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    // Nav gets a border once the page scrolls.
    const nav = $('#site-nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Home: filter project cards by category.
    const filters = $$('.filter');
    filters.forEach(btn => btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        filters.forEach(b => {
            b.classList.toggle('is-active', b === btn);
            b.setAttribute('aria-pressed', b === btn);
        });
        $$('.card-grid .card').forEach(card => {
            card.classList.toggle('is-hidden', f !== 'all' && card.dataset.category !== f);
        });
    }));

    // Cards with a preview clip play it on hover.
    $$('.card[data-video]').forEach(card => {
        const video = $('video', card);
        if (!video) return;
        card.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
        card.addEventListener('mouseleave', () => { video.pause(); });
    });

    // YouTube embeds load only when clicked.
    $$('.yt-facade').forEach(btn => btn.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
        iframe.title = btn.getAttribute('aria-label') || 'Video';
        iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        btn.replaceWith(iframe);
    }));

    // Before/after sliders.
    $$('.compare').forEach(el => {
        const input = $('input[type=range]', el);
        input.addEventListener('input', () => el.style.setProperty('--pos', input.value + '%'));
    });

    // Case-study table of contents with scroll highlighting.
    const toc = $('#toc');
    const content = $('.case-content');
    if (toc && content) {
        const headings = $$('h2[id], h3[id]', content);
        if (headings.length > 2) {
            const list = $('ol', toc);
            const links = headings.map(h => {
                const li = document.createElement('li');
                if (h.tagName === 'H3') li.className = 'toc-sub';
                const a = document.createElement('a');
                a.href = '#' + h.id;
                a.textContent = h.textContent;
                li.appendChild(a);
                list.appendChild(li);
                return a;
            });
            toc.hidden = false;

            const setActive = () => {
                const y = window.scrollY + window.innerHeight * 0.25;
                let current = 0;
                headings.forEach((h, i) => { if (h.offsetTop <= y) current = i; });
                links.forEach((a, i) => a.classList.toggle('is-active', i === current));
            };
            setActive();
            window.addEventListener('scroll', setActive, { passive: true });
        }
    }

    // Lightbox for every .zoomable link (figures, gallery, hero image).
    const zoomables = $$('a.zoomable');
    if (zoomables.length) {
        const lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.innerHTML =
            '<button class="lb-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
            '<button class="lb-prev" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>' +
            '<button class="lb-next" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>' +
            '<img alt=""><div class="lightbox-caption"></div>';
        document.body.appendChild(lb);
        const img = $('img', lb);
        const cap = $('.lightbox-caption', lb);
        let index = 0;
        let opener = null;

        const show = i => {
            index = (i + zoomables.length) % zoomables.length;
            const a = zoomables[index];
            img.src = a.href;
            img.alt = a.dataset.caption || '';
            cap.textContent = a.dataset.caption || '';
        };
        const open = i => {
            opener = document.activeElement;
            show(i);
            lb.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            $('.lb-close', lb).focus();
        };
        const close = () => {
            lb.classList.remove('is-open');
            document.body.style.overflow = '';
            if (opener) opener.focus();
        };

        zoomables.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); open(i); }));
        $('.lb-close', lb).addEventListener('click', close);
        $('.lb-prev', lb).addEventListener('click', () => show(index - 1));
        $('.lb-next', lb).addEventListener('click', () => show(index + 1));
        lb.addEventListener('click', e => { if (e.target === lb) close(); });
        document.addEventListener('keydown', e => {
            if (!lb.classList.contains('is-open')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });
        if (zoomables.length < 2) $$('.lb-prev, .lb-next', lb).forEach(b => { b.hidden = true; });
    }
})();
