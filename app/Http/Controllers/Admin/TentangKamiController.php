<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TentangKami;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TentangKamiController extends Controller
{
    public function index()
    {
        $tentang = TentangKami::first();
        if (!$tentang) {
            $tentang = TentangKami::create();
        }

        return Inertia::render('Admin/TentangKami/Index', [
            'tentang' => $tentang
        ]);
    }

    public function update(Request $request)
    {
        $tentang = TentangKami::first();
        
        $validated = $request->validate([
            'judul_hero' => 'nullable|string|max:255',
            'deskripsi_hero' => 'nullable|string',
            'sejarah_perusahaan' => 'nullable|array',
            'nilai_perusahaan' => 'nullable|array',
            'struktur_organisasi_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('struktur_organisasi_image')) {
            if ($tentang->struktur_organisasi_image) {
                Storage::disk('public')->delete($tentang->struktur_organisasi_image);
            }
            $validated['struktur_organisasi_image'] = $request->file('struktur_organisasi_image')->store('images/tentangkami', 'public');
        }

        $tentang->update($validated);

        return redirect()->back()->with('message', 'Konten Halaman Tentang Kami berhasil diperbarui!');
    }
}
