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
        $klien = Klien::orderBy('urutan', 'asc')->orderBy('id_klien', 'desc')->get();
        return Inertia::render('Admin/Klien/Index', [
            'klien' => $klien
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_klien' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'urutan' => 'required|integer'
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
        $request->validate([
            'nama_klien' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'urutan' => 'required|integer'
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
