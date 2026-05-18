/* Load Firebase SDK only when config is saved */
    (function(){
      var cfg = null;
      try { cfg = JSON.parse(localStorage.getItem('decolab_fb_config')||'null'); } catch(e){}
      if(cfg && cfg.apiKey && cfg.apiKey !== 'VOTRE_API_KEY'){
        var base = 'https://www.gstatic.com/firebasejs/9.23.0/';
        var scripts = ['firebase-app-compat.js','firebase-firestore-compat.js'];
        scripts.forEach(function(s){
          var el = document.createElement('script');
          el.src = base + s;
          document.head.appendChild(el);
        });
      }
    })();
  </script>

  <style>
/* ═══════════════════════════════════════
   DECOLAB — Main Stylesheet
   ═══════════════════════════════════════ */
:root {
  --gray-50:  #F7F6F4;
  --gray-100: #EDEBE7;
  --gray-200: #D8D5CE;
  --gray-400: #A8A49B;
  --gray-600: #6E6A62;
  --gray-800: #3A3832;
  --gray-900: #1E1C18;
  --brown-50:  #F5EFE8;
  --brown-100: #E8D9C5;
  --brown-200: #D4B896;
  --brown-400: #B08B5E;
  --brown-600: #7A5C35;
  --brown-800: #4A3420;
  --brown-900: #2C1E10;
  --accent:       #8B6340;
  --accent-light: #C4956A;
  --white:  #FDFCFB;
  --text:   #2C2820;
  --muted:  #7A7570;
  --border: #E0DDD7;
  --wa:      #25D366;
  --wa-dark: #1ebe5d;
  --shadow: 0 8px 32px rgba(44,30,16,.12);
  --shadow-lg: 0 20px 60px rgba(44,30,16,.2);
  --font-d:  'Cormorant Garamond', serif;
  --font-b:  'Jost', sans-serif;
  --font-ar: 'Noto Kufi Arabic', sans-serif;
  --radius:  3px;
  --transition: .25s cubic-bezier(.4,0,.2,1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--gray-50);
  color: var(--text);
  font-family: var(--font-b);
  font-weight: 300;
  min-height: 100vh;
  overflow-x: hidden;
}
body.ar { font-family: var(--font-ar); direction: rtl; }

/* ─── PRELOADER ─── */
#preloader {
  position: fixed;
  inset: 0;
  background: var(--brown-900);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transition: opacity .6s ease, visibility .6s ease;
}
#preloader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

.pl-logo {
  font-family: var(--font-d);
  font-size: 3rem;
  font-weight: 600;
  color: var(--white);
  letter-spacing: .2em;
  opacity: 0;
  transform: translateY(20px);
  animation: plLogoIn .8s .2s forwards;
}
.pl-logo span { color: var(--accent-light); }
body.ar .pl-logo { font-family: var(--font-ar); letter-spacing: .05em; }

@keyframes plLogoIn {
  to { opacity: 1; transform: translateY(0); }
}

.pl-bar-wrap {
  width: 160px;
  height: 2px;
  background: rgba(255,255,255,.1);
  border-radius: 2px;
  overflow: hidden;
}
.pl-bar {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--accent-light), var(--wa));
  animation: plBar 1s .2s forwards;
}
@keyframes plBar {
  0%   { width: 0; }
  70%  { width: 85%; }
  100% { width: 100%; }
}

.pl-tagline {
  font-size: .75rem;
  letter-spacing: .25em;
  text-transform: uppercase;
  color: rgba(255,255,255,.4);
  opacity: 0;
  animation: plFade .8s .6s forwards;
}
@keyframes plFade { to { opacity: 1; } }

/* ─── PAGE ENTRY ANIMATIONS ─── */
.fade-in {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .6s var(--transition), transform .6s var(--transition);
}
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* ─── HEADER ─── */
header {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 200;
  transition: box-shadow var(--transition);
}
header.scrolled { box-shadow: 0 2px 20px rgba(44,30,16,.08); }

.hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  height: 68px;
  gap: 2rem;
}
.logo {
  font-family: var(--font-d);
  font-size: 2rem;
  font-weight: 600;
  color: var(--brown-800);
  letter-spacing: .15em;
  user-select: none;
  flex-shrink: 0;
}
.logo span { color: var(--accent); }
body.ar .logo { font-family: var(--font-ar); letter-spacing: .05em; }

.srch {
  flex: 1;
  max-width: 500px;
  position: relative;
}
.srch input {
  width: 100%;
  padding: 10px 44px 10px 18px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  background: var(--gray-50);
  font-family: inherit;
  font-size: .85rem;
  color: var(--text);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}
body.ar .srch input { padding: 10px 18px 10px 44px; }
.srch input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(139,99,64,.08); }
.srch input::placeholder { color: var(--muted); }
.srch-ic {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
  transition: color var(--transition);
}
body.ar .srch-ic { right: auto; left: 14px; }
.srch input:focus + .srch-ic { color: var(--accent); }

.hdr-act { display: flex; align-items: center; gap: 1rem; }

.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  background: none;
  font-family: inherit;
  font-size: .78rem;
  color: var(--gray-600);
  cursor: pointer;
  transition: all var(--transition);
}
.lang-btn:hover { border-color: var(--accent); color: var(--accent); }

.adm-btn {
  padding: 8px 20px;
  background: var(--brown-800);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .78rem;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}
.adm-btn:hover { background: var(--accent); transform: translateY(-1px); }

/* ─── NAV ─── */
nav.main-nav {
  border-top: 1px solid var(--border);
  background: var(--white);
}
.nav-in {
  display: flex;
  align-items: center;
  padding: 0 2.5rem;
  gap: 2.5rem;
  height: 44px;
  overflow-x: auto;
}
.nav-in::-webkit-scrollbar { display: none; }
.nav-lk {
  font-size: .78rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--gray-600);
  cursor: pointer;
  white-space: nowrap;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: all var(--transition);
  position: relative;
}
body.ar .nav-lk { letter-spacing: 0; text-transform: none; }
.nav-lk::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform var(--transition);
}
.nav-lk:hover { color: var(--accent); }
.nav-lk:hover::after, .nav-lk.active::after { transform: scaleX(1); }
.nav-lk.active { color: var(--accent); }

/* ─── HERO ─── */
.hero {
  background: linear-gradient(135deg, var(--brown-900) 0%, var(--brown-800) 50%, var(--gray-800) 100%);
  color: var(--white);
  padding: 5rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E");
  animation: heroPattern 20s linear infinite;
}
@keyframes heroPattern {
  from { background-position: 0 0; }
  to   { background-position: 120px 120px; }
}
.hero > * { position: relative; }

.hero-tag {
  font-size: .72rem;
  letter-spacing: .25em;
  text-transform: uppercase;
  color: var(--accent-light);
  margin-bottom: 1.2rem;
  opacity: 0;
  animation: heroFadeUp .7s .2s forwards;
}
body.ar .hero-tag { letter-spacing: .05em; text-transform: none; }

.hero h1 {
  font-family: var(--font-d);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 1.2rem;
  opacity: 0;
  animation: heroFadeUp .7s .4s forwards;
}
body.ar .hero h1 { font-family: var(--font-ar); font-size: clamp(2rem, 5vw, 3.5rem); }

.hero p {
  font-size: .9rem;
  color: var(--gray-200);
  max-width: 480px;
  margin: 0 auto 1.5rem;
  line-height: 1.7;
  opacity: 0;
  animation: heroFadeUp .7s .55s forwards;
}

.hero-pills {
  display: flex;
  justify-content: center;
  gap: .75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  opacity: 0;
  animation: heroFadeUp .7s .7s forwards;
}
.pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 20px;
  font-size: .75rem;
  color: rgba(255,255,255,.75);
}
.pill.wa { border-color: rgba(37,211,102,.5); color: var(--wa); }

.hero-cta {
  display: inline-block;
  padding: 12px 36px;
  border: 1.5px solid var(--accent-light);
  color: var(--accent-light);
  font-size: .8rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition);
  border-radius: 1px;
  opacity: 0;
  animation: heroFadeUp .7s .85s forwards;
  background: none;
  font-family: inherit;
}
body.ar .hero-cta { letter-spacing: .05em; text-transform: none; }
.hero-cta:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139,99,64,.4);
}

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── MAIN ─── */
main { padding: 3rem 2.5rem; }
.sec-hdr {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.sec-title {
  font-family: var(--font-d);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--brown-800);
}
body.ar .sec-title { font-family: var(--font-ar); font-size: 1.5rem; }
.sec-count { font-size: .78rem; color: var(--muted); }

/* ─── FILTERS ─── */
.filters {
  display: flex;
  gap: .75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  align-items: center;
}
.chip {
  padding: 6px 16px;
  border: 1px solid var(--border);
  border-radius: 20px;
  font-family: inherit;
  font-size: .78rem;
  color: var(--gray-600);
  background: var(--white);
  cursor: pointer;
  transition: all var(--transition);
}
.chip:hover { border-color: var(--brown-400); color: var(--brown-600); }
.chip.active { background: var(--brown-800); color: var(--white); border-color: var(--brown-800); }
.srt {
  margin-left: auto;
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .78rem;
  color: var(--gray-600);
  background: var(--white);
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition);
}
body.ar .srt { margin-left: 0; margin-right: auto; }
.srt:focus { border-color: var(--accent); }

/* ─── PRODUCT GRID ─── */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  gap: 2rem;
}

.card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--brown-200);
}

.card-img {
  width: 100%;
  height: 220px;
  background: var(--brown-50);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  position: relative;
  overflow: hidden;
}
.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;
}
.card:hover .card-img img { transform: scale(1.05); }

.cbadge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  background: var(--accent);
  color: var(--white);
  font-size: .68rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  border-radius: 1px;
  z-index: 1;
}
body.ar .cbadge { left: auto; right: 12px; letter-spacing: .02em; text-transform: none; }

.share-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: scale(.8);
  transition: all var(--transition);
  color: var(--wa);
  z-index: 1;
}
body.ar .share-icon { right: auto; left: 12px; }
.card:hover .share-icon { opacity: 1; transform: scale(1); }
.share-icon:hover { background: var(--wa); color: #fff; transform: scale(1.1) !important; }

.card-body { padding: 1.2rem; }
.card-cat {
  font-size: .7rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: .4rem;
}
body.ar .card-cat { letter-spacing: .02em; text-transform: none; }
.card-name {
  font-family: var(--font-d);
  font-size: 1.12rem;
  font-weight: 500;
  color: var(--brown-800);
  margin-bottom: .4rem;
  line-height: 1.3;
}
body.ar .card-name { font-family: var(--font-ar); font-size: 1rem; }
.card-desc {
  font-size: .78rem;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: .85rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-price {
  font-family: var(--font-d);
  font-size: 1.28rem;
  font-weight: 600;
  color: var(--brown-800);
  margin-bottom: .85rem;
}
body.ar .card-price { font-family: var(--font-ar); }
.card-price span { font-size: .75rem; font-weight: 300; color: var(--muted); font-family: var(--font-b); }

/* WA Button on card */
.wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 11px;
  background: var(--wa);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .82rem;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  text-decoration: none;
}
.wa-btn:hover {
  background: var(--wa-dark);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37,211,102,.35);
}
.wa-btn svg { width: 18px; height: 18px; flex-shrink: 0; }

.pod-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: .5rem;
  font-size: .7rem;
  color: var(--muted);
  background: var(--gray-100);
  padding: 5px;
  border-radius: var(--radius);
}

.no-prod { text-align: center; padding: 4rem; color: var(--muted); grid-column: 1/-1; }

/* ─── PRODUCT MODAL ─── */
#prod-modal-bg {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  z-index: 700;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  padding: 1rem;
}
#prod-modal-bg.show {
  display: flex;
  animation: modalBgIn .25s ease;
}
@keyframes modalBgIn { from { opacity: 0; } to { opacity: 1; } }

.prod-modal {
  background: var(--white);
  border-radius: 6px;
  width: 860px;
  max-width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  box-shadow: var(--shadow-lg);
  animation: modalIn .35s cubic-bezier(.34,1.56,.64,1);
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(.92) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
body.ar .prod-modal { direction: rtl; }

.pm-gallery {
  background: var(--brown-50);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  font-size: 6rem;
  position: relative;
  overflow: hidden;
  user-select: none;
}

/* ─── GALLERY SLIDES ─── */
.pm-slides {
  position: absolute;
  inset: 0;
  display: flex;
  transition: transform .45s cubic-bezier(.4,0,.2,1);
}
.pm-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  background: var(--brown-50);
  flex-shrink: 0;
}
.pm-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ─── GALLERY NAV ARROWS ─── */
.pm-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  background: rgba(255,255,255,.88);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
  transition: all var(--transition);
  color: var(--brown-800);
  box-shadow: 0 2px 12px rgba(0,0,0,.15);
}
.pm-arrow:hover { background: #fff; transform: translateY(-50%) scale(1.1); box-shadow: 0 4px 20px rgba(0,0,0,.2); }
.pm-arrow:active { transform: translateY(-50%) scale(.95); }
.pm-arrow.prev { left: 12px; }
.pm-arrow.next { right: 12px; }
.pm-arrow svg { width: 16px; height: 16px; }
.pm-arrow.hidden { opacity: 0; pointer-events: none; }

/* ─── GALLERY DOTS ─── */
.pm-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 7px;
  z-index: 4;
}
.pm-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,.5);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all var(--transition);
}
.pm-dot.active {
  background: #fff;
  transform: scale(1.3);
}

/* ─── GALLERY THUMBNAILS STRIP ─── */
.pm-thumbs {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 4px;
  padding: 8px;
  background: linear-gradient(transparent, rgba(0,0,0,.45));
  z-index: 4;
  overflow-x: auto;
  scrollbar-width: none;
}
.pm-thumbs::-webkit-scrollbar { display: none; }
.pm-thumb {
  width: 52px;
  height: 52px;
  border-radius: 3px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition);
  flex-shrink: 0;
  background: var(--brown-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  overflow: hidden;
}
.pm-thumb img { width: 100%; height: 100%; object-fit: cover; }
.pm-thumb.active { border-color: #fff; box-shadow: 0 0 0 1px rgba(255,255,255,.6); }
.pm-thumb:hover { border-color: rgba(255,255,255,.7); transform: scale(1.05); }

/* ─── GALLERY COUNTER ─── */
.pm-counter {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0,0,0,.45);
  color: #fff;
  font-size: .72rem;
  padding: 4px 10px;
  border-radius: 20px;
  z-index: 4;
  letter-spacing: .06em;
}
body.ar .pm-counter { left: auto; right: 44px; }

.pm-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 12px;
  background: var(--accent);
  color: #fff;
  font-size: .72rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  border-radius: 1px;
  z-index: 5;
}
body.ar .pm-badge { left: auto; right: 16px; letter-spacing: .02em; text-transform: none; }

.pm-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  background: rgba(255,255,255,.9);
  border: none;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
  transition: all var(--transition);
  color: var(--text);
}
body.ar .pm-close { right: auto; left: 12px; }
.pm-close:hover { background: #fff; transform: rotate(90deg); }

.pm-info { padding: 2.5rem 2rem; display: flex; flex-direction: column; }
.pm-cat {
  font-size: .7rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: .6rem;
}
body.ar .pm-cat { letter-spacing: .02em; text-transform: none; }
.pm-name {
  font-family: var(--font-d);
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--brown-800);
  line-height: 1.2;
  margin-bottom: .6rem;
}
body.ar .pm-name { font-family: var(--font-ar); font-size: 1.3rem; }
.pm-price {
  font-family: var(--font-d);
  font-size: 2rem;
  font-weight: 600;
  color: var(--brown-800);
  margin-bottom: 1.2rem;
}
body.ar .pm-price { font-family: var(--font-ar); }
.pm-price span { font-size: .85rem; font-weight: 300; color: var(--muted); font-family: var(--font-b); }
.pm-desc {
  font-size: .85rem;
  color: var(--gray-600);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  flex: 1;
}
.pm-divider { height: 1px; background: var(--border); margin: 1rem 0; }

.pm-wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px;
  background: var(--wa);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .88rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition);
  margin-bottom: .75rem;
}
.pm-wa-btn:hover {
  background: var(--wa-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37,211,102,.4);
}
.pm-wa-btn svg { width: 20px; height: 20px; }

.pm-share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: rgba(37,211,102,.08);
  border: 1px solid rgba(37,211,102,.3);
  border-radius: var(--radius);
  color: var(--wa);
  font-family: inherit;
  font-size: .8rem;
  cursor: pointer;
  transition: all var(--transition);
  margin-bottom: .75rem;
}
.pm-share-btn:hover { background: rgba(37,211,102,.15); }
.pm-share-btn svg { width: 16px; height: 16px; }

.pm-pod {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: .75rem;
  color: var(--muted);
  padding: 8px;
  background: var(--gray-100);
  border-radius: var(--radius);
}

@media (max-width: 640px) {
  .prod-modal { grid-template-columns: 1fr; }
  .pm-gallery { min-height: 240px; }
}

/* ─── FOOTER ─── */
footer {
  background: var(--brown-900);
  color: var(--gray-200);
  padding: 3rem 2.5rem 1.5rem;
  margin-top: 4rem;
}
.ftr-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2.5rem;
}
@media (max-width: 720px) { .ftr-grid { grid-template-columns: 1fr; gap: 2rem; } }
.ftr-brand p { font-size: .82rem; line-height: 1.8; color: var(--gray-400); margin-top: .8rem; }
.ftr-wa {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: .9rem;
  padding: 8px 14px;
  background: rgba(37,211,102,.1);
  border: 1px solid rgba(37,211,102,.25);
  border-radius: var(--radius);
  font-size: .8rem;
  color: var(--wa);
  transition: background var(--transition);
  cursor: pointer;
}
.ftr-wa:hover { background: rgba(37,211,102,.18); }
.ftr-wa svg { width: 16px; height: 16px; }
.ftr-col h4 {
  font-size: .75rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--accent-light);
  margin-bottom: 1.1rem;
  font-weight: 400;
}
body.ar .ftr-col h4 { letter-spacing: .02em; text-transform: none; }
.ftr-col a {
  display: block;
  font-size: .8rem;
  color: var(--gray-400);
  cursor: pointer;
  margin-bottom: .55rem;
  transition: color var(--transition);
  text-decoration: none;
}
.ftr-col a:hover { color: var(--accent-light); }
.ftr-btm {
  border-top: 1px solid rgba(255,255,255,.08);
  padding-top: 1.4rem;
  text-align: center;
  font-size: .75rem;
  color: var(--gray-600);
}

/* ─── ADMIN LOGIN OVERLAY ─── */
#adm-login-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.7);
  z-index: 600;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
}
#adm-login-overlay.show {
  display: flex;
  animation: modalBgIn .25s ease;
}
.login-box {
  background: var(--white);
  border-radius: 6px;
  padding: 2.5rem;
  width: 380px;
  max-width: 95vw;
  box-shadow: var(--shadow-lg);
  animation: modalIn .35s cubic-bezier(.34,1.56,.64,1);
}
.login-logo {
  font-family: var(--font-d);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--brown-800);
  letter-spacing: .15em;
  text-align: center;
  margin-bottom: .4rem;
}
.login-logo span { color: var(--accent); }
body.ar .login-logo { font-family: var(--font-ar); }
.login-subtitle {
  text-align: center;
  font-size: .78rem;
  color: var(--muted);
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}
body.ar .login-subtitle { letter-spacing: .02em; text-transform: none; }
.login-box .fg { display: flex; flex-direction: column; gap: .5rem; margin-bottom: 1.2rem; }
.login-box .fg label { font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
body.ar .login-box .fg label { letter-spacing: .02em; text-transform: none; }
.login-box .fg input {
  padding: 11px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .9rem;
  color: var(--text);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.login-box .fg input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(139,99,64,.08);
}
.login-box .fg input.error { border-color: #e24b4a; box-shadow: 0 0 0 3px rgba(226,75,74,.08); }
.login-err { font-size: .78rem; color: #e24b4a; text-align: center; margin-bottom: .75rem; min-height: 1.2rem; }
.login-btn {
  width: 100%;
  padding: 12px;
  background: var(--brown-800);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .88rem;
  letter-spacing: .08em;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}
.login-btn:hover { background: var(--accent); transform: translateY(-1px); }
.login-cancel {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: .78rem;
  color: var(--muted);
  cursor: pointer;
  transition: color var(--transition);
}
.login-cancel:hover { color: var(--text); }

/* ─── ADMIN PANEL ─── */
#adm {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 500;
  background: var(--gray-50);
}
#adm.show { display: flex; }

.adm-side {
  width: 240px;
  background: var(--brown-900);
  color: var(--white);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.adm-logo {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,.1);
  font-family: var(--font-d);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--accent-light);
  letter-spacing: .1em;
}
body.ar .adm-logo { font-family: var(--font-ar); font-size: 1.2rem; letter-spacing: .02em; }
.adm-nav-menu { padding: 1.5rem 0; flex: 1; }
.adm-ni {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .75rem 1.5rem;
  font-size: .82rem;
  color: var(--gray-400);
  cursor: pointer;
  transition: all var(--transition);
}
.adm-ni:hover, .adm-ni.active {
  background: rgba(139,99,64,.2);
  color: var(--accent-light);
}
.adm-ni svg { width: 17px; height: 17px; flex-shrink: 0; }
.adm-exit { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,.1); display:flex; flex-direction:column; gap:.75rem; }
.adm-exit button {
  width: 100%;
  padding: 9px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  color: var(--gray-400);
  font-family: inherit;
  font-size: .78rem;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all var(--transition);
}
.adm-exit button:hover { background: rgba(255,255,255,.12); color: var(--white); }

.dl-site-btn {
  width: 100%;
  padding: 10px 9px;
  background: linear-gradient(135deg, rgba(139,99,64,.5), rgba(74,52,32,.6));
  border: 1px solid rgba(196,149,106,.35) !important;
  color: var(--accent-light) !important;
  font-family: inherit;
  font-size: .78rem;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  letter-spacing: .04em;
}
.dl-site-btn:hover {
  background: linear-gradient(135deg, rgba(139,99,64,.8), rgba(74,52,32,.9)) !important;
  color: var(--white) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,.3);
}
.dl-site-btn svg { width: 14px; height: 14px; flex-shrink: 0; }

/* Download progress overlay */
#dl-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.7);
  z-index: 9000;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}
#dl-overlay.show { display: flex; }
.dl-box {
  background: var(--white);
  border-radius: 6px;
  padding: 2.5rem 2rem;
  width: 340px;
  text-align: center;
  box-shadow: var(--shadow-lg);
  animation: modalIn .3s cubic-bezier(.34,1.56,.64,1);
}
.dl-box-icon {
  width: 56px; height: 56px;
  background: var(--brown-50);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.2rem;
}
.dl-box-icon svg { width: 26px; height: 26px; color: var(--accent); }
.dl-box h3 {
  font-family: var(--font-d);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--brown-800);
  margin-bottom: .5rem;
}
body.ar .dl-box h3 { font-family: var(--font-ar); }
.dl-box p { font-size: .82rem; color: var(--muted); line-height: 1.6; margin-bottom: 1.5rem; }
.dl-progress-wrap {
  height: 4px;
  background: var(--gray-100);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.dl-progress-bar {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--accent), var(--accent-light));
  border-radius: 4px;
  transition: width .4s ease;
}
.dl-status { font-size: .75rem; color: var(--muted); min-height: 1.1rem; }

.adm-main { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
.adm-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2rem;
  background: var(--white);
  border-bottom: 1px solid var(--border);
}
.adm-top h2 {
  font-family: var(--font-d);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--brown-800);
}
body.ar .adm-top h2 { font-family: var(--font-ar); }
.adm-cnt { padding: 2rem; flex: 1; }

/* WA bar */
.wa-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--white);
  border: 1px solid var(--border);
  border-left: 4px solid var(--wa);
  border-radius: var(--radius);
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
body.ar .wa-bar { border-left: 1px solid var(--border); border-right: 4px solid var(--wa); }
.wa-bar-lbl {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: .82rem;
  font-weight: 500;
  color: var(--wa);
  white-space: nowrap;
}
.wa-bar-lbl svg { width: 20px; height: 20px; }
.wa-bar input {
  flex: 1;
  min-width: 160px;
  max-width: 230px;
  padding: 8px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-family: var(--font-b);
  font-size: .85rem;
  color: var(--text);
  background: var(--gray-50);
  outline: none;
  transition: border-color var(--transition);
}
.wa-bar input:focus { border-color: var(--wa); }
.wa-bar-sv {
  padding: 8px 20px;
  background: var(--wa);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .78rem;
  cursor: pointer;
  transition: background var(--transition);
  white-space: nowrap;
}
.wa-bar-sv:hover { background: var(--wa-dark); }
.wa-bar-st { font-size: .72rem; color: var(--wa); display: flex; align-items: center; gap: 5px; }
.wa-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--wa); display: inline-block; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }

/* ═══════════════════════════════════════
   DATABASE PANEL
═══════════════════════════════════════ */
/* Sidebar DB nav item (already uses .adm-ni) */

/* DB section wrapper */
#sec-db { }

/* DB top actions bar */
.db-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.db-search-wrap {
  display: flex;
  align-items: center;
  gap: .75rem;
  flex: 1;
}
.db-search-wrap input {
  flex: 1;
  max-width: 280px;
  padding: 8px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .83rem;
  outline: none;
  transition: border-color var(--transition);
}
.db-search-wrap input:focus { border-color: var(--accent); }
.db-filter-sel {
  padding: 8px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .8rem;
  color: var(--text);
  background: var(--white);
  outline: none;
  cursor: pointer;
}
.db-stats-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.db-stat-chip {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 7px 14px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: .78rem;
  color: var(--gray-600);
}
.db-stat-chip strong { color: var(--brown-800); font-weight: 500; }
.db-stat-chip.active { background: var(--brown-50); border-color: var(--brown-200); }

/* DB table */
.db-table-wrap {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}
.db-table {
  width: 100%;
  border-collapse: collapse;
}
.db-table th {
  padding: .75rem 1rem;
  text-align: left;
  font-size: .7rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: color var(--transition);
}
body.ar .db-table th { text-align: right; letter-spacing: .02em; text-transform: none; }
.db-table th:hover { color: var(--accent); }
.db-table th.sorted { color: var(--accent); }
.db-table th .sort-arrow { margin-left: 4px; font-size: .65rem; }
.db-table td {
  padding: .75rem 1rem;
  font-size: .82rem;
  border-bottom: 1px solid var(--gray-100);
  color: var(--text);
  vertical-align: middle;
}
.db-table tr:last-child td { border-bottom: none; }
.db-table tr { transition: background var(--transition); }
.db-table tr:hover td { background: var(--brown-50); }
.db-table .td-img {
  width: 44px; height: 44px;
  border-radius: var(--radius);
  object-fit: cover;
  background: var(--brown-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}
.db-table .td-name { font-weight: 400; color: var(--brown-800); }
.db-table .td-id { font-size: .7rem; color: var(--muted); font-family: monospace; }
.db-table .td-price { font-family: var(--font-d); font-weight: 600; color: var(--brown-800); }
body.ar .db-table .td-price { font-family: var(--font-ar); }
.db-table .td-date { font-size: .73rem; color: var(--muted); white-space: nowrap; }

/* DB row actions */
.db-row-act { display: flex; gap: .4rem; }
.db-btn-view {
  padding: 4px 10px;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .7rem;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--white);
  color: var(--gray-600);
  transition: all var(--transition);
}
.db-btn-view:hover { background: var(--gray-100); border-color: var(--gray-400); }

/* DB Empty state */
.db-empty {
  text-align: center;
  padding: 3.5rem 2rem;
  color: var(--muted);
}
.db-empty svg { width: 48px; height: 48px; color: var(--gray-200); margin-bottom: 1rem; }
.db-empty p { font-size: .85rem; margin-top: .5rem; }
.db-empty button { margin-top: 1.2rem; }

/* DB detail drawer / modal */
#db-drawer-bg {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 600;
  align-items: flex-start;
  justify-content: flex-end;
  backdrop-filter: blur(2px);
}
#db-drawer-bg.show {
  display: flex;
  animation: modalBgIn .2s ease;
}
.db-drawer {
  width: 420px;
  max-width: 95vw;
  height: 100vh;
  background: var(--white);
  box-shadow: -8px 0 40px rgba(0,0,0,.15);
  overflow-y: auto;
  animation: drawerIn .3s cubic-bezier(.4,0,.2,1);
  display: flex;
  flex-direction: column;
}
body.ar .db-drawer {
  box-shadow: 8px 0 40px rgba(0,0,0,.15);
  animation: drawerInAr .3s cubic-bezier(.4,0,.2,1);
}
body.ar #db-drawer-bg { justify-content: flex-start; }
@keyframes drawerIn {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes drawerInAr {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}
.db-drawer-hdr {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--brown-50);
  flex-shrink: 0;
}
.db-drawer-hdr h3 {
  font-family: var(--font-d);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--brown-800);
}
body.ar .db-drawer-hdr h3 { font-family: var(--font-ar); }
.db-drawer-close {
  background: none; border: none; font-size: 1.1rem; cursor: pointer;
  color: var(--muted); padding: 4px 8px; border-radius: 50%;
  transition: all var(--transition);
}
.db-drawer-close:hover { background: var(--gray-100); color: var(--text); transform: rotate(90deg); }
.db-drawer-body { padding: 1.5rem; flex: 1; overflow-y: auto; }
.db-drawer-img {
  width: 100%; height: 200px;
  border-radius: 4px;
  object-fit: cover;
  background: var(--brown-50);
  display: flex; align-items: center; justify-content: center;
  font-size: 4rem;
  margin-bottom: 1.2rem;
  overflow: hidden;
}
.db-drawer-img img { width: 100%; height: 100%; object-fit: cover; }
.db-field { margin-bottom: 1rem; }
.db-field label {
  display: block;
  font-size: .7rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: .3rem;
}
body.ar .db-field label { letter-spacing: .02em; text-transform: none; }
.db-field-val {
  font-size: .85rem;
  color: var(--text);
  line-height: 1.6;
  background: var(--gray-50);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 12px;
}
.db-field-val.mono { font-family: monospace; font-size: .78rem; color: var(--muted); }
.db-field-val.price { font-family: var(--font-d); font-size: 1.3rem; font-weight: 600; color: var(--brown-800); }
body.ar .db-field-val.price { font-family: var(--font-ar); }
.db-field-val.badge-val {
  display: inline-block;
  padding: 4px 12px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 1px;
  font-size: .75rem;
}
.db-imgs-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: .5rem;
  margin-top: .5rem;
}
.db-imgs-grid img {
  width: 100%; aspect-ratio: 1;
  border-radius: var(--radius);
  object-fit: cover;
  border: 1px solid var(--border);
}
.db-drawer-ftr {
  padding: 1.2rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: .75rem;
  flex-shrink: 0;
}
.db-drawer-ftr button, .db-drawer-ftr a {
  flex: 1; padding: 10px;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .8rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all var(--transition);
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.db-edit-btn { background: var(--accent); color: #fff; border: none; }
.db-edit-btn:hover { background: var(--brown-800); }
.db-del-btn { background: var(--white); color: #a33; border: 1px solid #e24b4a; }
.db-del-btn:hover { background: #fff0f0; }

/* DB import/export bar */
.db-io-bar {
  display: flex;
  align-items: center;
  gap: .75rem;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: .75rem 1.2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.db-io-bar span { font-size: .78rem; color: var(--muted); margin-right: auto; }
.db-io-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 14px;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .75rem;
  cursor: pointer;
  transition: all var(--transition);
}
.db-io-btn.export { background: var(--brown-50); border: 1px solid var(--brown-200); color: var(--brown-600); }
.db-io-btn.export:hover { background: var(--brown-100); }
.db-io-btn.import-btn { background: var(--white); border: 1px solid var(--border); color: var(--gray-600); }
.db-io-btn.import-btn:hover { border-color: var(--accent); color: var(--accent); }
.db-io-btn svg { width: 13px; height: 13px; }


/* Stats */
.stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
@media (max-width: 900px) { .stats { grid-template-columns: repeat(2,1fr); } }
.st {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.5rem;
  transition: transform var(--transition), box-shadow var(--transition);
}
.st:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.st-lbl { font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: .5rem; }
body.ar .st-lbl { letter-spacing: .02em; text-transform: none; }
.st-val { font-family: var(--font-d); font-size: 2rem; font-weight: 600; color: var(--brown-800); }
body.ar .st-val { font-family: var(--font-ar); }
.st-sub { font-size: .75rem; color: var(--accent); margin-top: .3rem; }
.st.wa-st { border-top: 3px solid var(--wa); }
.st.wa-st .st-val { color: var(--wa); font-size: 1.1rem; word-break: break-all; }

/* Admin table */
.adm-sh { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
.adm-sh h3 { font-family: var(--font-d); font-size: 1.3rem; font-weight: 500; color: var(--brown-800); }
body.ar .adm-sh h3 { font-family: var(--font-ar); }
.btn-add {
  padding: 9px 22px;
  background: var(--accent);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .8rem;
  cursor: pointer;
  transition: all var(--transition);
}
.btn-add:hover { background: var(--brown-800); transform: translateY(-1px); }

.atbl { width: 100%; border-collapse: collapse; background: var(--white); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
.atbl th {
  padding: .85rem 1rem;
  text-align: left;
  font-size: .72rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border);
}
body.ar .atbl th { text-align: right; letter-spacing: .02em; text-transform: none; }
.atbl td { padding: .85rem 1rem; font-size: .82rem; border-bottom: 1px solid var(--gray-100); color: var(--text); }
.atbl tr:last-child td { border-bottom: none; }
.atbl tr:hover td { background: var(--gray-50); }
.thumb {
  width: 44px;
  height: 44px;
  border-radius: var(--radius);
  background: var(--brown-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}
.tbl-act { display: flex; gap: .5rem; flex-wrap: wrap; }
.btn-ed, .btn-dl {
  padding: 5px 10px;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .72rem;
  cursor: pointer;
  border: 1px solid var(--border);
  transition: all var(--transition);
}
.btn-ed { background: var(--white); color: var(--brown-600); }
.btn-ed:hover { background: var(--brown-50); border-color: var(--brown-400); }
.btn-dl { background: var(--white); color: #a33; }
.btn-dl:hover { background: #fff0f0; border-color: #e24b4a; }
.bcat { padding: 3px 8px; background: var(--brown-50); color: var(--brown-600); border-radius: 20px; font-size: .7rem; }
.wa-test {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  background: rgba(37,211,102,.08);
  border: 1px solid rgba(37,211,102,.25);
  color: var(--wa);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .72rem;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition);
}
.wa-test:hover { background: rgba(37,211,102,.18); }

/* ─── PRODUCT FORM MODAL ─── */
.mbg {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 600;
  align-items: center;
  justify-content: center;
}
.mbg.show {
  display: flex;
  animation: modalBgIn .25s ease;
}
.modal {
  background: var(--white);
  border-radius: 4px;
  width: 700px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalIn .3s cubic-bezier(.34,1.56,.64,1);
}
.mhdr {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mhdr h3 { font-family: var(--font-d); font-size: 1.4rem; font-weight: 500; color: var(--brown-800); }
body.ar .mhdr h3 { font-family: var(--font-ar); }
.mclose {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--muted);
  padding: 4px 8px;
  transition: all var(--transition);
  border-radius: 50%;
}
.mclose:hover { color: var(--text); background: var(--gray-100); transform: rotate(90deg); }
.mbody { padding: 2rem; }
.ftabs { display: flex; margin-bottom: 1.5rem; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.ftab { flex: 1; padding: 9px; text-align: center; font-size: .8rem; cursor: pointer; background: var(--white); color: var(--muted); border: none; transition: all var(--transition); }
.ftab.active { background: var(--brown-800); color: var(--white); }
.lform { display: none; }
.lform.show { display: block; }
.fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
.fg { display: flex; flex-direction: column; gap: .4rem; }
.fg.full { grid-column: 1/-1; }
.fg label { font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
body.ar .fg label { letter-spacing: .02em; text-transform: none; }
.fg input, .fg textarea, .fg select {
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .85rem;
  color: var(--text);
  background: var(--gray-50);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.fg input:focus, .fg textarea:focus, .fg select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(139,99,64,.08);
}
.fg textarea { resize: vertical; min-height: 88px; }
body.ar .fg input, body.ar .fg textarea { font-family: var(--font-ar); direction: rtl; }

.img-drop {
  border: 2px dashed var(--border);
  border-radius: 4px;
  padding: 1.8rem;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition);
  background: var(--gray-50);
}
.img-drop:hover { border-color: var(--accent); background: var(--brown-50); }
.img-drop p { font-size: .8rem; color: var(--muted); margin-top: .5rem; }
.img-prev { display: grid; grid-template-columns: repeat(4,1fr); gap: .75rem; margin-top: 1rem; }
.img-pi { aspect-ratio: 1; border-radius: var(--radius); overflow: hidden; position: relative; background: var(--brown-50); }
.img-pi img { width: 100%; height: 100%; object-fit: cover; }
.rm-img {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0,0,0,.6);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: .7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition);
}
.rm-img:hover { background: rgba(200,0,0,.8); }
.fdiv { grid-column: 1/-1; border: none; border-top: 1px solid var(--border); margin: .4rem 0; }
.mftr { padding: 1.5rem 2rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: .75rem; }
.btn-cx {
  padding: 9px 22px;
  background: var(--white);
  border: 1px solid var(--border);
  color: var(--muted);
  font-family: inherit;
  font-size: .8rem;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all var(--transition);
}
.btn-cx:hover { border-color: var(--gray-400); color: var(--text); }
.btn-sv {
  padding: 9px 28px;
  background: var(--accent);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: .8rem;
  cursor: pointer;
  transition: all var(--transition);
}
.btn-sv:hover { background: var(--brown-800); transform: translateY(-1px); }

/* ─── TOAST ─── */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--brown-800);
  color: var(--white);
  padding: .85rem 1.5rem;
  border-radius: 4px;
  font-size: .82rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all .3s;
  z-index: 9999;
  pointer-events: none;
  max-width: 300px;
  box-shadow: var(--shadow);
}
body.ar .toast { right: auto; left: 2rem; }
.toast.show { opacity: 1; transform: translateY(0); }
.toast.wa-t { background: var(--wa); }
.toast.ok-t { background: #2a7a4b; }

/* ─── SCROLL TO TOP ─── */
.scroll-top {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 40px;
  height: 40px;
  background: var(--brown-800);
  color: var(--white);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all var(--transition);
  z-index: 100;
  box-shadow: var(--shadow);
}
body.ar .scroll-top { left: auto; right: 2rem; }
.scroll-top.show { opacity: 1; transform: translateY(0); }
.scroll-top:hover { background: var(--accent); transform: translateY(-2px); }
  </style>
  <style>
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
  </style>
</head>
<body>
<!-- ══════════════════════════════════════
     PRELOADER
══════════════════════════════════════ -->
<div id="preloader">
  <div class="pl-logo">DECO<span>LAB</span></div>
  <div class="pl-bar-wrap"><div class="pl-bar"></div></div>
  <div class="pl-tagline" id="pl-tag">Décoration &amp; Design Intérieur</div>
</div>


<!-- ══════════════════════════════════════
     STORE
══════════════════════════════════════ -->
<div id="store">

  <!-- HEADER -->
  <header>
    <div class="hdr">
      <div class="logo">DECO<span>LAB</span></div>
      <div class="srch">
        <input id="srch-inp" type="text" placeholder="Rechercher un produit..."
               oninput="renderProds()" autocomplete="off">
        <svg class="srch-ic" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </div>
      <div class="hdr-act">
        <button class="lang-btn" onclick="toggleLang()">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            <path d="M2 12h20"/>
          </svg>
          <span id="lang-lbl">العربية</span>
        </button>
        <button class="adm-btn" onclick="openAdmLogin()" id="adm-btn-t">Admin</button>
      </div>
    </div>
    <nav class="main-nav">
      <div class="nav-in">
        <span class="nav-lk active" onclick="fCat('all',this)"        data-fr="Tout"        data-ar="الكل">Tout</span>
        <span class="nav-lk"        onclick="fCat('salon',this)"       data-fr="Salon"       data-ar="الصالون">Salon</span>
        <span class="nav-lk"        onclick="fCat('chambre',this)"     data-fr="Chambre"     data-ar="غرفة النوم">Chambre</span>
        <span class="nav-lk"        onclick="fCat('cuisine',this)"     data-fr="Cuisine"     data-ar="المطبخ">Cuisine</span>
        <span class="nav-lk"        onclick="fCat('bureau',this)"      data-fr="Bureau"      data-ar="المكتب">Bureau</span>
        <span class="nav-lk"        onclick="fCat('accessoires',this)" data-fr="Accessoires" data-ar="الإكسسوارات">Accessoires</span>
      </div>
    </nav>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-tag" id="h-tag">Collection Printemps 2025</div>
    <h1 id="h-title">L'art de vivre<br>dans votre espace</h1>
    <p id="h-desc">Transformez votre intérieur avec nos pièces soigneusement sélectionnées — entre élégance et authenticité.</p>
    <div class="hero-pills">
      <div class="pill">🚚 <span id="h-del">Livraison partout au Maroc</span></div>
      <div class="pill wa">
        <svg viewBox="0 0 24 24" width="14" height="14" style="fill:#25D366;flex-shrink:0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span id="h-wa-pill">Commander via WhatsApp</span>
      </div>
      <div class="pill">💳 <span id="h-pod">Paiement à la livraison</span></div>
    </div>
    <button class="hero-cta" id="h-cta">Découvrir la collection</button>
  </section>

  <!-- MAIN CONTENT -->
  <main>
    <div class="sec-hdr fade-in">
      <h2 class="sec-title" id="sec-title">Nos Produits</h2>
      <span class="sec-count" id="prod-cnt"></span>
    </div>
    <div class="filters fade-in">
      <button class="chip active" onclick="fPrice('all',this)"  data-fr="Tous les prix" data-ar="كل الأسعار">Tous les prix</button>
      <button class="chip"        onclick="fPrice('low',this)"  data-fr="–500 MAD"      data-ar="أقل من 500 درهم">–500 MAD</button>
      <button class="chip"        onclick="fPrice('mid',this)"  data-fr="500–1500 MAD"  data-ar="500–1500 درهم">500–1500 MAD</button>
      <button class="chip"        onclick="fPrice('high',this)" data-fr="+1500 MAD"     data-ar="+1500 درهم">+1500 MAD</button>
      <select class="srt" onchange="sortProds(this.value)" id="sort-sel">
        <option value="default">Trier par</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="name">Nom A–Z</option>
      </select>
    </div>
    <div class="grid" id="prod-grid"></div>
  </main>

  <!-- FOOTER -->
  <footer>
    <div class="ftr-grid">
      <div class="ftr-brand fade-in">
        <div class="logo" style="color:var(--white);">DECO<span>LAB</span></div>
        <p id="ftr-desc">Spécialiste de la décoration et du design intérieur au Maroc.</p>
        <div class="ftr-wa">
          <svg viewBox="0 0 24 24" width="16" height="16" style="fill:#25D366;flex-shrink:0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span id="ftr-wa-num">+212 691 010 969</span>
        </div>
      </div>
      <div class="ftr-col fade-in">
        <h4 id="ftr-nav-h">Navigation</h4>
        <a data-fr="Accueil"  data-ar="الرئيسية">Accueil</a>
        <a data-fr="Produits" data-ar="المنتجات">Produits</a>
        <a data-fr="À propos" data-ar="من نحن">À propos</a>
        <a data-fr="Contact"  data-ar="اتصل بنا">Contact</a>
      </div>
      <div class="ftr-col fade-in">
        <h4 id="ftr-cont-h">Contact</h4>
        <a>Casablanca, Maroc</a>
        <a>contact@decolab.ma</a>
        <a id="ftr-phone">+212 691 010 969</a>
      </div>
    </div>
    <div class="ftr-btm" id="ftr-btm">© 2025 DECOLAB — Tous droits réservés</div>
  </footer>

</div><!-- /store -->


<!-- ══════════════════════════════════════
     PRODUCT DETAIL MODAL
══════════════════════════════════════ -->
<div id="prod-modal-bg">
  <div class="prod-modal" id="prod-modal-inner"></div>
</div>


<!-- ══════════════════════════════════════
     ADMIN LOGIN OVERLAY
══════════════════════════════════════ -->
<div id="adm-login-overlay">
  <div class="login-box">
    <div class="login-logo">DECO<span>LAB</span></div>
    <div class="login-subtitle" id="login-sub">Accès sécurisé</div>
    <div class="fg">
      <label id="login-pw-lbl">Mot de passe</label>
      <input type="password" id="login-pw-inp" placeholder="••••••••">
    </div>
    <div class="login-err" id="login-err"></div>
    <button class="login-btn" id="login-btn" onclick="submitLogin()">Se connecter</button>
    <span class="login-cancel" id="login-cancel" onclick="closeAdmLogin()">Annuler</span>
  </div>
</div>


<!-- ══════════════════════════════════════
     ADMIN PANEL
══════════════════════════════════════ -->
<div id="adm">
  <aside class="adm-side">
    <div class="adm-logo">⬡ DECOLAB</div>
    <nav class="adm-nav-menu">
      <div class="adm-ni active" onclick="admSec('dashboard',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span id="nav-dash">Tableau de bord</span>
      </div>
      <div class="adm-ni" onclick="admSec('products',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
        <span id="nav-prods">Produits</span>
      </div>
      <div class="adm-ni" onclick="admSec('database',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
        <span id="nav-db">Base de données</span>
      </div>
      <div class="adm-ni" onclick="admSec('firebase',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2L2 19.7h20L12 2z"/><path d="M12 2l4.5 11.5L12 17l-4.5-3.5L12 2z"/>
        </svg>
        <span>Firebase</span>
      </div>
    </nav>
    <div class="adm-exit">
      <button class="dl-site-btn" onclick="downloadSite()" id="dl-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span id="dl-btn-lbl">Télécharger le site</span>
      </button>
      <button onclick="closeAdm()" id="exit-btn">← Retour au store</button>
    </div>
  </aside>

  <div class="adm-main">
    <div class="adm-top">
      <h2 id="adm-top-title">Tableau de bord</h2>
      <button class="lang-btn" onclick="toggleLang()">
        <span id="adm-lang-lbl">العربية</span>
      </button>
    </div>

    <div class="adm-cnt">

      <!-- WA Number Bar -->
      <div class="wa-bar">
        <div class="wa-bar-lbl">
          <svg viewBox="0 0 24 24" width="20" height="20" style="fill:#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span id="wa-bar-lbl-t">WhatsApp Business</span>
        </div>
        <input type="tel" id="wa-inp" value="+212691010969" placeholder="+212 6 00 00 00 00">
        <button class="wa-bar-sv" onclick="saveWa()" id="wa-sv-t">Enregistrer</button>
        <div class="wa-bar-st"><div class="wa-dot"></div><span id="wa-st-t">Actif</span></div>
        <span id="db-status-badge" style="padding:4px 10px;border-radius:20px;font-size:.72rem;margin-left:auto">⚠️ Mode démo</span>
      </div>

      <!-- DASHBOARD -->
      <div id="sec-dash">
        <div class="stats">
          <div class="st"><div class="st-lbl" id="st-p-lbl">Produits</div><div class="st-val" id="st-p-val">0</div><div class="st-sub" id="st-p-sub">en catalogue</div></div>
          <div class="st"><div class="st-lbl" id="st-c-lbl">Catégories</div><div class="st-val">5</div><div class="st-sub" id="st-c-sub">actives</div></div>
          <div class="st"><div class="st-lbl" id="st-l-lbl">Langues</div><div class="st-val">2</div><div class="st-sub">FR / AR</div></div>
          <div class="st wa-st"><div class="st-lbl">WhatsApp</div><div class="st-val" id="st-wa-val">+212691010969</div><div class="st-sub" id="st-wa-sub">Paiement à la livraison</div></div>
        </div>
        <div class="adm-sh">
          <h3 id="recent-t">Produits récents</h3>
          <button class="btn-add" onclick="admSec('products',document.querySelectorAll('.adm-ni')[1]);openAddModal()" id="dash-add-t">+ Ajouter</button>
        </div>
        <div id="dash-recent"></div>
      </div>

      <!-- PRODUCTS -->
      <div id="sec-prods" style="display:none;">
        <div class="adm-sh">
          <h3 id="manage-t">Gestion des produits</h3>
          <button class="btn-add" onclick="openAddModal()" id="add-btn-t">+ Ajouter un produit</button>
        </div>
        <table class="atbl">
          <thead><tr>
            <th id="th-img">Image</th>
            <th id="th-nm">Nom</th>
            <th id="th-ct">Catégorie</th>
            <th id="th-pr">Prix</th>
            <th id="th-wa">WhatsApp</th>
            <th id="th-ac">Actions</th>
          </tr></thead>
          <tbody id="adm-tbody"></tbody>
        </table>
      </div>

      <!-- DATABASE SECTION -->
      <div id="sec-db" style="display:none;">
        <!-- IO bar -->
        <div class="db-io-bar">
          <span id="db-io-label">Base de données locale — IndexedDB</span>
          <button class="db-io-btn export" onclick="dbExportJSON()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span id="db-export-lbl">Exporter JSON</span>
          </button>
          <label class="db-io-btn import-btn" style="cursor:pointer;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span id="db-import-lbl">Importer JSON</span>
            <input type="file" accept=".json" style="display:none" onchange="dbImportJSON(this)">
          </label>
        </div>
        <!-- Stats chips -->
        <div class="db-stats-row" id="db-stats-row"></div>
        <!-- Topbar: search + filter + add -->
        <div class="db-topbar">
          <div class="db-search-wrap">
            <input type="text" id="db-search" placeholder="Rechercher dans la base..." oninput="dbRender()">
            <select class="db-filter-sel" id="db-filter-cat" onchange="dbRender()">
              <option value="all">Toutes catégories</option>
              <option value="salon">Salon / الصالون</option>
              <option value="chambre">Chambre / غرفة النوم</option>
              <option value="cuisine">Cuisine / المطبخ</option>
              <option value="bureau">Bureau / المكتب</option>
              <option value="accessoires">Accessoires / الإكسسوارات</option>
            </select>
          </div>
          <button class="btn-add" onclick="admSec('products',document.querySelectorAll('.adm-ni')[1]);openAddModal()" id="db-add-btn">+ Ajouter</button>
        </div>
        <!-- Table -->
        <div class="db-table-wrap">
          <table class="db-table">
            <thead>
              <tr>
                <th onclick="dbSort('img')"  style="width:60px" id="dbth-img">Image</th>
                <th onclick="dbSort('id')"   id="dbth-id">ID <span class="sort-arrow" id="dbarr-id"></span></th>
                <th onclick="dbSort('nfr')"  id="dbth-name">Nom <span class="sort-arrow" id="dbarr-nfr"></span></th>
                <th onclick="dbSort('cat')"  id="dbth-cat">Catégorie <span class="sort-arrow" id="dbarr-cat"></span></th>
                <th onclick="dbSort('price')" id="dbth-price">Prix <span class="sort-arrow" id="dbarr-price"></span></th>
                <th onclick="dbSort('date')" id="dbth-date">Ajouté le <span class="sort-arrow" id="dbarr-date"></span></th>
                <th id="dbth-act">Actions</th>
              </tr>
            </thead>
            <tbody id="db-tbody"></tbody>
          </table>
        </div>
      </div>

    </div>

      <!-- FIREBASE CONFIG SECTION -->
      <div id="sec-fb" style="display:none;">
        <div style="max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#FF6B35,#F7C59F);border-radius:8px;padding:2rem;margin-bottom:2rem;color:#fff;display:flex;align-items:center;gap:1.5rem;">
            <svg viewBox="0 0 24 24" width="48" height="48" style="fill:#fff;flex-shrink:0">
              <path d="M12 2L2 19.7h20L12 2z"/><path opacity=".5" d="M12 2l4.5 11.5L12 17l-4.5-3.5L12 2z"/>
            </svg>
            <div>
              <h2 id="fb-config-title" style="font-family:var(--font-d);font-size:1.6rem;font-weight:500;margin-bottom:.4rem">Configuration Firebase</h2>
              <p id="fb-config-desc" style="font-size:.85rem;opacity:.9">Entrez vos clés Firebase pour activer la base de données cloud.</p>
            </div>
          </div>
          <div style="background:var(--white);border:1px solid var(--border);border-radius:4px;padding:2rem;">
            <div style="display:grid;gap:1rem;">
              <div class="fg"><label>API Key</label><input id="fb-api-key" placeholder="AIzaSy..."></div>
              <div class="fg"><label>Auth Domain</label><input id="fb-auth-domain" placeholder="mon-projet.firebaseapp.com"></div>
              <div class="fg"><label>Project ID</label><input id="fb-project-id" placeholder="mon-projet"></div>
              <div class="fg"><label>Storage Bucket</label><input id="fb-storage" placeholder="mon-projet.appspot.com"></div>
              <div class="fg"><label>Messaging Sender ID</label><input id="fb-sender-id" placeholder="123456789"></div>
              <div class="fg"><label>App ID</label><input id="fb-app-id" placeholder="1:123:web:abc..."></div>
            </div>
            <div style="margin-top:1.5rem;display:flex;gap:1rem;align-items:center;">
              <button class="btn-add" onclick="saveFbConfig()" id="fb-save-config-btn" style="background:#FF6B35">Connecter Firebase</button>
              <a href="https://console.firebase.google.com" target="_blank" style="font-size:.8rem;color:var(--accent)">Ouvrir la console Firebase →</a>
            </div>
            <div style="margin-top:1.5rem;padding:1rem;background:var(--gray-50);border-radius:4px;font-size:.78rem;color:var(--muted);line-height:1.8;">
              <strong>Guide rapide :</strong><br>
              1. Créez un projet sur <a href="https://console.firebase.google.com" target="_blank" style="color:var(--accent)">console.firebase.google.com</a><br>
              2. Activez <strong>Firestore Database</strong> (mode test pour commencer)<br>
              3. Allez dans Paramètres du projet → Vos applications → Ajoutez une app Web<br>
              4. Copiez les clés dans les champs ci-dessus et cliquez Connecter
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div><!-- /admin -->

<!-- DB RECORD DRAWER -->
<div id="db-drawer-bg">
  <div class="db-drawer">
    <div class="db-drawer-hdr">
      <h3 id="db-drawer-title">Détail du produit</h3>
      <button class="db-drawer-close" onclick="closeDbDrawer()">✕</button>
    </div>
    <div class="db-drawer-body" id="db-drawer-body"></div>
    <div class="db-drawer-ftr" id="db-drawer-ftr"></div>
  </div>
</div>


<!-- ══════════════════════════════════════
     PRODUCT FORM MODAL
══════════════════════════════════════ -->
<div class="mbg" id="mbg">
  <div class="modal">
    <div class="mhdr">
      <h3 id="modal-title">Ajouter un produit</h3>
      <button class="mclose" onclick="closeModal()">✕</button>
    </div>
    <div class="mbody">
      <div class="ftabs">
        <button class="ftab active" onclick="swTab('fr',this)">🇫🇷 Français</button>
        <button class="ftab"        onclick="swTab('ar',this)">🇲🇦 العربية</button>
        <button class="ftab"        onclick="swTab('common',this)" id="tab-gen">⚙ Général</button>
      </div>

      <!-- FR -->
      <div class="lform show" id="lf-fr">
        <div class="fgrid">
          <div class="fg full">
            <label>Nom du produit (FR)</label>
            <input id="f-nfr" placeholder="Ex: Canapé Andalou">
          </div>
          <div class="fg full">
            <label>Description (FR)</label>
            <textarea id="f-dfr" placeholder="Description détaillée en français..."></textarea>
          </div>
        </div>
      </div>

      <!-- AR -->
      <div class="lform" id="lf-ar" style="direction:rtl;">
        <div class="fgrid">
          <div class="fg full">
            <label style="font-family:var(--font-ar)">اسم المنتج (AR)</label>
            <input id="f-nar" style="font-family:var(--font-ar)" placeholder="مثال: أريكة الأندلس">
          </div>
          <div class="fg full">
            <label style="font-family:var(--font-ar)">الوصف (AR)</label>
            <textarea id="f-dar" style="font-family:var(--font-ar)" placeholder="وصف تفصيلي..."></textarea>
          </div>
        </div>
      </div>

      <!-- COMMON -->
      <div class="lform" id="lf-common">
        <div class="fgrid">
          <div class="fg">
            <label id="lbl-pr">Prix (MAD)</label>
            <input type="number" id="f-price" placeholder="850" min="0">
          </div>
          <div class="fg">
            <label id="lbl-ct">Catégorie</label>
            <select id="f-cat">
              <option value="salon">Salon / الصالون</option>
              <option value="chambre">Chambre / غرفة النوم</option>
              <option value="cuisine">Cuisine / المطبخ</option>
              <option value="bureau">Bureau / المكتب</option>
              <option value="accessoires">Accessoires / الإكسسوارات</option>
            </select>
          </div>
          <div class="fg">
            <label id="lbl-bd">Badge promo</label>
            <input id="f-badge" placeholder="Nouveauté / جديد">
          </div>
          <div class="fg">
            <label id="lbl-em">Icône emoji</label>
            <input id="f-emoji" maxlength="4" placeholder="🛋️">
          </div>
          <hr class="fdiv">
          <div class="fg full">
            <label id="lbl-im">Images produit</label>
            <div class="img-drop" onclick="document.getElementById('img-inp').click()">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                   fill="none" stroke="var(--brown-400)" stroke-width="1.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p id="upl-hint">Cliquez pour ajouter des images</p>
            </div>
            <input type="file" id="img-inp" accept="image/*" multiple
                   style="display:none" onchange="prevImgs(this)">
            <div class="img-prev" id="img-prev"></div>
          </div>
        </div>
      </div>

    </div>
    <div class="mftr">
      <button class="btn-cx" onclick="closeModal()" id="btn-cx">Annuler</button>
      <button class="btn-sv" onclick="saveProduct()" id="btn-sv">Enregistrer</button>
    </div>
  </div>
</div>


<!-- DOWNLOAD OVERLAY -->
<div id="dl-overlay">
  <div class="dl-box">
    <div class="dl-box-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    </div>
    <h3 id="dl-title">Préparation du site...</h3>
    <p id="dl-desc">Intégration des produits et des images en cours.</p>
    <div class="dl-progress-wrap"><div class="dl-progress-bar" id="dl-bar"></div></div>
    <div class="dl-status" id="dl-status">0%</div>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast"></div>

<!-- SCROLL TOP -->
<button class="scroll-top" onclick="scrollTop()" title="Haut de page">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 15l-6-6-6 6"/>
  </svg>
</button>


<!-- Scripts -->
<!-- fflate ZIP library -->
<script>
/* ═══════════════════════════════════════════════════════
   DECOLAB — app.js (Firebase Edition)
═══════════════════════════════════════════════════════ */
let lang='fr',cat='all',pf='all',editId=null,imgs=[],waNum='+212691010969';
const ADMIN_PASS='decolab2025';
let prods=[];

const DEMO_PRODS=[
  {id:'prod_1',nfr:'Canapé Velours Andalou',nar:'أريكة المخمل الأندلسي',dfr:'Canapé 3 places en velours côtelé couleur moka. Structure en bois massif, pieds dorés.',dar:'أريكة 3 مقاعد من المخمل المضلع بلون الموكا. هيكل من الخشب الصلب، أرجل ذهبية.',price:4200,cat:'salon',badge:'Nouveauté',emoji:'🛋️',images:[],createdAt:Date.now()},
  {id:'prod_2',nfr:'Table Basse Marbre Noir',nar:'طاولة الرخام الأسود',dfr:'Table basse en marbre noir veiné de blanc. Pieds en métal brossé mat.',dar:'طاولة سفلية من الرخام الأسود المعروق. أرجل معدنية مصقولة.',price:1850,cat:'salon',badge:'',emoji:'🪨',images:[],createdAt:Date.now()},
  {id:'prod_3',nfr:'Luminaire Suspension Rattan',nar:'مصباح الروطان المعلق',dfr:'Suspension artisanale en rotin naturel tressé. Diamètre 45cm.',dar:'مصباح يدوي من الروطان الطبيعي المجدول. قطر 45 سم.',price:680,cat:'accessoires',badge:'Artisanal',emoji:'💡',images:[],createdAt:Date.now()},
  {id:'prod_4',nfr:'Lit Plateforme Noyer',nar:'سرير منصة الجوز',dfr:'Lit 160×200 en bois de noyer massif. Tête de lit rembourrée en tissu sable.',dar:'سرير 160×200 من خشب الجوز الصلب. رأس سرير منجد بقماش رملي.',price:6900,cat:'chambre',badge:'',emoji:'🛏️',images:[],createdAt:Date.now()},
  {id:'prod_5',nfr:'Étagère Industrielle',nar:'رف المستودع الصناعي',dfr:'Étagère 5 niveaux en métal noir mat. H 180cm. Style loft.',dar:'رف 5 طوابق من المعدن الأسود. ارتفاع 180 سم. طراز لوفت.',price:1200,cat:'bureau',badge:'',emoji:'🗄️',images:[],createdAt:Date.now()},
  {id:'prod_6',nfr:'Carafe & Verres Soufflés',nar:'إبريق وكؤوس منفوخة',dfr:'Set carafe + 6 verres soufflés. Teinte ambre naturelle.',dar:'طقم إبريق و6 كؤوس من الزجاج المنفوخ. لون عنبري طبيعي.',price:420,cat:'cuisine',badge:'Exclusif',emoji:'🫙',images:[],createdAt:Date.now()},
];


/* ─── FIREBASE CONFIG — remplacez par vos clés ─── */
const FIREBASE_CONFIG = {
  apiKey:            "VOTRE_API_KEY",
  authDomain:        "VOTRE_PROJECT.firebaseapp.com",
  projectId:         "VOTRE_PROJECT_ID",
  storageBucket:     "VOTRE_PROJECT.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId:             "VOTRE_APP_ID"
};

let _fbApp=null, _db=null, _fbOK=false, _unsubscribe=null;
const FB_COL='products', FB_META='decolab_meta';

function showDbStatus(mode){
  const el=document.getElementById('db-status-badge');if(!el)return;
  const m={firebase:{text:'🔥 Firebase Firestore',bg:'#FF6B3522',border:'#FF6B3555',color:'#FF6B35'},
            idb:{text:'💾 IndexedDB (local)',bg:'#4A90D922',border:'#4A90D955',color:'#4A90D9'},
            demo:{text:'⚠️ Mode démo — Configurez Firebase',bg:'#E8A83822',border:'#E8A83855',color:'#E8A838'}}[mode]||{text:'',bg:'',border:'',color:''};
  el.textContent=m.text;el.style.background=m.bg;el.style.border=`1px solid ${m.border}`;el.style.color=m.color;
}


async function fbInit(){
  loadSavedFbConfig();
  try{
    if(FIREBASE_CONFIG.apiKey==='VOTRE_API_KEY'||!FIREBASE_CONFIG.apiKey){
      showDbStatus('demo');await idbInit();return;
    }
    // Use Firebase globals from CDN scripts loaded in <head>
    if(typeof firebase==='undefined'&&typeof window.initializeApp==='undefined'){
      console.warn('Firebase SDK not loaded — using IndexedDB fallback');
      showDbStatus('idb');await idbInit();return;
    }
    // Try compat SDK (firebase global) or modular SDK
    let app, db;
    if(typeof firebase!=='undefined'&&firebase.initializeApp){
      // Firebase compat SDK
      try{firebase.initializeApp(FIREBASE_CONFIG);}catch(e){}
      db = firebase.firestore();
      window._fsCompat = db;
      _fbOK = true;
      _db = db;
      showDbStatus('firebase');
      await fbLoadProdsCompat();
      fbListenCompat();
      await fbLoadMetaCompat();
    } else {
      console.warn('No Firebase SDK found — using IndexedDB');
      showDbStatus('idb');await idbInit();
    }
  }catch(err){
    console.warn('Firebase init failed:',err.message||err);
    showDbStatus('idb');await idbInit();
  }
}

async function fbLoadProdsCompat(){
  if(!_fbOK||!window._fsCompat)return;
  try{
    const snap=await window._fsCompat.collection(FB_COL).get();
    const rows=[];snap.forEach(d=>rows.push({id:d.id,...d.data()}));
    if(rows.length>0)prods=rows.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
    else await fbSeedDemoCompat();
  }catch(e){console.warn('Firestore load:',e.message);}
}

async function fbSeedDemoCompat(){
  if(!_fbOK||!window._fsCompat)return;
  try{
    const batch=window._fsCompat.batch();
    DEMO_PRODS.forEach(p=>batch.set(window._fsCompat.collection(FB_COL).doc(p.id),p));
    await batch.commit();prods=[...DEMO_PRODS];
  }catch(e){console.warn('Seed:',e.message);}
}

function fbListenCompat(){
  if(!_fbOK||!window._fsCompat)return;
  if(_unsubscribe)_unsubscribe();
  _unsubscribe=window._fsCompat.collection(FB_COL).onSnapshot(snap=>{
    const rows=[];snap.forEach(d=>rows.push({id:d.id,...d.data()}));
    prods=rows.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
    renderProds();renderAdmTbl();renderDashRecent();
    const el=document.getElementById('st-p-val');if(el)el.textContent=prods.length;
    updCount();
  },e=>console.warn('Listen:',e.message));
}

async function fbLoadMetaCompat(){
  if(!_fbOK||!window._fsCompat)return;
  try{
    const snap=await window._fsCompat.collection('meta').doc(FB_META).get();
    if(snap.exists){const d=snap.data();if(d&&d.waNum){waNum=d.waNum;const inp=document.getElementById('wa-inp');if(inp)inp.value=waNum;const el=document.getElementById('st-wa-val');if(el)el.textContent=waNum;}}
  }catch(e){}
}








function idbInit(){return new Promise(resolve=>{const req=indexedDB.open(IDB_NAME,IDB_VER);req.onupgradeneeded=e=>{const db=e.target.result;if(!db.objectStoreNames.contains(IDB_STORE))db.createObjectStore(IDB_STORE,{keyPath:'id'});};req.onsuccess=e=>{_idb=e.target.result;idbLoad().then(resolve).catch(resolve);};req.onerror=()=>{prods=[...DEMO_PRODS];resolve();};})}
function idbLoad(){return new Promise(resolve=>{if(!_idb){prods=[...DEMO_PRODS];resolve();return;}const tx=_idb.transaction(IDB_STORE,'readonly');const req=tx.objectStore(IDB_STORE).getAll();req.onsuccess=e=>{const rows=e.target.result;prods=(rows&&rows.length)?rows.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)):[...DEMO_PRODS];if(!rows||!rows.length)idbSave();resolve();};req.onerror=()=>{prods=[...DEMO_PRODS];resolve();};})}

async function fbSaveProduct(prod){
  idbSave(); // always save locally
  if(!_fbOK||!window._fsCompat)return;
  try{await window._fsCompat.collection(FB_COL).doc(String(prod.id)).set(prod);}
  catch(e){console.warn('Save:',e.message);}
}

async function fbDeleteProduct(id){
  idbSave();
  if(!_fbOK||!window._fsCompat)return;
  try{await window._fsCompat.collection(FB_COL).doc(String(id)).delete();}
  catch(e){console.warn('Delete:',e.message);}
}

async function fbSaveMeta(key,value){
  if(!_fbOK||!window._fsCompat)return;
  try{await window._fsCompat.collection('meta').doc(FB_META).set({[key]:value},{merge:true});}
  catch(e){}
}

function idbSave(){if(!_idb)return;const tx=_idb.transaction(IDB_STORE,'readwrite');const st=tx.objectStore(IDB_STORE);st.clear();prods.forEach(p=>st.put(p));}

/* ─── TRANSLATIONS ─── */
const T={
  fr:{
    srchPh:'Rechercher un produit...',langLbl:'العربية',admBtn:'Admin',
    hTag:'Collection Printemps 2025',hTitle:"L'art de vivre<br>dans votre espace",
    hDesc:'Transformez votre intérieur avec nos pièces soigneusement sélectionnées.',
    hCta:'Découvrir la collection',hDel:'Livraison partout au Maroc',hWaPill:'Commander via WhatsApp',hPod:'Paiement à la livraison',
    secTitle:'Nos Produits',waBtn:'Commander via WhatsApp',podLbl:'Paiement à la livraison',
    waMsg:(n,p)=>`Bonjour 👋\n\nJe souhaite commander :\n🛒 *${n}*\n💰 Prix : ${p} MAD\n\n✅ Paiement à la livraison\n\nMerci !`,
    shareMsg:(n,p)=>`🏠 *DECOLAB*\n\n✨ Découvrez :\n🛒 *${n}*\n💰 ${p} MAD\n\n📲 Commandez via WhatsApp !`,
    navDash:'Tableau de bord',navPrds:'Produits',navDb:'Base de données',exitBtn:'← Retour au store',
    admTop:'Tableau de bord',stPLbl:'Produits',stPSub:'en catalogue',stCLbl:'Catégories',stCSub:'actives',stLLbl:'Langues',stWaSub:'Paiement à la livraison',
    recentT:'Produits récents',dashAdd:'+ Ajouter',manageT:'Gestion des produits',addBtnT:'+ Ajouter un produit',
    thImg:'Image',thNm:'Nom',thCt:'Catégorie',thPr:'Prix',thWa:'WhatsApp',thAc:'Actions',
    waBarT:'WhatsApp Business',waSvT:'Enregistrer',waStT:'Actif',
    mAdd:'Ajouter un produit',mEdit:'Modifier le produit',tabGen:'⚙ Général',
    lblPr:'Prix (MAD)',lblCt:'Catégorie',lblBd:'Badge promo',lblEm:'Icône emoji',lblIm:'Images produit',
    uplHint:'Cliquez pour ajouter des images',btnCx:'Annuler',btnSv:'Enregistrer',
    ftrDesc:'Spécialiste de la décoration et du design intérieur au Maroc.',
    ftrNavH:'Navigation',ftrContH:'Contact',ftrBtm:'© 2025 DECOLAB — Tous droits réservés',
    edit:'Modifier',del:'Supprimer',waTest:'Tester ↗',
    toastSv:'Produit enregistré ✓',toastDl:'Produit supprimé.',toastWa:'Numéro WhatsApp mis à jour ✓',
    toastShare:'Message WhatsApp ouvert !',
    pCount:n=>`${n} produit${n>1?'s':''}`,
    confirmDl:'Supprimer ce produit ?',valErr:'Remplissez les champs obligatoires.',
    fAll:'Tous les prix',fLow:'–500 MAD',fMid:'500–1500 MAD',fHigh:'+1500 MAD',
    srtDef:'Trier par',srtAsc:'Prix croissant',srtDesc:'Prix décroissant',srtNm:'Nom A–Z',
    loginTitle:'Espace Administrateur',loginSub:'Accès sécurisé',
    loginPwLbl:'Mot de passe',loginBtn:'Se connecter',loginCancel:'Annuler',loginErr:'Mot de passe incorrect.',
    pmOrder:'Commander via WhatsApp',pmShare:'Partager ce produit',pmPod:'Paiement à la livraison',
    dlBtn:'Télécharger le site',dlTitle:'Préparation...',dlDesc:'Construction des fichiers.',dlDone:'Site téléchargé !',
    dbIoLabel:'Base de données',dbExportLbl:'Exporter JSON',dbImportLbl:'Importer JSON',dbAddBtn:'+ Ajouter',dbSearch:'Rechercher...',
    dbThImg:'Image',dbThId:'ID',dbThName:'Nom',dbThCat:'Catégorie',dbThPrice:'Prix',dbThDate:'Ajouté le',dbThAct:'Actions',
    dbEmpty:'Aucun produit.',dbEmptyHint:'Commencez par ajouter un produit.',
    dbDrawerTitle:'Détail produit',dbEditBtn:'Modifier',dbDelBtn:'Supprimer',
    dbStatsTotal:'Total',dbStatsWithImg:'Avec image',dbCatAll:'Toutes catégories',
    dbToastImport:n=>`${n} produit(s) importé(s) !`,dbToastExport:'Base exportée en JSON !',
    dbSortAsc:'↑',dbSortDesc:'↓',
    fbConfigTitle:'Configuration Firebase',fbConfigDesc:'Entrez vos clés Firebase pour activer la base de données cloud.',fbSaveConfig:'Connecter Firebase',
  },
  ar:{
    srchPh:'ابحث عن منتج...',langLbl:'Français',admBtn:'الإدارة',
    hTag:'مجموعة ربيع 2025',hTitle:'فن العيش<br>في فضائك',
    hDesc:'حوّل ديكور منزلك بقطع مختارة بعناية — بين الأناقة والأصالة.',
    hCta:'اكتشف المجموعة',hDel:'توصيل في جميع أنحاء المغرب',hWaPill:'اطلب عبر واتساب',hPod:'الدفع عند الاستلام',
    secTitle:'منتجاتنا',waBtn:'اطلب عبر واتساب',podLbl:'الدفع عند الاستلام',
    waMsg:(n,p)=>`مرحباً 👋\n\nأود الطلب:\n🛒 *${n}*\n💰 السعر: ${p} درهم\n\n✅ الدفع عند الاستلام\n\nشكراً!`,
    shareMsg:(n,p)=>`🏠 *DECOLAB*\n\n✨ اكتشف:\n🛒 *${n}*\n💰 ${p} درهم\n\n📲 اطلب عبر واتساب!`,
    navDash:'لوحة التحكم',navPrds:'المنتجات',navDb:'قاعدة البيانات',exitBtn:'العودة للمتجر →',
    admTop:'لوحة التحكم',stPLbl:'المنتجات',stPSub:'في الكتالوج',stCLbl:'الفئات',stCSub:'نشطة',stLLbl:'اللغات',stWaSub:'الدفع عند الاستلام',
    recentT:'المنتجات الأخيرة',dashAdd:'+ إضافة',manageT:'إدارة المنتجات',addBtnT:'+ إضافة منتج',
    thImg:'الصورة',thNm:'الاسم',thCt:'الفئة',thPr:'السعر',thWa:'واتساب',thAc:'الإجراءات',
    waBarT:'واتساب بيزنس',waSvT:'حفظ',waStT:'نشط',
    mAdd:'إضافة منتج',mEdit:'تعديل المنتج',tabGen:'⚙ عام',
    lblPr:'السعر (MAD)',lblCt:'الفئة',lblBd:'شارة العرض',lblEm:'أيقونة',lblIm:'صور المنتج',
    uplHint:'انقر لإضافة صور',btnCx:'إلغاء',btnSv:'حفظ',
    ftrDesc:'متخصصون في الديكور والتصميم الداخلي بالمغرب.',
    ftrNavH:'التنقل',ftrContH:'اتصل بنا',ftrBtm:'© 2025 DECOLAB — جميع الحقوق محفوظة',
    edit:'تعديل',del:'حذف',waTest:'اختبار ↗',
    toastSv:'تم حفظ المنتج ✓',toastDl:'تم حذف المنتج.',toastWa:'تم تحديث رقم واتساب ✓',
    toastShare:'تم فتح رسالة واتساب!',
    pCount:n=>`${n} منتج`,
    confirmDl:'هل تريد حذف هذا المنتج؟',valErr:'يرجى ملء الحقول الأساسية.',
    fAll:'كل الأسعار',fLow:'أقل من 500',fMid:'500–1500',fHigh:'+1500',
    srtDef:'ترتيب حسب',srtAsc:'السعر: الأقل',srtDesc:'السعر: الأعلى',srtNm:'الاسم',
    loginTitle:'لوحة الإدارة',loginSub:'وصول آمن',
    loginPwLbl:'كلمة المرور',loginBtn:'دخول',loginCancel:'إلغاء',loginErr:'كلمة المرور غير صحيحة.',
    pmOrder:'اطلب عبر واتساب',pmShare:'مشاركة المنتج',pmPod:'الدفع عند الاستلام',
    dlBtn:'تحميل الموقع',dlTitle:'جاهز...',dlDesc:'بناء الملفات.',dlDone:'تم تحميل الموقع!',
    dbIoLabel:'قاعدة البيانات',dbExportLbl:'تصدير JSON',dbImportLbl:'استيراد JSON',dbAddBtn:'+ إضافة',dbSearch:'البحث...',
    dbThImg:'الصورة',dbThId:'المعرف',dbThName:'الاسم',dbThCat:'الفئة',dbThPrice:'السعر',dbThDate:'تاريخ الإضافة',dbThAct:'الإجراءات',
    dbEmpty:'لا توجد منتجات.',dbEmptyHint:'ابدأ بإضافة منتج.',
    dbDrawerTitle:'تفاصيل المنتج',dbEditBtn:'تعديل',dbDelBtn:'حذف',
    dbStatsTotal:'المجموع',dbStatsWithImg:'مع صورة',dbCatAll:'جميع الفئات',
    dbToastImport:n=>`${n} منتج(ات) مستوردة!`,dbToastExport:'تم تصدير القاعدة JSON!',
    dbSortAsc:'↑',dbSortDesc:'↓',
    fbConfigTitle:'إعداد Firebase',fbConfigDesc:'أدخل مفاتيح Firebase لتفعيل قاعدة البيانات السحابية.',fbSaveConfig:'ربط Firebase',
  }
};
const CATS={fr:{salon:'Salon',chambre:'Chambre',cuisine:'Cuisine',bureau:'Bureau',accessoires:'Accessoires'},ar:{salon:'الصالون',chambre:'غرفة النوم',cuisine:'المطبخ',bureau:'المكتب',accessoires:'الإكسسوارات'}};

const waSvg=(w=18,h=18,col='#fff')=>`<svg viewBox="0 0 24 24" width="${w}" height="${h}" style="fill:${col};flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`;

window.addEventListener('load',()=>{const pl=document.getElementById('preloader');if(!pl)return;setTimeout(()=>pl.classList.add('hidden'),1200);});
window.addEventListener('scroll',()=>{document.querySelector('header')?.classList.toggle('scrolled',window.scrollY>20);document.querySelector('.scroll-top')?.classList.toggle('show',window.scrollY>400);});
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});

function toggleLang(){lang=lang==='fr'?'ar':'fr';applyLang();renderProds();renderAdmTbl();renderDashRecent();}

function applyLang(){
  const t=T[lang],ar=lang==='ar';
  document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';
  document.body.classList.toggle('ar',ar);
  const setT=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
  const setH=(id,val)=>{const el=document.getElementById(id);if(el)el.innerHTML=val;};
  document.getElementById('srch-inp').placeholder=t.srchPh;
  setT('lang-lbl',t.langLbl);setT('adm-lang-lbl',t.langLbl);setT('adm-btn-t',t.admBtn);
  setT('h-tag',t.hTag);setH('h-title',t.hTitle);setT('h-desc',t.hDesc);setT('h-cta',t.hCta);
  setT('h-del',t.hDel);setT('h-wa-pill',t.hWaPill);setT('h-pod',t.hPod);
  setT('sec-title',t.secTitle);
  setT('nav-dash',t.navDash);setT('nav-prods',t.navPrds);setT('nav-db',t.navDb);setT('exit-btn',t.exitBtn);
  setT('adm-top-title',t.admTop);
  setT('st-p-lbl',t.stPLbl);setT('st-p-sub',t.stPSub);setT('st-c-lbl',t.stCLbl);setT('st-c-sub',t.stCSub);
  setT('st-l-lbl',t.stLLbl);setT('st-wa-sub',t.stWaSub);
  setT('recent-t',t.recentT);setT('dash-add-t',t.dashAdd);setT('manage-t',t.manageT);setT('add-btn-t',t.addBtnT);
  setT('th-img',t.thImg);setT('th-nm',t.thNm);setT('th-ct',t.thCt);setT('th-pr',t.thPr);setT('th-wa',t.thWa);setT('th-ac',t.thAc);
  setT('wa-bar-lbl-t',t.waBarT);setT('wa-sv-t',t.waSvT);setT('wa-st-t',t.waStT);
  setT('modal-title',editId?t.mEdit:t.mAdd);setT('tab-gen',t.tabGen);
  setT('lbl-pr',t.lblPr);setT('lbl-ct',t.lblCt);setT('lbl-bd',t.lblBd);setT('lbl-em',t.lblEm);setT('lbl-im',t.lblIm);setT('upl-hint',t.uplHint);
  setT('btn-cx',t.btnCx);setT('btn-sv',t.btnSv);
  setT('ftr-desc',t.ftrDesc);setT('ftr-nav-h',t.ftrNavH);setT('ftr-cont-h',t.ftrContH);setT('ftr-btm',t.ftrBtm);
  setT('login-title',t.loginTitle);setT('login-sub',t.loginSub);setT('login-pw-lbl',t.loginPwLbl);setT('login-btn',t.loginBtn);setT('login-cancel',t.loginCancel);
  setT('dl-btn-lbl',t.dlBtn);
  setT('db-io-label',t.dbIoLabel);setT('db-export-lbl',t.dbExportLbl);setT('db-import-lbl',t.dbImportLbl);setT('db-add-btn',t.dbAddBtn);
  const dbSrch=document.getElementById('db-search');if(dbSrch)dbSrch.placeholder=t.dbSearch;
  setT('dbth-img',t.dbThImg);setT('dbth-id',t.dbThId);setT('dbth-name',t.dbThName);setT('dbth-cat',t.dbThCat);setT('dbth-price',t.dbThPrice);setT('dbth-date',t.dbThDate);setT('dbth-act',t.dbThAct);
  setT('fb-config-title',t.fbConfigTitle);setT('fb-config-desc',t.fbConfigDesc);setT('fb-save-config-btn',t.fbSaveConfig);
  document.querySelectorAll('[data-fr]').forEach(el=>el.textContent=el.getAttribute('data-'+lang));
  const s=document.getElementById('sort-sel');if(s){s.options[0].text=t.srtDef;s.options[1].text=t.srtAsc;s.options[2].text=t.srtDesc;s.options[3].text=t.srtNm;}
  document.getElementById('st-p-val').textContent=prods.length;updCount();
}

const gN=p=>lang==='ar'?p.nar:p.nfr;
const gD=p=>lang==='ar'?p.dar:p.dfr;
const fmt=n=>n.toLocaleString('fr-MA');
const waLink=(name,price)=>`https://wa.me/${waNum.replace(/[\s\-]/g,'')}?text=${encodeURIComponent(T[lang].waMsg(name,fmt(price)))}`;
const shareLink=(name,price)=>`https://wa.me/${waNum.replace(/[\s\-]/g,'')}?text=${encodeURIComponent(T[lang].shareMsg(name,fmt(price)))}`;

function getFilt(){let l=[...prods];if(cat!=='all')l=l.filter(p=>p.cat===cat);const s=document.getElementById('srch-inp')?.value.toLowerCase()||'';if(s)l=l.filter(p=>p.nfr.toLowerCase().includes(s)||p.nar.includes(s)||p.dfr.toLowerCase().includes(s)||p.dar.includes(s));if(pf==='low')l=l.filter(p=>p.price<500);else if(pf==='mid')l=l.filter(p=>p.price>=500&&p.price<=1500);else if(pf==='high')l=l.filter(p=>p.price>1500);return l;}

function renderProds(){
  const grid=document.getElementById('prod-grid');if(!grid)return;
  const list=getFilt();updCount(list.length);const t=T[lang];
  if(!list.length){grid.innerHTML=`<div class="no-prod">${lang==='ar'?'لا توجد منتجات':'Aucun produit trouvé'}</div>`;return;}
  grid.innerHTML=list.map(p=>{
    const im=p.images&&p.images[0]?`<img src="${p.images[0]}" alt="${gN(p)}" loading="lazy">`:`<span>${p.emoji||'🏠'}</span>`;
    const bd=p.badge?`<div class="cbadge">${p.badge}</div>`:'';
    const wl=waLink(gN(p),p.price);
    return `<div class="card fade-in" onclick="openProdModal('${p.id}')">
      <div class="card-img">${im}${bd}
        <button class="share-icon" title="Partager" onclick="event.stopPropagation();shareProd('${p.id}')">${waSvg(16,16,'#25D366')}</button>
      </div>
      <div class="card-body">
        <div class="card-cat">${CATS[lang][p.cat]||p.cat}</div>
        <div class="card-name">${gN(p)}</div>
        <div class="card-desc">${gD(p)}</div>
        <div class="card-price">${fmt(p.price)} <span>MAD</span></div>
        <a href="${wl}" target="_blank" class="wa-btn" onclick="event.stopPropagation()">${waSvg()} ${t.waBtn}</a>
        <div class="pod-tag"><svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" width="12" height="12"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>${t.podLbl}</div>
      </div></div>`;
  }).join('');
  document.querySelectorAll('.card.fade-in:not(.visible)').forEach(el=>observer.observe(el));
}

function updCount(n){const c=n!==undefined?n:getFilt().length;const el=document.getElementById('prod-cnt');if(el)el.textContent=T[lang].pCount(c);}
function fCat(c,el){cat=c;document.querySelectorAll('.nav-lk').forEach(l=>l.classList.remove('active'));el.classList.add('active');renderProds();}
function fPrice(r,el){pf=r;document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');renderProds();}
function sortProds(v){if(v==='price-asc')prods.sort((a,b)=>a.price-b.price);else if(v==='price-desc')prods.sort((a,b)=>b.price-a.price);else if(v==='name')prods.sort((a,b)=>gN(a).localeCompare(gN(b)));renderProds();}

/* ─── PRODUCT MODAL WITH GALLERY ─── */
let _galIdx=0,_galImgs=[],_galTouchX=null;
function openProdModal(id){
  const p=prods.find(x=>String(x.id)===String(id));if(!p)return;
  const t=T[lang];_galImgs=(p.images&&p.images.length)?p.images:[];_galIdx=0;
  const wl=waLink(gN(p),p.price);const bd=p.badge?`<div class="pm-badge">${p.badge}</div>`:'';const total=_galImgs.length||1;
  const slidesHtml=_galImgs.length?_galImgs.map(src=>`<div class="pm-slide"><img src="${src}" alt="${gN(p)}"></div>`).join(''):`<div class="pm-slide"><span style="font-size:6rem">${p.emoji||'🏠'}</span></div>`;
  const arrows=total>1?`<button class="pm-arrow prev" id="pm-prev" onclick="galNav(-1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button><button class="pm-arrow next" id="pm-next" onclick="galNav(1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>`:'';
  const counter=total>1?`<div class="pm-counter" id="pm-counter">1 / ${total}</div>`:'';
  const thumbs=(_galImgs.length>1)?`<div class="pm-thumbs" id="pm-thumbs">${_galImgs.map((src,i)=>`<div class="pm-thumb ${i===0?'active':''}" onclick="galGoTo(${i})"><img src="${src}" alt=""></div>`).join('')}</div>`:'';
  document.getElementById('prod-modal-inner').innerHTML=`
    <div class="pm-gallery" id="pm-gallery">
      <div class="pm-slides" id="pm-slides">${slidesHtml}</div>
      ${bd}${counter}${arrows}${thumbs}
      <button class="pm-close" onclick="closeProdModal()">✕</button>
    </div>
    <div class="pm-info">
      <div class="pm-cat">${CATS[lang][p.cat]||p.cat}</div>
      <div class="pm-name">${gN(p)}</div>
      <div class="pm-price">${fmt(p.price)} <span>MAD</span></div>
      <div class="pm-divider"></div>
      <div class="pm-desc">${gD(p)}</div>
      <div class="pm-divider"></div>
      <a href="${wl}" target="_blank" class="pm-wa-btn">${waSvg(20,20)} ${t.pmOrder}</a>
      <button class="pm-share-btn" onclick="shareProd('${p.id}')">${waSvg(16,16,'#25D366')} ${t.pmShare}</button>
      <div class="pm-pod"><svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" width="14" height="14"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>${t.pmPod}</div>
    </div>`;
  const gal=document.getElementById('pm-gallery');
  if(gal){gal.addEventListener('touchstart',e=>{_galTouchX=e.touches[0].clientX;},{passive:true});gal.addEventListener('touchend',e=>{if(_galTouchX===null)return;const dx=e.changedTouches[0].clientX-_galTouchX;if(Math.abs(dx)>40)galNav(dx<0?1:-1);_galTouchX=null;},{passive:true});}
  _galUpdateUI();document.getElementById('prod-modal-bg').classList.add('show');document.body.style.overflow='hidden';
}
function galNav(dir){const total=_galImgs.length||1;_galIdx=Math.max(0,Math.min(total-1,_galIdx+dir));_galUpdateUI();}
function galGoTo(idx){_galIdx=idx;_galUpdateUI();}
function _galUpdateUI(){const total=_galImgs.length||1;const strip=document.getElementById('pm-slides');if(strip)strip.style.transform=`translateX(-${_galIdx*100}%)`;const ctr=document.getElementById('pm-counter');if(ctr)ctr.textContent=`${_galIdx+1} / ${total}`;const prev=document.getElementById('pm-prev');const next=document.getElementById('pm-next');if(prev)prev.classList.toggle('hidden',_galIdx===0);if(next)next.classList.toggle('hidden',_galIdx===total-1);document.querySelectorAll('.pm-thumb').forEach((th,i)=>th.classList.toggle('active',i===_galIdx));const thumbs=document.querySelectorAll('.pm-thumb');if(thumbs[_galIdx])thumbs[_galIdx].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});}
function closeProdModal(){document.getElementById('prod-modal-bg').classList.remove('show');document.body.style.overflow='';_galIdx=0;_galImgs=[];}
function shareProd(id){const p=prods.find(x=>String(x.id)===String(id));if(!p)return;window.open(shareLink(gN(p),p.price),'_blank');showToast(T[lang].toastShare,'wa-t');}

/* ─── WHATSAPP ─── */
function saveWa(){const v=document.getElementById('wa-inp')?.value.trim();if(!v)return;waNum=v;fbSaveMeta('waNum',waNum);['st-wa-val','ftr-phone','ftr-wa-num'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=v;});renderProds();renderAdmTbl();showToast(T[lang].toastWa,'wa-t');}

/* ─── ADMIN LOGIN ─── */
function openAdmLogin(){document.getElementById('adm-login-overlay').classList.add('show');document.getElementById('login-pw-inp').value='';document.getElementById('login-err').textContent='';document.getElementById('login-pw-inp').classList.remove('error');setTimeout(()=>document.getElementById('login-pw-inp').focus(),100);}
function closeAdmLogin(){document.getElementById('adm-login-overlay').classList.remove('show');}
function submitLogin(){const pw=document.getElementById('login-pw-inp').value;if(pw===ADMIN_PASS){closeAdmLogin();openAdm();}else{document.getElementById('login-err').textContent=T[lang].loginErr;document.getElementById('login-pw-inp').classList.add('error');document.getElementById('login-pw-inp').focus();const box=document.querySelector('.login-box');box.style.animation='none';setTimeout(()=>box.style.animation='shake .4s ease',10);}}

/* ─── ADMIN ─── */
function openAdm(){document.getElementById('adm').classList.add('show');renderAdmTbl();renderDashRecent();}
function closeAdm(){document.getElementById('adm').classList.remove('show');}
function admSec(s,el){document.querySelectorAll('.adm-ni').forEach(i=>i.classList.remove('active'));el.classList.add('active');['dash','prods','db','fb'].forEach(k=>{const d=document.getElementById('sec-'+k);if(d)d.style.display='none';});const map={dashboard:'dash',products:'prods',database:'db',firebase:'fb'};const secId=map[s];if(secId){const d=document.getElementById('sec-'+secId);if(d)d.style.display='block';}const titles={dashboard:T[lang].navDash,products:T[lang].navPrds,database:T[lang].navDb,firebase:'Firebase'};document.getElementById('adm-top-title').textContent=titles[s]||T[lang].navDash;if(s==='database')dbRender();}

function renderAdmTbl(){document.getElementById('st-p-val').textContent=prods.length;const t=T[lang];document.getElementById('adm-tbody').innerHTML=prods.map(p=>{const th=p.images&&p.images[0]?`<img src="${p.images[0]}" style="width:44px;height:44px;object-fit:cover;border-radius:3px;" alt="">` :`<div class="thumb">${p.emoji||'🏠'}</div>`;const wl=waLink(gN(p),p.price);return `<tr><td>${th}</td><td><strong>${gN(p)}</strong></td><td><span class="bcat">${CATS[lang][p.cat]||p.cat}</span></td><td>${fmt(p.price)} MAD</td><td><a href="${wl}" target="_blank" class="wa-test">${waSvg(12,12,'#25D366')} ${t.waTest}</a></td><td><div class="tbl-act"><button class="btn-ed" onclick="openEdit('${p.id}')">${t.edit}</button><button class="btn-dl" onclick="delProd('${p.id}')">${t.del}</button></div></td></tr>`;}).join('');}

function renderDashRecent(){const t=T[lang];const r=prods.slice(-4).reverse();document.getElementById('dash-recent').innerHTML=`<table class="atbl"><thead><tr><th>${t.thImg}</th><th>${t.thNm}</th><th>${t.thCt}</th><th>${t.thPr}</th></tr></thead><tbody>${r.map(p=>{const th=p.images&&p.images[0]?`<img src="${p.images[0]}" style="width:44px;height:44px;object-fit:cover;border-radius:3px;" alt="">`:`<div class="thumb">${p.emoji||'🏠'}</div>`;return `<tr><td>${th}</td><td>${gN(p)}</td><td><span class="bcat">${CATS[lang][p.cat]||p.cat}</span></td><td>${fmt(p.price)} MAD</td></tr>`;}).join('')}</tbody></table>`;}

/* ─── PRODUCT FORM ─── */
function openAddModal(){editId=null;clrForm();imgs=[];document.getElementById('img-prev').innerHTML='';document.getElementById('modal-title').textContent=T[lang].mAdd;swTab('fr',document.querySelector('.ftab'));document.getElementById('mbg').classList.add('show');}
function openEdit(id){const p=prods.find(x=>String(x.id)===String(id));if(!p)return;editId=id;imgs=[...(p.images||[])];document.getElementById('f-nfr').value=p.nfr;document.getElementById('f-dfr').value=p.dfr;document.getElementById('f-nar').value=p.nar;document.getElementById('f-dar').value=p.dar;document.getElementById('f-price').value=p.price;document.getElementById('f-cat').value=p.cat;document.getElementById('f-badge').value=p.badge||'';document.getElementById('f-emoji').value=p.emoji||'';prevRender();document.getElementById('modal-title').textContent=T[lang].mEdit;swTab('fr',document.querySelector('.ftab'));document.getElementById('mbg').classList.add('show');}
function closeModal(){document.getElementById('mbg').classList.remove('show');editId=null;imgs=[];}
function clrForm(){['f-nfr','f-dfr','f-nar','f-dar','f-price','f-badge','f-emoji'].forEach(id=>{document.getElementById(id).value='';});document.getElementById('f-cat').value='salon';}
function swTab(tab,el){document.querySelectorAll('.ftab').forEach(b=>b.classList.remove('active'));el.classList.add('active');document.querySelectorAll('.lform').forEach(f=>f.classList.remove('show'));document.getElementById('lf-'+tab).classList.add('show');}
function prevImgs(inp){[...inp.files].forEach(f=>{const r=new FileReader();r.onload=e=>{imgs.push(e.target.result);prevRender();};r.readAsDataURL(f);});inp.value='';}
function prevRender(){document.getElementById('img-prev').innerHTML=imgs.map((s,i)=>`<div class="img-pi"><img src="${s}" alt=""><button class="rm-img" onclick="rmImg(${i})">✕</button></div>`).join('');}
function rmImg(i){imgs.splice(i,1);prevRender();}

async function saveProduct(){
  const nfr=document.getElementById('f-nfr').value.trim();const nar=document.getElementById('f-nar').value.trim();const price=parseFloat(document.getElementById('f-price').value);
  if(!nfr||!nar||isNaN(price)){showToast(T[lang].valErr);return;}
  const d={nfr,nar,dfr:document.getElementById('f-dfr').value.trim(),dar:document.getElementById('f-dar').value.trim(),price,cat:document.getElementById('f-cat').value,badge:document.getElementById('f-badge').value.trim(),emoji:document.getElementById('f-emoji').value.trim()||'🏠',images:[...imgs],updatedAt:Date.now()};
  if(editId){const i=prods.findIndex(p=>String(p.id)===String(editId));prods[i]={...prods[i],...d};await fbSaveProduct(prods[i]);}
  else{const newP={id:'prod_'+Date.now(),createdAt:Date.now(),...d};prods.push(newP);await fbSaveProduct(newP);}
  idbSave();closeModal();renderProds();renderAdmTbl();renderDashRecent();showToast(T[lang].toastSv,'ok-t');
}

async function delProd(id){
  if(!confirm(T[lang].confirmDl))return;
  prods=prods.filter(p=>String(p.id)!==String(id));
  await fbDeleteProduct(id);idbSave();renderProds();renderAdmTbl();renderDashRecent();showToast(T[lang].toastDl);
}

/* ─── DATABASE TABLE VIEW ─── */
let _dbSortKey='createdAt',_dbSortDir='desc';
function dbRender(){
  const t=T[lang];const srch=(document.getElementById('db-search')?.value||'').toLowerCase();const fcat=document.getElementById('db-filter-cat')?.value||'all';
  let rows=[...prods];if(fcat!=='all')rows=rows.filter(p=>p.cat===fcat);if(srch)rows=rows.filter(p=>(p.nfr||'').toLowerCase().includes(srch)||(p.nar||'').includes(srch)||String(p.id).includes(srch));
  rows.sort((a,b)=>{let va=a[_dbSortKey],vb=b[_dbSortKey];if(_dbSortKey==='nfr'){va=gN(a);vb=gN(b);}if(typeof va==='string'){va=va.toLowerCase();vb=vb.toLowerCase();}if(va<vb)return _dbSortDir==='asc'?-1:1;if(va>vb)return _dbSortDir==='asc'?1:-1;return 0;});
  const withImg=prods.filter(p=>p.images&&p.images[0]).length;
  const statsEl=document.getElementById('db-stats-row');
  if(statsEl){statsEl.innerHTML=`<div class="db-stat-chip active"><strong>${prods.length}</strong> ${t.dbStatsTotal}</div><div class="db-stat-chip"><strong>${withImg}</strong> ${t.dbStatsWithImg}</div>${['salon','chambre','cuisine','bureau','accessoires'].map(c=>{const n=prods.filter(p=>p.cat===c).length;return n>0?`<div class="db-stat-chip"><strong>${n}</strong> ${CATS[lang][c]}</div>`:'';}).join('')}<span id="db-status-badge" style="padding:4px 10px;border-radius:20px;font-size:.72rem;margin-left:auto"></span>`;if(_fbOK)showDbStatus('firebase');else showDbStatus('demo');}
  const tbody=document.getElementById('db-tbody');if(!tbody)return;
  if(!rows.length){tbody.innerHTML=`<tr><td colspan="7"><div class="db-empty"><strong>${t.dbEmpty}</strong><p>${t.dbEmptyHint}</p></div></td></tr>`;return;}
  tbody.innerHTML=rows.map(p=>{const imgH=p.images&&p.images[0]?`<img src="${p.images[0]}" class="td-img" alt="">`:`<div class="td-img">${p.emoji||'🏠'}</div>`;const dateStr=new Date(p.createdAt||Date.now()).toLocaleDateString('fr-FR');return `<tr><td>${imgH}</td><td><div class="td-id">#${String(p.id).slice(-8)}</div></td><td><div class="td-name">${gN(p)}</div><div class="td-id">${lang==='ar'?p.nfr:p.nar}</div></td><td><span class="bcat">${CATS[lang][p.cat]||p.cat}</span></td><td><div class="td-price">${fmt(p.price)} MAD</div></td><td><div class="td-date">${dateStr}</div></td><td><div class="db-row-act"><button class="db-btn-view" onclick="openDbDrawer('${p.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button><button class="btn-ed" onclick="openEdit('${p.id}')">${t.edit}</button><button class="btn-dl" onclick="delProd('${p.id}')">${t.del}</button></div></td></tr>`;}).join('');
}
function dbSort(key){if(_dbSortKey===key)_dbSortDir=_dbSortDir==='asc'?'desc':'asc';else{_dbSortKey=key;_dbSortDir='asc';}dbRender();}

function openDbDrawer(id){const p=prods.find(x=>String(x.id)===String(id));if(!p)return;const t=T[lang];const imgH=p.images&&p.images[0]?`<div class="db-drawer-img"><img src="${p.images[0]}" alt="${gN(p)}"></div>`:`<div class="db-drawer-img">${p.emoji||'🏠'}</div>`;const imgsGrid=p.images&&p.images.length>1?`<div class="db-field"><label>${t.lblIm}</label><div class="db-imgs-grid">${p.images.map(s=>`<img src="${s}" alt="">`).join('')}</div></div>`:'';const dateStr=new Date(p.createdAt||Date.now()).toLocaleString('fr-FR');document.getElementById('db-drawer-title').textContent=gN(p);document.getElementById('db-drawer-body').innerHTML=`${imgH}<div class="db-field"><label>${t.dbThId}</label><div class="db-field-val mono">#${p.id}</div></div><div class="db-field"><label>${lang==='ar'?'الاسم (FR)':'Nom (FR)'}</label><div class="db-field-val">${p.nfr}</div></div><div class="db-field"><label>${lang==='ar'?'الاسم (AR)':'Nom (AR)'}</label><div class="db-field-val" style="font-family:var(--font-ar);direction:rtl">${p.nar}</div></div><div class="db-field"><label>${lang==='ar'?'الوصف (FR)':'Description (FR)'}</label><div class="db-field-val">${p.dfr||'—'}</div></div><div class="db-field"><label>${lang==='ar'?'الوصف (AR)':'Description (AR)'}</label><div class="db-field-val" style="font-family:var(--font-ar);direction:rtl">${p.dar||'—'}</div></div><div class="db-field"><label>${t.dbThPrice}</label><div class="db-field-val price">${fmt(p.price)} MAD</div></div><div class="db-field"><label>${t.dbThCat}</label><div class="db-field-val">${CATS[lang][p.cat]||p.cat}</div></div>${p.badge?`<div class="db-field"><label>Badge</label><div class="db-field-val badge-val">${p.badge}</div></div>`:''}<div class="db-field"><label>${t.dbThDate}</label><div class="db-field-val mono">${dateStr}</div></div>${imgsGrid}`;document.getElementById('db-drawer-ftr').innerHTML=`<button class="db-edit-btn" onclick="closeDbDrawer();openEdit('${p.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> ${t.dbEditBtn}</button><button class="db-del-btn" onclick="closeDbDrawer();delProd('${p.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg> ${t.dbDelBtn}</button>`;document.getElementById('db-drawer-bg').classList.add('show');document.body.style.overflow='hidden';}
function closeDbDrawer(){document.getElementById('db-drawer-bg').classList.remove('show');document.body.style.overflow='';}

function dbExportJSON(){const data=JSON.stringify({products:prods,waNum,exportDate:new Date().toISOString()},null,2);const blob=new Blob([data],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='decolab-products.json';document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),2000);showToast(T[lang].dbToastExport,'ok-t');}
function dbImportJSON(input){const file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=async e=>{try{const parsed=JSON.parse(e.target.result);const imported=parsed.products||parsed;if(!Array.isArray(imported))throw new Error('Invalid');let added=0;for(const p of imported){if(!prods.find(x=>String(x.id)===String(p.id))){const newP={...p,createdAt:p.createdAt||Date.now()};prods.push(newP);await fbSaveProduct(newP);added++;}}if(parsed.waNum){waNum=parsed.waNum;fbSaveMeta('waNum',waNum);}idbSave();renderProds();renderAdmTbl();renderDashRecent();dbRender();showToast(T[lang].dbToastImport(added),'ok-t');}catch{showToast('Erreur format JSON');}};reader.readAsText(file);input.value='';}

/* ─── FIREBASE CONFIG PANEL ─── */
function saveFbConfig(){const fields=['fb-api-key','fb-auth-domain','fb-project-id','fb-storage','fb-sender-id','fb-app-id'];const vals=fields.map(id=>document.getElementById(id)?.value.trim()||'');if(vals.some(v=>!v)){showToast('Remplissez tous les champs Firebase');return;}const cfg={apiKey:vals[0],authDomain:vals[1],projectId:vals[2],storageBucket:vals[3],messagingSenderId:vals[4],appId:vals[5]};localStorage.setItem('decolab_fb_config',JSON.stringify(cfg));showToast('Configuration sauvegardée — rechargez la page pour activer Firebase','ok-t');}
function loadSavedFbConfig(){try{const saved=localStorage.getItem('decolab_fb_config');if(!saved)return;const cfg=JSON.parse(saved);Object.assign(FIREBASE_CONFIG,cfg);const map={'fb-api-key':'apiKey','fb-auth-domain':'authDomain','fb-project-id':'projectId','fb-storage':'storageBucket','fb-sender-id':'messagingSenderId','fb-app-id':'appId'};Object.entries(map).forEach(([id,key])=>{const el=document.getElementById(id);if(el)el.value=cfg[key]||'';});}catch{}}

/* ─── TOAST ─── */
function showToast(msg,cls=''){const t=document.getElementById('toast');t.textContent=msg;t.className='toast'+(cls?' '+cls:'');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200);}
function scrollTop(){window.scrollTo({top:0,behavior:'smooth'});}

/* ─── KEY EVENTS ─── */
document.addEventListener('keydown',e=>{const mo=document.getElementById('prod-modal-bg').classList.contains('show');if(e.key==='Escape'){closeProdModal();closeModal();closeAdmLogin();closeDbDrawer();}if(mo&&e.key==='ArrowLeft')galNav(-1);if(mo&&e.key==='ArrowRight')galNav(1);if(e.key==='Enter'&&document.getElementById('adm-login-overlay').classList.contains('show'))submitLogin();});

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded',async()=>{
  await fbInit();applyLang();renderProds();
  document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
  document.getElementById('mbg').addEventListener('click',e=>{if(e.target===document.getElementById('mbg'))closeModal();});
  document.getElementById('prod-modal-bg').addEventListener('click',e=>{if(e.target===document.getElementById('prod-modal-bg'))closeProdModal();});
  document.getElementById('adm-login-overlay').addEventListener('click',e=>{if(e.target===document.getElementById('adm-login-overlay'))closeAdmLogin();});
  const dbBg=document.getElementById('db-drawer-bg');if(dbBg)dbBg.addEventListener('click',e=>{if(e.target===dbBg)closeDbDrawer();});
});

/* ─── ZIP DOWNLOAD ─── */
function tick(ms){return new Promise(r=>setTimeout(r,ms));}
function dlProgress(bar,status,pct,label){bar.style.width=pct+'%';status.textContent=label+' ('+pct+'%)';}
async function downloadSite(){const t=T[lang];const overlay=document.getElementById('dl-overlay');const bar=document.getElementById('dl-bar');const status=document.getElementById('dl-status');document.getElementById('dl-title').textContent=t.dlTitle;document.getElementById('dl-desc').textContent=t.dlDesc;bar.style.width='0%';status.textContent='Prêt...';overlay.classList.add('show');await tick(200);const exportDate=new Date().toLocaleString('fr-FR');dlProgress(bar,status,15,lang==='ar'?'جمع البيانات...':'Collecte des données...');await tick(200);const exportProds=JSON.parse(JSON.stringify(prods));const exportWa=waNum;dlProgress(bar,status,40,lang==='ar'?'بناء الملفات...':'Construction...');await tick(300);const cssText=buildExportCSS();const jsText=buildExportJS(exportProds,exportWa,exportDate);const htmlText=buildExportHTML(exportDate);const readmeText=buildExportREADME(exportProds.length,exportWa,exportDate);dlProgress(bar,status,80,lang==='ar'?'ضغط ZIP...':'Compression ZIP...');await tick(350);const enc=new TextEncoder();const zipBytes=makeZip([{path:'decolab-site/index.html',data:enc.encode(htmlText)},{path:'decolab-site/assets/css/style.css',data:enc.encode(cssText)},{path:'decolab-site/assets/js/app.js',data:enc.encode(jsText)},{path:'decolab-site/README.md',data:enc.encode(readmeText)},]);dlProgress(bar,status,100,lang==='ar'?'جارٍ التحميل ✓':'Téléchargement ✓');await tick(350);const blob=new Blob([zipBytes],{type:'application/zip'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='decolab-site.zip';document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),3000);await tick(400);overlay.classList.remove('show');showToast(t.dlDone,'ok-t');}
function buildExportCSS(){const st=document.querySelector('style');return(st?st.textContent:'');}
function buildExportJS(ep,wa,date){const pj=JSON.stringify(ep,null,2);const wj=JSON.stringify(FIREBASE_CONFIG,null,2);let js=document.querySelector('script:not([src])').textContent;js=js.replace(/let prods\s*=\s*\[\];/,`let prods = ${pj};`).replace(/let waNum\s*=\s*'[^']*';/,`let waNum = '${wa}';`).replace(/const FIREBASE_CONFIG\s*=\s*\{[\s\S]*?\};/,`const FIREBASE_CONFIG = ${wj};`).replace(/\/\* ─── ZIP DOWNLOAD[\s\S]*$/m,'');return `/* DECOLAB app.js — Export ${date} — ${ep.length} produits */\n\n`+js.trim();}
function buildExportHTML(date){const body=document.body.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gis,'').trim();return `<!DOCTYPE html>\n<!-- DECOLAB Export ${date} -->\n<html lang="fr" dir="ltr">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>DECOLAB</title>\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&family=Noto+Kufi+Arabic:wght@300;400;500&display=swap" rel="stylesheet">\n  <link rel="stylesheet" href="assets/css/style.css">\n  <style>@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}</style>\n</head>\n<body>\n${body}\n<script src="assets/js/app.js"><\/script>\n</body>\n</html>`;}
function buildExportREADME(count,wa,date){return `# DECOLAB — Export ${date}\n${count} produits — WhatsApp: ${wa}\n\n## Lancer: double-clic sur index.html\n## Héberger: netlify.com/drop\n## Firebase: Admin → Firebase\n## Admin: decolab2025`;}
function makeZip(files){const entries=[];let offset=0;for(const file of files){const name=new TextEncoder().encode(file.path);const data=file.data;const crc=crc32zip(data);const dt=dosTime();const lh=new Uint8Array(30+name.length);const lv=new DataView(lh.buffer);lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0,true);lv.setUint16(8,0,true);lv.setUint16(10,dt.t,true);lv.setUint16(12,dt.d,true);lv.setUint32(14,crc,true);lv.setUint32(18,data.length,true);lv.setUint32(22,data.length,true);lv.setUint16(26,name.length,true);lv.setUint16(28,0,true);lh.set(name,30);entries.push({name,data,crc,lh,offset,dt});offset+=lh.length+data.length;}const cds=entries.map(e=>{const cd=new Uint8Array(46+e.name.length);const cv=new DataView(cd.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0,true);cv.setUint16(10,0,true);cv.setUint16(12,e.dt.t,true);cv.setUint16(14,e.dt.d,true);cv.setUint32(16,e.crc,true);cv.setUint32(20,e.data.length,true);cv.setUint32(24,e.data.length,true);cv.setUint16(28,e.name.length,true);cv.setUint16(30,0,true);cv.setUint16(32,0,true);cv.setUint16(34,0,true);cv.setUint16(36,0,true);cv.setUint32(38,0,true);cv.setUint32(42,e.offset,true);cd.set(e.name,46);return cd;});const cdData=zipConcat(cds);const cdOffset=offset;const eocd=new Uint8Array(22);const ev=new DataView(eocd.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(4,0,true);ev.setUint16(6,0,true);ev.setUint16(8,entries.length,true);ev.setUint16(10,entries.length,true);ev.setUint32(12,cdData.length,true);ev.setUint32(16,cdOffset,true);ev.setUint16(20,0,true);return zipConcat([...entries.flatMap(e=>[e.lh,e.data]),cdData,eocd]);}
function zipConcat(arrays){const total=arrays.reduce((s,a)=>s+a.length,0);const out=new Uint8Array(total);let pos=0;for(const a of arrays){out.set(a,pos);pos+=a.length;}return out;}
function dosTime(){const d=new Date();return{d:((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate(),t:(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1)};}
function crc32zip(data){let c=0xFFFFFFFF;for(let i=0;i<data.length;i++){c^=data[i];for(let j=0;j<8;j++)c=(c>>>1)^(c&1?0xEDB88320:0);}return(c^0xFFFFFFFF)>>>0;}