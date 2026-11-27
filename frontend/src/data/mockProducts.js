export const MOCK_PRODUCTS = [
  // ==========================================
  // SAREES (Category: 'Saree' ONLY)
  // Subcategories: Muslin, Shuti, Silk, Handloom
  // ==========================================
  {
    id: 1,
    category: 'Saree',
    subcategory: 'Muslin',
    price: 24500,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'রক্তজবা — Roktojoba',
      en: 'Roktojoba — Dhakai Jamdani Muslin',
    },
    description: {
      bn: 'আসল ঢাকai জামদানি। সূক্ষ্ম ৩০০ কাউন্টের মসলিনে খাঁটি জরির প্রাচীন রক্তজবা মোটিফ ও কারিগরি। ঐতিহ্যবাহী তাঁতে পরম যত্নে বোনা রাজকীয় শাড়ি।',
      en: 'Featherlight authentic Dhakai Jamdani woven with supplementary weft crimson floral motifs in antique gold zari on 300-count sheer muslin.',
    },
    fabric: {
      bn: 'খাঁটি হাতে কাটা ঢাকাই মসলিন (৩০০ কাউন্ট)',
      en: 'Pure Handspun Dhakai Muslin Cotton (300 Count)',
    },
    weave: {
      bn: 'ঐতিহ্যবাহী ঢাকাই জামদানি হ্যান্ডলুম বুনন',
      en: 'Geometrical Supplementary Weft Jamdani',
    },
    care: {
      bn: 'শুধুমাত্র ড্রাই ওয়াশ। রোল করে সংরক্ষণ করুন।',
      en: 'Dry clean only. Roll gently on cardboard rolls to preserve zari motifs.',
    },
    tag: {
      bn: 'ঢাকাই মসলিন',
      en: 'Dhakai Muslin',
    },
  },
  {
    id: 2,
    category: 'Saree',
    subcategory: 'Shuti',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1583391733975-dd2d0865d8c3?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'নীলাম্বরী — Neelambori',
      en: 'Neelambori — Tangail Taant Shuti',
    },
    description: {
      bn: 'টাঙ্গাইলের ঐতিহ্যবাহী সুতি তাঁতের শাড়ি। আরামদায়ক জমিন, গাঢ় নীল ও অ্যান্টিক গোল্ড টেম্পল পাড় এবং সূক্ষ্ম বুটির শৈল্পিক কাজ।',
      en: 'Breathable, handspun pure Bengal cotton (Shuti) woven in Tangail. Features an understated indigo border with delicate temple buttis.',
    },
    fabric: {
      bn: '১০০% হাতে কাটা খাঁটি দেশি সুতি (১০০ কাউন্ট)',
      en: '100% Organic Handspun Bengal Cotton (100 Count)',
    },
    weave: {
      bn: 'টাঙ্গাইল পিটলুম তাঁত বুনন',
      en: 'Tangail Heritage Pitloom Taant',
    },
    care: {
      bn: 'ঠান্ডা পানিতে মৃদু সাবান দিয়ে ধোয়া অথবা ড্রাই ওয়াশ।',
      en: 'Gentle hand wash in cold water with mild detergent or dry clean.',
    },
    tag: {
      bn: 'খাঁটি সুতি',
      en: 'Pure Shuti',
    },
  },
  {
    id: 3,
    category: 'Saree',
    subcategory: 'Silk',
    price: 19500,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'মেঘডুম্বুর — Meghdumoor',
      en: 'Meghdumoor — Rajshahi Mulberry Silk',
    },
    description: {
      bn: 'রাজশাহীর খাঁটি তুঁত রেশম থেকে বোনা সিল্ক শাড়ি। প্রাচীন জরির সূক্ষ্ম নকশা ও আঁচলে মেঘডুম্বুর ঐতিহ্যবাহী কারুকাজ।',
      en: 'Lustrous, pure Mulberry silk loomed in Rajshahi. Hand-embellished with intricate floral jaal in fine antique golden resham and zari.',
    },
    fabric: {
      bn: '১০০% খাঁটি রাজশাহী তুঁত রেশম সিল্ক',
      en: '100% Pure Rajshahi Mulberry Silk',
    },
    weave: {
      bn: 'কারিগরি জ্যাকার্ড ব্রোকেড বুনন',
      en: 'Artisanal Jacquard Brocade Weave',
    },
    care: {
      bn: 'শুধুমাত্র ড্রাই ওয়াশ। সুতি কাপড়ে পেঁচিয়ে রাখুন।',
      en: 'Dry clean only. Store wrapped in unbleached muslin cloth.',
    },
    tag: {
      bn: 'রাজশাহী সিল্ক',
      en: 'Rajshahi Silk',
    },
  },
  {
    id: 4,
    category: 'Saree',
    subcategory: 'Handloom',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'হিমঝুরি — Himjhuri',
      en: 'Himjhuri — Phulia Cotton-Silk Handloom',
    },
    description: {
      bn: 'ফুলিয়ার ঐতিহ্যবাহী তাঁতে বোনা সুতি ও তসর সিল্কের সংমিশ্রণ। হালকা আইভরি জমিনে জ্যামিতিক কারুকাজ ও রুপোলি ছোঁয়া।',
      en: 'Handwoven in Phulia using a blend of fine combed cotton and soft tussar silk. Minimalist geometry on a warm ivory canvas.',
    },
    fabric: {
      bn: 'প্রিমিয়াম সুতি এবং তসর সিল্কের সংমিশ্রণ',
      en: 'Combed Cotton with Tussar Silk Warp',
    },
    weave: {
      bn: 'হ্যান্ডলুম ইন্টারলকিং তাঁত শিল্প',
      en: 'Supplementary Interlocking Handloom',
    },
    care: {
      bn: 'ড্রাই ক্লিন প্রযোজ্য।',
      en: 'Dry clean recommended to maintain crisp drape.',
    },
    tag: {
      bn: 'হেরিটেজ তাঁত',
      en: 'Heritage Weave',
    },
  },
  {
    id: 5,
    category: 'Saree',
    subcategory: 'Silk',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'রানিগোলাপ — Rani Golap',
      en: 'Rani Golap — Mirpur Katan Silk',
    },
    description: {
      bn: 'মিরপুরের ঐতিহ্যবাহী কারিগরদের বোনা বিয়ের কাতান শাড়ি। রানিগোলাপি জমিন ও আঁচলে মীনা ও খাঁটি জরির মনোমুগ্ধকর কারুকাজ।',
      en: 'Heirloom bridal drape from the historic weavers of Mirpur. Rich royal rose body interwoven with floral konia buttis and opulent zari pallu.',
    },
    fabric: {
      bn: 'ভারী খাঁটি কাতান সিল্ক',
      en: 'Heavyweight Pure Katan Silk',
    },
    weave: {
      bn: 'কাদোয়া ব্রোকেড হ্যান্ডলুম বুনন',
      en: 'Kadwa Brocade Handloom Weave',
    },
    care: {
      bn: 'কঠোরভাবে ড্রাই ওয়াশ।',
      en: 'Strictly dry clean only. Never spray perfume directly onto zari.',
    },
    tag: {
      bn: 'ব্রাইডাল কাতান',
      en: 'Bridal Katan',
    },
  },
  {
    id: 6,
    category: 'Saree',
    subcategory: 'Shuti',
    price: 5400,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'বনলতা — Bonalata',
      en: 'Bonalata — Begumpuri Textured Cotton',
    },
    description: {
      bn: 'বেগমপুরের বিখ্যাত খাঁটি সুতি শাড়ি। খাঁজকাটা টেম্পল পাড় ও আরামদায়ক নরম সুতোয় তৈরি, যা সারাদিন পরিধানের জন্য নিখুঁত।',
      en: 'Authentic Begumpuri weave featuring serrated temple borders and an airy weave ideal for the warm subcontinental climate.',
    },
    fabric: {
      bn: '১০০% দেশি নরম সুতি (৮০ কাউন্ট)',
      en: '100% Bengal Combed Cotton (80 Count)',
    },
    weave: {
      bn: 'বেগমপুরী ঐতিহ্যবাহী পিটলুম তাঁত',
      en: 'Begumpuri Pitloom Handloom',
    },
    care: {
      bn: 'ঠান্ডা পানিতে মৃদু সাবান দিয়ে ধোয়া।',
      en: 'Gentle hand wash with cold water.',
    },
    tag: {
      bn: 'কারিগর সুতি',
      en: 'Artisan Shuti',
    },
  },
  {
    id: 7,
    category: 'Saree',
    subcategory: 'Muslin',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'সাদা কাশফুল — Shada Kashphul',
      en: 'Shada Kashphul — Hand-Spun Khadi Muslin',
    },
    description: {
      bn: 'ন্যাচারাল আইভরি রঙের হাতে কাটা খাদি মসলিন। পরিমিত অলংকরণ ও ক্লাসি আভিজাত্যে বোনা আধুনিক শাড়ি।',
      en: 'Handspun Khadi muslin in natural raw ivory with delicate selvage accents. Modern tribute to historical Dhaka muslin with quiet minimalism.',
    },
    fabric: {
      bn: 'অরগানিক হাতে কাটা খাদি মসলিন',
      en: 'Organic Handspun Khadi Muslin',
    },
    weave: {
      bn: 'পালকের মতো হালকা হ্যান্ডলুম বুনন',
      en: 'Featherlight Handloom Muslin Weave',
    },
    care: {
      bn: 'ড্রাই ক্লিন অথবা ঠান্ডা পানিতে মৃদুভাবে ধোয়া।',
      en: 'Dry clean or cold wash by hand.',
    },
    tag: {
      bn: 'খাদি মসলিন',
      en: 'Khadi Muslin',
    },
  },
  {
    id: 8,
    category: 'Saree',
    subcategory: 'Silk',
    price: 26000,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'অনন্যা — Ananya',
      en: 'Ananya — Swarnachari Resham Silk',
    },
    description: {
      bn: 'বিশুদ্ধ রেশম সিল্কে স্বর্ণালী সুতোর চমৎকার আখ্যানে বোনা স্বর্ণচরী শাড়ি। বাংলার ঐতিহ্যবাহী চিত্রকলার জীবন্ত প্রতিচ্ছবি।',
      en: 'Historical Swarnachari narrative drape displaying royal court chronicles woven with gilded golden resham thread on pure mulberry silk.',
    },
    fabric: {
      bn: 'বিশুদ্ধ রেশম সিল্ক',
      en: 'Pure Murshidabad Mulberry Silk',
    },
    weave: {
      bn: 'স্বর্ণচরী সাপ্লিমেন্টারি ওয়েফ্ট বুনন',
      en: 'Supplementary Weft Swarnachari Tapestry',
    },
    care: {
      bn: 'শুধুমাত্র ড্রাই ওয়াশ।',
      en: 'Dry clean only.',
    },
    tag: {
      bn: 'স্বর্ণচরী সিল্ক',
      en: 'Swarnachari',
    },
  },

  // ==========================================
  // BLOUSES (Category: 'Blouse' ONLY)
  // Sizing: 34, 36, 38, 40, 42
  // ==========================================
  {
    id: 9,
    category: 'Blouse',
    subcategory: null,
    price: 6800,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'চন্দ্রাবলী — Chondraboli',
      en: 'Chondraboli — Raw Silk Zardozi Blouse',
    },
    description: {
      bn: 'আইভরি রঙের খাঁটি র সিল্কে তৈরি মিষ্টি গলার ব্লাউজ। প্রাচীন সোনালী জারদৌসি, ফ্রেঞ্চ নট এবং পিঠের নান্দনিক ডোরি সংবলিত।',
      en: 'Handcrafted sweetheart neckline blouse tailored from pure vintage ivory raw silk with antique gold zardozi and back tie dori.',
    },
    fabric: {
      bn: 'খাঁটি র সিল্ক এবং নরম সুতি লাইনিং',
      en: 'Pure Raw Silk with Soft Cotton Lining',
    },
    weave: {
      bn: 'হাতে কাটা বেসপোক সেলাই ও জারদৌসি কারুকাজ',
      en: 'Hand-Cut Bespoke Atelier Stitching',
    },
    care: {
      bn: 'শুধুমাত্র ড্রাই ওয়াশ।',
      en: 'Dry clean only.',
    },
    tag: {
      bn: 'বেসপোক ব্লাউজ',
      en: 'Bespoke Blouse',
    },
  },
  {
    id: 10,
    category: 'Blouse',
    subcategory: null,
    price: 7500,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'অনুরাধা — Anuradha',
      en: 'Anuradha — Crimson Velvet Bridal Blouse',
    },
    description: {
      bn: 'গাঢ় মেরুন রঙের নরম ভেলভেটে সোনালী দাবকা, কাটদানা এবং মুক্তার চোখধাঁধানো কারুকাজ। বিয়ের সাজের জন্য আদর্শ।',
      en: 'Deep crimson velvet blouse with dabka, cutdana, and seed pearl needlework along the sleeves and neckline for regal bridal pairings.',
    },
    fabric: {
      bn: 'সিল্ক মাইক্রো-ভেলভেট ও সাটিন ফিনিশ',
      en: 'Pure Silk Micro-Velvet with Satin Finish',
    },
    weave: {
      bn: 'নিখুঁত হাতের জারদৌসি এমব্রয়ডারি',
      en: 'Intricate Hand Zardozi Embroidery',
    },
    care: {
      bn: 'শুধুমাত্র ড্রাই ওয়াশ। সিল্ক পেপারে সংরক্ষণ করুন।',
      en: 'Dry clean only. Store wrapped in silk paper.',
    },
    tag: {
      bn: 'ব্রাইডাল ভেলভেট',
      en: 'Bridal Velvet',
    },
  },
  {
    id: 11,
    category: 'Blouse',
    subcategory: null,
    price: 3800,
    image: 'https://images.unsplash.com/photo-1583391733975-dd2d0865d8c3?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'মায়াবিনী — Mayabini',
      en: 'Mayabini — Kalamkari Cutwork Cotton Blouse',
    },
    description: {
      bn: 'প্রাকৃতিক রঙে রঞ্জিত কলমকারি সুতির ব্লাউজ। লেইস বর্ডার ও নান্দনিক কাঠের বোতাম সংবলিত আরামদায়ক পোশাক।',
      en: 'Natural vegetable-dyed Kalamkari cotton blouse featuring subtle cutwork lace borders and vintage wooden buttons.',
    },
    fabric: {
      bn: '১০০% অরগানিক আরামদায়ক সুতি',
      en: '100% Breathable Organic Cotton',
    },
    weave: {
      bn: 'হ্যান্ড-ব্লক প্রিন্ট ও সূক্ষ্ম কাটওয়ার্ক',
      en: 'Hand-Block Print with Needle Cutwork',
    },
    care: {
      bn: 'ঠান্ডা পানিতে আলতো করে ধোয়া।',
      en: 'Gentle hand wash in cold water.',
    },
    tag: {
      bn: 'কলমকারি কটন',
      en: 'Kalamkari Cotton',
    },
  },
  {
    id: 12,
    category: 'Blouse',
    subcategory: null,
    price: 5200,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'কাদম্বরী — Kadambari',
      en: 'Kadambari — Ivory Jamdani Woven Blouse',
    },
    description: {
      bn: 'আসল ঢাকাই জামদানি কাপড়ে তৈরি হাই-নেক ব্লাউজ। জমিনে সোনালী ফ্লোরাল জাল ও সূক্ষ্ম ফিনিশিং।',
      en: 'Tailored from genuine hand-loomed Jamdani textile with gold floral jaal and a minimalist high-neck cut.',
    },
    fabric: {
      bn: 'হ্যান্ডলুম জামদানি সুতি-সিল্ক',
      en: 'Handloom Jamdani Cotton-Silk',
    },
    weave: {
      bn: 'ঐতিহ্যবাহী জামদানি বুনন',
      en: 'Traditional Supplementary Weft',
    },
    care: {
      bn: 'ড্রাই ওয়াশ।',
      en: 'Dry clean only.',
    },
    tag: {
      bn: 'জামদানি ব্লাউজ',
      en: 'Jamdani Atelier',
    },
  },

  // ==========================================
  // KURTIS (Category: 'Kurti' ONLY)
  // Sizing: 34, 36, 38, 40, 42
  // ==========================================
  {
    id: 13,
    category: 'Kurti',
    subcategory: null,
    price: 6500,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'শ্রাবণী — Shraboni',
      en: 'Shraboni — Tussar Silk Embroidered Kurti',
    },
    description: {
      bn: 'খাঁটি তসর সিল্কের লম্বা কুর্তি। বক্ষে সূক্ষ্ম রেশম সুতোর নকশিকাঁথা স্টিচ এবং মাদার-অব-পার্ল বোতাম সংবলিত অনন্য আভিজাত্য।',
      en: 'Handspun natural golden Tussar silk tunic adorned with minimalist Kantha and resham thread needlework.',
    },
    fabric: {
      bn: '১০০% হাতে কাটা খাঁটি তসর সিল্ক',
      en: '100% Handspun Natural Tussar Silk',
    },
    weave: {
      bn: 'হ্যান্ডলুম তসর ও নিখুঁত কাঁথাস্টিচ',
      en: 'Handloom Tussar with Artisan Kantha Work',
    },
    care: {
      bn: 'ড্রাই ওয়াশ।',
      en: 'Dry clean only.',
    },
    tag: {
      bn: 'তসর সিল্ক',
      en: 'Tussar Silk',
    },
  },
  {
    id: 14,
    category: 'Kurti',
    subcategory: null,
    price: 3600,
    image: 'https://images.unsplash.com/photo-1583391733975-dd2d0865d8c3?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'বসন্তবাহার — Boshonto Bahar',
      en: 'Boshonto Bahar — Mulmul Cotton Kurti',
    },
    description: {
      bn: 'প্রাকৃতিক রঙে ব্লকে ছাপানো মলমল সুতি কুর্তি। মার্জিত ম্যান্ডারিন কলার ও আরামদায়ক কাটিং যা গ্রীষ্মের জন্য নিখুঁত।',
      en: 'Breathable Mulmul cotton tunic printed with heritage vegetable dyes. Features a clean mandarin collar and three-quarter sleeves.',
    },
    fabric: {
      bn: '১০০% নরম মলমল সুতি',
      en: '100% Breathable Mulmul Cotton',
    },
    weave: {
      bn: 'কাঠের ব্লকে হাতে ছাপানো কারুশিল্প',
      en: 'Hand-Block Wooden Stamp Artisan Craft',
    },
    care: {
      bn: 'ঠান্ডা পানিতে মৃদুভাবে ধোয়া।',
      en: 'Gentle machine wash with cold water.',
    },
    tag: {
      bn: 'মলমল কটন',
      en: 'Mulmul Cotton',
    },
  },
  {
    id: 15,
    category: 'Kurti',
    subcategory: null,
    price: 5800,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'কুঞ্জলতা — Kunjolata',
      en: 'Kunjolata — Chanderi Silk Festive Kurti',
    },
    description: {
      bn: 'আইভরি রঙের চান্দেরি সুতি-সিল্ক কুর্তি। জামার বুকে অ্যান্টিক গোল্ড জরির পাইপিং ও কাফে সূক্ষ্ম ফিনিশিং।',
      en: 'Lustrous Chanderi cotton-silk tunic in soft ivory. Accented with subtle antique gold zari piping along the placket and cuffs.',
    },
    fabric: {
      bn: 'চান্দেরি সুতি-সিল্ক ও মলমল লাইনিং',
      en: 'Chanderi Cotton-Silk with Mulmul Lining',
    },
    weave: {
      bn: 'নিখুঁত বুটিক কাটিং ও সেলাই',
      en: 'Hand-tailored Designer Cut',
    },
    care: {
      bn: 'মৃদু ড্রাই ক্লিন।',
      en: 'Gentle dry clean.',
    },
    tag: {
      bn: 'উৎসব কুর্তি',
      en: 'Festive Kurti',
    },
  },
  {
    id: 16,
    category: 'Kurti',
    subcategory: null,
    price: 4200,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'নীলকমল — Neel Komol',
      en: 'Neel Komol — Handloom Khadi Kurti',
    },
    description: {
      bn: 'খাঁটি নীল রঙে রঞ্জিত দেশি খাদি কুর্তি। সোজা মার্জিত কাটিং এবং আরামের জন্য লুকায়িত সাইড পকেট।',
      en: 'Handwoven indigenous Bengal Khadi dyed in pure natural indigo. Tailored in an effortless straight silhouette with concealed side pockets.',
    },
    fabric: {
      bn: '১০০% হাতে কাটা দেশি খাদি',
      en: '100% Hand-Spun Bengal Khadi',
    },
    weave: {
      bn: 'ঐতিহ্যবাহী তাঁতের টেক্সচার্ড বুনন',
      en: 'Handloom Pitloom Texture',
    },
    care: {
      bn: 'আলাদাভাবে ঠান্ডা পানিতে ধুয়ে ছায়ায় শুকান।',
      en: 'Wash separately in cold water with mild soap.',
    },
    tag: {
      bn: 'ন্যাচারাল খাদি',
      en: 'Natural Khadi',
    },
  },

  // ==========================================
  // STOLES & DUPATTAS (Category: 'Stole' ONLY)
  // Drape length: 2.25m
  // ==========================================
  {
    id: 17,
    category: 'Stole',
    subcategory: null,
    price: 2450,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'অরুন্ধতী — Arundhati',
      en: 'Arundhati — Handloom Tussar Silk Stole',
    },
    description: {
      bn: 'খাঁটি দেশি তসর সিল্কে বোনা প্রিমিয়াম ওড়না। দুই প্রান্তে সোনালী জরির স্ট্রাইপ এবং হাতে বাঁধা ট্যাসেল সংবলিত আভিজাত্য।',
      en: 'Handwoven pure Tussar silk stole featuring antique gold zari edge stripes and hand-tied artisanal tassels.',
    },
    fabric: {
      bn: '১০০% প্রাকৃতিক তসর সিল্ক',
      en: '100% Natural Tussar Silk',
    },
    weave: {
      bn: 'ঐতিহ্যবাহী পিটলুম বুনন',
      en: 'Artisan Pitloom Weave',
    },
    care: {
      bn: 'ড্রাই ক্লিন।',
      en: 'Dry clean only.',
    },
    tag: {
      bn: 'তসর স্টোল',
      en: 'Tussar Stole',
    },
  },
  {
    id: 18,
    category: 'Stole',
    subcategory: null,
    price: 1950,
    image: 'https://images.unsplash.com/photo-1583391733975-dd2d0865d8c3?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'সূর্যমুখী — Shurjomukhi',
      en: 'Shurjomukhi — Kantha Stitched Chanderi Stole',
    },
    description: {
      bn: 'হালকা হলুদ ও আইভরি চান্দেরি কাপড়ে বোনা ওড়না। গ্রামীণ শিল্পীদের হাতে করা সূক্ষ্ম নকশিকাঁথা স্টিচ ও নরম টেক্সচার।',
      en: 'Lightweight Chanderi cotton-silk stole embellished with hand-stitched Kantha embroidery inspired by autumnal blooms.',
    },
    fabric: {
      bn: 'চান্দেরি কটন-সিল্ক',
      en: 'Chanderi Cotton-Silk',
    },
    weave: {
      bn: 'হ্যান্ডক্রাফটেড কাঁথাস্টিচ',
      en: 'Handcrafted Kantha Needlework',
    },
    care: {
      bn: 'ঠান্ডা পানিতে মৃদু হাতে ধোয়া।',
      en: 'Gentle hand wash in cold water.',
    },
    tag: {
      bn: 'নকশিকাঁথা',
      en: 'Kantha Stole',
    },
  },
  {
    id: 19,
    category: 'Stole',
    subcategory: null,
    price: 3200,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    title: {
      bn: 'শিশিরবিন্দু — Shishir Bindu',
      en: 'Shishir Bindu — Dhakai Jamdani Muslin Stole',
    },
    description: {
      bn: 'আসল ঢাকাই মসলিনের উপর জামদানি বুটি তোলা রাজকীয় স্টোল। যেকোনো কুর্তি বা পোশাকের সাথে পরার মতো অনন্য সংযোজন।',
      en: 'Pure Dhakai muslin sheer stole adorned with delicate Jamdani floral buttis in antique gold thread.',
    },
    fabric: {
      bn: 'খাঁটি ঢাকাই মসলিন কটন',
      en: 'Pure Dhakai Muslin Cotton',
    },
    weave: {
      bn: 'ঢাকাই জামদানি জ্যামিতিক বুনন',
      en: 'Authentic Jamdani Loom',
    },
    care: {
      bn: 'শুধুমাত্র ড্রাই ওয়াশ।',
      en: 'Dry clean only.',
    },
    tag: {
      bn: 'মসলিন স্টোল',
      en: 'Muslin Stole',
    },
  },
];
