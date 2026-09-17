/* Shared interactions. No build tools or third-party JavaScript required. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const photos = typeof galleryData !== 'undefined' ? galleryData : [];
  const container = $('#gallery-container');
  const photoDialog = $('#photo-dialog');
  const contactDialog = $('#contact-dialog');
  let visiblePhotos = [...photos];
  let lightboxPhotos = [];
  let currentPhoto = 0;
  let lastFocus = null;
  let imageRequest = 0;

  function syncScrollLock() {
    document.body.classList.toggle('modal-open', $$('dialog[open]').length > 0);
  }
  function openDialog(dialog, trigger) {
    if (!dialog || dialog.open) return;
    lastFocus = trigger || document.activeElement;
    dialog.showModal();
    syncScrollLock();
  }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      imageRequest += 1;
      syncScrollLock();
      if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });
  $$('[data-contact]').forEach(button => button.addEventListener('click', () => {
    const qr = $('.qr-frame img', contactDialog);
    if (!qr.hasAttribute('src')) qr.src = qr.dataset.src;
    openDialog(contactDialog, button);
  }));
  $('[data-close-contact]')?.addEventListener('click', () => contactDialog.close());
  $('[data-close-photo]')?.addEventListener('click', () => photoDialog.close());

  function makeCard(photo, index) {
    const figure = document.createElement('figure');
    figure.className = 'photo-card';
    figure.dataset.category = photo.category;
    const link = document.createElement('a');
    link.href = photo.src;
    link.className = 'photo-link';
    link.dataset.photoId = photo.id;
    link.setAttribute('aria-label', `查看照片：${photo.title}，${photo.location}`);
    const img = new Image(photo.width, photo.height);
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      if (link.classList.contains('is-error')) return;
      link.classList.add('is-error');
      const note = document.createElement('span');
      note.className = 'image-failure';
      note.textContent = '照片暂时未加载，点击重试';
      link.append(note);
    });
    img.src = photo.src;
    const expand = document.createElement('span');
    expand.className = 'photo-overlay';
    expand.setAttribute('aria-hidden', 'true');
    expand.textContent = '↗';
    link.append(img, expand);
    const caption = document.createElement('figcaption');
    const title = document.createElement('h3');
    title.textContent = photo.title;
    const meta = document.createElement('span');
    meta.className = 'photo-meta';
    const place = document.createElement('span');
    place.textContent = photo.location;
    const number = document.createElement('span');
    number.className = 'photo-number';
    number.textContent = String(index + 1).padStart(3, '0');
    meta.append(place, number);
    caption.append(title, meta);
    figure.append(link, caption);
    return figure;
  }

  function setFilter(category, updateURL = true) {
    const allowed = $$('[data-filter]').map(button => button.dataset.filter);
    if (!allowed.includes(category)) category = 'all';
    visiblePhotos = photos.filter(photo => category === 'all' || photo.category === category);
    $$('.photo-card', container).forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
    $$('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    $('.gallery-count').textContent = `${visiblePhotos.length} 张作品`;
    if (updateURL && ['http:', 'https:'].includes(location.protocol)) {
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('series');
      else url.searchParams.set('series', category);
      history.replaceState(null, '', url);
    }
  }

  function showPhoto(index) {
    if (!lightboxPhotos.length) return;
    currentPhoto = (index + lightboxPhotos.length) % lightboxPhotos.length;
    const photo = lightboxPhotos[currentPhoto];
    const img = $('#lightbox-image');
    const error = $('.lightbox-error');
    const request = ++imageRequest;
    img.hidden = false;
    error.hidden = true;
    img.classList.add('is-loading');
    img.alt = photo.alt;
    img.src = photo.src;
    $('#photo-title').textContent = `${photo.title} / ${photo.location}`;
    $('#photo-caption').textContent = photo.caption;
    $('#photo-counter').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(lightboxPhotos.length).padStart(2, '0')}`;
    $('#photo-original').href = photo.src;
    $$('.photo-nav').forEach(button => { button.disabled = lightboxPhotos.length <= 1; });
    img.decode().then(() => {
      if (request !== imageRequest) return;
      img.classList.remove('is-loading');
    }).catch(() => {
      if (request !== imageRequest) return;
      img.hidden = true;
      error.hidden = false;
    });
  }

  if (container && photos.length) {
    const categories = typeof galleryCategories !== 'undefined' ? galleryCategories : {};
    const filters = $('.filters');
    const names = new Map([['all', '全部'], ...Object.entries(categories)]);
    photos.forEach(photo => { if (!names.has(photo.category)) names.set(photo.category, photo.category); });
    filters.replaceChildren(...Array.from(names, ([category, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.filter = category;
      button.setAttribute('aria-pressed', String(category === 'all'));
      button.append(document.createTextNode(label + ' '), document.createElement('sup'));
      return button;
    }));
    const cover = photos.find(photo => photo.id === (typeof featuredPhotoId !== 'undefined' ? featuredPhotoId : 'frame-16')) || photos[0];
    const coverLink = $('.featured-frame');
    if (coverLink) {
      coverLink.href = cover.src;
      coverLink.dataset.photoId = cover.id;
      const img = $('img', coverLink);
      img.src = cover.src;
      img.alt = cover.alt;
      img.width = cover.width;
      img.height = cover.height;
      $('.featured').setAttribute('aria-label', `精选作品：${cover.title}`);
      const title = $('.frame-title', coverLink);
      const locationLabel = document.createElement('span');
      locationLabel.textContent = cover.location;
      title.replaceChildren(document.createTextNode(cover.title), locationLabel);
      $('.featured-caption > span').textContent = cover.location;
      $('.featured-caption p').textContent = cover.caption;
    }
    const fragment = document.createDocumentFragment();
    photos.forEach((photo, index) => fragment.append(makeCard(photo, index)));
    container.append(fragment);
    $('.archive-total > span').textContent = String(photos.length).padStart(2, '0');
    $$('[data-filter]').forEach(button => {
      const category = button.dataset.filter;
      $('sup', button).textContent = String(photos.filter(photo => category === 'all' || photo.category === category).length).padStart(2, '0');
      button.addEventListener('click', () => setFilter(category));
    });
    setFilter(new URL(location.href).searchParams.get('series') || 'all', false);
    window.addEventListener('popstate', () => setFilter(new URL(location.href).searchParams.get('series') || 'all', false));
    document.addEventListener('click', event => {
      const link = event.target.closest('[data-photo-id]');
      if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const photo = photos.find(item => item.id === link.dataset.photoId);
      if (!photo || !photoDialog?.showModal) return;
      event.preventDefault();
      if (link.classList.contains('is-error')) {
        const thumbnail = $('img', link);
        link.classList.remove('is-error');
        $('.image-failure', link)?.remove();
        thumbnail.src = photo.src;
      }
      lightboxPhotos = container.contains(link) ? [...visiblePhotos] : [...photos];
      openDialog(photoDialog, link);
      showPhoto(lightboxPhotos.findIndex(item => item.id === photo.id));
    });
    $('.photo-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
    $('.photo-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
    $('[data-retry-photo]').addEventListener('click', () => showPhoto(currentPhoto));
    photoDialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let touchStart = null;
    $('.lightbox-image-wrap').addEventListener('touchstart', event => {
      touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    $('.lightbox-image-wrap').addEventListener('touchmove', event => {
      if (event.touches.length > 1) touchStart = null;
    }, { passive: true });
    $('.lightbox-image-wrap').addEventListener('touchend', event => {
      if (!touchStart || !event.changedTouches.length || (window.visualViewport?.scale || 1) > 1) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) showPhoto(currentPhoto + (dx < 0 ? 1 : -1));
      touchStart = null;
    }, { passive: true });
  }

  // Content lives in journey.js; presentation stays here. Text is never parsed as HTML.
  const journal = $('#journey-chapters');
  if (journal && typeof journeyData !== 'undefined') {
    const fragment = document.createDocumentFragment();
    journeyData.forEach(item => {
      const chapter = document.createElement('section');
      chapter.className = `chapter${item.quote ? ' quote-chapter' : ''}`;
      chapter.id = item.id;
      const kicker = document.createElement('div');
      kicker.className = 'chapter-kicker';
      const heading = document.createElement('h2');
      heading.id = `${item.id}-title`;
      heading.textContent = item.title;
      chapter.setAttribute('aria-labelledby', heading.id);
      const body = document.createElement('div');
      body.className = 'chapter-text';
      item.blocks.forEach(block => {
        if (typeof block.text === 'string') {
          const paragraph = document.createElement('p');
          paragraph.textContent = block.text;
          body.append(paragraph);
        } else if (block.image) {
          const figure = document.createElement('figure');
          figure.className = 'journal-evidence';
          const link = document.createElement('a');
          // Relative media paths are rooted at the project, on either page.
          link.href = new URL(block.image, new URL('../', location.href)).href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          const img = new Image();
          img.src = link.href;
          img.alt = block.alt || '';
          img.loading = 'lazy';
          img.decoding = 'async';
          if (block.width && block.height) { img.width = block.width; img.height = block.height; }
          link.append(img);
          figure.append(link);
          if (block.caption) {
            const caption = document.createElement('figcaption');
            caption.textContent = block.caption;
            figure.append(caption);
          }
          body.append(figure);
        }
      });
      chapter.append(kicker, heading, body);
      fragment.append(chapter);
    });
    journal.replaceChildren(fragment);
  }
  const chapters = $$('.journal-article .chapter');
  const chapterNavigation = $('.chapter-sidebar nav');
  if (chapters.length && chapterNavigation) {
    const total = String(chapters.length).padStart(2, '0');
    const links = document.createDocumentFragment();
    chapters.forEach((chapter, index) => {
      const number = String(index + 1).padStart(2, '0');
      const heading = $('h2', chapter);
      const kicker = $('.chapter-kicker', chapter);
      if (kicker) kicker.textContent = `CHAPTER ${number} / ${total}`;
      const link = document.createElement('a');
      link.href = `#${chapter.id}`;
      const label = document.createElement('span');
      label.textContent = number;
      link.append(label, heading?.textContent || `第 ${index + 1} 章`);
      links.append(link);
    });
    chapterNavigation.replaceChildren(links);
    $$('[data-chapter-count]').forEach(label => { label.textContent = total; });
    $('.journal-article').setAttribute('aria-label', `${chapters.length} 章旅行独白`);
  }

  const chapterToggle = $('.chapter-toggle');
  const mobileJournal = matchMedia('(max-width: 760px)');
  function setChapterMenu(open) {
    $('.chapter-sidebar')?.classList.toggle('is-expanded', open);
    chapterToggle?.setAttribute('aria-expanded', String(!mobileJournal.matches || open));
    if (chapterToggle) $('span', chapterToggle).textContent = open ? '−' : '＋';
  }
  chapterToggle?.addEventListener('click', () => {
    if (mobileJournal.matches) setChapterMenu(chapterToggle.getAttribute('aria-expanded') !== 'true');
  });
  chapterNavigation?.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !mobileJournal.matches) return;
    // Collapse before scrolling, so the sticky menu cannot cover the chapter.
    event.preventDefault();
    setChapterMenu(false);
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    if (['http:', 'https:'].includes(location.protocol)) history.replaceState(null, '', link.hash);
    if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
  });
  mobileJournal.addEventListener('change', () => setChapterMenu(false));
  setChapterMenu(false);
  // Deep links must be resolved after the data-driven chapters exist.
  if (journal && location.hash) requestAnimationFrame(() => {
    try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' }); } catch { /* Ignore malformed hashes. */ }
  });

  let ticking = false;
  const progress = $('.reading-progress span');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${scrollable > 0 ? Math.min(100, Math.max(0, scrollY / scrollable * 100)) : 0}%`;
    if (chapters.length) {
      let active = chapters[0];
      for (const chapter of chapters) if (chapter.getBoundingClientRect().top <= innerHeight * 0.35) active = chapter;
      // 较短的末章无法滚到视口上方；到达页底时仍应正确标记末章。
      if (scrollable > 0 && scrollY >= scrollable - 3) active = chapters[chapters.length - 1];
      $$('.chapter-sidebar nav a').forEach(link => {
        if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('load', updateProgress);
  updateProgress();
  $$('[data-year]').forEach(span => { span.textContent = String(new Date().getFullYear()); });

  // Keep the original Vercel analytics on deployed sites, with no local-preview 404.
  if (location.protocol === 'https:' && !['localhost', '127.0.0.1'].includes(location.hostname)) {
    const analytics = document.createElement('script');
    analytics.src = '/_vercel/insights/script.js';
    analytics.defer = true;
    document.head.append(analytics);
  }
})();
