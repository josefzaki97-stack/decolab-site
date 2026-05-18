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
    if(FIREBASE_CONFIG.apiKey==='VOTRE_API_KEY'){showDbStatus('demo');await idbInit();return;}
    const{initializeApp}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const fs=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    _fbApp=initializeApp(FIREBASE_CONFIG);_db=fs.getFirestore(_fbApp);
    window._fs={...fs};_fbOK=true;showDbStatus('firebase');
    await fbLoadProds();fbListen();await fbLoadMeta();
  }catch(err){console.warn('Firebase init failed:',err);showDbStatus('idb');await idbInit();}
}

async function fbLoadProds(){
  if(!_fbOK)return;
  try{
    const snap=await window._fs.getDocs(window._fs.collection(_db,FB_COL));
    const rows=[];snap.forEach(d=>rows.push({id:d.id,...d.data()}));
    if(rows.length>0)prods=rows.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
    else await fbSeedDemo();
  }catch(e){console.warn('Firestore load:',e);}
}

async function fbSeedDemo(){
  if(!_fbOK)return;
  try{
    const{writeBatch,doc,collection}=window._fs;
    const batch=writeBatch(_db);
    DEMO_PRODS.forEach(p=>batch.set(doc(collection(_db,FB_COL),p.id),p));
    await batch.commit();prods=[...DEMO_PRODS];
  }catch(e){console.warn('Seed error:',e);}
}

function fbListen(){
  if(!_fbOK)return;if(_unsubscribe)_unsubscribe();
  _unsubscribe=window._fs.onSnapshot(window._fs.collection(_db,FB_COL),snap=>{
    const rows=[];snap.forEach(d=>rows.push({id:d.id,...d.data()}));
    prods=rows.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
    renderProds();renderAdmTbl();renderDashRecent();
    const el=document.getElementById('st-p-val');if(el)el.textContent=prods.length;
    updCount();
  },e=>console.warn('Listen error:',e));
}

async function fbSaveProduct(prod){
  if(!_fbOK){idbSave();return;}
  try{await window._fs.setDoc(window._fs.doc(window._fs.collection(_db,FB_COL),String(prod.id)),prod);}
  catch(e){console.warn('Save error:',e);}
}

async function fbDeleteProduct(id){
  if(!_fbOK){idbSave();return;}
  try{await window._fs.deleteDoc(window._fs.doc(window._fs.collection(_db,FB_COL),String(id)));}
  catch(e){console.warn('Delete error:',e);}
}

async function fbLoadMeta(){
  if(!_fbOK)return;
  try{
    const snap=await window._fs.getDoc(window._fs.doc(window._fs.collection(_db,'meta'),FB_META));
    if(snap.exists()){const d=snap.data();if(d.waNum){waNum=d.waNum;const inp=document.getElementById('wa-inp');if(inp)inp.value=waNum;const el=document.getElementById('st-wa-val');if(el)el.textContent=waNum;}}
  }catch(e){}
}

async function fbSaveMeta(key,value){
  if(!_fbOK)return;
  try{await window._fs.setDoc(window._fs.doc(window._fs.collection(_db,'meta'),FB_META),{[key]:value},{merge:true});}
  catch(e){}
}

/* ─── IndexedDB FALLBACK ─── */
const IDB_NAME='decolab_db',IDB_VER=1,IDB_STORE='products';
let _idb=null;
function idbInit(){return new Promise(resolve=>{const req=indexedDB.open(IDB_NAME,IDB_VER);req.onupgradeneeded=e=>{const db=e.target.result;if(!db.objectStoreNames.contains(IDB_STORE))db.createObjectStore(IDB_STORE,{keyPath:'id'});};req.onsuccess=e=>{_idb=e.target.result;idbLoad().then(resolve).catch(resolve);};req.onerror=()=>{prods=[...DEMO_PRODS];resolve();};})}
function idbLoad(){return new Promise(resolve=>{if(!_idb){prods=[...DEMO_PRODS];resolve();return;}const tx=_idb.transaction(IDB_STORE,'readonly');const req=tx.objectStore(IDB_STORE).getAll();req.onsuccess=e=>{const rows=e.target.result;prods=(rows&&rows.length)?rows.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)):[...DEMO_PRODS];if(!rows||!rows.length)idbSave();resolve();};req.onerror=()=>{prods=[...DEMO_PRODS];resolve();};})}
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
function buildExportHTML(date){const body=document.body.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gis,'').trim();return `<!DOCTYPE html>\n<!-- DECOLAB Export ${date} -->\n<html lang="fr" dir="ltr">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>DECOLAB</title>\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&family=Noto+Kufi+Arabic:wght@300;400;500&display=swap" rel="stylesheet">\n  <link rel="stylesheet" href="assets/css/style.css">\n  <style>@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}</style>\n</head>\n<body>\n${body}\n<script type="module" src="assets/js/app.js"><\/script>\n</body>\n</html>`;}
function buildExportREADME(count,wa,date){return `# DECOLAB — Export ${date}\n${count} produits — WhatsApp: ${wa}\n\n## Lancer: double-clic sur index.html\n## Héberger: netlify.com/drop\n## Firebase: Admin → Firebase\n## Admin: decolab2025`;}
function makeZip(files){const entries=[];let offset=0;for(const file of files){const name=new TextEncoder().encode(file.path);const data=file.data;const crc=crc32zip(data);const dt=dosTime();const lh=new Uint8Array(30+name.length);const lv=new DataView(lh.buffer);lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0,true);lv.setUint16(8,0,true);lv.setUint16(10,dt.t,true);lv.setUint16(12,dt.d,true);lv.setUint32(14,crc,true);lv.setUint32(18,data.length,true);lv.setUint32(22,data.length,true);lv.setUint16(26,name.length,true);lv.setUint16(28,0,true);lh.set(name,30);entries.push({name,data,crc,lh,offset,dt});offset+=lh.length+data.length;}const cds=entries.map(e=>{const cd=new Uint8Array(46+e.name.length);const cv=new DataView(cd.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0,true);cv.setUint16(10,0,true);cv.setUint16(12,e.dt.t,true);cv.setUint16(14,e.dt.d,true);cv.setUint32(16,e.crc,true);cv.setUint32(20,e.data.length,true);cv.setUint32(24,e.data.length,true);cv.setUint16(28,e.name.length,true);cv.setUint16(30,0,true);cv.setUint16(32,0,true);cv.setUint16(34,0,true);cv.setUint16(36,0,true);cv.setUint32(38,0,true);cv.setUint32(42,e.offset,true);cd.set(e.name,46);return cd;});const cdData=zipConcat(cds);const cdOffset=offset;const eocd=new Uint8Array(22);const ev=new DataView(eocd.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(4,0,true);ev.setUint16(6,0,true);ev.setUint16(8,entries.length,true);ev.setUint16(10,entries.length,true);ev.setUint32(12,cdData.length,true);ev.setUint32(16,cdOffset,true);ev.setUint16(20,0,true);return zipConcat([...entries.flatMap(e=>[e.lh,e.data]),cdData,eocd]);}
function zipConcat(arrays){const total=arrays.reduce((s,a)=>s+a.length,0);const out=new Uint8Array(total);let pos=0;for(const a of arrays){out.set(a,pos);pos+=a.length;}return out;}
function dosTime(){const d=new Date();return{d:((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate(),t:(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1)};}
function crc32zip(data){let c=0xFFFFFFFF;for(let i=0;i<data.length;i++){c^=data[i];for(let j=0;j<8;j++)c=(c>>>1)^(c&1?0xEDB88320:0);}return(c^0xFFFFFFFF)>>>0;}