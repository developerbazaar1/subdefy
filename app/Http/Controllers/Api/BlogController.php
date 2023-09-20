<?php

namespace App\Http\Controllers\Api;

use App\Models\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class BlogController extends Controller
{
    
    public function get_blogs(Request $request)
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
        
        if ($request->has('category')) {
            $category = $request->input('category');
            $blogs = Blog::where('status', 'active')->where('blog_category', $category)->orderBy('id','DESC')->skip($offset)->take($limit)->get();
        }else{
            $blogs = Blog::where('status', 'active')->orderBy('id','DESC')->skip($offset)->take($limit)->get();
        }

        
        
        if($blogs){
            return response()->json([
                'status' => true,
                'message' => 'Get blogs successfully',
                'blogs' => $blogs,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'blogs not exist, please try again',
            ], 401);
        }
       
    }

    public function get_blog( Request $request)
    {
        if ($request->has('blog_id')) {
            $blog_id = $request->input('blog_id');
        }else{
            return response()->json([
                'status' => false,
                'message' => 'blog not exist, please try again',
            ], 401);
        }

        $blog = Blog::where('id', $blog_id)->get();
        
        if($blog){
            return response()->json([
                'status' => true,
                'message' => 'Get blog successfully',
                'blog' => $blog,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'blog not exist, please try again',
            ], 401);
        }
       
    }

   
}
