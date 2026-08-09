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
        Schema::create('tr_video', function (Blueprint $table) {
            $table->id('id_video');
            $table->string('judul_video');
            $table->string('durasi')->nullable();
            $table->string('gambar')->nullable();
            $table->string('url_video')->nullable();
            $table->enum('status', ['Aktif', 'Tidak Aktif'])->default('Aktif');
            $table->timestamp('rec_datecreated')->useCurrent();
            $table->timestamp('rec_dateupdate')->useCurrent()->useCurrentOnUpdate();
            $table->string('rec_usercreated')->nullable();
            $table->string('rec_userupdate')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_video');
    }
};
