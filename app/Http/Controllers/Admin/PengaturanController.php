<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaturan;
use Illuminate\Http\Request;
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

    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method']);
        
        foreach ($data as $kunci => $nilai) {
            if ($request->hasFile($kunci)) {
                $nilai = $request->file($kunci)->store('dokumen', 'public');
            }
            
            // Only update if value is not null, so we don't clear existing file paths if no new file is uploaded
            if ($nilai !== null || $request->hasFile($kunci) === false) {
                \App\Models\Pengaturan::updateOrCreate(
                    ['kunci' => $kunci],
                    ['nilai' => $nilai]
                );
            }
        }
        \Illuminate\Support\Facades\Cache::forget('pengaturan_global');
        
        return redirect()->back()->with('success', 'Pengaturan Global berhasil diperbarui!');
    }
}
