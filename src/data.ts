import { Product, Testimonial, FAQItem } from './types';
import chocoLavaImg from './assets/images/choco_lava_1784347082573.jpg';
import nastarButterImg from './assets/images/nastar_butter_1784347112999.jpg';
import kastengelEdamImg from './assets/images/kastengel_edam_1784347126893.jpg';
import matchaAlmondImg from './assets/images/matcha_almond_1784347147360.jpg';
import chocolateSeasaltImg from './assets/images/chocolate_seasalt_1784347176532.jpg';
import redVelvetImg from './assets/images/red_velvet_1784347188426.jpg';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Signature Choco Lava',
    description: 'Cookie premium bertekstur renyah di luar dan lembut di dalam dengan isian cokelat Belgia murni leleh yang melimpah.',
    price: 45000,
    rating: 4.9,
    image: chocoLavaImg,
    category: 'special',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Nastar Premium Butter',
    description: 'Nastar legendaris beraroma butter Wijsman mewah dengan isian selai nanas madu alami buatan sendiri yang asam manis segar.',
    price: 125000,
    rating: 5.0,
    image: nastarButterImg,
    category: 'premium',
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Kastengel Edam Gold',
    description: 'Kue kering keju super renyah dibuat menggunakan paduan keju Edam tua impor premium dan taburan keju cheddar gurih melimpah.',
    price: 115000,
    rating: 4.8,
    image: kastengelEdamImg,
    category: 'premium',
    isBestSeller: false
  },
  {
    id: '4',
    name: 'Matcha White Almond',
    description: 'Cookies matcha Jepang Uji berkualitas tinggi berpadu harmonis dengan manisnya serpihan cokelat putih berkualitas dan irisan almond renyah.',
    price: 48000,
    rating: 4.7,
    image: matchaAlmondImg,
    category: 'classic',
    isBestSeller: false
  },
  {
    id: '5',
    name: 'Dark Chocolate Sea Salt',
    description: 'Cookies cokelat hitam pekat (70% cocoa) yang kaya rasa dengan sensasi taburan butiran garam laut (Maldon sea salt) asli yang sangat mewah.',
    price: 48000,
    rating: 4.9,
    image: chocolateSeasaltImg,
    category: 'classic',
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Red Velvet Cheese Drop',
    description: 'Cookies red velvet bertekstur fudgy dengan warna merah beludru cantik dan lumeran cream cheese frosting gurih-manis yang kaya krim.',
    price: 52000,
    rating: 4.8,
    image: redVelvetImg,
    category: 'special',
    isBestSeller: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Amanda Setyawati',
    role: 'Pencinta Dessert, Jakarta',
    quote: 'Sangat premium! Signature Choco Lava-nya beneran meleleh pas dihangatkan sebentar, cokelatnya manis pas dan gak bikin eneg. Kemasannya mewah sekali, sangat cocok dikirim untuk hampers.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '2',
    name: 'Budi Hartono',
    role: 'Pakar Keju Kuliner, Bandung',
    quote: 'Kastengel Edam Gold-nya luar biasa gurih! Keju Edam tuanya terasa pekat, garing di luar tapi lumer di mulut. Anak dan istri di rumah rebutan makan kastengel ini.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '3',
    name: 'Clarissa Tan',
    role: 'Food Blogger, Surabaya',
    quote: 'Nastar Premium Butter di sini adalah yang terbaik yang pernah saya coba. Wangi butternya langsung tercium begitu toples dibuka, lumer di lidah, dan selai nanas madunya beneran premium buatan sendiri.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah cookies Sweet Crumbs bersertifikat Halal?',
    answer: 'Ya! Semua produk cookies Sweet Crumbs dipanggang menggunakan 100% bahan baku bersertifikat halal, tanpa menggunakan alkohol, perisa non-halal, rum, atau gelatin babi. Kami sangat menjaga kehalalan proses pembuatan.'
  },
  {
    id: 'faq-2',
    question: 'Berapa lama masa kedaluwarsa cookies?',
    answer: 'Karena dipanggang tanpa bahan pengawet kimia, ketahanan cookies bervariasi: Tipe kering (Kastengel & Nastar) dapat bertahan hingga 1 bulan dalam wadah kedap udara rapat. Tipe Soft-baked (Choco Lava, Matcha, Red Velvet, Sea Salt) paling baik dinikmati dalam waktu 7-10 hari pada suhu ruang, atau hingga 2 minggu jika disimpan di dalam lemari pendingin.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana metode pengiriman ke luar kota?',
    answer: 'Kami melayani pengiriman ke seluruh kota di Indonesia menggunakan ekspedisi terpercaya (J&T, JNE, Sicepat, Paxel). Untuk pengiriman paket, kami menggunakan kemasan double bubble wrap luar dalam, karton tebal berperekat, dan stiker fragile tanpa biaya tambahan agar toples dan cookies sampai dalam kondisi utuh.'
  },
  {
    id: 'faq-4',
    question: 'Bagaimana cara menyajikan cookies agar rasa dan teksturnya maksimal?',
    answer: 'Untuk tipe kering (Nastar & Kastengel), Anda bisa langsung menikmatinya bersama secangkir teh hangat atau kopi. Untuk tipe Soft-baked/Chewy Cookies, kami sangat menyarankan untuk memanaskannya terlebih dahulu di dalam microwave selama 10-15 detik, atau di dalam oven/air fryer selama 2-3 menit pada suhu 150°C agar cokelat dan cream cheesenya kembali meleleh sempurna.'
  },
  {
    id: 'faq-5',
    question: 'Bisa pesan custom hampers untuk acara pernikahan atau korporat?',
    answer: 'Sangat bisa! Kami menyediakan layanan hampers kustomisasi lengkap dengan pita satin premium, kartu ucapan elegan bergaya kaligrafi, serta sleeve box bermerek. Silakan hubungi kami via WhatsApp di nomor resmi kami untuk mendiskusikan tema, anggaran, dan jumlah pesanan Anda.'
  }
];
