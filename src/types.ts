export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: 'classic' | 'premium' | 'special';
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CheckoutData {
  fullName: string;
  whatsApp: string;
  email: string;
  address: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  notes: string;
  courier: string;
  paymentMethod: string;
}
