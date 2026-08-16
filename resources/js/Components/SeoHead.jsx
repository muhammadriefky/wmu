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
    const siteName = pengaturan?.nama_perusahaan || 'WMU Construction';
    const defaultDesc = pengaturan?.deskripsi_web || 'Layanan konstruksi terpercaya dan profesional di Indonesia.';
    const defaultImage = pengaturan?.logo ? `${window.location.origin}/storage/${pengaturan.logo}` : `${window.location.origin}/images/default-og.jpg`;
    
    const finalTitle = title ? `${title} - ${siteName}` : siteName;
    const finalDesc = description || defaultDesc;
    const finalImage = image ? (image.startsWith('http') ? image : `${window.location.origin}/storage/${image}`) : defaultImage;
    const finalUrl = url ? `${window.location.origin}${url}` : window.location.href;
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
