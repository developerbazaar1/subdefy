<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size as needed
        ]);

        // Store the uploaded image in the "public" disk (you can configure other disks as well)
        $imagePath = $request->file('image')->store('images', 'public');

        // Generate the URL for the uploaded image
        $imageUrl = asset('storage/' . $imagePath);

        return response()->json(['url' => $imageUrl]);
    }
}