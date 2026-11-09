<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaturan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PengaturanController extends Controller
{
    public function index()
    {
        $pengaturan = Pengaturan::all()->pluck('nilai', 'kunci');
        
        return Inertia::render('Admin/Pengaturan/Index', [
            'pengaturan' => $pengaturan
        ]);
    }

    /** Field upload dokumen legal pada form Pengaturan. */
    private const FILE_KEYS = ['nib_file', 'npwp_file', 'akta_file'];

    public function update(Request $request)
    {
        $request->validate([
            'email' => 'nullable|email|max:255',
            'nib_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'npwp_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'akta_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $data = $request->except(array_merge(['_token', '_method'], self::FILE_KEYS));

        foreach ($data as $kunci => $nilai) {
            // Hanya kunci sederhana (huruf kecil, angka, underscore) dan nilai skalar.
            if (! preg_match('/^[a-z0-9_]{1,100}$/', $kunci) || is_array($nilai)) {
                continue;
            }

            Pengaturan::updateOrCreate(['kunci' => $kunci], ['nilai' => $nilai]);
        }

        // File hanya disimpan jika benar-benar ada upload baru. Sebelumnya field
        // file yang kosong (null) ikut disimpan sehingga path dokumen lama terhapus
        // setiap kali admin menyimpan pengaturan.
        foreach (self::FILE_KEYS as $kunci) {
            if (! $request->hasFile($kunci)) {
                continue;
            }

            $lama = Pengaturan::where('kunci', $kunci)->value('nilai');
            if ($lama) {
                Storage::disk('public')->delete($lama);
            }

            Pengaturan::updateOrCreate(
                ['kunci' => $kunci],
                ['nilai' => $request->file($kunci)->store('dokumen', 'public')]
            );
        }

        Cache::forget('pengaturan_global');

        return redirect()->back()->with('success', 'Pengaturan Global berhasil diperbarui!');
    }
}
