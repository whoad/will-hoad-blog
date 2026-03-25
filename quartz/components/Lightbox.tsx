import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Lightbox() {
  return null
}

Lightbox.afterDOMLoaded = `
const images = document.querySelectorAll('article.gallery img');
images.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:1000;cursor:zoom-out;';
    
    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.style = 'max-width:90%;max-height:90%;box-shadow:0 0 20px rgba(0,0,0,0.5);border-radius:4px;';
    
    overlay.appendChild(fullImg);
    document.body.appendChild(overlay);
    
    overlay.onclick = () => overlay.remove();
  });
});
`

export default (() => Lightbox) satisfies QuartzComponentConstructor