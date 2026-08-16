<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'pengaturan' => function () {
                return \Illuminate\Support\Facades\Cache::rememberForever('pengaturan_global', function () {
                    return \App\Models\Pengaturan::all()->pluck('nilai', 'kunci')->toArray();
                });
            },
            'has_karir_aktif' => function () {
                return \App\Models\Karir::where('status_aktif', 1)->exists();
            },
        ];
    }
}
