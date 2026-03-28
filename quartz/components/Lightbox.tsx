import { QuartzComponentConstructor } from "./types"

function Lightbox() {
  return null
}

Lightbox.afterDOMLoaded = `
(function() {
  // Prevent duplicate listeners if the component is loaded multiple times
  if (window.lightboxInitialized) return;
  window.lightboxInitialized = true;

  console.log("Lightbox initialized (Event Delegation mode)");

  document.addEventListener('click', (e) => {
    // 1. Find the image: Works even for resized images like ![[img.jpg|500]]
    const img = e.target.closest('article img');
    
    // Safety: Ignore clicks on icons, UI elements, or if there is no image
    if (!img || img.closest('.explorer') || img.closest('.graph')) return;

    e.preventDefault();
    e.stopPropagation();

    // 2. Build the Overlay
    const overlay = document.createElement('div');
    overlay.id = 'quartz-lightbox';
    overlay.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out;padding:40px;backdrop-filter:blur(5px);transition: opacity 0.2s ease;';
    
    // 3. Build the Image (Resets all Obsidian/Quartz sizing)
    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.style = 'max-width:100%;max-height:100%;object-fit:contain;box-shadow:0 10px 50px rgba(0,0,0,0.8);border-radius:4px;';
    fullImg.removeAttribute('width');
    fullImg.removeAttribute('height');

    // 4. Build UI
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '×';
    closeBtn.style = 'position:absolute;top:20px;right:30px;font-size:40px;color:white;cursor:pointer;user-select:none;';

    // 5. Interaction Logic
    const closeLightbox = () => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 200);
      document.removeEventListener('keydown', handleEsc);
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };

    overlay.onclick = closeLightbox;
    document.addEventListener('keydown', handleEsc);
    
    overlay.appendChild(fullImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
  });
})();
`

export default (() => Lightbox) satisfies QuartzComponentConstructor