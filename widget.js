/* Smart Testimonial Carousel – v1.0 | LIW Worgs Inc. | MIT */
(() => {
  const sheetID = document.currentScript.getAttribute('data-sheet'); // Google Sheet ID
  const mountID = document.currentScript.getAttribute('data-mount') || 'liw-widget';
  const url = `https://opensheet.elk.sh/${sheetID}/Sheet1`;

  // Inject Swiper styles & script (one-time)
  const addAsset = (tag, attrs) => {
    if (document.querySelector(`${tag}[liw]`)) return;
    const el = document.createElement(tag); Object.assign(el, attrs); el.setAttribute('liw',''); document.head.appendChild(el);
  };
  addAsset('link',{rel:'stylesheet',href:'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'});
  addAsset('script',{src:'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',defer:true});

  // Render widget after Swiper loads
  window.addEventListener('DOMContentLoaded', () => {
    fetch(url).then(r=>r.json()).then(rows => {
      const root = document.getElementById(mountID);
      root.innerHTML = `
        <div class="liw-carousel swiper"><div class="swiper-wrapper">
          ${rows.map(r=>`
            <div class="swiper-slide liw-slide">
              <p class="liw-quote">“${r.Testimonial}”</p>
              <p class="liw-author">— ${r.Name || 'Anonymous'}</p>
            </div>`).join('')}
        </div></div>`;
      new Swiper('.swiper', {autoplay:{delay:5000},loop:true});
    });
  });
})();
