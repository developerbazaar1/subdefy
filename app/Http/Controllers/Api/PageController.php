<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Page;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PageController extends Controller
{
    

    public function get_pages(Request $request)
    {   
        if ($request->has('limit')) {
            $limit = $request->input('limit');
        }else{
            $limit = 5000;
        }
        
        if ($request->has('offset')) {
            $offset = $request->input('offset');
        }else{
            $offset = 0;
        }

        $page = Page::orderBy('id','DESC')->skip($offset)->take($limit)->get();
        if($page){
            return response()->json([
                'status' => true,
                'message' => 'Get page data successfully',
                'pages' => $page,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'page not exist, please try again',
            ], 401);
        }
       
    }


   
}
