/**
 * Helper kontak berbasis data `pengaturan` (shared prop Inertia).
 * Kunci yang dipakai: wa_number, wa_message, telepon, nama_pt.
 */

/** Normalisasi nomor ke format internasional wa.me (contoh: 0812-xxx → 62812xxx). */
export function normalizeWaNumber(raw = '') {
    const digits = String(raw || '').replace(/\D/g, '');
    return digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
}

/** Link WhatsApp lengkap. `message` opsional; default ke pengaturan.wa_message. */
export function waLink(pengaturan, message) {
    const number = normalizeWaNumber(pengaturan?.wa_number || pengaturan?.telepon);
    const text = message ?? pengaturan?.wa_message;
    const query = text ? `?text=${encodeURIComponent(text)}` : '';
    return `https://wa.me/${number}${query}`;
}

/** Nomor telepon untuk ditampilkan & dipakai di link tel:. */
export function phoneNumber(pengaturan) {
    return pengaturan?.telepon || pengaturan?.wa_number || '';
}

export function companyName(pengaturan) {
    return pengaturan?.nama_pt || 'PT Win Mulya Utama';
}
