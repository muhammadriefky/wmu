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
        Schema::create('tr_ulasan', function (Blueprint $table) {
            $table->id('id_ulasan');
            $table->string('nama_pemberi', 255);
            $table->text('isi_ulasan')->nullable();
            $table->tinyInteger('rating_bintang')->default(5);
            $table->boolean('status_disetujui')->default(false);
            $table->timestamp('rec_datecreated')->nullable();
            $table->timestamp('rec_dateupdate')->nullable();
            $table->string('rec_usercreated', 50)->nullable();
            $table->string('rec_userupdate', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_ulasan');
    }
};
