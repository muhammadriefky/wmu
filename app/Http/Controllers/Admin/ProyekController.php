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
        $data = $this->validateProyek($request);

        if ($request->hasFile('prk_gambar')) {
            $data['prk_gambar'] = $request->file('prk_gambar')->store('proyek', 'public');
        }

        $galeriPaths = [];
        foreach ($request->file('prk_galeri', []) as $file) {
            $galeriPaths[] = $file->store('proyek/galeri', 'public');
        }
        $data['prk_galeri'] = count($galeriPaths) > 0 ? json_encode($galeriPaths) : null;

        Proyek::create($data);

        return redirect()->back()->with('success', 'Proyek berhasil ditambahkan!');
    }

    public function update(Request $request, Proyek $proyek)
    {
        $data = $this->validateProyek($request, $proyek);

        if ($request->hasFile('prk_gambar')) {
            if ($proyek->prk_gambar) {
                Storage::disk('public')->delete($proyek->prk_gambar);
            }
            $data['prk_gambar'] = $request->file('prk_gambar')->store('proyek', 'public');
        }

        // Galeri hanya disinkronkan bila request berasal dari form edit lengkap
        // (flag sync_galeri). Request parsial seperti toggle "tampil" tidak boleh
        // menyentuh galeri — sebelumnya toggle menghapus seluruh foto galeri.
        if ($request->boolean('sync_galeri')) {
            $currentGaleri = json_decode($proyek->prk_galeri ?? '[]', true);
            $currentGaleri = is_array($currentGaleri) ? $currentGaleri : [];

            // Hanya terima path yang memang milik proyek ini (cegah client
            // menyisipkan path file lain di storage).
            $existingGaleri = array_values(array_intersect(
                $currentGaleri,
                (array) $request->input('existing_galeri', [])
            ));

            foreach (array_diff($currentGaleri, $existingGaleri) as $oldImg) {
                Storage::disk('public')->delete($oldImg);
            }

            $galeriPaths = $existingGaleri;
            foreach ($request->file('prk_galeri', []) as $file) {
                $galeriPaths[] = $file->store('proyek/galeri', 'public');
            }
            $data['prk_galeri'] = count($galeriPaths) > 0 ? json_encode($galeriPaths) : null;
        }

        $proyek->update($data);

        return redirect()->back()->with('success', 'Proyek berhasil diperbarui!');
    }

    private function validateProyek(Request $request, ?Proyek $proyek = null): array
    {
        $request->merge([
            'prk_is_tampil' => filter_var($request->prk_is_tampil, FILTER_VALIDATE_BOOLEAN),
            'prk_is_unggulan' => filter_var($request->prk_is_unggulan, FILTER_VALIDATE_BOOLEAN),
        ]);

        $slugRule = 'required|string|max:255|unique:tr_proyek,prk_slug'
            . ($proyek ? ',' . $proyek->prk_id . ',prk_id' : '');

        $data = $request->validate([
            'prk_judul' => 'required|string|max:255',
            'prk_slug' => $slugRule,
            'prk_klien' => 'required|string|max:255',
            'prk_tahun' => 'required|string|max:4',
            'prk_gambar' => 'nullable|image|max:2048',
            'prk_kategori' => 'nullable|string|max:255',
            'prk_status' => 'nullable|string|max:255',
            'prk_is_tampil' => 'nullable|boolean',
            'prk_is_unggulan' => 'nullable|boolean',
            'prk_deskripsi' => 'nullable|string',
            'prk_tantangan' => 'nullable|string',
            'prk_solusi' => 'nullable|string',
            'prk_hasil' => 'nullable|string',
            'prk_luas' => 'nullable|string|max:255',
            'prk_galeri' => 'nullable|array',
            'prk_galeri.*' => 'image|max:2048',
            'existing_galeri' => 'nullable|array',
            'existing_galeri.*' => 'string',
        ]);

        // File & field bantu ditangani terpisah, jangan ikut mass-assignment.
        unset($data['prk_gambar'], $data['prk_galeri'], $data['existing_galeri']);

        // Kolom NOT NULL (default 'Draft') tidak boleh di-set null.
        $data['prk_status'] = $data['prk_status'] ?? 'Draft';

        return $data;
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
