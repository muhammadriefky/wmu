import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import Lenis from 'lenis';

const envAppName = import.meta.env.VITE_APP_NAME;
const appName = envAppName && envAppName !== 'Laravel' ? envAppName : 'WMU';

createInertiaApp({
    // Halaman publik memakai <SeoHead> yang sudah menambahkan nama perusahaan
    // ("Judul - PT ..."), jadi jangan ditambah suffix lagi. Halaman admin/auth
    // yang hanya memberi judul pendek mendapat suffix nama aplikasi.
    title: (title) => {
        if (!title) return appName;
        return title.includes(' - ') ? title : `${title} - ${appName}`;
    },
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // Biarkan elemen scroll bersarang (sidebar admin, modal) tetap bisa di-scroll
            allowNestedScroll: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
