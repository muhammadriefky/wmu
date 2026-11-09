<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\Karir;
use App\Models\Layanan;
use App\Models\Pengaturan;
use App\Models\Proyek;
use App\Models\Ulasan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Smoke test untuk halaman publik & aksi admin yang pernah bermasalah.
 */
class SmokeTest extends TestCase
{
    use RefreshDatabase;

    private function seedContent(): void
    {
        Layanan::create(['judul_layanan' => 'Sipil', 'slug' => 'sipil', 'status' => 'Published']);
        Layanan::create(['judul_layanan' => 'Draft L', 'slug' => 'draft-l', 'status' => 'Draft']);

        Proyek::create([
            'prk_judul' => 'Gedung A', 'prk_slug' => 'gedung-a', 'prk_klien' => 'PT X',
            'prk_tahun' => '2025', 'prk_status' => 'Published', 'prk_is_tampil' => 1,
            'prk_galeri' => json_encode(['proyek/galeri/a.jpg']),
        ]);

        Blog::create([
            'judul_blog' => 'Artikel', 'slug' => 'artikel', 'tanggal_terbit' => now(),
            'status' => 'Published', 'kategori' => 'Tips',
        ]);
        Blog::create([
            'judul_blog' => 'Rahasia', 'slug' => 'rahasia', 'tanggal_terbit' => now(),
            'status' => 'Draft',
        ]);

        Karir::create(['posisi' => 'Engineer', 'slug' => 'engineer', 'status_aktif' => 1]);
    }

    public function test_public_pages_render(): void
    {
        $this->seedContent();

        foreach (['/', '/tentang-kami', '/layanan', '/layanan/sipil', '/proyek', '/semua-proyek',
                  '/proyek/gedung-a', '/blog', '/blog?kategori=Tips', '/blog/artikel', '/karir', '/sitemap.xml'] as $url) {
            $this->get($url)->assertOk();
        }
    }

    public function test_draft_content_is_not_public(): void
    {
        $this->seedContent();

        $this->get('/layanan/draft-l')->assertNotFound();
        $this->get('/blog/rahasia')->assertNotFound();

        $this->get('/blog')->assertInertia(fn (Assert $page) => $page
            ->component('Blog/Index', false)
            ->has('blog.data', 1)
        );

        $sitemap = $this->get('/sitemap.xml')->getContent();
        $this->assertStringContainsString('/layanan/sipil', $sitemap);
        $this->assertStringNotContainsString('draft-l', $sitemap);
        $this->assertStringNotContainsString('rahasia', $sitemap);
    }

    public function test_public_review_is_saved_unapproved(): void
    {
        $this->post('/ulasan', [
            'nama_pemberi' => 'Budi', 'isi_ulasan' => 'Mantap', 'rating_bintang' => 5,
        ])->assertRedirect();

        $this->assertDatabaseHas('tr_ulasan', ['nama_pemberi' => 'Budi', 'status_disetujui' => 0]);
    }

    public function test_admin_can_store_and_update_ulasan(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/admin/ulasan', [
            'nama_pemberi' => 'Ani', 'isi_ulasan' => 'Bagus', 'rating_bintang' => 4, 'status_disetujui' => 1,
        ])->assertSessionHasNoErrors()->assertRedirect();

        $ulasan = Ulasan::firstOrFail();

        $this->actingAs($user)->put("/admin/ulasan/{$ulasan->id_ulasan}", [
            'nama_pemberi' => 'Ani', 'isi_ulasan' => 'Bagus sekali', 'rating_bintang' => 5, 'status_disetujui' => 0,
        ])->assertSessionHasNoErrors();

        $this->assertSame('Bagus sekali', $ulasan->fresh()->isi_ulasan);
        $this->assertSame((string) $user->id_pengguna, (string) $ulasan->fresh()->rec_usercreated);
    }

    public function test_toggle_tampil_does_not_wipe_gallery(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('proyek/galeri/a.jpg', 'x');
        $this->seedContent();
        $proyek = Proyek::firstOrFail();

        // Payload persis seperti toggleDisplay() di halaman admin (tanpa existing_galeri)
        $this->actingAs(User::factory()->create())->put("/admin/proyek/{$proyek->prk_id}", [
            'prk_judul' => 'Gedung A', 'prk_slug' => 'gedung-a', 'prk_klien' => 'PT X',
            'prk_tahun' => '2025', 'prk_status' => 'Published', 'prk_is_tampil' => false,
        ])->assertSessionHasNoErrors();

        $this->assertSame(['proyek/galeri/a.jpg'], json_decode($proyek->fresh()->prk_galeri, true));
        Storage::disk('public')->assertExists('proyek/galeri/a.jpg');
    }

    public function test_saving_pengaturan_keeps_existing_documents(): void
    {
        Storage::fake('public');
        Pengaturan::create(['kunci' => 'nib_file', 'nilai' => 'dokumen/nib.pdf']);

        $this->actingAs(User::factory()->create())->post('/admin/pengaturan', [
            'nama_pt' => 'PT Win Mulya Utama',
            'nib_file' => null,
        ])->assertSessionHasNoErrors();

        $this->assertSame('dokumen/nib.pdf', Pengaturan::where('kunci', 'nib_file')->value('nilai'));
        $this->assertSame('PT Win Mulya Utama', Pengaturan::where('kunci', 'nama_pt')->value('nilai'));

        $this->actingAs(User::factory()->create())->post('/admin/pengaturan', [
            'nib_file' => UploadedFile::fake()->create('nib-baru.pdf', 10, 'application/pdf'),
        ])->assertSessionHasNoErrors();

        $this->assertNotSame('dokumen/nib.pdf', Pengaturan::where('kunci', 'nib_file')->value('nilai'));
    }

    public function test_admin_pages_render(): void
    {
        $user = User::factory()->create();

        foreach (['pengaturan', 'tentang-beranda', 'tentang-kami', 'klien', 'mitra', 'keunggulan',
                  'faq', 'layanan', 'karir', 'proyek', 'blog', 'ulasan', 'video'] as $page) {
            $this->actingAs($user)->get("/admin/{$page}")->assertOk();
        }

        $this->actingAs($user)->get('/dashboard')->assertOk();
    }

    public function test_video_requires_valid_source(): void
    {
        $user = User::factory()->create();
        $base = ['judul_video' => 'Video QA', 'status' => 'Aktif'];

        // YouTube tanpa URL / dengan URL bukan YouTube ditolak
        $this->actingAs($user)->post('/admin/video', $base + ['sumber' => 'Youtube'])
            ->assertSessionHasErrors('url_video');
        $this->actingAs($user)->post('/admin/video', $base + ['sumber' => 'Youtube', 'url_video' => '#'])
            ->assertSessionHasErrors('url_video');
        $this->actingAs($user)->post('/admin/video', $base + ['sumber' => 'Youtube', 'url_video' => 'https://example.com/v'])
            ->assertSessionHasErrors('url_video');

        // Upload tanpa file ditolak
        $this->actingAs($user)->post('/admin/video', $base + ['sumber' => 'Upload'])
            ->assertSessionHasErrors('file_video');

        // URL YouTube valid diterima (termasuk format shorts)
        $this->actingAs($user)->post('/admin/video', $base + ['sumber' => 'Youtube', 'url_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'])
            ->assertSessionHasNoErrors();
        $this->actingAs($user)->post('/admin/video', $base + ['sumber' => 'Youtube', 'url_video' => 'https://youtube.com/shorts/dQw4w9WgXcQ'])
            ->assertSessionHasNoErrors();

        $this->assertSame(2, \App\Models\Video::count());
    }

    public function test_error_pages_are_branded(): void
    {
        $this->get('/halaman-tidak-ada')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page->component('Error', false)->where('status', 404));
    }

    public function test_robots_txt_points_to_sitemap(): void
    {
        $this->get('/robots.txt')
            ->assertOk()
            ->assertSee('Sitemap: ' . url('/sitemap.xml'), false)
            ->assertSee('Disallow: /admin/', false);
    }
}
