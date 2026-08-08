<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $layanan = \App\Models\Layanan::take(6)->get();
    $keunggulan = \App\Models\Keunggulan::orderBy('urutan', 'asc')->get();
    $klien = \App\Models\Klien::orderBy('urutan', 'asc')->get();
    $ulasan = \App\Models\Ulasan::where('status_disetujui', 1)->orderBy('id_ulasan', 'desc')->take(6)->get();
    $proyek = \App\Models\Proyek::where('prk_status', 'Published')->where('prk_is_tampil', 1)->orderBy('prk_tahun', 'desc')->take(6)->get();
    $blog = \App\Models\Blog::orderBy('tanggal_terbit', 'desc')->take(3)->get();
    $faq = \App\Models\Faq::orderBy('urutan', 'asc')->get();

    return Inertia::render('Welcome', [
        'layanan' => $layanan,
        'keunggulan' => $keunggulan,
        'klien' => $klien,
        'ulasan' => $ulasan,
        'proyek' => $proyek,
        'blog' => $blog,
        'faq' => $faq,
    ]);
})->name('home');

Route::get('/tentang-kami', function () {
    return Inertia::render('TentangKami');
})->name('tentang');

Route::get('/layanan', function () {
    $layanan = \App\Models\Layanan::all();
    $klien = \App\Models\Klien::all();
    return Inertia::render('Layanan', [
        'layanan' => $layanan,
        'klien' => $klien,
        'layananTambahan' => [] // Placeholder for when LayananTambahan backend is created
    ]);
})->name('layanan');

Route::get('/proyek', function () {
    $proyek = \App\Models\Proyek::where('prk_status', 'Published')->where('prk_is_tampil', 1)->orderBy('prk_tahun', 'desc')->get();
    return Inertia::render('Proyek', ['proyek' => $proyek]);
})->name('proyek');

Route::get('/blog', function () {
    $blog = \App\Models\Blog::orderBy('tanggal_terbit', 'desc')->paginate(9);
    return Inertia::render('Blog/Index', ['blog' => $blog]);
})->name('blog');

Route::get('/blog/{slug}', function ($slug) {
    $blog = \App\Models\Blog::where('slug', $slug)->firstOrFail();
    return Inertia::render('Blog/Show', ['blog' => $blog]);
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
        Route::resource('/klien', \App\Http\Controllers\Admin\KlienController::class)->except(['create', 'show', 'edit']);
        Route::resource('/mitra', \App\Http\Controllers\Admin\MitraController::class)->except(['create', 'show', 'edit']);
        Route::resource('/keunggulan', \App\Http\Controllers\Admin\KeunggulanController::class)->except(['create', 'show', 'edit']);
        Route::resource('/faq', \App\Http\Controllers\Admin\FaqController::class)->except(['create', 'show', 'edit']);
        Route::resource('/layanan', \App\Http\Controllers\Admin\LayananController::class)->except(['create', 'show', 'edit']);
        Route::resource('/karir', \App\Http\Controllers\Admin\KarirController::class)->except(['create', 'show', 'edit']);
        Route::resource('/proyek', \App\Http\Controllers\Admin\ProyekController::class)->except(['create', 'show', 'edit']);
        Route::resource('/blog', \App\Http\Controllers\Admin\BlogController::class)->except(['create', 'show', 'edit']);
        Route::resource('/ulasan', \App\Http\Controllers\Admin\UlasanController::class)->except(['create', 'show', 'edit']);
    });
});

require __DIR__.'/auth.php';
