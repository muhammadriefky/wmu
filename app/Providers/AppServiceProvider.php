<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Kunci pengaman: di production, perintah yang menghapus struktur/data
        // database (migrate:fresh, migrate:refresh, migrate:reset, db:wipe)
        // akan ditolak. `php artisan migrate` biasa tetap boleh.
        DB::prohibitDestructiveCommands($this->app->isProduction());

        $models = [
            \App\Models\User::class,
            \App\Models\Pengaturan::class,
            \App\Models\Keunggulan::class,
            \App\Models\Klien::class,
            \App\Models\Mitra::class,
            \App\Models\Faq::class,
            \App\Models\Layanan::class,
            \App\Models\Karir::class,
            \App\Models\Ulasan::class,
            \App\Models\Proyek::class,
            \App\Models\Blog::class,
            \App\Models\Video::class,
        ];
        foreach ($models as $model) {
            $model::observe(\App\Observers\AuditTrailObserver::class);
        }
    }
}
