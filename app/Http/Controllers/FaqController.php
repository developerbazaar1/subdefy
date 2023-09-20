<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faq;
use Illuminate\Support\Facades\Crypt;

class FaqController extends Controller
{
   
    public function index()
    {
        $faqs = Faq::orderBy('id','DESC')->get();
        return view('admin.faq.index',compact('faqs'));
    }

    
    public function create()
    {
        return view('admin.faq.create');
    }

    
    public function store(Request $request)
    { 
        $validated = $request->validate([
            'question' => 'required',
            'answer' => 'required',
        ]);

        $data = array(
            "question"=>$request->input('question'),
            "answer"=>$request->input('answer'),
        );
        
        $id = Faq::create($data)->id;
        return redirect()->back()->with('success_add', 'faq Added Successfully');
    
    }

   
    public function edit($id)
    {
        $faqid = Crypt::decrypt($id); 
        $faq = Faq::where('id',$faqid)->first();
        if(!empty($faq)){
            return view('admin.faq.edit',compact('faq'));
        }else{
            return redirect()->back()->with('error','faq having error, try again');
        }
    }

    
    public function update(Request $request)
    { 
        
        $id = $request->faq_id;
       
        $data = array(
            "question"=>$request->question, 
            "answer"=>$request->answer, 
        );
                    
        Faq::where('id',$id)->update($data);

        return response()->json(['success'=>'Faq Updated Successfully']);
        // return redirect()->back()->with('success', 'Faq Updated Successfully');
    }


    public function destroy($id)
    {
        $delete = Faq::findOrFail($id);
		$image = $delete->Faq_image;
		if($delete->delete()){
			if(!empty($image)){
				if(file_exists($image)){
					unlink($image);
				}
			}
        }
        return redirect()->back()->with('success','Faq Deleted Successfully');
    
    }


   



}

