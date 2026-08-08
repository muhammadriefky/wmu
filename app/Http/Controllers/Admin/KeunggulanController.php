<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Keunggulan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KeunggulanController extends Controller
{
    public function index()
    {
        $keunggulan = Keunggulan::orderBy('urutan', 'asc')->orderBy('id_keunggulan', 'desc')->get();
        
        $stats = [
            'total' => $keunggulan->count(),
            'aktif' => $keunggulan->where('status_aktif', 1)->count(),
            'terakhir_diperbarui' => $keunggulan->max('rec_dateupdate') ? \Carbon\Carbon::parse($keunggulan->max('rec_dateupdate'))->locale('id')->diffForHumans() : '-',
            'urutan_tertinggi' => $keunggulan->min('urutan') ?: '-',
        ];

        return Inertia::render('Admin/Keunggulan/Index', [
            'keunggulan' => $keunggulan,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'ikon' => 'nullable|string|max:255',
            'urutan' => 'required|integer',
            'status_aktif' => 'boolean'
        ]);
        

        Keunggulan::create($data);

        return redirect()->back()->with('success', 'Keunggulan berhasil ditambahkan!');
    }

    public function update(Request $request, Keunggulan $keunggulan)
    {
        $data = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'ikon' => 'nullable|string|max:255',
            'urutan' => 'required|integer',
            'status_aktif' => 'boolean'
        ]);
        

        $keunggulan->update($data);

        return redirect()->back()->with('success', 'Keunggulan berhasil diperbarui!');
    }

    public function destroy(Keunggulan $keunggulan)
    {
        
        $keunggulan->delete();

        return redirect()->back()->with('success', 'Keunggulan berhasil dihapus!');
    }
}
