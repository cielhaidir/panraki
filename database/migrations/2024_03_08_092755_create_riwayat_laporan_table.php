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
        Schema::create('riwayat_laporan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('jenis');
            $table->string('sub_jenis');
            $table->string('jenis_masalah');
            $table->string('urgensi_masalah')->nullable();
            $table->string('alat_bermasalah')->nullable();
            $table->string('spesifikasi_kendaraan')->nullable();
            $table->string('nomor_inventaris')->nullable();
            $table->string('target');
            $table->string('no_pelapor');
            $table->string('bukti');
            $table->string('lokasi');
            $table->text('ruangan');
            $table->text('keluhan');
            $table->text('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_laporan');
    }
};
