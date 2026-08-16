<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tr_video', function (Blueprint $table) {
            $table->enum('sumber', ['Youtube', 'Upload'])->default('Youtube')->after('durasi');
            $table->string('file_video')->nullable()->after('url_video');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tr_video', function (Blueprint $table) {
            $table->dropColumn(['sumber', 'file_video']);
        });
    }
};
