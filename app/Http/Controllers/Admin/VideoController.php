<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $query = Video::query();

        if ($request->filled('search')) {
            $query->where('judul_video', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('sort')) {
            if ($request->sort === 'Terbaru') {
                $query->orderBy('id_video', 'desc');
            } elseif ($request->sort === 'Terlama') {
                $query->orderBy('id_video', 'asc');
            }
        } else {
            $query->orderBy('id_video', 'desc');
        }

        $videos = $query->paginate(10)->withQueryString();

        $stats = [
            'total' => Video::count(),
            'aktif' => Video::where('status', 'Aktif')->count(),
            'tidak_aktif' => Video::where('status', 'Tidak Aktif')->count(),
        ];

        return Inertia::render('Admin/Video/Index', [
            'videos' => $videos,
            'stats' => $stats,
            'filters' => (object) $request->only(['search', 'sort'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul_video' => 'required|string|max:255',
            'sumber' => 'required|in:Youtube,Upload',
            'durasi' => 'nullable|string|max:50',
            'url_video' => 'nullable|string|max:255',
            'file_video' => 'nullable|mimes:mp4,mov,avi,webm|max:51200',
            'status' => 'required|in:Aktif,Tidak Aktif',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('videos/thumbnails', 'public');
        }

        if ($request->hasFile('file_video')) {
            $validated['file_video'] = $request->file('file_video')->store('videos/files', 'public');
        }

        $validated['rec_usercreated'] = 'admin'; // Hardcode for now or use Auth::user()->name

        Video::create($validated);

        return redirect()->back()->with('message', 'Video berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $video = Video::findOrFail($id);
        
        $validated = $request->validate([
            'judul_video' => 'required|string|max:255',
            'sumber' => 'required|in:Youtube,Upload',
            'durasi' => 'nullable|string|max:50',
            'url_video' => 'nullable|string|max:255',
            'file_video' => 'nullable|mimes:mp4,mov,avi,webm|max:51200',
            'status' => 'required|in:Aktif,Tidak Aktif',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            if ($video->gambar) {
                Storage::disk('public')->delete($video->gambar);
            }
            $validated['gambar'] = $request->file('gambar')->store('videos/thumbnails', 'public');
        }

        if ($request->hasFile('file_video')) {
            if ($video->file_video) {
                Storage::disk('public')->delete($video->file_video);
            }
            $validated['file_video'] = $request->file('file_video')->store('videos/files', 'public');
        }

        // Clean up based on sumber
        if ($validated['sumber'] === 'Youtube') {
            if ($video->file_video && !$request->hasFile('file_video')) {
                Storage::disk('public')->delete($video->file_video);
            }
            $validated['file_video'] = null;
        } else {
            $validated['url_video'] = null;
        }

        $validated['rec_userupdate'] = 'admin';

        $video->update($validated);

        return redirect()->back()->with('message', 'Video berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $video = Video::findOrFail($id);
        if ($video->gambar) {
            Storage::disk('public')->delete($video->gambar);
        }
        if ($video->file_video) {
            Storage::disk('public')->delete($video->file_video);
        }
        $video->delete();

        return redirect()->back()->with('message', 'Video berhasil dihapus!');
    }
}
