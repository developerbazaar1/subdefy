<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    

    public function get_categories(Request $request)
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
        
        $categories = Category::with('subcategories')->orderBy('id','DESC')->skip($offset)->take($limit)->get();
        if($categories){
            return response()->json([
                'status' => true,
                'message' => 'Get categories data successfully',
                'categories' => $categories,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'category not exist, please try again',
            ], 401);
        }
       
    }


   
}
