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
  const pcBadgeImg     = $('pcBadgeImg');
  const pcCam          = $('pcCam');
  const dpFile         = $('dpFile');
  const pcBadgeBtn     = $('pcBadgeBtn');
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

  const loadUsers  = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch(e) { return {}; } };
  const saveUsers  = u => localStorage.setItem(USERS_KEY, JSON.stringify(u));
  const loadOrders = () => { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch(e) { return []; } };
  const saveOrders = o => localStorage.setItem(ORDERS_KEY, JSON.stringify(o));
  const loadTxns   = () => { try { return JSON.parse(localStorage.getItem(TXN_KEY)) || []; } catch(e) { return []; } };
  const saveTxns   = t => localStorage.setItem(TXN_KEY, JSON.stringify(t));
  const loadSupport= () => { try { return JSON.parse(localStorage.getItem(SUPPORT_KEY)) || []; } catch(e) { return []; } };
  const saveSupport= s => localStorage.setItem(SUPPORT_KEY, JSON.stringify(s));
  const loadMaint  = () => { try { return JSON.parse(localStorage.getItem(MAINT_KEY)) || {}; } catch(e) { return {}; } };
  const saveMaint  = m => localStorage.setItem(MAINT_KEY, JSON.stringify(m));
  const isMaintenance = name => !!loadMaint()[name];
  const TXN_MINUTES = 10;

  /* ─────────── Store editor (owner: panel links / photos / cards sold out) ─────────── */
  const EDITOR_KEY = 'ishu_store_editor';
  const loadEdits = () => { try { return JSON.parse(localStorage.getItem(EDITOR_KEY)) || { panels: {}, cards: {} }; } catch(e) { return { panels: {}, cards: {} }; } };
  const saveEdits = e => localStorage.setItem(EDITOR_KEY, JSON.stringify(e));
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

  function doAuth() {
    const username = (loginName.value || '').trim().toLowerCase();
    const pass = loginPass.value || '';
    if (!username || !pass) { showToast('Enter username and password'); return; }

    const users = loadUsers();

    if (authMode === 'register') {
      if (users[username]) { showToast('Username taken — try another'); return; }
      currentUser = {
        username, uid: 'USR-' + Date.now().toString(36).toUpperCase(), name: username, pass, email: username + '@store.xyz', photo: '',
        wallet: 0, deposits: 0, premiumUntil: 0, purchases: 0, banned: false, createdAt: Date.now()
      };
      saveUsers({ ...users, [username]: currentUser });
      showToast('Account created — Welcome!');
      enterStore();
      return;
    }

    const u = users[username];
    if (!u) { showToast('No account found — register first'); setAuthMode('register'); return; }
    if (u.pass !== pass) { showToast('Wrong password'); return; }
    if (u.banned) { showToast('This account has been banned'); return; }
    if (!u.uid) u.uid = 'USR-' + Date.now().toString(36).toUpperCase();
    currentUser = u;
    enterStore();
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
    if (pcBadgeImg) pcBadgeImg.src = bImg;
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
  if (pcBadgeBtn) pcBadgeBtn.addEventListener('click', openBadgeModal);
  if (pcBadgeLink) pcBadgeLink.addEventListener('click', openBadgeModal);

  /* ─────────── Profile photo (DP) change ─────────── */
  function pickDp() { dpFile.click(); }
  if (pcCam) pcCam.addEventListener('click', e => { e.stopPropagation(); pickDp(); });
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
    loadSupport().forEach(t => { if (t.msgs && t.msgs.length) ownerSeen[t.id] = t.msgs[t.msgs.length - 1].ts || 0; });
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
    const support = loadSupport();
    const pending = txns.filter(t => t.status === 'pending');
    const openTickets = support.filter(t => !t.closed);
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

  window.__pickPanelVideo = (name, input) => {
    const f = input.files[0];
    if (!f) return;
    showToast('Video upload ho raha hai — big file bhi chalega (IndexedDB)...');
    const vid = 'vid_' + Date.now().toString(36) + '_' + name;
    filePut(vid, f).then(() => {
      const edits = loadEdits();
      edits.panels[name] = edits.panels[name] || {};
      if (edits.panels[name].videoId) fileDel(edits.panels[name].videoId).catch(()=>{});
      edits.panels[name].videoId = vid;
      edits.panels[name].videoName = f.name;
      delete edits.panels[name].videoUrl;
      saveEdits(edits);
      showToast('Video uploaded ✅ — tile pe play button aa gaya');
      renderOwner('panels');
      renderGrid();
    }).catch(() => showToast('Video upload failed — try again'));
    input.value = '';
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
    const pending = [];
    for (const row of Array.from(rows)) {
      const j = row.getAttribute('data-j');
      const f = (window._apkFiles || {})[i + '_' + j];
      if (f) {
        const apkId = 'mat_' + Date.now().toString(36) + '_' + i + '_' + j;
        await filePut(apkId, f);
        row.setAttribute('data-apkid', apkId);
        row.setAttribute('data-apkname', f.name.replace(/"/g, '&quot;'));
        delete window._apkFiles[i + '_' + j];
      }
    }
    const mats = Array.from(rows).map(row => {
      const label = row.querySelector('.mat-label').value.trim();
      const url = row.querySelector('.mat-url').value.trim();
      const apkId = row.getAttribute('data-apkid') || '';
      const apkName = (row.getAttribute('data-apkname') || '').replace(/&quot;/g, '"');
      return {
        label: label || (apkId ? (apkName || 'APK File') : (url ? 'Open Link' : '')),
        url, apkId, apkName,
        icon: (row.getAttribute('data-icon') || '').replace(/&quot;/g, '"'),
        iconUrl: (row.querySelector('.mat-icon-url').value || '').trim()
      };
    }).filter(m => m.label || m.url || m.apkId);
    edits.panels[name] = edits.panels[name] || {};
    edits.panels[name].mats = mats;
    saveEdits(edits);
    showToast(name + ' saved — LIVE reflect ho gaya ✅');
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
      if (t.ssKey) {
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

  /* ─────────── OWNER: SERVICE REQUESTS ─────────── */
  function renderOwnerSvc() {
    if (activeSvcTicket) { window.__openTicket(activeSvcTicket); return; }
    const support = loadSupport().sort((a, b) => (b.msgs[b.msgs.length-1]?.ts || 0) - (a.msgs[a.msgs.length-1]?.ts || 0));
    ownerSvc.innerHTML = support.map(t => {
      const last = t.msgs[t.msgs.length - 1];
      const lastText = last?.attach ? '📎 ' + last.attach.name : (last?.text || '');
      const ui = loadUsers()[t.user] || {};
      const uname = ui.name || t.user;
      const av = ui.photo ? `<img class="chat-av" src="${ui.photo}" alt="">` : `<div class="chat-av chat-av-txt">${escapeHtml((uname || 'U')[0]).toUpperCase()}</div>`;
      return `
      <div class="admin-row col svc-row" onclick="window.__openTicket('${t.id}')" style="cursor:pointer">
        <div class="svc-row-head">
          ${av}
          <div class="au-info">
            <strong>${uname}</strong>
            <small class="mono">${ui.uid || '—'} · ${t.user}</small>
          </div>
        </div>
        <div class="svc-preview">${lastText.slice(0, 80)}</div>
        ${!t.closed ? '<span class="gold" style="font-size:11px">Click to open →</span>' : '<div class="muted2">Closed</div>'}
      </div>`;
    }).join('') || '<div class="empty-state">No service requests yet</div>';
  }

  window.__openTicket = ticketId => {
    activeSvcTicket = ticketId;
    const support = loadSupport();
    const t = support.find(x => x.id === ticketId);
    if (!t) { activeSvcTicket = null; renderOwnerSvc(); return; }
    const uinfo = loadUsers()[t.user] || {};
    const uname = uinfo.name || t.user;
    const uid = uinfo.uid || '—';
    ownerSvc.innerHTML = `
      <div class="svc-thread">
        <button class="btn btn-sm btn-ghost" onclick="activeSvcTicket=null;renderOwnerSvc()" style="margin-bottom:10px">← Back to list</button>
        <div class="svc-user-label">Chat with <strong>${uname}</strong> · <span class="mono">${uid}</span> (${t.msgs.length} messages)</div>
        <div class="svc-thread-msgs" id="svcThreadMsgs"></div>
        <div class="svc-reply-row">
          <label class="chat-attach">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8M1 3h22v6H1zM10 12h4"/></svg>
            <input type="file" id="svcReplyFile" accept="image/*,video/*,.pdf,.rar,.zip" hidden>
          </label>
          <input id="svcReplyInput" class="chat-input" type="text" placeholder="Type a reply..." maxlength="500">
          <button class="chat-send" onclick="window.__sendOwnerReply('${t.id}')">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>`;
    const msgsEl = document.getElementById('svcThreadMsgs');
    const render = async () => {
      const html = [];
      for (const m of t.msgs) html.push(await msgHtml(m, t.user));
      msgsEl.innerHTML = html.join('');
      msgsEl.scrollTop = msgsEl.scrollHeight;
    };
    render();
    const rfile = document.getElementById('svcReplyFile');
    if (rfile) rfile.addEventListener('change', async () => {
      const file = rfile.files[0];
      rfile.value = '';
      if (!file) return;
      const key = 'supo_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
      try { await filePut(key, file); } catch (e) { showToast('File save failed'); return; }
      t.msgs.push({ from: 'owner', text: '', ts: Date.now(), attach: { name: file.name, type: file.type, size: file.size, key } });
      saveSupport(loadSupport());
      window.__openTicket(ticketId);
      showToast('Reply + file delivered');
    });
  };

  window.__sendOwnerReply = ticketId => {
    const input = document.getElementById('svcReplyInput');
    const text = input?.value.trim();
    if (!text) { showToast('Type a message first'); return; }
    const support = loadSupport();
    const t = support.find(x => x.id === ticketId);
    if (!t) return;
    t.msgs.push({ from: 'owner', text, ts: Date.now() });
    saveSupport(support);
    showToast('Reply delivered');
    window.__openTicket(ticketId);
  };

  /* ─────────── OWNER LIVE ALERT (WhatsApp style popup) ─────────── */
  const ownerSeen = {};
  function showOwnerAlert(t) {
    const uinfo = loadUsers()[t.user] || {};
    const uname = uinfo.name || t.user;
    const uid = uinfo.uid || '—';
    const last = t.msgs[t.msgs.length - 1];
    const text = last.attach ? '📎 ' + last.attach.name : (last.text || '');
    const el = document.createElement('div');
    el.className = 'owner-alert';
    el.innerHTML = `
      <div class="oa-av">${uinfo.photo ? `<img src="${uinfo.photo}" alt="">` : '<span>' + escapeHtml(uname[0] || '?').toUpperCase() + '</span>'}</div>
      <div class="oa-body">
        <strong>${escapeHtml(uname)}</strong> <span class="mono">${uid}</span>
        <p>${escapeHtml(text.slice(0, 70))}</p>
      </div>
      <button class="oa-close" title="dismiss">✕</button>`;
    el.querySelector('.oa-close').addEventListener('click', e => { e.stopPropagation(); el.remove(); });
    el.addEventListener('click', () => { el.remove(); openOwnerTicket(t.id); });
    ownerAlerts.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => el.remove(), 15000);
  }
  function checkOwnerAlerts() {
    if (!currentOwner) return;
    const support = loadSupport();
    support.forEach(t => {
      if (!t.msgs || !t.msgs.length) return;
      const last = t.msgs[t.msgs.length - 1];
      if ((ownerSeen[t.id] || 0) >= (last.ts || 0)) return;
      ownerSeen[t.id] = last.ts || 0;
      if (last.from === 'owner') return;
      const viewing = !ownerSvc.classList.contains('hidden') && activeSvcTicket === t.id;
      if (!viewing) showOwnerAlert(t);
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
    showToast('Service request khul gayi');
  }

  /* ─────────── LIVE STORE REFRESH (owner edits reflect without reload) ─────────── */
  let lastStoreSig = '';
  function storeSig() { return JSON.stringify(loadEdits()) + '|' + JSON.stringify(loadMaint()); }
  function refreshLiveStore() {
    if (!currentUser || currentOwner) return;
    const sig = storeSig();
    if (sig !== lastStoreSig) { lastStoreSig = sig; renderGrid(); }
  }

  /* ─────────── CUSTOMER SUPPORT CHAT ─────────── */
  function closeSupportModal() { supportModal.classList.add('hidden'); }

  closeSupportBtn.addEventListener('click', closeSupportModal);

  supportFab.addEventListener('click', () => {
    if (!currentUser) { showToast('Login first'); return; }
    supportModal.classList.remove('hidden');
    renderSupportChat();
  });

  function myTicket() {
    const support = loadSupport();
    let t = support.find(x => x.user === currentUser.username);
    if (!t) {
      t = { id: 'SRV-' + Date.now().toString(36).toUpperCase(), user: currentUser.username, msgs: [], closed: false };
      support.push(t);
      saveSupport(support);
    }
    return t;
  }

  const supObjUrls = {};
  function fmtSize(n) { n = n || 0; return n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : n > 1024 ? (n / 1024).toFixed(0) + ' KB' : n + ' B'; }

  async function attachHtml(m, mine) {
    if (!m.attach) return '';
    const a = m.attach;
    if (!a.key) return `<div class="att">📎 ${escapeHtml(a.name)}</div>`;
    const old = supObjUrls[a.key];
    if (old) URL.revokeObjectURL(old);
    try {
      const blob = await fileGet(a.key);
      if (!blob) return `<div class="att">📎 ${escapeHtml(a.name)}</div>`;
      const url = URL.createObjectURL(blob);
      supObjUrls[a.key] = url;
      const cls = mine ? 'att-mine' : 'att-theirs';
      if (a.type && a.type.startsWith('image/')) return `<img class="att-preview" src="${url}" alt="${escapeHtml(a.name)}">`;
      if (a.type && a.type.startsWith('video/')) return `<video class="att-video" src="${url}" controls preload="metadata"></video>`;
      return `<a class="att-file-link ${cls}" href="${url}" download="${escapeHtml(a.name)}"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/></svg> ${escapeHtml(a.name)} (${fmtSize(a.size)}) — Download</a>`;
    } catch (e) {
      return `<div class="att">📎 ${escapeHtml(a.name)}</div>`;
    }
  }

  function userAvatar(username) {
    const u = loadUsers()[username] || {};
    if (u.photo) return `<img class="chat-av" src="${u.photo}" alt="">`;
    const ch = escapeHtml((u.name || username || 'U')[0]).toUpperCase();
    return `<div class="chat-av chat-av-txt">${ch}</div>`;
  }

  function msgMeta(uinfo, m) {
    const uname = escapeHtml(uinfo.name || uinfo.username || 'User');
    const uid = escapeHtml(uinfo.uid || '—');
    const t = new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `<div class="msg-meta"><span class="mn">${uname}</span> · <span class="mid">${uid}</span> · ${t}</div>`;
  }

  async function msgHtml(m, ticketUser) {
    if (m.from === 'owner') {
      const t = await attachHtml(m, false);
      return `<div class="msg owner-msg">
        <img class="chat-av" src="assets/img/logo/login-logo.png" alt="Owner">
        <div class="msg-c">
          <div class="bubble">${escapeHtml(m.text) || ''}${t}</div>
          <div class="msg-meta"><span class="mn">OWNER (ADMIN)</span> · ${new Date(m.ts).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
        </div>
      </div>`;
    }
    const uname = ticketUser || m.user || currentUser.username || 'User';
    const uinfo = loadUsers()[uname] || { name: uname };
    const t = await attachHtml(m, true);
    return `<div class="msg user-msg">
      <div class="msg-c">
        <div class="bubble">${escapeHtml(m.text) || ''}${t}</div>
        ${msgMeta(uinfo, m)}
      </div>
      ${userAvatar(uname)}
    </div>`;
  }

  async function renderSupportChat() {
    const t = myTicket();
    if (t.msgs.length) {
      const html = [];
      for (const m of t.msgs) html.push(await msgHtml(m, currentUser.username));
      supportMsgs.innerHTML = html.join('');
    } else {
      supportMsgs.innerHTML = `
        <div class="msg owner-msg">
          <img class="chat-av" src="assets/img/logo/login-logo.png" alt="Owner">
          <div class="msg-c">
            <div class="bubble">Hi! 👋 How can we help you? Send your payment screenshot, video or UTR here.</div>
          </div>
        </div>`;
    }
    supportMsgs.scrollTop = supportMsgs.scrollHeight;
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  supportSend.addEventListener('click', sendSupportMsg);
  supportMsgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendSupportMsg(); });
  supportFile.addEventListener('change', async () => {
    const file = supportFile.files[0];
    supportFile.value = '';
    if (!file) return;
    const key = 'sup_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
    try { await filePut(key, file); } catch (e) { showToast('File save failed'); return; }
    const support = loadSupport();
    const t = myTicket();
    t.msgs.push({ from: 'user', text: '', ts: Date.now(), user: currentUser.username, attach: { name: file.name, type: file.type, size: file.size, key } });
    saveSupport(support);
    renderSupportChat();
    showToast('File sent — owner dekh paayega ✓');
  });

  function sendSupportMsg() {
    const text = supportMsgInput.value.trim();
    if (!text) return;
    const support = loadSupport();
    const t = myTicket();
    t.msgs.push({ from: 'user', text, ts: Date.now(), user: currentUser.username });
    supportMsgInput.value = '';
    saveSupport(support);
    renderSupportChat();
  }

  /* Zero-delay: storage event fires the instant localStorage changes (owner ↔ user, same browser tabs) */
  window.addEventListener('storage', e => {
    if (e.key === SUPPORT_KEY) {
      if (currentUser && !supportModal.classList.contains('hidden')) renderSupportChat();
      if (currentOwner) checkOwnerAlerts();
    }
  });

  /* Live refresh: owner replies appear instantly (same browser). Real zero-delay across devices needs a backend/host. */
  setInterval(() => {
    if (!supportModal.classList.contains('hidden') && currentUser) renderSupportChat();
    if (currentOwner && !ownerSvc.classList.contains('hidden')) renderOwnerSvc();
    checkOwnerAlerts();
    refreshLiveStore();
  }, 2000);

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
            ${panelVid && !maint ? `<button class="tile-play" title="Panel demo dekho" onclick="event.stopPropagation(); window.__playPanelVideo('${p.name.replace(/'/g, "\\'")}')">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>` : ''}
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
            ? `<div class="txn-foot">${t.utr ? 'UTR: ' + t.utr : ''}${t.utr && t.ss ? ' · ' : ''}${t.ss ? 'Screenshot attached' : ''} — submitted, awaiting admin verification${t.ssKey ? `<img class="shot-thumb hidden" data-key="${t.ssKey}" alt="">` : ''}</div>`
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
      hit.received = true;
      hit.utr = utr;
      if (shot) {
        const ssKey = 'ss_' + hit.id.toLowerCase();
        try { await filePut(ssKey, shot); hit.ss = shot.name; hit.ssKey = ssKey; }
        catch(e) { showToast('Screenshot save failed'); }
      }
      saveTxns(all);
      renderTxns();
      showToast('UTR + screenshot sent — admin verify kar ke credit karega');
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
  setAuthMode('login');
  renderGrid();

  /* One-time clean: sabhi test accounts ka balance/deposits reset (v2 pricing ke liye) */
  if (!localStorage.getItem('ishu_reset_v2')) {
    const users = loadUsers();
    Object.keys(users).forEach(k => {
      users[k].wallet = 0;
      users[k].deposits = 0;
      users[k].premiumUntil = 0;
      users[k].purchases = 0;
    });
    saveUsers(users);
    localStorage.setItem('ishu_reset_v2', '1');
    localStorage.removeItem(ORDERS_KEY);
  }
});