/**
 * URL publik untuk file upload. Mendukung URL absolut (http...) dan path
 * relatif disk "public" (mis. "klien/logo.png"). Mengembalikan `fallback`
 * bila path kosong, agar tidak menghasilkan request ke "/storage/null".
 */
export function storageUrl(path, fallback = '/images/logonobg.png') {
    if (!path) return fallback;
    if (/^https?:\/\//i.test(path) || path.startsWith('/')) return path;
    return `/storage/${path}`;
}
