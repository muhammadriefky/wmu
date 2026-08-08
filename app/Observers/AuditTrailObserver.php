<?php

namespace App\Observers;

use Illuminate\Support\Facades\Auth;

class AuditTrailObserver
{
    /**
     * Handle the Model "creating" event.
     */
    public function creating($model): void
    {
        $userId = Auth::check() ? Auth::id() : 'System';
        $model->rec_usercreated = $userId;
        $model->rec_userupdate = $userId;
    }

    /**
     * Handle the Model "updating" event.
     */
    public function updating($model): void
    {
        $userId = Auth::check() ? Auth::id() : 'System';
        $model->rec_userupdate = $userId;
    }
}
