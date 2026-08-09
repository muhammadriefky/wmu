<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Klien;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KlienController extends Controller
{
    public function index()
    {
        $klien = Klien::withCount('proyek')->orderBy('urutan', 'asc')->orderBy('id_klien', 'desc')->get();
        
        $stats = [
            'total' => Klien::count(),
            'aktif' => Klien::where('status_aktif', 1)->count(),
            'proyek' => \App\Models\Proyek::count(),
            'testimoni' => \App\Models\Ulasan::count(),
        ];

        return Inertia::render('Admin/Klien/Index', [
            'klien' => $klien,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'status_aktif' => filter_var($request->status_aktif, FILTER_VALIDATE_BOOLEAN),
        ]);

        $request->validate([
            'nama_klien' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:50',
            'logo' => 'nullable|image|max:2048',
            'urutan' => 'required|integer',
            'kategori' => 'nullable|string|max:100',
            'status_aktif' => 'nullable|boolean'
        ]);

        $data = $request->except('logo');

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('klien', 'public');
        }

        Klien::create($data);

        return redirect()->back()->with('success', 'Klien berhasil ditambahkan!');
    }

    public function update(Request $request, Klien $klien)
    {
        $request->merge([
            'status_aktif' => filter_var($request->status_aktif, FILTER_VALIDATE_BOOLEAN),
        ]);

        $request->validate([
            'nama_klien' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:50',
            'logo' => 'nullable|image|max:2048',
            'urutan' => 'required|integer',
            'kategori' => 'nullable|string|max:100',
            'status_aktif' => 'nullable|boolean'
        ]);

        $data = $request->except('logo');

        if ($request->hasFile('logo')) {
            if ($klien->logo) {
                Storage::disk('public')->delete($klien->logo);
            }
            $data['logo'] = $request->file('logo')->store('klien', 'public');
        }

        $klien->update($data);

        return redirect()->back()->with('success', 'Klien berhasil diperbarui!');
    }

    public function destroy(Klien $klien)
    {
        if ($klien->logo) {
            Storage::disk('public')->delete($klien->logo);
        }
        $klien->delete();

        return redirect()->back()->with('success', 'Klien berhasil dihapus!');
    }
}
