export interface Product {
  id: string;
  name: string;
  category: 'bedsheets' | 'blankets' | 'comforters' | 'dohars' | 'bedding-sets';
  categoryLabel: string;
  collection: string;
  price: string;
  rating: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  specifications: Record<string, string>;
  features: string[];
  careInstructions: string[];
  packageIncludes: string[];
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  description: string;
  theme: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  category: string;
  date: string;
  readTime: string;
  featuredImage: string;
  tableOfContents: { id: string; text: string }[];
}

// 1. PRODUCTS DATA
export const PRODUCTS: Product[] = [
  {
    id: "excellence-cotton-bedsheet",
    name: "Excellence Premium Cotton Sheets",
    category: "bedsheets",
    categoryLabel: "Bedsheets",
    collection: "Excellence Collection",
    price: "₹4,499",
    rating: 5,
    image: "/images/bedsheets_category.jpg",
    images: [
      "/images/bedsheets_category.jpg",
      "/images/hero_bedroom.jpg",
      "/images/bedding_sets_category.jpg"
    ],
    description: "Crafted from 100% long-staple Giza cotton with a luscious 400 thread count sateen weave, the Excellence Sheet offers an ultra-soft feel and a beautiful subtle sheen. Engineered for longevity and maximum breathability, this sheet set gets softer with every wash while remaining resistant to pilling and fading.",
    shortDescription: "400 TC long-staple sateen Giza cotton sheet set with elegant hemstitching.",
    specifications: {
      "Material": "100% Giza Long-Staple Cotton",
      "Thread Count": "400 TC",
      "Weave": "Sateen",
      "Origin": "Proudly Made in India",
      "Sizes Available": "Double King (108\" x 108\")",
      "Finish": "Silk-protein luxury finish"
    },
    features: [
      "100% Giza Cotton with long-staple fibers",
      "Mercerized for silk-like sheen and color retention",
      "Fade-resistant and shrink-resistant",
      "Extra thick high-quality elastic around fitted sheet (deep pockets)",
      "Oeko-Tex certified: safe for sensitive skin"
    ],
    careInstructions: [
      "Machine wash warm on gentle cycle",
      "Use mild detergent without bleach",
      "Tumble dry low and remove promptly",
      "Warm iron if necessary"
    ],
    packageIncludes: [
      "1 King Size Flat Bedsheet (108 in x 108 in)",
      "2 Standard Pillow Covers (18 in x 27 in)"
    ]
  },
  {
    id: "italian-embroidery-bedsheet",
    name: "Italian Monogram Embroidered Bedsheet",
    category: "bedsheets",
    categoryLabel: "Bedsheets",
    collection: "Italian Embroidery",
    price: "₹6,299",
    rating: 4.9,
    image: "/images/bedding_sets_category.jpg",
    images: [
      "/images/bedding_sets_category.jpg",
      "/images/bedsheets_category.jpg",
      "/images/hero_bedroom.jpg"
    ],
    description: "Inspired by classic Tuscan heritage, our Italian Embroidery collection features precision satin-stitch double borders embroidered on 600 thread count cotton percale. Crisp, cool, and exceptionally breathable, it offers the distinct luxury feel of a world-class boutique hotel room.",
    shortDescription: "600 TC Egyptian Cotton Percale Sheets with Italian double-border embroidery.",
    specifications: {
      "Material": "100% Egyptian Cotton",
      "Thread Count": "600 TC",
      "Weave": "Percale (Crisp and Cool)",
      "Embroidery": "High-density satin stitch double border",
      "Sizes Available": "Super King (108\" x 112\")"
    },
    features: [
      "Crisp hotel-like percale feel",
      "Exquisite Italian inspired embroidery lines",
      "Extremely breathable, ideal for Indian climates",
      "Pre-shrunk fabric to prevent post-wash sizing issues",
      "Skin-friendly dye used throughout"
    ],
    careInstructions: [
      "Machine wash cool, delicate cycle",
      "Do not bleach or dry clean",
      "Tumble dry low and press with a warm steam iron to restore crispness"
    ],
    packageIncludes: [
      "1 Super King Size Flat Sheet (108 in x 112 in)",
      "2 Embroidered Pillow Shams (18 in x 28 in)"
    ]
  },
  {
    id: "clay-craft-indigo-dohar",
    name: "Clay Craft Hand-Block Print Dohar",
    category: "dohars",
    categoryLabel: "Dohars",
    collection: "Clay Craft",
    price: "₹2,999",
    rating: 4.8,
    image: "/images/dohars_category.jpg",
    images: [
      "/images/dohars_category.jpg",
      "/images/hero_bedroom.jpg"
    ],
    description: "Designed using traditional hand-block printing techniques of Rajasthan, the Clay Craft Indigo Dohar features three layers of fine mulmul cotton. Sandwiching a soft cotton flannel layer inside, it provides the perfect breathable warmth for air-conditioned rooms.",
    shortDescription: "3-layer mulmul cotton Dohar featuring authentic organic indigo hand-block printing.",
    specifications: {
      "Material": "100% Organic Mulmul Cotton",
      "Fill": "Ultra-soft cotton flannel layer inside",
      "Printing Method": "Authentic Hand-Block Printing with organic dyes",
      "Weight": "Lightweight (800g)",
      "Dimensions": "Double (90\" x 100\")"
    },
    features: [
      "Authentic hand-made block prints (minor variations indicate craftsmanship)",
      "Tri-layered soft mulmul cotton structure",
      "Naturally hypoallergenic and skin-friendly",
      "Perfect for AC environments and transitions between seasons",
      "Machine washable, quick drying"
    ],
    careInstructions: [
      "Machine wash cold separately on gentle cycle",
      "Line dry in shade to maintain indigo depth",
      "Iron on low setting if desired"
    ],
    packageIncludes: [
      "1 Premium Hand-Block Dohar (90 in x 100 in)"
    ]
  },
  {
    id: "cloud-luxury-comforter",
    name: "Cloud Microfiber Luxury Comforter",
    category: "comforters",
    categoryLabel: "Comforters",
    collection: "Clouds",
    price: "₹5,499",
    rating: 5,
    image: "/images/comforters_category.jpg",
    images: [
      "/images/comforters_category.jpg",
      "/images/bedding_sets_category.jpg"
    ],
    description: "Live up to the feeling of sleeping on a cloud. Filled with 350 GSM of premium hypoallergenic down-alternative microgel and encased in a 300 TC sateen cotton casing. Box-stitch quilting ensures that the filling is evenly distributed, eliminating cold spots for consistent warmth throughout the night.",
    shortDescription: "Hypoallergenic down-alternative comforter, 350 GSM with box-stitch quilting.",
    specifications: {
      "Casing Fabric": "100% Cotton Sateen, 300 Thread Count",
      "Filling": "Premium Down-Alternative Microgel (350 GSM)",
      "Quilting Style": "Double-needle baffle box stitch",
      "Seasonality": "All-season luxury warmth",
      "Dimensions": "King Size (90\" x 108\")"
    },
    features: [
      "Baffle box design prevents fill shift and flat spots",
      "Corner loops to easily tie duvet covers",
      "Hypoallergenic, dust-mite resistant, skin-friendly",
      "Plush volume with lightweight breathability",
      "Luxury piping on edges"
    ],
    careInstructions: [
      "Dry clean recommended, or machine wash in commercial front-load washer on gentle cold",
      "Tumble dry extra low with tennis balls to restore fluffiness"
    ],
    packageIncludes: [
      "1 Premium Box-Stitched Comforter (90 in x 108 in)"
    ]
  },
  {
    id: "fleece-ac-blanket",
    name: "Altra Luxury Fleece AC Blanket",
    category: "blankets",
    categoryLabel: "Blankets",
    collection: "Altra",
    price: "₹1,899",
    rating: 4.7,
    image: "/images/blankets_category.jpg",
    images: [
      "/images/blankets_category.jpg",
      "/images/hero_bedroom.jpg"
    ],
    description: "The Altra Luxury Fleece Blanket is designed to provide light, cozy warmth on chilly summer nights or under central air conditioning. Made from high-density, anti-pilling micro-fleece, it features a velvety texture that is incredibly soft to the touch.",
    shortDescription: "Ultra-soft micro-fleece AC blanket, lightweight and anti-pilling with velvet binding.",
    specifications: {
      "Material": "100% Microfiber Polar Fleece",
      "Weight": "280 GSM",
      "Finish": "Anti-pilling treatment, double-stitch hem",
      "Dimensions": "Single (60\" x 90\")"
    },
    features: [
      "Featherlight yet warm, ideal for AC rooms",
      "Anti-pilling technology keeps blanket lint-free",
      "Super soft velvet touch, gentle on skin",
      "Resistant to fading, stretching, and wrinkling",
      "Extremely quick to dry after washing"
    ],
    careInstructions: [
      "Machine wash warm with similar colors",
      "Do not use bleach or iron",
      "Tumble dry low or air dry"
    ],
    packageIncludes: [
      "1 Fleece AC Blanket (60 in x 90 in)"
    ]
  },
  {
    id: "royal-palace-bedding-set",
    name: "Royal Palace Signature Bedding Set",
    category: "bedding-sets",
    categoryLabel: "Complete Bedding Sets",
    collection: "Mughal",
    price: "₹12,499",
    rating: 5,
    image: "/images/hero_bedroom.jpg",
    images: [
      "/images/hero_bedroom.jpg",
      "/images/bedding_sets_category.jpg",
      "/images/comforters_category.jpg"
    ],
    description: "Elevate your suite with the ultimate bedroom upgrade. The Royal Palace Bedding Set combines our iconic 600 thread count sheets, a premium box-stitched matching comforter, and coordinating pillow covers for an aesthetically curated luxury display of royalty.",
    shortDescription: "The ultimate 7-piece bedroom set, featuring 600 TC sheets and matching comforter.",
    specifications: {
      "Material": "100% Cotton & Premium Microfiber",
      "Comforter GSM": "350 GSM",
      "Weave": "Sateen Luxury Finish",
      "Thread Count": "600 TC for sheets",
      "Design Theme": "Mughal-Royal Traditional Motifs"
    },
    features: [
      "Curated color and design harmony across sheets and comforter",
      "Heavyweight luxury feel that drapes beautifully",
      "Fade-resistant reactive printing technique",
      "Stitched meticulously with high-density threads",
      "Eco-friendly manufacturing process in clean facilities"
    ],
    careInstructions: [
      "Comforter: Professional dry clean only",
      "Sheets & Pillows: Machine wash cold, gentle cycle, tumble dry low"
    ],
    packageIncludes: [
      "1 King Size Comforter (90 in x 108 in)",
      "1 King Size Flat Bedsheet (108 in x 108 in)",
      "2 Premium Pillow Covers (18 in x 27 in)",
      "2 Quilted Pillow Shams (20 in x 30 in)",
      "1 Decorative Cushion Cover (16 in x 16 in)"
    ]
  }
];

// 2. COLLECTIONS DATA
export const COLLECTIONS: Collection[] = [
  {
    id: "excellence",
    name: "Excellence Collection",
    image: "/images/bedsheets_category.jpg",
    description: "Sophisticated minimalism meets luxury. Muted tones and refined patterns tailored for contemporary bedrooms.",
    theme: "Modern Minimalism"
  },
  {
    id: "italian-embroidery",
    name: "Italian Embroidery",
    image: "/images/bedding_sets_category.jpg",
    description: "Intricate borders and customized monograms reminiscent of Renaissance elegance and architectural geometry.",
    theme: "Renaissance Heritage"
  },
  {
    id: "clay-craft",
    name: "Clay Craft",
    image: "/images/dohars_category.jpg",
    description: "Earthy tones and organic block prints inspired by heritage pottery, terra cotta, and desert indigo landscapes.",
    theme: "Organic & Handcrafted"
  },
  {
    id: "amrit",
    name: "Amrit Collection",
    image: "/images/hero_bedroom.jpg",
    description: "Pure white and gold weaves celebrating sacred geometry, timeless purity, and serene bedroom sanctuary aesthetics.",
    theme: "Divine Serenity"
  },
  {
    id: "clouds",
    name: "Clouds Collection",
    image: "/images/comforters_category.jpg",
    description: "Featherlight, incredibly puffy textures and pastel hues designed for the ultimate weightless sleeping experience.",
    theme: "Plush Weightlessness"
  },
  {
    id: "mughal",
    name: "Mughal Heritage",
    image: "/images/hero_bedroom.jpg",
    description: "Exquisite paisley designs and royal court patterns block-printed on fine luxury organic cotton.",
    theme: "Royal Court Elegance"
  },
  {
    id: "florida",
    name: "Florida Breezes",
    image: "/images/blankets_category.jpg",
    description: "Vibrant tropical motifs and crisp coastal shades perfect for sunlit rooms and summer styling.",
    theme: "Coastal Escape"
  },
  {
    id: "shubhrang",
    name: "Shubhrang Pure White",
    image: "/images/bedsheets_category.jpg",
    description: "Pristine white-on-white self jacquards and dobby stripes representing high-end hospitalities and villas.",
    theme: "Pristine Whites"
  },
  {
    id: "altra",
    name: "Altra Modern",
    image: "/images/blankets_category.jpg",
    description: "Deep colors, sharp geometric block details, and ultra-plush velvet bindings for bold modern statements.",
    theme: "Bold & Contemporary"
  }
];

// 3. WHY CHOOSE US
export const WHY_CHOOSE_US = [
  {
    id: "premium-fabric",
    title: "100% Premium Fabric",
    description: "Sourced from high-grade, long-staple cotton and superfine microfibers to ensure a soft, skin-friendly, and highly breathable touch.",
    icon: "Layers"
  },
  {
    id: "elegant-designs",
    title: "Elegant Designs",
    description: "Artfully curated patterns, from traditional hand-block Mughal prints to crisp Italian geometric embroidery borders.",
    icon: "Paintbrush"
  },
  {
    id: "fade-resistant",
    title: "Fade Resistant",
    description: "Processed with high-quality reactive dyes that form a chemical bond with the fibers, keeping colors vibrant after dozens of washes.",
    icon: "Sun"
  },
  {
    id: "shrink-resistant",
    title: "Shrink Resistant",
    description: "Every fabric roll undergoes a specialized mechanical pre-shrinking process to ensure it keeps its perfect fit over time.",
    icon: "Maximize"
  },
  {
    id: "skin-friendly",
    title: "Skin Friendly & Hypoallergenic",
    description: "Oeko-Tex Standard 100 certified, meaning our textile products are free of harmful chemicals, making them safe for sensitive skin.",
    icon: "Heart"
  },
  {
    id: "machine-washable",
    title: "Machine Washable",
    description: "Engineered to withstand standard home machine laundering cycles, maintaining integrity and texture without fluff wear.",
    icon: "Wind"
  },
  {
    id: "breathable",
    title: "All-Season Breathability",
    description: "Naturally regulating fibers allow air circulation, keeping you cool during warm summer nights and insulated during the winters.",
    icon: "Compass"
  },
  {
    id: "long-lasting",
    title: "Long Lasting Fabric",
    description: "High tensile strength weaving prevents tearing and stitching fraying, providing years of consistent luxury comfort.",
    icon: "ShieldCheck"
  },
  {
    id: "luxury-finish",
    title: "Luxury Finish",
    description: "Lustrous sateen finishes and mercerized sheen give each piece a fluid, premium drape and spectacular tactile response.",
    icon: "Award"
  },
  {
    id: "fine-stitching",
    title: "Fine Stitching",
    description: "Double-needle stitching and high stitch density (12 stitches per inch) prevent seams from opening or puckering.",
    icon: "Scissors"
  },
  {
    id: "modern-printing",
    title: "Modern Printing Tech",
    description: "Uses computerized rotary screen printing to ensure sharp details, flawless registration, and color depth consistency.",
    icon: "Cpu"
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly Manufacturing",
    description: "Our production facility recycles 90% of water used in dyeing and operates under ethical, fair-wage labor standards.",
    icon: "Leaf"
  }
];

// 4. TESTIMONIALS
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Aishwarya Sen",
    role: "Lead Interior Designer",
    company: "Studio Elegance",
    rating: 5,
    review: "I have sourced bedding collections for my luxury residential projects from Achtia Creation for over three years. The fabric quality, weight, and sheen of their sateen sheets are outstanding. My clients consistently remark on how soft they are.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Vikram Malhotra",
    role: "General Manager",
    company: "The Grand Vista Boutique Hotel",
    rating: 5,
    review: "Guest reviews for our boutique resort frequently praise our bed linen. We use Achtia Creation's Italian Embroidery and Shubhrang collections. They hold up beautifully to commercial laundering while retaining their crisp, five-star appearance.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Meera Deshmukh",
    role: "Premium Retailer Partner",
    company: "Deshmukh Furnishings",
    rating: 5,
    review: "Bedsheets from Achtia Creation fly off our shelves. The Mughal prints and Clay Craft Dohars display incredible print precision and soft texture that customers instantly fall in love with. Excellent lead times and pristine packaging.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Rohit Kapur",
    role: "Homeowner & Architect",
    company: "Kapur Residences",
    rating: 5,
    review: "Sleeping under the Cloud Comforter is an unmatched experience. It is lightweight, perfectly fluffy, and regulates heat incredibly well in AC. Achtia Creation has redefined bedding luxury in India.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
  }
];

// 5. MANUFACTURING TIMELINE
export const MANUFACTURING_TIMELINE = [
  {
    step: "01",
    title: "Premium Fabric Sourcing",
    description: "We source certified long-staple cotton fibers from elite fields, verifying fiber length and uniformity before spun processing."
  },
  {
    step: "02",
    title: "Precision Weaving & Sizing",
    description: "High-speed airjet looms weave the cotton into high thread-count percale and sateen fabrics with perfect tension controls."
  },
  {
    step: "03",
    title: "Modern Eco-Friendly Printing",
    description: "Using rotary screens and non-toxic reactive dyes, designs are printed deep into the fabric fibers for long-lasting vibrancy."
  },
  {
    step: "04",
    title: "Double-Stitched Sewing",
    description: "Master tailors manually inspect and stitch hem borders, embroidery, and zippers, ensuring 12 stitches per inch density."
  },
  {
    step: "05",
    title: "3-Tier Quality Inspection",
    description: "Every item is examined for thread count, dimensions, color-fastness, and minor weaving anomalies under specialized lighting."
  },
  {
    step: "06",
    title: "Luxury Box Packaging & Delivery",
    description: "Ironed bedding is packed in premium, dust-proof cardboard slide boxes and shipped across India with real-time tracking."
  }
];

// 6. FAQS (20 QUESTIONS FOR SEO OPTIMIZATION)
export const FAQS: FAQItem[] = [
  {
    question: "What makes Achtia Creation bedding collections premium?",
    answer: "Achtia Creation utilizes only premium, certified long-staple cotton (such as Giza and Egyptian Cotton) with high thread counts (up to 600 TC) woven on modern airjet looms. We finish our fabrics with organic processes that impart a silk-like sheen, and we enforce a rigorous 3-tier inspection protocol, ensuring that every sheet, comforter, and dohar is flawless."
  },
  {
    question: "What is Giza Cotton, and why is it used in the Excellence Collection?",
    answer: "Giza Cotton is a high-grade Egyptian cotton grown in the fertile Nile Delta. It is characterized by exceptionally long, fine, and strong fibers. Using it in our Excellence Collection allows us to spin super-fine yarns, yielding a fabric that is incredibly soft, lightweight, highly breathable, and remarkably durable."
  },
  {
    question: "How do I choose between a Dohar, a Comforter, and a Blanket?",
    answer: "Dohars are traditional, lightweight, three-layer covers made of mulmul cotton sandwhiching a flannel sheet, perfect for warm summers or mild AC cooling. Comforters are thick, fluffy covers filled with synthetic down (like our 350 GSM microgel) that provide luxurious loft and warmth for cold seasons or strong AC. Blankets (like our Fleece collection) are knitted sheets that offer close-fitting cozy warmth and quick-dry ease."
  },
  {
    question: "What does Thread Count (TC) actually mean?",
    answer: "Thread Count represents the number of horizontal (weft) and vertical (warp) threads woven into one square inch of fabric. While higher numbers like 400 TC and 600 TC generally mean a smoother, denser fabric, the quality of the thread itself (like long-staple cotton) is more critical. Achtia Creation never compromises on fiber grade, so our high thread counts translate directly into true luxury."
  },
  {
    question: "What is the difference between Sateen and Percale weaves?",
    answer: "Sateen weaves use a four-over-one thread pattern, resulting in a buttery-soft feel, heavier drape, and a subtle luminous sheen (like our Excellence sheets). Percale weaves use a simple one-over-one pattern, providing a crisp, cool touch and a matte finish, which is highly breathable and resembles classic high-end hotel bedding."
  },
  {
    question: "Are your sheets and blankets pre-shrunk?",
    answer: "Yes, all fabric used in Achtia Creation sheets, dohars, and comforters undergoes mechanical pre-shrinking (sanforization) during the finishing process. This ensures that the dimensions remain stable and fit your mattresses and pillows perfectly, even after numerous machine washes."
  },
  {
    question: "Are the colors on the bedsheets fade-resistant?",
    answer: "Absolutely. We employ high-temperature reactive printing and dyeing processes. Reactive dyes chemically bind with the cellulose of the cotton fibers, preventing the color from bleeding or fading when exposed to water, detergent, or sunlight."
  },
  {
    question: "Is your bedding safe for sensitive or allergy-prone skin?",
    answer: "Yes, our products are Oeko-Tex Standard 100 certified, which guarantees that they are free from harmful concentrations of toxic chemicals, heavy metals, or formaldehydes. The high breathability of long-staple cotton also reduces sweat retention, minimizing skin irritations."
  },
  {
    question: "How should I wash and care for my comforter?",
    answer: "For our Cloud Comforters, we recommend professional dry cleaning. However, you can also machine wash it in a large-capacity commercial front-load washer on a gentle cold cycle with mild detergent. Tumble dry on extra low with clean tennis balls to prevent the microgel fill from clumping."
  },
  {
    question: "Can I machine wash the hand-block printed Clay Craft Dohars?",
    answer: "Yes, our Clay Craft Dohars can be machine washed in cold water on a gentle, separate cycle. We advise using mild detergents, avoiding chlorine bleach, and line drying in the shade to maintain the organic block-printed indigo or herbal pigments."
  },
  {
    question: "Does Achtia Creation offer deep-pocket fitted sheets?",
    answer: "Yes, our fitted bedsheets are manufactured with deep pockets and extra-thick premium elastic along the entire perimeter. This ensures a snug, secure fit on modern mattresses up to 12 inches thick, preventing the corners from popping up."
  },
  {
    question: "What dimensions are your Double King and Super King bedsheets?",
    answer: "Our Double King sheets measure 108 inches by 108 inches (274 cm x 274 cm), and our Super King sheets measure 108 inches by 112 inches (274 cm x 284 cm). They are designed to fit standard Indian king and super king beds with ample tuck-in margin."
  },
  {
    question: "Do you offer customization in bedsheet sizes?",
    answer: "For bulk commercial orders (such as high-end hotels, guest houses, and interior designers), we offer tailored sizing and custom monogram embroidery. Please contact our support team via WhatsApp or the Contact Us form with your specific dimensions."
  },
  {
    question: "Do you ship your home furnishing products all over India?",
    answer: "Yes, Achtia Creation offers premium insured shipping across all pin codes in India. We partner with reliable air-courier services to ensure your order arrives in pristine condition. Tracking coordinates are sent instantly upon dispatch."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We offer a hassle-free 7-day return and exchange policy for unused, unwashed products in their original luxury box packaging. If you detect any manufacturing anomaly, we will arrange a complimentary reverse pickup and issue a complete refund or replacement."
  },
  {
    question: "What is a Dohar and how is it constructed?",
    answer: "A Dohar is a traditional Indian summer blanket constructed with three layers. The top and bottom layers are ultra-fine, transparent mulmul cotton, and the inner layer is a brushed cotton flannel. This flannel layer catches air, providing a light insulation that is ideal for air-conditioned rooms."
  },
  {
    question: "Do you use eco-friendly processes in manufacturing?",
    answer: "Yes. Our production facilities deploy a Zero Liquid Discharge (ZLD) waste management system, recycling 90% of water used in fabric treatment. We also prioritize natural starch sizing, organic vegetable prints for block lines, and respect strict fair-wage employment ethics."
  },
  {
    question: "How long does a premium cotton bedsheet typically last?",
    answer: "With proper care (mild detergents, warm washing, avoiding excessive bleach), a premium long-staple cotton bedsheet from Achtia Creation will easily maintain its sheen, softness, and structure for 3 to 5 years, outlasting cheap polyester sheets by triple the duration."
  },
  {
    question: "How do I request a product catalogue for wholesale orders?",
    answer: "You can request a complete physical or digital catalogue by clicking the 'Request Catalogue' button in our header, submitting your details on our Contact page, or messaging our corporate desk directly via the WhatsApp floating button."
  },
  {
    question: "What payment methods are supported on your online storefront?",
    answer: "We accept all major credit and debit cards, secure UPI payments (Google Pay, PhonePe, Paytm), Net Banking from leading banks, and verified Cash on Delivery (COD) for selected postal codes across India."
  }
];

// 7. BLOG POSTS (SEO OPTIMIZED ARTICLES)
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ultimate-guide-buying-luxury-bedsheets",
    title: "The Ultimate Guide to Buying Luxury Bedsheets: Thread Count, Weaves, and Fibers",
    excerpt: "Confused by thread count marketing? Discover how cotton staple length, sateen vs. percale weaves, and printing techniques impact your sleep quality.",
    category: "Bedsheet Buying Guide",
    date: "June 25, 2026",
    readTime: "6 min read",
    featuredImage: "/images/bedsheets_category.jpg",
    author: {
      name: "Radhika Sharma",
      role: "Textile Consultant",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    tableOfContents: [
      { id: "myth-thread-count", text: "1. The Myth of Thread Count" },
      { id: "fiber-length-staple", text: "2. Why Fiber Staple Length Rules Supreme" },
      { id: "sateen-vs-percale", text: "3. Sateen vs. Percale: Choose Your Style" },
      { id: "caring-linen", text: "4. Caring for Your Luxury Bedding" }
    ],
    content: `
## The Myth of Thread Count

For decades, marketers have told consumers that higher thread counts automatically translate to softer, more luxurious sheets. However, this is one of the biggest misconceptions in home textiles. 

**Thread count** is simply the number of threads woven into one square inch of fabric. Some manufacturers inflate thread counts by using multi-ply yarns—plies of cheap, thin fibers twisted together. A 1000 TC sheet made of low-grade, multi-ply polyester will feel heavy, scratchy, and trap heat. On the other hand, a 300 or 400 TC sheet woven from single-ply, long-staple Giza cotton feels extraordinarily soft, breathable, and lasts for years.

---

## Why Fiber Staple Length Rules Supreme

The quality of the cotton fiber, or 'staple length,' is the single most important factor when purchasing bed sheets.
- **Short-Staple Cotton:** Fibers are short and break easily. Sheets made from this cotton eventually develop fuzzy pills, feel rough, and tear after a few washings.
- **Long-Staple and Extra-Long-Staple Cotton:** Giza, Egyptian, and Pima cotton feature long fibers. These fibers spun into yarn create incredibly smooth, strong, and thin threads. The result is a highly durable fabric that feels fluid, drapable, and soft to the skin.

---

## Sateen vs. Percale: Choose Your Style

Once you choose long-staple cotton, you must decide on the weave:

### Sateen Weave
Sateen uses a four-over-one-under weave pattern. This exposes more thread surface, creating:
- A buttery-soft, silky texture.
- A beautiful, subtle luminous sheen.
- A heavier drape that keeps you cozy.
- Perfect for air-conditioned rooms and cooler months.

### Percale Weave
Percale uses a classic grid, one-over-one-under weave. This creates:
- A crisp, cool-to-the-touch feel (resembling high-end hotel beds).
- A clean, matte look.
- Exceptional airflow, keeping hot sleepers sweat-free.
- Highly recommended for Indian summers.

---

## Caring for Your Luxury Bedding

To protect your investment and keep your cotton sheets feeling luxurious:
1. **Wash Warm:** Machine wash on a gentle cycle. Hot water can break down cotton fibers over time.
2. **Avoid Fabric Softeners:** Silicones in commercial softeners coat fibers, reducing cotton's natural breathability.
3. **Iron Damp:** For crisp hotel sheets, iron your cotton sheets while they are still slightly damp to easily release creases.
    `
  },
  {
    slug: "how-to-style-your-bedroom-like-five-star-hotel",
    title: "How to Style Your Bedroom Like a 5-Star Boutique Hotel Suite",
    excerpt: "Transform your bedroom into a sanctuary. Learn the professional techniques of layering bedding, lighting styling, and color coordination.",
    category: "Bedroom Styling",
    date: "June 20, 2026",
    readTime: "5 min read",
    featuredImage: "/images/hero_bedroom.jpg",
    author: {
      name: "Kabir Mehta",
      role: "Luxury Interior Stylist",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
    },
    tableOfContents: [
      { id: "layering-bed", text: "1. The Art of Bed Layering" },
      { id: "color-harmonies", text: "2. Establishing Calm Color Harmonies" },
      { id: "pillow-placement", text: "3. Pillow Layout Strategy" },
      { id: "lighting-scents", text: "4. Ambience: Lighting and Scents" }
    ],
    content: `
## The Art of Bed Layering

The hallmark of a high-end hotel bed is its invite-only volume. You can easily duplicate this depth at home with layering.
1. **The Base:** Start with a tight-fitting fitted sheet, followed by a crisp flat sheet laid face down, so the decorative top hem folds over beautifully.
2. **The Comforter/Duvet:** Layer a plush comforter (like our 350 GSM Cloud Comforter) on top. Fold it back halfway down the bed to create an inviting crease.
3. **The Dohar/Throw:** Drape a beautifully patterned cotton Dohar (like our Clay Craft Indigo) at the foot of the bed. This breaks monotony and adds instant texture.

---

## Establishing Calm Color Harmonies

Five-star suites steer clear of chaotic, neon colors. They base their palettes on neutral tones that evoke calmness:
- **Warm Earth tones:** Blend cocoa brown (#6A4E42) with soft gold (#B88A5A) and cream accents (#F4EFE9).
- **Pristine Whites:** Layer different textures of white (jacquards, stripes, and linen finishes) for a sleek, contemporary retreat.

---

## Pillow Layout Strategy

Never toss a single pillow on each side. A standard luxury bed arrangement includes:
- **Euro Shams:** Two large, square pillows resting against the headboard to provide height.
- **Sleeping Pillows:** Standard rectangular pillows, layered flat or leaning upright against the shams.
- **Accent Cushion:** One or two decorative lumbar cushions in contrasting colors or rich textures to anchor the bed's design.

---

## Ambience: Lighting and Scents

Finally, dress the environment:
- **Warm Lighting:** Use bedside lamps with soft, warm LED bulbs (2700K). Avoid harsh overhead ceiling lights.
- **Scenting:** Mist linen spray containing lavender or cedarwood oils lightly over sheets before bed to trigger relaxation.
    `
  },
  {
    slug: "cotton-vs-microfiber-understanding-bedding-fabrics",
    title: "Cotton vs. Microfiber: Understanding the Ultimate Bedding Fabric Debate",
    excerpt: "Struggling to choose? Compare cotton's natural breathability with microfiber's velvety warmth and anti-wrinkle properties.",
    category: "Fabric Guide",
    date: "June 15, 2026",
    readTime: "4 min read",
    featuredImage: "/images/comforters_category.jpg",
    author: {
      name: "Dr. Amit Roy",
      role: "Textile Researcher",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    tableOfContents: [
      { id: "cotton-pros-cons", text: "1. Cotton: The Natural Choice" },
      { id: "microfiber-pros-cons", text: "2. Microfiber: Synthetic Innovation" },
      { id: "head-to-head", text: "3. Head-to-Head Comparison" },
      { id: "verdict", text: "4. The Expert's Verdict" }
    ],
    content: `
## Cotton: The Natural Choice

Cotton is a natural fiber harvested from cotton plants, prized for thousands of years for its clothing qualities.
- **Pros:** Naturally breathable, moisture-wicking, hypoallergenic, and becomes softer with each wash.
- **Cons:** Tends to wrinkle easily and may experience minor shrinkage during initial laundering.

---

## Microfiber: Synthetic Innovation

Microfiber is made from ultra-fine synthetic polyester fibers, thinner than a strand of silk.
- **Pros:** Highly resistant to wrinkles and staining, extremely durable, budget-friendly, and lightweight.
- **Cons:** Less breathable than cotton, which may cause hot sleepers to sweat during warm humid nights.

---

## Head-to-Head Comparison

| Feature | Long-Staple Cotton | Premium Microfiber |
|---------|---------------------|--------------------|
| **Breathability** | High (Cool sleeping) | Moderate (Traps warm air) |
| **Durability** | High (Gets better) | Excellent (Wear-resistant) |
| **Maintenance** | Requires warm ironing | Wash & go (Wrinkle-free) |
| **Eco-Friendliness** | Biodegradable | Recyclable |

---

## The Expert's Verdict

Choose **cotton** if you sleep hot, have sensitive skin, or want a classic, crisp luxury feel. Choose **microfiber** (like our polar fleece blankets) for affordable, wrinkle-free ease and lightweight insulation in continuous air conditioning.
    `
  }
];
