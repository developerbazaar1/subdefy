<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Smtp;
use Auth;
use Illuminate\Support\Facades\Hash;

class SettingController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
       
    }

    public function password_setting()
    {
        return view('admin.password_setting');
    }

    public function password_setting_store(Request $request)
    {
         $validated = $request->validate([
            'password' => 'required|confirmed',
        ]);

        $data = array(
            "password"=>Hash::make($request->input('password')),
        );
        
        User::where('id',Auth::user()->id)->update($data);
        return redirect()->back()->with('success', 'Password updated successfully');
    }


    public function smtp_setting()
    {   
        $smtp = Smtp::first();
        return view('admin.smtp_setting',compact('smtp'));
    }

    public function smtp_setting_store(Request $request)
    {
         $validated = $request->validate([
            'mail_mailer' => 'required',
            'mail_port' => 'required',
            'mail_host' => 'required',
            'mail_username' => 'required',
            'mail_password' => 'required',
            'mail_encryption' => 'required',
            'mail_from_address' => 'required',
            'mail_from_name' => 'required',
        ]);

        $data = array(
            "mail_mailer"=>$request->input('mail_mailer'),
            "mail_port"=>$request->input('mail_port'),
            "mail_host"=>$request->input('mail_host'),
            "mail_username"=>$request->input('mail_username'),
            "mail_password"=>$request->input('mail_password'),
            "mail_encryption"=>$request->input('mail_encryption'),
            "mail_from_address"=>$request->input('mail_from_address'),
            "mail_from_name"=>$request->input('mail_from_name'),
        );
        
        if($request->input('smtpid')){
            Smtp::where('id',$request->input('smtpid'))->update($data);
        }else{
            Smtp::create($data)->id;
        }
        
        return redirect()->back()->with('success', 'Smtp details added successfully');
    }

    
}
