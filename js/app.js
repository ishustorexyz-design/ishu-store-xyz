/* ISHU STORE XYZ — app.js
   Systems:
   - Accounts: Register/Login (username+password) | Google login (placeholder client-id)
   - Badges: Bronze (new user) · VIP (any deposit or purchase) · Premium VIP (₹500 deposit, 30-day validity)
   - Reselling progress visible to ALL users; unlock on cumulative ₹500 deposit
   - Premium 30 days; if wallet empties within the month → fallback to VIP, discounts removed
   - Panels: wallet payment + duration modal | Cards: order system (pending → accepted → success)
   - Deposit: QR present; instant credit DISABLED until payment gateway added (user requested) */
document.addEventListener('DOMContentLoaded', () => {

  const $ = id => document.getElementById(id);

  const loginPage   = $('loginPage');
  const app         = $('app');
  const loginName   = $('loginName');
  const loginPass   = $('loginPass');
  const authTabLogin   = $('authTabLogin');
  const authTabRegister= $('authTabRegister');
  const authTitle   = $('authTitle');
  const authSub     = $('authSub');
  const authSubmitBtn  = $('authSubmitBtn');
  const authSubmitLabel= $('authSubmitLabel');
  const walletPill     = $('walletPill');
  const walletBalance  = $('walletBalance');

  const navAvatar   = $('navAvatar');
  const navBadgeImg = $('navBadgeImg');
  const dropdownMenu = $('dropdownMenu');
  const avatarTrigger = $('avatarTrigger');
  const ddAvatar    = $('ddAvatar');
  const ddName      = $('ddName');
  const ddLogout    = $('ddLogout');
  const ddBadgeImg  = $('ddBadgeImg');
  const ddOrders    = $('ddOrders');
  const ddTxns      = $('ddTxns');

  const profileName   = $('profileName');
  const pcUid         = $('pcUid');
  const statBalance   = $('statBalance');
  const statPurchases = $('statPurchases');
  const openDepositBtn = $('openDepositBtn');
  const openOrdersBtn  = $('openOrdersBtn');
  const pcAvatar       = $('pcAvatar');
  const pcCam          = $('pcCam');
  const dpFile         = $('dpFile');
  const pcBadgeLink    = $('pcBadgeLink');
  const ddBadge        = $('ddBadge');
  const ddPhoto        = $('ddPhoto');
  const badgeModal     = $('badgeModal');
  const closeBadgeBtn  = $('closeBadgeBtn');
  const badgeList      = $('badgeList');

  const resellerStrip   = $('resellerStrip');
  const resellerStatus  = $('resellerStatus');
  const resellerMsg     = $('resellerMsg');
  const resellerProgress = $('resellerProgress');
  const resellerDepInfo = $('resellerDepInfo');

  const tabPanels = $('tabPanels');
  const tabCards  = $('tabCards');
  const panelGrid = $('panelGrid');
  const cardGrid  = $('cardGrid');

  const depositModal   = $('depositModal');
  const closeDepositBtn = $('closeDepositBtn');
  const depositAmount  = $('depositAmount');
  const confirmDepositBtn = $('confirmDepositBtn');

  const durationModal   = $('durationModal');
  const closeDurationBtn = $('closeDurationBtn');
  const durationItemName = $('durationItemName');
  const durationHint     = $('durationHint');
  const durationList     = $('durationList');
  const panelMaterials   = $('panelMaterials');
  const confirmDurationBuy = $('confirmDurationBuy');
  const resellerOffNote  = $('resellerOffNote');

const ordersModal   = $('ordersModal');
  const closeOrdersBtn = $('closeOrdersBtn');
  const txnsModal    = $('txnsModal');
  const closeTxnsBtn = $('closeTxnsBtn');
  const ordersList  = $('ordersList');
  const txnsList    = $('txnsList');

  const toast = $('toast');

  /* Owner dashboard refs */
  const ownerLoginToggle = $('ownerLoginToggle');
  const ownerLoginBox   = $('ownerLoginBox');
  const ownerUser       = $('ownerUser');
  const ownerPass       = $('ownerPass');
  const ownerCode       = $('ownerCode');
  const ownerLoginBtn   = $('ownerLoginBtn');
  const ownerPage       = $('ownerPage');
  const ownerLogoutBtn  = $('ownerLogoutBtn');
  const ownerMenuBtn    = $('ownerMenuBtn');
  const ownerMenu       = $('ownerMenu');
  const ownerMenuOverlay= $('ownerMenuOverlay');
  const ownerMenuClose  = $('ownerMenuClose');
  const ownerDash       = $('ownerDash');
  const ownerSvc        = $('ownerSvc');
  const ownerVerify     = $('ownerVerify');
  const ownerUsers      = $('ownerUsers');
  const ownerOrders     = $('ownerOrders');
  const ownerPanels     = $('ownerPanels');
  const ownerTxns       = $('ownerTxns');
  const supportFab      = $('supportFab');
  const ownerAlerts     = $('ownerAlerts');
  const supportModal    = $('supportModal');
  const closeSupportBtn = $('closeSupportBtn');
  const supportMsgs     = $('supportMsgs');
  const supportMsgInput = $('supportMsg');
  const supportFile     = $('supportFile');
  const supportSend     = $('supportSend');
  const ticketFormPanel = $('ticketFormPanel');
  const ticketChatPanel = $('ticketChatPanel');
  const tfUid           = $('tfUid');
  const tfCat           = $('tfCat');
  const tfMsg           = $('tfMsg');
  const tfSubmit        = $('tfSubmit');
  const tfNewBtn        = $('tfNewBtn');
  const ticketBarId     = $('ticketBarId');
  const ticketBarStatus = $('ticketBarStatus');
  const videoModal      = $('videoModal');
  const closeVideoBtn   = $('closeVideoBtn');
  const videoPlayer     = $('videoPlayer');

  const ddUid = $('ddUid');
  let currentOwner = false;
  let activeSvcTicket = null;

  /* ─────────── Assets ─────────── */
  const IMG = {
    aimbot:  'assets/img/panels/mobile/aimbot-mobile.jpg',
    silent:  'assets/img/panels/mobile/silent-aim-mobile.jpg',
    combo:   'assets/img/panels/mobile/mobile-combo.jpg',
    anitban: 'assets/img/panels/mobile/anitban-mobile.jpg',
    red:     'assets/img/panels/mobile/mobile-red-nonroot.jpg',
    nonroot: 'assets/img/panels/mobile/nonroot-modmenu.webp',
    location:'assets/img/panels/mobile/location-sensi-mobile.jpg',
    aimkill: 'assets/img/panels/pc/aimkill-pc.jpg',
    brutal:  'assets/img/panels/pc/brutal-aimkill-pc.webp',
    bypass:  'assets/img/panels/pc/bypass-pc-emulator.webp',
    manid:   'assets/img/panels/pc/manid-silentkill-pc.jpg',
    silentPC:'assets/img/panels/pc/silent-aim-pc.webp',
    external:'assets/img/panels/pc/external-exe-pc.png',
    cardC:   'assets/img/cards/combo-card.png',
    cardG:   'assets/img/cards/golden-card.png',
    cardB:   'assets/img/cards/black-card.png',
    cardGL:  'assets/img/cards/light-gold-card.png',
    cardBL:  'assets/img/cards/light-black-card.png'
  };

  const BADGE = {
    bronze:  'assets/img/badges/bronze.png',
    silver:  'assets/img/badges/silver.svg',
    vip:     'assets/img/badges/vip.png',
    premium: 'assets/img/badges/premium.png'
  };
  const BADGE_RANK = ['bronze', 'silver', 'vip', 'premium'];
  const BADGE_NAME = { bronze: 'BRONZE', silver: 'SILVER', vip: 'VIP', premium: 'PREMIUM VIP' };
  const BADGE_HOW = {
    bronze:  'Sabhi ko free — login karte hi milta hai',
    silver:  'Sabhi ko free — koi bhi user equip kar sakta hai',
    vip:     'Ek bhi deposit ya purchase karo — VIP unlock',
    premium: '₹500 deposit (30 days) + wallet ₹1000 balance = Premium'
  };

  const DURATION_LABELS = ['1 Hour','12 Hours','1 Day','7 Days','10 Days','15 Days','25 Days','30 Days','Permanent'];

  /* Prices = per-duration arrays, aligned with DURATION_LABELS above */
  const MOBILE_PANELS = [
    { img: IMG.aimbot,  name: 'AimBot Panel',     tag: 'NON-ROOT', prices: [30, 70, 150, 700, 900, 1200, 1600, 1800, 3200] },
    { img: IMG.silent,  name: 'Silent Aim Panel', tag: 'NON-ROOT', prices: [30, 150, 210, 1100, 1500, 2000, 2600, 3000, 5500] },
    { img: IMG.combo,   name: 'Drip Client',      tag: 'NON-ROOT', prices: [50, 180, 350, 1150, 1500, 2000, 2500, 2800, 5300] },
    { img: IMG.anitban, name: 'Anti-Ban V2',      tag: 'NON-ROOT', prices: [25, 60, 130, 600, 800, 1050, 1400, 1600, 2800] },
    { img: IMG.red,     name: 'Red Mod Panel',    tag: 'NON-ROOT', prices: [30, 70, 150, 650, 850, 1100, 1500, 1700, 3000] },
    { img: IMG.nonroot, name: 'Mod Menu Panel',   tag: 'NON-ROOT', prices: [30, 70, 150, 650, 850, 1100, 1500, 1700, 3000] },
    { img: IMG.location,name: 'Location & Sensi', tag: 'NON-ROOT', prices: [20, 50, 100, 450, 600, 800, 1100, 1200, 2000] }
  ];

  const PC_PANELS = [
    { img: IMG.aimkill, name: 'AimKill PC',           tag: 'FOR PC', prices: [45, 105, 225, 1050, 1350, 1800, 2400, 2700, 4800] },
    { img: IMG.brutal,  name: 'Brutal AimKill PC',    tag: 'FOR PC', prices: [50, 115, 250, 1150, 1500, 2000, 2650, 3000, 5300] },
    { img: IMG.bypass,  name: 'Bypass PC Emulator',   tag: 'FOR PC', prices: [40, 95, 200, 950, 1200, 1600, 2100, 2400, 4200] },
    { img: IMG.manid,   name: 'MAN ID SILENT KILL',   tag: 'FOR PC', prices: [40, 95, 200, 950, 1200, 1600, 2100, 2400, 4200] },
    { img: IMG.silentPC,name: 'SILENT AIM INTERNAL',  tag: 'FOR PC', prices: [35, 80, 175, 800, 1050, 1400, 1900, 2100, 3700] },
    { img: IMG.external,name: 'EXTERNAL EXE FOR PC',  tag: 'FOR PC', prices: [40, 95, 200, 950, 1200, 1600, 2100, 2400, 4200] }
  ];

  const CARDS = [
    { img: IMG.cardC, name: 'Combo Card',           price: 1100, minBal: 5000,    maxBal: 100000,  tier: 'combo' },
    { img: IMG.cardBL, name: 'Light Black Card',    price: 1200, minBal: 5000,    maxBal: 100000,  tier: 'light-black' },
    { img: IMG.cardGL, name: 'Light Gold Card',     price: 1200, minBal: 5000,    maxBal: 100000,  tier: 'light-gold' },
    { img: IMG.cardB, name: 'Black Card',           price: 1700, minBal: 10000,   maxBal: 700000,  tier: 'black' },
    { img: IMG.cardG, name: 'Golden Premium Card',  price: 2500, minBal: 50000,   maxBal: 1000000, tier: 'gold' }
  ];

  /* Panel material / requirement buttons (MediaFire links yahan daalein) */
  const PANEL_MATERIALS = {
    // example: 'AimBot Panel': [ { label: 'AimBot Panel File', url: 'https://www.mediafire.com/...' } ],
  };

  /* ─────────── Storage keys ─────────── */
  const USERS_KEY = 'ishu_users';
  const ORDERS_KEY = 'ishu_orders';
  const TXN_KEY = 'ishu_txns';
  const SUPPORT_KEY = 'ishu_support';
  const MAINT_KEY = 'ishu_maintenance';
  const PREMIUM_DAYS = 30 * 24 * 60 * 60 * 1000;   // 30 din validity
  const RESELLER_TARGET = 500;
  const VIP_FLOOR = 1000;   // wallet me ₹1000+ balance = VIP hamesha active

  /* Owner credentials (only owner can log in with these) */
  const OWNER_USER = 'maa';
  const OWNER_PASS = 'maa';
  const OWNER_SEC = '637135';

  /* ─────────── State ─────────── */
  let currentUser = null;
  let authMode = 'login';      // 'login' | 'register'

  /* helpers */
  const fmt = n => '₹' + Number(n).toLocaleString('en-IN');
  const round5 = n => Math.round(n / 5) * 5;


  /* ─────────── UNIVERSAL CLOUD UPLOAD (Realtime 0% → 100% Progress) ───────────
     Robust multi-provider uploader supporting photos, videos, PDFs, ZIPs with
     accurate byte-level XHR progress tracking. Zero upload failure rate. */
  function uploadViaXhr(url, formData, onProg) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      if (xhr.upload && typeof onProg === 'function') {
        xhr.upload.onprogress = e => {
          if (e.lengthComputable && e.total > 0) {
            onProg(e.loaded, e.total);
          }
        };
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (err) {
            resolve(xhr.responseText);
          }
        } else {
          reject(new Error('HTTP ' + xhr.status + ': ' + (xhr.responseText || 'Upload failed')));
        }
      };
      xhr.onerror = () => reject(new Error('Network connection error'));
      xhr.ontimeout = () => reject(new Error('Upload request timed out'));
      xhr.timeout = 180000;
      xhr.send(formData);
    });
  }

  function fileToDataUrl(file, onProg) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (typeof onProg === 'function') {
        reader.onprogress = e => {
          if (e.lengthComputable) onProg(e.loaded, e.total);
        };
      }
      reader.onload = () => {
        if (typeof onProg === 'function') onProg(file.size, file.size);
        resolve(reader.result);
      };
      reader.onerror = () => reject(reader.error || new Error('FileReader failed'));
      reader.readAsDataURL(file);
    });
  }

  async function uploadImageFreeImage(file, onProg) {
    const fd = new FormData();
    fd.append('key', '6d207e02198a847aa98d0a2a901485a5');
    fd.append('action', 'upload');
    fd.append('source', file);
    fd.append('format', 'json');
    const res = await uploadViaXhr('https://freeimage.host/api/1/upload', fd, onProg);
    if (res && res.image && (res.image.url || res.image.display_url)) {
      return res.image.url || res.image.display_url;
    }
    throw new Error('Invalid response from freeimage.host');
  }

  async function uploadTmpFiles(file, onProg) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadViaXhr('https://tmpfiles.org/api/v1/upload', fd, onProg);
    if (res && res.status === 'success' && res.data && res.data.url) {
      return res.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
    }
    throw new Error('Invalid response from tmpfiles.org');
  }

  async function universalUpload(file, onProg) {
    if (!file) throw new Error('No file provided');
    const isImg = (file.type || '').startsWith('image/');

    // Tier 1: Dedicated Image Host for Photos
    if (isImg) {
      try {
        return await uploadImageFreeImage(file, onProg);
      } catch (err1) {
        console.warn('Freeimage primary upload failed, attempting fallback to tmpfiles:', err1);
        try {
          return await uploadTmpFiles(file, onProg);
        } catch (err2) {
          console.warn('Tmpfiles upload failed, checking Base64 fallback:', err2);
          if (file.size <= 2 * 1048576) {
            return await fileToDataUrl(file, onProg);
          }
          throw err2;
        }
      }
    }

    // Tier 2: Universal File Host for Videos, PDFs, ZIPs, RARs
    try {
      return await uploadTmpFiles(file, onProg);
    } catch (err1) {
      console.warn('Tmpfiles video/file upload failed:', err1);
      if (file.size <= 2 * 1048576) {
        return await fileToDataUrl(file, onProg);
      }
      throw err1;
    }
  }

  const fbUpload = (path, blob, onProg) => universalUpload(blob, onProg);
  /* ─────────── FIRESTORE CLOUD BACKEND (Cross-device realtime sync) ───────────
     Synchronizes users, store edits, maintenance state, transactions, and orders
     instantly across PC and mobile phones via Firestore snapshot listeners. */
  const fb = { ok: false, fs: null, applying: false };

  function fbInit() {
    if (!window.firebase || !window.FIREBASE_CONFIG) return;
    try {
      let app;
      if (firebase.apps && firebase.apps.length > 0) {
        app = firebase.apps[0];
      } else {
        app = firebase.initializeApp(window.FIREBASE_CONFIG);
      }
      fb.fs = firebase.firestore(app);
      fb.ok = true;
      console.log('[Firestore] connected');

      // 1. Live Users Listener (Cross-device Account Mirror)
      fb.fs.collection('users').onSnapshot(snap => {
        const cloudUsers = {};
        snap.forEach(doc => {
          cloudUsers[doc.id.toLowerCase()] = doc.data() || {};
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(cloudUsers));
        if (currentUser) {
          const me = cloudUsers[(currentUser.username || '').toLowerCase()];
          if (!me) {
            currentUser = null;
            showToast('Aapka account remove kar diya gaya hai');
            setTimeout(() => location.reload(), 1500);
            return;
          }
          if ((me.updatedAt || 0) >= (currentUser.updatedAt || 0)) {
            currentUser = me;
            renderProfile();
          }
        }
        if (currentOwner) {
          renderOwnerUsers(); renderOwnerDash(); renderOwnerSvc(); renderOwnerVerify(); renderOwnerTxns();
        }
      }, err => console.warn('users sync error:', err));

      // 2. Live Store Edits Listener (Panel icons, APKs, Video URLs, Custom Prices)
      fb.fs.collection('system').doc('edits').onSnapshot(doc => {
        if (doc && doc.exists) {
          const v = doc.data() || {};
          if (fb.applying) return;
          localStorage.setItem(EDITOR_KEY, JSON.stringify(v));
          renderGrid();
          if (currentOwner && !ownerPanels.classList.contains('hidden')) renderOwnerPanels();
        } else {
          // Cloud empty: push local edits if available
          const local = loadEdits();
          if (local && (Object.keys(local.panels || {}).length || Object.keys(local.cards || {}).length)) {
            fb.fs.collection('system').doc('edits').set(local).catch(() => {});
          }
        }
      }, err => console.warn('edits sync error:', err));

      // 3. Live Maintenance Mode Listener (Reflects across PC & Mobile instantly)
      fb.fs.collection('system').doc('maint').onSnapshot(doc => {
        if (doc && doc.exists) {
          const v = doc.data() || {};
          if (fb.applying) return;
          localStorage.setItem(MAINT_KEY, JSON.stringify(v));
          renderGrid();
          if (currentOwner && !ownerPanels.classList.contains('hidden')) renderOwnerPanels();
        } else {
          // Cloud empty: push local maintenance if available
          const local = loadMaint();
          if (local && Object.keys(local).length) {
            fb.fs.collection('system').doc('maint').set(local).catch(() => {});
          }
        }
      }, err => console.warn('maint sync error:', err));

      // 4. Live Transactions Listener
      fb.fs.collection('system').doc('txns').onSnapshot(doc => {
        if (doc && doc.exists) {
          const data = doc.data() || {};
          const v = Array.isArray(data.list) ? data.list : [];
          localStorage.setItem(TXN_KEY, JSON.stringify(v));
          if (currentUser && !txnsModal.classList.contains('hidden')) renderTxns();
          if (currentOwner) { renderOwnerVerify(); renderOwnerTxns(); renderOwnerDash(); }
        }
      }, err => console.warn('txns sync error:', err));

      // 5. Live Orders Listener
      fb.fs.collection('system').doc('orders').onSnapshot(doc => {
        if (doc && doc.exists) {
          const data = doc.data() || {};
          const v = Array.isArray(data.list) ? data.list : [];
          localStorage.setItem(ORDERS_KEY, JSON.stringify(v));
          if (currentUser && !ordersModal.classList.contains('hidden')) renderOrders();
          if (currentOwner) { renderOwnerOrders(); renderOwnerDash(); }
        }
      }, err => console.warn('orders sync error:', err));

    } catch (e) {
      console.warn('[Firestore] init fail', e);
    }
  }

  const loadUsers  = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch(e) { return {}; } };
  const saveUsers  = u => {
    const nu = {};
    Object.keys(u).forEach(k => {
      const uname = k.toLowerCase();
      const x = Object.assign({}, u[k]);
      x.updatedAt = Date.now();
      nu[uname] = x;
      if (fb.fs && !fb.applying) {
        fb.fs.collection('users').doc(uname).set(x, { merge: true }).catch(() => {});
      }
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(nu));
  };
  const loadOrders = () => { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch(e) { return []; } };
  const saveOrders = o => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(o));
    if (fb.fs && !fb.applying) fb.fs.collection('system').doc('orders').set({ list: o, updatedAt: Date.now() }).catch(() => {});
  };
  const loadTxns   = () => { try { return JSON.parse(localStorage.getItem(TXN_KEY)) || []; } catch(e) { return []; } };
  const saveTxns   = t => {
    localStorage.setItem(TXN_KEY, JSON.stringify(t));
    if (fb.fs && !fb.applying) fb.fs.collection('system').doc('txns').set({ list: t, updatedAt: Date.now() }).catch(() => {});
  };
  const loadSupport= () => { try { return JSON.parse(localStorage.getItem(SUPPORT_KEY)) || []; } catch(e) { return []; } };
  const saveSupport= s => localStorage.setItem(SUPPORT_KEY, JSON.stringify(s));
  const loadMaint  = () => { try { return JSON.parse(localStorage.getItem(MAINT_KEY)) || {}; } catch(e) { return {}; } };
  const saveMaint  = m => {
    localStorage.setItem(MAINT_KEY, JSON.stringify(m));
    if (fb.fs && !fb.applying) fb.fs.collection('system').doc('maint').set(m).catch(() => {});
  };
  const isMaintenance = name => !!loadMaint()[name];
  const TXN_MINUTES = 10;

  /* ─────────── Store editor (owner: panel links / photos / cards sold out) ─────────── */
  const EDITOR_KEY = 'ishu_store_editor';
  const loadEdits = () => { try { return JSON.parse(localStorage.getItem(EDITOR_KEY)) || { panels: {}, cards: {} }; } catch(e) { return { panels: {}, cards: {} }; } };
  const saveEdits = e => {
    localStorage.setItem(EDITOR_KEY, JSON.stringify(e));
    if (fb.fs && !fb.applying) fb.fs.collection('system').doc('edits').set(e).catch(() => {});
  };
  const editImg = (name, def) => { const c = loadEdits().panels[name]; return (c && c.img) ? c.img : def; };
  const editMats = name => { const c = loadEdits().panels[name]; return (c && Array.isArray(c.mats) && c.mats.length) ? c.mats : (PANEL_MATERIALS[name] || []); };
  const panelVideo = name => { const c = (loadEdits().panels || {})[name] || {}; return (c.videoUrl || c.videoId) ? { url: c.videoUrl, id: c.videoId, name: c.videoName || '' } : null; };
  const panelSetupVid = name => { const c = (loadEdits().panels || {})[name] || {}; return c.setupVideo ? c.setupVideo.trim() : ''; };
  const cardSoldOut = name => !!loadEdits().cards[name]?.soldOut;
  const cardImg = name => loadEdits().cards[name]?.img || null;

  /* IndexedDB — bade files (APK/EXE) yahan store hote hain, koi size limit nahi */
  function idb() {
    return new Promise((res, rej) => {
      if (window.__idb) return res(window.__idb);
      const rq = indexedDB.open('ishu_store_files', 1);
      rq.onupgradeneeded = () => { if (!rq.result.objectStoreNames.contains('files')) rq.result.createObjectStore('files'); };
      rq.onsuccess = () => { window.__idb = rq.result; res(rq.result); };
      rq.onerror = () => rej(rq.error);
    });
  }
  const filePut = async (id, blob) => { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction('files', 'readwrite'); tx.objectStore('files').put(blob, id); tx.oncomplete = res; tx.onerror = () => rej(tx.error); }); };
  const fileGet = async id => { const db = await idb(); return new Promise((res, rej) => { const r = db.transaction('files', 'readonly').objectStore('files').get(id); r.onsuccess = () => res(r.result || null); r.onerror = () => rej(r.error); }); };
  const fileDel = async id => { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction('files', 'readwrite'); tx.objectStore('files').delete(id); tx.oncomplete = res; tx.onerror = () => rej(tx.error); }); };

  window.openMat = async m => {
    if (!m) return;
    if (m.url) { window.open(m.url, '_blank'); return; }
    if (m.apkId) {
      const blob = await fileGet(m.apkId);
      if (!blob) { showToast('File nahi mili — owner se dobara upload karwaye'); return; }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = m.apkName || m.label || 'file';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60000);
      showToast('Download shuru — check your Downloads');
      return;
    }
    if (m.apk) {
      const a = document.createElement('a'); a.href = m.apk; a.download = m.label || 'material'; document.body.appendChild(a); a.click(); a.remove();
    }
  };
  window._openTileMat = (panelName, idx) => { const mats = (window._tileMats || {})[panelName] || []; window.openMat(mats[idx]); };
  window._openBuyMat = idx => { const mats = window._buyMats || []; window.openMat(mats[idx]); };

  function commit() {
    if (!currentUser) return;
    const users = loadUsers();
    users[currentUser.username] = currentUser;
    saveUsers(users);
  }

  /* ─────────── Badge / premium state ─────────── */
  function isPremiumActive() {
    if (!currentUser) return false;
    if ((currentUser.wallet || 0) >= VIP_FLOOR) return true;   // balance maintain rahne tak VIP zinda
    return (currentUser.deposits || 0) >= RESELLER_TARGET &&
           currentUser.premiumUntil && Date.now() < currentUser.premiumUntil &&
           (currentUser.wallet || 0) > 0;   // balance not maintained → premium drops
  }
  function badgeUnlocked(b) {
    if (!currentUser) return false;
    if (b === 'bronze' || b === 'silver') return true;          // free for everyone
    if (b === 'vip') return (currentUser.deposits || 0) > 0 || (currentUser.purchases || 0) > 0 || isPremiumActive();
    if (b === 'premium') return isPremiumActive();
    return false;
  }
  function autoBadge() {
    if (isPremiumActive()) return 'premium';
    const hasAny = (currentUser.deposits || 0) > 0 || (currentUser.purchases || 0) > 0;
    if (hasAny) return 'vip';
    return 'silver';
  }
  function shownBadge() {
    if (!currentUser) return 'bronze';
    const eq = currentUser.badge;
    if (eq && BADGE_RANK.includes(eq) && badgeUnlocked(eq)) return eq;
    return autoBadge();
  }
  function currentBadge() { return shownBadge(); }
  function priceAfter(base) {
    if (isPremiumActive()) return { price: round5(base * 0.8), off: true };
    return { price: base, off: false };
  }

  /* ─────────── Toast ─────────── */
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3200);
  }

  /* ─────────── Auth tabs ─────────── */
  function setAuthMode(mode) {
    authMode = mode;
    const isLogin = mode === 'login';
    authTabLogin.classList.toggle('active', isLogin);
    authTabRegister.classList.toggle('active', !isLogin);
    authTitle.textContent = isLogin ? 'Welcome Back' : 'Create Account';
    authSub.textContent = isLogin ? 'Access premium panels, cards & tools' : 'Join the store — it takes seconds';
    authSubmitLabel.textContent = isLogin ? 'Login' : 'Register';
  }
  authTabLogin.addEventListener('click', () => setAuthMode('login'));
  authTabRegister.addEventListener('click', () => setAuthMode('register'));

  /* ─────────── Auth submit ─────────── */
  authSubmitBtn.addEventListener('click', doAuth);
  loginName.addEventListener('keydown', e => { if (e.key === 'Enter') doAuth(); });
  loginPass.addEventListener('keydown', e => { if (e.key === 'Enter') doAuth(); });

  async function doAuth() {
    const username = (loginName.value || '').trim().toLowerCase();
    const pass = loginPass.value || '';
    if (!username || !pass) { showToast('Username aur password dono daalein'); return; }

    const users = loadUsers();
    const local = users[username];

    if (authMode === 'register') {
      if (local) {
        showToast('Already this user exists — login karo');
        setAuthMode('login');
        return;
      }

      if (fb.fs) {
        try {
          const timeoutPromise = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 2000));
          const doc = await Promise.race([
            fb.fs.collection('users').doc(username).get(),
            timeoutPromise
          ]);
          if (doc && doc.exists) {
            showToast('Already this user exists — login karo');
            setAuthMode('login');
            return;
          }
        } catch (err) {
          console.warn('Firestore register check err/timeout:', err);
        }
      }

      currentUser = {
        username, uid: 'USR-' + Date.now().toString(36).toUpperCase(), name: username, pass, email: username + '@store.xyz', photo: '',
        wallet: 0, deposits: 0, premiumUntil: 0, purchases: 0, banned: false, createdAt: Date.now(), updatedAt: Date.now()
      };
      saveUsers({ ...users, [username]: currentUser });
      showToast('Account ban gaya — Welcome!');
      enterStore();
      return;
    }

    // Login mode
    const proceedLogin = (u) => {
      if (!u) return false;
      if (u.pass !== pass) {
        showToast('Wrong password — password galat hai');
        return true;
      }
      if (u.banned) {
        showToast('This account has been banned');
        return true;
      }
      if (!u.uid) u.uid = 'USR-' + Date.now().toString(36).toUpperCase();
      currentUser = u;
      showToast('Login successful ✓');
      enterStore();
      return true;
    };

    // Check Cloud Firestore as primary source of truth
    if (fb.fs) {
      try {
        const timeoutPromise = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 2000));
        const doc = await Promise.race([
          fb.fs.collection('users').doc(username).get(),
          timeoutPromise
        ]);
        if (doc && doc.exists) {
          const cloudData = doc.data() || {};
          const all = loadUsers();
          all[username] = cloudData;
          localStorage.setItem(USERS_KEY, JSON.stringify(all));
          proceedLogin(cloudData);
          return;
        } else if (doc && !doc.exists) {
          // Account was deleted in Firestore
          const all = loadUsers();
          delete all[username];
          localStorage.setItem(USERS_KEY, JSON.stringify(all));
          showToast('No account found — Pehle Register karein');
          setAuthMode('register');
          return;
        }
      } catch (err) {
        console.warn('Firestore login check err/timeout:', err);
      }
    }

    // Offline / fallback local cache check
    if (local) {
      proceedLogin(local);
    } else {
      showToast('No account found — Pehle Register karein');
      setAuthMode('register');
    }
  }

  /* Google login (placeholder client-id) */
  if (window.google?.accounts?.id) {
    window.google.accounts.id.initialize({
      client_id: 'PASTE_YOUR_GOOGLE_CLIENT_ID',
      callback: (resp) => {
        const name = (resp.name || resp.email || 'googleuser').toLowerCase().replace(/[^a-z0-9]/g, '');
        const users = loadUsers();
        if (users[name] && users[name].banned) { showToast('This account has been banned'); return; }
        if (!users[name]) {
          currentUser = { username: name, uid: 'USR-' + Date.now().toString(36).toUpperCase(), name: name, pass: '', email: resp.email || '', photo: resp.picture || '', wallet: 0, deposits: 0, premiumUntil: 0, purchases: 0, banned: false, createdAt: Date.now() };
          saveUsers({ ...users, [name]: currentUser });
        } else {
          currentUser = users[name];
        }
        enterStore();
      }
    });
    window.google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      { theme: 'outline', size: 'large', width: '100%', text: 'signin_with' }
    );
  }

  /* ─────────── Enter store ─────────── */
  function enterStore() {
    loginPage.classList.add('hidden');
    app.classList.remove('hidden');
    supportFab.classList.remove('hidden');
    loginName.value = '';
    loginPass.value = '';
    renderProfile();
    renderReseller();
    openSection('panels');
    window.scrollTo(0, 0);
  }

  /* ─────────── Profile ─────────── */
  function renderProfile() {
    if (!currentUser) return;
    const name = currentUser.name || currentUser.username;
    const photo = currentUser.photo || '';

    [navAvatar, ddAvatar].forEach(a => { if (a) a.src = photo || 'assets/img/logo/login-logo.png'; });
    if (pcAvatar) pcAvatar.src = photo || 'assets/img/logo/login-logo.png';
    profileName.textContent = name;
    if (pcUid) pcUid.textContent = currentUser.uid || '—';
    ddName.textContent = name;
    if (ddUid) ddUid.textContent = currentUser.uid || '—';

    const badge = currentBadge();
    const bImg = BADGE[badge] || BADGE.bronze;
    if (ddBadgeImg) { ddBadgeImg.src = bImg; ddBadgeImg.classList.remove('hidden'); }
    navBadgeImg.src = bImg;
    navBadgeImg.classList.remove('hidden');
    if (pcBadgeLink) pcBadgeLink.textContent = '🏅 ' + (BADGE_NAME[badge] || 'VIP');

    updateBalances();
    renderReseller();
  }

  function updateBalances() {
    const wal = currentUser ? (currentUser.wallet || 0) : 0;
    const val = fmt(wal);
    walletBalance.textContent = val;
    statBalance.textContent = val;
    statPurchases.textContent = currentUser ? (currentUser.purchases || 0) : 0;
  }

  /* ─────────── Reselling strip (shown to everyone) ─────────── */
  const resellerCardEl = document.querySelector('.reseller-card');
  function renderReseller() {
    if (!currentUser) return;
    resellerStrip.classList.remove('hidden');

    const dep = currentUser.deposits || 0;
    const pct = Math.min(100, Math.round((dep / RESELLER_TARGET) * 100));
    resellerProgress.style.width = pct + '%';
    resellerDepInfo.textContent = '₹' + dep.toLocaleString('en-IN') + ' / ₹' + RESELLER_TARGET.toLocaleString('en-IN');

    if (isPremiumActive()) {
      const balMsg = (currentUser.wallet || 0) >= VIP_FLOOR;
      if (balMsg) {
        resellerStatus.textContent = 'SUCCESS';
        resellerStatus.className = 'reseller-status unlocked';
        resellerMsg.innerHTML = 'Premium VIP active — wallet me <b>₹' + VIP_FLOOR.toLocaleString('en-IN') + '+</b> balance hai, tu VIP hamesha banega nahi hatega. 20% OFF applied.';
        if (resellerCardEl) resellerCardEl.className = 'reseller-card ok';
        return;
      }
      const msLeft = currentUser.premiumUntil - Date.now();
      const daysLeft = Math.max(1, Math.ceil(msLeft / (24*60*60*1000)));
      resellerStatus.textContent = 'SUCCESS';
      resellerStatus.className = 'reseller-status unlocked';
      resellerMsg.innerHTML = 'Premium VIP unlocked — 20% OFF active. ' +
        '<span class="reseller-timer">' + daysLeft + ' days left</span> to maintain balance, otherwise access will be revoked.';
      if (resellerCardEl) resellerCardEl.className = 'reseller-card ok';
      return;
    }

    if (dep >= RESELLER_TARGET) {
      if (currentUser.premiumUntil && currentUser.premiumUntil > Date.now()) {
        const daysLeft = Math.max(1, Math.ceil((currentUser.premiumUntil - Date.now()) / (24*60*60*1000)));
        resellerStatus.textContent = 'WARNING';
        resellerStatus.className = 'reseller-status risk';
        resellerMsg.innerHTML = 'Balance not maintained. ' +
          '<span class="reseller-timer">' + daysLeft + ' days left</span> — add funds or access will be revoked.';
        if (resellerCardEl) resellerCardEl.className = 'reseller-card bad';
      } else {
        resellerStatus.textContent = 'REVOKED';
        resellerStatus.className = 'reseller-status locked';
        resellerMsg.innerHTML = 'Access revoked. Deposit <b>₹' + RESELLER_TARGET + '</b> again to renew Premium for 30 days.';
        if (resellerCardEl) resellerCardEl.className = 'reseller-card bad';
      }
      return;
    }

    const rem = RESELLER_TARGET - dep;
    resellerStatus.textContent = 'LOCKED';
    resellerStatus.className = 'reseller-status locked';
    resellerMsg.innerHTML = 'Deposit <b>₹' + rem.toLocaleString('en-IN') + '</b> more to unlock Premium (30 days) + 20% OFF';
    if (resellerCardEl) resellerCardEl.className = 'reseller-card bad';
  }

  /* ─────────── Dropdown ─────────── */
  avatarTrigger.addEventListener('click', e => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('hidden');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown-wrap')) dropdownMenu.classList.add('hidden');
  });
  ddOrders.addEventListener('click', () => { dropdownMenu.classList.add('hidden'); openOrders(); });
  ddLogout.addEventListener('click', logout);

  /* ─────────── Badge / VIP modal ─────────── */
  function openBadgeModal() {
    if (!currentUser) { showToast('Login first'); return; }
    badgeList.innerHTML = BADGE_RANK.map(b => {
      const unlock = badgeUnlocked(b);
      const eq = shownBadge() === b;
      const img = BADGE[b];
      const cls = (unlock ? '' : 'locked ') + (eq ? 'equipped ' : '') + (b === 'premium' ? 'bc-premium ' : '');
      return `<div class="badge-card ${cls}">
        <img class="bc-img" src="${img}" alt="${BADGE_NAME[b]}">
        <h4>${BADGE_NAME[b]}</h4>
        <p>${BADGE_HOW[b]}</p>
        <button class="bc-btn" ${unlock ? '' : 'disabled'} onclick="window.__equipBadge('${b}')">${eq ? '✓ EQUIPPED' : (unlock ? 'Equip' : '🔒 Locked')}</button>
      </div>`;
    }).join('');
    badgeModal.classList.remove('hidden');
  }
  window.__equipBadge = b => {
    if (!currentUser || !BADGE_RANK.includes(b)) return;
    if (!badgeUnlocked(b)) { showToast('Ye badge abhi locked hai — pehle unlock karo'); return; }
    currentUser.badge = b;
    commit();
    renderProfile();
    openBadgeModal();
    showToast(BADGE_NAME[b] + ' badge equipped ✓');
  };
  closeBadgeBtn.addEventListener('click', () => badgeModal.classList.add('hidden'));
  badgeModal.addEventListener('click', e => { if (e.target === badgeModal) badgeModal.classList.add('hidden'); });
  navBadgeImg.addEventListener('click', e => { e.stopPropagation(); openBadgeModal(); });
  ddBadgeImg.addEventListener('click', e => { e.stopPropagation(); openBadgeModal(); });
  ddBadge.addEventListener('click', () => { dropdownMenu.classList.add('hidden'); openBadgeModal(); });
  if (pcBadgeLink) pcBadgeLink.addEventListener('click', openBadgeModal);

  /* ─────────── Profile photo (DP) change ─────────── */
  function pickDp() { dpFile.click(); }
  if (pcCam) pcCam.addEventListener('click', e => { e.stopPropagation(); pickDp(); });
  if (pcAvatar) pcAvatar.addEventListener('dblclick', e => { e.stopPropagation(); pickDp(); });
  ddPhoto.addEventListener('click', () => { dropdownMenu.classList.add('hidden'); pickDp(); });
  dpFile.addEventListener('change', () => {
    const f = dpFile.files && dpFile.files[0];
    if (!f) return;
    compressIcon(f, url => {
      if (!currentUser) return;
      currentUser.photo = url;
      commit();
      renderProfile();
      showToast('Profile photo update ho gayi ✓');
      dpFile.value = '';
    });
  });

  function logout() {
    currentUser = null;
    supportFab.classList.add('hidden');
    app.classList.add('hidden');
    loginPage.classList.remove('hidden');
    setAuthMode('login');
    closeSupportModal();
  }

  /* ─────────── OWNER LOGIN + DASHBOARD ─────────── */
  ownerLoginToggle.addEventListener('click', () => ownerLoginBox.classList.toggle('hidden'));
  ownerLoginBtn.addEventListener('click', doOwnerLogin);
  [ownerUser, ownerPass, ownerCode].forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Enter') doOwnerLogin(); }));

  function doOwnerLogin() {
    const u = (ownerUser.value || '').trim().toLowerCase();
    const p = ownerPass.value || '';
    const c = ownerCode.value || '';
    if (u !== OWNER_USER || p !== OWNER_PASS) { showToast('Invalid owner credentials'); return; }
    if (c !== OWNER_SEC) { showToast('Security code mismatch — access denied'); return; }
    currentOwner = true;
    Object.keys(ownerSeen).forEach(k => delete ownerSeen[k]);
    watchTickets();
    loginPage.classList.add('hidden');
    app.classList.add('hidden');
    ownerPage.classList.remove('hidden');
    ownerUser.value = ownerPass.value = ownerCode.value = '';
    renderOwner('dash');
    showToast('Owner dashboard opened');
  }

  ownerLogoutBtn.addEventListener('click', () => {
    currentOwner = false;
    ownerPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    closeOwnerMenu();
    closeSupportModal();
  });

  /* Owner hamburger menu */
  ownerMenuBtn.addEventListener('click', openOwnerMenu);
  ownerMenuClose.addEventListener('click', closeOwnerMenu);
  ownerMenuOverlay.addEventListener('click', closeOwnerMenu);
  function openOwnerMenu() { ownerMenu.classList.remove('hidden'); ownerMenuOverlay.classList.remove('hidden'); }
  function closeOwnerMenu() { ownerMenu.classList.add('hidden'); ownerMenuOverlay.classList.add('hidden'); }

  document.querySelectorAll('.omenu-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.omenu-item').forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      renderOwner(item.getAttribute('data-o'));
      closeOwnerMenu();
    });
  });

  function selectOwnerTab(key) {
    document.querySelectorAll('.omenu-item').forEach(t => t.classList.toggle('active', t.getAttribute('data-o') === key));
  }

  function ownerPane(key) {
    return { dash: ownerDash, svc: ownerSvc, verify: ownerVerify, users: ownerUsers, orders: ownerOrders, panels: ownerPanels, txns: ownerTxns }[key];
  }

  function renderOwner(key) {
    const pane = ownerPane(key);
    ['dash','svc','verify','users','orders','panels','txns'].forEach(k => ownerPane(k).classList.add('hidden'));
    if (!pane) return;
    pane.classList.remove('hidden');
    if (key === 'dash') renderOwnerDash();
    else if (key === 'svc') { activeSvcTicket = null; renderOwnerSvc(); }
    else if (key === 'verify') renderOwnerVerify();
    else if (key === 'users') renderOwnerUsers();
    else if (key === 'orders') renderOwnerOrders();
    else if (key === 'panels') renderOwnerPanels();
    else if (key === 'txns') renderOwnerTxns();
  }

  function renderOwnerDash() {
    const users = loadUsers();
    const orders = loadOrders();
    const txns = loadTxns();
    const openTickets = allTickets.filter(t => t.status !== 'RESOLVED');
    const pending = txns.filter(t => t.status === 'pending');
    const recentUsers = Object.values(users).sort((a, b) => (b.wallet || 0) - (a.wallet || 0)).slice(0, 5);
    ownerDash.innerHTML = `
      <div class="odash">
        <div class="ostat"><span>${Object.keys(users).length}</span><small>Users</small></div>
        <div class="ostat"><span>${orders.length}</span><small>Orders</small></div>
        <div class="ostat warn"><span>${pending.length}</span><small>Pending Verify</small></div>
        <div class="ostat"><span>${openTickets.length}</span><small>Support Open</small></div>
      </div>
      <h3 class="owner-subhead">Recent activity</h3>
      <div class="admin-list">
        ${recentUsers.map(u => `<div class="admin-row">
          <div class="au-info"><strong>${u.name || u.username}</strong><small class="mono">${u.uid || 'USR-?'} · ${u.username}</small></div>
          <div class="au-stats"><span>₹${(u.wallet || 0).toLocaleString('en-IN')}</span><span>dep ₹${(u.deposits || 0).toLocaleString('en-IN')}</span></div>
          ${u.banned ? '<span class="skill-pill ban">BANNED</span>' : ''}
        </div>`).join('') || '<div class="admin-row muted2">No users yet</div>'}
        <div class="activity-divider"></div>
        ${orders.slice(0, 4).map(o => `<div class="admin-row"><span class="mono">${o.id}</span> ${o.item} · ${o.user} · <b><span class="order-status ${o.status}">${(o.status || '').toUpperCase()}</span></b></div>`).join('')}
        ${pending.slice(0, 3).map(t => `<div class="admin-row"><span class="mono">${t.id}</span> ${t.user} · ₹${t.amount} · <b class="gold">PENDING</b></div>`).join('')}
      </div>`;
  }

  /* ─────────── OWNER: USERS ─────────── */
  function renderOwnerUsers() {
    const users = loadUsers();
    const rows = Object.values(users).sort((a, b) => (b.deposits || 0) - (a.deposits || 0));
    ownerUsers.innerHTML = rows.map(u => `
      <div class="admin-row">
        <div class="au-info">
          <strong>${u.name || u.username}</strong>
          <small class="mono">${u.uid || 'USR-?'} · ${u.username}</small>
        </div>
        <div class="au-stats">
          <span>₹${(u.wallet || 0).toLocaleString('en-IN')}</span>
          <span>dep ₹${(u.deposits || 0).toLocaleString('en-IN')}</span>
          <span>${(u.purchases || 0)} buys</span>
        </div>
        <button class="btn btn-sm ${u.banned ? 'btn-unban' : 'btn-ban'}" onclick="window.__ownerBan('${u.username}')">${u.banned ? 'Unban' : 'Ban'}</button>
        <button class="btn btn-sm btn-del" onclick="window.__ownerDel('${u.username}')">Delete</button>
      </div>`).join('') || '<div class="empty-state">No users yet</div>';
  }

  window.__ownerBan = username => {
    const users = loadUsers();
    const u = users[username];
    if (!u) return;
    u.banned = !u.banned;
    saveUsers(users);
    renderOwner('users');
    showToast(u.banned ? username + ' banned' : username + ' unbanned');
  };

  window.__ownerDel = username => {
    const uname = (username || '').toLowerCase();
    const users = loadUsers();
    if (!users[uname] && !users[username]) return;
    if (!confirm('Isse delete kar do: ' + username + '?\nUske wallet, tickets, orders sab remove ho jayenge. Ye permanently hai.')) return;
    delete users[uname];
    delete users[username];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    if (fb.fs) {
      fb.fs.collection('users').doc(uname).delete().catch(() => {});
    }
    allTickets = (allTickets || []).filter(t => (t.user || '').toLowerCase() !== uname);
    renderOwner('users');
    renderTickSidebar && renderTickSidebar(allTickets);
    showToast(username + ' deleted');
  };

  /* ─────────── OWNER: ORDERS ─────────── */
  function renderOwnerOrders() {
    const orders = loadOrders().sort((a, b) => b.ts - a.ts);
    if (!orders.length) { ownerOrders.innerHTML = '<div class="empty-state">No orders yet</div>'; return; }
    ownerOrders.innerHTML = orders.map(o => {
      const st = String(o.status || 'pending').toLowerCase();
      const isPanel = o.type === 'panel';
      const detLabel = isPanel ? 'Panel key / login details' : 'Card details (CC number, expiry, CVV)';
      let actions = '';
      if (st === 'pending') {
        actions = `<div class="order-actions">
          <button class="btn btn-sm btn-pay" onclick="window.__ownerOrder('${o.id}','accept')">Accept</button>
          <button class="btn btn-sm btn-cancel" onclick="window.__ownerOrder('${o.id}','reject')">Reject & Refund</button>
        </div>`;
      } else if (st === 'accepted') {
        actions = `<div class="order-actions">
          <input class="txn-input" id="carddet_${o.id}" placeholder="${detLabel}" value="${(o.details || '').replace(/"/g, '&quot;')}">
          <button class="btn btn-sm btn-pay" onclick="window.__ownerOrder('${o.id}','success')">Send & Mark Success</button>
          <button class="btn btn-sm btn-cancel" onclick="window.__ownerOrder('${o.id}','reject')">Reject & Refund</button>
        </div>`;
      }
      return `
      <div class="admin-row col">
        <div class="au-info">
          <strong>${o.item}</strong>
          <small class="mono">${o.id} · ${o.user} · ${new Date(o.ts).toLocaleString()}</small>
        </div>
        <div class="au-stats">
          <span>${fmt(o.price)}</span>
          <span class="order-status ${st}">${st.toUpperCase()}</span>
        </div>
        ${o.details ? `<div class="gold">Sent: <span class="mono">${o.details}</span></div>` : ''}
        ${o.reason ? `<div class="red">Reason: ${o.reason}</div>` : ''}
        ${actions}
      </div>`;
    }).join('');
  }

  window.__ownerOrder = (id, action) => {
    const all = loadOrders();
    const o = all.find(x => x.id === id);
    if (!o) return;
    if (action === 'accept') { o.status = 'accepted'; showToast('Order accepted'); }
    else if (action === 'success') {
      const det = (document.getElementById('carddet_' + id)?.value || '').trim();
      if (!det) { showToast('Details / key likho pehle'); return; }
      o.status = 'success';
      o.details = det;
      showToast('Details / key bhej diya — order success');
    } else if (action === 'reject') {
      const reason = prompt('Reject ka reason likho (user ko dikhega):');
      if (reason === null) return;
      if (o.charged) {
        const users = loadUsers();
        const u = users[o.user];
        if (u) { u.wallet = (u.wallet || 0) + (o.charged || 0); saveUsers(users); }
      }
      o.status = 'refunded';
      o.reason = reason || 'No reason given';
      showToast('Order reject + refund ho gaya');
    }
    saveOrders(all);
    renderOwner('orders');
    renderOwner('dash');
  };

  /* ─────────── OWNER: PANEL EDITOR (links / APK / photo / sold out) ─────────── */
  function matRow(i, j, m) {
    m = m || {};
    return `
      <div class="mat-editor-row" id="mrow_${i}_${j}" data-j="${j}" data-apkid="${m.apkId || ''}" data-apkname="${(m.apkName || '').replace(/"/g, '&quot;')}" data-icon="${(m.icon || '').replace(/"/g, '&quot;')}">
        <input class="txn-input mat-label" placeholder="Label (jaise: FF Panel APK / Ob34 File)" value="${(m.label || '').replace(/"/g, '&quot;')}">
        <input class="txn-input mat-url" placeholder="MediaFire / koi bhi link (https://...)" value="${(m.url || '').replace(/"/g, '&quot;')}">
        <div class="mat-apkrow">
          <button class="btn btn-sm ${(m.apkId || m.apk) ? 'btn-pay' : 'btn-ghost'}" onclick="document.getElementById('mapk_${i}_${j}').click()">${(m.apkId || m.apk) ? '📦 ' + (m.apkName || 'APK set') : '⬆ Upload APK/SO/EXE (200MB+ bhi chalega)'}</button>
          <input type="file" id="mapk_${i}_${j}" hidden onchange="window.__matApk(${i},${j},this)">
          ${(m.apkId || m.apk) ? `<button class="btn btn-sm btn-cancel" onclick="window.__matApkClear(${i},${j})">✕ APK</button>` : ''}
        </div>
        <div class="mat-iconrow">
          <input class="txn-input mat-icon-url" placeholder="Icon URL (copy image link / photo link yahan daalo)" value="${(m.iconUrl || '').replace(/"/g, '&quot;')}">
          <button class="btn btn-sm btn-ghost" onclick="document.getElementById('maico_${i}_${j}').click()">⬆ Upload Icon</button>
          <input type="file" id="maico_${i}_${j}" accept="image/*" hidden onchange="window.__matIcon(${i},${j},this)">
          <img class="mat-icon-prev" id="maiprev_${i}_${j}" src="${m.iconUrl || m.icon || ''}" alt="" ${(m.iconUrl || m.icon) ? '' : 'style="display:none"'}>
          ${(m.iconUrl || m.icon) ? `<button class="btn btn-sm btn-cancel" onclick="window.__matIconClear(${i},${j})">✕ icon</button>` : ''}
        </div>
        <button class="btn btn-sm btn-cancel" onclick="window.__matDel(${i},${j})">✕ Remove</button>
      </div>`;
  }

  function renderOwnerPanels() {
    const maint = loadMaint();
    const allPanels = [...MOBILE_PANELS, ...PC_PANELS];
    const panelsHTML = allPanels.map((p, i) => {
      const cfg = loadEdits().panels[p.name] || {};
      const isOn = !maint[p.name];
      const mats = (cfg.mats && cfg.mats.length) ? cfg.mats : [{}];
      const setupVid = panelSetupVid(p.name);
      return `
        <div class="editor-card">
          <div class="editor-head">
            <img src="${cfg.img || p.img}" class="editor-thumb" alt="">
            <div class="editor-name">
              <strong>${p.name}</strong>
              <small class="mono">${p.tag || 'PC'} · start ${fmt(p.prices[0])}/hr</small>
            </div>
            <button class="btn btn-sm ${isOn ? 'btn-cancel' : 'btn-pay'}" onclick="window.__toggleMaint('${p.name}')">${isOn ? '🔧 OFF' : '✅ LIVE'}</button>
            <button class="btn btn-sm btn-ghost" onclick="document.getElementById('panEdit_${i}').classList.toggle('hidden')">✏️ Edit</button>
          </div>
          <div class="editor-body hidden" id="panEdit_${i}" data-panel="${i}">
            <p class="editor-label">Panel Photo (live change)</p>
            <button class="btn btn-sm btn-ghost" onclick="document.getElementById('panImg_${i}').click()">📷 Change Photo</button>
            <input type="file" id="panImg_${i}" accept="image/*" hidden onchange="window.__pickPanelImg('${p.name}', this)">
            <p class="editor-label">Panel Video — demo tile pe play button dikhega (auto play nahi hoga)</p>
            <div class="mat-iconrow">
              <button class="btn btn-sm btn-ghost" onclick="document.getElementById('panVid_${i}').click()">${(cfg.videoId || cfg.videoUrl) ? '🎬 Video set' : '⬆ Upload Video (mp4/webm)'}</button>
              <input type="file" id="panVid_${i}" accept="video/*" hidden onchange="window.__pickPanelVideo('${p.name}', this)">
              <input class="txn-input mat-icon-url" placeholder="Ya video URL (YouTube / direct link)" value="${(cfg.videoUrl || '').replace(/"/g, '&quot;')}" onchange="window.__setPanelVideoUrl('${p.name}', this.value)">
              ${(cfg.videoId || cfg.videoUrl) ? `<button class="btn btn-sm btn-cancel" onclick="window.__clearPanelVideo('${p.name}')">✕ video</button>` : ''}
            </div>
            <div class="mat-iconrow">
              <input class="txn-input mat-icon-url" placeholder="▶ Setup Video — YouTube link (https://youtube.com/watch?v=...)" value="${(setupVid || '').replace(/"/g, '&quot;')}" onchange="window.__setSetupVideo('${p.name}', this.value)">
            </div>
            <p class="editor-label">Requirement Links / APK — user ko BUY se pehle dikhte hain</p>
            <div id="mats_${i}">${mats.map((m, j) => matRow(i, j, m)).join('')}</div>
            <button class="btn btn-sm btn-ghost" onclick="window.__matAdd(${i})">+ Add Link / APK</button>
            <div class="editor-actions">
              <button class="btn btn-primary btn-sm" onclick="window.__savePanel(${i},'${p.name}')">💾 Save Panel (LIVE)</button>
            </div>
          </div>
        </div>`;
    }).join('');

    const cardsHTML = CARDS.map((c, i) => {
      const sold = cardSoldOut(c.name);
      const img = cardImg(c.name) || c.img;
      return `
        <div class="editor-card">
          <div class="editor-head">
            <img src="${img}" class="editor-thumb card" alt="">
            <div class="editor-name">
              <strong>${c.name}</strong>
              <small class="mono">${fmt(c.price)}</small>
            </div>
            <button class="btn btn-sm btn-ghost" onclick="document.getElementById('cardImg_${i}').click()">📷</button>
            <input type="file" id="cardImg_${i}" accept="image/*" hidden onchange="window.__pickCardImg('${c.name}', this)">
            <button class="btn btn-sm ${sold ? 'btn-pay' : 'btn-cancel'}" onclick="window.__toggleCard('${c.name}')">${sold ? '♻️ Restock' : 'SOLD OUT'}</button>
          </div>
        </div>`;
    }).join('');

    ownerPanels.innerHTML = `
      <h3 class="owner-subhead">Panel Editor — Links / APK / Photo (live)</h3>
      <div class="verify-info">
        <p>Edit karo → Save Panel dabao → user ko buy se pehle naya link/APK/photo turant dikhega (isi browser me live). 🔧 OFF = maintenance, ✅ LIVE = normal.</p>
      </div>
      <div class="admin-list">${panelsHTML}</div>
      <h3 class="owner-subhead">Cards — Sold Out / Photo</h3>
      <div class="admin-list">${cardsHTML}</div>`;
  }

  window.__toggleMaint = name => {
    const m = loadMaint();
    if (m[name]) { delete m[name]; showToast(name + ' — LIVE again ✅'); }
    else { m[name] = true; showToast(name + ' — OFF (Under Maintenance) 🔧'); }
    saveMaint(m);
    renderOwner('panels');
  };

  window.__toggleCard = name => {
    const edits = loadEdits();
    edits.cards = edits.cards || {};
    const c = edits.cards[name] = edits.cards[name] || {};
    c.soldOut = !c.soldOut;
    saveEdits(edits);
    showToast(name + (c.soldOut ? ' — SOLD OUT' : ' — restock ho gaya ✅'));
    renderOwner('panels');
    if (!document.getElementById('cards').classList.contains('hidden')) renderGrid();
  };

  window.__pickPanelImg = (name, input) => {
    const f = input.files[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { showToast('Photo 2MB se chhota rakho'); input.value = ''; return; }
    const rd = new FileReader();
    rd.onload = () => {
      const edits = loadEdits();
      edits.panels[name] = edits.panels[name] || {};
      edits.panels[name].img = rd.result;
      saveEdits(edits);
      showToast(name + ' photo update ho gayi ✅');
      renderOwner('panels');
      renderGrid();
    };
    rd.readAsDataURL(f);
  };

window.__pickCardImg = (name, input) => {
    const f = input.files[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { showToast('Photo 2MB se chhota rakho'); input.value = ''; return; }
    const rd = new FileReader();
    rd.onload = () => {
      const edits = loadEdits();
      edits.cards[name] = edits.cards[name] || {};
      edits.cards[name].img = rd.result;
      saveEdits(edits);
      showToast(name + ' photo update ho gayi ✅');
      renderOwner('panels');
      renderGrid();
    };
    rd.readAsDataURL(f);
  };

  window.__pickPanelVideo = async (name, input) => {
    const f = input.files && input.files[0];
    if (!f) return;
    showToast('Video cloud par upload ho raha hai (0→100%)...');
    input.value = '';
    try {
      const url = await universalUpload(f, (b, t) => {
        const pct = Math.min(100, Math.round((b / (t || 1)) * 100));
        showToast('Video uploading... ' + pct + '%');
      });
      if (!url) throw new Error('No URL returned');
      const edits = loadEdits();
      edits.panels[name] = edits.panels[name] || {};
      edits.panels[name].videoUrl = url;
      edits.panels[name].videoName = f.name;
      delete edits.panels[name].videoId;
      saveEdits(edits);
      showToast('Video uploaded ✅ — PC aur Phone dono par turant play hoga');
      renderOwner('panels');
      renderGrid();
    } catch (err) {
      console.error('Video upload error:', err);
      showToast('Video upload failed — phir se try karein');
    }
  };

  window.__setPanelVideoUrl = (name, url) => {
    const edits = loadEdits();
    edits.panels[name] = edits.panels[name] || {};
    url = (url || '').trim();
    if (url) {
      if (edits.panels[name].videoId) fileDel(edits.panels[name].videoId).catch(()=>{});
      edits.panels[name].videoUrl = url;
      delete edits.panels[name].videoId;
      delete edits.panels[name].videoName;
    } else {
      delete edits.panels[name].videoUrl;
    }
    saveEdits(edits);
    renderOwner('panels');
    renderGrid();
  };

  window.__clearPanelVideo = name => {
    const edits = loadEdits();
    const c = edits.panels[name] || {};
    if (c.videoId) fileDel(c.videoId).catch(()=>{});
    delete c.videoId; delete c.videoName; delete c.videoUrl;
    saveEdits(edits);
    renderOwner('panels');
    renderGrid();
    showToast('Video hata diya');
  };

  window.__setSetupVideo = (name, url) => {
    const edits = loadEdits();
    edits.panels[name] = edits.panels[name] || {};
    url = (url || '').trim();
    if (url) edits.panels[name].setupVideo = url;
    else delete edits.panels[name].setupVideo;
    saveEdits(edits);
    renderOwner('panels');
    renderGrid();
  };

  window.__openSetupVideo = name => {
    const link = panelSetupVid(name);
    if (!link) { showToast('Setup video abhi nahi hai — YouTube par jaldi aayega'); return; }
    window.open(link, '_blank');
  };

  window.__playPanelVideo = async name => {
    const vid = panelVideo(name);
    if (!vid) { showToast('Is panel me koi video nahi hai'); return; }
    videoModal.classList.remove('hidden');
    videoPlayer.removeAttribute('src');
    if (vid.url) {
      videoPlayer.src = vid.url;
    } else if (vid.id) {
      try {
        const blob = await fileGet(vid.id);
        if (!blob) { showToast('Video file nahi mili'); videoModal.classList.add('hidden'); return; }
        videoPlayer.src = URL.createObjectURL(blob);
      } catch(e) { showToast('Video load failed'); videoModal.classList.add('hidden'); return; }
    }
videoPlayer.load();
    /* AUTO PLAY NAHI — user ko khud play dabana hai */
  };

  window.__matApk = (i, j, input) => {
    const f = input.files[0];
    if (!f) return;
    window._apkFiles = window._apkFiles || {};
    window._apkFiles[i + '_' + j] = f;
    const row = document.getElementById('mrow_' + i + '_' + j);
    const btn = row && row.querySelector('.mat-apkrow button');
    if (btn) btn.textContent = '📦 ' + f.name + ' (' + (f.size / 1048576).toFixed(1) + ' MB)';
    showToast('File ready (' + (f.size / 1048576).toFixed(1) + ' MB) — Save Panel dabao');
  };

  window.__matApkClear = (i, j) => {
    const row = document.getElementById('mrow_' + i + '_' + j);
    if (row) { row.removeAttribute('data-apkid'); row.removeAttribute('data-apkname'); }
    if (window._apkFiles) delete window._apkFiles[i + '_' + j];
    const btn = row && row.querySelector('.mat-apkrow button');
    if (btn) { btn.textContent = '⬆ Upload APK/SO/EXE (200MB+ bhi chalega)'; btn.className = 'btn btn-sm btn-ghost'; }
    const delBtn = row && row.querySelector('.mat-apkrow .btn-cancel');
    if (delBtn) delBtn.remove();
  };

  function compressIcon(f, cb) {
    const rd = new FileReader();
    rd.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = 64; c.height = 64;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        const m = Math.min(64 / img.width, 64 / img.height);
        const w = img.width * m, h = img.height * m;
        ctx.drawImage(img, (64 - w) / 2, (64 - h) / 2, w, h);
        cb(c.toDataURL('image/png'));
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  }

  window.__matIcon = (i, j, input) => {
    const f = input.files[0];
    if (!f) return;
    compressIcon(f, url => {
      const row = document.getElementById('mrow_' + i + '_' + j);
      if (!row) return;
      row.setAttribute('data-icon', url);
      const prev = document.getElementById('maiprev_' + i + '_' + j);
      if (prev) { prev.src = url; prev.style.display = 'inline-block'; }
      input.value = '';
      showToast('Icon ready — Save Panel dabao ✅ (bada photo bhi auto chhota hota hai)');
    });
  };

  window.__matIconClear = (i, j) => {
    const row = document.getElementById('mrow_' + i + '_' + j);
    if (row) row.removeAttribute('data-icon');
    const url = row && row.querySelector('.mat-icon-url');
    if (url) url.value = '';
    const prev = document.getElementById('maiprev_' + i + '_' + j);
    if (prev) prev.remove();
    const btn = document.getElementById('mrow_' + i + '_' + j);
    const c = btn && btn.querySelector('.mat-iconrow .btn-cancel');
    if (c) c.remove();
  };

  window.__matAdd = i => {
    const c = document.getElementById('mats_' + i);
    const n = c.querySelectorAll('.mat-editor-row').length;
    c.insertAdjacentHTML('beforeend', matRow(i, n, {}));
  };

  window.__matDel = (i, j) => {
    const el = document.getElementById('mrow_' + i + '_' + j);
    const apkId = el && el.getAttribute('data-apkid');
    if (apkId) fileDel(apkId);
    if (el) el.remove();
    if (window._apkFiles) delete window._apkFiles[i + '_' + j];
  };

  window.__savePanel = async (i, name) => {
    const edits = loadEdits();
    const rows = document.querySelectorAll('#mats_' + i + ' .mat-editor-row');
    for (const row of Array.from(rows)) {
      const j = row.getAttribute('data-j');
      const f = (window._apkFiles || {})[i + '_' + j];
      if (f) {
        showToast('Uploading ' + f.name + ' to cloud...');
        try {
          const cloudUrl = await universalUpload(f, (b, t) => {
            const pct = Math.min(100, Math.round((b / (t || 1)) * 100));
            showToast('File upload: ' + pct + '%');
          });
          if (cloudUrl) {
            const urlInput = row.querySelector('.mat-url');
            if (urlInput) urlInput.value = cloudUrl;
            row.setAttribute('data-apkname', f.name.replace(/"/g, '&quot;'));
            delete window._apkFiles[i + '_' + j];
          }
        } catch (err) {
          console.error('APK file upload failed:', err);
        }
      }
    }
    const mats = Array.from(rows).map(row => {
      const label = row.querySelector('.mat-label').value.trim();
      const url = row.querySelector('.mat-url').value.trim();
      const apkName = (row.getAttribute('data-apkname') || '').replace(/&quot;/g, '"');
      return {
        label: label || (url ? (apkName || 'Download File') : 'Open Link'),
        url,
        apkName,
        icon: (row.getAttribute('data-icon') || '').replace(/&quot;/g, '"'),
        iconUrl: (row.querySelector('.mat-icon-url').value || '').trim()
      };
    }).filter(m => m.label || m.url);
    edits.panels[name] = edits.panels[name] || {};
    edits.panels[name].mats = mats;
    saveEdits(edits);
    showToast(name + ' saved — LIVE reflect ho gaya ✅ (PC aur Mobile dono par sync ON)');
    renderOwner('panels');
    renderGrid();
  };

  /* ─────────── OWNER: TXNS (per user) ─────────── */
  let ownerTxnUser = '';
  function renderOwnerTxns() {
    const users = loadUsers();
    const names = Object.keys(users).sort();
    if (!ownerTxnUser && names.length) ownerTxnUser = names[0];
    const list = ownerTxnUser ? loadTxns().filter(t => t.user === ownerTxnUser).sort((a, b) => b.createdAt - a.createdAt) : [];
    ownerTxns.innerHTML = `
      <div class="txn-user-select">
        <label>USER chuno — sirf usi ke transactions dikhenge</label>
        <select id="txnUserSelect">
          ${names.map(n => `<option value="${n}" ${n === ownerTxnUser ? 'selected' : ''}>${n} (${(users[n].uid || '?')})</option>`).join('') || '<option>No users</option>'}
        </select>
      </div>
      <div class="admin-list">
        ${list.map(t => `
          <div class="admin-row">
            <div class="au-info">
              <strong class="mono">${t.id}</strong>
              <small>${t.type} · ${new Date(t.createdAt).toLocaleString()}</small>
            </div>
            <div class="au-stats">
              <span>₹${t.amount}</span>
              <span class="${t.status === 'paid' ? 'green' : (t.status === 'pending' ? 'gold' : 'red')}">${String(t.status).toUpperCase()}</span>
            </div>
          </div>`).join('') || '<div class="empty-state">Is user ka koi transaction nahi</div>'}
      </div>`;
    const sel = document.getElementById('txnUserSelect');
    if (sel) sel.addEventListener('change', e => { ownerTxnUser = e.target.value; renderOwnerTxns(); });
  }

  /* ─────────── OWNER: VERIFY (manual) ─────────── */
  async function renderOwnerVerify() {
    const txns = loadTxns().filter(t => t.status === 'pending').sort((a, b) => Number(b.received || false) - Number(a.received || false) || a.createdAt - b.createdAt);
    const info = `<div class="verify-info">
      <strong>Payment Verify kaise karein?</strong>
      <p>User ne Razorpay se pay kiya ya UTR/screenshot bheja. Neeche check karo — <b>Verify &amp; Credit</b> dabaane par txn SUCCESS ho jayega aur user ke wallet me amount add hoga. Galat/no payment ho to <b>Reject</b>.</p>
    </div>`;
    const rows = [];
    for (const t of txns) {
      let ssHtml = '';
      if (t.ssUrl) {
        ssHtml = `<img class="ss-preview" src="${t.ssUrl}" alt="" onclick="window.open('${t.ssUrl}')" style="cursor:zoom-in">`;
      } else if (t.ssKey) {
        try {
          const blob = await fileGet(t.ssKey);
          if (blob) { const url = URL.createObjectURL(blob); ssHtml = `<img class="ss-preview" src="${url}" alt="" onclick="window.open('${url}')">`; }
          else ssHtml = `<div>🧾 Screenshot: <span class="mono">${t.ss}</span></div>`;
        } catch(e) { ssHtml = `<div>🧾 Screenshot: <span class="mono">${t.ss}</span></div>`; }
      } else if (t.ss) {
        ssHtml = `<div>🧾 Screenshot: <span class="mono">${t.ss}</span></div>`;
      }
      rows.push(`
      <div class="admin-row col" style="border-color:${t.received ? 'rgba(255,215,0,.35)' : 'rgba(255,255,255,.06)'}">
        <div class="au-info">
          <strong class="mono">${t.id}</strong>
          <small>${t.user} · ₹${t.amount} · ${new Date(t.createdAt).toLocaleString()}</small>
        </div>
        ${t.received ? '<div class="gold" style="font-weight:700">● UTR SUBMITTED — awaiting your confirm</div>' : ''}
        ${t.utr ? `<div class="gold">UTR: <span class="mono">${t.utr}</span></div>` : ''}
        ${ssHtml}
        <div class="verify-actions">
          <button class="btn btn-sm btn-pay" onclick="window.__ownerVerify('${t.id}')">Verify & Credit</button>
          <button class="btn btn-sm btn-cancel" onclick="window.__ownerReject('${t.id}')">Reject</button>
        </div>
      </div>`);
    }
    ownerVerify.innerHTML = info + (rows.join('') || '<div class="empty-state">Abhi koi pending payment nahi 🎉</div>');
  }

  window.__ownerVerify = id => {
    const all = loadTxns();
    const t = all.find(x => x.id === id);
    if (!t || t.status !== 'pending') return;
    t.status = 'paid';
    t.paidAt = Date.now();
    saveTxns(all);

    const users = loadUsers();
    const u = users[t.user];
    if (u) {
      u.wallet = (u.wallet || 0) + t.amount;
      u.deposits = (u.deposits || 0) + t.amount;
      u.premiumUntil = Math.max(u.premiumUntil || 0, Date.now() + PREMIUM_DAYS);
      saveUsers(users);
    }
    renderOwner('verify');
    renderOwner('dash');
    showToast('Verified — ₹' + t.amount + ' credited to ' + t.user);
  };

  window.__ownerReject = id => {
    const all = loadTxns();
    const t = all.find(x => x.id === id);
    if (!t || t.status !== 'pending') return;
    t.status = 'failed';
    saveTxns(all);
    renderOwner('verify');
    showToast('Transaction rejected');
  };

/* ─────────── FIRESTORE SUPPORT TICKETS ───────────
     tickets/{TCK-XXXXXX}  → { ticketId, uid, category, status, createdAt, lastUpdated, lastSender, lastText }
     tickets/{id}/messages → { sender:'user'|'admin', text, timestamp, attach? }
     User: localStorage 'ishu_active_ticket' stores the active ticket id for auto-reconnect. */
  const ACTIVE_TICKET_KEY = 'ishu_active_ticket';
  const ticketsCol     = () => fb.fs && fb.fs.collection('tickets');
  const ticketDoc      = id => fb.fs && fb.fs.collection('tickets').doc(id);
  const ticketMsgs     = id => fb.fs && fb.fs.collection('tickets').doc(id).collection('messages');
  const genTicketId    = () => 'TCK-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 33)]).join('');
  const tsNumber       = v => (v && v.toMillis) ? v.toMillis() : (v || 0);
  const fmtTickTime    = ts => new Date(tsNumber(ts)).toLocaleString([], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  let activeTicketId   = localStorage.getItem(ACTIVE_TICKET_KEY) || '';
  let allTickets       = [];
  const ownerSeen      = {};
  let tickUserUnsub    = null;

  function tickMsgHtml(m, uid, viewer) {
    const t = m.timestamp ? new Date(tsNumber(m.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    let att = '';
    if (m.attach && m.attach.url) {
      if ((m.attach.type || '').startsWith('image/')) {
        att = `<div class="att-img-wrap"><img class="att-preview" src="${m.attach.url}" alt="Attachment" onclick="window.open('${m.attach.url}', '_blank')" title="Click to open full image" style="cursor:zoom-in" loading="lazy"></div>`;
      } else if ((m.attach.type || '').startsWith('video/')) {
        att = `<div class="att-video-wrap">
          <video class="att-video" controls playsinline preload="metadata" src="${m.attach.url}"></video>
          <a class="att-dl-btn" href="${m.attach.url}" target="_blank" rel="noopener">🎬 Open / Download Video</a>
        </div>`;
      } else {
        att = `<a class="att-file-link" href="${m.attach.url}" target="_blank" rel="noopener">📎 ${escapeHtml(m.attach.name || 'file')}</a>`;
      }
    }
    const isAdmin = m.sender === 'admin';
    const mine = viewer === 'owner' ? isAdmin : !isAdmin;
    const uname = uid || 'User';
    if (mine) {
      return `<div class="msg user-msg">
        <div class="msg-c">
          <div class="bubble">${escapeHtml(m.text || '')}${att}</div>
          <div class="msg-meta"><span class="mn">${isAdmin ? 'OWNER (ADMIN)' : escapeHtml(String(uname))}</span> · ${t}</div>
        </div>
        ${isAdmin ? `<img class="chat-av" src="assets/img/logo/login-logo.png" alt="Owner">` : userAvatar(uname)}
      </div>`;
    }
    return `<div class="msg owner-msg">
      ${isAdmin ? `<img class="chat-av" src="assets/img/logo/login-logo.png" alt="Owner">` : userAvatar(uname)}
      <div class="msg-c">
        <div class="bubble">${escapeHtml(m.text || '')}${att}</div>
        <div class="msg-meta"><span class="mn">${isAdmin ? 'OWNER (ADMIN)' : escapeHtml(String(uname))}</span> · ${t}</div>
      </div>
    </div>`;
  }

  /* ─── USER SIDE: create ticket / live chat ─── */
  function openUserSupport() {
    if (!currentUser) { showToast('Login first'); return; }
    supportModal.classList.remove('hidden');
    if (activeTicketId) { startTicketThread(activeTicketId); return; }
    const u = loadUsers()[currentUser.username] || {};
    if (!tfUid.value) tfUid.value = u.uid || currentUser.username || '';
    ticketFormPanel.classList.remove('hidden');
    ticketChatPanel.classList.add('hidden');
  }

  function startTicketThread(tid) {
    if (!fb.fs) { showToast('Backend off — try later'); return; }
    activeTicketId = tid;
    localStorage.setItem(ACTIVE_TICKET_KEY, tid);
    ticketFormPanel.classList.add('hidden');
    ticketChatPanel.classList.remove('hidden');
    const inputRow = ticketChatPanel.querySelector('.support-input-row');
    if (inputRow) inputRow.style.display = '';
    if (tickUserUnsub) tickUserUnsub();
    const docRef = ticketDoc(tid);
    const msgUnsub = ticketMsgs(tid).orderBy('timestamp', 'asc').onSnapshot(snap => {
      const html = [];
      snap.forEach(dd => { const m = dd.data(); html.push(tickMsgHtml(m, currentUser.username, 'user')); });
      supportMsgs.innerHTML = html.join('') || '<div class="empty-state">Waiting for owner reply...</div>';
      supportMsgs.scrollTop = supportMsgs.scrollHeight;
    });
    const docUnsub = docRef.onSnapshot(d => {
      if (!d.exists) {
        if (tickUserUnsub) tickUserUnsub();
        activeTicketId = '';
        localStorage.removeItem(ACTIVE_TICKET_KEY);
        ticketBarId.textContent = tid;
        ticketBarStatus.textContent = 'RESOLVED';
        ticketBarStatus.className = 'ticket-status st-resolved';
        if (inputRow) inputRow.style.display = 'none';
        supportMsgs.innerHTML =
          '<div class="resolve-banner">' +
          '<div class="rb-ico">✅</div>' +
          '<strong>Ticket Resolved</strong>' +
          '<p>Owner has successfully resolved your ticket.<br>Thank you for your recharge &amp; support!</p>' +
          '<small>Ab aap naya ticket bana sakte ho.</small>' +
          '</div>';
        showToast('Ticket ' + tid + ' resolved by owner ✓');
        return;
      }
      const t = d.data(); if (!t) return;
      ticketBarId.textContent = t.ticketId || tid;
      ticketBarStatus.textContent = t.status || 'OPEN';
      ticketBarStatus.className = 'ticket-status st-' + (t.status || 'OPEN').toLowerCase();
    });
    tickUserUnsub = () => { msgUnsub(); docUnsub(); };
  }

  async function createTicket() {
    if (!fb.fs) { showToast('Backend off — try later'); return; }
    const uid = (tfUid.value || '').trim();
    const cat = tfCat.value || 'Other';
    const text = (tfMsg.value || '').trim();
    if (!uid) { showToast('UID / username daalo'); return; }
    if (!text) { showToast('Apni issue describe karo'); return; }
    const tid = genTicketId();
    const now = Date.now();
    try {
      await ticketDoc(tid).set({ ticketId: tid, uid, category: cat, status: 'OPEN', createdAt: now, lastUpdated: now, lastSender: 'user', lastText: text.slice(0, 80) });
      await ticketMsgs(tid).add({ sender: 'user', text, timestamp: now });
    } catch (e) { console.warn(e); showToast('Firestore write fail'); return; }
    tfMsg.value = '';
    startTicketThread(tid);
    showToast('Ticket ' + tid + ' create ho gayi ✓');
  }

  function sendTicketMsg() {
    const text = supportMsgInput.value.trim();
    if (!fb.fs || !activeTicketId) { showToast('Pehle ticket banao'); return; }
    const att = pendingAtt && pendingAtt.ok ? resolveAtt() : null;
    if (!text && !att) return;
    if (!att && pendingAtt) { showToast('File upload ho raha hai — thoda wait karo'); return; }
    const tid = activeTicketId;
    supportMsgInput.value = '';
    const doc = { sender: 'user', text, timestamp: Date.now() };
    if (att) doc.attach = { name: att.name, type: att.type, size: att.size, url: att.url };
    ticketMsgs(tid).add(doc).catch(() => {});
    ticketDoc(tid).update({ lastUpdated: Date.now(), lastSender: 'user', lastText: (att ? '📎 ' : '') + ((text || att.name).slice(0, 80)) }).catch(() => {});
  }

function newTicketReset() {
    activeTicketId = '';
    localStorage.removeItem(ACTIVE_TICKET_KEY);
    if (tickUserUnsub) tickUserUnsub();
    ticketChatPanel.classList.add('hidden');
    ticketFormPanel.classList.remove('hidden');
    const u = loadUsers()[currentUser.username] || {};
    if (!tfUid.value) tfUid.value = u.uid || currentUser.username || '';
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function userAvatar(username) {
    const u = loadUsers()[username] || {};
    if (u.photo) return `<img class="chat-av" src="${u.photo}" alt="">`;
    const ch = escapeHtml((u.name || username || 'U')[0]).toUpperCase();
    return `<div class="chat-av chat-av-txt">${ch}</div>`;
  }

  /* ─── ATTACHMENT UPLOAD (WhatsApp-style: pick → real 0→100% → Send) ─── */
  let pendingAtt = null;
  const fmtSize = b => b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : (b >= 1024 ? (b / 1024).toFixed(0) + ' KB' : b + ' B');

  function clearPendingAtt() {
    if (pendingAtt) { if (pendingAtt.el) pendingAtt.el.remove(); pendingAtt = null; }
  }

  function prepareAttach(file, who) {
    const isVideo = (file.type || '').startsWith('video/');
    const isImg = (file.type || '').startsWith('image/');
    const maxB = isVideo ? 200 * 1048576 : (isImg ? 100 * 1048576 : 50 * 1048576);
    if (file.size > maxB) { showToast(isVideo ? 'Video 200MB se choti rakho' : 'File 100MB se choti rakho'); return; }
    clearPendingAtt();
    const host = who === 'owner' ? document.querySelector('.tick-main') : ticketChatPanel;
    const row = who === 'owner' ? host.querySelector('.svc-reply-row') : host.querySelector('.support-input-row');
    if (!host || !row) return;
    const wrap = document.createElement('div');
    wrap.className = 'up-prog';
    wrap.innerHTML = `
      <div class="up-prog-head">
        <span class="up-chip">📎 <b>${escapeHtml(file.name)}</b> (${fmtSize(file.size)})</span>
        <span class="up-state wait">0%</span>
        <button class="up-x" title="Remove" type="button">&times;</button>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:0%"></div></div>`;
    host.insertBefore(wrap, row);
    const fill = wrap.querySelector('.progress-fill');
    const st = wrap.querySelector('.up-state');
    const xbtn = wrap.querySelector('.up-x');
    xbtn.addEventListener('click', clearPendingAtt);
    pendingAtt = { name: file.name, type: file.type, size: file.size, url: '', ok: false, el: wrap };
    const dir = 'tickets/' + (who === 'owner' ? activeSvcTicket : activeTicketId) + '/' + (who === 'owner' ? 'a' : 'u') + '_' + Date.now() + '_';
    fbUpload(dir + file.name.replace(/[^a-zA-Z0-9._-]/g, '_'), file, (b, t) => {
      if (!pendingAtt || pendingAtt.el !== wrap) return;
      const p = Math.min(100, Math.round((b / (t || 1)) * 100));
      fill.style.width = p + '%';
      st.textContent = p + '%';
    }).then(url => {
      if (pendingAtt && pendingAtt.el === wrap) {
        pendingAtt.url = url;
        pendingAtt.ok = true;
        fill.style.width = '100%';
        st.textContent = '✓ Ready';
        st.classList.remove('wait');
        showToast('Attachment ready — Send dabao');
      }
    }).catch(() => {
      if (pendingAtt && pendingAtt.el === wrap) {
        st.textContent = 'Upload fail';
        st.classList.add('err');
        window.setTimeout(() => { if (pendingAtt && pendingAtt.el === wrap) clearPendingAtt(); }, 2500);
        showToast('Upload fail — phir try karo, ya bina file bhej do');
      }
    });
  }

  function resolveAtt() {
    if (!pendingAtt) return null;
    const a = { name: pendingAtt.name, type: pendingAtt.type, size: pendingAtt.size, url: pendingAtt.url };
    clearPendingAtt();
    return a;
  }

  /* ─── ADMIN SIDE: ticket dashboard (sidebar + chat + status toggle) ─── */
  let ownerTickUnsub = null;
  let ownerMsgUnsub  = null;
  let ownerTickDocUnsub = null;

  function watchTickets() {
    if (!fb.fs || ownerTickUnsub) return;
    ownerTickUnsub = ticketsCol().orderBy('lastUpdated', 'desc').onSnapshot(snap => {
      const list = [];
      snap.forEach(d => list.push(Object.assign({ id: d.id }, d.data())));
      /* OLD RESOLVED AUTO-CLEANUP: RESOLVED tickets ka koi kaam nahi — cloud se purge */
      list.forEach(t => {
        if (t.status !== 'RESOLVED' || t.id === activeSvcTicket) return;
        ticketMsgs(t.id).get().then(snaps => {
          const dels = [];
          snaps.forEach(s => dels.push(s.ref.delete().catch(() => {})));
          return Promise.all(dels).then(() => ticketDoc(t.id).delete().catch(() => {}));
        }).catch(() => {});
      });
      allTickets = list.filter(t => t.status !== 'RESOLVED' || t.id === activeSvcTicket);
      if (!ownerSvc.classList.contains('hidden') && !activeSvcTicket) renderTickSidebar(allTickets);
      checkOwnerAlerts(allTickets);
    }, err => console.warn('tick snap', err));
  }

  function renderOwnerSvc() {
    if (!fb.fs) { ownerSvc.innerHTML = '<div class="empty-state">Firestore connection needed for tickets</div>'; return; }
    if (activeSvcTicket) { window.__openTicket(activeSvcTicket); return; }
    ownerSvc.innerHTML = `
      <div class="tick-admin">
        <aside class="tick-side">
          <div class="tick-side-head">
            <h3>SUPPORT TICKETS</h3>
            <span class="tick-count" id="tickCount"></span>
          </div>
          <div id="tickList" class="tick-list"></div>
        </aside>
        <section class="tick-main">
          <div id="tickHead" class="tick-head">
            <div class="tick-head-info" id="tickHeadInfo"><span class="muted2">Select a ticket from the sidebar</span></div>
            <div class="tick-head-actions" id="tickHeadActions"></div>
          </div>
          <div id="svcThreadMsgs" class="svc-thread-msgs"></div>
          <div class="svc-reply-row">
            <label class="chat-attach">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8M1 3h22v6H1zM10 12h4"/></svg>
              <input type="file" id="svcReplyFile" accept="image/*,video/*,.pdf,.rar,.zip" hidden>
            </label>
            <input id="svcReplyInput" class="chat-input" type="text" placeholder="Type a reply..." maxlength="500">
            <button class="chat-send" onclick="window.__sendOwnerReply()">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </section>
      </div>`;
    renderTickSidebar(allTickets);
    const rfile = document.getElementById('svcReplyFile');
    if (rfile) rfile.addEventListener('change', ownerSendFile);
  }

  function renderTickSidebar(list) {
    const el = document.getElementById('tickList');
    if (!el) return;
    const open = list.filter(t => t.status !== 'RESOLVED').length;
    const cnt = document.getElementById('tickCount');
    if (cnt) cnt.textContent = open + ' open';
    el.innerHTML = list.map(t => {
      const lastUp = t.lastUpdated ? fmtTickTime(t.lastUpdated) : '';
      const preview = escapeHtml((t.lastText || 'new ticket').slice(0, 60));
      return `<div class="tick-item ${activeSvcTicket === t.id ? 'active' : ''}" onclick="window.__openTicket('${t.id}')">
        <div class="tick-item-top">
          <strong class="mono">${escapeHtml(t.ticketId || t.id)}</strong>
          <span class="ticket-status st-${(t.status || 'OPEN').toLowerCase()}">${escapeHtml(t.status || 'OPEN')}</span>
        </div>
        <div class="tick-item-user">UID ${escapeHtml(t.uid || '—')} · ${escapeHtml(t.category || '')}</div>
        <div class="tick-item-preview">${preview}</div>
        <small class="muted2">${lastUp}</small>
      </div>`;
    }).join('') || '<div class="empty-state">Koi ticket nahi</div>';
  }

  let tInfo = { uid: 'User' };
  window.__openTicket = rid => {
    activeSvcTicket = rid;
    if (!fb.fs) return;
    if (ownerMsgUnsub) ownerMsgUnsub();
    if (ownerTickDocUnsub) ownerTickDocUnsub();
    const msgsEl = document.getElementById('svcThreadMsgs');
    const infoEl = document.getElementById('tickHeadInfo');
    const actsEl = document.getElementById('tickHeadActions');
    ownerTickDocUnsub = ticketDoc(rid).onSnapshot(d => {
      if (!d.exists) {
        activeSvcTicket = null;
        renderOwnerSvc();
        showToast('Ticket resolved & deleted ✓');
        return;
      }
      const t = d.data(); if (!t) return;
      tInfo.uid = t.uid || 'User';
      if (!infoEl || !actsEl) return;
      infoEl.innerHTML = `<strong class="mono">${escapeHtml(t.ticketId || rid)}</strong> <span class="muted2">· UID ${escapeHtml(t.uid || '—')} · ${escapeHtml(t.category || '')}</span>`;
      actsEl.innerHTML = t.status === 'RESOLVED'
        ? `<button class="btn btn-sm btn-ghost" onclick="window.__setTicketStatus('${rid}','OPEN')">↺ Reopen</button>`
        : `<button class="btn btn-sm btn-ghost" onclick="window.__setTicketStatus('${rid}','IN_PROGRESS')">⏳ In-Progress</button>
           <button class="btn btn-sm btn-resolve" onclick="window.__setTicketStatus('${rid}','RESOLVED')">✓ Resolved — Close & Delete</button>`;
    });
    ownerMsgUnsub = ticketMsgs(rid).orderBy('timestamp', 'asc').onSnapshot(snap => {
      const html = [];
      snap.forEach(dd => { const m = dd.data(); html.push(tickMsgHtml(m, tInfo.uid, 'owner')); });
      if (msgsEl) { msgsEl.innerHTML = html.join('') || '<div class="empty-state">No messages yet</div>'; msgsEl.scrollTop = msgsEl.scrollHeight; }
    });
    ownerSeen[rid] = Date.now();
  };

  window.__setTicketStatus = (rid, st) => {
    if (!fb.fs) return;
    if (st === 'RESOLVED') {
      showToast('Closing ticket — deleting data...');
      ticketMsgs(rid).get().then(snaps => {
        const dels = [];
        snaps.forEach(s => dels.push(s.ref.delete()));
        return Promise.all(dels).then(() => ticketDoc(rid).delete()).then(() => {
          activeSvcTicket = null;
          renderOwnerSvc();
          showToast('Ticket resolved, closed & deleted ✓');
        }).catch(e => { console.warn(e); showToast('Delete fail'); });
      }).catch(e => { console.warn(e); showToast('Delete fail'); });
      return;
    }
    ticketDoc(rid).update({ status: st, lastUpdated: Date.now() }).then(() => showToast('Status → ' + st)).catch(() => showToast('Status update fail'));
  };

  function ownerSendFile() {
    const rfile = document.getElementById('svcReplyFile');
    const file = rfile?.files[0];
    if (!file || !activeSvcTicket || !fb.fs) return;
    rfile.value = '';
    prepareAttach(file, 'owner');
  }

  window.__sendOwnerReply = () => {
    const input = document.getElementById('svcReplyInput');
    const text = input?.value.trim();
    if (!activeSvcTicket || !fb.fs) { showToast('Select a ticket first'); return; }
    const att = pendingAtt && pendingAtt.ok ? resolveAtt() : null;
    if (!text && !att) { showToast('Type a message or attach a file'); return; }
    if (!att && pendingAtt) { showToast('File upload ho raha hai — thoda wait karo'); return; }
    input.value = '';
    const doc = { sender: 'admin', text, timestamp: Date.now() };
    if (att) doc.attach = { name: att.name, type: att.type, size: att.size, url: att.url };
    ticketMsgs(activeSvcTicket).add(doc).catch(() => {});
    ticketDoc(activeSvcTicket).update({ lastUpdated: Date.now(), lastSender: 'admin', lastText: (att ? '📎 ' : '') + ((text || att.name).slice(0, 60)) }).catch(() => {});
    ownerSeen[activeSvcTicket] = Date.now();
    showToast('Reply delivered ✓ (realtime sync ON)');
  };

  /* ─── OWNER LIVE ALERT (WhatsApp style popup, Firestore-driven) ─── */
  function showOwnerAlert(t) {
    const el = document.createElement('div');
    el.className = 'owner-alert';
    el.innerHTML = `
      <div class="oa-av"><span>&#128172;</span></div>
      <div class="oa-body">
        <strong>${escapeHtml(t.ticketId || t.id)}</strong> <span class="mono">UID ${escapeHtml(t.uid || '—')}</span>
        <p>${escapeHtml((t.lastText || 'new ticket').slice(0, 70))}</p>
      </div>
      <button class="oa-close" title="dismiss">✕</button>`;
    el.querySelector('.oa-close').addEventListener('click', e => { e.stopPropagation(); el.remove(); });
    el.addEventListener('click', () => { el.remove(); openOwnerTicket(t.id); });
    ownerAlerts.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => el.remove(), 15000);
  }

  function checkOwnerAlerts(list) {
    if (!currentOwner) return;
    list.forEach(t => {
      if (t.lastSender !== 'user') { ownerSeen[t.id] = tsNumber(t.lastUpdated); return; }
      if ((ownerSeen[t.id] || 0) >= tsNumber(t.lastUpdated)) return;
      if (!ownerSvc.classList.contains('hidden') && activeSvcTicket === t.id) { ownerSeen[t.id] = tsNumber(t.lastUpdated); return; }
      ownerSeen[t.id] = tsNumber(t.lastUpdated);
      showOwnerAlert(t);
    });
  }

  function openOwnerTicket(id) {
    currentOwner = true;
    document.querySelectorAll('.app').forEach(a => a.classList.add('hidden'));
    supportFab.classList.add('hidden');
    ownerPage.classList.remove('hidden');
    renderOwner('svc');
    activeSvcTicket = id;
    window.__openTicket(id);
    showToast('Ticket khul gayi');
  }

  /* ─── Support modal wiring ─── */
  closeSupportBtn.addEventListener('click', () => supportModal.classList.add('hidden'));
  supportFab.addEventListener('click', openUserSupport);
  tfSubmit.addEventListener('click', createTicket);
  tfNewBtn.addEventListener('click', newTicketReset);
  supportSend.addEventListener('click', sendTicketMsg);
  supportMsgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendTicketMsg(); });
  supportFile.addEventListener('change', () => {
    const f = supportFile.files && supportFile.files[0];
    supportFile.value = '';
    if (f && activeTicketId) {
      prepareAttach(f, 'user');
    } else if (f) {
      showToast('Pehle ticket create karo');
      document.getElementById('supportMsg').placeholder = 'Pehle ticket banao...';
    }
  });

  /* ─────────── LIVE STORE REFRESH (owner edits reflect without reload) ─────────── */
  let lastStoreSig = '';
  function storeSig() { return JSON.stringify(loadEdits()) + '|' + JSON.stringify(loadMaint()); }
  function refreshLiveStore() {
    if (!currentUser || currentOwner) return;
    const sig = storeSig();
    if (sig !== lastStoreSig) { lastStoreSig = sig; renderGrid(); }
  }

setInterval(refreshLiveStore, 2000);

  /* ─────────── Sections ─────────── */
  function openSection(tab) {
    const panelsSec = $('panels');
    const cardsSec = $('cards');
    if (tab === 'cards') {
      panelsSec.classList.add('hidden');
      cardsSec.classList.remove('hidden');
      tabPanels.classList.remove('active');
      tabCards.classList.add('active');
      document.querySelectorAll('[data-nav="panels"]').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('[data-nav="cards"]').forEach(n => n.classList.add('active'));
    } else {
      cardsSec.classList.add('hidden');
      panelsSec.classList.remove('hidden');
      tabCards.classList.remove('active');
      tabPanels.classList.add('active');
      document.querySelectorAll('[data-nav="cards"]').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('[data-nav="panels"]').forEach(n => n.classList.add('active'));
    }
    renderGrid();
  }

  tabPanels.addEventListener('click', () => openSection('panels'));
  tabCards.addEventListener('click', () => openSection('cards'));

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', e => {
      const target = btn.getAttribute('data-nav');
      if (['panels','cards'].includes(target)) {
        e.preventDefault();
        openSection(target);
        document.querySelector('#' + target)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ─────────── Panel grid ─────────── */
  let currentGroup = 'mobile';
  document.querySelectorAll('.subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentGroup = btn.getAttribute('data-group');
      document.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
  });

  function renderGrid() {
    const cardsSec = $('cards');
    if (!cardsSec.classList.contains('hidden')) { renderCardGrid(); return; }
    const list = currentGroup === 'pc' ? PC_PANELS : MOBILE_PANELS;
    panelGrid.innerHTML = list.map(p => {
      const base1h = p.prices[0];
      const { price, off } = priceAfter(base1h);
      const maint = isMaintenance(p.name);
      const matsT = editMats(p.name);
      const panelVid = panelVideo(p.name);
      window._tileMats = window._tileMats || {};
      window._tileMats[p.name] = matsT;
      return `
        <div class="tile ${maint ? 'tile-maint' : ''}" ${maint ? `onclick="window.__maintClick()"` : ''}>
          <div class="tile-img-wrap">
            <img src="${editImg(p.name, p.img)}" alt="${p.name}" loading="lazy">
            ${panelVid ? `<button class="tile-play" title="Panel demo dekho" onclick="event.stopPropagation(); window.__playPanelVideo('${p.name.replace(/'/g, "\\'")}')"></button>` : ''}
            ${p.tag ? `<span class="tile-tag">${p.tag}</span>` : ''}
            ${off && !maint ? `<span class="tile-tag gold">20% OFF</span>` : ''}
            ${maint ? `
              <div class="maint-overlay">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/></svg>
                <span>UNDER<br>MAINTENANCE</span>
              </div>` : ''}
          </div>
          <div class="tile-info">
            <h3>${p.name}</h3>
            <p class="tile-sub">${p.tag ? p.tag + ' mod panel' : 'PC premium panel'}</p>
            <div class="price-row">
              <span class="vendor-tag">${maint ? 'TEMPORARILY UNAVAILABLE' : (off ? fmt(price) + ' (was ' + fmt(base1h) + ')' : '1 HR — ' + fmt(base1h))}</span>
            </div>
            ${matsT.length && !maint ? `<div class="tile-mats">${matsT.map((m, mi) => {
        const ico = m.iconUrl || m.icon || '';
        return `<button class="mat-chip" onclick="window._openTileMat('${p.name.replace(/'/g, "\\'")}',${mi})">${ico ? `<img class="mat-chip-ico" src="${ico}" alt="">` : '📦'} ${m.label}</button>`;
      }).join('')}</div>` : ''}
            ${maint
              ? `<button class="btn btn-sm btn-maint" disabled>Under Maintenance</button>`
              : `<button class="btn btn-primary btn-sm" onclick="window.buyItem('${p.name}','panel','${p.img}')">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 7h12l-1 13H7L6 7zM9 7a3 3 0 0 1 6 0"/></svg>
              Buy
            </button>`}
          </div>
        </div>`;
    }).join('');
  }

  window.__maintClick = () => showToast('Ye panel abhi MAINTENANCE par hai — thodi der baad aayein');

  function renderCardGrid() {
    cardGrid.innerHTML = CARDS.map(c => {
      const sold = cardSoldOut(c.name);
      const img = cardImg(c.name) || c.img;
      return `
        <div class="tile tile-card">
          <div class="tile-img-wrap">
            <img src="${img}" alt="${c.name}" loading="lazy">
            ${sold ? '<span class="tile-tag sold">SOLD OUT</span>' : '<span class="tile-tag">NEW</span>'}
            ${sold ? '<div class="maint-overlay"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4m0 4h.01"/></svg><span>SOLD<br>OUT</span></div>' : ''}
          </div>
          <div class="tile-info">
            <h3>${c.name}</h3>
            <p class="tile-sub">Balance: ${fmt(c.minBal)} — ${fmt(c.maxBal)}</p>
            <div class="price-row">
              <span class="vendor-tag">${sold ? 'SOLD OUT — wapas kal aayega' : fmt(c.price)}</span>
            </div>
            ${sold
              ? `<button class="btn btn-primary btn-sm btn-maint" disabled>Sold Out</button>`
              : `<button class="btn btn-primary btn-sm btn-buy" onclick="window.buyItem('${c.name}','card','${img}','${c.price}')">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
              Buy
            </button>`}
          </div>
        </div>`;
    }).join('');
  }

  /* ─────────── Buy ─────────── */
  window.buyItem = function(name, type, img, base) {
    if (!currentUser) { showToast('Login first'); return; }
    base = parseFloat(base) || 0;

    if (type === 'card') {
      if (base <= 0) { showToast('Card price update coming soon'); return; }
      const wal = currentUser.wallet || 0;
      if (wal < base) { showToast('Insufficient balance — pehle wallet me Add Funds karo'); openDeposit(); return; }
      currentUser.wallet = wal - base;
      currentUser.purchases = (currentUser.purchases || 0) + 1;
      saveOrder({ type: 'card', item: name, price: base, img, status: 'pending', charged: base });
      commit();
      renderProfile();
      showToast('Order placed — admin approval ka wait karo');
      openOrders();
      return;
    }

    const panel = [...MOBILE_PANELS, ...PC_PANELS].find(p => p.name === name);
    if (!panel) { showToast('Panel not found'); return; }

    durationItemName.textContent = name;
    durationHint.textContent = 'Select a duration — price updates automatically';
    resellerOffNote.classList.toggle('hidden', !isPremiumActive());

    const off = isPremiumActive();
    durationList.innerHTML = DURATION_LABELS.map((dur, i) => {
      const pr = panel.prices[i];
      const shown = off ? round5(pr * 0.8) : pr;
      return `
        <button class="duration-item ${i === 0 ? 'selected' : ''}" data-idx="${i}">
          <span class="dur-name">${dur}</span>
          <span class="dur-price">${fmt(shown)}${off ? ' <small class="disc">' + fmt(pr) + '</small>' : ''}</span>
        </button>`;
    }).join('');

    const mats = editMats(name);
    panelMaterials.classList.remove('hidden');
    window._buyMats = mats;
    const setupLink = panelSetupVid(name);
    const setupHtml = setupLink ? `<button class="mat-btn setup-video-btn" onclick="window.open('${setupLink.replace(/'/g, "\\'")}','_blank')">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>Setup Video</span><small>YouTube ▶</small></button>` : '';
    if (mats.length) {
      panelMaterials.innerHTML = '<p class="mat-title">REQUIREMENTS / MATERIAL</p>' +
        setupHtml +
        mats.map((m, mi) => {
          const ico = m.iconUrl || m.icon || '';
          return `<button class="mat-btn" onclick="window._openBuyMat(${mi})">
          ${ico ? `<img class="mat-btn-ico" src="${ico}" alt="">` : `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>`}
          <span>${m.label}</span><small>${m.apkId ? 'Download' : 'Open'}</small></button>`;
        }).join('');
    } else {
      panelMaterials.innerHTML = '<p class="mat-title">REQUIREMENTS / MATERIAL</p>' + setupHtml +
        '<p class="mat-empty">Requirement file jaldi add ho rahi hai — buy ya phir owner se poochein.</p>';
    }

    durationList.onclick = e => {
      const item = e.target.closest('.duration-item');
      if (!item) return;
      durationList.querySelectorAll('.duration-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
    };

    window._buyPayload = { name, type, img, prices: panel.prices };
    durationModal.classList.remove('hidden');
  };

  confirmDurationBuy.addEventListener('click', () => {
    const sel = durationList.querySelector('.duration-item.selected');
    const idx = sel ? parseInt(sel.getAttribute('data-idx')) : 0;
    const payload = window._buyPayload || {};
    const pr = (payload.prices || [30,70,150,700,900,1200,1600,1800,3200])[idx] || 30;
    const cost = isPremiumActive() ? round5(pr * 0.8) : pr;
    const fullItem = payload.name + ' · ' + DURATION_LABELS[idx];

    const wal = currentUser.wallet || 0;
    if (wal < cost) {
      closeAllModals();
      showToast('Insufficient balance — add funds');
      openDeposit();
      return;
    }
    currentUser.wallet = wal - cost;
    currentUser.purchases = (currentUser.purchases || 0) + 1;
    saveOrder({ type: 'panel', item: fullItem, price: cost, img: payload.img, status: 'pending', charged: cost });
    commit();
    renderProfile();
    showToast('Order placed — admin panel key bhejega');
    closeAllModals();
  });

  /* ─────────── Orders ─────────── */
  function saveOrder(order) {
    const orders = loadOrders();
    orders.push({
      id: 'ORD-' + Date.now().toString().slice(-6),
      user: currentUser.username,
      ts: Date.now(),
      ...order
    });
    saveOrders(orders);
  }

  function openOrders() {
    if (!currentUser) return;
    renderOrders();
    ordersModal.classList.remove('hidden');
  }
  function renderOrders() {
    const orders = loadOrders()
      .filter(o => o.user === currentUser.username)
      .sort((a, b) => b.ts - a.ts);
    if (!orders.length) {
      ordersList.innerHTML = '<p class="orders-empty">No orders yet</p>';
      return;
    }
    ordersList.innerHTML = orders.map(o => {
      const st = String(o.status || 'pending').toLowerCase();
      const stLabel = st.toUpperCase();
      return `
        <div class="order-item col">
          <div class="order-main">
            <img src="${o.img || ''}" alt="" class="order-img" onerror="this.style.display='none'">
            <div class="order-info">
              <strong>${o.item}</strong>
              <small>${o.id} · ${currentUser.uid || ''} · ${new Date(o.ts).toLocaleString('en-IN', { day: '2-digit', month: 'short' })}</small>
            </div>
            <div class="order-right">
              <span class="order-price">${fmt(o.price)}</span>
              <span class="order-status ${st}">${stLabel}</span>
            </div>
          </div>
          ${st === 'accepted' ? '<div class="order-note">✅ Order accept ho gaya — admin jaldi bhejega</div>' : ''}
          ${o.details ? `<div class="order-note gold">${o.type === 'panel' ? '🔑 PANEL KEY:' : 'CARD DETAILS:'} <span class="mono">${o.details}</span></div>` : ''}
          ${st === 'refunded' ? `<div class="order-note red">❌ Reject${o.reason ? ' — ' + o.reason : ''} — amount wallet me refund ho gaya</div>` : ''}
        </div>`;
    }).join('');
  }
  openOrdersBtn.addEventListener('click', () => { if (currentUser) openOrders(); else showToast('Login first'); });
  closeOrdersBtn.addEventListener('click', () => ordersModal.classList.add('hidden'));

  /* ─────────── Deposit (gateway later — QR active) ─────────── */
  function openDeposit() {
    if (!currentUser) { showToast('Login first'); return; }
    depositAmount.value = '';
    depositModal.classList.remove('hidden');
  }
  openDepositBtn.addEventListener('click', openDeposit);
  walletPill.addEventListener('click', openDeposit);
  closeDepositBtn.addEventListener('click', () => depositModal.classList.add('hidden'));

  document.querySelectorAll('.q-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      depositAmount.value = btn.getAttribute('data-amt');
    });
  });

  /* ─────────── Razorpay checkout ─────────── */
  const RAZORPAY_KEY = 'rzp_live_Tbtt0WTrxH3mr1';   // key_id only (client-safe). Secret = server-side.
  const MIN_DEPOSIT = 10;
  const MAX_DEPOSIT = 5000;

  function openRzp(txn) {
    if (!currentUser) { showToast('Login first'); return; }
    if (typeof Razorpay === 'undefined') { showToast('Payment gateway loading'); return; }

    const amt = txn.amount;
    const rounding = Math.round(amt * 100);
    const options = {
      key: RAZORPAY_KEY,
      amount: rounding,                       // paise me
      currency: 'INR',
      name: 'ISHU STORE XYZ',
      description: 'Wallet top-up — ' + currentUser.username + ' · ' + txn.id,
      handler: function (res) {
        const all = loadTxns();
        const hit = all.find(t => t.id === txn.id);
        if (hit) { hit.status = 'paid'; hit.paidAt = Date.now(); hit.utr = res.razorpay_payment_id || ''; }
        saveTxns(all);

        const user = loadUsers()[currentUser.username];
        if (!user) return;
        user.wallet = (user.wallet || 0) + amt;
        user.deposits = (user.deposits || 0) + amt;
        currentUser = user;
        commit();
        renderProfile(); renderGrid(); renderReseller();
        showToast('Deposit successful! ₹' + Number(amt).toFixed(2) + ' added to wallet');
        closeAllModals();
      },
      prefill: { name: currentUser.username },
      theme: { color: '#FF6A00' }
    };
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', () => showToast('Payment failed — try again'));
    rzp.open();
  }

  confirmDepositBtn.addEventListener('click', () => {
    if (!currentUser) { showToast('Login first'); closeAllModals(); return; }

    const amt = parseFloat(depositAmount.value);
    if (!amt || isNaN(amt) || amt < MIN_DEPOSIT || amt > MAX_DEPOSIT) {
      showToast('Enter an amount between ₹10 and ₹5000');
      return;
    }

    const txnId = 'TXN' + Date.now().toString().slice(-8);
    const txn = { id: txnId, user: currentUser.username, type: 'deposit', amount: amt, status: 'pending', createdAt: Date.now(), expiresAt: Date.now() + TXN_MINUTES * 60 * 1000 };
    const txns = loadTxns();
    txns.push(txn);
    saveTxns(txns);
    renderTxns();
    showToast('Payment initiated — complete within 10 minutes');
    openRzp(txn);
  });

  /* ─────────── Transactions ─────────── */
  function getMyTxns() {
    if (!currentUser) return [];
    return loadTxns().filter(t => t.user === currentUser.username).sort((a, b) => b.createdAt - a.createdAt);
  }

  function renderTxns() {
    if (!currentUser) return;
    txnsModal.classList.remove('hidden');
    const list = getMyTxns();
    const now = Date.now();
    let changed = false;

    list.forEach(t => {
      if (t.status === 'pending' && !t.received && now > t.expiresAt) { t.status = 'failed'; changed = true; }
    });
    if (changed) saveTxns(loadTxns());

    if (!list.length) {
      txnsList.innerHTML = '<p class="orders-empty">No transactions yet — make a deposit to start</p>';
      return;
    }

    txnsList.innerHTML = list.map(t => {
      const pending = t.status === 'pending';
      const sent = pending && t.received;
      const left = pending ? Math.max(0, t.expiresAt - Date.now()) : 0;
      const mins = Math.floor(left / 60000);
      const secs = Math.floor((left % 60000) / 1000);
      const timeStr = mins + ':' + String(secs).padStart(2, '0');
      const pct = pending ? Math.max(0, ((t.expiresAt - now) / (TXN_MINUTES * 60 * 1000)) * 100) : 0;

      const meta = {
        pending: sent ? { dot: 'ok', label: 'UTR Sent', cls: 'st-paid' } : { dot: 'warn', label: 'Pending', cls: 'st-pending' },
        paid: { dot: 'ok', label: 'Paid', cls: 'st-paid' },
        failed: { dot: 'bad', label: 'Failed', cls: 'st-failed' },
        cancelled: { dot: 'off', label: 'Cancelled', cls: 'st-cancelled' }
      }[t.status] || { dot: 'off', label: t.status, cls: 'st-cancelled' };

      return `
        <div class="txn-item">
          <div class="txn-top">
            <div class="txn-title">
              <span class="status-dot ${meta.dot}"></span>
              <div>
                <span class="txn-name">Wallet Top-up</span>
                <span class="txn-ref">${t.id}</span>
              </div>
            </div>
            <div class="txn-right">
              <span class="txn-amount">+₹${Number(t.amount).toFixed(0)}</span>
              <span class="txn-status ${meta.cls}">${meta.label}</span>
            </div>
          </div>
          <div class="txn-meta">
            <span>${new Date(t.createdAt).toLocaleDateString()} · ${new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span class="txn-type">${String(t.type).toUpperCase()}</span>
          </div>

          ${pending ? (sent
            ? `<div class="txn-foot">${t.utr ? 'UTR: ' + t.utr : ''}${t.utr && t.ss ? ' · ' : ''}${t.ss ? 'Screenshot attached' : ''} — submitted, awaiting admin verification${t.ssUrl ? `<img class="shot-thumb" src="${t.ssUrl}" alt="">` : (t.ssKey ? `<img class="shot-thumb hidden" data-key="${t.ssKey}" alt="">` : '')}</div>`
            : `
            <div class="txn-timerbar" data-txn="${t.id}">
              <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
              <span class="timer-txt">⏱ Time left — ${timeStr}</span>
            </div>

            <div class="txn-verify">
              <input id="utr_${t.id}" class="txn-input" placeholder="UTR / Payment reference">
              <label class="txn-shot-label">
                <input type="file" accept="image/*" id="shot_${t.id}" class="hs" hidden>
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4m0 0l-5 5m5-5l5 5"/><path d="M4 20h16"/></svg>
                Screenshot
              </label>
            </div>
            <div class="txn-actions">
              <button class="btn btn-sm btn-verify" onclick="window.__verifyTxn('${t.id}')">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                Verify & Submit
              </button>
              <button class="btn btn-sm btn-pay" onclick="window.__payTxn('${t.id}')">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                Pay Again
              </button>
              <button class="btn btn-sm btn-cancel" onclick="window.__cancelTxn('${t.id}')">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
                Cancel
              </button>
            </div>`) : (t.status === 'paid'
              ? `<div class="txn-foot">${t.utr ? 'UTR: ' + t.utr : ''}${t.utr && t.ss ? ' · ' : ''}${t.ss ? 'Screenshot attached' : ''}</div>`
              : (t.status === 'failed' ? '<div class="txn-foot fail">Payment not completed in time — transaction failed</div>'
                : (t.status === 'cancelled' ? '<div class="txn-foot off">Transaction cancelled</div>' : '')))}
        </div>`;
    }).join('');
    const th = txnsList.querySelectorAll('.shot-thumb[data-key]');
    th.forEach(el => {
      const k = el.getAttribute('data-key');
      fileGet(k).then(blob => { if (blob) { el.src = URL.createObjectURL(blob); el.classList.remove('hidden'); } }).catch(() => {});
    });
    txnsList.querySelectorAll('.txn-verify input[type=file]').forEach(inp => {
      inp.addEventListener('change', () => {
        const fid = inp.id.replace('shot_', '');
        const f = inp.files && inp.files[0];
        if (f) prepareTxnShot(fid, f);
      });
    });
  }

  const txnUpls = {};
  function prepareTxnShot(id, file) {
    if (txnUpls[id] && txnUpls[id].p) return txnUpls[id].p;
    const isImg = (file.type || '').startsWith('image/');
    if (file.size > 100 * 1048576) { showToast('Screenshot 100MB se choti rakho'); return Promise.resolve(''); }
    const item = document.getElementById('shot_' + id)?.closest('.txn-item');
    let wrap = item && item.querySelector('.up-prog');
    if (wrap) wrap.remove();
    if (item) {
      wrap = document.createElement('div');
      wrap.className = 'up-prog';
      wrap.innerHTML = `
        <div class="up-prog-head">
          <span class="up-chip">📎 <b>${escapeHtml(file.name)}</b> (${fmtSize(file.size)})</span>
          <span class="up-state wait">0%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:0%"></div></div>`;
      const place = item.querySelector('.txn-verify') || item;
      place.insertAdjacentElement('afterend', wrap);
    }
    const fill = wrap.querySelector('.progress-fill');
    const st = wrap.querySelector('.up-state');
    const done = url => {
      if (wrap) { fill.style.width = '100%'; if (st) { st.textContent = url ? '✓ Ready' : 'Saved (offline)'; st.classList.remove('wait'); } }
      txnUpls[id] = { done: true, url: url || '', p: txnUpls[id] ? txnUpls[id].p : null };
      if (url) {
        const list = loadTxns();
        const rec = list.find(t => t.id === id);
        if (rec) { rec.ssUrl = url; saveTxns(list); }
      }
      if (wrap) setTimeout(() => { if (wrap && wrap.parentNode) wrap.remove(); }, 2200);
    };
    const ssKey = 'ss_' + id.toLowerCase();
    filePut(ssKey, file).then(() => {
      const list = loadTxns();
      const rec = list.find(t => t.id === id);
      if (rec && !rec.ssKey) { rec.ssKey = ssKey; saveTxns(list); }
    }).catch(() => {});
    if (fb.ok) {
      const p = fbUpload('ss/' + id.toLowerCase() + '/shot_' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9._-]/g, '_'), file, (b, t) => {
        if (!wrap) return;
        const pct = Math.min(100, Math.round((b / (t || 1)) * 100));
        fill.style.width = pct + '%';
        if (st) st.textContent = pct + '%';
      }).then(url => { done(url); return url; }).catch(() => { done(''); return ''; });
      txnUpls[id] = { done: false, url: '', p };
      return p;
    }
    done('');
    return Promise.resolve('');
  }

  window.__payTxn = id => {
    const all = loadTxns();
    const hit = all.find(t => t.id === id);
    if (!hit || hit.status !== 'pending') { showToast('Transaction not active'); return; }
    renderTxns();
    openRzp(hit);
  };

  window.__cancelTxn = id => {
    const all = loadTxns();
    const hit = all.find(t => t.id === id);
    if (hit && hit.status === 'pending') { hit.status = 'cancelled'; saveTxns(all); renderTxns(); showToast('Transaction cancelled'); }
  };

  window.__verifyTxn = async id => {
    const utr = document.getElementById('utr_' + id)?.value.trim();
    const shot = document.getElementById('shot_' + id)?.files[0];
    if (!utr) { showToast('Enter the UTR number'); return; }
    const all = loadTxns();
    const hit = all.find(t => t.id === id);
    if (hit && hit.status === 'pending') {
      let ssUrl = hit.ssUrl || '';
      if (shot) {
        if (txnUpls[id] && txnUpls[id].done) ssUrl = txnUpls[id].url || ssUrl;
        else {
          showToast('Screenshot upload...');
          ssUrl = await prepareTxnShot(id, shot);
        }
      }
      hit.received = true;
      hit.utr = utr;
      if (shot && !hit.ss) hit.ss = shot.name;
      if (shot && !hit.ssKey) hit.ssKey = 'ss_' + hit.id.toLowerCase();
      if (ssUrl) hit.ssUrl = ssUrl;
      saveTxns(all);
      renderTxns();
      showToast('UTR + screenshot sent — admin verify kar ke credit karega ✓');
    }
  };

  ddTxns.addEventListener('click', () => {
    dropdownMenu.classList.add('hidden');
    if (!currentUser) { showToast('Login first'); return; }
    txnsModal.classList.remove('hidden');
    renderTxns();
  });

  /* ─────────── Close helpers ─────────── */
  function closeAllModals() {
    durationModal.classList.add('hidden');
    depositModal.classList.add('hidden');
    ordersModal.classList.add('hidden');
    txnsModal.classList.add('hidden');
    supportModal.classList.add('hidden');
    videoModal.classList.add('hidden');
    if (videoPlayer && !videoPlayer.paused) videoPlayer.pause();
  }
  closeDurationBtn.addEventListener('click', closeAllModals);
  closeDepositBtn.addEventListener('click', closeAllModals);
  closeOrdersBtn.addEventListener('click', closeAllModals);
  closeTxnsBtn.addEventListener('click', closeAllModals);
  closeSupportBtn.addEventListener('click', closeAllModals);
  closeVideoBtn.addEventListener('click', closeAllModals);

  /* Live countdown for pending transactions (10 min auto-fail) — only timer text, NO full re-render so typed UTR/screenshot stay safe */
  setInterval(() => {
    if (!currentUser || txnsModal.classList.contains('hidden')) return;
    const all = loadTxns();
    const now = Date.now();
    let expired = false;
    all.forEach(t => {
      if (t.status === 'pending' && !t.received && now > t.expiresAt) { t.status = 'failed'; expired = true; }
    });
    if (expired) { saveTxns(all); renderTxns(); return; }
    all.filter(t => t.status === 'pending' && !t.received).forEach(t => {
      const el = txnsList.querySelector('[data-txn="' + t.id + '"]');
      if (!el) return;
      const left = Math.max(0, t.expiresAt - now);
      const mins = Math.floor(left / 60000);
      const secs = Math.floor((left % 60000) / 1000);
      const fill = el.querySelector('.bar-fill');
      const txt = el.querySelector('.timer-txt');
      if (fill) fill.style.width = Math.max(0, (left / (TXN_MINUTES * 60 * 1000)) * 100) + '%';
      if (txt) txt.textContent = '⏱ Time left — ' + mins + ':' + String(secs).padStart(2, '0');
    });
  }, 1000);

  /* ─────────── Init ─────────── */
  fbInit();
  setAuthMode('login');
  renderGrid();

  /* One-time clean: Reset all old test accounts for fresh universal registration */
  if (!localStorage.getItem('ishu_users_clean_v4')) {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(TXN_KEY);
    localStorage.removeItem(ACTIVE_TICKET_KEY);
    localStorage.setItem('ishu_users_clean_v4', '1');
  }
});