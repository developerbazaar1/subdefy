<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Support\Facades\Crypt;

class BlogController extends Controller
{
   
    public function index()
    {   
        $blogs = Blog::orderBy('id','DESC')->get();
        return view('admin.blog.index',compact('blogs'));
    }
    
    public function create()
    {
        $categories = Category::where('status', 'active')->orderBy('id','DESC')->get();
        return view('admin.blog.create', compact('categories'));
    }

    
    public function store(Request $request)
    { 
        $validated = $request->validate([
          "blog_title" => "required",
          "blog_category" => "required",
          "blog_short_desc" => "required",
          "blog_long_description" => "required",
          "document" => "required",
          
        ]);

        if($request->file('document')){
            $image = $request->file('document');
            if($image->isValid()){
                if(!empty($request->input('document_old'))){
                    if(file_exists(public_path('/').'/'.$request->input('document_old'))){
                        unlink(public_path('/').'/'.$request->input('document_old')); 
                    }
                }
                $extension = $image->getClientOriginalExtension();
                $fileName = rand(100,999999).time().'.'.$extension;
                $image_path = public_path('upload/blog');
                $request->document->move($image_path, $fileName);
                $formInput['document'] = 'upload/blog/'.$fileName;
            }
            unset($formInput['document_old']);
        }else{
            $formInput['document'] = $request->input('document_old');
        }

       
        $data = array(
              "blog_title" => $request->input('blog_title'),
              "blog_category" => $request->input('blog_category'),
              "blog_short_desc" => $request->input('blog_short_desc'),
              "blog_long_description" => $request->input('blog_long_description'),
              "blog_thumbnail" => $formInput['document'],
              
        );
        
        Blog::create($data)->id;

      
        return redirect()->back()->with('success',"Blog Added Successfully!");
       
    
    
    }

    
    public function show($id)
    {
        //
    }

    
    public function destroy($id)
    {
        $delete = Blog::findOrFail($id);
		$image1 = $delete->blog_thumbnail;
		$image = "public/".$image1;
		if($delete->delete()){
			if(!empty($image)){
				if(file_exists($image)){
					unlink($image);
				}
			}
        }
        return redirect('blogs')->with('success','Blog Deleted Successfully');
    
    }



     public function edit($id)
    {

        $categories = Category::where('status', 'active')->orderBy('id','DESC')->get();
        $blogid = Crypt::decrypt($id);
        $blog = Blog::where('id',$blogid)->first();
        return view('admin.blog.edit', compact('blog', 'categories'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
          "blog_title" => "required",
          "blog_category" => "required",
          "blog_short_desc" => "required",
          "blog_long_description" => "required",
          
        ]);

        if($request->file('document')){
            $image = $request->file('document');
            if($image->isValid()){
                if(!empty($request->input('document_old'))){
                    if(file_exists(public_path('/').'/'.$request->input('document_old'))){
                        unlink(public_path('/').'/'.$request->input('document_old')); 
                    }
                }
                $extension = $image->getClientOriginalExtension();
                $fileName = rand(100,999999).time().'.'.$extension;
                $image_path = public_path('upload/blog');
                $request->document->move($image_path, $fileName);
                $formInput['document'] = 'upload/blog/'.$fileName;
            }
            unset($formInput['document_old']);
        }else{
            $formInput['document'] = $request->input('document_old');
        }

      
        $data = array(
              "blog_title" => $request->input('blog_title'),
              "blog_category" => $request->input('blog_category'),
              "blog_short_desc" => $request->input('blog_short_desc'),
              "blog_long_description" => $request->input('blog_long_description'),
              "blog_thumbnail" => $formInput['document'],
        );
        
        
       
            $blogid = $request->input('blogid');
            Blog::where('id',$blogid)->update($data);
           
            return redirect()->back()->with('success',"Blog updated successfully!");
           
    }
    
    public function changeBlogStatus(Request $request)

    {
        $id = $request->blog_id;
        $blog= Blog::find($id);

        if($request->status == '1'){
            $data = array(
                "status"=>'active', 
            );
        }else{
            $data = array(
                "status"=>'inactive', 
            );
        }            
          
        Blog::where('id',$id)->update($data);

        return response()->json(['success'=>'Status change successfully.']);

    }

}

