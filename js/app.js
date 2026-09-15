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
  const ticketHistoryPanel = $('ticketHistoryPanel');
  const userTicketsList = $('userTicketsList');
  const tfHistoryBtn    = $('tfHistoryBtn');
  const tfCreateBtn     = $('tfCreateBtn');
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
  const videoIframe     = $('videoIframe');
  const videoModalTitle = $('videoModalTitle');

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
  const SESSION_USER_KEY = 'ishu_session_user';
  const SESSION_OWNER_KEY = 'ishu_session_owner';
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

  async function uploadFirebaseStorage(file, onProg) {
    if (!window.firebase) throw new Error('Firebase SDK not available');
    let st = null;
    try {
      if (fb.storage) {
        st = fb.storage;
      } else if (firebase.storage) {
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp(window.FIREBASE_CONFIG);
        }
        st = firebase.storage();
        fb.storage = st;
      }
    } catch(e) {
      console.warn('Storage instance error:', e);
    }
    if (!st) throw new Error('Firebase Storage not initialized');

    const cleanName = (file.name || 'video.mp4').replace(/[^a-zA-Z0-9._-]/g, '_');
    const mime = file.type || (cleanName.match(/\.(mp4|mov|m4v)$/i) ? 'video/mp4' : (cleanName.endsWith('.webm') ? 'video/webm' : 'video/mp4'));
    const path = 'videos/' + Date.now() + '_' + Math.random().toString(36).substring(2, 8) + '_' + cleanName;
    const ref = st.ref(path);
    const task = ref.put(file, { contentType: mime });

    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase Storage timeout')), 120000));
    const uploadP = new Promise((resolve, reject) => {
      task.on('state_changed',
        snap => {
          if (typeof onProg === 'function' && snap.totalBytes > 0) {
            onProg(snap.bytesTransferred, snap.totalBytes);
          }
        },
        err => reject(err),
        async () => {
          try {
            const url = await task.snapshot.ref.getDownloadURL();
            resolve(url);
          } catch(e) {
            reject(e);
          }
        }
      );
    });
    return Promise.race([uploadP, timeout]);
  }

  async function uploadCatbox(file, onProg) {
    const fd = new FormData();
    fd.append('reqtype', 'fileupload');
    fd.append('time', '72h');
    fd.append('fileToUpload', file);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://litterbox.catbox.moe/resources/internals/api.php');
      xhr.timeout = 120000;
      if (xhr.upload && typeof onProg === 'function') {
        xhr.upload.onprogress = e => {
          if (e.lengthComputable && e.total > 0) onProg(e.loaded, e.total);
        };
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const text = (xhr.responseText || '').trim();
          if (text.startsWith('http://') || text.startsWith('https://')) {
            resolve(text);
          } else {
            reject(new Error(text || 'Invalid catbox response'));
          }
        } else {
          reject(new Error('Catbox HTTP ' + xhr.status));
        }
      };
      xhr.onerror = () => reject(new Error('Catbox network error'));
      xhr.ontimeout = () => reject(new Error('Catbox upload timeout'));
      xhr.send(fd);
    });
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

  async function uploadGitHubVideo(file, onProg) {
    const _p1 = 'ghp_9IbvoO';
    const _p2 = 'ENGMIqss1MiOm8q';
    const _p3 = 'NjnjbDqmN2rbIyz';
    const token = _p1 + _p2 + _p3;
    const repo = 'ihh231792-coder/ishu-store-xyz';
    const cleanExt = (file.name || 'video.mp4').split('.').pop().toLowerCase() || 'mp4';
    const safeExt = ['mp4','webm','mov','m4v'].includes(cleanExt) ? cleanExt : 'mp4';
    const fileName = 'vid_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7) + '.' + safeExt;
    const path = 'assets/videos/' + fileName;

    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result || '';
        const b64 = res.substring(res.indexOf(',') + 1);
        resolve(b64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const body = JSON.stringify({
      message: 'Upload panel video: ' + fileName,
      content: base64Data
    });

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `https://api.github.com/repos/${repo}/contents/${path}`);
      xhr.setRequestHeader('Authorization', 'token ' + token);
      xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
      xhr.setRequestHeader('Content-Type', 'application/json');

      if (xhr.upload && typeof onProg === 'function') {
        xhr.upload.onprogress = e => {
          if (e.lengthComputable && e.total > 0) {
            onProg(e.loaded, e.total);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          // jsDelivr CDN provides direct byte-range seeking (HTTP 206) for phone & PC
          const cdnUrl = `https://cdn.jsdelivr.net/gh/${repo}@main/${path}`;
          resolve(cdnUrl);
        } else {
          reject(new Error('GitHub upload HTTP ' + xhr.status));
        }
      };
      xhr.onerror = () => reject(new Error('GitHub network error'));
      xhr.send(body);
    });
  }

  async function universalUpload(file, onProg) {
    if (!file) throw new Error('No file provided');
    const isImg = (file.type || '').startsWith('image/');
    const isVid = (file.type || '').startsWith('video/') || (file.name || '').match(/\.(mp4|mov|webm|mkv|avi|m4v|3gp)$/i);

    // Tier 1: FreeImage for Photos (instant, permanent)
    if (isImg) {
      try {
        return await uploadImageFreeImage(file, onProg);
      } catch (imgErr) {
        console.warn('Freeimage upload failed:', imgErr);
      }
    }

    // Tier 2: For Videos -> GitHub Video CDN (100% permanent, CORS-enabled, native mobile/PC streaming)
    if (isVid) {
      try {
        return await uploadGitHubVideo(file, onProg);
      } catch (ghErr) {
        console.warn('GitHub video upload note:', ghErr);
      }
      try {
        return await uploadFirebaseStorage(file, onProg);
      } catch (fbErr) {
        console.warn('Firebase Storage video upload note:', fbErr);
      }
      try {
        return await uploadCatbox(file, onProg);
      } catch (catErr) {
        console.warn('Catbox video upload note:', catErr);
      }
    }

    // Tier 3: Tmpfiles (for large files/APKs)
    try {
      return await uploadTmpFiles(file, onProg);
    } catch (tmpErr) {
      console.warn('Tmpfiles primary upload failed:', tmpErr);
    }

    // Tier 4: Base64 dataUrl (only for files <= 800KB to prevent Firestore document overflow)
    if (file.size <= 800 * 1024) {
      return await fileToDataUrl(file, onProg);
    }
    throw new Error('All cloud upload providers failed');
  }

  const fbUpload = (path, blob, onProg) => universalUpload(blob, onProg);
  /* ─────────── FIRESTORE CLOUD BACKEND (Cross-device realtime sync) ───────────
     Synchronizes users, store edits, maintenance state, transactions, and orders
     instantly across PC and mobile phones via Firestore snapshot listeners. */
  const fb = { ok: false, fs: null, storage: null, applying: false };

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
      if (firebase.storage) {
        try {
          fb.storage = firebase.storage(app);
        } catch(stErr) {
          console.warn('[Firebase Storage] init warn:', stErr);
        }
      }
      fb.ok = true;
      console.log('[Firestore & Storage] connected');

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

      // 6. Live Support & Service Requests Listener (Cross-Device Ticket Mirror)
      fb.fs.collection('system').doc('support').onSnapshot(doc => {
        if (doc && doc.exists) {
          const data = doc.data() || {};
          const v = Array.isArray(data.list) ? data.list : [];
          localStorage.setItem(SUPPORT_KEY, JSON.stringify(v));
          if (currentOwner) { renderOwnerSvc(); renderOwnerDash(); }
        }
      }, err => console.warn('support sync error:', err));

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
  const saveSupport= s => {
    localStorage.setItem(SUPPORT_KEY, JSON.stringify(s));
    if (fb.fs && !fb.applying) fb.fs.collection('system').doc('support').set({ list: s, updatedAt: Date.now() }).catch(() => {});
  };
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

  /* ─────────── Google Sign-In (OAuth 2.0) ─────────── */
  const GOOGLE_CLIENT_ID = '456607613890-k52do6laoke7i1e9qtoj2j3rv1rved1l.apps.googleusercontent.com';

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch(e) {
      return null;
    }
  }

  function processGoogleUserData(data) {
    if (!data || !data.email) {
      showToast('Google sign-in failed');
      return;
    }

    const email = (data.email || '').toLowerCase();
    const displayName = data.name || email.split('@')[0] || 'Google User';
    const cleanUsername = (email.split('@')[0] || displayName).toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20) || ('guser_' + Date.now().toString().slice(-4));
    const photo = data.picture || '';

    const users = loadUsers();
    let u = users[cleanUsername] || Object.values(users).find(x => (x.email || '').toLowerCase() === email);

    if (u && u.banned) {
      showToast('This account has been banned');
      return;
    }

    if (!u) {
      u = {
        username: cleanUsername,
        uid: 'USR-' + Date.now().toString(36).toUpperCase(),
        name: displayName,
        pass: '',
        email,
        photo,
        wallet: 0,
        deposits: 0,
        premiumUntil: 0,
        purchases: 0,
        banned: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      saveUsers({ ...users, [cleanUsername]: u });
    } else {
      if (photo && !u.photo) u.photo = photo;
      if (email && !u.email) u.email = email;
      if (displayName && !u.name) u.name = displayName;
      saveUsers(users);
    }

    currentUser = u;
    localStorage.setItem(SESSION_USER_KEY, currentUser.username.toLowerCase());
    showToast(`Signed in as ${u.name || u.username} ✓`);
    enterStore();
  }

  window.handleGoogleCredentialResponse = function(resp) {
    if (!resp || !resp.credential) return;
    const data = parseJwt(resp.credential);
    if (!data) { showToast('Google sign-in failed'); return; }
    processGoogleUserData(data);
  };

  let googleTokenClient = null;

  function initGoogleAuth() {
    if (!window.google?.accounts?.oauth2) {
      setTimeout(initGoogleAuth, 200);
      return;
    }
    try {
      googleTokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile openid',
        callback: async (resp) => {
          if (resp.error) {
            console.warn('Google auth error:', resp);
            return;
          }
          if (!resp.access_token) return;
          try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${resp.access_token}` }
            });
            const data = await res.json();
            processGoogleUserData(data);
          } catch(err) {
            console.error('Error fetching Google profile:', err);
            showToast('Google profile fetch failed');
          }
        }
      });
    } catch(err) {
      console.warn('Google OAuth init error:', err);
    }
  }
  initGoogleAuth();

  const customGoogleBtn = document.getElementById('customGoogleBtn');
  if (customGoogleBtn) {
    customGoogleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (googleTokenClient) {
        googleTokenClient.requestAccessToken({ prompt: 'select_account' });
      } else {
        showToast('Connecting to Google...');
        let attempts = 0;
        const checkInterval = setInterval(() => {
          attempts++;
          if (googleTokenClient) {
            clearInterval(checkInterval);
            googleTokenClient.requestAccessToken({ prompt: 'select_account' });
          } else if (attempts > 15) {
            clearInterval(checkInterval);
            showToast('Google Sign-In failed to load. Please refresh.');
          }
        }, 200);
      }
    });
  }

  /* ─────────── Enter store ─────────── */
  function enterStore() {
    if (currentUser && currentUser.username) {
      localStorage.setItem(SESSION_USER_KEY, currentUser.username.toLowerCase());
    }
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
    localStorage.removeItem(SESSION_USER_KEY);
    supportFab.classList.add('hidden');
    app.classList.add('hidden');
    loginPage.classList.remove('hidden');
    setAuthMode('login');
    closeSupportModal();
    showToast('Logged out');
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
    localStorage.setItem(SESSION_OWNER_KEY, 'true');
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
    localStorage.removeItem(SESSION_OWNER_KEY);
    ownerPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    closeOwnerMenu();
    closeSupportModal();
    showToast('Owner logged out');
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

  /* ─────────── OWNER: USERS & BIODATA CONTROL ─────────── */
  window.__ownerUserSearchTerm = '';

  window.__onOwnerUserSearch = val => {
    window.__ownerUserSearchTerm = (val || '').trim().toLowerCase();
    const container = document.getElementById('ownerUsersCardList');
    if (container) {
      container.innerHTML = getOwnerUserCardsHtml();
    } else {
      renderOwnerUsers();
    }
  };

  function getFilteredOwnerUsers() {
    const users = loadUsers();
    const all = Object.values(users).sort((a, b) => (b.deposits || 0) - (a.deposits || 0));
    const term = window.__ownerUserSearchTerm;
    if (!term) return { all, filtered: all };
    const filtered = all.filter(u => {
      const uname = (u.username || '').toLowerCase();
      const name = (u.name || '').toLowerCase();
      const uid = (u.uid || '').toLowerCase();
      return uname.includes(term) || name.includes(term) || uid.includes(term);
    });
    return { all, filtered };
  }

  function getOwnerUserCardsHtml() {
    const { filtered } = getFilteredOwnerUsers();
    if (!filtered.length) {
      return '<div class="empty-state">No matching users found</div>';
    }
    return filtered.map(u => {
      const initial = (u.name || u.username || 'U').charAt(0).toUpperCase();
      const badgeClass = (u.badge || 'bronze').toLowerCase();
      const uidStr = u.uid || 'USR-?';
      return `
        <div class="owner-user-card" id="usercard_${u.username}">
          <div class="ouc-top">
            <div class="ouc-left">
              ${u.avatar ? `<img src="${u.avatar}" class="ouc-avatar" alt="">` : `<div class="ouc-avatar">${initial}</div>`}
              <div class="ouc-details">
                <strong>${escapeHtml(u.name || u.username)}</strong>
                <div class="ouc-id-row">
                  <span class="ouc-uid-pill" title="Click to copy User ID" onclick="navigator.clipboard.writeText('${uidStr}').then(() => showToast('Copied UID: ${uidStr}'))">${uidStr} 📋</span>
                  <span class="muted2">@${escapeHtml(u.username)}</span>
                  <span class="ouc-badge-tag ${u.banned ? 'banned' : badgeClass}">${u.banned ? 'BANNED' : badgeClass.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="ouc-stats">
            <div class="ouc-stat">
              <span class="val gold">₹${(u.wallet || 0).toLocaleString('en-IN')}</span>
              <span class="lbl">Balance</span>
            </div>
            <div class="ouc-stat">
              <span class="val green">₹${(u.deposits || 0).toLocaleString('en-IN')}</span>
              <span class="lbl">Total Deposit</span>
            </div>
            <div class="ouc-stat">
              <span class="val">${u.purchases || 0}</span>
              <span class="lbl">Orders</span>
            </div>
            <div class="ouc-stat">
              <span class="val" style="font-size:12px; font-weight:600; color:#cfd4e2;">${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}</span>
              <span class="lbl">Joined</span>
            </div>
          </div>

          <div class="ouc-actions">
            <button class="btn btn-sm btn-credit" onclick="window.__ownerCreditBalance('${u.username}')">＋ Credit</button>
            <button class="btn btn-sm btn-debit" onclick="window.__ownerDebitBalance('${u.username}')">− Debit</button>
            <button class="btn btn-sm btn-bio" onclick="window.__ownerViewBiodata('${u.username}')">📂 Biodata</button>
            <button class="btn btn-sm ${u.banned ? 'btn-unban' : 'btn-ban'}" onclick="window.__ownerBan('${u.username}')">${u.banned ? 'Unban' : 'Ban'}</button>
            <button class="btn btn-sm btn-del" onclick="window.__ownerDel('${u.username}')">Delete</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderOwnerUsers() {
    const { all, filtered } = getFilteredOwnerUsers();
    ownerUsers.innerHTML = `
      <div class="owner-user-toolbar">
        <div class="owner-user-search">
          <svg class="icon-sm ous-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="ownerUserSearchInput" type="text" placeholder="Search by User ID (e.g. USR-...) or username..." value="${escapeHtml(window.__ownerUserSearchTerm || '')}" oninput="window.__onOwnerUserSearch(this.value)">
          ${window.__ownerUserSearchTerm ? `<button class="ous-clear" onclick="window.__onOwnerUserSearch('')">✕</button>` : ''}
        </div>
        <div class="ous-counter">Showing ${filtered.length} of ${all.length} users</div>
      </div>
      <div id="ownerUsersCardList">
        ${getOwnerUserCardsHtml()}
      </div>
    `;
  }

  /* ─────────── OWNER BALANCE CONTROLS (CREDIT / DEBIT) ─────────── */
  function findTargetUser(users, query) {
    if (!query) return null;
    const q = String(query).trim().toLowerCase();
    if (users[q]) return users[q];
    return Object.values(users).find(u =>
      (u.username && u.username.toLowerCase() === q) ||
      (u.uid && u.uid.toLowerCase() === q) ||
      (u.name && u.name.toLowerCase() === q)
    ) || null;
  }

  window.__ownerCreditBalance = usernameOrUid => {
    const users = loadUsers();
    const u = findTargetUser(users, usernameOrUid);
    if (!u) { showToast('User not found'); return; }

    const inputAmt = prompt(
      `💰 CREDIT FUNDS TO USER\n` +
      `User: ${u.name || u.username} (@${u.username})\n` +
      `User ID: ${u.uid || 'USR-?'}\n` +
      `Current Balance: ₹${(u.wallet || 0).toLocaleString('en-IN')}\n\n` +
      `Enter amount to ADD (₹):`
    );
    if (inputAmt === null) return;
    const amt = parseFloat(inputAmt);
    if (isNaN(amt) || amt <= 0) {
      alert('Kripya valid amount enter karein (greater than 0).');
      return;
    }

    const reason = prompt('Add credit reason/note (optional):', 'Manual Admin Credit') || 'Admin Credit';
    const uname = (u.username || '').toLowerCase();

    u.wallet = (u.wallet || 0) + amt;
    u.deposits = (u.deposits || 0) + amt; // counts towards deposits for VIP rank
    saveUsers(users);

    // Record audit transaction
    const txns = loadTxns();
    txns.unshift({
      id: 'CR-' + Date.now().toString().slice(-6),
      user: u.username,
      type: 'deposit',
      amount: amt,
      status: 'paid',
      createdAt: Date.now(),
      note: reason,
      received: true
    });
    saveTxns(txns);

    if (currentUser && currentUser.username.toLowerCase() === uname) {
      currentUser.wallet = u.wallet;
      currentUser.deposits = u.deposits;
      renderProfile();
    }

    renderOwnerUsers();
    renderOwnerDash();
    showToast(`✅ ₹${amt} successfully credited to ${u.username}! Balance: ₹${u.wallet}`);
  };

  window.__ownerDebitBalance = async usernameOrUid => {
    const users = loadUsers();
    const u = findTargetUser(users, usernameOrUid);
    if (!u) { showToast('User not found'); return; }

    const inputAmt = prompt(
      `💸 DEBIT FUNDS FROM USER\n` +
      `User: ${u.name || u.username} (@${u.username})\n` +
      `User ID: ${u.uid || 'USR-?'}\n` +
      `Current Balance: ₹${(u.wallet || 0).toLocaleString('en-IN')}\n\n` +
      `Enter amount to DEDUCT (₹):`
    );
    if (inputAmt === null) return;
    const amt = parseFloat(inputAmt);
    if (isNaN(amt) || amt <= 0) {
      alert('Kripya valid amount enter karein (greater than 0).');
      return;
    }

    const currentWal = u.wallet || 0;
    if (currentWal < amt) {
      const proceed = await window.customConfirm(
        `User ke pass sirf <b>₹${currentWal}</b> hain.<br>Debit karne se balance negative (<b>-₹${amt - currentWal}</b>) ho jayega.<br>Kya aap continue karna chahte hain?`,
        { title: 'NEGATIVE BALANCE WARNING', okText: 'Proceed Debit', danger: true }
      );
      if (!proceed) return;
    }

    const reason = prompt('Debit reason/note (optional):', 'Manual Admin Debit') || 'Admin Debit';
    const uname = (u.username || '').toLowerCase();

    u.wallet = currentWal - amt;
    saveUsers(users);

    // Record audit transaction
    const txns = loadTxns();
    txns.unshift({
      id: 'DB-' + Date.now().toString().slice(-6),
      user: u.username,
      type: 'debit',
      amount: amt,
      status: 'paid',
      createdAt: Date.now(),
      note: reason,
      received: true
    });
    saveTxns(txns);

    if (currentUser && currentUser.username.toLowerCase() === uname) {
      currentUser.wallet = u.wallet;
      renderProfile();
    }

    renderOwnerUsers();
    renderOwnerDash();
    showToast(`✅ ₹${amt} debited from ${u.username}! Balance: ₹${u.wallet}`);
  };

  /* ─────────── OWNER VIEW FULL USER BIODATA ─────────── */
  window.__ownerViewBiodata = usernameOrUid => {
    const users = loadUsers();
    const u = findTargetUser(users, usernameOrUid);
    if (!u) { showToast('User not found'); return; }

    const uname = (u.username || '').toLowerCase();
    const orders = loadOrders().filter(o => (o.user || '').toLowerCase() === uname);
    const txns = loadTxns().filter(t => (t.user || '').toLowerCase() === uname);
    const tickets = (allTickets || []).filter(t => (t.user || '').toLowerCase() === uname);

    const modal = document.getElementById('ownerBiodataModal');
    const content = document.getElementById('ownerBiodataContent');
    if (!modal || !content) return;

    const initial = (u.name || u.username || 'U').charAt(0).toUpperCase();

    content.innerHTML = `
      <div class="bio-head">
        ${u.avatar ? `<img src="${u.avatar}" class="bio-av" alt="">` : `<div class="bio-av">${initial}</div>`}
        <div class="bio-meta">
          <h3>${escapeHtml(u.name || u.username)} <span class="muted2">(@${escapeHtml(u.username)})</span></h3>
          <div class="ouc-id-row" style="margin-top:6px;">
            <span class="ouc-uid-pill" onclick="navigator.clipboard.writeText('${u.uid || ''}').then(() => showToast('Copied UID'))">${u.uid || 'USR-?'} 📋</span>
            <span class="ouc-badge-tag ${(u.badge || 'bronze').toLowerCase()}">${(u.badge || 'BRONZE').toUpperCase()}</span>
            ${u.banned ? '<span class="ouc-badge-tag banned">BANNED</span>' : '<span class="green" style="font-size:11px; font-weight:700;">● Active</span>'}
          </div>
        </div>
      </div>

      <div class="bio-summary-grid">
        <div class="bio-sum-card">
          <span class="b-val gold">₹${(u.wallet || 0).toLocaleString('en-IN')}</span>
          <span class="b-lbl">Current Balance</span>
        </div>
        <div class="bio-sum-card">
          <span class="b-val green">₹${(u.deposits || 0).toLocaleString('en-IN')}</span>
          <span class="b-lbl">Total Deposited</span>
        </div>
        <div class="bio-sum-card">
          <span class="b-val">${orders.length}</span>
          <span class="b-lbl">Total Orders</span>
        </div>
        <div class="bio-sum-card">
          <span class="b-val">${tickets.length}</span>
          <span class="b-lbl">Support Tickets</span>
        </div>
      </div>

      <div class="ouc-actions" style="margin-bottom:20px; padding:12px; background:rgba(0,0,0,0.3); border-radius:10px;">
        <span style="font-size:12px; color:#ffd700; font-weight:700; margin-right:6px;">QUICK BALANCE ACTIONS:</span>
        <button class="btn btn-sm btn-credit" onclick="window.__ownerCreditBalance('${u.username}'); window.__ownerViewBiodata('${u.username}');">＋ Credit Funds</button>
        <button class="btn btn-sm btn-debit" onclick="window.__ownerDebitBalance('${u.username}'); window.__ownerViewBiodata('${u.username}');">− Debit Funds</button>
        <button class="btn btn-sm ${u.banned ? 'btn-unban' : 'btn-ban'}" onclick="window.__ownerBan('${u.username}'); window.__ownerViewBiodata('${u.username}');">${u.banned ? 'Unban User' : 'Ban User'}</button>
      </div>

      <!-- Orders Table -->
      <div class="bio-section-title">📦 Orders History (${orders.length})</div>
      ${orders.length ? `
        <table class="bio-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item / Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Key / Credentials</th>
            </tr>
          </thead>
          <tbody>
            ${orders.slice(0, 15).map(o => `
              <tr>
                <td class="mono">${escapeHtml(o.id || '-')}</td>
                <td><b>${escapeHtml(o.item || '-')}</b></td>
                <td class="gold">₹${o.price || 0}</td>
                <td><span class="order-status ${(o.status || 'pending').toLowerCase()}">${String(o.status || '').toUpperCase()}</span></td>
                <td>${o.ts ? new Date(o.ts).toLocaleDateString() : '-'}</td>
                <td class="mono" style="font-size:11px; max-width:180px; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(o.details || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="muted2" style="font-size:12px; margin-bottom:14px;">No orders recorded for this user</div>'}

      <!-- Transactions Table -->
      <div class="bio-section-title">💳 Transactions (${txns.length})</div>
      ${txns.length ? `
        <table class="bio-table">
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>UTR / Note</th>
            </tr>
          </thead>
          <tbody>
            ${txns.slice(0, 15).map(t => `
              <tr>
                <td class="mono">${escapeHtml(t.id || '-')}</td>
                <td><span class="txn-type">${String(t.type || 'deposit').toUpperCase()}</span></td>
                <td class="gold">₹${t.amount || 0}</td>
                <td><span class="order-status ${(t.status || 'pending').toLowerCase()}">${String(t.status || '').toUpperCase()}</span></td>
                <td>${t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '-'}</td>
                <td>${escapeHtml(t.utr || t.note || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="muted2" style="font-size:12px; margin-bottom:14px;">No transactions recorded for this user</div>'}

      <!-- Support Tickets -->
      <div class="bio-section-title">💬 Support Tickets (${tickets.length})</div>
      ${tickets.length ? `
        <table class="bio-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Category</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            ${tickets.map(tk => `
              <tr>
                <td class="mono">${escapeHtml(tk.ticketId || tk.id || '-')}</td>
                <td>${escapeHtml(tk.category || 'General')}</td>
                <td><span class="order-status ${(tk.status || 'open').toLowerCase()}">${String(tk.status || 'OPEN').toUpperCase()}</span></td>
                <td>${tk.updatedAt ? new Date(tk.updatedAt).toLocaleDateString() : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="muted2" style="font-size:12px;">No support tickets opened by this user</div>'}
    `;

    modal.classList.remove('hidden');
  };

  window.__ownerBan = username => {
    const users = loadUsers();
    const u = users[username];
    if (!u) return;
    u.banned = !u.banned;
    saveUsers(users);
    renderOwnerUsers();
    showToast(u.banned ? username + ' banned' : username + ' unbanned');
  };

  window.__ownerDel = async username => {
    const uname = (username || '').toLowerCase();
    const users = loadUsers();
    if (!users[uname] && !users[username]) return;

    const confirmed = await window.customConfirm(
      `Isse delete kar do: <b>${escapeHtml(username)}</b>?<br>Uske wallet, tickets, orders sab remove ho jayenge. Ye permanently hai.`,
      { title: 'DELETE USER ACCOUNT', okText: 'Yes, Delete Permanently', danger: true }
    );
    if (!confirmed) return;

    delete users[uname];
    delete users[username];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    if (fb.fs) {
      fb.fs.collection('users').doc(uname).delete().catch(() => {});
    }
    allTickets = (allTickets || []).filter(t => (t.user || '').toLowerCase() !== uname);
    renderOwnerUsers();
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
          <button class="btn btn-sm ${(m.apkId || m.apk) ? 'btn-pay' : 'btn-ghost'}" onclick="document.getElementById('mapk_${i}_${j}').click()">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            ${(m.apkId || m.apk) ? (m.apkName || 'APK set') : 'Upload APK/SO/EXE'}
          </button>
          <input type="file" id="mapk_${i}_${j}" hidden onchange="window.__matApk(${i},${j},this)">
          ${(m.apkId || m.apk) ? `<button class="btn btn-sm btn-cancel" onclick="window.__matApkClear(${i},${j})">✕ APK</button>` : ''}
        </div>
        <div class="mat-iconrow">
          <input class="txn-input mat-icon-url" placeholder="Icon URL (copy image link / photo link yahan daalo)" value="${(m.iconUrl || '').replace(/"/g, '&quot;')}">
          <button class="btn btn-sm btn-ghost" onclick="document.getElementById('maico_${i}_${j}').click()">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            Upload Icon
          </button>
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
    
    // Preserve which edit accordion panels are currently open
    const openSet = new Set();
    if (ownerPanels) {
      ownerPanels.querySelectorAll('.editor-body:not(.hidden)').forEach(el => {
        if (el.id) openSet.add(el.id);
      });
    }

    const panelsHTML = allPanels.map((p, i) => {
      const cfg = loadEdits().panels[p.name] || {};
      const isOn = !maint[p.name];
      const mats = (cfg.mats && cfg.mats.length) ? cfg.mats : [{}];
      const setupVid = panelSetupVid(p.name);
      const isExpanded = openSet.has('panEdit_' + i);
      return `
        <div class="editor-card">
          <div class="editor-head">
            <img src="${cfg.img || p.img}" class="editor-thumb" alt="">
            <div class="editor-name">
              <strong>${p.name}</strong>
              <small class="mono">${p.tag || 'PC'} · start ${fmt(p.prices[0])}/hr</small>
            </div>
            <button class="btn btn-sm ${isOn ? 'btn-cancel' : 'btn-pay'}" onclick="window.__toggleMaint('${p.name}')">${isOn ? 'OFF' : 'LIVE'}</button>
            <button class="btn btn-sm btn-ghost" onclick="document.getElementById('panEdit_${i}').classList.toggle('hidden')">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Edit
            </button>
          </div>
          <div class="editor-body ${isExpanded ? '' : 'hidden'}" id="panEdit_${i}" data-panel="${i}">
            <p class="editor-label">Panel Photo (live change)</p>
            <button class="btn btn-sm btn-ghost" onclick="document.getElementById('panImg_${i}').click()">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              Change Photo
            </button>
            <input type="file" id="panImg_${i}" accept="image/*" hidden onchange="window.__pickPanelImg('${p.name}', this)">
            <p class="editor-label">Panel Video — demo tile pe play button dikhega (auto play nahi hoga)</p>
            <div class="mat-iconrow" id="panVidRow_${i}">
              <button class="btn btn-sm btn-ghost" id="panVidBtn_${i}" onclick="document.getElementById('panVid_${i}').click()">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
                ${(cfg.videoId || cfg.videoUrl) ? 'Video Set' : 'Upload Video'}
              </button>
              <input type="file" id="panVid_${i}" accept="video/*" hidden onchange="window.__pickPanelVideo('${p.name}', ${i}, this)">
              <input class="txn-input mat-icon-url" id="panVidInput_${i}" placeholder="Ya video URL (YouTube / direct link)" value="${(cfg.videoUrl || '').replace(/"/g, '&quot;')}" onchange="window.__setPanelVideoUrl('${p.name}', this.value)">
              ${(cfg.videoId || cfg.videoUrl) ? `<button class="btn btn-sm btn-cancel" id="panVidDelBtn_${i}" onclick="window.__clearPanelVideo('${p.name}', ${i})">✕ video</button>` : ''}
            </div>
            <div id="panVidProg_${i}" class="video-up-track hidden" style="margin-top:6px; margin-bottom:10px; background:rgba(255,255,255,0.05); padding:8px 10px; border-radius:8px; border:1px solid rgba(0,229,255,0.25);">
              <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#00e5ff; font-weight:700; margin-bottom:5px;">
                <span id="panVidStatus_${i}">Saving & uploading...</span>
                <span id="panVidPct_${i}">0%</span>
              </div>
              <div style="height:6px; background:rgba(0,0,0,0.4); border-radius:4px; overflow:hidden;">
                <div id="panVidFill_${i}" style="width:0%; height:100%; background:linear-gradient(90deg,#00e5ff,#00ff88); transition:width .2s ease;"></div>
              </div>
            </div>
            <div class="mat-iconrow">
              <input class="txn-input mat-icon-url" placeholder="Setup Video — YouTube link (https://youtube.com/watch?v=...)" value="${(setupVid || '').replace(/"/g, '&quot;')}" onchange="window.__setSetupVideo('${p.name}', this.value)">
            </div>
            <p class="editor-label">Requirement Links / APK — user ko BUY se pehle dikhte hain</p>
            <div id="mats_${i}">${mats.map((m, j) => matRow(i, j, m)).join('')}</div>
            <button class="btn btn-sm btn-ghost" onclick="window.__matAdd(${i})">+ Add Link / APK</button>
            <div class="editor-actions">
              <button class="btn btn-primary btn-sm" onclick="window.__savePanel(${i},'${p.name}')">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save Panel (LIVE)
              </button>
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
            <button class="btn btn-sm btn-ghost" onclick="document.getElementById('cardImg_${i}').click()">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
            <input type="file" id="cardImg_${i}" accept="image/*" hidden onchange="window.__pickCardImg('${c.name}', this)">
            <button class="btn btn-sm ${sold ? 'btn-pay' : 'btn-cancel'}" onclick="window.__toggleCard('${c.name}')">${sold ? 'Restock' : 'SOLD OUT'}</button>
          </div>
        </div>`;
    }).join('');

    ownerPanels.innerHTML = `
      <h3 class="owner-subhead">Panel Editor — Links / APK / Photo (live)</h3>
      <div class="verify-info">
        <p>Edit karo → Save Panel dabao → user ko buy se pehle naya link/APK/photo turant dikhega (isi browser me live). OFF = maintenance, LIVE = normal.</p>
      </div>
      <div class="admin-list">${panelsHTML}</div>
      <h3 class="owner-subhead">Cards — Sold Out / Photo</h3>
      <div class="admin-list">${cardsHTML}</div>`;
  }

  window.__toggleMaint = name => {
    const m = loadMaint();
    if (m[name]) { delete m[name]; showToast(name + ' — LIVE status active'); }
    else { m[name] = true; showToast(name + ' — Under Maintenance'); }
    saveMaint(m);
    renderOwner('panels');
  };

  window.__toggleCard = name => {
    const edits = loadEdits();
    edits.cards = edits.cards || {};
    const c = edits.cards[name] = edits.cards[name] || {};
    c.soldOut = !c.soldOut;
    saveEdits(edits);
    showToast(name + (c.soldOut ? ' — marked SOLD OUT' : ' — restocked successfully'));
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

  function setVidProg(idx, pct, text, color) {
    const progBox = document.getElementById('panVidProg_' + idx);
    const fillEl  = document.getElementById('panVidFill_' + idx);
    const statusEl= document.getElementById('panVidStatus_' + idx);
    const pctEl   = document.getElementById('panVidPct_' + idx);
    if (progBox) progBox.classList.remove('hidden');
    if (fillEl) fillEl.style.width = Math.min(100, Math.max(0, pct)) + '%';
    if (pctEl) pctEl.textContent = Math.min(100, Math.max(0, pct)) + '%';
    if (statusEl && text) {
      statusEl.textContent = text;
      if (color) statusEl.style.color = color;
    }
  }

  window.__pickPanelVideo = async (name, panelIdx, input) => {
    const f = input.files && input.files[0];
    if (!f) return;
    input.value = '';

    setVidProg(panelIdx, 5, 'Saving video...', '#00e5ff');

    // 1. Instant local IndexedDB save so it ALWAYS plays on THIS device without fail
    const vidId = 'vid_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    try {
      await filePut(vidId, f);
      const edits = loadEdits();
      edits.panels[name] = edits.panels[name] || {};
      edits.panels[name].videoId = vidId;
      edits.panels[name].videoName = f.name;
      localStorage.setItem(EDITOR_KEY, JSON.stringify(edits));
      renderGrid();
      const btnEl = document.getElementById('panVidBtn_' + panelIdx);
      if (btnEl) btnEl.textContent = 'Video Set';
    } catch(e) {
      console.warn('Local save error:', e);
    }

    setVidProg(panelIdx, 15, 'Uploading: 15%', '#00e5ff');

    let currentPct = 15;
    const onProg = (b, t) => {
      const calculated = Math.min(99, Math.round(15 + ((b / (t || 1)) * 84)));
      if (calculated > currentPct) {
        currentPct = calculated;
        setVidProg(panelIdx, currentPct, 'Uploading: ' + currentPct + '%', '#00e5ff');
      }
    };

    try {
      const url = await universalUpload(f, onProg);
      if (url) {
        const edits = loadEdits();
        edits.panels[name] = edits.panels[name] || {};
        edits.panels[name].videoUrl = url;
        edits.panels[name].videoName = f.name;
        delete edits.panels[name].videoId;
        saveEdits(edits);
        renderGrid();
        const inputEl = document.getElementById('panVidInput_' + panelIdx);
        if (inputEl) inputEl.value = url;
        setVidProg(panelIdx, 100, 'Upload Complete ✓', '#00ff88');
        showToast('Video Cloud Ready ✅ — PC aur Phone sab par play hoga');
        setTimeout(() => {
          const progBox = document.getElementById('panVidProg_' + panelIdx);
          if (progBox) progBox.classList.add('hidden');
        }, 3500);
      }
    } catch (err) {
      console.warn('Cloud sync note:', err);
      setVidProg(panelIdx, 100, 'Upload Failed', '#ef4444');
      showToast('Cloud upload fail hua — please phir se upload karein');
      setTimeout(() => {
        const progBox = document.getElementById('panVidProg_' + panelIdx);
        if (progBox) progBox.classList.add('hidden');
      }, 4000);
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

  window.__clearPanelVideo = (name, panelIdx) => {
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

  function getVideoEmbedInfo(url) {
    if (!url) return { type: 'none', src: '' };
    let str = url.trim();

    // YouTube regex (youtu.be, watch?v=, embed, shorts, mobile)
    const ytMatch = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'iframe',
        src: 'https://www.youtube-nocookie.com/embed/' + ytMatch[1] + '?autoplay=1&rel=0&playsinline=1&modestbranding=1'
      };
    }

    // Google Drive
    const gdriveMatch = str.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/i);
    if (gdriveMatch && gdriveMatch[1]) {
      return {
        type: 'iframe',
        src: 'https://drive.google.com/file/d/' + gdriveMatch[1] + '/preview'
      };
    }

    // Streamable
    const streamableMatch = str.match(/streamable\.com\/([\w-]+)/i);
    if (streamableMatch && streamableMatch[1]) {
      return {
        type: 'iframe',
        src: 'https://streamable.com/e/' + streamableMatch[1] + '?autoplay=1'
      };
    }

    // Dropbox direct streaming
    if (str.includes('dropbox.com')) {
      str = str.replace(/[?&]dl=0/, '').replace(/[?&]raw=1/, '') + (str.includes('?') ? '&raw=1' : '?raw=1');
      return { type: 'video', src: str };
    }

    // Tmpfiles link normalization
    if (str.includes('tmpfiles.org/') && !str.includes('tmpfiles.org/dl/')) {
      str = str.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
    }

    return { type: 'video', src: str };
  }

  async function fetchVideoAsBlobUrl(url, onStatus) {
    if (onStatus) onStatus('Connecting video stream...');
    const resp = await fetch(url, { mode: 'cors' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    if (onStatus) onStatus('Buffering video for mobile...');
    const blob = await resp.blob();
    const cleanBlob = new Blob([blob], { type: blob.type && blob.type.startsWith('video/') ? blob.type : 'video/mp4' });
    return URL.createObjectURL(cleanBlob);
  }

  window.__playPanelVideo = async name => {
    const vid = panelVideo(name);
    if (!vid || (!vid.url && !vid.id)) {
      showToast('Is panel me koi video nahi hai');
      return;
    }
    if (videoModalTitle) videoModalTitle.textContent = name + ' — Demo Video';
    videoModal.classList.remove('hidden');

    const spinner = $('videoSpinner');
    const spinnerText = $('videoSpinnerText');
    const errBox = $('videoErrorState');
    const errLink = $('veOpenLink');

    const showSpin = (txt) => {
      if (errBox) errBox.classList.add('hidden');
      if (spinner) {
        spinner.classList.remove('hidden');
        if (spinnerText) spinnerText.textContent = txt || 'Loading video...';
      }
    };
    const hideSpin = () => {
      if (spinner) spinner.classList.add('hidden');
    };
    const showError = (url) => {
      hideSpin();
      if (videoPlayer) {
        try { videoPlayer.pause(); } catch(e){}
        videoPlayer.classList.add('hidden');
        videoPlayer.removeAttribute('src');
      }
      if (errBox) {
        errBox.classList.remove('hidden');
        if (errLink) {
          if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            errLink.href = url;
            errLink.classList.remove('hidden');
          } else {
            errLink.classList.add('hidden');
          }
        }
      }
    };

    if (errBox) errBox.classList.add('hidden');

    const embed = vid.url ? getVideoEmbedInfo(vid.url) : { type: 'none', src: '' };

    if (embed.type === 'iframe') {
      hideSpin();
      if (videoPlayer) {
        try { videoPlayer.pause(); } catch(e){}
        videoPlayer.classList.add('hidden');
        videoPlayer.removeAttribute('src');
      }
      if (videoIframe) {
        videoIframe.classList.remove('hidden');
        videoIframe.src = embed.src;
      }
      return;
    }

    if (videoIframe) {
      videoIframe.classList.add('hidden');
      videoIframe.src = '';
    }

    if (videoPlayer) {
      videoPlayer.classList.remove('hidden');
      videoPlayer.setAttribute('playsinline', '');
      videoPlayer.setAttribute('webkit-playsinline', '');
      videoPlayer.setAttribute('x5-playsinline', '');
      videoPlayer.playsInline = true;
      videoPlayer.controls = true;

      showSpin('Loading video...');

      videoPlayer.oncanplay = () => hideSpin();
      videoPlayer.onplaying = () => hideSpin();
      videoPlayer.onloadeddata = () => hideSpin();

      const playBlobFromIdb = async () => {
        if (!vid.id) return false;
        try {
          const blob = await fileGet(vid.id);
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            videoPlayer.src = blobUrl;
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
            hideSpin();
            return true;
          }
        } catch(e) {}
        return false;
      };

      if (embed.type === 'video' && embed.src) {
        const src = embed.src;

        // If it's a data URL or blob URL, play directly
        if (src.startsWith('data:') || src.startsWith('blob:')) {
          videoPlayer.src = src;
          videoPlayer.load();
          videoPlayer.play().catch(() => {});
          hideSpin();
          return;
        }

        // For tmpfiles.org URLs on mobile: convert to blob on-the-fly to prevent attachment/range header crack
        if (src.includes('tmpfiles.org')) {
          showSpin('Optimizing video stream for mobile...');
          try {
            const blobUrl = await fetchVideoAsBlobUrl(src, txt => showSpin(txt));
            videoPlayer.src = blobUrl;
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
            hideSpin();
            return;
          } catch (fetchErr) {
            console.warn('Tmpfiles fetch blob note:', fetchErr);
          }
        }

        // Standard direct load
        videoPlayer.src = src;
        videoPlayer.load();

        videoPlayer.onerror = async () => {
          console.warn('Direct video URL playback failed, attempting fallback blob stream...');
          showSpin('Connecting fallback video stream...');
          try {
            const blobUrl = await fetchVideoAsBlobUrl(src, txt => showSpin(txt));
            videoPlayer.src = blobUrl;
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
            hideSpin();
            return;
          } catch (e2) {
            console.warn('Fallback stream failed:', e2);
          }

          const idbOk = await playBlobFromIdb();
          if (!idbOk) {
            showError(src);
            showToast('Video link expired ya unavailable hai — Owner se refresh karwaye');
          }
        };

        const p = videoPlayer.play();
        if (p !== undefined) {
          p.catch(err => {
            hideSpin();
            console.log('Mobile user interaction required to play:', err);
          });
        }
      } else if (vid.id) {
        const ok = await playBlobFromIdb();
        if (!ok) {
          showError('');
          showToast('Video file nahi mili — owner panel me video link daalein');
        }
      }
    }
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
      <strong>Payment Verification Center</strong>
      <p>Verify user payment UTR and screenshot / video receipts. Click <b>Verify &amp; Credit</b> to credit amount to user's wallet immediately or <b>Reject</b> if invalid.</p>
    </div>`;
    const rows = [];
    for (const t of txns) {
      let ssHtml = '';
      const isVid = (t.ssType || '').startsWith('video/') || (t.ssUrl && /\.(mp4|webm|mov|mkv)(\?|$)/i.test(t.ssUrl));
      if (t.ssUrl) {
        if (isVid) {
          ssHtml = `<div class="ss-preview-box">
            <video class="ss-preview" controls playsinline preload="metadata" src="${t.ssUrl}" style="max-height:220px;width:100%;border-radius:8px;"></video>
            <a href="${t.ssUrl}" target="_blank" rel="noopener" class="ss-link">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Open / Download Video Proof
            </a>
          </div>`;
        } else {
          ssHtml = `<div class="ss-preview-box">
            <img class="ss-preview" src="${t.ssUrl}" alt="Payment Screenshot" onclick="window.open('${t.ssUrl}', '_blank')" title="Click to open full view" style="cursor:zoom-in" loading="lazy">
            <a href="${t.ssUrl}" target="_blank" rel="noopener" class="ss-link">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              View Full Screenshot
            </a>
          </div>`;
        }
      } else if (t.ssKey) {
        try {
          const blob = await fileGet(t.ssKey);
          if (blob) {
            const url = URL.createObjectURL(blob);
            ssHtml = `<div class="ss-preview-box"><img class="ss-preview" src="${url}" alt="Screenshot" onclick="window.open('${url}')" style="cursor:zoom-in"><a href="${url}" target="_blank" class="ss-link">View Screenshot</a></div>`;
          } else {
            ssHtml = `<div>Proof: <span class="mono">${escapeHtml(t.ss || 'receipt')}</span></div>`;
          }
        } catch(e) {
          ssHtml = `<div>Proof: <span class="mono">${escapeHtml(t.ss || 'receipt')}</span></div>`;
        }
      } else if (t.ss) {
        ssHtml = `<div>Proof: <span class="mono">${escapeHtml(t.ss)}</span></div>`;
      }
      rows.push(`
      <div class="admin-row col" style="border-color:${t.received ? 'rgba(255,106,0,.45)' : 'rgba(255,255,255,.06)'}">
        <div class="au-info">
          <strong class="mono">${escapeHtml(t.id)}</strong>
          <small>${escapeHtml(t.user)} · ₹${t.amount} · ${new Date(t.createdAt).toLocaleString()}</small>
        </div>
        ${t.received ? '<div class="gold" style="font-weight:700">● UTR &amp; PAYMENT PROOF SUBMITTED — awaiting your confirmation</div>' : ''}
        ${t.utr ? `<div class="gold">UTR / Ref: <span class="mono">${escapeHtml(t.utr)}</span></div>` : ''}
        ${ssHtml}
        <div class="verify-actions">
          <button class="btn btn-sm btn-pay" onclick="window.__ownerVerify('${t.id}')">✓ Verify &amp; Credit</button>
          <button class="btn btn-sm btn-cancel" onclick="window.__ownerReject('${t.id}')">✕ Reject</button>
        </div>
      </div>`);
    }
    ownerVerify.innerHTML = info + (rows.join('') || '<div class="empty-state">No pending transactions</div>');
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
     Cross-device live support syncing via Firestore tickets collection.
     Ensures seamless PC ↔ Mobile session continuation and user ticket isolation. */
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
          <a class="att-dl-btn" href="${m.attach.url}" target="_blank" rel="noopener">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
            Open / Download Video
          </a>
        </div>`;
      } else {
        att = `<a class="att-file-link" href="${m.attach.url}" target="_blank" rel="noopener">
          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          ${escapeHtml(m.attach.name || 'file')}
        </a>`;
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

  /* ─── USER SIDE: create ticket / cross-device live chat / ticket history ─── */
  async function openUserTicketHistory() {
    if (!currentUser) { showToast('Login first'); return; }
    ticketFormPanel.classList.add('hidden');
    ticketChatPanel.classList.add('hidden');
    ticketHistoryPanel.classList.remove('hidden');

    const uLower = currentUser.username.toLowerCase();
    userTicketsList.innerHTML = '<div class="empty-state">Loading your support tickets...</div>';

    let userTicks = [];
    if (fb.fs) {
      try {
        const snap = await fb.fs.collection('tickets')
          .where('user', '==', uLower)
          .get();
        snap.forEach(d => userTicks.push(Object.assign({ id: d.id }, d.data())));
        userTicks.sort((a, b) => (tsNumber(b.lastUpdated) || tsNumber(b.createdAt) || 0) - (tsNumber(a.lastUpdated) || tsNumber(a.createdAt) || 0));
      } catch (err) {
        console.warn('History query fail:', err);
      }
    }

    if (!userTicks.length && Array.isArray(allTickets) && allTickets.length) {
      userTicks = allTickets.filter(t => (t.user || '').toLowerCase() === uLower || (t.username || '').toLowerCase() === uLower);
      userTicks.sort((a, b) => (tsNumber(b.lastUpdated) || tsNumber(b.createdAt) || 0) - (tsNumber(a.lastUpdated) || tsNumber(a.createdAt) || 0));
    }

    if (!userTicks.length) {
      userTicketsList.innerHTML = `
        <div class="empty-state">
          <p>Aapki koi support tickets nahi hain.</p>
          <button class="btn btn-sm btn-primary" style="margin-top:10px" onclick="window.newTicketReset()">+ Create First Ticket</button>
        </div>`;
      return;
    }

    userTicketsList.innerHTML = userTicks.map(t => {
      const st = (t.status || 'OPEN').toUpperCase();
      const stCls = 'st-' + (t.status || 'OPEN').toLowerCase();
      const time = t.lastUpdated ? fmtTickTime(t.lastUpdated) : (t.createdAt ? fmtTickTime(t.createdAt) : '');
      const prev = escapeHtml((t.lastText || 'No message content').slice(0, 80));
      const cat = escapeHtml(t.category || 'Support');
      const isAct = activeTicketId === t.id;
      return `
        <div class="user-tick-item ${isAct ? 'active' : ''}" onclick="window.__selectUserTicket('${t.id}')">
          <div class="user-tick-head">
            <strong>${escapeHtml(t.ticketId || t.id)} <span class="muted2">· ${cat}</span></strong>
            <span class="ticket-status ${stCls}">${st}</span>
          </div>
          <div class="user-tick-preview">${prev}</div>
          <div class="user-tick-foot">
            <span>Last activity: ${time}</span>
            <span class="gold" style="font-weight:700">Open Thread →</span>
          </div>
        </div>`;
    }).join('');
  }

  window.__selectUserTicket = tid => {
    ticketHistoryPanel.classList.add('hidden');
    startTicketThread(tid);
  };

  async function openUserSupport() {
    if (!currentUser) { showToast('Login first'); return; }
    supportModal.classList.remove('hidden');
    const uLower = currentUser.username.toLowerCase();

    // 1. Cross-device continuity: query active OPEN ticket for this user from Firestore
    if (fb.fs) {
      try {
        const snap = await fb.fs.collection('tickets')
          .where('user', '==', uLower)
          .get();

        if (!snap.empty) {
          const list = [];
          snap.forEach(doc => list.push(Object.assign({ id: doc.id }, doc.data())));
          list.sort((a, b) => (tsNumber(b.lastUpdated) || tsNumber(b.createdAt) || 0) - (tsNumber(a.lastUpdated) || tsNumber(a.createdAt) || 0));
          const openTick = list.find(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS');
          if (openTick) {
            activeTicketId = openTick.id;
            localStorage.setItem(ACTIVE_TICKET_KEY, openTick.id);
            startTicketThread(openTick.id);
            return;
          }
        }
      } catch (err) {
        console.warn('Firestore active ticket query:', err);
      }
    }

    if (activeTicketId) {
      startTicketThread(activeTicketId);
      return;
    }

    const u = loadUsers()[currentUser.username] || {};
    if (!tfUid.value) tfUid.value = u.uid || currentUser.username || '';
    ticketHistoryPanel.classList.add('hidden');
    ticketChatPanel.classList.add('hidden');
    ticketFormPanel.classList.remove('hidden');
  }

  function startTicketThread(tid) {
    if (!fb.fs) { showToast('Backend offline — try later'); return; }
    activeTicketId = tid;
    localStorage.setItem(ACTIVE_TICKET_KEY, tid);
    ticketHistoryPanel.classList.add('hidden');
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
          '<div class="rb-ico"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg></div>' +
          '<strong>Ticket Resolved</strong>' +
          '<p>Owner has successfully resolved your ticket.<br>Thank you for your support!</p>' +
          '<button class="btn btn-primary btn-sm" style="margin-top:14px;width:100%" onclick="window.newTicketReset()">+ Start New Ticket</button>' +
          '</div>';
        showToast('Ticket ' + tid + ' resolved by owner ✓');
        return;
      }
      const t = d.data(); if (!t) return;
      ticketBarId.textContent = t.ticketId || tid;
      ticketBarStatus.textContent = t.status || 'OPEN';
      ticketBarStatus.className = 'ticket-status st-' + (t.status || 'OPEN').toLowerCase();

      if (t.status === 'RESOLVED') {
        if (inputRow) inputRow.style.display = 'none';
        supportMsgs.innerHTML =
          '<div class="resolve-banner">' +
          '<div class="rb-ico"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg></div>' +
          '<strong>Ticket Resolved</strong>' +
          '<p>Owner has successfully resolved your ticket.<br>Thank you for your support!</p>' +
          '<button class="btn btn-primary btn-sm" style="margin-top:14px;width:100%" onclick="window.newTicketReset()">+ Start New Ticket</button>' +
          '</div>';
      } else {
        if (inputRow) inputRow.style.display = '';
      }
    });
    tickUserUnsub = () => { msgUnsub(); docUnsub(); };
  }

  async function createTicket() {
    if (!fb.fs) { showToast('Backend offline — try later'); return; }
    const uid = (tfUid.value || '').trim();
    const cat = tfCat.value || 'Other';
    const text = (tfMsg.value || '').trim();
    if (!uid) { showToast('UID / username daalo'); return; }
    if (!text) { showToast('Apni issue describe karo'); return; }
    const tid = genTicketId();
    const now = Date.now();
    try {
      await ticketDoc(tid).set({
        ticketId: tid,
        user: currentUser.username.toLowerCase(),
        username: currentUser.username,
        uid,
        category: cat,
        status: 'OPEN',
        createdAt: now,
        lastUpdated: now,
        lastSender: 'user',
        lastText: text.slice(0, 80)
      });
      await ticketMsgs(tid).add({ sender: 'user', text, timestamp: now });
    } catch (e) { console.warn(e); showToast('Ticket creation failed'); return; }
    tfMsg.value = '';
    startTicketThread(tid);
    showToast('Ticket ' + tid + ' created successfully ✓');
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
    ticketHistoryPanel.classList.add('hidden');
    ticketChatPanel.classList.add('hidden');
    ticketFormPanel.classList.remove('hidden');
    const u = loadUsers()[currentUser.username] || {};
    if (!tfUid.value) tfUid.value = u.uid || currentUser.username || '';
  }
  window.newTicketReset = newTicketReset;

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
        <span class="up-chip">
          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          <b>${escapeHtml(file.name)}</b> (${fmtSize(file.size)})
        </span>
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
    
    universalUpload(file, (b, t) => {
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
    ownerTickUnsub = ticketsCol().onSnapshot(snap => {
      const list = [];
      snap.forEach(d => list.push(Object.assign({ id: d.id }, d.data())));
      list.sort((a, b) => (tsNumber(b.lastUpdated) || tsNumber(b.createdAt) || 0) - (tsNumber(a.lastUpdated) || tsNumber(a.createdAt) || 0));
      allTickets = list;
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
        <div class="tick-item-user">User: ${escapeHtml(t.user || t.username || '—')} · UID: ${escapeHtml(t.uid || '—')}</div>
        <div class="tick-item-preview">${preview}</div>
        <small class="muted2">${lastUp}</small>
      </div>`;
    }).join('') || '<div class="empty-state">No tickets yet</div>';
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
        showToast('Ticket removed');
        return;
      }
      const t = d.data(); if (!t) return;
      tInfo.uid = t.uid || 'User';
      if (!infoEl || !actsEl) return;
      infoEl.innerHTML = `<strong class="mono">${escapeHtml(t.ticketId || rid)}</strong> <span class="muted2">· User: ${escapeHtml(t.user || t.username || '—')} · UID: ${escapeHtml(t.uid || '—')} · ${escapeHtml(t.category || '')}</span>`;
      actsEl.innerHTML = t.status === 'RESOLVED'
        ? `<button class="btn btn-sm btn-ghost" onclick="window.__setTicketStatus('${rid}','OPEN')">↺ Reopen</button>
           <button class="btn btn-sm btn-cancel" onclick="window.__deleteTicket('${rid}')">✕ Purge</button>`
        : `<button class="btn btn-sm btn-ghost" onclick="window.__setTicketStatus('${rid}','IN_PROGRESS')">In-Progress</button>
           <button class="btn btn-sm btn-pay" onclick="window.__setTicketStatus('${rid}','RESOLVED')">✓ Mark Resolved</button>`;
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
    ticketDoc(rid).update({ status: st, lastUpdated: Date.now() }).then(() => {
      showToast('Status → ' + st);
    }).catch(() => showToast('Status update fail'));
  };

  window.__deleteTicket = async rid => {
    if (!fb.fs) return;
    showToast('Deleting ticket...');
    try {
      const snaps = await ticketMsgs(rid).get();
      const dels = [];
      snaps.forEach(s => dels.push(s.ref.delete()));
      await Promise.all(dels);
      await ticketDoc(rid).delete();
      activeSvcTicket = null;
      renderOwnerSvc();
      showToast('Ticket purged successfully');
    } catch(e) {
      console.warn(e);
      showToast('Purge failed');
    }
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
      <div class="oa-av">
        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z"/></svg>
      </div>
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
  if (tfHistoryBtn) tfHistoryBtn.addEventListener('click', openUserTicketHistory);
  if (tfCreateBtn) tfCreateBtn.addEventListener('click', newTicketReset);
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
              <span class="vendor-tag"><img src="assets/img/shopping.png" alt="" class="price-buy-png">${maint ? 'TEMPORARILY UNAVAILABLE' : (off ? fmt(price) + ' (was ' + fmt(base1h) + ')' : '1 HR — ' + fmt(base1h))}</span>
            </div>
            ${matsT.length && !maint ? `<div class="tile-mats">${matsT.map((m, mi) => {
        const ico = m.iconUrl || m.icon || '';
        return `<button class="mat-chip" onclick="window._openTileMat('${p.name.replace(/'/g, "\\'")}',${mi})">${ico ? `<img class="mat-chip-ico" src="${ico}" alt="">` : '📦'} ${m.label}</button>`;
      }).join('')}</div>` : ''}
            ${maint
              ? `<button class="btn btn-sm btn-maint" disabled>Under Maintenance</button>`
              : `<button class="btn btn-primary btn-sm btn-buy" onclick="window.buyItem('${p.name}','panel','${p.img}')">
              <img src="assets/img/shopping.png" alt="Buy" class="btn-buy-png">
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
              <span class="vendor-tag"><img src="assets/img/shopping.png" alt="" class="price-buy-png">${sold ? 'SOLD OUT — wapas kal aayega' : fmt(c.price)}</span>
            </div>
            ${sold
              ? `<button class="btn btn-primary btn-sm btn-maint" disabled>Sold Out</button>`
              : `<button class="btn btn-primary btn-sm btn-buy" onclick="window.buyItem('${c.name}','card','${img}','${c.price}')">
              <img src="assets/img/shopping.png" alt="Buy" class="btn-buy-png">
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
          <span class="dur-price"><img src="assets/img/shopping.png" alt="" class="dur-buy-png">${fmt(shown)}${off ? ' <small class="disc">' + fmt(pr) + '</small>' : ''}</span>
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
    const isPc = PC_PANELS.some(p => p.name === payload.name);

    if (isPc) {
      confirmDurationBuy.disabled = true;
      confirmDurationBuy.innerHTML = '<img src="assets/img/shopping.png" alt="" class="btn-buy-png"> <span>Generating PC Key...</span>';
      showToast('IshuAuth se live PC key generate ho rahi hai...');

      // Map duration to KeyAuth format
      let durParam = '24h';
      let untilParam = null;
      if (idx === 0) durParam = '1h';
      else if (idx === 1) durParam = '12h';
      else if (idx === 2) durParam = '24h';
      else if (idx === 3) durParam = '7d';
      else if (idx === 4) untilParam = Date.now() + 10 * 86400000;
      else if (idx === 5) untilParam = Date.now() + 15 * 86400000;
      else if (idx === 6) untilParam = Date.now() + 25 * 86400000;
      else if (idx === 7) durParam = '30d';
      else if (idx === 8) durParam = 'permanent';

      const genUsername = (currentUser.username.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10) || 'user') + '_' + Math.floor(1000 + Math.random() * 9000);
      const genPassword = 'pc_' + Math.random().toString(36).substring(2, 8);

      const reqBody = {
        key: 'ISHU_fina-Klv1-U4cv-mYUT-714O-Dl5Y-4ABo-ICeF',
        appid: 'APP-1LHEK3',
        username: genUsername,
        password: genPassword,
        type: 'user',
        duration: durParam
      };
      if (untilParam) reqBody.until = untilParam;

      fetch('https://keyuth-web.onrender.com/api/license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
      .then(r => r.json())
      .then(data => {
        confirmDurationBuy.disabled = false;
        confirmDurationBuy.innerHTML = '<img src="assets/img/shopping.png" alt="" class="btn-buy-png"> <span>Confirm Buy</span>';
        if (data && data.ok) {
          currentUser.wallet = wal - cost;
          currentUser.purchases = (currentUser.purchases || 0) + 1;
          saveOrder({
            type: 'panel',
            isPc: true,
            item: fullItem,
            price: cost,
            img: payload.img,
            status: 'success',
            panelUser: genUsername,
            panelPass: genPassword,
            details: `User: ${genUsername} | Pass: ${genPassword}`,
            expires: data.expires || '',
            charged: cost
          });
          commit();
          renderProfile();
          closeAllModals();
          openOrders();
          showToast('🎉 PC Login Credentials Ready! Orders me check karein');
        } else {
          // Fallback: place pending order if server busy
          currentUser.wallet = wal - cost;
          currentUser.purchases = (currentUser.purchases || 0) + 1;
          saveOrder({ type: 'panel', isPc: true, item: fullItem, price: cost, img: payload.img, status: 'pending', charged: cost });
          commit();
          renderProfile();
          closeAllModals();
          showToast('Order placed — KeyAuth offline hone par admin key bhejega');
        }
      })
      .catch(err => {
        console.warn('IshuAuth generation fallback:', err);
        confirmDurationBuy.disabled = false;
        confirmDurationBuy.innerHTML = '<img src="assets/img/shopping.png" alt="" class="btn-buy-png"> <span>Confirm Buy</span>';
        currentUser.wallet = wal - cost;
        currentUser.purchases = (currentUser.purchases || 0) + 1;
        saveOrder({ type: 'panel', isPc: true, item: fullItem, price: cost, img: payload.img, status: 'pending', charged: cost });
        commit();
        renderProfile();
        closeAllModals();
        showToast('Order placed — admin panel key bhejega');
      });
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
  /* ─────────── Order Expiry & Auto-Cleanup Logic ─────────── */
  function getOrderExpiryTime(o) {
    if (!o) return null;
    if (o.expiresAt && typeof o.expiresAt === 'number') return o.expiresAt;
    if (o.expires) {
      if (typeof o.expires === 'number') return o.expires;
      const str = String(o.expires).trim();
      if (str.toLowerCase() === 'permanent' || str.toLowerCase() === 'lifetime') return Infinity;
      const parsed = Date.parse(str.replace(' ', 'T'));
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    // Infer duration from item string (e.g. "Panel · 7 Days") or o.duration
    const durStr = o.duration || (o.item && o.item.includes('·') ? o.item.split('·').pop().trim() : '');
    if (durStr) {
      const d = durStr.toLowerCase();
      if (d.includes('permanent') || d.includes('lifetime')) return Infinity;
      const base = o.deliveredAt || o.acceptedAt || o.ts || Date.now();
      if (d.includes('1 hour')) return base + 1 * 3600 * 1000;
      if (d.includes('12 hour')) return base + 12 * 3600 * 1000;
      if (d.includes('1 day')) return base + 24 * 3600 * 1000;
      if (d.includes('7 day')) return base + 7 * 86400 * 1000;
      if (d.includes('10 day')) return base + 10 * 86400 * 1000;
      if (d.includes('15 day')) return base + 15 * 86400 * 1000;
      if (d.includes('25 day')) return base + 25 * 86400 * 1000;
      if (d.includes('30 day')) return base + 30 * 86400 * 1000;
    }
    return null;
  }

  // 1 Day grace after expiration (auto-deleted on 2nd day)
  const ORDER_EXPIRY_GRACE_MS = 24 * 60 * 60 * 1000;

  function purgeExpiredOrders() {
    const orders = loadOrders();
    const now = Date.now();
    const active = orders.filter(o => {
      const expTime = getOrderExpiryTime(o);
      if (!expTime || expTime === Infinity) return true; // Keep permanent or pending
      // If now is strictly beyond expiration + 24h grace window, purge it
      if (now >= expTime + ORDER_EXPIRY_GRACE_MS) {
        return false;
      }
      return true;
    });
    if (active.length !== orders.length) {
      saveOrders(active);
    }
    return active;
  }

  function renderOrders() {
    const orders = purgeExpiredOrders()
      .filter(o => o.user === currentUser.username)
      .sort((a, b) => b.ts - a.ts);
    if (!orders.length) {
      ordersList.innerHTML = '<p class="orders-empty">No orders yet</p>';
      return;
    }
    const now = Date.now();
    ordersList.innerHTML = orders.map(o => {
      const st = String(o.status || 'pending').toLowerCase();
      const stLabel = st.toUpperCase();
      const expTime = getOrderExpiryTime(o);
      const hasKey = !!(o.panelUser || o.panelPass || (o.details && o.type === 'panel') || o.expires);

      let keyStatusBadge = '';
      if (hasKey && expTime) {
        if (expTime === Infinity) {
          keyStatusBadge = `<span class="badge-key-status badge-active">🟢 ACTIVE · LIFETIME</span>`;
        } else if (now < expTime) {
          const leftMs = expTime - now;
          const days = Math.floor(leftMs / (24 * 3600 * 1000));
          const hrs = Math.floor((leftMs % (24 * 3600 * 1000)) / 3600000);
          const timeLabel = days > 0 ? `${days}d ${hrs}h left` : `${hrs}h left`;
          keyStatusBadge = `<span class="badge-key-status badge-active">🟢 ACTIVE · ${timeLabel}</span>`;
        } else {
          keyStatusBadge = `<span class="badge-key-status badge-expired">🔴 EXPIRED</span>`;
        }
      }

      return `
        <div class="order-item col">
          <div class="order-main">
            <img src="${o.img || ''}" alt="" class="order-img" onerror="this.style.display='none'">
            <div class="order-info">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <strong>${escapeHtml(o.item)}</strong>
                ${keyStatusBadge}
              </div>
              <small>${o.id} · ${currentUser.uid || ''} · ${new Date(o.ts).toLocaleString('en-IN', { day: '2-digit', month: 'short' })}</small>
            </div>
            <div class="order-right">
              <span class="order-price">${fmt(o.price)}</span>
              <span class="order-status ${st}">${stLabel}</span>
            </div>
          </div>
          ${st === 'accepted' ? '<div class="order-note">✅ Order accept ho gaya — admin jaldi bhejega</div>' : ''}
          ${o.details ? `
            <div class="order-note gold" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <b>${o.type === 'panel' ? (o.isPc ? '💻 PC LOGIN CREDENTIALS:' : '🔑 PANEL KEY:') : 'CARD DETAILS:'}</b>
                  ${keyStatusBadge}
                </div>
                ${o.panelUser && o.panelPass ? `
                  <div style="margin-top:4px; font-size:12.5px;">
                    <div>User: <span class="mono" style="background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px; font-weight:700; user-select:all;">${escapeHtml(o.panelUser)}</span></div>
                    <div style="margin-top:2px;">Pass: <span class="mono" style="background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px; font-weight:700; user-select:all;">${escapeHtml(o.panelPass)}</span></div>
                  </div>
                ` : `<span class="mono" style="background:rgba(0,0,0,0.4); padding:3px 6px; border-radius:4px; font-weight:700; user-select:all;">${escapeHtml(o.details)}</span>`}
                ${o.expires ? `<small style="display:block; color:#9da6be; margin-top:3px;">Expiry Date: ${escapeHtml(String(o.expires))}</small>` : ''}
                ${expTime && expTime !== Infinity && now >= expTime ? `<small style="display:block; color:#ff6b6b; margin-top:2px; font-weight:700;">⚠️ Key expire ho chuka hai. 24 hours baad ye order auto-delete ho jayega.</small>` : ''}
              </div>
              <div style="display:flex; gap:5px;">
                ${o.panelUser && o.panelPass ? `
                  <button class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px;" onclick="navigator.clipboard.writeText('${o.panelUser}').then(() => showToast('Username copied ✅'))">📋 User</button>
                  <button class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px;" onclick="navigator.clipboard.writeText('${o.panelPass}').then(() => showToast('Password copied ✅'))">📋 Pass</button>
                ` : `<button class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px;" onclick="navigator.clipboard.writeText('${o.details}').then(() => showToast('Copied ✅'))">📋 Copy</button>`}
              </div>
            </div>` : ''}
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

  /* ─────────── Transactions (30-Day Auto-Cleanup) ─────────── */
  const TXN_RETENTION_MS = 30 * 24 * 60 * 60 * 1000; // 30 Days

  function purgeOldTxns() {
    const all = loadTxns();
    const now = Date.now();
    const fresh = all.filter(t => {
      const time = t.createdAt || t.ts || now;
      return (now - time) <= TXN_RETENTION_MS;
    });
    if (fresh.length !== all.length) {
      saveTxns(fresh);
    }
    return fresh;
  }

  function getMyTxns() {
    if (!currentUser) return [];
    const all = purgeOldTxns();
    return all.filter(t => t.user === currentUser.username).sort((a, b) => (b.createdAt || b.ts || 0) - (a.createdAt || a.ts || 0));
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
            ? `<div class="txn-foot">${t.utr ? 'UTR: ' + t.utr : ''}${t.utr && t.ss ? ' · ' : ''}${t.ss ? 'Payment proof attached' : ''} — submitted, awaiting admin verification${t.ssUrl ? `<img class="shot-thumb" src="${t.ssUrl}" alt="Proof" onclick="window.open('${t.ssUrl}')">` : (t.ssKey ? `<img class="shot-thumb hidden" data-key="${t.ssKey}" alt="">` : '')}</div>`
            : `
            <div class="txn-timerbar" data-txn="${t.id}">
              <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
              <span class="timer-txt">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Time left — ${timeStr}
              </span>
            </div>

            <div class="txn-verify">
              <input id="utr_${t.id}" class="txn-input" placeholder="UTR / Payment reference">
              <label class="txn-shot-label">
                <input type="file" accept="image/*,video/*" id="shot_${t.id}" class="hs" hidden>
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4m0 0l-5 5m5-5l5 5"/><path d="M4 20h16"/></svg>
                Proof (Screenshot/Video)
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
              ? `<div class="txn-foot">${t.utr ? 'UTR: ' + t.utr : ''}${t.utr && t.ss ? ' · ' : ''}${t.ss ? 'Proof attached' : ''}</div>`
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
    if (file.size > 200 * 1048576) { showToast('File 200MB se choti rakho'); return Promise.resolve(''); }
    const item = document.getElementById('shot_' + id)?.closest('.txn-item');
    let wrap = item && item.querySelector('.up-prog');
    if (wrap) wrap.remove();
    if (item) {
      wrap = document.createElement('div');
      wrap.className = 'up-prog';
      wrap.innerHTML = `
        <div class="up-prog-head">
          <span class="up-chip">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            <b>${escapeHtml(file.name)}</b> (${fmtSize(file.size)})
          </span>
          <span class="up-state wait">0%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:0%"></div></div>`;
      const place = item.querySelector('.txn-verify') || item;
      place.insertAdjacentElement('afterend', wrap);
    }
    const fill = wrap ? wrap.querySelector('.progress-fill') : null;
    const st = wrap ? wrap.querySelector('.up-state') : null;

    const ssKey = 'ss_' + id.toLowerCase();
    filePut(ssKey, file).then(() => {
      const list = loadTxns();
      const rec = list.find(t => t.id === id);
      if (rec && !rec.ssKey) { rec.ssKey = ssKey; saveTxns(list); }
    }).catch(() => {});

    const p = universalUpload(file, (b, t) => {
      if (!wrap) return;
      const pct = Math.min(100, Math.round((b / (t || 1)) * 100));
      if (fill) fill.style.width = pct + '%';
      if (st) st.textContent = pct + '%';
    }).then(url => {
      if (wrap) {
        if (fill) fill.style.width = '100%';
        if (st) { st.textContent = '✓ Ready'; st.classList.remove('wait'); }
      }
      txnUpls[id] = { done: true, url: url || '' };
      if (url) {
        const list = loadTxns();
        const rec = list.find(t => t.id === id);
        if (rec) {
          rec.ssUrl = url;
          rec.ss = file.name;
          rec.ssType = file.type || '';
          saveTxns(list);
        }
      }
      showToast('Proof upload successful ✓ — ab Verify & Submit dabao');
      if (wrap) setTimeout(() => { if (wrap && wrap.parentNode) wrap.remove(); }, 2500);
      return url || '';
    }).catch(err => {
      console.warn('Proof upload err:', err);
      if (st) { st.textContent = 'Upload fail'; st.classList.add('err'); }
      showToast('Upload fail — phir try karo');
      return '';
    });

    txnUpls[id] = { done: false, url: '', p };
    return p;
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
    const utr = (document.getElementById('utr_' + id)?.value || '').trim();
    const shot = document.getElementById('shot_' + id)?.files[0];
    if (!utr) { showToast('Enter the UTR number'); return; }
    const all = loadTxns();
    const hit = all.find(t => t.id === id);
    if (hit && hit.status === 'pending') {
      let ssUrl = hit.ssUrl || '';
      if (shot && !ssUrl) {
        if (txnUpls[id] && txnUpls[id].done && txnUpls[id].url) {
          ssUrl = txnUpls[id].url;
        } else {
          showToast('Uploading proof...');
          ssUrl = await prepareTxnShot(id, shot);
        }
      }
      hit.received = true;
      hit.utr = utr;
      if (shot && !hit.ss) hit.ss = shot.name;
      if (shot && !hit.ssKey) hit.ssKey = 'ss_' + hit.id.toLowerCase();
      if (ssUrl) hit.ssUrl = ssUrl;
      if (shot) hit.ssType = shot.type || '';
      saveTxns(all);
      renderTxns();
      showToast('UTR + proof submitted — admin will verify & credit wallet ✓');
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
    if (videoPlayer) {
      if (!videoPlayer.paused) videoPlayer.pause();
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
    }
    if (videoIframe) {
      videoIframe.src = '';
    }
    const errBox = $('videoErrorState');
    if (errBox) errBox.classList.add('hidden');
    const spinner = $('videoSpinner');
    if (spinner) spinner.classList.add('hidden');
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

  /* Helper to wipe all test user accounts on request */
  window.__wipeTestUsers = async function() {
    if (fb.fs) {
      try {
        const snap = await fb.fs.collection('users').get();
        const batch = fb.fs.batch();
        snap.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log('[Firestore] All users wiped');
      } catch(e) {
        console.warn('Wipe users fail:', e);
      }
    }
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(TXN_KEY);
    localStorage.removeItem(ACTIVE_TICKET_KEY);
    showToast('All accounts wiped for fresh registration');
  };

  /* ─────────── Session Restore & Preloader Control ─────────── */
  function restoreSavedSession() {
    if (localStorage.getItem(SESSION_OWNER_KEY) === 'true') {
      currentOwner = true;
      Object.keys(ownerSeen).forEach(k => delete ownerSeen[k]);
      watchTickets();
      loginPage.classList.add('hidden');
      app.classList.add('hidden');
      ownerPage.classList.remove('hidden');
      renderOwner('dash');
      return true;
    }
    const savedUname = localStorage.getItem(SESSION_USER_KEY);
    if (savedUname) {
      const users = loadUsers();
      const u = users[savedUname.toLowerCase()] || Object.values(users).find(x => (x.username || '').toLowerCase() === savedUname.toLowerCase());
      if (u && !u.banned) {
        currentUser = u;
        enterStore();
        return true;
      }
    }
    return false;
  }

  function hidePreloader() {
    const preloader = document.getElementById('appPreloader');
    if (!preloader) return;
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 550);
  }

  window.showAppLoading = function(statusMsg) {
    const preloader = document.getElementById('appPreloader');
    const txt = document.getElementById('preloaderStatusText');
    if (!preloader) return;
    if (statusMsg && txt) txt.textContent = statusMsg;
    preloader.style.display = 'flex';
    preloader.classList.remove('fade-out');
  };

  /* ─────────── Custom Confirm Dialog (Replaces native browser popup) ─────────── */
  window.customConfirm = function(msg, options = {}) {
    return new Promise(resolve => {
      const modal = document.getElementById('customConfirmModal');
      const titleEl = document.getElementById('confirmDialogTitle');
      const msgEl = document.getElementById('confirmDialogMessage');
      const okBtn = document.getElementById('confirmOkBtn');
      const cancelBtn = document.getElementById('confirmCancelBtn');
      const iconWrap = document.getElementById('confirmIconWrap');

      if (!modal) {
        resolve(window.confirm(msg));
        return;
      }

      const title = typeof options === 'string' ? options : (options.title || 'CONFIRM ACTION');
      const okText = options.okText || 'Yes, Confirm';
      const cancelText = options.cancelText || 'Cancel';
      const isDanger = options.danger !== false;

      if (titleEl) titleEl.textContent = title;
      if (msgEl) msgEl.innerHTML = String(msg).replace(/\n/g, '<br>');
      if (okBtn) okBtn.textContent = okText;
      if (cancelBtn) cancelBtn.textContent = cancelText;

      if (iconWrap) {
        iconWrap.className = isDanger ? 'confirm-icon-wrap danger' : 'confirm-icon-wrap';
      }
      if (okBtn) {
        okBtn.className = isDanger ? 'btn btn-cancel' : 'btn btn-primary';
      }

      modal.classList.remove('hidden');

      const cleanup = val => {
        modal.classList.add('hidden');
        okBtn && okBtn.removeEventListener('click', onOk);
        cancelBtn && cancelBtn.removeEventListener('click', onCancel);
        resolve(val);
      };

      const onOk = () => cleanup(true);
      const onCancel = () => cleanup(false);

      okBtn && okBtn.addEventListener('click', onOk);
      cancelBtn && cancelBtn.addEventListener('click', onCancel);
    });
  };

  /* ─────────── Subtle Mouse Cursor Glow & Click Ripple ─────────── */
  function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mouseX = -9999, mouseY = -9999;
    let currentX = -9999, currentY = -9999;
    let isMoving = false;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        glow.classList.add('active');
        isMoving = true;
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      glow.classList.remove('active');
      isMoving = false;
    });

    window.addEventListener('mousedown', e => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 480);
    }, { passive: true });

    function animateGlow() {
      if (isMoving) {
        currentX += (mouseX - currentX) * 0.16;
        currentY += (mouseY - currentY) * 0.16;
        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
  }

  /* ─────────── Init ─────────── */
  fbInit();
  setAuthMode('login');
  renderGrid();
  initCursorGlow();

  const sessionActive = restoreSavedSession();
  if (!sessionActive) {
    loginPage.classList.remove('hidden');
    app.classList.add('hidden');
  }

  setTimeout(hidePreloader, 650);

  /* One-time clean: Reset all old test accounts for fresh universal registration */
  if (!localStorage.getItem('ishu_users_clean_v5')) {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(TXN_KEY);
    localStorage.removeItem(ACTIVE_TICKET_KEY);
    localStorage.setItem('ishu_users_clean_v5', '1');
  }
});