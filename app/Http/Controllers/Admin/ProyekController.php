<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Proyek;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProyekController extends Controller
{
    public function index()
    {
        $proyek = Proyek::orderBy('prk_id', 'desc')->get();
        
        $stats = [
            'total' => $proyek->count(),
            'aktif' => $proyek->where('prk_status', 'Published')->count(),
            'proyek_unggulan' => $proyek->where('prk_is_unggulan', 1)->count(),
            'total_views' => $proyek->sum('prk_dilihat'),
            'baru_bulan_ini' => $proyek->where('rec_datecreated', '>=', Carbon::now()->subDays(30))->count(),
        ];

        return Inertia::render('Admin/Proyek/Index', [
            'proyek' => $proyek,
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'prk_is_tampil' => filter_var($request->prk_is_tampil, FILTER_VALIDATE_BOOLEAN),
            'prk_is_unggulan' => filter_var($request->prk_is_unggulan, FILTER_VALIDATE_BOOLEAN),
        ]);

        $request->validate([
            'prk_judul' => 'required|string|max:255',
            'prk_slug' => 'required|string|max:255',
            'prk_klien' => 'required|string|max:255',
            'prk_tahun' => 'required|string|max:4',
            'prk_gambar' => 'nullable|image|max:2048',
            'prk_kategori' => 'nullable|string|max:255',
            'prk_status' => 'nullable|string|max:255',
            'prk_is_tampil' => 'nullable|boolean',
            'prk_is_unggulan' => 'nullable|boolean',
            'prk_dilihat' => 'nullable|integer',
            'prk_deskripsi' => 'nullable|string',
            'prk_tantangan' => 'nullable|string',
            'prk_solusi' => 'nullable|string',
            'prk_hasil' => 'nullable|string',
            'prk_luas' => 'nullable|string|max:255',
            'prk_galeri.*' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['prk_gambar', 'prk_galeri']);

        if ($request->hasFile('prk_gambar')) {
            $data['prk_gambar'] = $request->file('prk_gambar')->store('proyek', 'public');
        }

        if ($request->hasFile('prk_galeri')) {
            $galeriPaths = [];
            foreach ($request->file('prk_galeri') as $file) {
                $galeriPaths[] = $file->store('proyek/galeri', 'public');
            }
            $data['prk_galeri'] = json_encode($galeriPaths);
        }

        Proyek::create($data);

        return redirect()->back()->with('success', 'Proyek berhasil ditambahkan!');
    }

    public function update(Request $request, Proyek $proyek)
    {
        $request->merge([
            'prk_is_tampil' => filter_var($request->prk_is_tampil, FILTER_VALIDATE_BOOLEAN),
            'prk_is_unggulan' => filter_var($request->prk_is_unggulan, FILTER_VALIDATE_BOOLEAN),
        ]);

        $request->validate([
            'prk_judul' => 'required|string|max:255',
            'prk_slug' => 'required|string|max:255',
            'prk_klien' => 'required|string|max:255',
            'prk_tahun' => 'required|string|max:4',
            'prk_gambar' => 'nullable|image|max:2048',
            'prk_kategori' => 'nullable|string|max:255',
            'prk_status' => 'nullable|string|max:255',
            'prk_is_tampil' => 'nullable|boolean',
            'prk_is_unggulan' => 'nullable|boolean',
            'prk_dilihat' => 'nullable|integer',
            'prk_deskripsi' => 'nullable|string',
            'prk_tantangan' => 'nullable|string',
            'prk_solusi' => 'nullable|string',
            'prk_hasil' => 'nullable|string',
            'prk_luas' => 'nullable|string|max:255',
            'prk_galeri.*' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['prk_gambar', 'prk_galeri', 'existing_galeri']);

        if ($request->hasFile('prk_gambar')) {
            if ($proyek->prk_gambar) {
                Storage::disk('public')->delete($proyek->prk_gambar);
            }
            $data['prk_gambar'] = $request->file('prk_gambar')->store('proyek', 'public');
        }

        // Handle gallery updates
        $existingGaleri = $request->input('existing_galeri', []);
        $currentGaleri = $proyek->prk_galeri ? json_decode($proyek->prk_galeri, true) : [];
        
        // Delete removed images
        if (is_array($currentGaleri)) {
            foreach ($currentGaleri as $oldImg) {
                if (!in_array($oldImg, $existingGaleri)) {
                    Storage::disk('public')->delete($oldImg);
                }
            }
        }
        
        $galeriPaths = $existingGaleri;

        if ($request->hasFile('prk_galeri')) {
            foreach ($request->file('prk_galeri') as $file) {
                $galeriPaths[] = $file->store('proyek/galeri', 'public');
            }
        }
        $data['prk_galeri'] = count($galeriPaths) > 0 ? json_encode($galeriPaths) : null;

        $proyek->update($data);

        return redirect()->back()->with('success', 'Proyek berhasil diperbarui!');
    }

    public function destroy(Proyek $proyek)
    {
        if ($proyek->prk_gambar) {
            Storage::disk('public')->delete($proyek->prk_gambar);
        }
        
        if ($proyek->prk_galeri) {
            $galeri = json_decode($proyek->prk_galeri, true);
            if (is_array($galeri)) {
                foreach ($galeri as $img) {
                    Storage::disk('public')->delete($img);
                }
            }
        }
        
        $proyek->delete();

        return redirect()->back()->with('success', 'Proyek berhasil dihapus!');
    }
}
