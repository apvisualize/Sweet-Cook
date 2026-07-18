import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Truck, CreditCard, Send, MapPin, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { CartItem, CheckoutData } from '../types';

interface CheckoutProps {
  cartItemsList: CartItem[];
  onClearCart: () => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cartItemsList,
  onClearCart,
  onShowToast
}) => {
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: '',
    whatsApp: '',
    email: '',
    address: '',
    province: '',
    city: '',
    district: '',
    postalCode: '',
    notes: '',
    courier: 'jne',
    paymentMethod: 'qris'
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Format currency helper
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const totalProductPrice = cartItemsList.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Free shipping threshold at Rp 250,000
  const freeShippingThreshold = 250000;
  const isEligibleForFreeShipping = totalProductPrice >= freeShippingThreshold;

  // Shipping cost options
  const courierOptions = [
    { id: 'jne', name: 'JNE Reguler', price: 12000, estimate: '2-3 Hari Kerja' },
    { id: 'jnt', name: 'J&T Express', price: 14000, estimate: '1-2 Hari Kerja' },
    { id: 'paxel', name: 'Paxel Same Day', price: 25000, estimate: 'Hari Yang Sama' }
  ];

  const selectedCourierObj = courierOptions.find(c => c.id === formData.courier) || courierOptions[0];
  const rawShippingCost = selectedCourierObj.price;
  const shippingCost = isEligibleForFreeShipping ? 0 : rawShippingCost;
  const grandTotal = totalProductPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for that field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Nama Lengkap wajib diisi';
    
    // Indonesian phone/WA validation
    const waClean = formData.whatsApp.replace(/[^0-9]/g, '');
    if (!formData.whatsApp.trim()) {
      errors.whatsApp = 'Nomor WhatsApp wajib diisi';
    } else if (waClean.length < 9 || waClean.length > 15) {
      errors.whatsApp = 'Format nomor WhatsApp tidak valid (contoh: 08123456789)';
    }

    if (!formData.email.trim()) {
      errors.email = 'Alamat Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!formData.address.trim()) errors.address = 'Alamat Lengkap wajib diisi';
    if (!formData.province.trim()) errors.province = 'Provinsi wajib diisi';
    if (!formData.city.trim()) errors.city = 'Kota/Kabupaten wajib diisi';
    if (!formData.district.trim()) errors.district = 'Kecamatan wajib diisi';
    if (!formData.postalCode.trim()) errors.postalCode = 'Kode Pos wajib diisi';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItemsList.length === 0) {
      onShowToast('Keranjang belanja Anda masih kosong!', 'error');
      return;
    }

    if (!validateForm()) {
      onShowToast('Mohon lengkapi formulir pengiriman dengan benar!', 'error');
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Build WhatsApp message
      const storeNumber = '628123456789'; // Mock Indonesian premium phone number
      const orderItemsText = cartItemsList
        .map(
          item =>
            `• ${item.quantity}x *${item.product.name}* (@${formatIDR(item.product.price)}) - *${formatIDR(
              item.product.price * item.quantity
            )}*`
        )
        .join('\n');

      const textMessage = `*🔴 PESANAN BARU - SWEET CRUMBS*
--------------------------------------------
Halo Sweet Crumbs! Saya ingin memesan kue kering premium sebagai berikut:

*Rincian Produk:*
${orderItemsText}

*Informasi Pengiriman:*
• *Nama Lengkap:* ${formData.fullName}
• *WhatsApp:* ${formData.whatsApp}
• *Email:* ${formData.email}
• *Alamat Kirim:* ${formData.address}, Kec. ${formData.district}, ${formData.city}, ${formData.province} (${formData.postalCode})
• *Ekspedisi:* ${selectedCourierObj.name} (${selectedCourierObj.estimate}) - ${
        isEligibleForFreeShipping ? 'Gratis Ongkir (Promo)' : formatIDR(shippingCost)
      }

*Metode Pembayaran:*
• *Pilihan:* ${
        formData.paymentMethod === 'qris'
          ? 'QRIS Otomatis (E-Wallet)'
          : formData.paymentMethod === 'bca'
          ? 'Transfer BCA (812903829 a.n. Sweet Crumbs)'
          : 'Transfer Mandiri (13200982929 a.n. Sweet Crumbs)'
      }

${formData.notes.trim() ? `*Catatan Khusus:* \n"${formData.notes}"\n` : ''}
*Rincian Biaya:*
• *Subtotal:* ${formatIDR(totalProductPrice)}
• *Ongkos Kirim:* ${isEligibleForFreeShipping ? 'Gratis Ongkir' : formatIDR(shippingCost)}
• *Total Tagihan:* *${formatIDR(grandTotal)}*
--------------------------------------------
Terima kasih! Mohon segera infokan konfirmasi pesanan dan instruksi pembayaran selanjutnya. 😊🍪`;

      const encodedText = encodeURIComponent(textMessage);
      const whatsAppUrl = `https://wa.me/${storeNumber}?text=${encodedText}`;

      // Open WhatsApp in a safe manner
      window.open(whatsAppUrl, '_blank');

      onShowToast('Membuka WhatsApp untuk mengirim pesanan Anda!', 'success');
      
      // Keep state clean and clear cart upon successful completion
      setTimeout(() => {
        onClearCart();
        setIsSubmitting(false);
        // Clear inputs
        setFormData({
          fullName: '',
          whatsApp: '',
          email: '',
          address: '',
          province: '',
          city: '',
          district: '',
          postalCode: '',
          notes: '',
          courier: 'jne',
          paymentMethod: 'qris'
        });
      }, 2000);

    } catch (err) {
      console.error(err);
      onShowToast('Gagal memproses pesanan, silakan coba lagi!', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="checkout" className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">Selesaikan Pesanan</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface leading-tight">
            Formulir Pemesanan Premium
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
            Sistem checkout kami terintegrasi langsung dengan WhatsApp kami untuk konfirmasi instan, kemudahan koordinasi alamat, dan pelacakan resi ekspedisi tercepat.
          </p>
        </div>

        {cartItemsList.length === 0 ? (
          <div className="text-center py-12 sm:py-16 border-2 border-dashed border-outline-variant/30 rounded-[32px] max-w-xl mx-auto space-y-5 sm:space-y-6 bg-surface-container-low/20 px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto animate-pulse">
              <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface">Keranjang Belanja Masih Kosong</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium max-w-sm mx-auto leading-relaxed">
                Silakan pilih kue kering favorit Anda dari koleksi kami terlebih dahulu sebelum melakukan pengisian data pengiriman.
              </p>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById('produk');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              Kembali ke Katalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form Fields Column */}
            <div className="lg:col-span-7 bg-surface-container-low dark:bg-surface-container/30 border border-outline-variant/20 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 custom-shadow">
              <form onSubmit={handleCheckoutSubmit} className="space-y-8">
                
                {/* Section 1: Customer Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary border-b border-outline-variant/10 pb-2">
                    <MapPin className="w-5 h-5" />
                    <h3 className="text-base sm:text-lg font-bold text-on-surface">1. Data Penerima & Alamat</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nama Lengkap Penerima *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Contoh: Amanda Setyawati"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.fullName ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">No. WhatsApp *</label>
                      <input
                        type="tel"
                        name="whatsApp"
                        value={formData.whatsApp}
                        onChange={handleInputChange}
                        placeholder="Contoh: 08123456789"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.whatsApp ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.whatsApp ? (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.whatsApp}</span>
                        </p>
                      ) : (
                        <p className="text-[10px] text-on-surface-variant/70 font-medium flex items-center gap-1 mt-1">
                          <Info className="w-3 h-3 text-primary shrink-0" />
                          <span>Gunakan nomor aktif untuk pelacakan resi instan</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Alamat Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Contoh: amanda@gmail.com"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.email ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Full Address */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Alamat Lengkap Pengiriman *</label>
                      <textarea
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Contoh: Jl. Kebon Jeruk No. 12, RT 05 RW 03 (Seberang Indomaret)"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.address ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.address}</span>
                        </p>
                      )}
                    </div>

                    {/* Province */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Provinsi *</label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        placeholder="Contoh: DKI Jakarta"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.province ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.province && (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.province}</span>
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Kota / Kabupaten *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Contoh: Jakarta Barat"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.city ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.city && (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.city}</span>
                        </p>
                      )}
                    </div>

                    {/* District */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Kecamatan *</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Contoh: Kebon Jeruk"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.district ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.district && (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.district}</span>
                        </p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Kode Pos *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Contoh: 11530"
                        className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm font-semibold transition-all ${
                          formErrors.postalCode ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-outline-variant/40 focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {formErrors.postalCode && (
                        <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.postalCode}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Shipping Method / Courier */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary border-b border-outline-variant/10 pb-2">
                    <Truck className="w-5 h-5" />
                    <h3 className="text-base sm:text-lg font-bold text-on-surface">2. Opsi Pengiriman</h3>
                  </div>

                  {isEligibleForFreeShipping && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-400">Promo Gratis Ongkir Aktif</h4>
                        <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5 leading-relaxed font-medium">
                          Selamat! Total produk Anda mencapai {formatIDR(freeShippingThreshold)}. Anda mendapatkan potongan bebas ongkir 100% menggunakan ekspedisi yang tersedia.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3">
                    {courierOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          formData.courier === opt.id
                            ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-sm'
                            : 'bg-surface border-outline-variant/30 hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="courier"
                            value={opt.id}
                            checked={formData.courier === opt.id}
                            onChange={handleInputChange}
                            className="text-primary focus:ring-primary"
                          />
                          <div>
                            <span className="text-sm font-bold text-on-surface block">{opt.name}</span>
                            <span className="text-xs text-on-surface-variant font-medium block mt-0.5">Estimasi: {opt.estimate}</span>
                          </div>
                        </div>
                        <span className={`text-sm font-extrabold ${isEligibleForFreeShipping ? 'text-emerald-600 line-through text-xs' : 'text-primary'}`}>
                          {formatIDR(opt.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section 3: Payment Method */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary border-b border-outline-variant/10 pb-2">
                    <CreditCard className="w-5 h-5" />
                    <h3 className="text-base sm:text-lg font-bold text-on-surface">3. Metode Pembayaran</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* QRIS */}
                    <label
                      className={`p-4 rounded-2xl border cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-2 ${
                        formData.paymentMethod === 'qris'
                          ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-sm'
                          : 'bg-surface border-outline-variant/30 hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="qris"
                        checked={formData.paymentMethod === 'qris'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="material-symbols-outlined text-primary text-3xl">qr_code_2</span>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-on-surface block">QRIS Otomatis</span>
                        <span className="text-[10px] text-on-surface-variant font-medium block mt-0.5">Semua E-Wallet</span>
                      </div>
                    </label>

                    {/* BCA */}
                    <label
                      className={`p-4 rounded-2xl border cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-2 ${
                        formData.paymentMethod === 'bca'
                          ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-sm'
                          : 'bg-surface border-outline-variant/30 hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bca"
                        checked={formData.paymentMethod === 'bca'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-sm font-extrabold text-blue-600 font-sans tracking-wide block bg-blue-50 px-2.5 py-1 rounded-md">BCA</span>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-on-surface block">Transfer BCA</span>
                        <span className="text-[10px] text-on-surface-variant font-medium block mt-0.5">812903829</span>
                      </div>
                    </label>

                    {/* Mandiri */}
                    <label
                      className={`p-4 rounded-2xl border cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-2 ${
                        formData.paymentMethod === 'mandiri'
                          ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-sm'
                          : 'bg-surface border-outline-variant/30 hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mandiri"
                        checked={formData.paymentMethod === 'mandiri'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-sm font-extrabold text-amber-500 font-sans tracking-wide block bg-amber-50 px-2.5 py-1 rounded-md">MANDIRI</span>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-on-surface block">Transfer Mandiri</span>
                        <span className="text-[10px] text-on-surface-variant font-medium block mt-0.5">13200982929</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Section 4: Notes */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Catatan Tambahan (Opsional)</label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Contoh: Tolong tuliskan ucapan kartu: Selamat Hari Raya Idul Fitri ya!"
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/40 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Submit trigger button hidden to allow submission via the floating order card summary */}
                <button type="submit" id="hidden-checkout-submit" className="hidden" />

              </form>
            </div>

            {/* Invoice Order Summary Card Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              <div className="bg-surface-container-low dark:bg-surface-container/30 border border-outline-variant/20 rounded-[32px] p-6 sm:p-8 custom-shadow space-y-6">
                <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-4">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-bold text-on-surface">Rincian Belanja</h3>
                </div>

                {/* Cart items list mini summary */}
                <div className="space-y-4 max-h-56 overflow-y-auto pr-2">
                  {cartItemsList.map((item) => (
                    <div key={item.product.id} className="flex gap-3 items-center justify-between text-xs sm:text-sm font-medium border-b border-outline-variant/5 pb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover rounded-lg bg-surface-container shrink-0 border border-outline-variant/10"
                        />
                        <div>
                          <span className="font-bold text-on-surface block leading-tight">{item.product.name}</span>
                          <span className="text-[10px] text-on-surface-variant font-medium mt-0.5 block">Kuantitas: {item.quantity} toples</span>
                        </div>
                      </div>
                      <span className="font-bold text-on-surface">{formatIDR(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Invoice Breakdown calculation ledger */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-on-surface-variant">
                    <span>Total Harga Produk</span>
                    <span className="font-bold text-on-surface">{formatIDR(totalProductPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-on-surface-variant">
                    <span>Biaya Ongkir ({selectedCourierObj.name})</span>
                    {isEligibleForFreeShipping ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-on-surface-variant/40 line-through text-xs">{formatIDR(rawShippingCost)}</span>
                        <span className="text-emerald-600 font-bold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded-md">Free</span>
                      </div>
                    ) : (
                      <span className="font-bold text-on-surface">{formatIDR(shippingCost)}</span>
                    )}
                  </div>

                  <div className="h-0.5 w-full bg-outline-variant/10 my-1" />

                  <div className="flex justify-between items-center text-sm sm:text-base font-bold text-on-surface pt-1">
                    <span>Total Pembayaran</span>
                    <span className="text-primary text-xl font-extrabold">{formatIDR(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Order via Whatsapp action Button */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={(e) => {
                    const submitBtn = document.getElementById('hidden-checkout-submit');
                    if (submitBtn) submitBtn.click();
                  }}
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20 group hover:-translate-y-0.5"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>{isSubmitting ? 'Memproses...' : 'Kirim Pesanan Ke WhatsApp'}</span>
                </button>

                {/* Security trust notice */}
                <p className="text-[10px] text-center text-on-surface-variant/70 leading-relaxed font-semibold max-w-xs mx-auto">
                  🛡️ Transaksi Anda dijamin aman. Seluruh data dienkripsi, dikonfirmasi dan dikoordinasikan langsung ke admin WhatsApp Sweet Crumbs.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
