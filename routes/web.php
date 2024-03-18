<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ProfileController;
use App\Models\Kontak;
use App\Models\RiwayatLaporan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\KontakController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);

// });
Route::get('/', function () {
    return Inertia::render('Homepage');
});

// routes/web.php

    // Route::get('/{any}', function () {
    //     return Inertia::render('Dashboard'); // Assuming your main Blade view is named 'app.blade.php'
    // })->where('any', '.*');

Route::get('/create', function (Request $request) {
    $unit = $request->query('unit', ''); 
    $kontak = Kontak::where('unit', $unit)->first();

    $data = [
        'unit' => $unit, 
    ];

    if ($kontak) {
        $data['pj1'] = $kontak->pj1;
        $data['pj2'] = $kontak->pj2;
    } else {
        $data['pj1'] = '';
        $data['pj2'] = '';
    }

    return Inertia::render('Ticket', $data);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/kontak', [KontakController::class, 'index']);
    Route::get('/kontak/{id}', [KontakController::class, 'show']);
    Route::put('/kontak/{id}', [KontakController::class, 'update']);
    Route::post('/riwayat', [LaporanController::class, 'getRiwayat']);
    Route::post('/riwayatId', [LaporanController::class, 'update']);
    Route::get('/settings', function () {
        return Inertia::render('Dashboard');
    });
    Route::get('/riwayat-laporan', function () {
        return Inertia::render('Dashboard');
    });
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });
    Route::get('/riwayat-laporan', function () {
        return Inertia::render('Dashboard');
    });
    Route::get('/riwayat-laporan/{any}', function () {
        return Inertia::render('Dashboard');
    })->where('any', '.*');
    



    

});
Route::middleware('checkUserRole')->group(function () {
    
});


Route::post('/laporan', [LaporanController::class, 'store']);


require __DIR__.'/auth.php';
