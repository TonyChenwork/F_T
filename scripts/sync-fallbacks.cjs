// Optional: update the static, JavaScript-disabled fallbacks before publishing.
// Daily edits in gallery.js / journey.js work immediately without this command.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const readData = (file, name) => vm.runInNewContext(`${fs.readFileSync(path.join(root, file), 'utf8')}\n${name}`);
const photos = readData('gallery.js', 'galleryData');
const chapters = readData('journey.js', 'journeyData');
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
for (const items of [photos, chapters]) {
  const ids = items.map(item => item.id);
  if (ids.some(id => !id) || new Set(ids).size !== ids.length) throw new Error('Each entry needs a unique id.');
}
function update(file, content) {
  const destination = path.join(root, file);
  const html = fs.readFileSync(destination, 'utf8');
  if (!html.includes('<noscript>')) throw new Error(`Missing noscript target in ${file}`);
  fs.writeFileSync(destination, html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${content}\n</noscript>`));
}
update('index.html', `<p class="no-script">开启 JavaScript 即可筛选和全屏浏览，也可以直接点击作品查看。</p><div class="photo-grid">${photos.map(photo => `<figure class="photo-card"><a href="${escape(photo.src)}"><img src="${escape(photo.src)}" alt="${escape(photo.alt)}" width="${Number(photo.width)}" height="${Number(photo.height)}" loading="lazy"></a><figcaption>${escape(photo.title)} / ${escape(photo.location)}</figcaption></figure>`).join('\n')}</div>`);
update('dist/JOURNEY.html', chapters.map((chapter, i) => `<section class="chapter${chapter.quote ? ' quote-chapter' : ''}" id="${escape(chapter.id)}"><div class="chapter-kicker">CHAPTER ${String(i + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}</div><h2>${escape(chapter.title)}</h2><div class="chapter-text">${chapter.blocks.map(block => {
  if (typeof block.text === 'string') return `<p>${escape(block.text)}</p>`;
  const src = /^(https?:|\/)/.test(block.image) ? block.image : `../${block.image}`;
  const size = block.width && block.height ? ` width="${Number(block.width)}" height="${Number(block.height)}"` : '';
  return `<figure class="journal-evidence"><a href="${escape(src)}"><img src="${escape(src)}" alt="${escape(block.alt)}"${size} loading="lazy"></a><figcaption>${escape(block.caption)}</figcaption></figure>`;
}).join('\n')}</div></section>`).join('\n'));
console.log(`Updated static fallbacks: ${photos.length} photos, ${chapters.length} chapters.`);
