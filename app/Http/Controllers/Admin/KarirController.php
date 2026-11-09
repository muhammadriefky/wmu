<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Karir;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KarirController extends Controller
{
    public function index(Request $request)
    {
        $query = Karir::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('posisi', 'like', "%{$search}%")
                  ->orWhere('persyaratan', 'like', "%{$search}%");
            });
        }

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'Terbaru') {
                $query->orderBy('id_karir', 'desc');
            } elseif ($sort === 'Terlama') {
                $query->orderBy('id_karir', 'asc');
            }
        } else {
            $query->orderBy('id_karir', 'desc');
        }

        $karir = $query->paginate(10)->withQueryString();

        $stats = [
            'total' => Karir::count(),
            'aktif' => Karir::where('status_aktif', 1)->count(),
            'nonaktif' => Karir::where('status_aktif', 0)->count(),
        ];

        return Inertia::render('Admin/Karir/Index', [
            'karir' => $karir,
            'stats' => $stats,
            'filters' => (object) $request->only(['search', 'sort'])
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'posisi' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:ms_karir,slug',
            'persyaratan' => 'nullable|string',
            'status_aktif' => 'required|boolean'
        ]);

        Karir::create($data);

        return redirect()->back()->with('success', 'Karir berhasil ditambahkan!');
    }

    public function update(Request $request, Karir $karir)
    {
        $data = $request->validate([
            'posisi' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:ms_karir,slug,' . $karir->id_karir . ',id_karir',
            'persyaratan' => 'nullable|string',
            'status_aktif' => 'required|boolean'
        ]);

        $karir->update($data);

        return redirect()->back()->with('success', 'Karir berhasil diperbarui!');
    }

    public function destroy(Karir $karir)
    {
        $karir->delete();

        return redirect()->back()->with('success', 'Karir berhasil dihapus!');
    }
}
