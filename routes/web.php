<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $layanan = \App\Models\Layanan::take(6)->get();
    $keunggulan = \App\Models\Keunggulan::orderBy('urutan', 'asc')->get();
    $klien = \App\Models\Klien::where('status_aktif', 1)->orderBy('urutan', 'asc')->get();
    $ulasan = \App\Models\Ulasan::where('status_disetujui', 1)->orderBy('id_ulasan', 'desc')->take(6)->get();
    $proyek = \App\Models\Proyek::where('prk_status', 'Published')->where('prk_is_tampil', 1)->orderBy('prk_tahun', 'desc')->take(6)->get();
    $blog = \App\Models\Blog::orderBy('tanggal_terbit', 'desc')->take(3)->get();
    $faq = \App\Models\Faq::where('status_aktif', 1)->orderBy('urutan', 'asc')->get();
    $mitra = \App\Models\Mitra::where('status_aktif', 1)->orderBy('urutan', 'asc')->get();
    $tentangBeranda = \App\Models\TentangBeranda::first();

    return Inertia::render('Welcome', [
        'layanan' => $layanan,
        'keunggulan' => $keunggulan,
        'klien' => $klien,
        'ulasan' => $ulasan,
        'proyek' => $proyek,
        'blog' => $blog,
        'faq' => $faq,
        'mitra' => $mitra,
        'tentangBeranda' => $tentangBeranda,
    ]);
})->name('home');

Route::get('/tentang-kami', function () {
    $keunggulan = \App\Models\Keunggulan::orderBy('urutan', 'asc')->get();
    $mitra = \App\Models\Mitra::where('status_aktif', 1)->orderBy('urutan', 'asc')->get();
    $videos = \App\Models\Video::where('status', 'Aktif')->orderBy('id_video', 'asc')->get();
    $tentangKami = \App\Models\TentangKami::first();
    
    return Inertia::render('TentangKami', [
        'keunggulan' => $keunggulan,
        'mitra' => $mitra,
        'videos' => $videos,
        'tentang' => $tentangKami,
    ]);
})->name('tentang-kami');

Route::get('/layanan', function () {
    $layanan = \App\Models\Layanan::all();
    $klien = \App\Models\Klien::where('status_aktif', 1)->orderBy('urutan', 'asc')->get();
    return Inertia::render('Layanan', [
        'layanan' => $layanan,
        'klien' => $klien,
        'layananTambahan' => [] // Placeholder for when LayananTambahan backend is created
    ]);
})->name('layanan');

Route::get('/layanan/{slug}', function ($slug) {
    $layanan = \App\Models\Layanan::where('slug', $slug)->where('status', 'Published')->firstOrFail();
    
    // Increment views
    $layanan->increment('views');
    
    // Get other services for "Layanan Lainnya" section
    $layananLain = \App\Models\Layanan::where('id_layanan', '!=', $layanan->id_layanan)
        ->where('status', 'Published')
        ->take(4)
        ->get();
    
    return Inertia::render('LayananDetail', [
        'layanan' => $layanan,
        'layananLain' => $layananLain,
    ]);
})->name('layanan.detail');

Route::get('/proyek', function () {
    $proyek = \App\Models\Proyek::where('prk_status', 'Published')->where('prk_is_tampil', 1)->orderBy('prk_tahun', 'desc')->get();
    $klien = \App\Models\Klien::where('status_aktif', 1)->get();
    return Inertia::render('Proyek', ['proyek' => $proyek, 'klien' => $klien]);
})->name('proyek');

Route::get('/semua-proyek', function () {
    $proyek = \App\Models\Proyek::where('prk_status', 'Published')->where('prk_is_tampil', 1)->orderBy('prk_tahun', 'desc')->get();
    // Get unique categories from active projects
    $kategoriList = \App\Models\Proyek::where('prk_status', 'Published')
        ->where('prk_is_tampil', 1)
        ->whereNotNull('prk_kategori')
        ->where('prk_kategori', '!=', '')
        ->select('prk_kategori')
        ->distinct()
        ->pluck('prk_kategori')
        ->values();
    
    return Inertia::render('SemuaProyek', [
        'proyek' => $proyek,
        'kategoriList' => $kategoriList
    ]);
})->name('semua-proyek');

Route::get('/proyek/{slug}', function ($slug) {
    $proyek = \App\Models\Proyek::where('prk_slug', $slug)->where('prk_status', 'Published')->firstOrFail();
    
    // Process gallery json
    $galeri = $proyek->prk_galeri ? json_decode($proyek->prk_galeri, true) : [];
    
    return Inertia::render('ProyekDetail', [
        'proyek' => $proyek,
        'galeri' => is_array($galeri) ? $galeri : []
    ]);
})->name('proyek.detail');

Route::get('/blog', function () {
    $blog = \App\Models\Blog::orderBy('tanggal_terbit', 'desc')->paginate(9);
    $kategoriList = \App\Models\Blog::whereNotNull('kategori')
        ->where('kategori', '!=', '')
        ->select('kategori')
        ->distinct()
        ->pluck('kategori')
        ->values();
        
    $popularBlogs = \App\Models\Blog::where('status', 'Published')
        ->orderBy('tanggal_terbit', 'desc')
        ->take(5)
        ->get();
        
    return Inertia::render('Blog/Index', [
        'blog' => $blog,
        'kategoriList' => $kategoriList,
        'popularBlogs' => $popularBlogs
    ]);
})->name('blog');

Route::get('/blog/{slug}', function ($slug) {
    $blog = \App\Models\Blog::where('slug', $slug)->firstOrFail();
    $popularBlogs = \App\Models\Blog::where('status', 'Published')
        ->where('slug', '!=', $slug)
        ->orderBy('tanggal_terbit', 'desc')
        ->take(5)
        ->get();
        
    return Inertia::render('Blog/Show', [
        'blog' => $blog,
        'popularBlogs' => $popularBlogs
    ]);
})->name('blog.show');

Route::post('/ulasan', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'nama_pemberi' => 'required|string|max:255',
        'isi_ulasan' => 'required|string',
        'rating_bintang' => 'required|integer|min:1|max:5',
    ]);
    
    \App\Models\Ulasan::create([
        'nama_pemberi' => $request->nama_pemberi,
        'isi_ulasan' => $request->isi_ulasan,
        'rating_bintang' => $request->rating_bintang,
        'status_disetujui' => 0, 
        'rec_datecreated' => now(),
    ]);

    return redirect()->back();
})->name('ulasan.storePublic');

Route::get('/karir', function () {
    $karir = \App\Models\Karir::where('status_aktif', 1)->orderBy('id_karir', 'desc')->get();
    
    // If no active karir, redirect to home or show 404 (user preferred conditional link, but if manually accessed, better handle it)
    if ($karir->isEmpty()) {
        return redirect()->route('home');
    }
    
    return Inertia::render('Karir', [
        'karir' => $karir
    ]);
})->name('karir');

Route::get('/sitemap.xml', function () {
    $proyeks = \App\Models\Proyek::where('prk_status', 'Published')->where('prk_is_tampil', 1)->get();
    $blogs = \App\Models\Blog::where('status', 'Published')->get();
    $layanans = \App\Models\Layanan::all();
    
    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    
    $routes = [
        '/' => 'daily',
        '/tentang-kami' => 'weekly',
        '/layanan' => 'weekly',
        '/proyek' => 'weekly',
        '/semua-proyek' => 'weekly',
        '/blog' => 'daily'
    ];

    foreach ($routes as $route => $freq) {
        $xml .= '<url>';
        $xml .= '<loc>' . url($route) . '</loc>';
        $xml .= '<lastmod>' . now()->tz('UTC')->toAtomString() . '</lastmod>';
        $xml .= '<changefreq>' . $freq . '</changefreq>';
        $xml .= '<priority>' . ($route == '/' ? '1.0' : '0.8') . '</priority>';
        $xml .= '</url>';
    }

    foreach ($layanans as $layanan) {
        $xml .= '<url>';
        $xml .= '<loc>' . url("/layanan/{$layanan->id_layanan}") . '</loc>';
        $xml .= '<lastmod>' . ($layanan->updated_at ? $layanan->updated_at->tz('UTC')->toAtomString() : now()->tz('UTC')->toAtomString()) . '</lastmod>';
        $xml .= '<changefreq>monthly</changefreq>';
        $xml .= '<priority>0.7</priority>';
        $xml .= '</url>';
    }

    foreach ($proyeks as $proyek) {
        $xml .= '<url>';
        $xml .= '<loc>' . url("/proyek/{$proyek->prk_slug}") . '</loc>';
        $xml .= '<lastmod>' . ($proyek->updated_at ? $proyek->updated_at->tz('UTC')->toAtomString() : now()->tz('UTC')->toAtomString()) . '</lastmod>';
        $xml .= '<changefreq>monthly</changefreq>';
        $xml .= '<priority>0.7</priority>';
        $xml .= '</url>';
    }

    foreach ($blogs as $blog) {
        $xml .= '<url>';
        $xml .= '<loc>' . url("/blog/{$blog->slug}") . '</loc>';
        $xml .= '<lastmod>' . ($blog->updated_at ? $blog->updated_at->tz('UTC')->toAtomString() : now()->tz('UTC')->toAtomString()) . '</lastmod>';
        $xml .= '<changefreq>monthly</changefreq>';
        $xml .= '<priority>0.7</priority>';
        $xml .= '</url>';
    }

    $xml .= '</urlset>';
    
    return response($xml)->header('Content-Type', 'text/xml');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/pengaturan', [\App\Http\Controllers\Admin\PengaturanController::class, 'index'])->name('pengaturan');
        Route::post('/pengaturan', [\App\Http\Controllers\Admin\PengaturanController::class, 'update'])->name('pengaturan.update');
        Route::get('/tentang-beranda', [\App\Http\Controllers\Admin\TentangBerandaController::class, 'index'])->name('tentang-beranda');
        Route::post('/tentang-beranda', [\App\Http\Controllers\Admin\TentangBerandaController::class, 'update'])->name('tentang-beranda.update');
        Route::get('/tentang-kami', [\App\Http\Controllers\Admin\TentangKamiController::class, 'index'])->name('tentang-kami');
        Route::post('/tentang-kami', [\App\Http\Controllers\Admin\TentangKamiController::class, 'update'])->name('tentang-kami.update');
        Route::resource('/klien', \App\Http\Controllers\Admin\KlienController::class)->except(['create', 'show', 'edit']);
        Route::resource('/mitra', \App\Http\Controllers\Admin\MitraController::class)->except(['create', 'show', 'edit']);
        Route::resource('/keunggulan', \App\Http\Controllers\Admin\KeunggulanController::class)->except(['create', 'show', 'edit']);
        Route::resource('/faq', \App\Http\Controllers\Admin\FaqController::class)->except(['create', 'show', 'edit']);
        Route::resource('/layanan', \App\Http\Controllers\Admin\LayananController::class)->except(['create', 'show', 'edit']);
        Route::resource('/karir', \App\Http\Controllers\Admin\KarirController::class)->except(['create', 'show', 'edit']);
        Route::resource('/proyek', \App\Http\Controllers\Admin\ProyekController::class)->except(['create', 'show', 'edit']);
        Route::resource('/blog', \App\Http\Controllers\Admin\BlogController::class)->except(['create', 'show', 'edit']);
        Route::resource('/ulasan', \App\Http\Controllers\Admin\UlasanController::class)->except(['create', 'show', 'edit']);
        Route::resource('/video', \App\Http\Controllers\Admin\VideoController::class)->except(['create', 'show', 'edit']);
    });
});

require __DIR__.'/auth.php';
