<?php

use App\Http\Controllers\LaporanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/update-status', [LaporanController::class, 'updateStatus']);


Route::post('/riwayat-laporan/count', [LaporanController::class, 'getCount']);
Route::post('/riwayat-laporan/getRiwayat', [LaporanController::class, 'getRiwayat']);
Route::get('/riwayat-laporan/summary', [LaporanController::class, 'summary']);
Route::post('/riwayat-laporan/summaryPeople', [LaporanController::class, 'summaryPeople']);
Route::post('/riwayat-laporan/summaryMonth', [LaporanController::class, 'summaryMonth']);

