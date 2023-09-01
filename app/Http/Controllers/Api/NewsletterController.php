<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Newsletter;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{

    public function newsletter(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required',

            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

           
            $newsletterData = Newsletter::create([
                'email' => $request->email,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Request sent successfully',
            ], 200);
           
             
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

   
   
}
