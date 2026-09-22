const CATALOG = [
  {
    id: "magsafe-wall",
    category: "cases",
    images: [
      "assets/products/magsafe-wall-1.jpg",
      "assets/products/magsafe-wall-2.jpg",
      "assets/products/magsafe-wall-3.jpg"
    ],
    moq: "50 pcs",
    fit: "iPhone 15 / 16 series"
  },
  {
    id: "magsafe-neon",
    category: "cases",
    images: [
      "assets/products/magsafe-neon-1.jpg",
      "assets/products/magsafe-neon-2.jpg",
      "assets/products/magsafe-neon-3.jpg"
    ],
    moq: "1 carton",
    fit: "iPhone 15 / 16 series"
  },
  {
    id: "magsafe-bulk",
    category: "cases",
    images: [
      "assets/products/magsafe-bulk-1.jpg",
      "assets/products/magsafe-bulk-2.jpg",
      "assets/products/magsafe-bulk-3.jpg"
    ],
    moq: "1 carton",
    fit: "Current iPhone models"
  },
  {
    id: "metal-frame",
    category: "cases",
    images: [
      "assets/products/metal-frame-1.jpg",
      "assets/products/metal-frame-2.jpg",
      "assets/products/metal-frame-3.jpg"
    ],
    moq: "1 carton",
    fit: "Latest iPhone models"
  },
  {
    id: "alpine-band",
    category: "watch",
    images: [
      "assets/products/alpine-band-1.jpg",
      "assets/products/alpine-band-2.jpg"
    ],
    moq: "1 carton",
    fit: "S10 / 46 mm · 42/44/45/49 mm"
  },
  {
    id: "woven-band",
    category: "watch",
    images: [
      "assets/products/woven-band-1.jpg",
      "assets/products/woven-band-2.jpg",
      "assets/products/woven-band-3.jpg"
    ],
    moq: "1 carton",
    fit: "22 mm (Huawei / Samsung / Garmin style)"
  },
  {
    id: "cables",
    category: "charging",
    images: ["assets/products/cables-1.jpg"],
    moq: "100 pcs mixed",
    fit: "USB-C / Lightning mix"
  },
  {
    id: "care-stall",
    category: "care",
    images: ["assets/products/care-stall-1.jpg"],
    moq: "mixed carton",
    fit: "Hair tools, lanyards, cases"
  }
];

const SOURCE_GALLERY = [
  { src: "assets/source/huaqiangbei.jpg", key: "welcome" },
  { src: "assets/source/seg-canopy.jpg", key: "segCanopy" },
  { src: "assets/source/segcom.jpg", key: "segcom" },
  { src: "assets/source/foreign-trade.jpg", key: "foreignTrade" },
  { src: "assets/source/seg-atrium.jpg", key: "segAtrium" },
  { src: "assets/source/fiber.jpg", key: "fiber" },
  { src: "assets/source/cable-counter.jpg", key: "cables" }
];

const ORIGIN_REGIONS = [
  {
    id: "cn",
    zh: "中国大陆",
    en: "Mainland China",
    cities: [
      { id: "beijing", zh: "北京", en: "Beijing" },
      { id: "shanghai", zh: "上海", en: "Shanghai" },
      { id: "guangzhou", zh: "广州", en: "Guangzhou" },
      { id: "shenzhen", zh: "深圳", en: "Shenzhen" },
      { id: "dongguan", zh: "东莞", en: "Dongguan" },
      { id: "foshan", zh: "佛山", en: "Foshan" },
      { id: "huizhou", zh: "惠州", en: "Huizhou" },
      { id: "zhongshan", zh: "中山", en: "Zhongshan" },
      { id: "zhuhai", zh: "珠海", en: "Zhuhai" },
      { id: "hangzhou", zh: "杭州", en: "Hangzhou" },
      { id: "ningbo", zh: "宁波", en: "Ningbo" },
      { id: "nanjing", zh: "南京", en: "Nanjing" },
      { id: "suzhou", zh: "苏州", en: "Suzhou" },
      { id: "hefei", zh: "合肥", en: "Hefei" },
      { id: "fuzhou", zh: "福州", en: "Fuzhou" },
      { id: "xiamen", zh: "厦门", en: "Xiamen" },
      { id: "nanchang", zh: "南昌", en: "Nanchang" },
      { id: "jinan", zh: "济南", en: "Jinan" },
      { id: "qingdao", zh: "青岛", en: "Qingdao" },
      { id: "zhengzhou", zh: "郑州", en: "Zhengzhou" },
      { id: "wuhan", zh: "武汉", en: "Wuhan" },
      { id: "changsha", zh: "长沙", en: "Changsha" },
      { id: "chengdu", zh: "成都", en: "Chengdu" },
      { id: "chongqing", zh: "重庆", en: "Chongqing" },
      { id: "xian", zh: "西安", en: "Xi'an" },
      { id: "kunming", zh: "昆明", en: "Kunming" },
      { id: "nanning", zh: "南宁", en: "Nanning" },
      { id: "tianjin", zh: "天津", en: "Tianjin" },
      { id: "shenyang", zh: "沈阳", en: "Shenyang" },
      { id: "dalian", zh: "大连", en: "Dalian" },
      { id: "other", zh: "其他", en: "Other" }
    ]
  },
  {
    id: "hk",
    zh: "中国香港",
    en: "Hong Kong, China",
    cities: [
      { id: "hongkong-island", zh: "香港岛", en: "Hong Kong Island" },
      { id: "kowloon", zh: "九龙", en: "Kowloon" },
      { id: "nt", zh: "新界", en: "New Territories" },
      { id: "other", zh: "其他", en: "Other" }
    ]
  },
  {
    id: "sg",
    zh: "新加坡",
    en: "Singapore",
    cities: [
      { id: "singapore", zh: "新加坡", en: "Singapore" },
      { id: "jurong", zh: "裕廊", en: "Jurong" },
      { id: "tampines", zh: "淡滨尼", en: "Tampines" },
      { id: "woodlands", zh: "兀兰", en: "Woodlands" },
      { id: "other", zh: "其他", en: "Other" }
    ]
  },
  {
    id: "my",
    zh: "马来西亚",
    en: "Malaysia",
    cities: [
      { id: "kualalumpur", zh: "吉隆坡", en: "Kuala Lumpur" },
      { id: "penang", zh: "槟城", en: "Penang" },
      { id: "jb", zh: "新山", en: "Johor Bahru" },
      { id: "ipoh", zh: "怡保", en: "Ipoh" },
      { id: "malacca", zh: "马六甲", en: "Malacca" },
      { id: "kk", zh: "亚庇", en: "Kota Kinabalu" },
      { id: "kuching", zh: "古晋", en: "Kuching" },
      { id: "other", zh: "其他", en: "Other" }
    ]
  },
  {
    id: "th",
    zh: "泰国",
    en: "Thailand",
    cities: [
      { id: "bangkok", zh: "曼谷", en: "Bangkok" },
      { id: "chiangmai", zh: "清迈", en: "Chiang Mai" },
      { id: "phuket", zh: "普吉", en: "Phuket" },
      { id: "pattaya", zh: "芭提雅", en: "Pattaya" },
      { id: "hatyai", zh: "合艾", en: "Hat Yai" },
      { id: "other", zh: "其他", en: "Other" }
    ]
  },
  {
    id: "other",
    zh: "其他",
    en: "Other",
    cities: [
      { id: "other", zh: "其他", en: "Other" }
    ]
  }
];
