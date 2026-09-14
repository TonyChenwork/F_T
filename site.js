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

  // 只需在 JOURNEY.html 新增章节；目录、序号和总数从正文自动生成。
  const chapters = $$('.journal-article > .chapter');
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

  let ticking = false;
  const progress = $('.reading-progress span');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${scrollable > 0 ? Math.min(100, Math.max(0, scrollY / scrollable * 100)) : 0}%`;
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
