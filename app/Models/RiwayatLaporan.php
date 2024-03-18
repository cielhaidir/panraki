<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class RiwayatLaporan extends Model
{
    use HasFactory;

    protected $table = 'riwayat_laporan';

    public static function getSummaryByTarget()
    {
        return self::selectRaw('target, COUNT(target) as total')
            ->selectRaw('SUM(CASE WHEN status = "menunggu" THEN 1 ELSE 0 END) as menunggu')
            ->selectRaw('SUM(CASE WHEN status = "proses" THEN 1 ELSE 0 END) as proses')
            ->selectRaw('SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending')
            ->selectRaw('SUM(CASE WHEN status = "selesai" THEN 1 ELSE 0 END) as selesai')
            ->groupBy('target')
            ->get();

    }
    public static function getSummaryByPeople($target)
    {
        $query = self::selectRaw('jenis, COUNT(jenis) as total')
            ->groupBy('jenis');

        if (!empty ($target)) {
            $query->where('target', $target);
        }

        return $query->get();
    }

    public static function getMonthlyTicketCounts($target)
    {
        $query = self::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month')
            ->selectRaw('COUNT(*) as ticket_count')
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m")'));

        if (!empty ($target)) {
            $query->where('target', $target);
        }

        return $query->get();
    }

}
