/* Runtime twin of the <Icon> component.
   A config value starting with "/" becomes an <img>, anything else
   stays literal text — so emoji and PNGs are interchangeable. */

export function iconEl(value) {
  if (typeof value === 'string' && value.startsWith('/')) {
    const img = document.createElement('img');
    img.className = 'icon';
    img.src = value;
    img.alt = '';
    img.draggable = false;
    return img;
  }
  const span = document.createElement('span');
  span.className = 'icon';
  span.textContent = value ?? '';
  return span;
}

export function paintIcon(el, value) {
  if (!el) return;
  el.replaceChildren(iconEl(value));
}
