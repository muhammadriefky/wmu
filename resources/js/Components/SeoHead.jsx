import { Head, usePage } from '@inertiajs/react';

export default function SeoHead({ 
    title = '', 
    description = '', 
    image = '', 
    url = '',
    type = 'website',
    keywords = ''
}) {
    const { pengaturan } = usePage().props;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const siteName = pengaturan?.nama_pt || 'WMU Construction';
    const defaultDesc = pengaturan?.deskripsi_web || 'Layanan konstruksi terpercaya dan profesional di Indonesia.';

    // Terima URL absolut ("https://..."), path absolut ("/storage/x.jpg")
    // maupun path relatif storage ("blog/x.jpg") tanpa menggandakan prefix.
    const toAbsolute = (value, storagePrefix = false) => {
        if (!value) return '';
        if (/^https?:\/\//i.test(value)) return value;
        if (value.startsWith('/')) return `${origin}${value}`;
        return storagePrefix ? `${origin}/storage/${value}` : `${origin}/${value}`;
    };

    const defaultImage = pengaturan?.logo ? toAbsolute(pengaturan.logo, true) : `${origin}/images/logonobg.png`;

    const finalTitle = title ? `${title} - ${siteName}` : siteName;
    const finalDesc = description || defaultDesc;
    const finalImage = image ? toAbsolute(image, true) : defaultImage;
    const finalUrl = url ? toAbsolute(url) : (typeof window !== 'undefined' ? window.location.href : '');
    const finalKeywords = keywords || 'kontraktor, konstruksi, wmu, jasa konstruksi, sipil, arsitektur, bangunan';

    return (
        <Head>
            {/* Standard Meta Tags */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDesc} />
            <meta name="keywords" content={finalKeywords} />
            <meta name="author" content={siteName} />

            {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDesc} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDesc} />
            <meta name="twitter:image" content={finalImage} />
            
            {/* Additional Tags */}
            <link rel="canonical" href={finalUrl} />
        </Head>
    );
}
