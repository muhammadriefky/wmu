<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Proyek;

class MitraController extends Controller
{
    public function index()
    {
        $mitra = Mitra::orderBy('urutan', 'asc')->orderBy('id_mitra', 'desc')->get();
        
        $stats = [
            'total' => $mitra->count(),
            'aktif' => $mitra->where('status_aktif', 1)->count(),
            'kategori' => $mitra->whereNotNull('kategori')->where('kategori', '!=', '')->unique('kategori')->count(),
            'proyek' => Proyek::count(),
        ];

        return Inertia::render('Admin/Mitra/Index', [
            'mitra' => $mitra,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_mitra' => 'required|string|max:255',
            'urutan' => 'required|integer',
            'kategori' => 'nullable|string|max:255',
            'status_aktif' => 'boolean',
            'logo' => 'nullable|image|max:2048'
        ]);

        unset($data['logo']);
        
        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('mitra', 'public');
        }

        Mitra::create($data);

        return redirect()->back()->with('success', 'Mitra berhasil ditambahkan!');
    }

    public function update(Request $request, Mitra $mitra)
    {
        $data = $request->validate([
            'nama_mitra' => 'required|string|max:255',
            'urutan' => 'required|integer',
            'kategori' => 'nullable|string|max:255',
            'status_aktif' => 'boolean',
            'logo' => 'nullable|image|max:2048'
        ]);

        unset($data['logo']);
        
        if ($request->hasFile('logo')) {
            if ($mitra->logo) {
                Storage::disk('public')->delete($mitra->logo);
            }
            $data['logo'] = $request->file('logo')->store('mitra', 'public');
        }

        $mitra->update($data);

        return redirect()->back()->with('success', 'Mitra berhasil diperbarui!');
    }

    public function destroy(Mitra $mitra)
    {
        
        if ($mitra->logo) {
            Storage::disk('public')->delete($mitra->logo);
        }
        $mitra->delete();

        return redirect()->back()->with('success', 'Mitra berhasil dihapus!');
    }
}
