/* ============================================================================
   3A 娛樂城 — 首頁內容資料檔 (SINGLE SOURCE OF CONTENT)
   ----------------------------------------------------------------------------
   本檔是整個首頁「可程式化」的核心。所有文字 / 連結 / 圖片 / 分類都集中在這裡，
   想改任何內容只要改這個檔案 → 版面自動套用，不必動 HTML/CSS/JS。

   資料來源：透過 Wix Blog / Site-Properties / Media API 從
   3acasinoonline.com.tw（Wix 站台）抓取的「真實」品牌、分類與文章。
   之後要換文章或分類，改這裡的陣列即可。
   ========================================================================== */

window.SITE = {
  /* 站台基本設定 ---------------------------------------------------------- */
  config: {
    officialSite: 'https://www.3acasinoonline.com.tw',   // 正式站
    postBase: 'https://www.3acasinoonline.com.tw/post/',  // 文章網址前綴 + slug
    catBase:  'https://www.3acasinoonline.com.tw/blog/categories/', // 分類頁前綴 + slug
    lineId: '_aaa1788',                                   // 官方 LINE 客服 ID
    lineUrl: 'https://line.me/ti/p/~_aaa1788',
  },

  /* 品牌 ------------------------------------------------------------------ */
  brand: {
    name: '3A娛樂城',
    latin: '3A CASINO',
    tagline: '娛樂城知識庫｜出金・紅利・遊戲攻略與安全指南',
  },

  /* 頂部工具列 ------------------------------------------------------------ */
  topbar: {
    notice: '本站為 3A娛樂城 官方知識庫，內容僅供年滿 18 歲人士參考，請理性娛樂。',
    lang: '繁體中文',
  },

  /* 主選單（取自真實分類，可自由增減 / 換順序）--------------------------- */
  nav: [
    { label: '首頁',       href: '#home' },
    { label: '優惠活動',   slug: 'promotions' },
    { label: '新手教學',   slug: 'newbie-guide' },
    { label: '出金與紅利', slug: 'withdrawal-bonus' },
    { label: '真人娛樂',   slug: 'live-casino' },
    { label: '老虎機專區', slug: 'slots' },
    { label: '安全法律',   slug: 'security' },
  ],
  cta: {
    primary: { label: '前往官網', href: 'https://www.3acasinoonline.com.tw' },
    line:    { label: 'LINE 客服', href: 'https://line.me/ti/p/~_aaa1788' },
  },

  /* 跑馬燈公告 ------------------------------------------------------------ */
  marquee: [
    '🎁 新會員首儲 1000 送 1000，流水 1 倍即可申請',
    '🧧 元旦添好運：每日登入投注最高領 88,888 紅利',
    '⚡ 出金審核最快 10 分鐘，24 小時真人客服在線',
    '📘 240＋ 篇攻略：出金、紅利、真人、老虎機一次看懂',
    '🔒 官方唯一正確網址 3acasinoonline.com.tw，慎防假網站',
  ],

  /* Hero（精選主打，通常放最新 / 最重要文章）---------------------------- */
  hero: {
    eyebrow: '玩家最常搜尋',
    title: '搞懂 3A娛樂城',
    highlight: '出金・紅利・遊戲，一次到位',
    sub: '從註冊、儲值到出金與紅利條件，240＋ 篇實測攻略，帶你避開所有踩雷點。',
    // 主打文章卡
    feature: {
      badge: '新手必讀',
      title: '3A娛樂城新會員首儲優惠｜首存 1000 送 1000、流水 1 倍申請流程',
      excerpt: '搞懂怎麼領才不會失效、流水 1 倍要投多少、遇到客服說不符資格怎麼辦。',
      slug: '3a-first-deposit-bonus',
      cover: 'https://static.wixstatic.com/media/0b1260_ea99cc31ae184a49aefa333f16d36786~mv2.png',
      min: 7,
    },
    stats: [
      { num: '240+', label: '篇實測攻略' },
      { num: '14',   label: '個主題分類' },
      { num: '10分', label: '最快出金審核' },
    ],
  },

  /* 14 個真實分類（label / slug / 文章數 / 封面）------------------------- */
  categories: {
    title: '主題分類',
    subtitle: '依你的需求，快速找到對的攻略',
    items: [
      { label: '優惠活動',       slug: 'promotions',           count: 21, cover: 'https://static.wixstatic.com/media/0b1260_33632bcb48464f6bb86b97f0295331ad~mv2.png' },
      { label: '新手教學',       slug: 'newbie-guide',         count: 18, cover: 'https://static.wixstatic.com/media/0b1260_f294623fb660415c9c235c6146802771~mv2.png' },
      { label: '出金與紅利',     slug: 'withdrawal-bonus',      count: 33, cover: 'https://static.wixstatic.com/media/0b1260_43b4415bfb444f43bc26d867cf54f33d~mv2.png' },
      { label: '真人娛樂',       slug: 'live-casino',          count: 17, cover: 'https://static.wixstatic.com/media/0b1260_12078c2583514c9ebf370522d5355e52~mv2.png' },
      { label: '老虎機專區',     slug: 'slots',                count: 20, cover: 'https://static.wixstatic.com/media/0b1260_25ba51b357ae47a4a4f4dd6d9f07a848~mv2.png' },
      { label: '遊戲專區',       slug: 'game-zone',            count: 24, cover: 'https://static.wixstatic.com/media/0b1260_a3f2698e874b4256a9711fddc3f60b7d~mv2.png' },
      { label: '體育投注',       slug: 'sports-betting',       count: 15, cover: 'https://static.wixstatic.com/media/0b1260_348b8aeb702d4c84abcc8d8066b65909~mv2.png' },
      { label: '技巧策略',       slug: 'strategy',             count: 11, cover: 'https://static.wixstatic.com/media/0b1260_a8d7835beca44be8b6bd03f5e2403c4c~mv2.png' },
      { label: '平台特色',       slug: 'service',              count: 26, cover: 'https://static.wixstatic.com/media/0b1260_1203da86aa7d43a7b63c9f8cad6df5e2~mv2.png' },
      { label: '安全法律',       slug: 'security',             count: 36, cover: 'https://static.wixstatic.com/media/0b1260_bf138994bc6240698b3dc5e8aaea4851~mv2.png' },
      { label: '娛樂城科技',     slug: 'casino-tech',          count: 17, cover: 'https://static.wixstatic.com/media/0b1260_c655e0133f5c4a4295bbc15912578a2a~mv2.png' },
      { label: '玩家評價與實測', slug: 'reviews',              count: 10, cover: 'https://static.wixstatic.com/media/0b1260_9ce0299e24ac4f26928064e9f1b86486~mv2.png' },
      { label: '責任博彩',       slug: 'responsible-gambling', count: 9,  cover: 'https://static.wixstatic.com/media/0b1260_a0ecdd3c818245d391669e9add443af4~mv2.png' },
      { label: '產業趨勢',       slug: 'industry-trends',      count: 8,  cover: 'https://static.wixstatic.com/media/0b1260_c613135fb284404bb51997de85ea47f6~mv2.png' },
    ],
  },

  /* 精選文章（大圖 + 側欄清單）------------------------------------------- */
  featured: {
    title: '精選攻略',
    subtitle: '編輯精選・玩家點閱最高',
    main: {
      cat: '出金與紅利',
      title: '3A娛樂城流水怎麼算？體育、真人、電子遊戲權重差異與達標技巧',
      excerpt: '同樣下注金額，不同遊戲區的流水進度差很大——關鍵在「權重」。一次搞懂怎麼算、怎麼最快達標。',
      slug: '3a-casino-turnover-weight-how-to-calculate',
      cover: 'https://static.wixstatic.com/media/0b1260_443fa3a0bb134abdaf7cb0686130a7f3~mv2.png',
      min: 8,
    },
    side: [
      { cat: '出金與紅利', title: '3A娛樂城「出金被退回」常見原因：銀行拒收、資料錯誤與重送 SOP', slug: '3a-casino-withdrawal-returned-reasons', min: 9 },
      { cat: '安全法律',   title: '3A娛樂城儲值沒入帳？先別再儲！查單蒐證 SOP＋客服模板一次搞定', slug: '3a-casino-deposit-not-credited-sop', min: 9 },
      { cat: '優惠活動',   title: '元旦添好運（2026）最高領 88,888 紅利，每日可申請的限時彩金攻略', slug: '3a-casino-newyear-bonus-2026', min: 6 },
      { cat: '平台特色',   title: '3A娛樂城 vs 一般娛樂城｜安全、金流、紅利、服務全面比較', slug: '3a-vs-other-casinos', min: 5 },
    ],
  },

  /* 最新文章（真實最新 40 篇中挑出的 9 篇）------------------------------- */
  latest: {
    title: '最新文章',
    subtitle: '持續更新的遊戲玩法與金流攻略',
    items: [
      { cat: '遊戲專區', title: '炸金花（詐金花）怎麼玩？牌型大小、比牌規則、機率與下注策略完整解析', slug: '3a-casino-zha-jin-hua-rules-hand-rankings-strategy', min: 4, date: '2026-07-09' },
      { cat: '遊戲專區', title: '魚蝦蟹怎麼玩？規則、賠率、莊家優勢與下注策略完整解析（2026）', slug: '3a-casino-fish-prawn-crab-rules-odds-strategy', min: 4, date: '2026-07-08' },
      { cat: '遊戲專區', title: '二八槓怎麼玩？規則、點數計算、牌型大小與莊家優勢完整解析', slug: '3a-casino-er-ba-gang-rules-odds-strategy', min: 3, date: '2026-07-06' },
      { cat: '真人娛樂', title: '十三支（十三張）怎麼玩？規則、牌型、水數計算與分墩策略完整解析', slug: '3a-casino-thirteen-card-poker-rules-scoring-strategy', min: 4, date: '2026-07-03' },
      { cat: '遊戲專區', title: '妞妞（牛牛）怎麼玩？湊十點規則、牛數計算、賠率與下注策略完整解析', slug: '3a-casino-niu-niu-bull-rules-odds-strategy', min: 3, date: '2026-07-01' },
      { cat: '真人娛樂', title: '百家樂試玩怎麼玩？免費試玩入口、Demo 練功重點與常見問題（2026）', slug: '3a-casino-baccarat-free-trial-demo-practice-guide', min: 3, date: '2026-06-19' },
      { cat: '老虎機專區', title: 'GR電子《火鳳凰》怎麼玩？25 線玩法教學、Wild/Scatter 機制一次看懂', slug: 'gr-fire-phoenix-guide', min: 6, date: '2026-02-10', cover: 'https://static.wixstatic.com/media/0b1260_df08311ebd664d15b69613e22e3be1de~mv2.png' },
      { cat: '新手教學', title: '3A娛樂城 APP 下載入口與安裝重點整理｜官方載點、快速設定與常見問題', slug: '3a-casino-app-download-guide', min: 6, date: '2025-12-31', cover: 'https://static.wixstatic.com/media/0b1260_f7ea68f2957b4a71b13178a60360bf2e~mv2.jpg' },
      { cat: '安全法律', title: '3A娛樂城登入入口與登入異常完整指南（2026）', slug: '3a-casino-login-guide', min: 5, date: '2025-12-31', cover: 'https://static.wixstatic.com/media/0b1260_20d446124ad24661be2b2b2cf7c5b817~mv2.png' },
    ],
  },

  /* 為什麼看本站 ---------------------------------------------------------- */
  trust: {
    title: '為什麼參考 3A 知識庫',
    items: [
      { icon: 'shield',  title: '資料可查證', desc: '引用 165、防洗辦、GLI、BMM Testlabs 等官方與國際來源。' },
      { icon: 'bolt',    title: '實測導向',   desc: '出金時間、流水權重、活動規則皆以實際流程與案例說明。' },
      { icon: 'book',    title: '看得懂',     desc: '把複雜的金流、風控、機率拆成清楚步驟與客服模板。' },
      { icon: 'headset', title: '客服直達',   desc: '每篇附官方 LINE 客服，遇到問題可直接聯繫解決。' },
    ],
  },

  /* LINE 客服行動條 ------------------------------------------------------- */
  lineCta: {
    title: '遇到出金 / 儲值 / 帳號問題？',
    sub: '加入官方 LINE，24 小時真人客服為你即時處理。',
    lineId: '_aaa1788',
  },

  /* 頁尾 ------------------------------------------------------------------ */
  footer: {
    columns: [
      { title: '熱門主題', links: [
        { label: '優惠活動',   slug: 'promotions' },
        { label: '出金與紅利', slug: 'withdrawal-bonus' },
        { label: '新手教學',   slug: 'newbie-guide' },
      ]},
      { title: '遊戲攻略', links: [
        { label: '真人娛樂',   slug: 'live-casino' },
        { label: '老虎機專區', slug: 'slots' },
        { label: '遊戲專區',   slug: 'game-zone' },
      ]},
      { title: '平台資訊', links: [
        { label: '平台特色',   slug: 'service' },
        { label: '安全法律',   slug: 'security' },
        { label: '責任博彩',   slug: 'responsible-gambling' },
      ]},
    ],
    responsible: '本網站內容僅供年滿 18 歲之人士參考，博弈有風險，請理性娛樂、量力而為。若您或親友受賭博困擾，請撥打 165 反詐騙專線或尋求專業協助。',
    copyright: '© 2026 3A娛樂城 3A CASINO 知識庫. All Rights Reserved.',
  },
};
