<?php

namespace App\Http\Controllers;

use App\Models\RiwayatLaporan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LaporanController extends Controller
{


    public function index()
    {
        $user = auth()->user();
        $riwayatLaporan = RiwayatLaporan::where('target', $user->role)->get();
    }
    public function show(RiwayatLaporan $laporan)
    {
        return view('laporan.show', compact('laporan'));
    }



    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama' => 'required|string',
            'jenis' => 'required|string',
            'sub_jenis' => 'required|string',
            'target' => 'required|string',
            'no_pelapor' => 'required|string',
            'pj1' => 'required|string',
            'bukti' => 'required|extensions:jpg,png,jpeg|max:5120',
            'lokasi' => 'required|string',
            'ruangan' => 'required|string',
            'keluhan' => 'required|string',
            'jenis_masalah' => 'required|string',


        ]);

        // Simpan data ke database

        if ($request->hasFile('bukti')) {
            // Proses upload gambar dan simpan ke folder bukti
            $bukti = $request->file('bukti');
            $buktiFileName = $request->nama . '_' . $request->lokasi . '_' . now()->format('His') . '.' . $bukti->getClientOriginalExtension();
            $base64Image = base64_encode(file_get_contents($bukti->path()));
            $bukti->move(public_path('bukti'), $buktiFileName);

        } else {
            // Handle case where file is not uploaded
            return response()->json(['error' => 'File bukti is required'], 422);
        }


        $laporan = new RiwayatLaporan();
        $laporan->nama = $request->nama;
        $laporan->jenis = $request->jenis;
        $laporan->sub_jenis = $request->sub_jenis;
        $laporan->jenis_masalah = $request->jenis_masalah;
        $laporan->urgensi_masalah = $request->urgensi_masalah;
        $laporan->alat_bermasalah = $request->alat_bermasalah;
        $laporan->spesifikasi_kendaraan = $request->spesifikasi_kendaraan;
        $laporan->nomor_inventaris = $request->nomor_inventaris;
        $laporan->target = $request->target;
        $laporan->no_pelapor = $request->no_pelapor;
        $laporan->bukti = $buktiFileName;
        $laporan->lokasi = $request->lokasi;
        $laporan->ruangan = $request->ruangan;
        $laporan->keluhan = $request->keluhan;
        $laporan->status = 'menunggu konfirmasi';
        $laporan->save();
        if ($laporan->save()) {
            $insertedId = $laporan->id;
        }

        $response = Http::post('http://localhost:3001/laporan', [
            'id' => $insertedId,
            'nama' => $request->nama,
            'jenis_pelapor' => $request->sub_jenis,
            'jenis_masalah' => $request->jenis_masalah,
            'urgensi_masalah' => $request->urgensi_masalah,
            'alat_bermasalah' => $request->alat_bermasalah,
            'spesifikasi_kendaraan' => $request->spesifikasi_kendaraan,
            'nomor_inventaris' => $request->nomor_inventaris,
            'no_pelapor' => $request->no_pelapor,
            'pj1' => $request->pj1,
            'bukti' => $base64Image,
            'lokasi' => $request->lokasi,
            'ruangan' => $request->ruangan,
            'keluhan' => $request->keluhan,
        ]);

        // $response = Http::post('http://localhost:3001/laporan', $request->all());
        if ($response->successful()) {
            //if success, set the timer for the id in session or else, if 10 minutes no api request with id, send another post to node js to send to the report to second pj
            return response()->json(['message' => 'Laporan berhasil disimpan di Laravel dan dikirim ke Node.js'], 201);
        } else {
            return response()->json(['message' => 'Gagal mengirim data ke Node.js'], $response->status());
        }
    }

    public function update(Request $request)
    {
        $id = $request->input('id');
        $status = $request->input('status');

        try {

            RiwayatLaporan::where('id', $id)->update(['status' => $status]);

            return response()->json(['message' => 'Status updated successfully'], 200);
        } catch (\Exception $e) {
            // Return error response if something goes wrong
            return response()->json(['message' => 'Failed to update status', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request)
    {
        try {
            // Validate request data if necessary

            // Extract parameters from the request
            $id = $request->input('id');
            $status = $request->input('status');

            // Log the received ID and status
            \Log::info('Received ID: ' . $id);
            \Log::info('Received status: ' . $status);

            // Update status in the database
            $affectedRows = RiwayatLaporan::where('id', $id)->update(['status' => $status]);

            if ($affectedRows > 0) {
                $noPelapor = RiwayatLaporan::where('id', $id)->value('no_pelapor');

                return response()->json([
                    'message' => 'Status updated successfully',
                    'nohp' => $noPelapor
                ]);
            } else {
                return response()->json(['error' => 'No matching record found for the given ID'], 404);
            }

        } catch (\Exception $e) {
            \Log::error('Error updating status: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while updating status'], 500);
        }

        // $id = $request->input('id');
        // $status = $request->input('status');

        // \Log::info('Received ID: ' . $id);
        // \Log::info('Received status: ' . $status);

        // // Update status in the database
        // RiwayatLaporan::where('id', $id)->update(['status' => $status]);

        // return response()->json(['message' => 'Status laporan berhasil diperbarui']);
    }


    public function getCount(Request $request)
    {

        $status = $request->input('status');
        $target = $request->input('target');

        // Initialize the query
        $query = RiwayatLaporan::query();


        if ($status !== null) {
            $status = urlencode($status);
            $query->where('status', $status);
        }
        if ($target !== null) {
            $query->where('target', $target);
        }

        $count = $query->count();

        return response()->json($count);
    }
    public function getRiwayat(Request $request)
    {

        $id = $request->input('id');
        $status = $request->input('status');
        $target = $request->input('target');

        // Initialize the query
        $query = RiwayatLaporan::query();


        if ($status !== null) {
            $status = urlencode($status);
            $query->where('status', $status);
        }
        if ($target !== null) {
            $query->where('target', $target);
        }
        if ($id !== null) {
            $query->where('id', $id);
            $all = $query->first();
        } else {

            $all = $query->get();
        }


        return response()->json($all);
    }

    public function summary()
    {
      
        $summary = RiwayatLaporan::getSummaryByTarget();
        return response()->json($summary);

    }
    public function summaryPeople(Request $request)
    {
        $target = $request->input('target');
        $summary = RiwayatLaporan::getSummaryByPeople($target);
        return response()->json($summary);

    }
    public function summaryMonth(Request $request)
    {
        $target = $request->input('target');
        $monthlyTicketCounts = RiwayatLaporan::getMonthlyTicketCounts($target);
        return response()->json($monthlyTicketCounts);

    }


}
