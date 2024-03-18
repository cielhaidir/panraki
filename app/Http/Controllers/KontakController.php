<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use Illuminate\Http\Request;

class KontakController extends Controller
{
    public function index(Request $request)
    {
        $target = $request->input('target');
        
        if (!empty($target)) {
            $kontakData = Kontak::where('unit', $target)->get();
        } else {
            $kontakData = Kontak::all();
        }
        return response()->json($kontakData);
    }
    public function show($id)
    {
        $kontak = Kontak::find($id);

        if (!$kontak) {
            return response()->json(['message' => 'Kontak not found'], 404);
        }
        
        return response()->json($kontak);
    }

    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'unit' => 'required',
            'pj1' => 'required',
            'pj2' => 'required',
        ]);

        try {
            // Find the kontak by ID
            $kontak = Kontak::findOrFail($id);

            // Update the kontak with the validated data
            $kontak->update($validatedData);

            return response()->json(['message' => 'Kontak updated successfully'], 200);
        } catch (\Exception $e) {
            // Return error response if something goes wrong
            return response()->json(['message' => 'Failed to update Kontak', 'error' => $e->getMessage()], 500);
        }
    }
    
}
