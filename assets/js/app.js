/* ═══════════════════════════════════════
   DECOLAB — Main JavaScript
   ═══════════════════════════════════════ */

/* ─── STATE ─── */
let lang    = 'fr';
let cat     = 'all';
let pf      = 'all';
let editId  = null;
let imgs    = [];
let waNum   = '+212691010969';
const ADMIN_PASS = 'decolab2025';

/* ─── PRODUCTS DATA ─── */
let prods = [
  {
    id: 1,
    nfr: 'Canapé Velours Andalou',
    nar: 'أريكة المخمل الأندلسي',
    dfr: 'Canapé 3 places en velours côtelé couleur moka. Structure en bois massif, pieds dorés. Revêtement amovible et lavable. Dimensions : L 220 × P 90 × H 85 cm.',
    dar: 'أريكة 3 مقاعد من المخمل المضلع بلون الموكا. هيكل من الخشب الصلب، أرجل ذهبية. غطاء قابل للإزالة والغسيل. الأبعاد: ط 220 × ع 90 × ا 85 سم.',
    price: 4200, cat: 'salon', badge: 'Nouveauté', emoji: '🛋️', images: []
  },
  {
    id: 2,
    nfr: 'Table Basse Marbre Noir',
    nar: 'طاولة الرخام الأسود',
    dfr: 'Table basse en marbre noir veiné de blanc. Pieds en métal brossé mat. Design minimaliste et raffiné. Dimensions : L 100 × l 50 × H 40 cm.',
    dar: 'طاولة سفلية من الرخام الأسود المعروق باللون الأبيض. أرجل معدنية مصقولة. تصميم أنيق. الأبعاد: ط 100 × ع 50 × ا 40 سم.',
    price: 1850, cat: 'salon', badge: '', emoji: '🪨', images: []
  },
  {
    id: 3,
    nfr: 'Luminaire Suspension Rattan',
    nar: 'مصباح الروطان المعلق',
    dfr: 'Suspension artisanale en rotin naturel tressé à la main. Diamètre 45cm. Câble textile coton crème 1.5m. Compatible ampoule E27.',
    dar: 'مصباح يدوي من الروطان الطبيعي المجدول يدوياً. قطر 45 سم. كابل نسيج قطني كريمي طوله 1.5 متر. متوافق مع المصباح E27.',
    price: 680, cat: 'accessoires', badge: 'Artisanal', emoji: '💡', images: []
  },
  {
    id: 4,
    nfr: 'Lit Plateforme Noyer',
    nar: 'سرير منصة الجوز',
    dfr: 'Lit 160×200 en bois de noyer massif certifié FSC. Design épuré, tête de lit rembourrée en tissu sable. Structure robuste garantie 5 ans.',
    dar: 'سرير 160×200 من خشب الجوز الصلب المعتمد FSC. تصميم نظيف، رأس سرير منجد بقماش رملي. هيكل متين مضمون 5 سنوات.',
    price: 6900, cat: 'chambre', badge: '', emoji: '🛏️', images: []
  },
  {
    id: 5,
    nfr: 'Étagère Industrielle',
    nar: 'رف المستودع الصناعي',
    dfr: 'Étagère 5 niveaux en métal noir mat et planches de pin huilé. H 180 × L 90 × P 30 cm. Style loft. Fixation murale incluse.',
    dar: 'رف 5 طوابق من المعدن الأسود الغير لامع وألواح الصنوبر المزيت. ارتفاع 180 × عرض 90 × عمق 30 سم. طراز لوفت. تثبيت جداري مشمول.',
    price: 1200, cat: 'bureau', badge: '', emoji: '🗄️', images: []
  },
  {
    id: 6,
    nfr: 'Carafe & Verres Soufflés',
    nar: 'إبريق وكؤوس منفوخة',
    dfr: 'Set carafe + 6 verres en verre soufflé à la bouche par artisans marocains. Teinte ambre naturelle. Pièces uniques — légers défauts sont signe d\'authenticité.',
    dar: 'طقم إبريق و6 كؤوس من الزجاج المنفوخ يدوياً من قِبل حرفيين مغاربة. لون عنبري طبيعي. قطع فريدة من نوعها.',
    price: 420, cat: 'cuisine', badge: 'Exclusif', emoji: '🫙', images: []
  }
];

/* ─── TRANSLATIONS ─── */
const T = {
  fr: {
    srchPh: 'Rechercher un produit...', langLbl: 'العربية', admBtn: 'Admin',
    hTag: 'Collection Printemps 2025',
    hTitle: 'L\'art de vivre<br>dans votre espace',
    hDesc: 'Transformez votre intérieur avec nos pièces soigneusement sélectionnées — entre élégance et authenticité.',
    hCta: 'Découvrir la collection',
    hDel: 'Livraison partout au Maroc', hWaPill: 'Commander via WhatsApp', hPod: 'Paiement à la livraison',
    secTitle: 'Nos Produits',
    waBtn: 'Commander via WhatsApp', podLbl: 'Paiement à la livraison',
    waMsg: (n, p) => `Bonjour 👋\n\nJe souhaite commander :\n🛒 *${n}*\n💰 Prix : ${p} MAD\n\n✅ Paiement à la livraison\n\nMerci !`,
    shareMsg: (n, p) => `🏠 *DECOLAB*\n\n✨ Découvrez ce produit :\n🛒 *${n}*\n💰 ${p} MAD\n\n📲 Commandez facilement via WhatsApp !`,
    detailBtn: 'Voir les détails', shareBtn: 'Partager sur WhatsApp',
    navDash: 'Tableau de bord', navPrds: 'Produits', exitBtn: '← Retour au store',
    admTop: 'Tableau de bord',
    stPLbl: 'Produits', stPSub: 'en catalogue', stCLbl: 'Catégories', stCSub: 'actives',
    stLLbl: 'Langues', stWaSub: 'Paiement à la livraison',
    recentT: 'Produits récents', dashAdd: '+ Ajouter',
    manageT: 'Gestion des produits', addBtnT: '+ Ajouter un produit',
    thImg: 'Image', thNm: 'Nom', thCt: 'Catégorie', thPr: 'Prix', thWa: 'WhatsApp', thAc: 'Actions',
    waBarT: 'WhatsApp Business', waSvT: 'Enregistrer', waStT: 'Actif',
    mAdd: 'Ajouter un produit', mEdit: 'Modifier le produit', tabGen: '⚙ Général',
    lblPr: 'Prix (MAD)', lblCt: 'Catégorie', lblBd: 'Badge promo', lblEm: 'Icône emoji', lblIm: 'Images produit',
    uplHint: 'Cliquez pour ajouter des images', btnCx: 'Annuler', btnSv: 'Enregistrer',
    ftrDesc: 'Spécialiste de la décoration et du design intérieur au Maroc.',
    ftrNavH: 'Navigation', ftrContH: 'Contact', ftrBtm: '© 2025 DECOLAB — Tous droits réservés',
    edit: 'Modifier', del: 'Supprimer', waTest: 'Tester ↗',
    toastSv: 'Produit enregistré ✓', toastDl: 'Produit supprimé.', toastWa: 'Numéro WhatsApp mis à jour ✓',
    toastCopy: 'Lien copié !', toastShare: 'Message WhatsApp ouvert !',
    pCount: n => `${n} produit${n > 1 ? 's' : ''}`,
    confirmDl: 'Supprimer ce produit ?', valErr: 'Remplissez les champs obligatoires.',
    fAll: 'Tous les prix', fLow: '–500 MAD', fMid: '500–1500 MAD', fHigh: '+1500 MAD',
    srtDef: 'Trier par', srtAsc: 'Prix croissant', srtDesc: 'Prix décroissant', srtNm: 'Nom A–Z',
    loginTitle: 'Espace Administrateur', loginSub: 'Accès sécurisé',
    loginPwLbl: 'Mot de passe', loginBtn: 'Se connecter', loginCancel: 'Annuler',
    loginErr: 'Mot de passe incorrect.',
    pmOrder: 'Commander via WhatsApp', pmShare: 'Partager ce produit', pmPod: 'Paiement à la livraison',
  },
  ar: {
    srchPh: 'ابحث عن منتج...', langLbl: 'Français', admBtn: 'الإدارة',
    hTag: 'مجموعة ربيع 2025',
    hTitle: 'فن العيش<br>في فضائك',
    hDesc: 'حوّل ديكور منزلك بقطع مختارة بعناية — بين الأناقة والأصالة.',
    hCta: 'اكتشف المجموعة',
    hDel: 'توصيل في جميع أنحاء المغرب', hWaPill: 'اطلب عبر واتساب', hPod: 'الدفع عند الاستلام',
    secTitle: 'منتجاتنا',
    waBtn: 'اطلب عبر واتساب', podLbl: 'الدفع عند الاستلام',
    waMsg: (n, p) => `مرحباً 👋\n\nأود الطلب:\n🛒 *${n}*\n💰 السعر: ${p} درهم\n\n✅ الدفع عند الاستلام\n\nشكراً!`,
    shareMsg: (n, p) => `🏠 *DECOLAB*\n\n✨ اكتشف هذا المنتج:\n🛒 *${n}*\n💰 ${p} درهم\n\n📲 اطلب بسهولة عبر واتساب!`,
    detailBtn: 'عرض التفاصيل', shareBtn: 'مشاركة عبر واتساب',
    navDash: 'لوحة التحكم', navPrds: 'المنتجات', exitBtn: 'العودة للمتجر →',
    admTop: 'لوحة التحكم',
    stPLbl: 'المنتجات', stPSub: 'في الكتالوج', stCLbl: 'الفئات', stCSub: 'نشطة',
    stLLbl: 'اللغات', stWaSub: 'الدفع عند الاستلام',
    recentT: 'المنتجات الأخيرة', dashAdd: '+ إضافة',
    manageT: 'إدارة المنتجات', addBtnT: '+ إضافة منتج',
    thImg: 'الصورة', thNm: 'الاسم', thCt: 'الفئة', thPr: 'السعر', thWa: 'واتساب', thAc: 'الإجراءات',
    waBarT: 'واتساب بيزنس', waSvT: 'حفظ', waStT: 'نشط',
    mAdd: 'إضافة منتج', mEdit: 'تعديل المنتج', tabGen: '⚙ عام',
    lblPr: 'السعر (MAD)', lblCt: 'الفئة', lblBd: 'شارة العرض', lblEm: 'أيقونة', lblIm: 'صور المنتج',
    uplHint: 'انقر لإضافة صور', btnCx: 'إلغاء', btnSv: 'حفظ',
    ftrDesc: 'متخصصون في الديكور والتصميم الداخلي بالمغرب.',
    ftrNavH: 'التنقل', ftrContH: 'اتصل بنا', ftrBtm: '© 2025 DECOLAB — جميع الحقوق محفوظة',
    edit: 'تعديل', del: 'حذف', waTest: 'اختبار ↗',
    toastSv: 'تم حفظ المنتج ✓', toastDl: 'تم حذف المنتج.', toastWa: 'تم تحديث رقم واتساب ✓',
    toastCopy: 'تم نسخ الرابط!', toastShare: 'تم فتح رسالة واتساب!',
    pCount: n => `${n} منتج`,
    confirmDl: 'هل تريد حذف هذا المنتج؟', valErr: 'يرجى ملء الحقول الأساسية.',
    fAll: 'كل الأسعار', fLow: 'أقل من 500', fMid: '500–1500', fHigh: '+1500',
    srtDef: 'ترتيب حسب', srtAsc: 'السعر: الأقل', srtDesc: 'السعر: الأعلى', srtNm: 'الاسم',
    loginTitle: 'لوحة الإدارة', loginSub: 'وصول آمن',
    loginPwLbl: 'كلمة المرور', loginBtn: 'دخول', loginCancel: 'إلغاء',
    loginErr: 'كلمة المرور غير صحيحة.',
    pmOrder: 'اطلب عبر واتساب', pmShare: 'مشاركة المنتج', pmPod: 'الدفع عند الاستلام',
  }
};

const CATS = {
  fr: { salon: 'Salon', chambre: 'Chambre', cuisine: 'Cuisine', bureau: 'Bureau', accessoires: 'Accessoires' },
  ar: { salon: 'الصالون', chambre: 'غرفة النوم', cuisine: 'المطبخ', bureau: 'المكتب', accessoires: 'الإكسسوارات' }
};

/* ─── SVG HELPERS ─── */
const waSvg = (w = 18, h = 18, col = '#fff') =>
  `<svg viewBox="0 0 24 24" width="${w}" height="${h}" style="fill:${col};flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`;

const shareSvg =
  `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;

/* ─── PRELOADER ─── */
window.addEventListener('load', () => {
  const pl = document.getElementById('preloader');
  if (!pl) return;
  setTimeout(() => {
    pl.classList.add('hidden');
    // trigger fade-in animations
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 2000);
});

/* ─── HEADER SCROLL ─── */
window.addEventListener('scroll', () => {
  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 20);
  document.querySelector('.scroll-top').classList.toggle('show', window.scrollY > 400);
});

/* ─── INTERSECTION OBSERVER for scroll animations ─── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

/* ─── LANGUAGE ─── */
function toggleLang() {
  lang = lang === 'fr' ? 'ar' : 'fr';
  applyLang();
  renderProds();
  renderAdmTbl();
  renderDashRecent();
}

function applyLang() {
  const t = T[lang], ar = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir  = ar ? 'rtl' : 'ltr';
  document.body.classList.toggle('ar', ar);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el[el.tagName === 'INPUT' ? 'placeholder' : 'innerHTML'] = val; };
  const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  document.getElementById('srch-inp').placeholder = t.srchPh;
  setT('lang-lbl', t.langLbl); setT('adm-lang-lbl', t.langLbl);
  setT('adm-btn-t', t.admBtn);
  setT('h-tag', t.hTag); set('h-title', t.hTitle);
  setT('h-desc', t.hDesc); setT('h-cta', t.hCta);
  setT('h-del', t.hDel); setT('h-wa-pill', t.hWaPill); setT('h-pod', t.hPod);
  setT('sec-title', t.secTitle);
  setT('nav-dash', t.navDash); setT('nav-prods', t.navPrds); setT('exit-btn', t.exitBtn);
  setT('adm-top-title', t.admTop);
  setT('st-p-lbl', t.stPLbl); setT('st-p-sub', t.stPSub);
  setT('st-c-lbl', t.stCLbl); setT('st-c-sub', t.stCSub);
  setT('st-l-lbl', t.stLLbl); setT('st-wa-sub', t.stWaSub);
  setT('recent-t', t.recentT); setT('dash-add-t', t.dashAdd);
  setT('manage-t', t.manageT); setT('add-btn-t', t.addBtnT);
  setT('th-img', t.thImg); setT('th-nm', t.thNm); setT('th-ct', t.thCt);
  setT('th-pr', t.thPr); setT('th-wa', t.thWa); setT('th-ac', t.thAc);
  setT('wa-bar-lbl-t', t.waBarT); setT('wa-sv-t', t.waSvT); setT('wa-st-t', t.waStT);
  setT('modal-title', editId ? t.mEdit : t.mAdd);
  setT('tab-gen', t.tabGen);
  setT('lbl-pr', t.lblPr); setT('lbl-ct', t.lblCt); setT('lbl-bd', t.lblBd);
  setT('lbl-em', t.lblEm); setT('lbl-im', t.lblIm); setT('upl-hint', t.uplHint);
  setT('btn-cx', t.btnCx); setT('btn-sv', t.btnSv);
  setT('ftr-desc', t.ftrDesc); setT('ftr-nav-h', t.ftrNavH); setT('ftr-cont-h', t.ftrContH);
  setT('ftr-btm', t.ftrBtm);
  setT('login-title', t.loginTitle); setT('login-sub', t.loginSub);
  setT('login-pw-lbl', t.loginPwLbl); setT('login-btn', t.loginBtn);
  setT('login-cancel', t.loginCancel);

  document.querySelectorAll('[data-fr]').forEach(el => el.textContent = el.getAttribute('data-' + lang));

  const s = document.getElementById('sort-sel');
  if (s) {
    s.options[0].text = t.srtDef; s.options[1].text = t.srtAsc;
    s.options[2].text = t.srtDesc; s.options[3].text = t.srtNm;
  }
  document.getElementById('st-p-val').textContent = prods.length;
  updCount();
}

/* ─── PRODUCTS ─── */
const gN = p => lang === 'ar' ? p.nar : p.nfr;
const gD = p => lang === 'ar' ? p.dar : p.dfr;
const fmt = n => n.toLocaleString('fr-MA');
const waLink = (name, price) => {
  const num = waNum.replace(/[\s\-]/g, '');
  const msg = encodeURIComponent(T[lang].waMsg(name, fmt(price)));
  return `https://wa.me/${num}?text=${msg}`;
};
const shareLink = (name, price) => {
  const num = waNum.replace(/[\s\-]/g, '');
  const msg = encodeURIComponent(T[lang].shareMsg(name, fmt(price)));
  return `https://wa.me/${num}?text=${msg}`;
};

function getFilt() {
  let l = [...prods];
  if (cat !== 'all') l = l.filter(p => p.cat === cat);
  const s = document.getElementById('srch-inp').value.toLowerCase();
  if (s) l = l.filter(p =>
    p.nfr.toLowerCase().includes(s) || p.nar.includes(s) ||
    p.dfr.toLowerCase().includes(s) || p.dar.includes(s)
  );
  if (pf === 'low')  l = l.filter(p => p.price < 500);
  else if (pf === 'mid')  l = l.filter(p => p.price >= 500 && p.price <= 1500);
  else if (pf === 'high') l = l.filter(p => p.price > 1500);
  return l;
}

function renderProds() {
  const grid = document.getElementById('prod-grid');
  const list = getFilt();
  updCount(list.length);
  const t = T[lang];
  if (!list.length) {
    grid.innerHTML = `<div class="no-prod">${lang === 'ar' ? 'لا توجد منتجات' : 'Aucun produit trouvé'}</div>`;
    return;
  }
  grid.innerHTML = list.map(p => {
    const im = p.images && p.images[0]
      ? `<img src="${p.images[0]}" alt="${gN(p)}" loading="lazy">`
      : `<span>${p.emoji || '🏠'}</span>`;
    const bd = p.badge ? `<div class="cbadge">${p.badge}</div>` : '';
    const wl = waLink(gN(p), p.price);
    const sl = shareLink(gN(p), p.price);
    return `<div class="card fade-in" onclick="openProdModal(${p.id})">
      <div class="card-img">
        ${im}${bd}
        <button class="share-icon" title="Partager" onclick="event.stopPropagation();shareProd(${p.id})">
          ${waSvg(16, 16, '#25D366')}
        </button>
      </div>
      <div class="card-body">
        <div class="card-cat">${CATS[lang][p.cat] || p.cat}</div>
        <div class="card-name">${gN(p)}</div>
        <div class="card-desc">${gD(p)}</div>
        <div class="card-price">${fmt(p.price)} <span>MAD</span></div>
        <a href="${wl}" target="_blank" class="wa-btn" onclick="event.stopPropagation()">
          ${waSvg()} ${t.waBtn}
        </a>
        <div class="pod-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" width="12" height="12"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          ${t.podLbl}
        </div>
      </div>
    </div>`;
  }).join('');

  // Observe new cards for animation
  document.querySelectorAll('.card.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

function updCount(n) {
  const c = n !== undefined ? n : getFilt().length;
  document.getElementById('prod-cnt').textContent = T[lang].pCount(c);
}

function fCat(c, el) {
  cat = c;
  document.querySelectorAll('.nav-lk').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
  renderProds();
}

function fPrice(r, el) {
  pf = r;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderProds();
}

function sortProds(v) {
  if (v === 'price-asc')  prods.sort((a, b) => a.price - b.price);
  else if (v === 'price-desc') prods.sort((a, b) => b.price - a.price);
  else if (v === 'name')  prods.sort((a, b) => gN(a).localeCompare(gN(b)));
  renderProds();
}

/* ─── PRODUCT DETAIL MODAL ─── */
function openProdModal(id) {
  const p = prods.find(x => x.id === id);
  if (!p) return;
  const t = T[lang];
  const mb = document.getElementById('prod-modal-bg');
  const im = p.images && p.images[0]
    ? `<img src="${p.images[0]}" alt="${gN(p)}">`
    : `<span style="font-size:6rem">${p.emoji || '🏠'}</span>`;
  const bd = p.badge ? `<div class="pm-badge">${p.badge}</div>` : '';
  const wl = waLink(gN(p), p.price);
  const sl = shareLink(gN(p), p.price);

  document.getElementById('prod-modal-inner').innerHTML = `
    <div class="pm-gallery">
      ${im}${bd}
      <button class="pm-close" onclick="closeProdModal()">✕</button>
    </div>
    <div class="pm-info">
      <div class="pm-cat">${CATS[lang][p.cat] || p.cat}</div>
      <div class="pm-name">${gN(p)}</div>
      <div class="pm-price">${fmt(p.price)} <span>MAD</span></div>
      <div class="pm-divider"></div>
      <div class="pm-desc">${gD(p)}</div>
      <div class="pm-divider"></div>
      <a href="${wl}" target="_blank" class="pm-wa-btn">
        ${waSvg(20, 20)} ${t.pmOrder}
      </a>
      <button class="pm-share-btn" onclick="shareProd(${p.id})">
        ${waSvg(16, 16, '#25D366')} ${t.pmShare}
      </button>
      <div class="pm-pod">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" width="14" height="14"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
        ${t.pmPod}
      </div>
    </div>`;

  mb.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProdModal() {
  document.getElementById('prod-modal-bg').classList.remove('show');
  document.body.style.overflow = '';
}

/* ─── SHARE PRODUCT VIA WHATSAPP ─── */
function shareProd(id) {
  const p = prods.find(x => x.id === id);
  if (!p) return;
  const sl = shareLink(gN(p), p.price);
  window.open(sl, '_blank');
  showToast(T[lang].toastShare, 'wa-t');
}

/* ─── WHATSAPP NUMBER ─── */
function saveWa() {
  const v = document.getElementById('wa-inp').value.trim();
  if (!v) return;
  waNum = v;
  document.getElementById('st-wa-val').textContent = v;
  document.getElementById('ftr-phone').textContent = v;
  document.getElementById('ftr-wa-num').textContent = v;
  renderProds();
  renderAdmTbl();
  showToast(T[lang].toastWa, 'wa-t');
}

/* ─── ADMIN LOGIN ─── */
function openAdmLogin() {
  document.getElementById('adm-login-overlay').classList.add('show');
  document.getElementById('login-pw-inp').value = '';
  document.getElementById('login-err').textContent = '';
  document.getElementById('login-pw-inp').classList.remove('error');
  setTimeout(() => document.getElementById('login-pw-inp').focus(), 100);
}

function closeAdmLogin() {
  document.getElementById('adm-login-overlay').classList.remove('show');
}

function submitLogin() {
  const pw = document.getElementById('login-pw-inp').value;
  if (pw === ADMIN_PASS) {
    closeAdmLogin();
    openAdm();
  } else {
    document.getElementById('login-err').textContent = T[lang].loginErr;
    document.getElementById('login-pw-inp').classList.add('error');
    document.getElementById('login-pw-inp').focus();
    // Shake animation
    const box = document.querySelector('.login-box');
    box.style.animation = 'none';
    setTimeout(() => box.style.animation = 'shake .4s ease', 10);
  }
}

/* ─── ADMIN PANEL ─── */
function openAdm() {
  document.getElementById('adm').classList.add('show');
  renderAdmTbl();
  renderDashRecent();
}

function closeAdm() {
  document.getElementById('adm').classList.remove('show');
}

function admSec(s, el) {
  document.querySelectorAll('.adm-ni').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('sec-dash').style.display  = s === 'dashboard' ? 'block' : 'none';
  document.getElementById('sec-prods').style.display = s === 'products'  ? 'block' : 'none';
  document.getElementById('adm-top-title').textContent = s === 'dashboard' ? T[lang].navDash : T[lang].navPrds;
}

function renderAdmTbl() {
  document.getElementById('st-p-val').textContent = prods.length;
  const t = T[lang];
  document.getElementById('adm-tbody').innerHTML = prods.map(p => {
    const th = p.images && p.images[0]
      ? `<img src="${p.images[0]}" style="width:44px;height:44px;object-fit:cover;border-radius:3px;" alt="">`
      : `<div class="thumb">${p.emoji || '🏠'}</div>`;
    const wl = waLink(gN(p), p.price);
    return `<tr>
      <td>${th}</td>
      <td><strong>${gN(p)}</strong></td>
      <td><span class="bcat">${CATS[lang][p.cat] || p.cat}</span></td>
      <td>${fmt(p.price)} MAD</td>
      <td><a href="${wl}" target="_blank" class="wa-test">${waSvg(12, 12, '#25D366')} ${t.waTest}</a></td>
      <td><div class="tbl-act">
        <button class="btn-ed" onclick="openEdit(${p.id})">${t.edit}</button>
        <button class="btn-dl" onclick="delProd(${p.id})">${t.del}</button>
      </div></td>
    </tr>`;
  }).join('');
}

function renderDashRecent() {
  const t = T[lang];
  const r = prods.slice(-4).reverse();
  document.getElementById('dash-recent').innerHTML =
    `<table class="atbl"><thead><tr>
      <th>${t.thImg}</th><th>${t.thNm}</th><th>${t.thCt}</th><th>${t.thPr}</th>
    </tr></thead><tbody>${r.map(p => {
      const th = p.images && p.images[0]
        ? `<img src="${p.images[0]}" style="width:44px;height:44px;object-fit:cover;border-radius:3px;" alt="">`
        : `<div class="thumb">${p.emoji || '🏠'}</div>`;
      return `<tr><td>${th}</td><td>${gN(p)}</td>
        <td><span class="bcat">${CATS[lang][p.cat] || p.cat}</span></td>
        <td>${fmt(p.price)} MAD</td></tr>`;
    }).join('')}</tbody></table>`;
}

/* ─── PRODUCT FORM MODAL ─── */
function openAddModal() {
  editId = null;
  clrForm();
  imgs = [];
  document.getElementById('img-prev').innerHTML = '';
  document.getElementById('modal-title').textContent = T[lang].mAdd;
  swTab('fr', document.querySelector('.ftab'));
  document.getElementById('mbg').classList.add('show');
}

function openEdit(id) {
  const p = prods.find(x => x.id === id);
  if (!p) return;
  editId = id;
  imgs = [...(p.images || [])];
  document.getElementById('f-nfr').value   = p.nfr;
  document.getElementById('f-dfr').value   = p.dfr;
  document.getElementById('f-nar').value   = p.nar;
  document.getElementById('f-dar').value   = p.dar;
  document.getElementById('f-price').value = p.price;
  document.getElementById('f-cat').value   = p.cat;
  document.getElementById('f-badge').value = p.badge || '';
  document.getElementById('f-emoji').value = p.emoji || '';
  prevRender();
  document.getElementById('modal-title').textContent = T[lang].mEdit;
  swTab('fr', document.querySelector('.ftab'));
  document.getElementById('mbg').classList.add('show');
}

function closeModal() {
  document.getElementById('mbg').classList.remove('show');
  editId = null;
  imgs = [];
}

function clrForm() {
  ['f-nfr','f-dfr','f-nar','f-dar','f-price','f-badge','f-emoji']
    .forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('f-cat').value = 'salon';
}

function swTab(tab, el) {
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.lform').forEach(f => f.classList.remove('show'));
  document.getElementById('lf-' + tab).classList.add('show');
}

function prevImgs(inp) {
  [...inp.files].forEach(f => {
    const r = new FileReader();
    r.onload = e => { imgs.push(e.target.result); prevRender(); };
    r.readAsDataURL(f);
  });
  inp.value = '';
}

function prevRender() {
  document.getElementById('img-prev').innerHTML = imgs.map((s, i) =>
    `<div class="img-pi"><img src="${s}" alt=""><button class="rm-img" onclick="rmImg(${i})">✕</button></div>`
  ).join('');
}

function rmImg(i) { imgs.splice(i, 1); prevRender(); }

function saveProduct() {
  const nfr   = document.getElementById('f-nfr').value.trim();
  const nar   = document.getElementById('f-nar').value.trim();
  const price = parseFloat(document.getElementById('f-price').value);
  if (!nfr || !nar || isNaN(price)) { showToast(T[lang].valErr); return; }
  const d = {
    nfr, nar,
    dfr:   document.getElementById('f-dfr').value.trim(),
    dar:   document.getElementById('f-dar').value.trim(),
    price,
    cat:   document.getElementById('f-cat').value,
    badge: document.getElementById('f-badge').value.trim(),
    emoji: document.getElementById('f-emoji').value.trim() || '🏠',
    images: [...imgs]
  };
  if (editId) {
    const i = prods.findIndex(p => p.id === editId);
    prods[i] = { ...prods[i], ...d };
  } else {
    prods.push({ id: Date.now(), ...d });
  }
  closeModal();
  renderProds();
  renderAdmTbl();
  renderDashRecent();
  showToast(T[lang].toastSv, 'ok-t');
}

function delProd(id) {
  if (!confirm(T[lang].confirmDl)) return;
  prods = prods.filter(p => p.id !== id);
  renderProds();
  renderAdmTbl();
  renderDashRecent();
  showToast(T[lang].toastDl);
}

/* ─── TOAST ─── */
function showToast(msg, cls = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (cls ? ' ' + cls : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ─── SCROLL TOP ─── */
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ─── KEY EVENTS ─── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProdModal();
    closeModal();
    closeAdmLogin();
  }
  if (e.key === 'Enter' && document.getElementById('adm-login-overlay').classList.contains('show')) {
    submitLogin();
  }
});

/* ─── MODAL BG CLICK ─── */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mbg').addEventListener('click', e => {
    if (e.target === document.getElementById('mbg')) closeModal();
  });
  document.getElementById('prod-modal-bg').addEventListener('click', e => {
    if (e.target === document.getElementById('prod-modal-bg')) closeProdModal();
  });
  document.getElementById('adm-login-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('adm-login-overlay')) closeAdmLogin();
  });
  applyLang();
  renderProds();
});
