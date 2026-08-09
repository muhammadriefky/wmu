<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use App\Models\Proyek;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LayananController extends Controller
{
    public function index(Request $request)
    {
        $query = Layanan::query();
        
        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('judul_layanan', 'like', '%' . $request->search . '%')
                  ->orWhere('slug', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('kategori') && $request->kategori !== 'Semua Kategori' && $request->kategori !== '') {
            $query->where('kategori', $request->kategori);
        }

        if ($request->filled('sort')) {
            if ($request->sort === 'Terbaru') {
                $query->orderBy('id_layanan', 'desc');
            } elseif ($request->sort === 'Terlama') {
                $query->orderBy('id_layanan', 'asc');
            }
        } else {
            $query->orderBy('id_layanan', 'desc');
        }

        $layanan = $query->paginate(10)->withQueryString();

        $stats = [
            'total' => Layanan::count(),
            'aktif' => Layanan::where('status', 'Published')->count(),
            'unggulan' => Layanan::where('is_unggulan', true)->count(),
            'views' => Layanan::sum('views'),
            'baru' => Layanan::where('rec_datecreated', '>=', now()->subDays(30))->count(),
        ];

        $proyek = Proyek::orderBy('prk_id', 'desc')->get();
        return Inertia::render('Admin/Layanan/Index', [
            'layanan' => $layanan,
            'proyek' => $proyek,
            'stats' => $stats,
            'filters' => (object) $request->only(['search', 'kategori', 'sort'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul_layanan' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|max:2048',
            'keunggulan_layanan' => 'nullable|array',
            'proyek_terkait' => 'nullable|array',
            'cta_text' => 'nullable|string|max:255',
            'cta_link' => 'nullable|string|max:255',
            'kategori' => 'nullable|string|max:100',
            'status' => 'required|string|max:20',
            'is_unggulan' => 'boolean',
            'deskripsi_lengkap' => 'nullable|string',
            'fitur_layanan' => 'nullable|array',
            'proses_kerja' => 'nullable|array',
            'gambar_detail' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['gambar', 'gambar_detail']);
        $data['is_unggulan'] = $request->boolean('is_unggulan');
        
        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('layanan', 'public');
        }

        if ($request->hasFile('gambar_detail')) {
            $data['gambar_detail'] = $request->file('gambar_detail')->store('layanan', 'public');
        }

        Layanan::create($data);

        return redirect()->back()->with('success', 'Layanan berhasil ditambahkan!');
    }

    public function update(Request $request, Layanan $layanan)
    {
        $request->validate([
            'judul_layanan' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|max:2048',
            'keunggulan_layanan' => 'nullable|array',
            'proyek_terkait' => 'nullable|array',
            'cta_text' => 'nullable|string|max:255',
            'cta_link' => 'nullable|string|max:255',
            'kategori' => 'nullable|string|max:100',
            'status' => 'required|string|max:20',
            'is_unggulan' => 'boolean',
            'deskripsi_lengkap' => 'nullable|string',
            'fitur_layanan' => 'nullable|array',
            'proses_kerja' => 'nullable|array',
            'gambar_detail' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['gambar', 'gambar_detail']);
        $data['is_unggulan'] = $request->boolean('is_unggulan');
        
        if ($request->hasFile('gambar')) {
            if ($layanan->gambar) {
                Storage::disk('public')->delete($layanan->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('layanan', 'public');
        }

        if ($request->hasFile('gambar_detail')) {
            if ($layanan->gambar_detail) {
                Storage::disk('public')->delete($layanan->gambar_detail);
            }
            $data['gambar_detail'] = $request->file('gambar_detail')->store('layanan', 'public');
        }

        $layanan->update($data);

        return redirect()->back()->with('success', 'Layanan berhasil diperbarui!');
    }

    public function destroy(Layanan $layanan)
    {
        
        if ($layanan->gambar) {
            Storage::disk('public')->delete($layanan->gambar);
        }
        if ($layanan->gambar_detail) {
            Storage::disk('public')->delete($layanan->gambar_detail);
        }
        $layanan->delete();

        return redirect()->back()->with('success', 'Layanan berhasil dihapus!');
    }
}
