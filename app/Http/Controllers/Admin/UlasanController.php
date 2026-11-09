<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ulasan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UlasanController extends Controller
{
    public function index(Request $request)
    {
        $query = Ulasan::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_pemberi', 'like', "%{$search}%")
                  ->orWhere('isi_ulasan', 'like', "%{$search}%");
            });
        }

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'Terbaru') {
                $query->orderBy('id_ulasan', 'desc');
            } elseif ($sort === 'Terlama') {
                $query->orderBy('id_ulasan', 'asc');
            } elseif ($sort === 'Rating Tertinggi') {
                $query->orderBy('rating_bintang', 'desc');
            } elseif ($sort === 'Rating Terendah') {
                $query->orderBy('rating_bintang', 'asc');
            }
        } else {
            $query->orderBy('id_ulasan', 'desc');
        }

        $ulasan = $query->paginate(10)->withQueryString();

        $stats = [
            'total' => Ulasan::count(),
            'tampil' => Ulasan::where('status_disetujui', 1)->count(),
            'disembunyikan' => Ulasan::where('status_disetujui', 0)->count(),
            'avg_rating' => number_format(Ulasan::avg('rating_bintang') ?? 0, 1)
        ];

        return Inertia::render('Admin/Ulasan/Index', [
            'ulasan' => $ulasan,
            'stats' => $stats,
            'filters' => (object) $request->only(['search', 'sort'])
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_pemberi' => 'required|string|max:255',
            'isi_ulasan' => 'nullable|string',
            'rating_bintang' => 'required|integer|min:1|max:5',
            'status_disetujui' => 'required|boolean'
        ]);
        
        Ulasan::create($data);

        return redirect()->back()->with('success', 'Ulasan berhasil ditambahkan!');
    }

    public function update(Request $request, Ulasan $ulasan)
    {
        $data = $request->validate([
            'nama_pemberi' => 'required|string|max:255',
            'isi_ulasan' => 'nullable|string',
            'rating_bintang' => 'required|integer|min:1|max:5',
            'status_disetujui' => 'required|boolean'
        ]);
        
        $ulasan->update($data);

        return redirect()->back()->with('success', 'Ulasan berhasil diperbarui!');
    }

    public function destroy(Ulasan $ulasan)
    {
        
        $ulasan->delete();

        return redirect()->back()->with('success', 'Ulasan berhasil dihapus!');
    }
}
