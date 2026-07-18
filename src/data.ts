import { Product, Testimonial, FAQItem } from './types';
import chocoLavaImg from './assets/images/choco_lava_caroline_1784360378317.jpg';
import chocoCheeseImg from './assets/images/choco_cheese_caroline_1784360394958.jpg';
import oreoDrizzleImg from './assets/images/oreo_drizzle_caroline_1784360406839.jpg';
import doubleChocolateImg from './assets/images/double_chocolate_caroline_1784360424549.jpg';
import matchaSilverqueenImg from './assets/images/matcha_silverqueen_caroline_1784360438979.jpg';
import matchaWhiteImg from './assets/images/matcha_white_caroline_1784360452490.jpg';
import whiteButterImg from './assets/images/white_butter_caroline_1784360463932.jpg';
import classicChocoImg from './assets/images/classic_choco_caroline_1784360475433.jpg';
import redVelvetImg from './assets/images/red_velvet_caroline_1784360487508.jpg';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Signature Choco Lava',
    description: 'Cookies premium bertekstur renyah di luar dan lumer di dalam dengan isian cokelat Belgia pekat meleleh yang melimpah.',
    price: 45000,
    rating: 4.9,
    image: chocoLavaImg,
    category: 'special',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Choco Cheese Bomb',
    description: 'Cookies cokelat premium dengan isian cream cheese gurih nan lumer melimpah di setiap gigitan.',
    price: 48000,
    rating: 4.8,
    image: chocoCheeseImg,
    category: 'special',
    isBestSeller: false
  },
  {
    id: '3',
    name: 'Oreo White Drizzle',
    description: 'Cookies lezat yang dipadukan dengan remahan Oreo renyah dan hiasan drizzle cokelat putih yang manis-lembut.',
    price: 48000,
    rating: 4.9,
    image: oreoDrizzleImg,
    category: 'classic',
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Double Chocolate Sea Salt',
    description: 'Cookies cokelat hitam pekat (70% cocoa) melimpah dengan sentuhan taburan butiran garam laut Maldon premium.',
    price: 48000,
    rating: 4.8,
    image: doubleChocolateImg,
    category: 'classic',
    isBestSeller: false
  },
  {
    id: '5',
    name: 'Matcha SilverQueen',
    description: 'Cookies matcha Jepang premium berpadu dengan kepingan cokelat SilverQueen autentik yang manis meleleh.',
    price: 52000,
    rating: 5.0,
    image: matchaSilverqueenImg,
    category: 'premium',
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Matcha White Chips',
    description: 'Cookies rasa teh hijau matcha premium bertabur kepingan cokelat putih manis lembut yang berlimpah.',
    price: 48000,
    rating: 4.7,
    image: matchaWhiteImg,
    category: 'classic',
    isBestSeller: false
  },
  {
    id: '7',
    name: 'White Chocolate Butter',
    description: 'Cookies mentega premium beraroma harum vanila dengan taburan kepingan cokelat putih yang lembut.',
    price: 45000,
    rating: 4.8,
    image: whiteButterImg,
    category: 'premium',
    isBestSeller: false
  },
  {
    id: '8',
    name: 'Classic Choco Chips',
    description: 'Kue kering klasik legendaris bertabur chocolate chips berlimpah dengan aroma mentega Wijsman yang harum mewah.',
    price: 45000,
    rating: 4.9,
    image: classicChocoImg,
    category: 'premium',
    isBestSeller: true
  },
  {
    id: '9',
    name: 'Red Velvet Premium',
    description: 'Cookies red velvet bertekstur fudgy dengan warna merah beludru cantik dan rasa mewah.',
    price: 48000,
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
    question: 'Apakah cookies Caroline in. bersertifikat Halal?',
    answer: 'Ya! Semua produk cookies Caroline in. dipanggang menggunakan 100% bahan baku bersertifikat halal, tanpa menggunakan alkohol, perisa non-halal, rum, atau gelatin babi. Kami sangat menjaga kehalalan proses pembuatan.'
  },
  {
    id: 'faq-2',
    question: 'Berapa lama masa kedaluwarsa cookies?',
    answer: 'Karena dipanggang tanpa bahan pengawet kimia, ketahanan cookies bervariasi: Tipe Soft-baked (Choco Lava, Matcha, Red Velvet, Sea Salt) paling baik dinikmati dalam waktu 7-10 hari pada suhu ruang, atau hingga 2 minggu jika disimpan di dalam lemari pendingin.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana metode pengiriman ke luar kota?',
    answer: 'Kami melayani pengiriman ke seluruh kota di Indonesia menggunakan ekspedisi terpercaya (J&T, JNE, Sicepat, Paxel). Untuk pengiriman paket, kami menggunakan kemasan double bubble wrap luar dalam, karton tebal berperekat, dan stiker fragile tanpa biaya tambahan agar toples dan cookies sampai dalam kondisi utuh.'
  },
  {
    id: 'faq-4',
    question: 'Bagaimana cara menyajikan cookies agar rasa dan teksturnya maksimal?',
    answer: 'Untuk tipe Soft-baked/Chewy Cookies, kami sangat menyarankan untuk memanaskannya terlebih dahulu di dalam microwave selama 10-15 detik, atau di dalam oven/air fryer selama 2-3 menit pada suhu 150°C agar cokelat dan cream cheesenya kembali meleleh sempurna.'
  },
  {
    id: 'faq-5',
    question: 'Bisa pesan custom hampers untuk acara pernikahan atau korporat?',
    answer: 'Sangat bisa! Kami menyediakan layanan hampers kustomisasi lengkap dengan pita satin premium, kartu ucapan elegan bergaya kaligrafi, serta sleeve box bermerek. Silakan hubungi kami via WhatsApp di nomor resmi kami untuk mendiskusikan tema, anggaran, dan jumlah pesanan Anda.'
  }
];
