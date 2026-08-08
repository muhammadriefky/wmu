<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class MitraController extends Controller
{
    public function index()
    {
        $mitra = Mitra::orderBy('urutan', 'asc')->orderBy('id_mitra', 'desc')->get();
        return Inertia::render('Admin/Mitra/Index', [
            'mitra' => $mitra
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_mitra' => 'required|string|max:255',
            'urutan' => 'required|integer',
            'logo' => 'nullable|image|max:2048|nullable'
        ]);

        $data = $request->except('logo');
        
        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('mitra', 'public');
        }

        Mitra::create($data);

        return redirect()->back()->with('success', 'Mitra berhasil ditambahkan!');
    }

    public function update(Request $request, Mitra $mitra)
    {
        $request->validate([
            'nama_mitra' => 'required|string|max:255',
            'urutan' => 'required|integer',
            'logo' => 'nullable|image|max:2048|nullable'
        ]);

        $data = $request->except('logo');
        
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
