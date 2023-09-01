<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;
use Auth;
use Illuminate\Support\Facades\Hash;

class NewsletterController extends Controller
{
  
    public function index()
    {
       $newsletters = Newsletter::all();
        return view('admin.newsletter',compact('newsletters'));
    }

    public function destroy($id)
    {
        $delete = Newsletter::findOrFail($id);
        if($delete->delete()){
            return redirect('newsletter')->with('success','Newsletter data deleted successfully');
        }
        return redirect('newsletter')->with('success','Newsletter data deleted successfully');
    
    }
    
}
