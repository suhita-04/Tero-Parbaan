import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Brand Identity
    brand_name: 'Tero Parbaan',
    brand_subtitle: 'Dhaka Boutique Gallery',
    tagline: 'Twelve months, thirteen splendors — sweet fragrance in every saree fold!',
    tagline_bengali: 'বারো মাসের, তেরো সাজে — মিষ্টি সুবাস শাড়ির ভাঁজে!',
    announcement: 'Dhaka Boutique Showroom • Nationwide Delivery • Cash on Delivery',
    announcement_showroom: 'Dhaka Boutique Showroom • Nationwide Delivery',

    // Navigation
    nav_home: 'Home',
    nav_category: 'Category',
    nav_sarees: 'Saree',
    nav_kurtis: 'Kurti',
    nav_blouses: 'Blouse',
    nav_stoles: 'Stoles',
    nav_collection: 'All',
    nav_about: 'About',
    nav_about_us: 'About Us',
    nav_founder: 'Founder',
    nav_reviews: 'Reviews',
    nav_reviews_full: 'Customer Reviews',
    nav_contact_us: 'Contact Us',
    nav_bag: 'Bag',
    search_dresses: 'Search dresses...',

    // Customer Auth Portal
    auth_portal_title: 'Boutique Customer Portal',
    auth_tab_login: 'Sign In',
    auth_tab_register: 'Create Account',
    auth_label_identifier: 'Email or Mobile Number',
    auth_placeholder_identifier: 'e.g. 01712-345678 or user@domain.com',
    auth_label_password: 'Password',
    auth_placeholder_password: '••••••••',
    auth_label_name: 'Full Name',
    auth_placeholder_name: 'e.g. Samira Rahman',
    auth_btn_submit_login: 'Sign In',
    auth_btn_submit_register: 'Create Account',
    auth_demo_btn: 'Demo Login (Samira Rahman)',
    auth_welcome_patron: 'Welcome back,',
    auth_patron_badge: 'Valued Patron • Dhaka',
    auth_member_since: 'Member of Tero Parbaan Family',
    auth_btn_logout: 'Sign Out',
    auth_btn_shop: 'Browse Sarees',

    // Categories
    cat_all: 'All',
    cat_saree: 'Saree',
    cat_sarees: 'Saree',
    cat_kurti: 'Kurti',
    cat_kurtis: 'Kurti',
    cat_blouse: 'Blouse',
    cat_blouses: 'Blouse',
    cat_stole: 'Stoles',
    cat_stoles: 'Stoles',

    // Saree Subcategories
    sub_all: 'All Sarees',
    sub_shuti: 'Shuti',
    sub_handloom: 'Handloom',
    sub_muslin: 'Muslin',
    sub_silk: 'Silk',
    sub_weave_type: 'Weave Type:',

    // Hero Section
    hero_eyebrow: 'Dhaka Ethnic Boutique',
    hero_title_line1: 'Elegance in',
    hero_title_line2: 'Every Thread',
    hero_desc: 'Authentic handloom sarees, bespoke blouses, fine kurtis, and artisanal stoles curated with high-whitespace minimalism.',
    hero_cta_shop: 'Explore Collection',
    hero_cta_sarees: 'Explore Sarees',
    hero_badge1_val: '100%',
    hero_badge1_lbl: 'Pure Handloom',
    hero_badge2_val: 'Bespoke',
    hero_badge2_lbl: 'Dhaka Atelier',
    hero_badge3_val: 'COD',
    hero_badge3_lbl: 'Nationwide',
    hero_watermark: 'Dhaka Gallery Edit • 2026',

    // Home Section
    home_signatures_eyebrow: 'Curated Editions',
    home_signatures_title: 'Boutique Gallery',
    home_signatures_desc: 'Explore our master artisans\' limited creations. Hand-draped sarees, tailored cuts, and heirloom weaves.',
    home_explore_all: 'View All Collections',
    home_quote: 'We believe luxury is woven with patience, preserving Bengal\'s textile legacy through timeless silhouettes and uncompromised craftsmanship.',
    home_quote_author: '— Tero Parbaan Atelier, Dhaka —',

    // Search
    search_placeholder: 'Search by title, weave, or fabric...',
    search_title: 'Search Catalog',
    search_close: 'Close',
    search_no_results: 'No matching garments found.',

    // Product Card & Listing
    card_add_to_bag: 'View Garment',
    card_view_details: 'View Details',
    showing_items: 'Showing',
    handcrafted_designs: 'pieces',
    atelier_collection: 'The Gallery Collection',
    no_items_found: 'No handcrafted items found in this collection.',

    // Product Detail
    pdp_breadcrumb_home: 'Home',
    pdp_breadcrumb_shop: 'Collections',
    pdp_atelier_tag: 'Tero Parbaan Atelier',
    pdp_select_size: 'Select Size (Bust)',
    pdp_size_guide: 'Size & Fit Guide',
    pdp_saree_dimensions: 'Drape Dimensions:',
    pdp_saree_dimensions_text: 'Standard 5.5 Meter Drape with unstitched matching blouse piece (0.8m).',
    pdp_stole_dimensions: 'Stole Dimensions:',
    pdp_stole_dimensions_text: 'Standard 2.25 Meter Length x 36 Inch Width artisanal dupatta/stole drape.',
    pdp_quantity: 'Quantity',
    pdp_add_to_bag: 'Add to Shopping Bag',
    pdp_added_success: 'Added to Bag ✓',
    pdp_free_size: 'Free Size',
    pdp_fabric_label: 'Fabric & Composition',
    pdp_weave_label: 'Artisanal Weave Technique',
    pdp_care_label: 'Heritage Care Instructions',
    pdp_shipping_badge: 'Cash on Delivery • Nationwide',
    pdp_shipping_desc: '2-3 business days inside Dhaka (৳80), 3-5 days outside Dhaka (৳150). Try upon delivery available.',
    pdp_heritage_badge: 'Artisan Authenticity Guarantee',
    pdp_heritage_desc: 'Sourced directly from generational weaving guilds across Tangail, Narayanganj, and Rajshahi.',

    // Cart Drawer & Page
    cart_title: 'Shopping Bag',
    cart_item_single: 'Piece',
    cart_item_plural: 'Pieces',
    cart_empty_title: 'Your bag is empty',
    cart_empty_desc: 'Explore our handloom sarees, bespoke blouses, kurtis, and stoles.',
    cart_continue_browsing: 'Continue Browsing',
    cart_subtotal: 'Subtotal',
    cart_shipping_note: 'Nationwide Cash on Delivery • Delivery fee calculated at checkout.',
    cart_proceed_checkout: 'Proceed to Checkout',
    cart_remove: 'Remove',
    cart_quantity: 'Qty',
    cart_view_bag: 'View Bag',

    // Checkout
    checkout_title: 'Boutique Checkout',
    checkout_subtitle: 'Nationwide Cash on Delivery (COD)',
    checkout_breadcrumb_home: 'Home',
    checkout_breadcrumb_bag: 'Bag',
    checkout_breadcrumb_checkout: 'Checkout',
    checkout_delivery_title: '1. Delivery Details',
    checkout_name_label: 'Full Name',
    checkout_name_placeholder: 'e.g. Samira Rahman',
    checkout_phone_label: 'Phone Number (Bangladeshi)',
    checkout_phone_placeholder: 'e.g. 01712-345678',
    checkout_address_label: 'Delivery Address',
    checkout_address_placeholder: 'Apartment, House, Road, Area (e.g. House 14, Road 7, Banani, Dhaka)',
    checkout_city_label: 'Delivery Zone',
    checkout_city_dhaka: 'Inside Dhaka (৳80 delivery)',
    checkout_city_outside: 'Outside Dhaka / Nationwide (৳150 delivery)',
    checkout_notes_label: 'Special Notes (Optional)',
    checkout_notes_placeholder: 'Special delivery instructions or gate code...',
    checkout_payment_title: '2. Payment Method',
    checkout_cod_title: 'Cash on Delivery (COD)',
    checkout_cod_desc: 'Inspect your handcrafted garment upon delivery and pay cash directly to the courier.',
    checkout_order_summary: 'Order Summary',
    checkout_item_total: 'Items Total',
    checkout_delivery_fee: 'Delivery Fee',
    checkout_grand_total: 'Total Payable',
    checkout_submit_btn: 'Place Cash on Delivery Order',
    checkout_guarantee_text: 'By placing this order, you agree to our heritage return & exchange policy.',

    // Order Confirmed
    order_success_eyebrow: 'Order Confirmed',
    order_success_title: 'Thank You,',
    order_reference: 'Order Reference:',
    order_success_desc: 'Your bespoke parcel is being prepared at our Dhaka atelier. We will contact you before dispatch.',
    order_payment_mode: 'Payment Mode',
    order_delivery_zone: 'Delivery Zone',
    order_delivery_address: 'Delivery Address',
    order_items_recap: 'Selected Pieces',
    order_total_amount: 'Total Amount (COD)',
    order_return_home: 'Return to Gallery',
    order_continue_shop: 'Explore More Pieces',

    // Footer & Social
    footer_philosophy: 'Bespoke ethnic luxury celebrating Bengal\'s timeless textile heritage. Handwoven Jamdani sarees, tailored zardozi blouses, fine kurtis, and artisanal stoles.',
    footer_locations: 'Dhaka, Bangladesh • Worldwide Shipping',
    footer_col_title: 'Collections',
    footer_service_title: 'Customer Care',
    footer_instagram: '@tero_parbon3',
    footer_follow_insta: 'Follow on Instagram',
    footer_guide_size: 'Size & Drape Guide',
    footer_guide_cod: 'Cash on Delivery & Shipping',
    footer_guide_care: 'Textile Care Instructions',
    footer_guide_appointment: 'Private Showroom Appointments',
    footer_copyright: 'All rights reserved.',
    footer_motto: 'Dhaka Boutique Gallery • Authentic Heritage',

    // About Page (Editorial Magazine Layout)
    about_eyebrow: 'Boutique Chronicle & Heritage',
    about_title: 'The Spirit of Tero Parbaan',
    about_subtitle: 'A Dhaka-born atelier honoring the art of slow fashion, heirloom handlooms, and Bengal\'s cherished celebrations.',
    about_sec1_tag: 'Chapter I • Foundations',
    about_sec1_title: 'Our Story & Promise',
    about_sec1_p1: 'Tero Parbaan was conceived in the vibrant heart of Dhaka with a single, heartfelt conviction: Bengal\'s textile heritage is not merely nostalgic history—it is a living, breathing art form meant to be worn, celebrated, and cherished in modern everyday life.',
    about_sec1_p2: 'Named after the timeless Bengali adage "Baro Maashe Tero Parbon" (twelve months, thirteen celebrations), we curate pieces that celebrate life\'s intimate rituals. Our promise to our patrons is uncompromised quality, timeless grace, and a deep, respectful connection with indigenous artisan communities.',
    about_sec2_tag: 'Chapter II • Artisanal Integrity',
    about_sec2_title: 'Authenticity & Craftsmanship',
    about_sec2_p1: 'In a world dominated by mass factory production, we consciously choose the slow, human rhythm of wooden pitlooms and generational needlecraft. From the 300-count gossamer Dhakai Muslins to the resilient Tangail Taant cottons, every fiber undergoes meticulous evaluation.',
    about_sec2_p2: 'We collaborate directly with master weavers across Tangail, Narayanganj, Rajshahi, and Phulia. Every drape features genuine zari, pure silk warps, and organic cottons dyed with natural pigments—ensuring your heirloom piece lasts generations.',
    about_sec3_tag: 'Chapter III • Sourcing to Doorstep',
    about_sec3_title: 'How We Work: Atelier to Doorstep',
    about_sec3_p1: 'Our process is personal, transparent, and meticulously quality-checked. We begin by traveling to rural weaving clusters, hand-selecting limited-edition weaves that align with our minimalist aesthetic.',
    about_sec3_p2: 'Each piece arrives at our Dhaka showroom for finishing, lint removal, and gentle packaging with anti-moisture muslin wrap. Through our nationwide Cash on Delivery service, you inspect and fall in love with the fabric before paying a single Taka.',
    about_quote: '“We do not just sell sarees; we preserve the tactile poetry of Bengal.”',
    about_cta_btn: 'Explore Our Curated Collections',

    // Founder Page (The Creator\'s Story)
    founder_eyebrow: 'Meet the Creator',
    founder_title: 'The Woman Behind Tero Parbaan',
    founder_subtitle: 'A passion for Bengali weaves, an eye for understated grace, and a thriving community of 45K+ handloom lovers.',
    founder_quote: '“A saree is not simply six yards of fabric; it is an emotion that connects a woman to her roots, her pride, and her most cherished memories.”',
    founder_author: '— Founder & Creative Director, Tero Parbaan',
    founder_sec1_tag: 'Origins & Vision',
    founder_sec1_title: 'How She Started Tero Parbaan',
    founder_sec1_desc: 'Driven by an innate love for authentic sarees from an early age, our founder noticed a growing gap in the market: either traditional drapes were overly commercialized or authentic handloom sarees were difficult for everyday women to access with trust. Armed with an eye for subtle colors and pure fabrics, she started Tero Parbaan from a small room in Dhaka, personally visiting weaving villages and handpicking each piece with affection.',
    founder_sec2_tag: 'Growing the Community',
    founder_sec2_title: 'The Journey So Far: 45K+ Family',
    founder_sec2_desc: 'What started as a quiet dream soon blossomed through genuine word-of-mouth. Today, Tero Parbaan is embraced by a vibrant online family of over 45,000+ patrons and saree enthusiasts across Bangladesh and abroad. Every video, drape guide, and genuine customer interaction is handled with personal warmth, creating a trusted sanctuary for ethnic fashion.',
    founder_sec3_tag: 'The Daily Rhythm',
    founder_sec3_title: 'Every Step Forward: Everyday Dedication',
    founder_sec3_desc: 'From dawn fabric inspections to late-night customer chats, she remains personally involved in every dimension of the brand. Her mission continues: to bring affordable luxury, authentic handloom heritage, and effortless elegance into the wardrobe of every woman, one drape at a time.',
    founder_stats_community: '45,000+ Community Members',
    founder_stats_artisans: '120+ Generational Artisans',
    founder_stats_cities: '64 Districts Nationwide',
    founder_cta_btn: 'Browse Her Handpicked Pieces',

    // Reviews Page
    reviews_eyebrow: 'Patron Stories & Gratitude',
    reviews_title: 'Loved by Handloom Patrons',
    reviews_subtitle: 'Real stories, customer photos, and heartfelt feedback from women across Bangladesh who celebrate life in Tero Parbaan.',
    reviews_filter_all: 'All',
    reviews_filter_photos: 'Customer Photos',
    reviews_filter_screenshots: 'Screenshots',
    reviews_filter_written: 'Written Reviews',
    reviews_verified: 'Verified Review',
    reviews_purchased: 'Purchased:',
    reviews_click_zoom: 'Click to zoom',
    reviews_all_five_stars: '5.0 Star Rating • Nationwide Trust',
    reviews_showing: 'Showing',
    reviews_entries: 'patron reviews',

    // WhatsApp
    whatsapp_inquire: 'WhatsApp Inquiry',
    whatsapp_tooltip: 'Inquire directly with Dhaka Atelier',
  },

  bn: {
    // Brand Identity
    brand_name: 'তেরোপার্বণ',
    brand_subtitle: 'ঢাকা বুটিক ও শাড়ি গ্যালারি',
    tagline: 'বারো মাসের, তেরো সাজে — মিষ্টি সুবাস শাড়ির ভাঁজে!',
    tagline_bengali: 'বারো মাসের, তেরো সাজে — মিষ্টি সুবাস শাড়ির ভাঁজে!',
    announcement: 'ঢাকা বুটিক শোরুম • দেশব্যাপী ক্যাশ অন ডেলিভারি সুবিধা',
    announcement_showroom: 'ঢাকা বুটিক শোরুম • দেশব্যাপী ডেলিভারি',

    // Navigation
    nav_home: 'হোম',
    nav_category: 'ক্যাটাগরি',
    nav_sarees: 'শাড়ি',
    nav_kurtis: 'কুর্তি',
    nav_blouses: 'ব্লাউজ',
    nav_stoles: 'স্টোল',
    nav_collection: 'সব',
    nav_about: 'আমাদের সম্পর্কে',
    nav_about_us: 'আমাদের সম্পর্কে',
    nav_founder: 'উদ্যোক্তার গল্প',
    nav_reviews: 'ক্রেতাদের মতামত',
    nav_reviews_full: 'ক্রেতাদের মতামত',
    nav_contact_us: 'যোগাযোগ',
    nav_bag: 'ব্যাগ',
    search_dresses: 'পোশাক খুঁজুন...',

    // Customer Auth Portal
    auth_portal_title: 'গ্রাহক সেবা ও পোর্টাল',
    auth_tab_login: 'লগইন',
    auth_tab_register: 'নতুন অ্যাকাউন্ট',
    auth_label_identifier: 'ইমেইল অথবা মোবাইল নম্বর',
    auth_placeholder_identifier: 'যেমন: ০১৭১২-৩৪৫৬৭৮ বা user@domain.com',
    auth_label_password: 'পাসওয়ার্ড',
    auth_placeholder_password: '••••••••',
    auth_label_name: 'পূর্ণ নাম',
    auth_placeholder_name: 'যেমন: সামিরা রহমান',
    auth_btn_submit_login: 'লগইন করুন',
    auth_btn_submit_register: 'অ্যাকাউন্ট তৈরি করুন',
    auth_demo_btn: 'ডেমো লগইন (সামিরা রহমান)',
    auth_welcome_patron: 'স্বাগতম,',
    auth_patron_badge: 'সম্মানিত ক্রেতা • ঢাকা',
    auth_member_since: 'তেরোপার্বণ পরিবারের সদস্য',
    auth_btn_logout: 'সাইন আউট',
    auth_btn_shop: 'শাড়ি কালেকশন দেখুন',

    // Categories
    cat_all: 'সব',
    cat_saree: 'শাড়ি',
    cat_sarees: 'শাড়ি',
    cat_kurti: 'কুর্তি',
    cat_kurtis: 'কুর্তি',
    cat_blouse: 'ব্লাউজ',
    cat_blouses: 'ব্লাউজ',
    cat_stole: 'স্টোল ও ওড়না',
    cat_stoles: 'স্টোল ও ওড়না',

    // Saree Subcategories
    sub_all: 'সকল শাড়ি',
    sub_shuti: 'সুতি',
    sub_handloom: 'হ্যান্ডলুম',
    sub_muslin: 'মসলিন',
    sub_silk: 'সিল্ক',
    sub_weave_type: 'বুননের ধরন:',

    // Hero Section
    hero_eyebrow: 'ঢাকার খাঁটি বুটিক ঐতিহ্য',
    hero_title_line1: 'বারো মাসের, তেরো সাজে',
    hero_title_line2: 'মিষ্টি সুবাস শাড়ির ভাঁজে!',
    hero_desc: 'আসল ঢাকাই জামদানি শাড়ি, নিখুঁত কারুকাজের ব্লাউজ, আরামদায়ক কুর্তি ও হ্যান্ডলুম স্টোলের পরিচ্ছন্ন সমাহার।',
    hero_cta_shop: 'কালেকশন দেখুন',
    hero_cta_sarees: 'শাড়ি সম্ভার',
    hero_badge1_val: '১০০%',
    hero_badge1_lbl: 'খাঁটি তাঁত',
    hero_badge2_val: 'স্বতন্ত্র',
    hero_badge2_lbl: 'ঢাকা অ্যাটেলিয়ার',
    hero_badge3_val: 'সিওডি',
    hero_badge3_lbl: 'দেশব্যাপী',
    hero_watermark: 'ঢাকা গ্যালারি এডিশন • ২০২৬',

    // Home Section
    home_signatures_eyebrow: 'অনন্য সংস্করণ',
    home_signatures_title: 'বুটিক গ্যালারি',
    home_signatures_desc: 'আমাদের অভিজ্ঞ কারিগরদের সীমিত সংস্করণ। প্রতিটি পোশাকে জড়িয়ে আছে শত বছরের বাঙালি ঐতিহ্য ও শৈল্পিক কারুকাজ।',
    home_explore_all: 'সকল কালেকশন দেখুন',
    home_quote: 'আমরা বিশ্বাস করি—প্রকৃত আভিজাত্য সৃষ্টি হয় নিষ্ঠা আর ধৈর্যে, যা অপরিবর্তনীয় কারুশিল্প ও ঐতিহ্যের মেলবন্ধনে চিরন্তন।',
    home_quote_author: '— তেরোপার্বণ অ্যাটেলিয়ার, ঢাকা —',

    // Search
    search_placeholder: 'নাম, বুনন বা কাপড় দিয়ে খুঁজুন...',
    search_title: 'অনুসন্ধান',
    search_close: 'বন্ধ করুন',
    search_no_results: 'এই নামে কোনো পোশাক পাওয়া যায়নি।',

    // Product Card & Listing
    card_add_to_bag: 'বিস্তারিত দেখুন',
    card_view_details: 'বিস্তারিত দেখুন',
    showing_items: 'দেখাচ্ছে',
    handcrafted_designs: 'টি পোশাক',
    atelier_collection: 'গ্যালারি কালেকশন',
    no_items_found: 'এই বিভাগে বর্তমানে কোনো পোশাক পাওয়া যায়নি।',

    // Product Detail
    pdp_breadcrumb_home: 'হোম',
    pdp_breadcrumb_shop: 'কালেকশন',
    pdp_atelier_tag: 'তেরোপার্বণ অ্যাটেলিয়ার',
    pdp_select_size: 'সাইজ নির্বাচন করুন (বুকের মাপ)',
    pdp_size_guide: 'সাইজ ও পরিমাপ সহায়িকা',
    pdp_saree_dimensions: 'শাড়ির বহর ও মাপ:',
    pdp_saree_dimensions_text: 'স্ট্যান্ডার্ড ৫.৫ মিটার বহর এবং সাথে ম্যাচিং আনস্টিচড ব্লাউজ পিস (০.৮ মিটার)।',
    pdp_stole_dimensions: 'স্টোলের বহর ও মাপ:',
    pdp_stole_dimensions_text: 'স্ট্যান্ডার্ড ২.২৫ মিটার দৈর্ঘ্য এবং ৩৬ ইঞ্চি প্রস্থের আরামদায়ক ওড়না/স্টোল।',
    pdp_quantity: 'পরিমাণ',
    pdp_add_to_bag: 'শপিং ব্যাগে যোগ করুন',
    pdp_added_success: 'ব্যাগে যোগ হয়েছে ✓',
    pdp_free_size: 'ফ্রি সাইজ',
    pdp_fabric_label: 'কাপড় ও উপকরণ',
    pdp_weave_label: 'বুনন শৈলী ও কারুকাজ',
    pdp_care_label: 'যত্নের নিয়মাবলী',
    pdp_shipping_badge: 'ক্যাশ অন ডেলিভারি • দেশব্যাপী',
    pdp_shipping_desc: 'ঢাকায় ২-৩ কার্যদিবস (৳ ৮০), ঢাকার বাইরে ৩-৫ কার্যদিবস (৳ ১৫০)। পার্সেল পেয়ে দেখে মূল্য পরিশোধের সুযোগ।',
    pdp_heritage_badge: 'খাঁটি তাঁতের শতভাগ নিশ্চয়তা',
    pdp_heritage_desc: 'টাঙ্গাইল, নারায়ণগঞ্জ, রাজশাহী এবং সিরাজগঞ্জের ঐতিহ্যবাহী তাঁতিদের নিখুঁত হাতে বোনা।',

    // Cart Drawer & Page
    cart_title: 'শপিং ব্যাগ',
    cart_item_single: 'টি পোশাক',
    cart_item_plural: 'টি পোশাক',
    cart_empty_title: 'আপনার ব্যাগ খালি',
    cart_empty_desc: 'আমাদের হ্যান্ডলুম শাড়ি, জারদৌসি ব্লাউজ, কুর্তি ও স্টোলের অনন্য সম্ভার ঘুরে দেখুন।',
    cart_continue_browsing: 'কালেকশন ব্রাউজ করুন',
    cart_subtotal: 'সর্বমোট',
    cart_shipping_note: 'দেশব্যাপী ক্যাশ অন ডেলিভারি • ডেলিভারি চার্জ চেকআউটে যুক্ত হবে।',
    cart_proceed_checkout: 'অর্ডার করতে এগিয়ে যান',
    cart_remove: 'সরান',
    cart_quantity: 'পরিমাণ',
    cart_view_bag: 'সম্পূর্ণ ব্যাগ দেখুন',

    // Checkout
    checkout_title: 'বুটিক চেকআউট',
    checkout_subtitle: 'দেশব্যাপী ক্যাশ অন ডেলিভারি (সিওডি)',
    checkout_breadcrumb_home: 'হোম',
    checkout_breadcrumb_bag: 'ব্যাগ',
    checkout_breadcrumb_checkout: 'চেকআউট',
    checkout_delivery_title: '১. ডেলিভারির বিবরণ',
    checkout_name_label: 'পূর্ণ নাম',
    checkout_name_placeholder: 'যেমন: সামিরা রহমান',
    checkout_phone_label: 'মোবাইল নম্বর',
    checkout_phone_placeholder: 'যেমন: ০১৭১২-৩৪৫৬৭৮',
    checkout_address_label: 'ডেলিভারির পূর্ণ ঠিকানা',
    checkout_address_placeholder: 'বাড়ি নং, রোড নং, এলাকা (যেমন: বাড়ি ১৪, রোড ৭, বনানী, ঢাকা)',
    checkout_city_label: 'ডেলিভারি এলাকা',
    checkout_city_dhaka: 'ঢাকা শহর (৳ ৮০ ডেলিভারি চার্জ)',
    checkout_city_outside: 'ঢাকার বাইরে / সমগ্র বাংলাদেশ (৳ ১৫০ ডেলিভারি চার্জ)',
    checkout_notes_label: 'বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)',
    checkout_notes_placeholder: 'ডেলিভারি সংক্রান্ত কোনো বিশেষ সময় বা নির্দেশনা...',
    checkout_payment_title: '২. পেমেন্ট মাধ্যম',
    checkout_cod_title: 'ক্যাশ অন ডেলিভারি (সিওডি)',
    checkout_cod_desc: 'ডেলিভারির সময় পার্সেল দেখে কুরিয়ার রাইডারের কাছে নগদ মূল্য পরিশোধ করুন।',
    checkout_order_summary: 'অর্ডার সংক্ষেপ',
    checkout_item_total: 'পোশাকের মূল্য',
    checkout_delivery_fee: 'ডেলিভারি ফি',
    checkout_grand_total: 'সর্বমোট প্রদেয়',
    checkout_submit_btn: 'ক্যাশ অন ডেলিভারি অর্ডার নিশ্চিত করুন',
    checkout_guarantee_text: 'এই অর্ডারটি সম্পন্ন করার মাধ্যমে আপনি আমাদের এক্সচেঞ্জ ও রিটার্ন পলিসিতে সম্মত হচ্ছেন।',

    // Order Confirmed
    order_success_eyebrow: 'অর্ডার সফল হয়েছে',
    order_success_title: 'ধন্যবাদ,',
    order_reference: 'অর্ডার রেফারেন্স:',
    order_success_desc: 'আপনার পছন্দের পোশাকটি আমাদের ঢাকা অ্যাটেলিয়ারে পরম যত্নে প্রস্তুত করা হচ্ছে। পার্সেল পাঠানোর পূর্বে আমাদের প্রতিনিধি যোগাযোগ করবেন।',
    order_payment_mode: 'পেমেন্ট মাধ্যম',
    order_delivery_zone: 'ডেলিভারি এলাকা',
    order_delivery_address: 'ডেলিভারির ঠিকানা',
    order_items_recap: 'নির্বাচিত পোশাক',
    order_total_amount: 'সর্বমোট প্রদেয় (সিওডি)',
    order_return_home: 'গ্যালারিতে ফিরুন',
    order_continue_shop: 'আরও কালেকশন দেখুন',

    // Footer & Social
    footer_philosophy: 'বাঙালির ঐতিহ্য ও আভিজাত্যের ধারক তেরোপার্বণ। খাঁটি ঢাকাই জামদানি, নিখুঁত জারদৌসি ব্লাউজ, মার্জিত সিল্ক কুর্তি এবং হ্যান্ডলুম স্টোলের অভিজাত গ্যালারি।',
    footer_locations: 'ঢাকা, বাংলাদেশ • বিশ্বব্যাপী কুরিয়ার সুবিধা',
    footer_col_title: 'কালেকশন',
    footer_service_title: 'গ্রাহক সেবা',
    footer_instagram: '@tero_parbon3',
    footer_follow_insta: 'ইনস্টাগ্রামে ফলো করুন',
    footer_guide_size: 'সাইজ ও মাপ সহায়িকা',
    footer_guide_cod: 'ক্যাশ অন ডেলিভারি ও শিপিং',
    footer_guide_care: 'কাপড়ের যত্নের নিয়মাবলী',
    footer_guide_appointment: 'প্রাইভেট শোরুম অ্যাপয়েন্টমেন্ট',
    footer_copyright: 'সর্বস্বত্ব সংরক্ষিত।',
    footer_motto: 'ঢাকা বুটিক গ্যালারি • খাঁটি দেশি ঐতিহ্য',

    // About Page (Editorial Magazine Layout)
    about_eyebrow: 'বুটিক ক্রনিকল ও ঐতিহ্য',
    about_title: 'তেরোপার্বণের গল্প ও পথচলা',
    about_subtitle: 'বাঙালির বারো মাসের তেরো পার্বণ আর চিরায়ত তাঁতশিল্পের মেলবন্ধনে এক নিবেদিত ঢাকাভিত্তিক বুটিক।',
    about_sec1_tag: 'প্রথম অধ্যায় • আমাদের দর্শন',
    about_sec1_title: 'আমাদের গল্প ও অঙ্গীকার',
    about_sec1_p1: 'ঢাকার প্রাণকেন্দ্রে তেরোপার্বণের জন্ম এক গভীর বিশ্বাস থেকে—বাঙালির শাড়ির সংস্কৃতি শুধুই অতীতের স্মৃতি নয়, এটি এক জীবন্ত শিল্প যা আমাদের প্রতিদিনের উৎসব, সাজ আর ভালোবাসায় জড়িয়ে থাকে।',
    about_sec1_p2: '‘বারো মাসে তেরো পার্বণ’ প্রবাদের অনুপ্রেরণায় তৈরি প্রতিটি শাড়ি ও পোশাক বাঙালি নারীর সাজকে দেয় পূর্ণতা। আমাদের অঙ্গীকার—খাঁটি বুনন, পরিমিত নান্দনিকতা এবং দেশীয় তাঁতিদের পরম মমতায় তৈরি সেরা পোশাকটি আপনাদের হাতে পৌঁছে দেওয়া।',
    about_sec2_tag: 'দ্বিতীয় অধ্যায় • খাঁটি বুনন',
    about_sec2_title: 'ঐতিহ্য ও কারুশিল্পের শুদ্ধতা',
    about_sec2_p1: 'কারখানার কৃত্রিম সিন্থেটিক ভিড়ে আমরা সচেতনভাবে বেছে নিয়েছি হাতের স্পর্শ ও কাঠের পিটলুম তাঁতের ধীর, যত্নশীল ছন্দ। ৩০০ কাউন্টের মিহি ঢাকাই মসলিন থেকে শুরু করে আরামদায়ক টাঙ্গাইল তাঁতের সুতি—প্রতিটি সুতোয় বজায় থাকে খাঁটি ঐতিহ্য।',
    about_sec2_p2: 'টাঙ্গাইল, নারায়ণগঞ্জ, রাজশাহী ও ফুলিয়ার প্রবীণ তাঁতিদের সাথে সরাসরি কাজের মাধ্যমে আমরা নিশ্চিত করি নিখুঁত কারুকাজ ও সেরা ফেব্রিক। আমাদের প্রতিটি শাড়ি দীর্ঘস্থায়ী ও পরিবারের ভবিষ্যৎ প্রজন্মের কাছে রেখে দেওয়ার মতো অনন্য সম্পদ।',
    about_sec3_tag: 'তৃতীয় অধ্যায় • আমাদের কাজের ধারা',
    about_sec3_title: 'সরাসরি তাঁত থেকে আপনার ঘরে',
    about_sec3_p1: 'আমাদের কাজের প্রক্রিয়া অত্যন্ত স্বচ্ছ ও আন্তরিক। ঢাকার অ্যাটেলিয়ার থেকে সরাসরি তাঁতপল্লী ভ্রমণ করে আমরা নির্বাচন করি অনন্য রঙের ও বুননের সীমিত সংস্করণের শাড়ি ও পোশাক।',
    about_sec3_p2: 'প্রতিটি পোশাক ঢাকায় নিয়ে আসার পর тщаভাবে কোয়ালিটি চেক করা হয় এবং অ্যান্টি-ময়েশ্চার কাপড়ে যত্নের সাথে মোড়ানো হয়। দেশব্যাপী ক্যাশ অন ডেলিভারি সুবিধার মাধ্যমে পার্সেল হাতে পেয়ে দেখে নেওয়ার পূর্ণ সুযোগ থাকে।',
    about_quote: '“আমরা শুধু শাড়ি তুলে দিই না, আমরা তুলে দিই বাংলার সুতোয় বোনা চিরন্তন কবিতা।”',
    about_cta_btn: 'আমাদের কালেকশন দেখুন',

    // Founder Page (The Creator\'s Story)
    founder_eyebrow: 'উদ্যোক্তার গল্প',
    founder_title: 'তেরোপার্বণের পেছনের স্বপ্নদ্রষ্টা',
    founder_subtitle: 'বাংলার তাঁতের প্রতি নিঃস্বার্থ ভালোবাসা, আভিজাত্যের দৃষ্টি আর ৪৫ হাজারেরও বেশি শুভানুধ্যায়ীর আস্থা ও ভালোবাসা।',
    founder_quote: '“শাড়ি কেবল ছয় গজের কাপড় নয়; এটি নারীর শিকড়, আত্মবিশ্বাস ও স্মৃতিকে এক সুতোয় বেঁধে রাখার এক পবিত্র অনুভূতি।”',
    founder_author: '— প্রতিষ্ঠাতা ও ক্রিয়েটিভ ডিরেক্টর, তেরোপার্বণ',
    founder_sec1_tag: 'একটি স্বপ্নের সূচনা',
    founder_sec1_title: 'কীভাবে শুরু হলো তেরোপার্বণ',
    founder_sec1_desc: 'ছোটবেলা থেকেই শাড়ির প্রতি গভীর টান ছিল তাঁর। কিন্তু বাজারে খাঁটি দেশি তাঁতের শাড়ির সহজলভ্যতার অভাব তাঁকে ভাবিয়ে তোলে। সেই ভাবনা থেকেই ঢাকার একটি ছোট ঘরে তেরোপার্বণের সূচনা। সরাসরি তাঁতিদের কাছে গিয়ে রঙ ও সুতোর মান যাচাই করে পরম যত্নে গড়ে তোলেন এই ব্র্যান্ড।',
    founder_sec2_tag: '৪৫ হাজার পরিবারের মেলবন্ধন',
    founder_sec2_title: 'পথচলা: ভালোবাসার এক বৃহৎ পরিবার',
    founder_sec2_desc: 'ধীরে ধীরে গ্রাহকদের আন্তরিক ভালোবাসা ও আস্থায় তেরোপার্বণ পরিণত হয়েছে ৪৫,০০০-এরও বেশি শুভানুধ্যায়ীর এক প্রাণবন্ত পরিবারে। সততা, ব্যক্তিগত সেবা এবং খাঁটি পণ্যের নিশ্চয়তাই এই পথচলার মূল চালিকাশক্তি।',
    founder_sec3_tag: 'প্রতিটি পদক্ষেপে নিষ্ঠা',
    founder_sec3_title: 'প্রতিদিনের নিবেদন ও আগামী দিনের স্বপ্ন',
    founder_sec3_desc: 'প্রতিটি পোশাকের ফেব্রিক পরখ করা থেকে শুরু করে গ্রাহকের বিশেষ চাহিদা পূরণ—সবকিছুতেই রয়েছে তাঁর ব্যক্তিগত ছোঁয়া। বাঙালি নারীর দৈনন্দিন সাজে দেশি তাঁতের আভিজাত্য ছড়িয়ে দেওয়াই তাঁর নিরন্তর প্রচেষ্টা।',
    founder_stats_community: '৪৫,০০০+ শুভানুধ্যায়ী পরিবার',
    founder_stats_artisans: '১২০+ তাঁতি পরিবার',
    founder_stats_cities: '৬৪ জেলায় ডেলিভারি',
    founder_cta_btn: 'তাঁর নির্বাচিত শাড়িগুলো দেখুন',

    // Reviews Page
    reviews_eyebrow: 'গ্রাহকদের ভালোবাসা ও মতামত',
    reviews_title: 'আমাদের প্রিয় গ্রাহকদের অনুভূতি',
    reviews_subtitle: 'সারা দেশের হাজারো নারীর বিশ্বাস আর ভালোবাসায় সিক্ত তেরোপার্বণ। তাঁদের পাঠানো কিছু অমূল্য মুহূর্ত ও বার্তা।',
    reviews_filter_all: 'সব রিভিউ',
    reviews_filter_photos: 'গ্রাহকদের ছবি',
    reviews_filter_screenshots: 'মেসেজ ও স্ক্রিনশট',
    reviews_filter_written: 'লিখিত মন্তব্য',
    reviews_verified: 'যাচাইকৃত রিভিউ',
    reviews_purchased: 'ক্রয়কৃত পোশাক:',
    reviews_click_zoom: 'বড় করে দেখতে ক্লিক করুন',
    reviews_all_five_stars: '৫.০ স্টার রেটিং • দেশব্যাপী ভালোবাসা',
    reviews_showing: 'দেখাচ্ছে',
    reviews_entries: 'টি রিভিউ',

    // WhatsApp
    whatsapp_inquire: 'হোয়াটসঅ্যাপ অনুসন্ধান',
    whatsapp_tooltip: 'ঢাকা অ্যাটেলিয়ারে সরাসরি যোগাযোগ করুন',
  },
};

// Helper to convert English digits to Bengali numerals
export function toBengaliNumerals(number) {
  if (number === null || number === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number
    .toString()
    .replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

// Helper to format currency in Bangladeshi Taka (৳)
export function formatTaka(amount, lang = 'en') {
  if (amount === null || amount === undefined) return '৳0';
  const formattedNumber = Math.round(Number(amount)).toLocaleString('en-IN');
  if (lang === 'bn') {
    return `৳${toBengaliNumerals(formattedNumber)}`;
  }
  return `৳${formattedNumber}`;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('tp_lang') || 'bn'; // Default to authentic Bengali feel or 'en'
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('tp_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
  };

  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const formatPrice = (amount) => {
    return formatTaka(amount, language);
  };

  // Helper to extract bilingual field from product object
  const getLocalizedField = (fieldObj, fallback = '') => {
    if (!fieldObj) return fallback;
    if (typeof fieldObj === 'string') return fieldObj;
    return fieldObj[language] || fieldObj.bn || fieldObj.en || fallback;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatPrice,
        getLocalizedField,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
