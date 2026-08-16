<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TentangBeranda;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TentangBerandaController extends Controller
{
    public function index()
    {
        $tentang = TentangBeranda::first();
        if (!$tentang) {
            $tentang = TentangBeranda::create();
        }

        return Inertia::render('Admin/TentangBeranda/Index', [
            'tentang' => $tentang
        ]);
    }

    public function update(Request $request)
    {
        $tentang = TentangBeranda::first();
        
        $validated = $request->validate([
            'judul' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'angka_pengalaman' => 'nullable|string|max:50',
            'teks_pengalaman' => 'nullable|string|max:100',
            'teks_komitmen' => 'nullable|string',
            'video_file' => 'nullable|file|mimes:mp4,webm,avi,mov|max:51200',
            'video_poster' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('video_file')) {
            if ($tentang->video_file) {
                Storage::disk('public')->delete($tentang->video_file);
            }
            $validated['video_file'] = $request->file('video_file')->store('videos/beranda', 'public');
        }

        if ($request->hasFile('video_poster')) {
            if ($tentang->video_poster) {
                Storage::disk('public')->delete($tentang->video_poster);
            }
            $validated['video_poster'] = $request->file('video_poster')->store('images/beranda', 'public');
        }

        $tentang->update($validated);

        return redirect()->back()->with('message', 'Konten Tentang Beranda berhasil diperbarui!');
    }
}
