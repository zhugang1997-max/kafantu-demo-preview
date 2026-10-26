/* ==========================================================================
   kafantu — reference-parity concept demo
   Static storefront: routing, catalogue, cart, checkout, orders, overlays.
   No network requests. No real payments. No real emails.
   ========================================================================== */

(() => {
  "use strict";

  /* ------------------------------------------------------------------------
     Catalogue
     ------------------------------------------------------------------------ */

  const PRODUCTS = [
    {
      id: "soft-cleanse",
      name: "soft cleanse",
      display: "cleanse",
      category: "Skin",
      filter: "skin",
      featured: true,
      index: "01",
      rating: 4.8,
      reviewCount: 312,
      sizes: [
        { id: "150", label: "150 ml", price: 2800 },
        { id: "300", label: "300 ml", price: 4200 }
      ],
      descriptor: "a milky gel cleanser for calm, comfortable skin.",
      description: "A soft, low-foam cleanse that lifts away the day without leaving skin feeling tight. The first step in a short routine, made to be used morning and night.",
      benefits: [
        "Lifts away makeup and daily buildup.",
        "Leaves skin feeling comfortable, not stripped.",
        "A soft, low-foam texture that rinses clean."
      ],
      application: "Massage a small amount over damp skin, then rinse with lukewarm water. Use morning and evening as the first step.",
      ingredients: "Glycerin, mild cleansing agents, panthenol, and a soft emulsifier. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: null,
      vessel: "tube",
      palette: "sage",
      routine: ["dew-drop", "daily-balm"]
    },
    {
      id: "dew-drop",
      name: "dew drop",
      display: "dew",
      category: "Skin",
      filter: "skin",
      featured: false,
      index: "02",
      rating: 4.7,
      reviewCount: 208,
      sizes: [{ id: "30", label: "30 ml", price: 3600 }],
      descriptor: "a lightweight hydrating serum for soft, comfortable skin.",
      description: "A light, cushiony serum for skin that wants a little more. Layers easily under moisturizer and leaves a soft, comfortable finish.",
      benefits: [
        "A light, cushiony layer that absorbs quickly.",
        "Supports a soft, comfortable finish.",
        "Designed to layer under moisturizer, morning and night."
      ],
      application: "Press two to three drops onto clean skin after cleansing. Follow with daily balm or your moisturizer.",
      ingredients: "Glycerin, panthenol, squalane, and a humectant blend. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: "the edit",
      vessel: "dropper",
      palette: "amber",
      routine: ["soft-cleanse", "daily-balm"]
    },
    {
      id: "daily-balm",
      name: "daily balm",
      display: "balm",
      category: "Skin",
      filter: "skin",
      featured: true,
      index: "03",
      rating: 4.9,
      reviewCount: 476,
      sizes: [
        { id: "50", label: "50 ml", price: 3400 },
        { id: "100", label: "100 ml", price: 5200 }
      ],
      descriptor: "a cushiony barrier balm for dry days and everyday recovery.",
      description: "A cushiony barrier balm for dry days and everyday recovery. A quiet last step that seals in hydration without feeling heavy.",
      benefits: [
        "Cushiony comfort for dry, tight-feeling skin.",
        "Helps support the skin barrier.",
        "A soft, non-greasy finish that layers over serum."
      ],
      application: "Warm a small amount between the fingers and press over the face and neck as the last step. Use day or night.",
      ingredients: "Glycerin, plant-derived emollients, a soft wax, and a barrier-support blend. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: "new",
      vessel: "jar",
      palette: "clay",
      routine: ["soft-cleanse", "dew-drop"]
    },
    {
      id: "lip-glaze",
      name: "lip glaze",
      display: "glaze",
      category: "Lip + Cheek",
      filter: "lip-cheek",
      featured: true,
      index: "04",
      rating: 4.6,
      reviewCount: 589,
      sizes: [{ id: "10", label: "10 ml", price: 2200 }],
      descriptor: "a sheer, glossy tint with a comfortable, non-sticky finish.",
      description: "A sheer, glossy tint with a comfortable, non-sticky finish. A wash of warm color for everyday.",
      benefits: [
        "Sheer, buildable color with a glossy finish.",
        "Comfortable, non-sticky texture.",
        "Wear it alone or over lip balm."
      ],
      application: "Swipe over clean lips. Layer for more color. Reapply as needed.",
      ingredients: "A soft wax blend, plant oils, and mineral pigments. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: "new",
      vessel: "gloss",
      palette: "rose",
      routine: ["cheek-melt", "the-daily-three"]
    },
    {
      id: "cheek-melt",
      name: "cheek melt",
      display: "melt",
      category: "Lip + Cheek",
      filter: "lip-cheek",
      featured: false,
      index: "05",
      rating: 4.7,
      reviewCount: 341,
      sizes: [{ id: "6", label: "6 g", price: 2600 }],
      descriptor: "a creamy, blendable flush for cheeks and lips.",
      description: "A creamy, blendable flush for cheeks and lips. A soft wash of color that melts into skin.",
      benefits: [
        "Creamy texture that blends easily.",
        "A soft, natural-looking flush.",
        "Use it on cheeks and lips."
      ],
      application: "Tap a small amount onto cheeks with fingertips or a brush. Blend outward. Apply to lips for a tonal look.",
      ingredients: "A soft wax blend, plant oils, and mineral pigments. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: null,
      vessel: "compact",
      palette: "sand",
      routine: ["lip-glaze", "the-daily-three"]
    },
    {
      id: "the-daily-three",
      name: "the daily three",
      display: "the three",
      category: "Sets",
      filter: "sets",
      featured: true,
      index: "06",
      rating: 4.9,
      reviewCount: 126,
      sizes: [{ id: "set", label: "3-piece set", price: 8200 }],
      descriptor: "cleanse, hydrate, protect — the everyday routine.",
      description: "Cleanse, hydrate, protect — the everyday routine, together. Three essentials in one considered set.",
      benefits: [
        "soft cleanse 150 ml — a milky gel cleanser.",
        "dew drop 30 ml — a lightweight hydrating serum.",
        "daily balm 50 ml — a cushiony barrier balm."
      ],
      application: "Use in order: cleanse, press in dew drop, then finish with daily balm. Morning and evening.",
      ingredients: "See each product for its placeholder formula. Final INCI lists to be confirmed by the brand.",
      badge: "set",
      vessel: "set",
      palette: "set",
      routine: ["soft-cleanse", "dew-drop", "daily-balm"]
    },
    {
      id: "cloud-mist",
      name: "cloud mist",
      display: "mist",
      category: "Skin",
      filter: "skin",
      featured: false,
      index: "07",
      rating: 4.5,
      reviewCount: 84,
      sizes: [{ id: "100", label: "100 ml", price: 3000 }],
      descriptor: "a fine hydrating mist for a quiet midday reset.",
      description: "A fine, even mist for skin that needs a quick reset. Use after cleansing, before serum, or whenever the day asks for a pause.",
      benefits: [
        "A fine, even mist that settles quickly.",
        "A light layer of hydration at any point in the day.",
        "Designed to sit under serum or over makeup."
      ],
      application: "Mist over clean skin, holding the bottle an arm's length away. Follow with serum or moisturizer. Reapply as needed.",
      ingredients: "Water, glycerin, panthenol, and a gentle humectant blend. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: null,
      vessel: "dropper",
      palette: "sage",
      routine: ["dew-drop", "daily-balm"]
    },
    {
      id: "night-veil",
      name: "night veil",
      display: "night",
      category: "Skin",
      filter: "skin",
      featured: true,
      index: "08",
      rating: 4.8,
      reviewCount: 41,
      sizes: [{ id: "50", label: "50 ml", price: 4200 }],
      descriptor: "an overnight mask for tired, thirsty skin.",
      description: "A soft overnight mask that settles in while you sleep. Wake up to skin that feels supple, calm and comfortable.",
      benefits: [
        "A rich, cushiony layer for overnight comfort.",
        "Helps reduce the look of tight, tired skin.",
        "Rinses or tissues off in the morning."
      ],
      application: "As the last step at night, smooth a generous layer over clean skin. Leave on overnight. Rinse or gently tissue off in the morning.",
      ingredients: "Glycerin, squalane, plant-derived emollients, and a barrier-support blend. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: "new",
      vessel: "jar",
      palette: "amber",
      routine: ["dew-drop", "daily-balm"]
    },
    {
      id: "lip-veil",
      name: "lip veil",
      display: "veil",
      category: "Lip + Cheek",
      filter: "lip-cheek",
      featured: false,
      index: "09",
      rating: 4.6,
      reviewCount: 73,
      sizes: [{ id: "10", label: "10 ml", price: 2400 }],
      descriptor: "a sheer lip oil with a soft, glassy shine.",
      description: "A sheer lip oil that wears like a veil. A comfortable wash of shine, with just enough color to bring the face to life.",
      benefits: [
        "A soft, glassy finish without stickiness.",
        "Sheer color that layers over lip balm.",
        "Comfortable enough for everyday wear."
      ],
      application: "Swipe over clean lips. Wear alone or layer over your favorite tint. Reapply as needed.",
      ingredients: "Plant oils, a soft wax, and mineral pigments. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: "new",
      vessel: "gloss",
      palette: "rose",
      routine: ["lip-glaze", "cheek-melt"]
    },
    {
      id: "glow-drop",
      name: "glow drop",
      display: "glow",
      category: "Skin",
      filter: "skin",
      featured: false,
      index: "10",
      rating: 4.7,
      reviewCount: 168,
      sizes: [{ id: "30", label: "30 ml", price: 3800 }],
      descriptor: "a light illuminating serum for everyday radiance.",
      description: "A light serum with a soft, lit-from-within finish. Layer it under moisturizer or tap it over makeup for a quiet glow.",
      benefits: [
        "A light, fast-absorbing serum.",
        "Adds a soft, natural-looking radiance.",
        "Layers easily with the daily routine."
      ],
      application: "Press two to three drops onto clean skin before moisturizer. For a subtle highlight, tap a drop over makeup.",
      ingredients: "Glycerin, niacinamide, squalane, and a light-reflecting mineral blend. Placeholder formula — final INCI to be confirmed by the brand.",
      badge: null,
      vessel: "dropper",
      palette: "sand",
      routine: ["soft-cleanse", "daily-balm"]
    },
    {
      id: "travel-edit",
      name: "the travel edit",
      display: "travel",
      category: "Sets",
      filter: "sets",
      featured: false,
      index: "11",
      rating: 4.9,
      reviewCount: 58,
      sizes: [{ id: "set", label: "4-piece set", price: 4800 }],
      descriptor: "four minis for the days you're moving.",
      description: "The short routine, packed small. Four minis for a weekend away, a gym bag, or the days you leave before the bathroom is finished.",
      benefits: [
        "soft cleanse 50 ml — a milky gel cleanser.",
        "dew drop 10 ml — a lightweight hydrating serum.",
        "daily balm 25 ml — a cushiony barrier balm.",
        "cloud mist 30 ml — a fine hydrating mist."
      ],
      application: "Use in the same order as your full-size routine: cleanse, mist, dew drop, then daily balm.",
      ingredients: "See each product for its placeholder formula. Final INCI lists to be confirmed by the brand.",
      badge: "set",
      vessel: "set",
      palette: "set",
      routine: ["soft-cleanse", "dew-drop", "daily-balm"]
    },
    {
      id: "touch-up-duo",
      name: "the touch-up duo",
      display: "touch-up",
      category: "On the go",
      filter: "on-the-go",
      featured: true,
      index: "12",
      rating: 4.5,
      reviewCount: 24,
      sizes: [{ id: "duo", label: "2-piece duo", price: 3600 }],
      descriptor: "lip glaze and cheek melt, ready to go.",
      description: "Two small things for the middle of the day. A sheer gloss for lips and a creamy flush for cheeks, together in one quiet touch-up set.",
      benefits: [
        "lip glaze 10 ml — a sheer, glossy tint.",
        "cheek melt 6 g — a creamy, blendable flush.",
        "A small duo for your bag, desk or carry-on."
      ],
      application: "Tap cheek melt onto cheeks and blend. Swipe lip glaze over lips. Reapply as needed.",
      ingredients: "See each product for its placeholder formula. Final INCI lists to be confirmed by the brand.",
      badge: "new",
      vessel: "compact",
      palette: "rose",
      routine: ["lip-glaze", "cheek-melt"]
    }
  ];

  const SAMPLE_REVIEWS = [
    { name: "Maya R.", stars: 5, title: "a quiet daily staple", body: "The texture is soft, the finish is comfortable, and it has earned a permanent place on the shelf.", date: "2 weeks ago", daysAgo: 14, helpful: 12, ease: 5, age: "25 - 34", concern: "Dullness", skinType: "Balanced", features: "Non-drying, easy to apply", verified: true },
    { name: "Elena T.", stars: 5, title: "exactly what I hoped for", body: "Light enough to layer, rich enough to feel like it is doing something. I have already ordered a second one.", date: "1 month ago", daysAgo: 31, helpful: 8, ease: 5, age: "35 - 44", concern: "Dryness", skinType: "Dry", features: "Hydrating, layers well", verified: true },
    { name: "Nora K.", stars: 4, title: "lovely, not loud", body: "A considered formula that fits easily into my routine. I would love a larger size next.", date: "1 month ago", daysAgo: 38, helpful: 4, ease: 4, age: "25 - 34", concern: "Uneven texture", skinType: "Combination", features: "Gentle, comfortable finish", verified: true },
    { name: "Sam P.", stars: 5, title: "the one I keep reaching for", body: "Simple, gentle and genuinely pleasant to use. The kind of product that disappears into the routine in the best way.", date: "2 months ago", daysAgo: 64, helpful: 6, ease: 5, age: "45 - 54", concern: "Sensitivity", skinType: "Sensitive", features: "Fragrance-free, calming", verified: true },
    { name: "Priya N.", stars: 5, title: "a soft reset", body: "It leaves my skin feeling clean but not tight. I have been using it morning and night for three weeks and it has settled into the routine easily.", date: "1 week ago", daysAgo: 7, helpful: 14, ease: 5, age: "18 - 24", concern: "Oiliness", skinType: "Combination", features: "Lightweight, rinses clean", verified: true },
    { name: "Lena M.", stars: 4, title: "a calm start", body: "The texture is lovely and the bottle looks considered on the shelf. I would like a travel size for my gym bag.", date: "3 weeks ago", daysAgo: 21, helpful: 3, ease: 4, age: "35 - 44", concern: "Dryness", skinType: "Dry", features: "Soft finish, easy to use", verified: true }
  ];

  const REVIEW_SORT_OPTIONS = [
    { id: "recent", label: "Most Recent" },
    { id: "oldest", label: "Oldest" },
    { id: "helpful", label: "Most Helpful" },
    { id: "highest", label: "Highest Rating" },
    { id: "lowest", label: "Lowest Rating" },
    { id: "least-helpful", label: "Least Helpful" }
  ];

  const RELATED_HOVER_IMAGES = {
    "soft-cleanse": "assets/images/editorial-1.jpg",
    "dew-drop": "assets/images/pdp-lifestyle.jpg",
    "daily-balm": "assets/images/editorial-2.jpg",
    "lip-glaze": "assets/images/social-1.jpg",
    "cheek-melt": "assets/images/social-4.jpg",
    "the-daily-three": "assets/images/banner.jpg",
    "cloud-mist": "assets/images/hero-video-poster.jpg",
    "night-veil": "assets/images/about.jpg",
    "lip-veil": "assets/images/social-2.jpg",
    "glow-drop": "assets/images/hero.jpg",
    "travel-edit": "assets/images/social-3.jpg",
    "touch-up-duo": "assets/images/editorial-1.jpg"
  };

  const ROUTINE_STEPS = [
    { number: "01", label: "CLEANSE", image: "assets/images/pdp-lifestyle.jpg", alt: "A placeholder image of hands holding a skincare bottle." },
    { number: "02", label: "HYDRATE", image: "assets/images/editorial-1.jpg", alt: "A placeholder image of a hand using a dropper." },
    { number: "03", label: "TREAT", image: "assets/images/editorial-2.jpg", alt: "A placeholder still life of an amber skincare bottle." },
    { number: "04", label: "SEAL", image: "assets/images/hero-video-poster.jpg", alt: "A placeholder portrait in soft natural light." },
    { number: "05", label: "GLOW", image: "assets/images/banner.jpg", alt: "A placeholder close-up portrait." }
  ];

  const LOOK_TABS = [
    { label: "shape", image: "assets/images/social-1.jpg", alt: "A placeholder portrait for the shape lip look.", note: "Line and define the lip with a soft, buildable outline." },
    { label: "flush", image: "assets/images/social-3.jpg", alt: "A placeholder portrait for the flush lip look.", note: "Blend colour into the centre for a soft, lived-in wash." },
    { label: "tint", image: "assets/images/social-4.jpg", alt: "A placeholder portrait for the tint lip look.", note: "Finish with a sheer layer of shine for a quiet lift." }
  ];

  const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((product) => [product.id, product]));

  const FILTERS = [
    { id: "featured", label: "Featured" },
    { id: "skin", label: "Skin" },
    { id: "lip-cheek", label: "Lip + Cheek" },
    { id: "sets", label: "Sets" },
    { id: "on-the-go", label: "On the go" },
    { id: "new", label: "New" },
    { id: "all", label: "Shop all" }
  ];

  const SORT_OPTIONS = [
    { id: "featured", label: "Featured" },
    { id: "title-ascending", label: "Name, A–Z" },
    { id: "title-descending", label: "Name, Z–A" },
    { id: "price-ascending", label: "Price, low to high" },
    { id: "price-descending", label: "Price, high to low" },
    { id: "created-descending", label: "Newest first" }
  ];

  const VALUES = {
    mission: {
      label: "mission",
      index: "01 / 03",
      title: "good skin is a practice, not a promise",
      body: "We make a short, considered edit of essentials that fit real life. No crowded shelf. No complicated routine. Just a few things, made to be used every day."
    },
    philanthropy: {
      label: "philanthropy",
      index: "02 / 03",
      title: "care should travel further than the bottle.",
      body: "A small share of what we make is set aside for community access to everyday skin essentials. The programme is a placeholder until the brand confirms its giving partners."
    },
    sustainability: {
      label: "sustainability",
      index: "03 / 03",
      title: "lighter by design.",
      body: "Fewer components, lighter packaging, less waste. We are working toward a smaller footprint, one decision at a time. Progress, not perfection."
    }
  };

  const FAQS = [
    {
      group: "Products",
      q: "Are your products suitable for sensitive skin?",
      a: "Our placeholder formulas are designed for daily use. Final formulas and suitability claims will be confirmed by the brand."
    },
    {
      group: "Products",
      q: "Are your products fragrance-free?",
      a: "The current line is fragrance-free in this concept. Final formulations may vary."
    },
    {
      group: "Products",
      q: "How do I build a routine?",
      a: "Start with soft cleanse, add dew drop, and finish with daily balm. Keep it short and consistent."
    },
    {
      group: "Shipping",
      q: "How long does shipping take?",
      a: "Standard delivery takes 3–5 business days; express takes 1–2. Orders in this demo do not create real shipments."
    },
    {
      group: "Shipping",
      q: "Do you ship internationally?",
      a: "This concept store is set up for US shipping. Additional markets are planned for a later phase."
    },
    {
      group: "Orders & payment",
      q: "Can I change or cancel my order?",
      a: "Contact us within two hours of ordering and we will do our best. Demo orders are not real, so nothing is charged or shipped."
    },
    {
      group: "Orders & payment",
      q: "Which payment methods do you accept?",
      a: "In production we plan to accept card payments via Stripe and PayPal. This demo does not process payments."
    },
    {
      group: "Returns",
      q: "What is your return policy?",
      a: "Unopened products can be returned within 30 days of delivery. See Shipping & returns for the full placeholder policy."
    }
  ];

  const POLICIES = {
    "shipping-returns": {
      title: "shipping & returns.",
      eyebrow: "Help",
      intro: "A clear, simple policy for a small collection. This is placeholder copy for the concept demo and must be reviewed before launch.",
      sections: [
        {
          label: "Shipping",
          title: "within the US",
          body: [
            "Complimentary standard shipping is available on US orders over $45. Standard delivery takes 3–5 business days; express delivery takes 1–2 business days.",
            "Orders placed before 12pm ET on a business day are usually processed the same day. Weekends and public holidays may add time."
          ]
        },
        {
          label: "Returns",
          title: "30 days, unopened",
          body: [
            "Unopened products can be returned within 30 days of delivery. Contact us with your order number and we will send return instructions.",
            "For hygiene reasons, opened products cannot be returned unless they arrived damaged or incorrect. This is a placeholder policy for the demo."
          ]
        },
        {
          label: "Support",
          title: "talk to a person",
          body: [
            "Questions about a delivery or a return? Email hello@kafantu.example, Monday–Friday, 9am–5pm ET. We aim to reply within 1–2 business days."
          ]
        }
      ]
    },
    privacy: {
      title: "privacy.",
      eyebrow: "Help",
      intro: "How this concept demo handles information. This is a placeholder policy, not legal advice.",
      sections: [
        {
          label: "The demo",
          title: "what is stored",
          body: [
            "This static demo stores your cart, demo orders, and a small preference flag in your browser's localStorage. No data is sent to a server, and no payment details are collected or stored.",
            "You can clear this data at any time by clearing site data for this page."
          ]
        },
        {
          label: "Production",
          title: "what the live store will need",
          body: [
            "A production store will need a privacy policy covering order data, payment processing, email marketing, analytics, cookies, retention, and the customer's rights under the laws that apply to the target market.",
            "Final copy must be reviewed by the brand and, where needed, legal counsel before launch."
          ]
        },
        {
          label: "Contact",
          title: "questions",
          body: [
            "For privacy questions about this concept, contact hello@kafantu.example. For the production store, the brand's support contact will be used."
          ]
        }
      ]
    },
    terms: {
      title: "terms.",
      eyebrow: "Help",
      intro: "Placeholder terms for a concept store. Final terms must be reviewed before launch.",
      sections: [
        {
          label: "Use",
          title: "a concept store",
          body: [
            "This site is a static concept demo. It does not sell products, process payments, create shipments, or create real customer accounts.",
            "All brand names, products, copy, and photography are placeholders or licensed stand-ins and are not an offer for sale."
          ]
        },
        {
          label: "Orders",
          title: "demo only",
          body: [
            "Any order placed through this demo exists only in your browser. No payment is taken and no email is sent.",
            "A production store will require full terms covering orders, pricing, payment, delivery, returns, liability, intellectual property, and governing law."
          ]
        },
        {
          label: "Contact",
          title: "questions",
          body: [
            "Questions about this concept can be sent to hello@kafantu.example."
          ]
        }
      ]
    }
  };

  const PALETTES = {
    sage: { glow: "#f8f4ec", body1: "#f4eee3", body2: "#ddd1bf", cap1: "#a8ae9d", cap2: "#7f8774", labelBg: "#faf6ee", labelInk: "#5c5a52", shadow: "#2b2722" },
    amber: { glow: "#fbf2e4", body1: "#a9744f", body2: "#6f432b", cap1: "#efe8db", cap2: "#cfc4b2", labelBg: "#f6efe3", labelInk: "#5a4030", shadow: "#2b1a10" },
    clay: { glow: "#fbf3ec", body1: "#e4cbb7", body2: "#c79a7f", cap1: "#f4ede3", cap2: "#d8cbbd", labelBg: "#f9f2e9", labelInk: "#6b4c3c", shadow: "#2b1a10" },
    rose: { glow: "#f9ece7", body1: "#b46f61", body2: "#7e3f37", cap1: "#f0e4d8", cap2: "#d7c3b4", labelBg: "#f7ece6", labelInk: "#5f352e", shadow: "#2b1210" },
    sand: { glow: "#f7f0e6", body1: "#d9b493", body2: "#b88762", cap1: "#f4ebdf", cap2: "#d5c6b5", labelBg: "#f9f2e8", labelInk: "#674a34", shadow: "#2b1a10" },
    set: { glow: "#f7f3ea", body1: "#e8ddcd", body2: "#cdbca6", cap1: "#f4ede2", cap2: "#d6c7b6", labelBg: "#faf6ee", labelInk: "#5c5348", shadow: "#2b1a10" }
  };

  const FREE_SHIPPING = 4500;
  const TAX_RATE = 0.08;
  const SHIPPING = {
    standard: { label: "Standard", eta: "3–5 business days", price: 600 },
    express: { label: "Express", eta: "1–2 business days", price: 1400 }
  };

  const STORAGE = {
    cart: "kafantu_v3_cart",
    orders: "kafantu_v3_orders",
    early: "kafantu_v3_early_seen",
    locale: "kafantu_v4_locale",
    a11y: "kafantu_v4_accessibility"
  };

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  const money = (cents) => moneyFormatter.format((Number(cents) || 0) / 100);

  const esc = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const prefersReducedMotion = () =>
    a11yPrefs["reduce-motion"] ||
    Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function syncHeroPlayback() {
    const video = $("[data-hero-video]");
    if (!video) return;
    if (prefersReducedMotion()) {
      video.pause();
      video.removeAttribute("autoplay");
    } else {
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    }
  }

  function loadAccessibilityPrefs() {
    const saved = readJSON(STORAGE.a11y, {});
    a11yPrefs = {
      "large-text": Boolean(saved && saved["large-text"]),
      "high-contrast": Boolean(saved && saved["high-contrast"]),
      "reduce-motion": Boolean(saved && saved["reduce-motion"])
    };
    applyAccessibilityPrefs();
  }

  function applyAccessibilityPrefs() {
    document.body.classList.toggle("a11y-large-text", a11yPrefs["large-text"]);
    document.body.classList.toggle("a11y-high-contrast", a11yPrefs["high-contrast"]);
    document.body.classList.toggle("a11y-reduce-motion", a11yPrefs["reduce-motion"]);
    $$("[data-a11y-toggle]").forEach((button) => {
      const enabled = Boolean(a11yPrefs[button.dataset.a11yToggle]);
      button.setAttribute("aria-pressed", enabled ? "true" : "false");
      const label = button.querySelector(".accessibility-switch");
      if (label) label.textContent = enabled ? "On" : "Off";
    });
    syncHeroPlayback();
  }

  function setAccessibilityPref(key, value) {
    if (!(key in a11yPrefs)) return;
    a11yPrefs[key] = Boolean(value);
    writeJSON(STORAGE.a11y, a11yPrefs);
    applyAccessibilityPrefs();
  }

  /* ------------------------------------------------------------------------
     Cart / order storage
     ------------------------------------------------------------------------ */

  function readJSON(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* The demo still works in memory. */
    }
  }

  function normalizeCart(raw) {
    if (!Array.isArray(raw)) return [];
    const merged = new Map();
    raw.forEach((line) => {
      const product = PRODUCT_MAP[line && line.id];
      if (!product) return;
      const size = product.sizes.find((entry) => entry.id === line.sizeId);
      if (!size) return;
      const qty = Math.min(99, Math.max(1, Math.round(Number(line.qty) || 1)));
      const key = `${product.id}|${size.id}`;
      if (merged.has(key)) {
        merged.get(key).qty = Math.min(99, merged.get(key).qty + qty);
      } else {
        merged.set(key, { id: product.id, sizeId: size.id, qty });
      }
    });
    return [...merged.values()];
  }

  function loadOrders() {
    const raw = readJSON(STORAGE.orders, []);
    return Array.isArray(raw) ? raw : [];
  }

  let cart = normalizeCart(readJSON(STORAGE.cart, []));
  let orders = loadOrders();
  const state = {
    filter: "all",
    sort: "featured",
    shopColumns: 3,
    checkout: { shipping: "standard", payment: "card" },
    pdp: {
      productId: null,
      sizeId: null,
      qty: 1,
      gallery: 0,
      reviewSort: "recent",
      reviewFilter: "all",
      reviewVisible: 2
    }
  };

  const keyOf = (line) => `${line.id}|${line.sizeId}`;

  function saveCart() {
    writeJSON(STORAGE.cart, cart);
  }

  function saveOrders() {
    writeJSON(STORAGE.orders, orders);
  }

  function cartLines() {
    return cart
      .map((line) => {
        const product = PRODUCT_MAP[line.id];
        const size = product && product.sizes.find((entry) => entry.id === line.sizeId);
        if (!product || !size) return null;
        return {
          ...line,
          key: keyOf(line),
          product,
          size,
          price: size.price,
          lineTotal: size.price * line.qty
        };
      })
      .filter(Boolean);
  }

  function cartCount() {
    return cart.reduce((total, line) => total + line.qty, 0);
  }

  function cartSubtotal() {
    return cartLines().reduce((total, line) => total + line.lineTotal, 0);
  }

  function addLine(productId, sizeId, qty = 1) {
    const product = PRODUCT_MAP[productId];
    if (!product) return;
    const size = product.sizes.find((entry) => entry.id === sizeId);
    if (!size) return;
    const amount = Math.max(1, Math.min(99, Math.round(Number(qty) || 1)));
    const existing = cart.find((line) => line.id === productId && line.sizeId === sizeId);
    if (existing) {
      existing.qty = Math.min(99, existing.qty + amount);
    } else {
      cart.push({ id: productId, sizeId, qty: amount });
    }
    saveCart();
    updateCartUI();
    refreshCartView();
    openCart();
    showToast(`${product.name} added to your cart`);
  }

  function updateLineQty(key, delta) {
    const line = cart.find((entry) => keyOf(entry) === key);
    if (!line) return;
    line.qty = Math.max(0, Math.min(99, line.qty + delta));
    if (line.qty === 0) {
      cart = cart.filter((entry) => keyOf(entry) !== key);
    }
    saveCart();
    updateCartUI();
    refreshCartView();
  }

  function removeLine(key) {
    cart = cart.filter((entry) => keyOf(entry) !== key);
    saveCart();
    updateCartUI();
    refreshCartView();
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
  }

  /* ------------------------------------------------------------------------
     Product illustration
     ------------------------------------------------------------------------ */

  let visualUid = 0;

  function svgLabel(x, y, title, subtitle, ink) {
    return `
      <text x="${x}" y="${y}" text-anchor="middle" font-family="Inter Tight, Inter, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="-.8" fill="${ink}">kafantu</text>
      <text x="${x}" y="${y + 25}" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="9.5" font-weight="500" letter-spacing="1.35" fill="${ink}">${esc(title)}</text>
      <text x="${x}" y="${y + 44}" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="8" font-weight="400" letter-spacing="1.1" fill="${ink}" opacity=".72">${esc(subtitle)}</text>`;
  }

  function vesselMarkup(product, uid, palette) {
    const p = palette;
    const name = product.name.toUpperCase();
    const size = product.sizes[0].label.toUpperCase();

    if (product.vessel === "tube") {
      return `
        <rect x="330" y="238" width="140" height="74" rx="22" fill="url(#${uid}c)"/>
        <path d="M345 300h110l18 55v315a42 42 0 0 1-42 42h-62a42 42 0 0 1-42-42V355z" fill="url(#${uid}b)"/>
        <rect x="356" y="312" width="30" height="390" rx="15" fill="url(#${uid}l)"/>
        <rect x="350" y="390" width="100" height="186" rx="6" fill="${p.labelBg}" opacity=".96"/>
        <line x1="382" y1="411" x2="418" y2="411" stroke="${p.labelInk}" stroke-width=".8" opacity=".34"/>
        ${svgLabel(400, 440, name, size, p.labelInk)}`;
    }

    if (product.vessel === "dropper") {
      return `
        <rect x="365" y="205" width="70" height="160" rx="24" fill="url(#${uid}c)"/>
        <rect x="386" y="360" width="28" height="54" rx="4" fill="${p.cap2}"/>
        <path d="M338 405h124l20 52v224a44 44 0 0 1-44 44h-76a44 44 0 0 1-44-44V457z" fill="url(#${uid}b)"/>
        <rect x="352" y="420" width="22" height="270" rx="11" fill="url(#${uid}l)"/>
        <rect x="350" y="500" width="100" height="150" rx="6" fill="${p.labelBg}" opacity=".96"/>
        <line x1="382" y1="521" x2="418" y2="521" stroke="${p.labelInk}" stroke-width=".8" opacity=".34"/>
        ${svgLabel(400, 550, name, size, p.labelInk)}`;
    }

    if (product.vessel === "jar") {
      return `
        <rect x="292" y="425" width="216" height="78" rx="24" fill="url(#${uid}c)"/>
        <rect x="306" y="503" width="188" height="214" rx="30" fill="url(#${uid}b)"/>
        <rect x="322" y="520" width="28" height="170" rx="14" fill="url(#${uid}l)"/>
        <rect x="330" y="540" width="140" height="125" rx="6" fill="${p.labelBg}" opacity=".96"/>
        <line x1="382" y1="560" x2="418" y2="560" stroke="${p.labelInk}" stroke-width=".8" opacity=".34"/>
        ${svgLabel(400, 588, name, size, p.labelInk)}`;
    }

    if (product.vessel === "gloss") {
      return `
        <rect x="368" y="245" width="64" height="118" rx="18" fill="url(#${uid}c)"/>
        <rect x="354" y="363" width="92" height="352" rx="28" fill="url(#${uid}b)"/>
        <rect x="366" y="378" width="20" height="320" rx="10" fill="url(#${uid}l)"/>
        <rect x="366" y="470" width="68" height="150" rx="6" fill="${p.labelBg}" opacity=".96"/>
        <line x1="384" y1="490" x2="416" y2="490" stroke="${p.labelInk}" stroke-width=".8" opacity=".34"/>
        ${svgLabel(400, 518, name, size, p.labelInk)}`;
    }

    if (product.vessel === "compact") {
      return `
        <rect x="258" y="490" width="284" height="180" rx="44" fill="url(#${uid}b)"/>
        <ellipse cx="400" cy="490" rx="142" ry="50" fill="url(#${uid}c)"/>
        <ellipse cx="400" cy="490" rx="94" ry="29" fill="#ffffff" opacity=".18"/>
        <rect x="332" y="560" width="136" height="76" rx="6" fill="${p.labelBg}" opacity=".93"/>
        <line x1="382" y1="578" x2="418" y2="578" stroke="${p.labelInk}" stroke-width=".8" opacity=".34"/>
        ${svgLabel(400, 604, name, size, p.labelInk)}`;
    }

    return `
      <rect x="222" y="500" width="356" height="252" rx="14" fill="${p.body2}" opacity=".42"/>
      <rect x="240" y="520" width="320" height="210" rx="10" fill="${p.labelBg}" opacity=".96"/>
      <line x1="382" y1="560" x2="418" y2="560" stroke="${p.labelInk}" stroke-width=".8" opacity=".34"/>
      ${svgLabel(400, 592, "THE DAILY THREE", "3-PIECE SET", p.labelInk)}
      <rect x="248" y="350" width="88" height="180" rx="24" fill="url(#${uid}b)"/>
      <rect x="258" y="328" width="68" height="40" rx="12" fill="url(#${uid}c)"/>
      <rect x="368" y="292" width="64" height="238" rx="20" fill="url(#${uid}b)"/>
      <rect x="384" y="268" width="32" height="52" rx="12" fill="url(#${uid}c)"/>
      <rect x="500" y="422" width="112" height="112" rx="24" fill="url(#${uid}b)"/>
      <rect x="492" y="396" width="128" height="42" rx="14" fill="url(#${uid}c)"/>`;
  }

  function productVisual(product, variant = 0) {
    const p = PALETTES[product.palette] || PALETTES.sage;
    const uid = `pv${++visualUid}`;
    const rotate = variant === 1 ? -4 : 0;
    const scale = variant === 1 ? 1.4 : 1.3;
    const translateY = variant === 1 ? -18 : 0;

    return `<svg class="product-visual" viewBox="0 0 800 1000" role="img" aria-label="${esc(product.name)} placeholder product illustration" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${uid}g" cx="50%" cy="38%" r="62%">
          <stop offset="0" stop-color="${p.glow}" stop-opacity=".95"/>
          <stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${uid}b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${p.body1}"/>
          <stop offset=".55" stop-color="${p.body2}"/>
          <stop offset="1" stop-color="${p.body1}"/>
        </linearGradient>
        <linearGradient id="${uid}c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${p.cap1}"/>
          <stop offset="1" stop-color="${p.cap2}"/>
        </linearGradient>
        <linearGradient id="${uid}l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset=".45" stop-color="#ffffff" stop-opacity=".36"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <filter id="${uid}s" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18"/>
        </filter>
      </defs>
      <ellipse cx="400" cy="470" rx="300" ry="340" fill="url(#${uid}g)"/>
      <ellipse cx="400" cy="810" rx="182" ry="28" fill="${p.shadow}" opacity=".18" filter="url(#${uid}s)"/>
      <g transform="translate(400 560) rotate(${rotate}) scale(${scale}) translate(-400 -560) translate(0 ${translateY})">
        ${vesselMarkup(product, uid, p)}
      </g>
    </svg>`;
  }

  /* ------------------------------------------------------------------------
     DOM helpers
     ------------------------------------------------------------------------ */

  const dom = {};
  let revealObserver = null;
  let revealFallbackTimer = null;
  let toastTimer = null;
  let lastFocused = null;
  let accessibilityLastFocused = null;
  let a11yPrefs = {
    "large-text": false,
    "high-contrast": false,
    "reduce-motion": false
  };

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $$(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function getRoute() {
    const raw = window.location.hash.replace(/^#/, "") || "/";
    const [pathPart, queryPart = ""] = raw.split("?");
    return {
      path: pathPart || "/",
      params: new URLSearchParams(queryPart)
    };
  }

  function navigate(path) {
    if (window.location.hash === `#${path}`) {
      renderRoute();
    } else {
      window.location.hash = `#${path}`;
    }
  }

  function showToast(message) {
    if (!dom.toast) return;
    dom.toast.textContent = message;
    dom.toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      dom.toast.hidden = true;
    }, 2800);
  }

  function moneyFrom(product) {
    const min = Math.min(...product.sizes.map((size) => size.price));
    return product.sizes.length > 1 ? `from ${money(min)}` : money(min);
  }

  function productById(id) {
    return PRODUCT_MAP[id] || null;
  }

  /* ------------------------------------------------------------------------
     Overlays
     ------------------------------------------------------------------------ */

  function anyOverlayOpen() {
    return [...$$(".cart-drawer, .mobile-menu, .search-overlay, .modal, .accessibility-panel")].some((el) => !el.hidden);
  }

  function syncBodyLock() {
    document.body.classList.toggle("no-scroll", anyOverlayOpen());
  }

  function openOverlay(el, focusSelector) {
    if (!el) return;
    lastFocused = document.activeElement;
    el.hidden = false;
    syncBodyLock();
    const focusTarget = focusSelector ? el.querySelector(focusSelector) : el.querySelector("button, a, input");
    if (focusTarget) {
      window.setTimeout(() => focusTarget.focus({ preventScroll: true }), 30);
    }
  }

  function closeOverlay(el) {
    if (!el) return;
    el.hidden = true;
    syncBodyLock();
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus({ preventScroll: true });
    }
  }

  function closeAllOverlays() {
    [dom.mobileMenu, dom.cartDrawer, dom.searchOverlay, dom.earlyModal, dom.demoModal, dom.emailModal, dom.accessibilityPanel].forEach((el) => {
      if (el) el.hidden = true;
    });
    $$("[data-accessibility-open]").forEach((button) => button.setAttribute("aria-expanded", "false"));
    closeMega();
    document.body.classList.remove("no-scroll");
  }

  function openCart() {
    if (!dom.cartDrawer) return;
    closeMega();
    if (dom.mobileMenu && !dom.mobileMenu.hidden) closeMobileMenu();
    renderCartUI();
    openOverlay(dom.cartDrawer, ".close-button[data-cart-close]");
  }

  function closeCart() {
    closeOverlay(dom.cartDrawer);
  }

  function openMobileMenu() {
    if (!dom.mobileMenu) return;
    closeMega();
    openOverlay(dom.mobileMenu, ".close-button[data-menu-close]");
    const trigger = $("[data-menu-open]");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    if (!dom.mobileMenu) return;
    closeOverlay(dom.mobileMenu);
    const trigger = $("[data-menu-open]");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function openSearch() {
    if (!dom.searchOverlay) return;
    closeMega();
    if (dom.mobileMenu && !dom.mobileMenu.hidden) closeMobileMenu();
    if (dom.searchInput) dom.searchInput.value = "";
    openOverlay(dom.searchOverlay, "[data-search-input]");
    renderSearchResults("");
  }

  function closeSearch() {
    closeOverlay(dom.searchOverlay);
  }

  function openDemo() {
    openOverlay(dom.demoModal, ".close-button[data-demo-close]");
  }

  function closeDemo() {
    closeOverlay(dom.demoModal);
  }

  function openReviewModal() {
    openOverlay(dom.reviewModal, 'input[name="rating"]');
  }

  function closeReviewModal() {
    closeOverlay(dom.reviewModal);
  }

  function openEarly() {
    openOverlay(dom.earlyModal, "#early-email");
  }

  function closeEarly(markSeen = true) {
    if (markSeen) {
      try { window.localStorage.setItem(STORAGE.early, "1"); } catch (error) { /* no-op */ }
    }
    closeOverlay(dom.earlyModal);
  }

  function openEmailPreview(order) {
    if (!order) return;
    const content = $("[data-email-content]");
    if (content) content.innerHTML = emailPreviewHTML(order);
    openOverlay(dom.emailModal, ".close-button[data-email-close]");
  }

  function closeEmailPreview() {
    closeOverlay(dom.emailModal);
  }

  function openAccessibilityPanel() {
    if (!dom.accessibilityPanel) return;
    closeMega();
    accessibilityLastFocused = document.activeElement;
    dom.accessibilityPanel.hidden = false;
    $$("[data-accessibility-open]").forEach((button) => button.setAttribute("aria-expanded", "true"));
    syncBodyLock();
    const closeButton = dom.accessibilityPanel.querySelector("[data-accessibility-close]");
    if (closeButton) window.setTimeout(() => closeButton.focus({ preventScroll: true }), 20);
  }

  function closeAccessibilityPanel() {
    if (!dom.accessibilityPanel) return;
    dom.accessibilityPanel.hidden = true;
    $$("[data-accessibility-open]").forEach((button) => button.setAttribute("aria-expanded", "false"));
    syncBodyLock();
    if (accessibilityLastFocused && typeof accessibilityLastFocused.focus === "function") {
      accessibilityLastFocused.focus({ preventScroll: true });
    }
  }

  /* ------------------------------------------------------------------------
     Mega menu
     ------------------------------------------------------------------------ */

  const MEGA_FILTERS = ["featured", "skin", "lip-cheek", "sets", "on-the-go", "new"];

  function productsForFilter(filter) {
    if (filter === "all") return [...PRODUCTS];
    if (filter === "featured") return PRODUCTS.filter((product) => product.featured);
    if (filter === "new") return PRODUCTS.filter((product) => product.badge === "new");
    return PRODUCTS.filter((product) => product.filter === filter);
  }

  function renderMegaMenu(filter = "featured") {
    if (!dom.megaTabs || !dom.megaGrid) return;
    const current = MEGA_FILTERS.includes(filter) ? filter : "featured";
    dom.megaTabs.innerHTML = FILTERS.filter((entry) => MEGA_FILTERS.includes(entry.id)).map((entry) => `
      <button class="mega-tab ${entry.id === current ? "is-active" : ""}" type="button" data-mega-cat="${entry.id}">${esc(entry.label)}</button>
    `).join("");

    const items = productsForFilter(current).slice(0, 4);
    dom.megaGrid.innerHTML = items.map((product) => `
      <a class="mega-card" href="#/product/${product.id}" data-mega-close>
        <span class="mega-card__media">${productVisual(product)}<span class="mega-card__tag">${tagHTML(product)}</span></span>
        <span class="mega-card__copy">
          <span class="mega-card__name">${esc(product.name)}</span>
          <span class="mega-card__desc">${esc(product.descriptor)}</span>
          <span class="mega-card__price">${esc(moneyFrom(product))}</span>
          ${ratingHTML(product, "rating--small")}
        </span>
      </a>
    `).join("");
  }

  function openMega() {
    if (!dom.megaMenu) return;
    if (dom.megaMenu.hidden) renderMegaMenu("featured");
    dom.megaMenu.hidden = false;
    const trigger = $("[data-mega-toggle]");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    updateHeader();
  }

  function closeMega() {
    if (!dom.megaMenu) return;
    dom.megaMenu.hidden = true;
    const trigger = $("[data-mega-toggle]");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    updateHeader();
  }

  /* ------------------------------------------------------------------------
     Header
     ------------------------------------------------------------------------ */

  function updateHeader() {
    if (!dom.header) return;
    const route = getRoute();
    const home = route.path === "/";
    const scrolled = window.scrollY > 16;
    dom.header.classList.toggle("is-overlay", home);
    dom.header.classList.toggle("is-solid", !home || scrolled || (dom.megaMenu && !dom.megaMenu.hidden));
  }

  /* ------------------------------------------------------------------------
     Cart UI
     ------------------------------------------------------------------------ */

  function cartLineHTML(line, wide = false) {
    const optional = wide ? " cart-line--wide" : "";
    return `<div class="cart-line${optional}" data-line="${esc(line.key)}">
      <a class="cart-line__media" href="#/product/${line.product.id}" aria-label="View ${esc(line.product.name)}">${productVisual(line.product)}</a>
      <div>
        <a class="cart-line__name" href="#/product/${line.product.id}">${esc(line.product.name)}</a>
        <p class="cart-line__meta">${esc(line.size.label)}${wide ? ` · ${esc(line.product.category)}` : ""}</p>
        <p class="cart-line__price">${money(line.price)}</p>
      </div>
      <div class="cart-line__right">
        <div class="qty" aria-label="Quantity for ${esc(line.product.name)}">
          <button type="button" data-cart-qty="-1" data-key="${esc(line.key)}" aria-label="Decrease quantity">−</button>
          <span>${line.qty}</span>
          <button type="button" data-cart-qty="1" data-key="${esc(line.key)}" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-link" type="button" data-cart-remove="${esc(line.key)}">Remove</button>
      </div>
    </div>`;
  }

  function cartDrawerBodyHTML() {
    const lines = cartLines();
    if (!lines.length) {
      return `<div class="cart-empty">
        <h3>your cart is empty</h3>
        <p>Start with a short edit of everyday essentials.</p>
        <a class="btn btn--dark" href="#/shop" data-cart-close>Shop the collection</a>
      </div>`;
    }
    return lines.map((line) => cartLineHTML(line)).join("");
  }

  function cartDrawerFootHTML() {
    const lines = cartLines();
    if (!lines.length) return "";
    const subtotal = cartSubtotal();
    const remaining = Math.max(0, FREE_SHIPPING - subtotal);
    const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
    return `
      <div class="ship-progress">
        <p>${remaining > 0 ? `You're ${money(remaining)} away from free US shipping.` : "Free US shipping applied."}</p>
        <div class="ship-progress__bar"><span style="width:${progress}%"></span></div>
      </div>
      <div class="cart-total-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
      <a class="btn btn--dark btn--full" href="#/checkout" data-cart-close>Continue to checkout</a>
      <p class="fineprint">Shipping and estimated tax are calculated at checkout. Demo only.</p>
      <a class="text-link" href="#/cart" data-cart-close style="margin-top:12px">View the cart <span aria-hidden="true">→</span></a>
    `;
  }

  function updateCartUI() {
    $$("[data-cart-count]").forEach((el) => {
      el.textContent = `(${cartCount()})`;
    });
    const body = $("[data-cart-drawer-body]");
    const foot = $("[data-cart-drawer-foot]");
    if (body) body.innerHTML = cartDrawerBodyHTML();
    if (foot) foot.innerHTML = cartDrawerFootHTML();
  }

  function renderCartUI() {
    updateCartUI();
  }

  function refreshCartView() {
    const route = getRoute();
    if (route.path === "/cart") {
      if (!dom.view) return;
      dom.view.innerHTML = cartPageHTML();
      initReveal();
    }
    if (route.path === "/checkout") {
      const summary = $("[data-checkout-summary]");
      if (summary) summary.innerHTML = checkoutSummaryHTML();
    }
  }

  /* ------------------------------------------------------------------------
     Small building blocks
     ------------------------------------------------------------------------ */

  function formatReviewCount(count) {
    return new Intl.NumberFormat("en-US").format(Number(count) || 0);
  }

  function starStripHTML(rating) {
    const value = Math.max(0, Math.min(5, Number(rating) || 0));
    const percent = (value / 5) * 100;
    return `<span class="rating__stars" aria-hidden="true">
      <span class="rating__base">★★★★★</span>
      <span class="rating__fill" style="width:${percent.toFixed(2)}%">★★★★★</span>
    </span>`;
  }

  function ratingHTML(product, extraClass = "") {
    const value = Math.max(0, Math.min(5, Number(product.rating) || 0));
    const count = Number(product.reviewCount) || 0;
    return `<span class="rating ${extraClass}" aria-label="Rated ${value.toFixed(1)} out of 5 from ${formatReviewCount(count)} reviews">
      ${starStripHTML(value)}
      <span class="rating__count">(${formatReviewCount(count)})</span>
    </span>`;
  }

  function productCardRatingHTML(product) {
    const value = Math.max(0, Math.min(5, Number(product.rating) || 0));
    const count = Number(product.reviewCount) || 0;
    return `<span class="rating rating--card" aria-label="Rated ${value.toFixed(1)} out of 5 from ${formatReviewCount(count)} reviews">
      ${starStripHTML(value)}
      <span class="rating__count">${formatReviewCount(count)} reviews</span>
    </span>`;
  }

  function filteredPdpReviews(product) {
    const filter = state.pdp.reviewFilter;
    let reviews = SAMPLE_REVIEWS.map((review, index) => ({ ...review, reviewId: index, productName: product.name }));
    if (filter !== "all") reviews = reviews.filter((review) => Number(review.stars) === Number(filter));
    const byReviewDate = (a, b) => Number(a.daysAgo) - Number(b.daysAgo);
    switch (state.pdp.reviewSort) {
      case "oldest":
        reviews.sort((a, b) => byReviewDate(b, a));
        break;
      case "helpful":
        reviews.sort((a, b) => Number(b.helpful) - Number(a.helpful) || byReviewDate(a, b));
        break;
      case "least-helpful":
        reviews.sort((a, b) => Number(a.helpful) - Number(b.helpful) || byReviewDate(a, b));
        break;
      case "highest":
        reviews.sort((a, b) => Number(b.stars) - Number(a.stars) || byReviewDate(a, b));
        break;
      case "lowest":
        reviews.sort((a, b) => Number(a.stars) - Number(b.stars) || byReviewDate(a, b));
        break;
      default:
        reviews.sort(byReviewDate);
    }
    return reviews;
  }

  function reviewRowHTML(review) {
    const ease = Math.max(1, Math.min(5, Number(review.ease) || 4));
    const easePercent = ((ease - 1) / 4) * 100;
    return `<article class="review-row">
      <div class="review-row__meta">
        <p class="review-row__name">${esc(review.name)}</p>
        <p class="review-row__verified">Verified Buyer ${review.verified ? '<span aria-hidden="true">✓</span>' : ""}</p>
        <p class="review-row__label">Reviewing</p>
        <p class="review-row__value">${esc(review.productName)}</p>
        <p class="review-row__label">Age Range</p>
        <p class="review-row__value">${esc(review.age)}</p>
        <p class="review-row__label">Biggest Skin Concern</p>
        <p class="review-row__value">${esc(review.concern)}</p>
        <p class="review-row__label">What is your skin type?</p>
        <p class="review-row__value">${esc(review.skinType)}</p>
        <p class="review-row__label">What are your favorite features?</p>
        <p class="review-row__value">${esc(review.features)}</p>
      </div>
      <div class="review-row__body">
        <div class="review-row__top">
          <span class="rating rating--review" aria-label="Rated ${Number(review.stars)} out of 5">${starStripHTML(review.stars)}</span>
          <span class="review-row__date">${esc(review.date)}</span>
        </div>
        <h3>${esc(review.title)}</h3>
        <p>${esc(review.body)}</p>
        <div class="review-row__ease">
          <p>How easy is it to apply this product?</p>
          <div class="review-ease" style="--review-ease:${easePercent}%">
            <span>Not very easy</span>
            <span class="review-ease__track" aria-hidden="true"><i></i></span>
            <span>Super easy</span>
          </div>
        </div>
        <p class="review-row__helpful">Was this helpful?
          <span><svg aria-hidden="true" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 10v9H4.5v-9H8Zm1 9h6.1a2 2 0 0 0 1.9-1.4l1.3-4.2a1.8 1.8 0 0 0-1.7-2.4h-3.3V6.2A2.2 2.2 0 0 0 11.1 4L8 10Z"></path></svg>${Number(review.helpful) || 0}</span>
          <span><svg aria-hidden="true" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M16 14V5h3.5v9H16Zm-1-9H8.9a2 2 0 0 0-1.9 1.4l-1.3 4.2a1.8 1.8 0 0 0 1.7 2.4h3.3v4.8A2.2 2.2 0 0 0 12.9 20L16 14Z"></path></svg>0</span>
        </p>
      </div>
    </article>`;
  }

  function reviewListHTML(product) {
    const reviews = filteredPdpReviews(product);
    if (!reviews.length) {
      return `<p class="pdp-reviews__empty">No reviews match this filter.</p>`;
    }
    const visible = Math.min(state.pdp.reviewVisible, reviews.length);
    return reviews.slice(0, visible).map(reviewRowHTML).join("");
  }

  function reviewSectionHTML(product) {
    const rating = Math.max(0, Math.min(5, Number(product.rating) || 0));
    const total = Number(product.reviewCount) || 0;
    const reviews = filteredPdpReviews(product);
    const visible = Math.min(state.pdp.reviewVisible, reviews.length);
    const sortOptions = REVIEW_SORT_OPTIONS.map((option) => `<option value="${option.id}" ${state.pdp.reviewSort === option.id ? "selected" : ""}>${esc(option.label)}</option>`).join("");
    const filterButtons = ["all", "5", "4", "3", "2", "1"].map((value) => {
      const label = value === "all" ? "All" : `${value} ★`;
      return `<button type="button" data-review-filter="${value}" class="${state.pdp.reviewFilter === value ? "is-active" : ""}" aria-pressed="${state.pdp.reviewFilter === value ? "true" : "false"}">${label}</button>`;
    }).join("");
    return `<section class="pdp-reviews shell" id="pdp-reviews" aria-labelledby="pdp-reviews-title">
      <h2 class="sr-only" id="pdp-reviews-title">Reviews</h2>
      <div class="pdp-reviews__head">
        <div class="pdp-reviews__score">
          <div class="pdp-reviews__score-line">
            <strong>${rating.toFixed(1)}</strong>
            <span class="rating rating--large" aria-label="Rated ${rating.toFixed(1)} out of 5 from ${formatReviewCount(total)} reviews">${starStripHTML(rating)}</span>
          </div>
          <p class="pdp-reviews__avg-label">Average rating</p>
          <p class="pdp-reviews__avg-count">Based on ${formatReviewCount(total)} reviews</p>
          <button class="text-link pdp-reviews__write" type="button" data-review-open>write a review</button>
        </div>
      </div>
      <div class="pdp-reviews__toolbar">
        <button class="pdp-reviews__filter-toggle" type="button" data-review-filters aria-expanded="false" aria-controls="pdp-review-filters">
          <svg aria-hidden="true" viewBox="0 0 20 14" width="18" height="13" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M1 2h18M4 7h12M7 12h6"></path></svg>
          Filters
        </button>
        <label class="pdp-reviews__sort">
          <span class="sr-only">Sort reviews</span>
          <select data-review-sort aria-label="Sort reviews">${sortOptions}</select>
          <svg aria-hidden="true" viewBox="0 0 12 8" width="10" height="7" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m1 1 5 5 5-5"></path></svg>
        </label>
      </div>
      <div class="pdp-reviews__filter-panel" id="pdp-review-filters" data-review-filter-panel hidden>
        <p class="eyebrow">Filter by rating</p>
        <div class="pdp-reviews__filter-options">${filterButtons}</div>
      </div>
      <div class="pdp-reviews__list" data-review-list aria-live="polite">${reviewListHTML(product)}</div>
      <div class="pdp-reviews__footer">
        <button class="pdp-reviews__show-more" type="button" data-review-show-more ${visible >= reviews.length ? "hidden" : ""}>Show More</button>
        <p class="pdp-reviews__note">Sample review content for design preview only. In production, ratings and reviews must come from verified customers and pass moderation.</p>
      </div>
    </section>`;
  }

  function tagHTML(product) {
    return product.badge ? `<span class="tag">${esc(product.badge)}</span>` : "";
  }

  function productCardHTML(product, options = {}) {
    const related = Boolean(options.related);
    const shopCard = Boolean(options.shop);
    const multiple = product.sizes.length > 1;
    const buyLabel = `BUY ${product.name.toUpperCase()} — ${moneyFrom(product)}`;
    const actionLabel = shopCard
      ? `<span class="quick-buy__long">${esc(buyLabel)}</span><span class="quick-buy__short" aria-hidden="true">Buy</span>`
      : "Buy";
    const actionClass = `product-card__quick${shopCard ? " product-card__quick--shop" : ""}`;
    const actionAria = multiple ? `Choose a size for ${esc(product.name)}` : `Buy ${esc(product.name)}`;
    const action = multiple
      ? `<button class="${actionClass}" type="button" data-quick-toggle="${product.id}" aria-label="${actionAria}">${actionLabel}</button>`
      : `<button class="${actionClass}" type="button" data-add-to-cart="${product.id}" data-size="${product.sizes[0].id}" aria-label="${actionAria}">${actionLabel}</button>`;
    const shopLink = options.showShopLink && !related
      ? `<a class="product-card__shop" href="#/product/${product.id}" aria-label="Shop ${esc(product.name)}">shop ${esc(product.display || product.name)} <span aria-hidden="true">↗</span></a>`
      : "";
    const hoverImage = RELATED_HOVER_IMAGES[product.id] || "assets/images/editorial-2.jpg";
    const relatedBuy = multiple
      ? `<button class="product-card__buy" type="button" data-quick-toggle="${product.id}" aria-label="Choose a size for ${esc(product.name)}">BUY ${esc(product.name.toUpperCase())} — ${esc(moneyFrom(product))}</button>`
      : `<button class="product-card__buy" type="button" data-add-to-cart="${product.id}" data-size="${product.sizes[0].id}" aria-label="Buy ${esc(product.name)}">BUY ${esc(product.name.toUpperCase())} — ${esc(moneyFrom(product))}</button>`;
    const relatedUI = related
      ? relatedBuy
      : `<div class="product-card__actions${shopCard ? " product-card__actions--shop" : ""}">${action}</div>`;

    const quickPanel = multiple ? `
      <div class="quick-add" data-quick-panel="${product.id}" hidden>
        <button class="close-button" type="button" data-quick-close="${product.id}" aria-label="Close size options">Close <span aria-hidden="true">×</span></button>
        <p>Select size</p>
        <div class="quick-add__sizes">
          ${product.sizes.map((size) => `<button type="button" data-quick-size="${product.id}|${size.id}">${esc(size.label)} — ${money(size.price)}</button>`).join("")}
        </div>
      </div>` : "";

    return `<article class="product-card product-card--reference${related ? " product-card--related" : ""}" data-product-card="${product.id}">
      <div class="product-card__top">
        <h3 class="product-card__display"><a href="#/product/${product.id}">${esc(product.display || product.name)}</a></h3>
        ${tagHTML(product)}
      </div>
      <div class="product-card__media-wrap">
        <a class="product-card__media" href="#/product/${product.id}" aria-label="View ${esc(product.name)}">
          ${productVisual(product)}
          ${related ? `<span class="product-card__alt" aria-hidden="true"><img src="${hoverImage}" alt="" loading="lazy" decoding="async"></span>` : ""}
        </a>
        ${shopLink}
        ${relatedUI}
      </div>
      <div class="product-card__bottom">
        ${related ? productCardRatingHTML(product) : ratingHTML(product)}
        <div class="product-card__row">
          <span class="product-card__title"><a href="#/product/${product.id}">${esc(product.name)}</a></span>
          <span class="product-card__price">${esc(moneyFrom(product))}</span>
        </div>
        <p class="product-card__desc">${esc(product.descriptor)}</p>
      </div>
      ${quickPanel}
    </article>`;
  }

  function miniCardHTML(product) {
    return `<a class="mini-card" href="#/product/${product.id}">
      <span class="mini-card__media">${productVisual(product)}</span>
      <span>
        <span class="mini-card__name">${esc(product.name)}</span>
        <span class="mini-card__desc">${esc(product.descriptor)}</span>
        <span class="mini-card__price">${esc(moneyFrom(product))}</span>
      </span>
    </a>`;
  }

  function homeFeatureHTML(product) {
    const multiple = product.sizes.length > 1;
    const action = multiple
      ? `<a class="feature-card__buy" href="#/product/${product.id}">Buy — ${moneyFrom(product)}</a>`
      : `<button class="feature-card__buy" type="button" data-add-to-cart="${product.id}" data-size="${product.sizes[0].id}">Buy — ${moneyFrom(product)}</button>`;

    return `<article class="feature-card" data-product-card="${product.id}">
      <a class="feature-card__media" href="#/product/${product.id}" aria-label="View ${esc(product.name)}">
        ${productVisual(product)}
        ${tagHTML(product)}
      </a>
      <div class="feature-card__info">
        <div class="feature-card__copy">
          <p class="feature-card__meta">${esc(product.category)} <span aria-hidden="true">/</span> ${esc(product.index)}</p>
          <h3 class="feature-card__title"><a href="#/product/${product.id}">${esc(product.name)}</a></h3>
          <p class="feature-card__desc">${esc(product.descriptor)}</p>
        </div>
        <span class="feature-card__price">${esc(moneyFrom(product))}</span>
      </div>
      ${action}
    </article>`;
  }

  function valuesPanelHTML(key) {
    const value = VALUES[key] || VALUES.mission;
    return `<h2>${esc(value.title)}</h2>
      <p>${esc(value.body)}</p>
      <a class="btn btn--outline" href="#/features">our values <span aria-hidden="true">→</span></a>`;
  }

  const VALUES_IMAGES = {
    mission: "assets/images/about.jpg",
    philanthropy: "assets/images/editorial-2.jpg",
    sustainability: "assets/images/editorial-1.jpg"
  };

  const SPOTTED_PHOTOS = [
    ["assets/images/social-1.jpg", "Placeholder community portrait in soft daylight."],
    ["assets/images/hero.jpg", "Placeholder close-up portrait in natural light."],
    ["assets/images/social-2.jpg", "Placeholder community portrait against a neutral wall."],
    ["assets/images/social-3.jpg", "Placeholder lifestyle portrait for the concept community."],
    ["assets/images/banner.jpg", "Placeholder portrait in a warm studio setting."],
    ["assets/images/social-4.jpg", "Placeholder portrait in warm natural light."],
    ["assets/images/hero-video-poster.jpg", "Placeholder close-up portrait for the concept community."],
    ["assets/images/editorial-1.jpg", "Placeholder community image of hands holding a skincare bottle."]
  ];

  /* ------------------------------------------------------------------------
     Home
     ------------------------------------------------------------------------ */

  function quickAddPanelHTML(product) {
    if (product.sizes.length < 2) return "";
    return `<div class="quick-add quick-add--showcase" data-quick-panel="${product.id}" hidden>
      <button class="close-button" type="button" data-quick-close="${product.id}" aria-label="Close size options">Close <span aria-hidden="true">×</span></button>
      <p>Select size</p>
      <div class="quick-add__sizes">
        ${product.sizes.map((size) => `<button type="button" data-quick-size="${product.id}|${size.id}">${esc(size.label)} — ${money(size.price)}</button>`).join("")}
      </div>
    </div>`;
  }

  function showcaseCardHTML(product) {
    const multiple = product.sizes.length > 1;
    const label = `BUY ${product.name} — ${moneyFrom(product)}`.toUpperCase();
    const action = multiple
      ? `<button class="showcase-buy" type="button" data-quick-toggle="${product.id}">${esc(label)}</button>`
      : `<button class="showcase-buy" type="button" data-add-to-cart="${product.id}" data-size="${product.sizes[0].id}">${esc(label)}</button>`;
    const hoverImage = RELATED_HOVER_IMAGES[product.id] || "assets/images/editorial-2.jpg";

    return `<article class="showcase-card" data-product-card="${product.id}">
      <div class="showcase-card__media" aria-hidden="true">${productVisual(product)}<span class="showcase-card__alt"><img src="${hoverImage}" alt="" loading="lazy" decoding="async"></span></div>
      <a class="showcase-card__link" href="#/product/${product.id}" aria-label="View ${esc(product.name)}"></a>
      <div class="showcase-card__top">
        <h2 class="showcase-card__title"><a href="#/product/${product.id}">${esc(product.name)}</a></h2>
        ${tagHTML(product)}
      </div>
      <div class="showcase-card__bottom">
        <div class="showcase-card__copy">
          <p class="showcase-card__meta">${esc(product.category)} <span aria-hidden="true">/</span> ${esc(product.index)}</p>
          <p class="showcase-card__desc">${esc(product.descriptor)}</p>
          ${ratingHTML(product, "rating--small")}
        </div>
        <span class="showcase-card__price">${esc(moneyFrom(product))}</span>
      </div>
      <div class="showcase-card__actions">${action}</div>
      ${quickAddPanelHTML(product)}
    </article>`;
  }

  function homeHTML() {
    const socialImages = [
      ["assets/images/social-1.jpg", "A portrait placeholder for the kafantu community."],
      ["assets/images/social-2.jpg", "A portrait placeholder for the kafantu community."],
      ["assets/images/social-3.jpg", "A portrait placeholder for the kafantu community."],
      ["assets/images/social-4.jpg", "A portrait placeholder for the kafantu community."],
      ["assets/images/about.jpg", "A placeholder editorial portrait for the kafantu community."],
      ["assets/images/pdp-lifestyle.jpg", "A placeholder lifestyle image for the kafantu community."]
    ];

    return `<div class="home">
      <section class="hero">
        <div class="hero__media">
          <img class="hero__poster" src="assets/images/hero-video-poster.jpg" alt="A close-up placeholder portrait in soft light." fetchpriority="high">
          <video class="hero__video" data-hero-video autoplay muted loop playsinline preload="metadata" poster="assets/images/hero-video-poster.jpg" aria-hidden="true">
            <source src="assets/video/hero-loop.mp4" type="video/mp4">
          </video>
        </div>
        <div class="hero__content">
          <h1>skin, simplified</h1>
          <a class="hero__pill" href="#/shop">
            <span>the daily ritual — shop the edit —</span>
          </a>
        </div>
      </section>

      <section class="home-edit home-edit--showcase" aria-label="The edit">
        <div class="showcase-frame">
          <div class="rail__viewport rail__viewport--showcase" id="home-rail" data-rail-viewport data-drag-rail>
            ${PRODUCTS.map(showcaseCardHTML).join("")}
          </div>
          <div class="home-edit__controls">
            <button class="showcase-arrow showcase-arrow--prev" type="button" data-rail-prev="home-rail" aria-label="Previous product">
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m14.5 5-7 7 7 7"></path></svg>
            </button>
            <button class="showcase-arrow showcase-arrow--next" type="button" data-rail-next="home-rail" aria-label="Next product">
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m9.5 5 7 7-7 7"></path></svg>
            </button>
          </div>
          <div class="swipe-cursor" data-swipe-cursor aria-hidden="true"><span>swipe</span></div>
        </div>
      </section>

      <section class="editorial editorial--reverse">
        <div class="editorial__media">
          <img src="assets/images/editorial-2.jpg" alt="A placeholder still life of an amber bottle in warm light.">
        </div>
        <div class="editorial__copy">
          <h2>a softer start</h2>
          <p>A milky cleanse that leaves skin feeling comfortable, not stripped. The first step in a routine you'll actually keep.</p>
          <a class="btn" href="#/product/soft-cleanse">meet soft cleanse</a>
        </div>
      </section>

      <section class="statement">
        <img class="statement__bg" src="assets/images/about.jpg" alt="">
        <div class="statement__copy">
          <h2>fewer formulas. better days</h2>
          <p>We make a short list of essentials, each one considered and made to be used every day. No crowded shelf. No complicated routine.</p>
          <a class="btn" href="#/shop">shop all</a>
        </div>
      </section>

      <section class="editorial">
        <div class="editorial__media">
          <img src="assets/images/editorial-1.jpg" alt="A placeholder editorial image of hands holding a dropper bottle.">
        </div>
        <div class="editorial__copy">
          <h2>the barrier edit</h2>
          <p>A cushiony layer for skin that needs a little more. Meet the daily balm — our answer to dry days, long weeks, and everything in between.</p>
          <a class="btn" href="#/product/daily-balm">JUST IN CASE</a>
        </div>
      </section>

      <section class="social">
        <div class="social__head">
          <h2>you + kafantu</h2>
          <a class="btn btn--outline" href="#/" data-demo-link>Find us on social</a>
        </div>
        <div class="social__rail">
          <div class="social__track" id="social-rail" data-rail-viewport data-drag-rail>
            ${socialImages.map(([file, alt], index) => `
              <a class="social-card" href="#/" data-demo-link aria-label="Open the kafantu social placeholder ${index + 1}">
                <img src="${file}" alt="${esc(alt)}">
              </a>`).join("")}
          </div>
        </div>
        <div class="social__controls social__controls--round4">
          <div class="social__progress"><span data-social-progress></span></div>
          <div class="rail__arrows rail__arrows--social">
            <button class="rail-arrow rail-arrow--symbol" type="button" data-rail-prev="social-rail" aria-label="Previous social images">&lt;</button>
            <button class="rail-arrow rail-arrow--symbol" type="button" data-rail-next="social-rail" aria-label="Next social images">&gt;</button>
          </div>
        </div>
      </section>

      <section class="values values--round4">
        <div class="values__grid">
          <div class="values__content">
            <div class="values__intro">
              <h2 data-values-title>${esc(VALUES.mission.title)}</h2>
              <p class="values__body" data-values-description aria-live="polite">${esc(VALUES.mission.body)}</p>
              <a class="btn btn--outline" href="#/features">our values</a>
            </div>
            <div class="values__list" role="tablist" aria-label="Our approach">
              ${Object.entries(VALUES).map(([key, value], index) => `
                <button class="values__tab ${index === 0 ? "is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-values-tab="${key}">${esc(value.label)}</button>
              `).join("")}
            </div>
          </div>
          <div class="values__media">
            <img data-values-image src="${VALUES_IMAGES.mission}" alt="A placeholder editorial image for the kafantu mission.">
          </div>
        </div>
      </section>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     Shop
     ------------------------------------------------------------------------ */

  function sortedProducts() {
    const list = productsForFilter(state.filter);
    if (state.sort === "price-ascending") {
      list.sort((a, b) => Math.min(...a.sizes.map((s) => s.price)) - Math.min(...b.sizes.map((s) => s.price)));
    } else if (state.sort === "price-descending") {
      list.sort((a, b) => Math.min(...b.sizes.map((s) => s.price)) - Math.min(...a.sizes.map((s) => s.price)));
    } else if (state.sort === "title-ascending") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sort === "title-descending") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (state.sort === "created-descending") {
      list.sort((a, b) => Number(b.index) - Number(a.index));
    }
    return list;
  }

  function shopViewSwitchHTML() {
    const cells = (count) => Array.from({ length: count }, () => "<span></span>").join("");
    return `<div class="shop-view" role="group" aria-label="Product grid view">
      <button class="shop-view__button" type="button" data-shop-view="2" aria-label="Show products in a two-column grid" aria-pressed="${state.shopColumns === 2}">${cells(4)}</button>
      <button class="shop-view__button" type="button" data-shop-view="3" aria-label="Show products in a three-column grid" aria-pressed="${state.shopColumns === 3}">${cells(6)}</button>
    </div>`;
  }

  function shopPageHTML(params) {
    const collection = params.get("collection");
    state.filter = FILTERS.some((entry) => entry.id === collection) ? collection : "all";
    state.sort = "featured";
    state.shopColumns = 3;

    return `<div class="shop">
      <section class="shop-banner shell">
        <img src="assets/images/banner.jpg" alt="A placeholder editorial still life in warm, neutral light.">
        <div class="shop-banner__copy">
          <h1>fewer things, chosen well.</h1>
        </div>
      </section>
      <div class="shop-filters shell">
        <div class="filter-list" aria-label="Filter products">
          ${FILTERS.map((entry) => `<button class="filter-button ${entry.id === state.filter ? "is-active" : ""}" type="button" data-filter="${entry.id}">${esc(entry.label)}</button>`).join("")}
        </div>
      </div>
      <div class="shell">
        <div class="shop-sortbar">
          <label class="shop-sort">
            <span>Sort:</span>
            <select class="sort-select" id="sort" data-sort aria-label="Sort products">
              ${SORT_OPTIONS.map((entry) => `<option value="${entry.id}" ${entry.id === state.sort ? "selected" : ""}>${esc(entry.label)}</option>`).join("")}
            </select>
          </label>
          <div class="shop-sortbar__end">
            <span class="shop-count" data-shop-count>${sortedProducts().length} products</span>
            ${shopViewSwitchHTML()}
          </div>
        </div>
        <div class="product-grid" data-product-grid data-shop-columns="${state.shopColumns}">
          ${sortedProducts().map((product) => productCardHTML(product, { shop: true })).join("")}
        </div>
      </div>
    </div>`;
  }

  function updateShopGrid() {
    const grid = $("[data-product-grid]");
    if (!grid) return;
    const list = sortedProducts();
    grid.dataset.shopColumns = String(state.shopColumns);
    grid.innerHTML = list.length
      ? list.map((product) => productCardHTML(product, { shop: true })).join("")
      : `<div class="shop-empty" style="grid-column:1/-1"><h2>nothing here yet.</h2><p>Try another category.</p></div>`;
    const count = $("[data-shop-count]");
    if (count) count.textContent = `${list.length} ${list.length === 1 ? "product" : "products"}`;
    $$("[data-filter]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === state.filter);
    });
    $$("[data-shop-view]").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.shopView) === state.shopColumns));
    });
    const sort = $("[data-sort]");
    if (sort) sort.value = state.sort;
    const nextHash = state.filter === "all" ? "#/shop" : `#/shop?collection=${state.filter}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
    initReveal();
  }

  /* ------------------------------------------------------------------------
     Product detail
     ------------------------------------------------------------------------ */

  function galleryItems(product) {
    return [
      { type: "svg", variant: 0, alt: `${product.name} placeholder product illustration` },
      { type: "image", src: "assets/images/editorial-1.jpg", alt: "Placeholder editorial image of hands holding a dropper bottle." },
      { type: "image", src: "assets/images/editorial-2.jpg", alt: "Placeholder still life of an amber bottle in warm light." },
      { type: "svg", variant: 1, alt: `${product.name} placeholder product illustration, detail` }
    ];
  }

  function galleryMediaHTML(item, product) {
    if (item.type === "image") {
      return `<img src="${item.src}" alt="${esc(item.alt)}">`;
    }
    return productVisual(product, item.variant);
  }

  function productPageHTML(product) {
    const items = galleryItems(product);
    state.pdp = {
      productId: product.id,
      sizeId: product.sizes[0].id,
      qty: 1,
      gallery: 0,
      reviewSort: "recent",
      reviewFilter: "all",
      reviewVisible: 2
    };
    const selectedSize = product.sizes[0];
    const related = PRODUCTS.filter((entry) => entry.id !== product.id).slice(0, 6);
    const tabs = [
      { id: "benefits", label: "Benefits", body: `<ul>${product.benefits.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` },
      { id: "application", label: "Application", body: `<p>${esc(product.application)}</p>` },
      { id: "ingredients", label: "Key Ingredients", body: `<p>${esc(product.ingredients)}</p>` }
    ];
    const palette = PALETTES[product.palette] || PALETTES.sage;
    const darkCta = ["amber", "rose"].includes(product.palette);
    const ctaBg = darkCta ? palette.body2 : palette.body1;
    const ctaInk = darkCta ? "#fffaf4" : palette.labelInk;

    return `<div class="pdp-page">
      <section class="pdp pdp--round4 pdp--round5 shell">
        <div class="pdp-gallery">
          <div class="pdp-main" data-pdp-swipe>
            <div class="pdp-main__media" data-pdp-main-media>${galleryMediaHTML(items[0], product)}</div>
            ${tagHTML(product)}
            <div class="pdp-thumbs" aria-label="Product images">
              ${items.map((item, index) => `
                <button class="pdp-thumb ${index === 0 ? "is-active" : ""}" type="button" data-gallery="${index}" aria-label="View image ${index + 1}" aria-current="${index === 0 ? "true" : "false"}">
                  ${galleryMediaHTML(item, product)}
                </button>
              `).join("")}
            </div>
            <p class="sr-only" aria-live="polite" data-gallery-status>Image 1 of ${items.length}</p>
          </div>
        </div>

        <div class="pdp-buybox">
          <h1>${esc(product.name)}</h1>
          <p class="pdp-sub">${esc(product.descriptor)}</p>
          <div class="pdp-rating">
            ${ratingHTML(product)}
            <button class="text-link pdp-rating__link" type="button" data-review-scroll>read reviews</button>
          </div>
          <p class="pdp-description">${esc(product.description)}</p>

          ${product.sizes.length > 1 ? `
            <div class="pdp-option">
              <p class="pdp-option__title">Select size</p>
              <div class="size-list" data-pdp-sizes>
                ${product.sizes.map((size, index) => `<button class="size-button ${index === 0 ? "is-active" : ""}" type="button" data-pdp-size="${size.id}">${esc(size.label)}</button>`).join("")}
              </div>
            </div>` : ""}

          <button class="pdp-cta" type="button" data-pdp-add style="--pdp-accent:${ctaBg};--pdp-accent-ink:${ctaInk}">
            BUY ${esc(product.name.toUpperCase())} — <span data-pdp-button-price>${money(selectedSize.price)}</span>
          </button>

          <div class="pdp-tabs">
            ${tabs.map((tab) => `
              <div class="pdp-accordion">
                <button class="pdp-tab" type="button" aria-expanded="false" data-pdp-tab="${tab.id}">
                  <span>${esc(tab.label)}</span>
                  <span class="pdp-tab__icon" aria-hidden="true">+</span>
                </button>
                <div class="pdp-panel" data-pdp-panel="${tab.id}" hidden>${tab.body}</div>
              </div>`).join("")}
          </div>
        </div>
      </section>

      <section class="pdp-spotted shell" aria-labelledby="pdp-spotted-title">
        <div class="pdp-spotted__head">
          <h2 id="pdp-spotted-title">spotted on you</h2>
        </div>
        <div class="pdp-spotted__stage">
          <div class="pdp-spotted__rail" id="pdp-spotted-rail" data-rail-viewport data-drag-rail>
            ${SPOTTED_PHOTOS.map(([src, alt], index) => `
              <figure class="pdp-spotted__card">
                <img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">
              </figure>
            `).join("")}
          </div>
          <button class="pdp-spotted__arrow pdp-spotted__arrow--prev" type="button" data-rail-prev="pdp-spotted-rail" aria-label="Previous community photos">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m14.5 5-7 7 7 7"></path></svg>
          </button>
          <button class="pdp-spotted__arrow pdp-spotted__arrow--next" type="button" data-rail-next="pdp-spotted-rail" aria-label="Next community photos">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9.5 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </section>

      <section class="pdp-story shell">
        <div class="pdp-story__copy">
          <h2>made for the everyday</h2>
          <p>${esc(product.description)}</p>
          <div class="pdp-story__facts">
            <div><span>Good for</span><strong>Everyday use</strong></div>
            <div><span>Format</span><strong>${esc(selectedSize.label)}</strong></div>
            <div><span>Use</span><strong>Follow the application notes</strong></div>
            <div><span>Formula</span><strong>Placeholder — final details to be confirmed</strong></div>
          </div>
        </div>
        <div class="pdp-story__media">
          <img src="assets/images/pdp-lifestyle.jpg" alt="A placeholder lifestyle image of a skincare routine.">
        </div>
      </section>

      <section class="pdp-results shell">
        <div class="pdp-results__media">
          <img src="assets/images/editorial-1.jpg" alt="A placeholder editorial skincare image.">
        </div>
        <div class="pdp-results__copy">
          <p class="eyebrow">Results</p>
          <h2>verified results will live here</h2>
          <p>This concept demo does not include clinical percentages, before-and-after imagery or awards. The reviews shown on this page are sample content for layout only; production reviews must come from verified buyers.</p>
          <div class="pdp-results__placeholder">
            <div><span>Hydration</span><strong>—</strong><small>Study data to be supplied</small></div>
            <div><span>Comfort</span><strong>—</strong><small>Study data to be supplied</small></div>
            <div><span>Barrier support</span><strong>—</strong><small>Study data to be supplied</small></div>
          </div>
        </div>
      </section>

      <section class="pdp-application shell">
        <div class="pdp-application__copy">
          <p class="eyebrow">Application</p>
          <h2>how to use</h2>
          <p>${esc(product.application)}</p>
          <div class="pdp-application__steps">
            <div><span>01</span><p>Start with clean, dry skin.</p></div>
            <div><span>02</span><p>Apply the amount that feels right for your routine.</p></div>
            <div><span>03</span><p>Use daily and follow with the next step in your routine.</p></div>
          </div>
        </div>
        <div class="pdp-application__media">
          <img src="assets/images/editorial-2.jpg" alt="A placeholder still life of skincare packaging in warm light.">
        </div>
      </section>

      <section class="pdp-look shell" aria-labelledby="pdp-look-title">
        <div class="pdp-look__media">
          ${LOOK_TABS.map((tab, index) => `<img class="pdp-look__image ${index === 0 ? "is-active" : ""}" data-look-image="${index}" src="${tab.image}" alt="${esc(tab.alt)}" aria-hidden="${index === 0 ? "false" : "true"}" loading="lazy" decoding="async">`).join("")}
          <p class="pdp-look__media-caption">a layered lip · the kafantu edit</p>
        </div>
        <div class="pdp-look__copy">
          <p class="eyebrow" id="pdp-look-title">get the look</p>
          <p class="pdp-look__label">LAYER YOUR LIPS</p>
          <div class="pdp-look__tabs" role="group" aria-label="Choose a lip layer">
            ${LOOK_TABS.map((tab, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-look-tab="${index}" aria-pressed="${index === 0 ? "true" : "false"}">${tab.label}</button>`).join("")}
          </div>
          <p class="pdp-look__note" data-look-note>${esc(LOOK_TABS[0].note)}</p>
        </div>
      </section>

      <section class="pdp-routine pdp-routine--steps shell" aria-labelledby="pdp-routine-title">
        <div class="pdp-routine__copy">
          <div class="pdp-routine__intro">
            <p class="eyebrow">The kafantu routine</p>
            <h2 id="pdp-routine-title">COMPLETE YOUR ROUTINE</h2>
            <p class="pdp-routine__lede">Five essentials, layered in order. Move through the steps to see the routine.</p>
          </div>
          <div class="pdp-routine__steps" role="group" aria-label="Choose a routine step">
            ${ROUTINE_STEPS.map((step, index) => `
              <button class="routine-step ${index === 0 ? "is-active" : ""}" type="button" data-routine-step="${index}" aria-pressed="${index === 0 ? "true" : "false"}" aria-label="${step.number} ${step.label}">
                <span class="routine-step__number">${step.number}</span>
                <span class="routine-step__label">${step.label}</span>
              </button>`).join("")}
          </div>
        </div>
        <div class="pdp-routine__media">
          ${ROUTINE_STEPS.map((step, index) => `<img class="pdp-routine__image ${index === 0 ? "is-active" : ""}" data-routine-image="${index}" src="${step.image}" alt="${esc(step.alt)}" aria-hidden="${index === 0 ? "false" : "true"}" loading="lazy" decoding="async">`).join("")}
          <p class="pdp-routine__caption" data-routine-caption>${ROUTINE_STEPS[0].number} / ${ROUTINE_STEPS[0].label}</p>
        </div>
      </section>

      <section class="pdp-recycle shell" aria-labelledby="pdp-recycle-title">
        <div class="pdp-recycle__copy">
          <p class="eyebrow">less harm, more care</p>
          <h2 id="pdp-recycle-title">recycling 101</h2>
          <p class="pdp-recycle__lede">We’ll recycle your empties for you. Here’s how it works:</p>
          <ol class="pdp-recycle__steps">
            <li><span>01</span><p>Gather at least three empty kafantu products. Rinse them out and place them in the original box or any small box.</p></li>
            <li><span>02</span><p>Contact us with the subject line “kafantu recycling” and we’ll send a prepaid shipping label.</p></li>
            <li><span>03</span><p>Drop the box at your nearest post office. We’ll sort and process the packaging into materials that can be used again.</p></li>
          </ol>
          <p class="pdp-recycle__note">A small step, made easier. This programme is a placeholder for the concept demo; production details and partners must be confirmed before launch.</p>
        </div>
        <div class="pdp-recycle__media">
          <figure>
            <img src="assets/images/editorial-2.jpg" alt="A placeholder still life of an amber skincare bottle in warm light." loading="lazy" decoding="async">
            <figcaption>packaging, considered</figcaption>
          </figure>
        </div>
      </section>

      ${reviewSectionHTML(product)}

      <section class="pdp-related shell" aria-label="More products">
        <div class="pdp-related__stage">
          <button class="rail-arrow pdp-related__arrow pdp-related__arrow--prev" type="button" data-rail-prev="pdp-related-rail" aria-label="Previous products">←</button>
          <button class="rail-arrow pdp-related__arrow pdp-related__arrow--next" type="button" data-rail-next="pdp-related-rail" aria-label="Next products">→</button>
          <div class="rail__viewport rail__viewport--cards" id="pdp-related-rail" data-rail-viewport data-drag-rail>
            ${related.map((product) => productCardHTML(product, { related: true })).join("")}
          </div>
          <span class="pdp-related-cursor" data-related-cursor aria-hidden="true">swipe</span>
        </div>
      </section>

      <div class="pdp-sticky-bar${product.sizes.length > 1 ? " pdp-sticky-bar--options" : ""}" data-pdp-sticky aria-hidden="true">
        <div class="pdp-sticky-bar__inner">
          <span class="pdp-sticky-bar__thumb" aria-hidden="true">${productVisual(product)}</span>
          <div class="pdp-sticky-bar__info">
            <p class="pdp-sticky-bar__name">${esc(product.name)}</p>
            <p class="pdp-sticky-bar__price" data-sticky-price>${money(selectedSize.price)} · ${esc(selectedSize.label)}</p>
          </div>
          ${product.sizes.length > 1 ? `
            <div class="pdp-sticky-bar__sizes" role="group" aria-label="Select size">
              ${product.sizes.map((size, index) => `<button class="pdp-sticky-bar__size ${index === 0 ? "is-active" : ""}" type="button" data-pdp-size="${size.id}" aria-pressed="${index === 0 ? "true" : "false"}">${esc(size.label)}</button>`).join("")}
            </div>` : ""}
          <button class="pdp-sticky-bar__buy" type="button" data-pdp-add aria-label="Add ${esc(product.name)} to cart">
            <span class="pdp-sticky-bar__buy-long">BUY ${esc(product.name.toUpperCase())} — </span><span class="pdp-sticky-bar__buy-short">BUY — </span><span data-pdp-button-price>${money(selectedSize.price)}</span>
          </button>
        </div>
      </div>
    </div>`;
  }

  function setPdpGallery(index) {
    const product = productById(state.pdp.productId);
    if (!product) return;
    const items = galleryItems(product);
    const nextIndex = (Number(index) + items.length) % items.length;
    const main = $("[data-pdp-main-media]");
    if (main) main.innerHTML = galleryMediaHTML(items[nextIndex], product);
    $$("[data-gallery]").forEach((button) => {
      const active = Number(button.dataset.gallery) === nextIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });
    const current = $("[data-gallery-current]");
    if (current) current.textContent = String(nextIndex + 1).padStart(2, "0");
    const status = $("[data-gallery-status]");
    if (status) status.textContent = `Image ${nextIndex + 1} of ${items.length}`;
    state.pdp.gallery = nextIndex;
  }

  function setLookTab(index) {
    const tab = LOOK_TABS[index];
    if (!tab) return;
    const tabs = $$("[data-look-tab]");
    const images = $$("[data-look-image]");
    if (!tabs.length || !images.length) return;
    tabs.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    images.forEach((image, imageIndex) => {
      const active = imageIndex === index;
      image.classList.toggle("is-active", active);
      image.setAttribute("aria-hidden", active ? "false" : "true");
    });
    const note = $("[data-look-note]");
    if (note) note.textContent = tab.note;
  }

  function setRoutineStep(index) {
    const step = ROUTINE_STEPS[index];
    if (!step) return;
    const steps = $$("[data-routine-step]");
    const images = $$("[data-routine-image]");
    if (!steps.length || !images.length) return;
    steps.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    images.forEach((image, imageIndex) => {
      const active = imageIndex === index;
      image.classList.toggle("is-active", active);
      image.setAttribute("aria-hidden", active ? "false" : "true");
    });
    const caption = $("[data-routine-caption]");
    if (caption) caption.textContent = `${step.number} / ${step.label}`;
  }

  function updateReviewList() {
    const product = productById(state.pdp.productId);
    const list = $("[data-review-list]");
    if (!product || !list) return;
    list.innerHTML = reviewListHTML(product);
    const reviews = filteredPdpReviews(product);
    const visible = Math.min(state.pdp.reviewVisible, reviews.length);
    const showMore = $("[data-review-show-more]");
    if (showMore) showMore.hidden = visible >= reviews.length;
    $$("[data-review-filter]").forEach((button) => {
      const active = button.dataset.reviewFilter === state.pdp.reviewFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function handlePdpHover(event) {
    const lookTab = event.target.closest("[data-look-tab]");
    if (lookTab && !lookTab.classList.contains("is-active")) {
      setLookTab(Number(lookTab.dataset.lookTab));
      return;
    }
    const routineStep = event.target.closest("[data-routine-step]");
    if (routineStep && !routineStep.classList.contains("is-active")) {
      setRoutineStep(Number(routineStep.dataset.routineStep));
    }
  }

  function updatePdpPrice(product, sizeId) {
    const size = product.sizes.find((entry) => entry.id === sizeId);
    if (!size) return;
    $$("[data-pdp-price]").forEach((el) => {
      el.innerHTML = `${money(size.price)} <small>${esc(size.label)}</small>`;
    });
    $$("[data-pdp-button-price]").forEach((el) => { el.textContent = money(size.price); });
    $$("[data-sticky-price]").forEach((el) => { el.textContent = `${money(size.price)} · ${size.label}`; });
    $$("[data-pdp-size]").forEach((button) => {
      const active = button.dataset.pdpSize === sizeId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const optionLabel = $(".pdp-option__label span:last-child");
    if (optionLabel) optionLabel.textContent = size.label;
  }

  /* ------------------------------------------------------------------------
     Cart page
     ------------------------------------------------------------------------ */

  function cartPageHTML() {
    const lines = cartLines();
    const subtotal = cartSubtotal();
    const remaining = Math.max(0, FREE_SHIPPING - subtotal);
    const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
    if (!lines.length) {
      return `<div class="cart-page-section"><div class="shell cart-page-shell">
        <div class="cart-page cart-page--empty">
          <div class="cart-page__left">
            <p class="eyebrow">Cart</p>
            <div class="cart-empty-page">
              <h1>your cart is currently empty</h1>
              <p>Start with a short edit of everyday essentials.</p>
              <a class="btn btn--outline" href="#/shop">Shop the collection</a>
            </div>
          </div>
          <aside class="cart-summary cart-summary--empty">
            <div class="ship-progress">
              <p>You're ${money(FREE_SHIPPING)} away from free US shipping.</p>
              <div class="ship-progress__bar"><span style="width:0%"></span></div>
            </div>
            <div class="cart-summary__rows">
              <div class="cart-summary__row is-total"><span>Subtotal</span><span>${money(0)}</span></div>
              <div class="cart-summary__row"><span>Shipping and tax</span><span>Calculated at checkout</span></div>
            </div>
            <a class="btn btn--dark btn--full" href="#/shop">Continue shopping</a>
            <p class="fineprint">Demo cart — no payment is taken. Prices are shown in USD.</p>
          </aside>
        </div>
      </div></div>`;
    }
    return `<div class="cart-page-section"><div class="shell cart-page-shell">
      <div class="cart-page">
        <div class="cart-page__left">
          <p class="eyebrow">Your cart</p>
          <h1>your cart</h1>
          <div class="cart-page-lines">
            ${lines.map((line) => cartLineHTML(line, true)).join("")}
          </div>
          <a class="text-link cart-continue" href="#/shop">Continue shopping <span aria-hidden="true">→</span></a>
        </div>
        <aside class="cart-summary">
          <div class="ship-progress">
            <p>${remaining > 0 ? `You're ${money(remaining)} away from free US shipping.` : "Free US shipping applied."}</p>
            <div class="ship-progress__bar"><span style="width:${progress}%"></span></div>
          </div>
          <h2>subtotal</h2>
          <div class="cart-summary__rows">
            <div class="cart-summary__row is-total"><span>${lines.length} ${lines.length === 1 ? "item" : "items"}</span><span>${money(subtotal)}</span></div>
            <div class="cart-summary__row"><span>Shipping and tax</span><span>Calculated at checkout</span></div>
          </div>
          <a class="btn btn--dark btn--full" href="#/checkout">Checkout</a>
          <p class="fineprint">Demo cart — no payment is taken. Shipping and tax are examples only.</p>
          <div class="cart-note">Need help? <a class="text-link" href="#/contact">Contact us</a></div>
        </aside>
      </div>
    </div></div>`;
  }

  /* ------------------------------------------------------------------------
     Checkout
     ------------------------------------------------------------------------ */

  function checkoutTotals() {
    const subtotal = cartSubtotal();
    const shipping = state.checkout.shipping === "express" ? SHIPPING.express : SHIPPING.standard;
    const shippingCost = state.checkout.shipping === "standard" && subtotal >= FREE_SHIPPING ? 0 : shipping.price;
    const tax = Math.round(subtotal * TAX_RATE);
    return {
      subtotal,
      shippingCost,
      tax,
      total: subtotal + shippingCost + tax,
      shippingLabel: state.checkout.shipping === "express" ? "Express" : "Standard",
      shippingEta: shipping.eta
    };
  }

  function checkoutLineHTML(line) {
    return `<div class="checkout-line">
      <div class="checkout-line__media">${productVisual(line.product)}</div>
      <div>
        <p class="checkout-line__name">${esc(line.product.name)}</p>
        <p class="checkout-line__meta">${esc(line.size.label)} · Qty ${line.qty}</p>
      </div>
      <span class="checkout-line__price">${money(line.lineTotal)}</span>
    </div>`;
  }

  function checkoutSummaryHTML() {
    const lines = cartLines();
    const totals = checkoutTotals();
    return `<h2>order summary</h2>
      <div class="checkout-lines">${lines.map(checkoutLineHTML).join("")}</div>
      <div class="checkout-totals">
        <div class="checkout-total-row"><span>Subtotal</span><span>${money(totals.subtotal)}</span></div>
        <div class="checkout-total-row"><span>Shipping — ${esc(totals.shippingLabel)}</span><span>${totals.shippingCost === 0 ? "Free" : money(totals.shippingCost)}</span></div>
        <div class="checkout-total-row"><span>Estimated tax</span><span>${money(totals.tax)}</span></div>
        <div class="checkout-total-row is-total"><span>Total</span><span>${money(totals.total)}</span></div>
      </div>
      <p class="checkout-summary__note">${state.checkout.shipping === "standard" && totals.subtotal >= FREE_SHIPPING ? "Free standard shipping applied." : `Standard shipping is free over ${money(FREE_SHIPPING)}.`} Demo totals only.</p>`;
  }

  function checkoutPageHTML() {
    const lines = cartLines();
    if (!lines.length) {
      return `<div class="checkout-view">
        <header class="checkout-header shell"><a class="wordmark" href="#/">kafantu</a><span class="eyebrow">Secure demo checkout</span></header>
        <div class="checkout-empty">
          <p class="eyebrow">Checkout</p>
          <h1>your cart is empty</h1>
          <p>Add an essential before checking out.</p>
          <a class="btn btn--dark" href="#/shop">Shop the collection</a>
        </div>
      </div>`;
    }

    const isPayPal = state.checkout.payment === "paypal";
    const countries = [
      ["US", "United States"],
      ["CA", "Canada"],
      ["GB", "United Kingdom"],
      ["AU", "Australia"],
      ["NZ", "New Zealand"],
      ["DE", "Germany"],
      ["FR", "France"],
      ["SG", "Singapore"],
      ["JP", "Japan"]
    ];

    return `<div class="checkout-view">
      <header class="checkout-header shell">
        <a class="wordmark" href="#/">kafantu</a>
        <div class="checkout-header__right">
          <a class="text-link" href="#/cart">Back to cart</a>
          <span class="eyebrow">Secure demo checkout</span>
        </div>
      </header>
      <div class="checkout-note">Demo checkout — no payment is taken and no card details are stored. <button type="button" data-fill-demo>Use demo details</button></div>

      <div class="checkout-grid">
        <form class="checkout-form" data-checkout-form novalidate>
          <section class="checkout-section">
            <div class="checkout-section__head"><span>01</span><h2>contact</h2></div>
            <div class="field">
              <label for="checkout-email">Email</label>
              <input id="checkout-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required>
            </div>
            <label class="checkbox" style="margin-top:12px"><input type="checkbox" name="newsletter" checked> Email me occasional notes from kafantu. <span class="fineprint">(demo)</span></label>
          </section>

          <section class="checkout-section">
            <div class="checkout-section__head"><span>02</span><h2>delivery</h2></div>
            <div class="field-grid">
              <div class="field"><label for="checkout-first">First name</label><input id="checkout-first" name="firstName" autocomplete="given-name" required></div>
              <div class="field"><label for="checkout-last">Last name</label><input id="checkout-last" name="lastName" autocomplete="family-name" required></div>
            </div>
            <div class="field" style="margin-top:12px"><label for="checkout-address">Address</label><input id="checkout-address" name="address" autocomplete="address-line1" required></div>
            <div class="field" style="margin-top:12px"><label for="checkout-apartment">Apartment, suite, etc. <span class="fineprint">(optional)</span></label><input id="checkout-apartment" name="apartment" autocomplete="address-line2"></div>
            <div class="field-grid" style="margin-top:12px">
              <div class="field"><label for="checkout-city">City</label><input id="checkout-city" name="city" autocomplete="address-level2" required></div>
              <div class="field"><label for="checkout-state">State</label><input id="checkout-state" name="state" autocomplete="address-level1" required></div>
            </div>
            <div class="field-grid" style="margin-top:12px">
              <div class="field"><label for="checkout-zip">ZIP code</label><input id="checkout-zip" name="zip" autocomplete="postal-code" inputmode="numeric" required></div>
              <div class="field"><label for="checkout-country">Country</label><select id="checkout-country" name="country" autocomplete="country">${countries.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></div>
            </div>
          </section>

          <section class="checkout-section">
            <div class="checkout-section__head"><span>03</span><h2>shipping</h2></div>
            <div class="shipping-options">
              <label class="shipping-option">
                <input type="radio" name="shipping" value="standard" ${state.checkout.shipping === "standard" ? "checked" : ""}>
                <span class="shipping-option__copy"><strong>Standard</strong><span>3–5 business days</span></span>
                <span class="shipping-option__price">${cartSubtotal() >= FREE_SHIPPING ? "Free" : money(SHIPPING.standard.price)}</span>
              </label>
              <label class="shipping-option">
                <input type="radio" name="shipping" value="express" ${state.checkout.shipping === "express" ? "checked" : ""}>
                <span class="shipping-option__copy"><strong>Express</strong><span>1–2 business days</span></span>
                <span class="shipping-option__price">${money(SHIPPING.express.price)}</span>
              </label>
            </div>
          </section>

          <section class="checkout-section">
            <div class="checkout-section__head"><span>04</span><h2>payment</h2></div>
            <div class="shipping-options">
              <label class="payment-option">
                <input type="radio" name="payment" value="card" ${state.checkout.payment === "card" ? "checked" : ""}>
                <span class="payment-option__copy"><strong>Card</strong><span>Demo payment — no card is charged</span></span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment" value="paypal" ${state.checkout.payment === "paypal" ? "checked" : ""}>
                <span class="payment-option__copy"><strong>PayPal</strong><span>Demo payment — no redirect</span></span>
              </label>
            </div>
            <div class="card-fields" data-card-fields ${isPayPal ? "hidden" : ""}>
              <div class="field">
                <label for="card-number">Card number</label>
                <input id="card-number" name="cardNumber" inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242" data-card-number>
              </div>
              <div class="field-grid" style="margin-top:10px">
                <div class="field"><label for="card-expiry">Expiry</label><input id="card-expiry" name="cardExpiry" autocomplete="cc-exp" placeholder="MM / YY"></div>
                <div class="field"><label for="card-cvc">CVC</label><input id="card-cvc" name="cardCvc" inputmode="numeric" autocomplete="cc-csc" placeholder="123"></div>
              </div>
            </div>
            <p class="payment-demo-note">${isPayPal ? "In production, PayPal would open its own secure checkout. This demo does not redirect." : "This demo does not collect or transmit card details. In production, card payments would run through Stripe."}</p>
          </section>

          <section class="checkout-section" style="border-bottom:0;padding-bottom:0">
            <label class="checkbox"><input type="checkbox" name="terms" required> I agree to the <a href="#/pages/terms" target="_blank" rel="noopener">Terms</a> and <a href="#/pages/privacy" target="_blank" rel="noopener">Privacy Policy</a>. I understand this is a demo order.</label>
            <p class="field-error checkout-error" data-checkout-error hidden></p>
            <div class="checkout-submit">
              <button class="btn btn--dark" type="submit">place demo order — <span data-checkout-total>${money(checkoutTotals().total)}</span></button>
              <p class="fineprint">No payment will be taken. No order will be shipped.</p>
            </div>
          </section>
        </form>

        <aside class="checkout-summary" aria-label="Order summary">
          <div data-checkout-summary>${checkoutSummaryHTML()}</div>
        </aside>
      </div>
      <footer class="checkout-footer shell">
        <p>Demo checkout · kafantu concept store · no real payments or emails</p>
      </footer>
    </div>`;
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function handleCheckoutSubmit(form) {
    const data = new FormData(form);
    const required = [
      ["email", validateEmail(String(data.get("email") || ""))],
      ["firstName", String(data.get("firstName") || "").trim().length > 0],
      ["lastName", String(data.get("lastName") || "").trim().length > 0],
      ["address", String(data.get("address") || "").trim().length > 0],
      ["city", String(data.get("city") || "").trim().length > 0],
      ["state", String(data.get("state") || "").trim().length > 0],
      ["zip", String(data.get("zip") || "").trim().length > 0]
    ];
    const payment = String(data.get("payment") || "");
    let cardValid = true;
    if (payment === "card") {
      const digits = String(data.get("cardNumber") || "").replace(/\D/g, "");
      const expiry = String(data.get("cardExpiry") || "").trim();
      const cvc = String(data.get("cardCvc") || "").replace(/\D/g, "");
      cardValid = digits.length >= 12 && expiry.length >= 4 && cvc.length >= 3;
    }
    const terms = Boolean(data.get("terms"));
    const invalid = required.filter(([, ok]) => !ok).map(([name]) => name);

    $$(".field.is-invalid").forEach((field) => field.classList.remove("is-invalid"));
    required.forEach(([name, ok]) => {
      if (!ok) {
        const input = form.elements.namedItem(name);
        if (input && input.closest) input.closest(".field")?.classList.add("is-invalid");
      }
    });
    if (!cardValid) {
      ["cardNumber", "cardExpiry", "cardCvc"].forEach((name) => {
        const input = form.elements.namedItem(name);
        if (input && input.closest) input.closest(".field")?.classList.add("is-invalid");
      });
    }
    if (!terms) {
      const input = form.elements.namedItem("terms");
      if (input && input.closest) input.closest(".checkbox")?.classList.add("is-invalid");
    }

    const error = $("[data-checkout-error]");
    if (invalid.length || !cardValid || !terms) {
      if (error) {
        error.textContent = !terms
          ? "Please agree to the Terms and Privacy Policy to place the demo order."
          : !cardValid
            ? "Please complete the demo card details. No real card is charged."
            : "Please complete the required delivery details.";
        error.hidden = false;
      }
      const firstInvalid = form.querySelector(".is-invalid input, .is-invalid select, input:invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    if (error) error.hidden = true;

    const totals = checkoutTotals();
    let orderId = `KAFANTU-${Math.floor(1000 + Math.random() * 9000)}`;
    while (orders.some((order) => order.id === orderId)) {
      orderId = `KAFANTU-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    const lines = cartLines();
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      email: String(data.get("email") || "").trim(),
      lines: lines.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        sizeId: line.size.id,
        sizeLabel: line.size.label,
        price: line.price,
        qty: line.qty
      })),
      subtotal: totals.subtotal,
      shippingCost: totals.shippingCost,
      tax: totals.tax,
      total: totals.total,
      shippingMethod: totals.shippingLabel,
      shippingEta: totals.shippingEta,
      payment: payment === "paypal" ? "PayPal (demo)" : "Card (demo)",
      address: {
        firstName: String(data.get("firstName") || "").trim(),
        lastName: String(data.get("lastName") || "").trim(),
        address: String(data.get("address") || "").trim(),
        apartment: String(data.get("apartment") || "").trim(),
        city: String(data.get("city") || "").trim(),
        state: String(data.get("state") || "").trim(),
        zip: String(data.get("zip") || "").trim(),
        country: String(data.get("country") || "US").trim()
      }
    };
    orders.unshift(order);
    saveOrders();
    clearCart();
    navigate(`/order/${order.id}`);
  }

  /* ------------------------------------------------------------------------
     Order
     ------------------------------------------------------------------------ */

  function findOrder(id) {
    return orders.find((order) => order.id === id) || null;
  }

  function orderItemHTML(line) {
    const product = PRODUCT_MAP[line.id];
    return `<div class="order-item">
      <div class="order-item__media">${product ? productVisual(product) : ""}</div>
      <div>
        <p class="order-item__name">${esc(line.name)}</p>
        <p class="order-item__meta">${esc(line.sizeLabel)} · Qty ${line.qty}</p>
      </div>
      <span class="order-item__price">${money(line.price * line.qty)}</span>
    </div>`;
  }

  function orderPageHTML(order) {
    if (!order) {
      return `<div class="shell"><div class="order-missing">
        <p class="eyebrow">Order</p>
        <h1>we couldn't find that order</h1>
        <p>Demo orders are stored in this browser. Try placing a new demo order.</p>
        <a class="btn btn--dark" href="#/shop">Back to the collection</a>
      </div></div>`;
    }
    const address = order.address;
    const date = new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    return `<div class="order-view"><div class="shell">
      <article class="order-card">
        <p class="eyebrow">Order confirmed · ${esc(date)}</p>
        <h1>thank you</h1>
        <p class="order-lede">Order <strong>${esc(order.id)}</strong> is confirmed. A demo confirmation email is ready to preview. Nothing has been charged or shipped.</p>

        <div class="order-grid">
          <div class="order-items">
            <h2>your order</h2>
            ${order.lines.map(orderItemHTML).join("")}
            <div class="order-totals">
              <div class="order-total-row"><span>Subtotal</span><span>${money(order.subtotal)}</span></div>
              <div class="order-total-row"><span>Shipping — ${esc(order.shippingMethod)}</span><span>${order.shippingCost === 0 ? "Free" : money(order.shippingCost)}</span></div>
              <div class="order-total-row"><span>Estimated tax</span><span>${money(order.tax)}</span></div>
              <div class="order-total-row is-total"><span>Total</span><span>${money(order.total)}</span></div>
            </div>
          </div>
          <aside class="order-details">
            <h2>details</h2>
            <div class="order-detail-block">
              <h3>Delivery</h3>
              <p>${esc(address.firstName)} ${esc(address.lastName)}<br>${esc(address.address)}${address.apartment ? `<br>${esc(address.apartment)}` : ""}<br>${esc(address.city)}, ${esc(address.state)} ${esc(address.zip)}<br>${esc(address.country)}</p>
            </div>
            <div class="order-detail-block">
              <h3>Shipping</h3>
              <p>${esc(order.shippingMethod)} · ${esc(order.shippingEta)}</p>
            </div>
            <div class="order-detail-block">
              <h3>Payment</h3>
              <p>${esc(order.payment)}</p>
            </div>
            <div class="order-detail-block">
              <h3>Email</h3>
              <p>${esc(order.email)}</p>
            </div>
            <div class="order-actions">
              <button class="btn btn--outline" type="button" data-preview-email="${esc(order.id)}">Preview order email</button>
              <a class="btn btn--dark" href="#/shop">Continue shopping</a>
            </div>
            <p class="order-note">This is a demo order. It lives only in this browser and cannot be fulfilled.</p>
          </aside>
        </div>
      </article>
    </div></div>`;
  }

  function emailPreviewHTML(order) {
    const address = order.address;
    return `<div class="email-preview">
      <div class="email-preview__brand"><span class="wordmark">kafantu</span></div>
      <h2 id="email-title">order confirmed</h2>
      <p class="email-preview__lede">Hi ${esc(order.address.firstName)}, your order <strong>${esc(order.id)}</strong> is confirmed. This is a preview only — no email has been sent.</p>
      <div class="email-preview__items">
        ${order.lines.map((line) => `<div class="email-preview__line"><span>${esc(line.name)} · ${esc(line.sizeLabel)} × ${line.qty}</span><span>${money(line.price * line.qty)}</span></div>`).join("")}
      </div>
      <div class="email-preview__totals">
        <div class="email-preview__total-row"><span>Subtotal</span><span>${money(order.subtotal)}</span></div>
        <div class="email-preview__total-row"><span>Shipping — ${esc(order.shippingMethod)}</span><span>${order.shippingCost === 0 ? "Free" : money(order.shippingCost)}</span></div>
        <div class="email-preview__total-row"><span>Estimated tax</span><span>${money(order.tax)}</span></div>
        <div class="email-preview__total-row is-total"><span>Total</span><span>${money(order.total)}</span></div>
      </div>
      <div class="email-preview__address">
        <div><h4>Shipping to</h4><p>${esc(address.firstName)} ${esc(address.lastName)}<br>${esc(address.address)}${address.apartment ? `<br>${esc(address.apartment)}` : ""}<br>${esc(address.city)}, ${esc(address.state)} ${esc(address.zip)}<br>${esc(address.country)}</p></div>
        <div><h4>Need help?</h4><p>Email hello@kafantu.example<br>Monday–Friday, 9am–5pm ET.<br>Demo only.</p></div>
      </div>
      <p class="email-preview__foot">This is a demo email preview. No payment was taken and no message was sent. Production emails will be configured with the brand's real sender domain and policy links.</p>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     Content pages
     ------------------------------------------------------------------------ */

  function aboutPageHTML() {
    const chapters = [
      {
        key: "skin",
        label: "skin",
        heading: "a short routine, made well.",
        body: "Cleanse, hydrate and seal. Three considered steps that are easy to keep up with, morning and evening.",
        image: "assets/images/editorial-1.jpg",
        href: "#/shop?collection=skin"
      },
      {
        key: "lip-cheek",
        label: "lip + cheek",
        heading: "a little colour, cared for.",
        body: "Comfortable colour for lips and cheeks, made to sit alongside skin essentials rather than complicate them.",
        image: "assets/images/editorial-2.jpg",
        href: "#/shop?collection=lip-cheek"
      },
      {
        key: "sets",
        label: "sets",
        heading: "the edit, together.",
        body: "The everyday routine in one considered set. A simple place to start, or an easy way to keep it going.",
        image: "assets/images/about.jpg",
        href: "#/shop?collection=sets"
      }
    ];
    const products = PRODUCTS.slice(0, 3).map(productCardHTML).join("");

    return `<div class="about-page">
      <section class="about-landing shell">
        <img src="assets/images/about.jpg" alt="A placeholder editorial portrait in natural light.">
        <div class="about-landing__copy">
          <p class="eyebrow">Our story</p>
          <h1>a quieter way<br>to care.</h1>
          <p>kafantu began with a simple idea: a short routine, made well, is enough. Everyday essentials with considered ingredients and nothing extra.</p>
          <a class="btn btn--light" href="#/shop">shop the edit</a>
        </div>
      </section>

      <section class="about-note shell">
        <p class="eyebrow">A note from kafantu</p>
        <blockquote>“We believe the shelf can be smaller and the routine can still feel complete. Make a few things well, then use them every day.”</blockquote>
        <p class="fineprint">Placeholder brand statement for the concept demo.</p>
      </section>

      <section class="about-chapters shell">
        <div class="about-chapters__nav" role="tablist" aria-label="Explore the collection">
          ${chapters.map((chapter, index) => `
            <button class="about-chapters__tab ${index === 0 ? "is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-about-tab="${chapter.key}">${esc(chapter.label)}</button>
          `).join("")}
        </div>
        <div class="about-chapters__grid">
          <div class="about-chapters__media">
            <img data-about-image src="${chapters[0].image}" alt="A placeholder editorial image for the kafantu skin collection.">
          </div>
          <div class="about-chapters__copy" data-about-panel>
            <h2 data-about-heading>${esc(chapters[0].heading)}</h2>
            <p data-about-body>${esc(chapters[0].body)}</p>
            <a class="btn btn--outline" href="${chapters[0].href}" data-about-link>shop ${esc(chapters[0].label)} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section class="about-statement shell">
        <p class="eyebrow">Edited, not crowded</p>
        <h2>skin, simplified —<br>every single day</h2>
        <p>A short edit of skincare essentials, designed to be used and finished.</p>
        <div class="about-statement__actions">
          <a class="btn btn--dark" href="#/shop">Shop the collection</a>
          <a class="btn btn--outline" href="#/features">Our approach</a>
        </div>
      </section>

      <section class="about-products shell">
        <div class="about-products__head">
          <h2>the starting three</h2>
          <a class="text-link" href="#/shop">Shop all <span aria-hidden="true">→</span></a>
        </div>
        <div class="product-grid">${products}</div>
      </section>
    </div>`;
  }

  function impactPageHTML() {
    const images = [
      "assets/images/editorial-1.jpg",
      "assets/images/editorial-2.jpg",
      "assets/images/pdp-lifestyle.jpg"
    ];
    return `<div class="features-page">
      <section class="features-hero shell">
        <img src="assets/images/banner.jpg" alt="A placeholder editorial skincare image in warm light.">
        <div class="features-hero__copy">
          <p class="eyebrow">Futures</p>
          <h1>progress,<br>not perfection.</h1>
          <p>A short edit is better for your shelf and for the planet. We are working toward lighter packaging, fewer components, and formulas made to be used every day.</p>
        </div>
      </section>

      <section class="features-intro shell">
        <p class="eyebrow">Our approach</p>
        <h2>fewer things,<br>used well.</h2>
      </section>

      <div class="features-list shell">
        ${Object.entries(VALUES).map(([key, value], index) => `
          <article class="feature-row" id="feature-${key}">
            <div class="feature-row__media"><img src="${images[index]}" alt="A placeholder editorial image for the kafantu ${esc(value.label)} approach."></div>
            <div class="feature-row__copy">
              <p class="eyebrow">${esc(value.index)}</p>
              <h2>${esc(value.label)}</h2>
              <p>${esc(value.body)}</p>
              <a class="text-link" href="#/about">Read our story <span aria-hidden="true">→</span></a>
            </div>
          </article>
        `).join("")}
      </div>

      <section class="about-statement shell">
        <p class="eyebrow">The standard</p>
        <h2>good skin is a practice,<br>not a promise</h2>
        <div class="about-statement__actions">
          <a class="btn btn--dark" href="#/shop">Shop the collection</a>
          <a class="btn btn--outline" href="#/about">About kafantu</a>
        </div>
      </section>
    </div>`;
  }

  function faqPageHTML() {
    const groups = [...new Set(FAQS.map((item) => item.group))];
    const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<div class="faq-page">
      <section class="faq-hero shell">
        <p class="eyebrow">Help</p>
        <h1>questions, answered</h1>
        <p>Questions about products, shipping, orders or returns? Start here. For anything else, send us a note.</p>
      </section>
      <div class="faq-page__body shell">
        <nav class="faq-categories" aria-label="FAQ categories">
          <button class="faq-category is-active" type="button" data-faq-cat="all">All</button>
          ${groups.map((group) => `<button class="faq-category" type="button" data-faq-cat="${esc(slug(group))}">${esc(group)}</button>`).join("")}
          <a class="faq-category" href="#/contact">Contact us</a>
        </nav>
        <div class="faq-groups">
          ${groups.map((group) => `
            <section class="faq-group" data-faq-group="${esc(slug(group))}">
              <h2>${esc(group)}</h2>
              <div class="faq-list">
                ${FAQS.filter((item) => item.group === group).map((item) => `<details class="faq-item"><summary>${esc(item.q)}</summary><div class="faq-item__body"><p>${esc(item.a)}</p></div></details>`).join("")}
              </div>
            </section>
          `).join("")}
        </div>
        <div class="faq-cta">
          <div><h2>Still wondering?</h2><p>Monday–Friday, 9am–5pm ET · hello@kafantu.example</p></div>
          <a class="btn btn--dark" href="#/contact">Contact us</a>
        </div>
      </div>
    </div>`;
  }

  function contactPageHTML() {
    return `<div class="contact-page">
      <section class="contact-page__inner shell">
        <div class="contact-page__intro">
          <p class="eyebrow">Contact</p>
          <h1>contact us</h1>
          <p>Tell us what's on your mind. We can help with an order, a product question, or feedback about your routine.</p>
          <p>Our small support team reads every note Monday through Friday, 9am–5pm ET, and aims to reply within 2 business days.</p>
          <p class="fineprint">* indicates a required field. This is a demo form — messages are not sent.</p>
        </div>

        <form class="contact-form contact-form--round4" data-contact-form novalidate>
          <div class="field"><label for="contact-name">First and last name *</label><input id="contact-name" name="name" autocomplete="name" placeholder="First and last name" required></div>
          <div class="field"><label for="contact-email">Email *</label><input id="contact-email" name="email" type="email" autocomplete="email" placeholder="Email" required></div>
          <div class="field">
            <label for="contact-reason">Contact reason *</label>
            <select id="contact-reason" name="reason" required>
              <option value="">Select a reason</option>
              <option>Order status</option>
              <option>Returns or exchanges</option>
              <option>Product question</option>
              <option>Shipping question</option>
              <option>Other general inquiry</option>
            </select>
          </div>
          <div class="field"><label for="contact-topic">Topic *</label><input id="contact-topic" name="topic" placeholder="How can we help?" required></div>
          <div class="field"><label for="contact-message">Tell us the details. *</label><textarea id="contact-message" name="message" required placeholder="Include as much detail as you can."></textarea></div>
          <div class="contact-upload">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 16v3h16v-3M12 16V4M7.5 8.5 12 4l4.5 4.5"></path></svg>
            <span>Attach an image <small>(optional, demo only)</small></span>
            <input type="file" accept="image/*" aria-label="Attach an image, optional">
          </div>
          <button class="btn btn--dark" type="submit">Submit</button>
          <p class="field-error" data-contact-error hidden>Please add your name, a valid email, a reason, a topic and a message.</p>
          <p class="fineprint">No message is sent. In production this form will connect to the store's support inbox with consent and spam protection.</p>
        </form>
      </section>

      <aside class="contact-support shell">
        <p class="eyebrow">Support hours</p>
        <div><p>Monday–Friday, 9am–5pm ET</p><a href="mailto:hello@kafantu.example">hello@kafantu.example</a></div>
        <p class="fineprint">Placeholder contact details. The production store will use the brand's real support address and policies.</p>
      </aside>
    </div>`;
  }

  function accountPageHTML() {
    return `<div class="account-page shell">
      <div class="account-split">
        <div class="account-art">
          <img src="assets/images/social-1.jpg" alt="A placeholder portrait in a bright bathroom setting.">
          <div class="account-art__copy">
            <p class="eyebrow">Account</p>
            <p>a moment for yourself.</p>
          </div>
        </div>
        <div class="account-form-panel">
          <div class="account-form-panel__inner">
            <h1>login</h1>
            <p>Access your demo orders and account details. No account is created in this prototype.</p>
            <form data-account-form novalidate>
              <div class="field"><label for="account-email">Email</label><input id="account-email" name="email" type="email" autocomplete="email" required></div>
              <div class="field"><label for="account-password">Password</label><input id="account-password" name="password" type="password" autocomplete="current-password" required></div>
              <button class="btn btn--dark" type="submit">Sign in</button>
            </form>
            <div class="account-links"><button class="text-link" type="button" data-demo-link>Forgot password?</button><span>New here? <button class="text-link" type="button" data-demo-link>Create an account</button></span></div>
            <p class="fineprint">Demo only — accounts and authentication will be handled by WooCommerce in production.</p>
          </div>
        </div>
      </div>
    </div>`;
  }

  function policyPageHTML(policy) {
    return `<div class="content-page content-page--narrow policy-page shell reveal">
      <p class="eyebrow">${esc(policy.eyebrow)}</p>
      <h1>${esc(policy.title)}</h1>
      <p class="content-lede">${esc(policy.intro)}</p>
      ${policy.sections.map((section) => `<section class="content-section">
        <p class="content-section__label">${esc(section.label)}</p>
        <div class="content-section__body">
          <h2>${esc(section.title)}</h2>
          ${section.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        </div>
      </section>`).join("")}
      <p class="policy-note">Placeholder policy for the kafantu concept demo. Final copy must be supplied or approved by the brand and reviewed for the target market before launch.</p>
    </div>`;
  }

  function notFoundHTML() {
    return `<div class="not-found">
      <p class="eyebrow">404</p>
      <h1>lost the thread</h1>
      <p>This page doesn't exist in the concept store.</p>
      <a class="btn btn--dark" href="#/shop">Back to the collection</a>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     Routing
     ------------------------------------------------------------------------ */

  function renderRoute(options = {}) {
    closeAllOverlays();
    const route = getRoute();
    document.body.classList.toggle("is-checkout", route.path === "/checkout");
    document.body.classList.toggle("is-product", route.path.startsWith("/product/"));
    document.body.classList.toggle("is-shop", route.path === "/shop");

    let html = "";
    let title = "kafantu — skin, simplified | Concept store";

    if (route.path === "/") {
      html = homeHTML();
      title = "kafantu — skin, simplified | Concept store";
    } else if (route.path === "/shop") {
      html = shopPageHTML(route.params);
      title = "the collection — kafantu";
    } else if (route.path.startsWith("/product/")) {
      const id = route.path.split("/")[2];
      const product = productById(id);
      if (product) {
        html = productPageHTML(product);
        title = `${product.name} — kafantu`;
      } else {
        html = notFoundHTML();
        title = "not found — kafantu";
      }
    } else if (route.path === "/about") {
      html = aboutPageHTML();
      title = "about — kafantu";
    } else if (route.path === "/features" || route.path === "/impact") {
      html = impactPageHTML();
      title = "futures — kafantu";
    } else if (route.path === "/faq") {
      html = faqPageHTML();
      title = "FAQ — kafantu";
    } else if (route.path === "/contact") {
      html = contactPageHTML();
      title = "contact — kafantu";
    } else if (route.path === "/cart") {
      html = cartPageHTML();
      title = "your cart — kafantu";
    } else if (route.path === "/checkout") {
      html = checkoutPageHTML();
      title = "checkout — kafantu";
    } else if (route.path.startsWith("/order/")) {
      const id = route.path.split("/")[2];
      const order = findOrder(id);
      html = orderPageHTML(order);
      title = order ? `order ${order.id} — kafantu` : "order — kafantu";
    } else if (route.path === "/account") {
      html = accountPageHTML();
      title = "account — kafantu";
    } else if (route.path.startsWith("/pages/")) {
      const policyKey = route.path.split("/")[2];
      const policy = POLICIES[policyKey];
      if (policy) {
        html = policyPageHTML(policy);
        title = `${policy.title} — kafantu`;
      } else {
        html = notFoundHTML();
        title = "not found — kafantu";
      }
    } else {
      html = notFoundHTML();
      title = "not found — kafantu";
    }

    if (!dom.view) return;
    if (dom.toast) {
      window.clearTimeout(toastTimer);
      dom.toast.hidden = true;
    }
    dom.view.innerHTML = html;
    document.title = title;
    updateHeader();
    updateCartUI();
    if (!options.keepScroll) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }
    syncHeroPlayback();
    initReveal();
    initRails();
    initPdpSwipe();
    initHomeShowcase();
    initRelatedCursor();
    fitFooterWordmark();
    syncPdpStickyBar();
  }

  function railStep(rail) {
    const first = rail.querySelector(".showcase-card, .feature-card, .social-card, .pdp-spotted__card");
    const width = first ? first.getBoundingClientRect().width : rail.clientWidth;
    return width + 12;
  }

  function initHomeShowcase() {
    const section = $(".home-edit--showcase");
    if (!section || section.dataset.cursorReady === "true") return;
    section.dataset.cursorReady = "true";
    const cursor = $("[data-swipe-cursor]", section);
    if (!cursor) return;

    const hide = () => cursor.classList.remove("is-visible");
    section.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") {
        hide();
        return;
      }
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      const overCard = event.target.closest(".showcase-card");
      const overControl = event.target.closest("button, .quick-add, .showcase-card__title a");
      cursor.classList.toggle("is-visible", Boolean(overCard && !overControl));
    }, { passive: true });
    section.addEventListener("pointerleave", hide);
    section.addEventListener("pointerdown", hide);
    section.addEventListener("wheel", hide, { passive: true });
  }

  function initRelatedCursor() {
    const stage = $(".pdp-related__stage");
    const cursor = $("[data-related-cursor]");
    if (!stage || !cursor || stage.dataset.cursorReady === "true") return;
    stage.dataset.cursorReady = "true";

    const hide = () => cursor.classList.remove("is-visible");
    stage.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") {
        hide();
        return;
      }
      const media = event.target.closest(".product-card--related .product-card__media");
      if (!media) {
        hide();
        return;
      }
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-visible");
    }, { passive: true });
    stage.addEventListener("pointerleave", hide);
    stage.addEventListener("pointerdown", hide);
    stage.addEventListener("wheel", hide, { passive: true });
  }

  function syncPdpStickyBar() {
    const bar = $(".pdp-sticky-bar");
    if (!bar) return;
    const openingCta = $(".pdp-cta");
    const header = $(".site-header");
    const footerBrand = $(".footer-brand");
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    // Reference trigger: the bar appears once the opening buy CTA has
    // scrolled behind the sticky header (or above the viewport when the
    // header is not sticky). It stays through the middle sections and hides
    // before the oversized footer wordmark.
    let triggerTop = 0;
    if (header) {
      const headerStyle = window.getComputedStyle(header);
      if (headerStyle.position === "sticky" || headerStyle.position === "fixed") {
        triggerTop = Math.max(0, header.getBoundingClientRect().bottom);
      }
    }
    const openingPassed = Boolean(openingCta && openingCta.getBoundingClientRect().bottom <= triggerTop);
    const footerReached = Boolean(footerBrand && footerBrand.getBoundingClientRect().top <= viewport - 24);
    const visible = openingPassed && !footerReached;
    bar.classList.toggle("is-visible", visible);
    bar.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  function fitFooterWordmark() {
    const mark = $(".footer-wordmark");
    if (!mark) return;
    const parent = mark.closest(".footer-brand");
    if (!parent) return;
    const styles = window.getComputedStyle(parent);
    const available = parent.clientWidth - parseFloat(styles.paddingLeft || 0) - parseFloat(styles.paddingRight || 0);
    if (available <= 0) return;
    mark.style.fontSize = "100px";
    const naturalWidth = mark.getBoundingClientRect().width;
    if (naturalWidth > 0) {
      mark.style.fontSize = `${((available * .9) / naturalWidth) * 100}px`;
    }
  }

  function updateSocialProgress(rail) {
    const bar = $("[data-social-progress]");
    if (!bar) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const ratio = max > 0 ? rail.scrollLeft / max : 0;
    const trackWidth = bar.parentElement.getBoundingClientRect().width;
    const width = Math.max(60, trackWidth * (rail.clientWidth / rail.scrollWidth));
    bar.style.width = `${width}px`;
    bar.style.transform = `translateX(${ratio * Math.max(0, trackWidth - width)}px)`;
  }

  function initRails() {
    $$("[data-rail-viewport]").forEach((rail) => {
      if (rail.dataset.railReady === "true") return;
      rail.dataset.railReady = "true";
      rail.addEventListener("scroll", () => {
        if (rail.id === "social-rail") updateSocialProgress(rail);
      }, { passive: true });
      if (rail.id === "social-rail") updateSocialProgress(rail);
    });
  }

  function initPdpSwipe() {
    const stage = $("[data-pdp-swipe]");
    if (!stage || stage.dataset.swipeReady === "true") return;
    stage.dataset.swipeReady = "true";
    let startX = 0;
    let startY = 0;
    stage.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button, a")) return;
      startX = event.clientX;
      startY = event.clientY;
    }, { passive: true });
    stage.addEventListener("pointerup", (event) => {
      if (!startX && !startY) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      startX = 0;
      startY = 0;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        setPdpGallery(state.pdp.gallery + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  function initDragRails() {
    let drag = null;

    document.addEventListener("dragstart", (event) => {
      if (event.target.closest("[data-drag-rail]")) event.preventDefault();
    });

    document.addEventListener("pointerdown", (event) => {
      const rail = event.target.closest("[data-drag-rail]");
      if (!rail || event.button !== 0) return;
      drag = {
        rail,
        startX: event.clientX,
        startLeft: rail.scrollLeft,
        moved: false,
        pointerId: event.pointerId
      };
      drag.rail.style.scrollSnapType = "none";
      rail.classList.add("is-dragging");
    });

    document.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const dx = event.clientX - drag.startX;
      if (Math.abs(dx) > 5) drag.moved = true;
      if (!drag.moved) return;
      event.preventDefault();
      if (drag.rail.setPointerCapture) {
        try { drag.rail.setPointerCapture(event.pointerId); } catch (error) { /* no-op */ }
      }
      drag.rail.scrollLeft = drag.startLeft - dx;
    }, { passive: false });

    const endDrag = () => {
      if (!drag) return;
      const rail = drag.rail;
      const moved = drag.moved;
      rail.classList.remove("is-dragging");
      rail.style.scrollSnapType = "";
      drag = null;
      if (moved) {
        const suppress = (event) => {
          event.preventDefault();
          event.stopPropagation();
        };
        document.addEventListener("click", suppress, { capture: true, once: true });
        window.setTimeout(() => document.removeEventListener("click", suppress, true), 80);
      }
    };

    document.addEventListener("pointerup", endDrag);
    document.addEventListener("pointercancel", endDrag);
  }

  function initReveal() {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
    const elements = $$(".reveal");
    if (!elements.length) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add("is-visible");
      } else {
        revealObserver.observe(el);
      }
    });
    window.clearTimeout(revealFallbackTimer);
    revealFallbackTimer = window.setTimeout(() => {
      elements.forEach((el) => el.classList.add("is-visible"));
    }, 3000);
  }

  /* ------------------------------------------------------------------------
     Search
     ------------------------------------------------------------------------ */

  function renderSearchResults(query) {
    if (!dom.searchResults) return;
    const q = String(query || "").trim().toLowerCase();
    const items = PRODUCTS.filter((product) => {
      if (!q) return true;
      return `${product.name} ${product.descriptor} ${product.category}`.toLowerCase().includes(q);
    });
    const count = $("[data-search-count]");
    if (count) count.textContent = q ? `${items.length} ${items.length === 1 ? "result" : "results"}` : `${PRODUCTS.length} essentials`;
    if (!items.length) {
      dom.searchResults.innerHTML = `<div class="search-empty">
        <p class="search-empty__title">no results for “${esc(query)}”.</p>
        <p>Try a shorter word, or browse the full collection.</p>
        <a class="text-link" href="#/shop" data-search-close>Shop all <span aria-hidden="true">→</span></a>
      </div>`;
      return;
    }
    dom.searchResults.innerHTML = `
      <div class="search-results__head"><p class="eyebrow">${q ? "Results" : "The edit"}</p></div>
      <div class="search-results__grid">
        ${items.map((product) => `
          <a class="search-card" href="#/product/${product.id}">
            <span class="search-card__media">${productVisual(product)}</span>
            <span class="search-card__copy">
              <span class="search-card__name">${esc(product.name)}</span>
              <span class="search-card__desc">${esc(product.descriptor)}</span>
              <span class="search-card__meta"><span>${esc(product.category)}</span><span>${esc(moneyFrom(product))}</span></span>
            </span>
          </a>
        `).join("")}
      </div>`;
  }

  /* ------------------------------------------------------------------------
     Early access
     ------------------------------------------------------------------------ */

  function maybeOpenEarlyAccess() {
    let seen = false;
    try { seen = window.localStorage.getItem(STORAGE.early) === "1"; } catch (error) { /* no-op */ }
    if (seen) return;
    window.setTimeout(() => {
      if (getRoute().path !== "/") return;
      if (anyOverlayOpen()) return;
      if (dom.megaMenu && !dom.megaMenu.hidden) return;
      if (document.body.classList.contains("is-checkout")) return;
      openEarly();
    }, 9000);
  }

  /* ------------------------------------------------------------------------
     Event handlers
     ------------------------------------------------------------------------ */

  function handleClick(event) {
    const target = event.target.closest("a,button,label");
    if (!target) return;

    const skipLink = event.target.closest(".skip-link");
    if (skipLink) {
      event.preventDefault();
      const main = document.getElementById("main");
      if (main) {
        main.focus();
        main.scrollIntoView({ block: "start", behavior: "auto" });
      }
      return;
    }

    const cartOpen = event.target.closest("[data-cart-open]");
    if (cartOpen) {
      event.preventDefault();
      if (dom.mobileMenu) dom.mobileMenu.hidden = true;
      openCart();
      return;
    }

    const cartClose = event.target.closest("[data-cart-close]");
    if (cartClose) {
      if (cartClose.tagName === "A") {
        closeCart();
        syncBodyLock();
        return;
      }
      event.preventDefault();
      closeCart();
      return;
    }

    const menuOpen = event.target.closest("[data-menu-open]");
    if (menuOpen) {
      event.preventDefault();
      openMobileMenu();
      return;
    }

    const menuClose = event.target.closest("[data-menu-close]");
    if (menuClose && !menuClose.hasAttribute("data-demo-open")) {
      closeMobileMenu();
      if (menuClose.tagName === "A") return;
      event.preventDefault();
      return;
    }

    const searchOpen = event.target.closest("[data-search-open]");
    if (searchOpen) {
      event.preventDefault();
      openSearch();
      return;
    }

    const searchClose = event.target.closest("[data-search-close]");
    if (searchClose) {
      if (searchClose.tagName === "A" && searchClose.getAttribute("href")) {
        closeSearch();
        return;
      }
      event.preventDefault();
      closeSearch();
      return;
    }

    const searchSuggest = event.target.closest("[data-search-suggest]");
    if (searchSuggest) {
      event.preventDefault();
      if (dom.searchInput) {
        dom.searchInput.value = searchSuggest.dataset.searchSuggest || "";
        renderSearchResults(dom.searchInput.value);
        dom.searchInput.focus();
      }
      return;
    }

    const accessibilityOpen = event.target.closest("[data-accessibility-open]");
    if (accessibilityOpen) {
      event.preventDefault();
      openAccessibilityPanel();
      return;
    }

    const accessibilityClose = event.target.closest("[data-accessibility-close]");
    if (accessibilityClose) {
      event.preventDefault();
      closeAccessibilityPanel();
      return;
    }

    const a11yToggle = event.target.closest("[data-a11y-toggle]");
    if (a11yToggle) {
      event.preventDefault();
      const key = a11yToggle.dataset.a11yToggle;
      setAccessibilityPref(key, !a11yPrefs[key]);
      return;
    }

    const megaToggle = event.target.closest("[data-mega-toggle]");
    if (megaToggle) {
      if (megaToggle.tagName === "A") {
        closeMega();
        return;
      }
      event.preventDefault();
      if (dom.megaMenu && !dom.megaMenu.hidden) closeMega();
      else openMega();
      return;
    }

    const megaClose = event.target.closest("[data-mega-close]");
    if (megaClose) {
      closeMega();
      if (megaClose.tagName === "A") return;
      event.preventDefault();
      return;
    }

    const megaCat = event.target.closest("[data-mega-cat]");
    if (megaCat) {
      event.preventDefault();
      $$("[data-mega-cat]").forEach((tab) => tab.classList.toggle("is-active", tab === megaCat));
      renderMegaMenu(megaCat.dataset.megaCat);
      return;
    }

    const reviewOpen = event.target.closest("[data-review-open]");
    if (reviewOpen) {
      event.preventDefault();
      openReviewModal();
      return;
    }

    const reviewClose = event.target.closest("[data-review-close]");
    if (reviewClose) {
      event.preventDefault();
      closeReviewModal();
      return;
    }

    const reviewScroll = event.target.closest("[data-review-scroll]");
    if (reviewScroll) {
      event.preventDefault();
      const section = document.getElementById("pdp-reviews");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const demoOpen = event.target.closest("[data-demo-open]");
    if (demoOpen) {
      event.preventDefault();
      if (dom.mobileMenu && !dom.mobileMenu.hidden) closeMobileMenu();
      openDemo();
      return;
    }

    const demoClose = event.target.closest("[data-demo-close]");
    if (demoClose) {
      event.preventDefault();
      closeDemo();
      return;
    }

    const earlyClose = event.target.closest("[data-early-close]");
    if (earlyClose) {
      event.preventDefault();
      closeEarly(true);
      return;
    }

    const emailClose = event.target.closest("[data-email-close]");
    if (emailClose) {
      event.preventDefault();
      closeEmailPreview();
      return;
    }

    const demoLink = event.target.closest("[data-demo-link]");
    if (demoLink) {
      event.preventDefault();
      showToast("Demo link — social and account links are placeholders.");
      return;
    }

    const quickToggle = event.target.closest("[data-quick-toggle]");
    if (quickToggle) {
      event.preventDefault();
      const card = quickToggle.closest("[data-product-card]");
      const panel = card ? card.querySelector("[data-quick-panel]") : null;
      if (!panel) return;
      const isOpen = !panel.hidden;
      closeAllQuickPanels();
      if (!isOpen) {
        panel.hidden = false;
        window.requestAnimationFrame(() => panel.classList.add("is-open"));
      }
      return;
    }

    const quickClose = event.target.closest("[data-quick-close]");
    if (quickClose) {
      event.preventDefault();
      const card = quickClose.closest("[data-product-card]");
      const panel = card ? card.querySelector("[data-quick-panel]") : null;
      if (panel) {
        panel.classList.remove("is-open");
        panel.hidden = true;
      }
      return;
    }

    const quickSize = event.target.closest("[data-quick-size]");
    if (quickSize) {
      event.preventDefault();
      const [id, sizeId] = quickSize.dataset.quickSize.split("|");
      closeAllQuickPanels();
      addLine(id, sizeId, 1);
      return;
    }

    const addToCart = event.target.closest("[data-add-to-cart]");
    if (addToCart) {
      event.preventDefault();
      addLine(addToCart.dataset.addToCart, addToCart.dataset.size || (PRODUCT_MAP[addToCart.dataset.addToCart]?.sizes[0].id), 1);
      return;
    }

    const filter = event.target.closest("[data-filter]");
    if (filter) {
      event.preventDefault();
      state.filter = filter.dataset.filter;
      updateShopGrid();
      return;
    }

    const shopView = event.target.closest("[data-shop-view]");
    if (shopView) {
      event.preventDefault();
      const columns = Number(shopView.dataset.shopView);
      if (columns === 2 || columns === 3) {
        state.shopColumns = columns;
        updateShopGrid();
      }
      return;
    }

    const faqCategory = event.target.closest("[data-faq-cat]");
    if (faqCategory) {
      event.preventDefault();
      const category = faqCategory.dataset.faqCat;
      $$("[data-faq-cat]").forEach((button) => button.classList.toggle("is-active", button === faqCategory));
      $$("[data-faq-group]").forEach((group) => {
        group.hidden = category !== "all" && group.dataset.faqGroup !== category;
      });
      return;
    }

    const aboutTab = event.target.closest("[data-about-tab]");
    if (aboutTab) {
      event.preventDefault();
      const key = aboutTab.dataset.aboutTab;
      const chapters = {
        skin: {
          heading: "a short routine, made well.",
          body: "Cleanse, hydrate and seal. Three considered steps that are easy to keep up with, morning and evening.",
          image: "assets/images/editorial-1.jpg",
          href: "#/shop?collection=skin",
          label: "skin"
        },
        "lip-cheek": {
          heading: "a little colour, cared for.",
          body: "Comfortable colour for lips and cheeks, made to sit alongside skin essentials rather than complicate them.",
          image: "assets/images/editorial-2.jpg",
          href: "#/shop?collection=lip-cheek",
          label: "lip + cheek"
        },
        sets: {
          heading: "the edit, together.",
          body: "The everyday routine in one considered set. A simple place to start, or an easy way to keep it going.",
          image: "assets/images/about.jpg",
          href: "#/shop?collection=sets",
          label: "sets"
        }
      };
      const chapter = chapters[key];
      if (!chapter) return;
      $$("[data-about-tab]").forEach((button) => {
        const active = button === aboutTab;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
      });
      const heading = $("[data-about-heading]");
      const body = $("[data-about-body]");
      const image = $("[data-about-image]");
      const link = $("[data-about-link]");
      if (heading) heading.textContent = chapter.heading;
      if (body) body.textContent = chapter.body;
      if (image) { image.src = chapter.image; image.alt = `A placeholder editorial image for the kafantu ${chapter.label} collection.`; }
      if (link) { link.href = chapter.href; link.innerHTML = `shop ${chapter.label} <span aria-hidden="true">→</span>`; }
      return;
    }

    const valuesTab = event.target.closest("[data-values-tab]");
    if (valuesTab) {
      event.preventDefault();
      const key = valuesTab.dataset.valuesTab;
      $$("[data-values-tab]").forEach((tab) => {
        const active = tab === valuesTab;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
      const title = $("[data-values-title]");
      if (title && VALUES[key]) title.textContent = VALUES[key].title;
      const description = $("[data-values-description]");
      if (description && VALUES[key]) description.textContent = VALUES[key].body;
      return;
    }

    const railPrev = event.target.closest("[data-rail-prev]");
    if (railPrev) {
      event.preventDefault();
      const rail = document.getElementById(railPrev.dataset.railPrev);
      if (rail) rail.scrollBy({ left: -railStep(rail), behavior: prefersReducedMotion() ? "auto" : "smooth" });
      return;
    }

    const railNext = event.target.closest("[data-rail-next]");
    if (railNext) {
      event.preventDefault();
      const rail = document.getElementById(railNext.dataset.railNext);
      if (rail) rail.scrollBy({ left: railStep(rail), behavior: prefersReducedMotion() ? "auto" : "smooth" });
      return;
    }

    const pdpSize = event.target.closest("[data-pdp-size]");
    if (pdpSize) {
      event.preventDefault();
      const product = productById(state.pdp.productId);
      if (product) {
        state.pdp.sizeId = pdpSize.dataset.pdpSize;
        updatePdpPrice(product, state.pdp.sizeId);
      }
      return;
    }

    const pdpQty = event.target.closest("[data-pdp-qty]");
    if (pdpQty) {
      event.preventDefault();
      state.pdp.qty = Math.max(1, Math.min(9, state.pdp.qty + Number(pdpQty.dataset.pdpQty)));
      $$("[data-pdp-qty-value]").forEach((el) => { el.textContent = state.pdp.qty; });
      return;
    }

    const pdpAdd = event.target.closest("[data-pdp-add]");
    if (pdpAdd) {
      event.preventDefault();
      if (state.pdp.productId && state.pdp.sizeId) {
        addLine(state.pdp.productId, state.pdp.sizeId, state.pdp.qty);
      }
      return;
    }

    const gallery = event.target.closest("[data-gallery]");
    if (gallery) {
      event.preventDefault();
      setPdpGallery(Number(gallery.dataset.gallery) || 0);
      return;
    }

    const galleryStep = event.target.closest("[data-gallery-step]");
    if (galleryStep) {
      event.preventDefault();
      setPdpGallery(state.pdp.gallery + Number(galleryStep.dataset.galleryStep || 0));
      return;
    }

    const lookTab = event.target.closest("[data-look-tab]");
    if (lookTab) {
      event.preventDefault();
      setLookTab(Number(lookTab.dataset.lookTab));
      return;
    }

    const routineStep = event.target.closest("[data-routine-step]");
    if (routineStep) {
      event.preventDefault();
      setRoutineStep(Number(routineStep.dataset.routineStep));
      return;
    }

    const reviewFilters = event.target.closest("[data-review-filters]");
    if (reviewFilters) {
      event.preventDefault();
      const panel = $("[data-review-filter-panel]");
      if (panel) {
        const open = panel.hidden;
        panel.hidden = !open;
        reviewFilters.setAttribute("aria-expanded", open ? "true" : "false");
      }
      return;
    }

    const reviewFilter = event.target.closest("[data-review-filter]");
    if (reviewFilter) {
      event.preventDefault();
      state.pdp.reviewFilter = reviewFilter.dataset.reviewFilter;
      state.pdp.reviewVisible = 2;
      updateReviewList();
      return;
    }

    const reviewShowMore = event.target.closest("[data-review-show-more]");
    if (reviewShowMore) {
      event.preventDefault();
      state.pdp.reviewVisible += 4;
      updateReviewList();
      return;
    }

    const pdpTab = event.target.closest("[data-pdp-tab]");
    if (pdpTab) {
      event.preventDefault();
      const key = pdpTab.dataset.pdpTab;
      $$("[data-pdp-tab]").forEach((tab) => {
        const active = tab === pdpTab;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.setAttribute("aria-expanded", active ? "true" : "false");
        const icon = tab.querySelector(".pdp-tab__icon");
        if (icon) icon.textContent = active ? "−" : "+";
        const item = tab.closest(".pdp-accordion");
        if (item) item.classList.toggle("is-open", active);
      });
      $$("[data-pdp-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.pdpPanel !== key;
      });
      return;
    }

    const cartQty = event.target.closest("[data-cart-qty]");
    if (cartQty) {
      event.preventDefault();
      updateLineQty(cartQty.dataset.key, Number(cartQty.dataset.cartQty));
      return;
    }

    const cartRemove = event.target.closest("[data-cart-remove]");
    if (cartRemove) {
      event.preventDefault();
      removeLine(cartRemove.dataset.cartRemove);
      return;
    }

    const previewEmail = event.target.closest("[data-preview-email]");
    if (previewEmail) {
      event.preventDefault();
      const order = findOrder(previewEmail.dataset.previewEmail);
      openEmailPreview(order);
      return;
    }

    const fillDemo = event.target.closest("[data-fill-demo]");
    if (fillDemo) {
      event.preventDefault();
      fillDemoDetails();
      return;
    }

    if (dom.megaMenu && !dom.megaMenu.hidden && !event.target.closest(".site-header")) {
      closeMega();
    }
  }

  function closeAllQuickPanels() {
    $$("[data-quick-panel]").forEach((panel) => {
      panel.classList.remove("is-open");
      panel.hidden = true;
    });
  }

  function handleSubmit(event) {
    const form = event.target;
    if (form.matches("[data-newsletter]")) {
      event.preventDefault();
      const email = form.elements.namedItem("email");
      if (!email || !validateEmail(email.value)) {
        showToast("Please enter a valid email — demo only.");
        return;
      }
      showToast("You're on the list — demo only.");
      form.reset();
      return;
    }

    if (form.matches("[data-early-form]")) {
      event.preventDefault();
      const email = form.elements.namedItem("email");
      const error = $("[data-early-error]");
      if (!email || !validateEmail(email.value)) {
        if (error) error.hidden = false;
        return;
      }
      if (error) error.hidden = true;
      closeEarly(true);
      showToast("You're on the list — demo only.");
      form.reset();
      return;
    }

    if (form.matches("[data-contact-form]")) {
      event.preventDefault();
      const name = form.elements.namedItem("name");
      const email = form.elements.namedItem("email");
      const reason = form.elements.namedItem("reason");
      const topic = form.elements.namedItem("topic");
      const message = form.elements.namedItem("message");
      const error = $("[data-contact-error]");
      const valid = name && name.value.trim() && email && validateEmail(email.value) && reason && reason.value && topic && topic.value.trim() && message && message.value.trim();
      if (error) error.hidden = Boolean(valid);
      if (!valid) {
        const firstInvalid = form.querySelector("input:invalid, select:invalid, textarea:invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      showToast("Message sent — demo only.");
      form.reset();
      return;
    }

    if (form.matches("[data-review-form]")) {
      event.preventDefault();
      const rating = form.querySelector('input[name="rating"]:checked');
      const title = form.elements.namedItem("reviewTitle");
      const body = form.elements.namedItem("reviewBody");
      const name = form.elements.namedItem("reviewName");
      const email = form.elements.namedItem("reviewEmail");
      const error = $("[data-review-error]");
      const valid = rating && title && title.value.trim() && body && body.value.trim() && name && name.value.trim() && email && validateEmail(email.value);
      if (error) error.hidden = Boolean(valid);
      if (!valid) {
        if (error) error.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }
      closeReviewModal();
      form.reset();
      showToast("Review received — demo only. No data is sent or stored.");
      return;
    }

    if (form.matches("[data-account-form]")) {
      event.preventDefault();
      const email = form.elements.namedItem("email");
      const password = form.elements.namedItem("password");
      if (!email || !validateEmail(email.value) || !password || !password.value) {
        showToast("Please enter a valid email and password — demo only.");
        return;
      }
      showToast("Demo only — no account is created.");
      return;
    }

    if (form.matches("[data-checkout-form]")) {
      event.preventDefault();
      handleCheckoutSubmit(form);
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.matches("[data-sort]")) {
      state.sort = target.value;
      updateShopGrid();
      return;
    }
    if (target.matches("[data-review-sort]")) {
      state.pdp.reviewSort = target.value;
      state.pdp.reviewVisible = 2;
      updateReviewList();
      return;
    }
    if (target.matches("[data-locale]")) {
      try { window.localStorage.setItem(STORAGE.locale, target.value); } catch (error) { /* no-op */ }
      showToast("Country preview updated — prices remain in USD for this demo.");
      return;
    }
    if (target.matches('input[name="shipping"]')) {
      state.checkout.shipping = target.value;
      const summary = $("[data-checkout-summary]");
      if (summary) summary.innerHTML = checkoutSummaryHTML();
      const total = $("[data-checkout-total]");
      if (total) total.textContent = money(checkoutTotals().total);
      return;
    }
    if (target.matches('input[name="payment"]')) {
      state.checkout.payment = target.value;
      const fields = $("[data-card-fields]");
      if (fields) fields.hidden = target.value === "paypal";
    }
  }

  function handleInput(event) {
    const target = event.target;
    if (target.matches("[data-search-input]")) {
      renderSearchResults(target.value);
      return;
    }
    if (target.matches("[data-card-number]")) {
      const digits = target.value.replace(/\D/g, "").slice(0, 19);
      target.value = digits.replace(/(.{4})/g, "$1 ").trim();
    }
  }

  function handleKeydown(event) {
    if (event.key !== "Escape") {
      if (event.key === "Enter" && event.target.matches("[data-search-input]")) {
        const first = dom.searchResults && dom.searchResults.querySelector("a");
        if (first) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }
    if (dom.emailModal && !dom.emailModal.hidden) { closeEmailPreview(); return; }
    if (dom.reviewModal && !dom.reviewModal.hidden) { closeReviewModal(); return; }
    if (dom.demoModal && !dom.demoModal.hidden) { closeDemo(); return; }
    if (dom.earlyModal && !dom.earlyModal.hidden) { closeEarly(true); return; }
    if (dom.accessibilityPanel && !dom.accessibilityPanel.hidden) { closeAccessibilityPanel(); return; }
    if (dom.searchOverlay && !dom.searchOverlay.hidden) { closeSearch(); return; }
    if (dom.cartDrawer && !dom.cartDrawer.hidden) { closeCart(); return; }
    if (dom.mobileMenu && !dom.mobileMenu.hidden) { closeMobileMenu(); return; }
    if (dom.megaMenu && !dom.megaMenu.hidden) closeMega();
  }

  function fillDemoDetails() {
    const form = $("[data-checkout-form]");
    if (!form) return;
    const values = {
      email: "demo@kafantu.example",
      firstName: "Kafantu",
      lastName: "Demo",
      address: "120 Greene Street",
      apartment: "4B",
      city: "New York",
      state: "NY",
      zip: "10012",
      country: "US",
      cardNumber: "4242 4242 4242 4242",
      cardExpiry: "12 / 30",
      cardCvc: "123"
    };
    Object.entries(values).forEach(([name, value]) => {
      const input = form.elements.namedItem(name);
      if (input && "value" in input) input.value = value;
    });
    showToast("Demo details filled. No real card is charged.");
  }

  /* ------------------------------------------------------------------------
     Init
     ------------------------------------------------------------------------ */

  let megaCloseTimer = null;

  function initMegaHover() {
    const trigger = $("[data-mega-toggle]");
    if (!trigger || !dom.header || !dom.megaMenu) return;
    const cancelClose = () => {
      window.clearTimeout(megaCloseTimer);
      megaCloseTimer = null;
    };
    const scheduleClose = () => {
      cancelClose();
      megaCloseTimer = window.setTimeout(() => {
        if (dom.header.matches(":hover") || dom.megaMenu.matches(":hover")) return;
        closeMega();
      }, 180);
    };

    trigger.addEventListener("pointerenter", (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      cancelClose();
      if (dom.megaMenu.hidden) openMega();
    });
    trigger.addEventListener("focus", () => {
      cancelClose();
      if (dom.megaMenu.hidden) openMega();
    });
    dom.header.addEventListener("pointerenter", cancelClose);
    dom.header.addEventListener("pointerleave", scheduleClose);
    dom.megaMenu.addEventListener("pointerenter", cancelClose);
    dom.megaMenu.addEventListener("pointerleave", scheduleClose);
  }

  function init() {
    dom.view = $("[data-view]");
    dom.header = $("[data-site-header]");
    dom.megaMenu = $("[data-mega-menu]");
    dom.megaTabs = $("[data-mega-tabs]");
    dom.megaGrid = $("[data-mega-grid]");
    dom.mobileMenu = $("[data-mobile-menu]");
    dom.cartDrawer = $("[data-cart-drawer]");
    dom.searchOverlay = $("[data-search-overlay]");
    dom.searchInput = $("[data-search-input]");
    dom.searchResults = $("[data-search-results]");
    dom.earlyModal = $("[data-early-modal]");
    dom.demoModal = $("[data-demo-modal]");
    dom.reviewModal = $("[data-review-modal]");
    dom.emailModal = $("[data-email-modal]");
    dom.accessibilityPanel = $("[data-accessibility-panel]");
    dom.toast = $("[data-toast]");

    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    loadAccessibilityPrefs();
    renderMegaMenu("featured");
    renderRoute();

    try {
      const savedLocale = window.localStorage.getItem(STORAGE.locale);
      const locale = $("[data-locale]");
      if (savedLocale && locale && [...locale.options].some((option) => option.value === savedLocale)) {
        locale.value = savedLocale;
      }
    } catch (error) { /* no-op */ }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    document.addEventListener("change", handleChange);
    document.addEventListener("input", handleInput);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("pointerover", handlePdpHover, { passive: true });
    document.addEventListener("focusin", handlePdpHover);
    initMegaHover();
    initDragRails();
    window.addEventListener("resize", () => {
      const rail = document.getElementById("social-rail");
      if (rail) updateSocialProgress(rail);
      fitFooterWordmark();
      syncPdpStickyBar();
    }, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitFooterWordmark).catch(() => {});
    }
    window.addEventListener("scroll", () => {
      updateHeader();
      syncPdpStickyBar();
    }, { passive: true });
    window.addEventListener("hashchange", () => renderRoute());
    if (window.matchMedia) {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (typeof motionQuery.addEventListener === "function") {
        motionQuery.addEventListener("change", syncHeroPlayback);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
